const webpack = require('webpack');
const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
    mode: 'development',   
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },  
    module: {
        rules: [{
            test: /\.scss$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            },]
        }]
    },
    plugins: [                           
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'Readings',
            inject: false,
            template: require('html-webpack-template'),
            bodyHtmlSnippet :'<div id="container"></div>'
        })   
    ]
});