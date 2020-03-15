const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.base.conf");
const utils = require("./utils");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(baseConfig, {
	module: {
		rules: utils.getStyleLoaders({
			sourceMap: false,
			usePostcss: true
		})
	},
	devtool: "cheap-module-eval-source-map",
	devServer: {
		useLocalIp: true,
		historyApiFallback: true,
		hot: true,
		clientLogLevel: "warning",
		port: 7777,
		overlay: true,
		compress: true,
		publicPath: "/",
		open: true,
		host: "0.0.0.0"
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": '"development"'
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, "../static"),
				to: "static"
			}
		]),
		new HtmlWebpackPlugin({
			name: "index",
			template: path.resolve(__dirname, "../src/public/index.html"),
			inject: true,
			filename: "index.html"
		})
	]
});
