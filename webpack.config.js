/*
* @Author: RoyChen
* @Date:   2016-03-22 16:10:42
* @Last Modified by:   RoyChen
* @Last Modified time: 2016-04-25 11:59:59
*/

'use strict';


let webpack            = require('webpack');
let UglifyJsPlugin     = webpack.optimize.UglifyJsPlugin; 
let commonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let ExtractTextPlugin  = require('extract-text-webpack-plugin');
let path               = require('path');
let nodeModulesPath    = path.resolve(process.cwd(), 'node_modules');

const isDebug = process.env.WEBPACK_DEV;
module.exports = {
	devtool: isDebug ? 'source-map' : 'eval',
	addVendors:function(alias_name, mPath){
		this.resolve.alias[alias_name] = mPath;
		this.module.noParse.push(new RegExp(mPath));
	},
	entry: {
        demo: [
                'webpack-dev-server/client?http://localhost:3000/', 
                'webpack/hot/dev-server',
                 './example/demo.js'
              ],
        libs: ['react', 'react-dom']
    },
	output:  {
		path:     		path.resolve( isDebug ? 'build' : 'public' ),
		filename: 		isDebug ? '[name].js' : 'js/[hash:8].[name].min.js',
        publicPath:     isDebug ? '/build/' : '/public/'
        // 
        // library:        'MultipleSelect',
        // libraryTarget:  'umd',
        // umdNamedDefine: true
        // 
	},
	resolve: {
        root: [nodeModulesPath],
        alias: {}
    },
    module:{
        preLoaders: [
            
                    {
                        extensions: 'js',
                        test:       /\.(js)(\?.*)?$/,
                        loader:     'eslint-loader',
                        exclude:    /node_modules/
                    },
            
                    {
                        extensions: 'jsx',
                        test:       /\.(jsx)(\?.*)?$/,
                        loader:     'eslint-loader',
                        exclude:    /node_modules/
                    },
            
        ],
    	loaders: [
            
        			{
        				extensions: 'jsx',
        				test:   	/\.(jsx)(\?.*)?$/,
        				loader: 	'babel-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'js',
        				test:   	/\.(js)(\?.*)?$/,
        				loader: 	'babel-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'json',
        				test:   	/\.(json)(\?.*)?$/,
        				loader: 	'json-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'coffee',
        				test:   	/\.(coffee)(\?.*)?$/,
        				loader: 	'coffee-redux-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'json5',
        				test:   	/\.(json5)(\?.*)?$/,
        				loader: 	'json5-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'txt',
        				test:   	/\.(txt)(\?.*)?$/,
        				loader: 	'raw-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'png,jpg,jpeg,gif,svg',
        				test:   	/\.(png|jpg|jpeg|gif|svg)(\?.*)?$/,
        				loader: 	'url-loader?limit=10000',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'woff,woff2',
        				test:   	/\.(woff|woff2)(\?.*)?$/,
        				loader: 	'url-loader?limit=100000',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'ttf,eot',
        				test:   	/\.(ttf|eot)(\?.*)?$/,
        				loader: 	'file-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'wav,mp3',
        				test:   	/\.(wav|mp3)(\?.*)?$/,
        				loader: 	'file-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'html',
        				test:   	/\.(html)(\?.*)?$/,
        				loader: 	'html-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'md,markdown',
        				test:   	/\.(md|markdown)(\?.*)?$/,
        				loader: 	'html-loader!markdown-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'css',
        				test:   	/\.(css)(\?.*)?$/,
        				loader: 	'style-loader!css-loader?minimize',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'less',
        				test:   	/\.(less)(\?.*)?$/,
        				loader: 	'style-loader!css-loader?minimize!less-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'styl',
        				test:   	/\.(styl)(\?.*)?$/,
        				loader: 	'style-loader!css-loader?minimize!stylus-loader',
                        exclude:    /node_modules/
        			},
        	
        			{
        				extensions: 'scss,sass',
        				test:   	/\.(scss|sass)(\?.*)?$/,
        				loader: 	'style-loader!css-loader?minimize!sass-loader',
                        exclude:    /node_modules/
        			}
        	
        ]

    },
    eslint: {
        failOnWarning: false,
        failOnError:   true,
        fix:           true,
        configFile:    './.eslintrc'
    },
    plugins:[
        new commonsChunkPlugin({
             name:'libs',
             filename:"libs.js"
            }),
    ]
};

