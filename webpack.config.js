const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const dotenv = require('dotenv');

const isProduction = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    cache: false,
    entry: './src/js/game.js',
    mode: isProduction,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
            {
                //test: /\.s[ac]ss$/i,
                test: /.s?css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: './src/images', to: 'static' }],
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.css',
        }),
    ],
    optimization: {
        minimizer: [`...`, new CssMinimizerPlugin()],
    },
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
};
