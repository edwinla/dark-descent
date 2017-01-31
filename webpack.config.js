module.exports = {
  entry: "./index.js",
  output: {
      path: __dirname,
      filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devtool: 'source-maps',
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
};
