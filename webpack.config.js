const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { js: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { css: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/client'),
        compress: true, 
        port: 8080,
        hot: true
    }
}