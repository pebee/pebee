const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});


module.exports = {
    devtool: 'inline-source-map',
    devServer: {
        hot: true,
        port: 4000,
        historyApiFallback: true
    },
    output: {
        publicPath: '/',
        filename: '[name].[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            camelCase: true,
                            sourceMap: true
                        }
                    },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            }
        ]
    },
    plugins: [
        htmlPlugin,
        new webpack.HotModuleReplacementPlugin()
    ]
};