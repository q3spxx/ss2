require('webpack')

module.exports = {
	entry: './main.jsx',
	output: {
		path: '../public/admin/build',
		filename: 'main.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loaders: ["babel?presets[]=es2015"],
				exclude: "/node_modules/"
			},
			{
				test: /\.jsx$/,
				loaders: ["babel?presets[]=es2015", "babel?presets[]=react"],
				exclude: "/node_modules/"
			}
		]
	}
}