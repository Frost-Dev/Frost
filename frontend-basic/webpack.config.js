const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
	entry: './src/client/mainEntry.ts',
	output: {
		path: `${__dirname}/built/client`,
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					'vue-loader'
				]
			},
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.ts$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							configFile: 'tsconfig.client.json',
							appendTsSuffixTo: [/\.vue$/]
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.js', '.vue'],
		alias: {
			vue$: 'vue/dist/vue.esm.js',
		}
	},
	plugins: [
		new VueLoaderPlugin()
	]
};