'use strict'


module.exports = {
	module: {
	  loaders: [
	    { 
	    	test: /\.jsx$/,
	    	exclude: /node_modules/,
	    	loader: "babel-loader",
	    	query: {
	    		presets: ['es2015', 'react']
	    	}
	    }
	  ]
	},
	entry: "./modules/main/app.jsx",
	output: {
		filename: "./template/common.js"
	},
	watch: true
}