var path = require('path');
var webpack = require('webpack');

// plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CCP = webpack.optimize.CommonsChunkPlugin;


module.exports = {
	//devtool: 'eval-source-map', 
	// 配置生成Source Maps,可选项如下，构建速度逐渐加快,负面作用也加强，故在开发阶段使用
	// [source-map, cheap-module-source-map, eval-source-map, cheap-module-eval-source-map]

	entry: {
		index: path.join(__dirname, 'src/main.js'),
	},
	output: {
		path: path.join(__dirname, 'assets/js'),
		publicPath: 'js/',
		// filename: '[name]-[hash:6].bundle.js',
		// chunkFilename: "[id]-[hash:6].chunk.js"
		filename: '[name].bundle.js',
		chunkFilename: "[id].chunk.js"
	},

	module: {
		loaders: [ // 添加json-loader
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			}
		]
	},

	// postcss: [
	// 	require('autoprefixer')
	// ],

	devServer: {
		contentBase: './assets', // 为哪个目录提供本地服务器，默认为根目录
		colors: true, // 为true时，使终端输出的文件为彩色的
		inline: true, // 为true时，当源文件改变时自动刷新页面
		//port: 8001, // 设置默认监听端口，默认8080
		historyApiFallback: false, // 在开发单页应用时非常有用，它依赖于HTML5 history API，为true，所有跳转将指向index.html
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, '/src/templates/index.html'),
			filename: '../index.html', // 这个位置是相对于 output.path路径的
			title: 'Table',
			inject: 'body',
			chunks: ['index']
		}),
		new ExtractTextPlugin('[name]-[hash].css'),

		// ----------------------- Common Chunks---------------------------
		// new CCP({
		// 	name: 'admin-commons',
		// 	chunks:['admin_A','admin_B']
		// }),
		// new CCP({
		// 	name: 'c_commons',
		// 	chunks:['page_C','admin_C']
		// }),
		// new CCP({
		// 	name: 'commons',
		// 	chunks:['page_A','page_B','admin_commons'],
		// 	minChunks: 2
		// })
		// ------------------------------------------------------------
	]
}