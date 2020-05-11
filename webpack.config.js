const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	//...
	entry: ["babel-polyfill", "./src/index.js"],
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.ml.js",
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query: {
					presets: ["@babel/preset-env"],
					plugins: ["@babel/plugin-proposal-class-properties"],
				},
			},
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
	],
	node: {
		fs: "empty",
	},
	resolveLoader: {
		// Configure how Webpack finds `loader` modules.
		modules: ["./node_modules"],
	},
	devServer: {
		contentBase: path.join(__dirname, "/src"),
		compress: true,
		inline: false,
		port: 5001,
	},
};
