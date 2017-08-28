const path = require('path');

module.exports = {
    entry: path.join(__dirname, '/client/index.js'),
    output: {
        path: path.join(__dirname, '/client/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['react']
              }
            }
          }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/client'),
        compress: true, 
        port: 8080,
        hot: true
    }
}