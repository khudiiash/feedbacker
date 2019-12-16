// Imports: Dependencies
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// Webpack Configuration
const config = {
  
  // Entry
  entry: './index.js',
  // Output
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  // Loaders
  module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.js(x)?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.s?css$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(gif|png|jp(e)?g|svg)$/i,
        use: [
          'file-loader'
        ],
      }
    ]
  },
  // Plugins
  plugins: [new HtmlWebpackPlugin ({
    template : 'dist/index.html'
})],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
};
// Exports
module.exports = config;