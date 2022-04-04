const path = require('path')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
//const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    entry: './src/rpg/rpg.js',
    mode: 'development',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            hash: true,
            favicon: 'src/res/img/favicon.ico',
            title: 'Game!'
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/res', to: 'res'}
            ]
        }),
        //new NodePolyfillPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                  "style-loader",
                  "css-loader",
                  "sass-loader",
                ],
              }
        ]
    },
    devServer: {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
}