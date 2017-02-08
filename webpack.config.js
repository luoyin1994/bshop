const path     = require('path')
let entryPath  = path.resolve(__dirname, 'public/libs/js') + '/'
module.exports = {
    entry : entryPath + 'index.js',
    output: {
        path    : entryPath,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
        ]
    }
}