const path = require("path");
const entryPath = "src";
const entryFile = "app.js";
const autoprefixer = require('autoprefixer');


module.exports = {
  entry: `./${entryPath}/${entryFile}`, // entry: './src/app.js'
  output: {
    filename: "out.js",
    path: path.resolve(__dirname, `build`)
  },
  devServer: {
    contentBase: [path.join(__dirname, 'build')],
    compress: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        exclude: /build/,
        loader: "file-loader",
      }
      

    ]
  }
};
