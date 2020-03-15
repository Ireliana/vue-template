const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const utils = require("./utils");

function resolve(dir) {
	return path.resolve(__dirname, "../", dir);
}

module.exports = {
	entry: {
		index: resolve("src/main.js")
	},
	output: {
		path: resolve("dist"),
		filename: "[name].js",
		publicPath: "/"
	},
	resolve: {
		alias: {
            src: resolve("src"),
            vue$: "vue/dist/vue.esm.js",
		},
		extensions: [".vue", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: "vue-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader",
				include: resolve("src")
			},
			{
				test: /\.(jpe?g|png|gif|svg)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 5000,
					name: utils.assetsPath("imgs/[name].[hash:7].[ext]")
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("media/[name].[hash:7].[ext]")
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: "url-loader",
				options: {
					limit: 10000,
					name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
				}
			}
		]
	},
	plugins: [new VueLoaderPlugin()],
	node: {
		setImmediate: false,
		dgram: "empty",
		fs: "empty",
		net: "empty",
		tls: "empty",
		child_process: "empty"
	}
};
