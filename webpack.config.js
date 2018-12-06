var webpack = require("webpack");
const path = require('path');

module.exports = {
    entry: "./src/index-client.js",
    output: {
        //path: "dist/assets",
        path: path.resolve(__dirname, "dist/assets"),
        filename: "bundle.js"
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
      },
    devtool: "#source-map",
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'stage-0', 'react']
                    }
                }
            }
        ]
    }
}