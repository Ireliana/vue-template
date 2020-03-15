const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os = require("os");

exports.assetsPath = function(dir) {
	const assetsDir = path.resolve("/static/", dir);
	return assetsDir;
};

exports.cssLoaders = function(option) {
	const cssLoader = {
		loader: "css-loader",
		options: {
			sourceMap: false
		}
	};
	const postcssLoader = {
		loader: "postcss-loader",
		options: {
			sourceMap: false
		}
	};

	function generateLoader(loader, loaderOption) {
		const loaders = option.usePostcss
			? [cssLoader]
			: [cssLoader, postcssLoader];
		if (loader) {
			loaders.push({
				loader: `${loader}-loader`,
				options: Object.assign({}, loaderOption, {
					sourceMap: option.sourceMap
				})
			});
		}
		if (option.isExtract) {
			return [MiniCssExtractPlugin.loader].concat(loaders);
		} else {
			return ["vue-style-loader"].concat(loaders);
		}
	}

	return {
		css: generateLoader(),
		less: generateLoader("less"),
		scss: generateLoader("sass"),
		sass: generateLoader("sass"),
		styl: generateLoader("stylus"),
		stylus: generateLoader("stylus")
	};
};

exports.getStyleLoaders = function(option) {
	const cssLoaders = exports.cssLoaders(option);
	const outputs = [];
	for (const extension in cssLoaders) {
		const loader = cssLoaders[extension];
		outputs.push({
			test: new RegExp(`\\.${extension}$`),
			use: loader
		});
	}
	return outputs;
};

exports.getIp = function() {
	const devs = os.netWorkInterfaces();
	for (const key in devs) {
		const devInfo = devs[key];
		for (let i = 0; i < devInfo.length; i++) {
			if (
				devInfo[i].family === "IPv4" &&
				devInfo[i].internal === false &&
				devInfo[i].address !== " 127.0.0.1"
			) {
				return devInfo[i].address;
			}
		}
	}
};
