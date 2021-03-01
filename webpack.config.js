const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'client', 'src', 'Index.jsx'),
  module: {
    rules: [
      {
        test: /\.(jsx|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: ['file-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client', 'dist')
  }

};
