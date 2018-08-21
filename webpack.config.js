const path = require('path');
const ExtractPlugin = require('extract-text-webpack-plugin');

let extractPlugin = new ExtractPlugin({
    filename: 'main.css'
})

module.export={
    entry: './src/js/main.js',
    output:{
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/build'
    },
    // devServer:{
    //     contentBase: __dirname+"/build"
    // },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options:{
                            presets: ['es2015']
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: extractPlugin.extract({
                    use: ['css-loader']
                })
            }
        ]
    }
}