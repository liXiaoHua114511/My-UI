const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
	entry: "./src/main.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
	},
	module: {
		rules: [
			{ test: /\.vue$/, use: "vue-loader" },
			{
        test: /\.less$/i, // 可以加 i，表示忽略大小写进行匹配
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },


			{
				test: /\.m?js$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/,
				type: "asset/resource",
			},
		],
	},
	plugins: [new VueLoaderPlugin()],
};
