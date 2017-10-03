const path = require('path');
// const webpack = require('webpack');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/js/entry.js',
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env'],
                },
            },
        }],
    },
    plugins: [
        // new webpack.ProvidePlugin({
        //     $: 'jquery',
        //     jQuery: 'jquery',
        // }),
        // new UglifyJSPlugin(),
    ],
};
