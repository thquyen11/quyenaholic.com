const ExtractPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let extractPlugin = new ExtractPlugin({
    filename: 'main.css'
})

let htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: 'src/index.html'
})

module.exports = {
    entry: __dirname + '/src/js/main.js',
    output: {
        path: __dirname+'/build',
        filename: 'bundle.js',
        publicPath: '/build'
    },
    resolve: {
        modules: [
            __dirname + "/src/js",
            __dirname + "node_modules"
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
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
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(jpg|png)$/,
                use:[
                    {
                        loader: 'file-loader',
                        options:{
                            name: '[name].[ext]',
                            outputPath: 'img/',
                            publicPath: 'img/'
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        extractPlugin,
        htmlWebpackPlugin
    ]
}