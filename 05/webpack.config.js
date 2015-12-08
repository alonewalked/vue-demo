module.exports = {
  entry: [
	"./app/main.js",
  ],
  output: {
    path: __dirname+'/build',
    filename: "build.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.html$/, loader: "html" }
    ]
  }, 
  resolve: {
    modulesDirectories: [
      'node_modules'
    ]
  }
}