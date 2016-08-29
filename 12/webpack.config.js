var webpack = require('webpack')
module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:9090',//资源服务器地址
        'webpack/hot/only-dev-server',
        './app/main.js'
    ],
    output: {
        //path: __dirname+'/build',
        //filename: "build.js"
        publicPath: "http://127.0.0.1:9090/build/",
        path: './static/dist/',
        filename: "build.js"
    },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.html$/, loader: "html" },
      { test: /\.vue$/, loader: "vue" },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel?presets[]=es2015'
      }
    ]
  },
    resolve: {
        modulesDirectories: [
          'node_modules'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"development"'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
}
