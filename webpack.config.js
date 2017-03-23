var HTMLWebpackPlugin = require("html-webpack-plugin");
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
    template: __dirname + "/app/index.html",
    filename: "index.html",
    inject: "body" 
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ExtractTextPluginP = new ExtractTextPlugin('styles.css');




module.exports = {
    entry: __dirname + "/app/app.js",
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{ loader: 'css-loader', options: { url: false } },{ loader: 'less-loader', options: { url: false } }]
                })
            }
        ]
    },
       
    output: {
        filename: "transformed.js",
        path: __dirname + "/build"
    },
    
    plugins: [
        ExtractTextPluginP, HTMLWebpackPluginConfig
    ]
};