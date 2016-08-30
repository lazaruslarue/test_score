var path = require('path');
var webpack = require('webpack');

var ENV = process.env.NODE_ENV;

module.exports = {
  entry: ( ENV == 'production' ?
           [__dirname + '/src/main.js']
           :
           [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/dev-server',
            __dirname + '/src/main.js'
           ]
  ),
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svf)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"],

      }

    ]
  },
  plugins: ( ENV == 'production' ?
             [
              new webpack.optimize.UglifyJsPlugin({minimize: true}),
             ]
             :
             [new webpack.HotModuleReplacementPlugin()]
  ),
  devServer: {
    contentBase: './',
    hot: true,
    historyApiFallback: true,
  }
};
