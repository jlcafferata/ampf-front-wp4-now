const path = require("path");

console.log("estoy por configurar webpack !!!");

var config = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    publicPath: "/dist/",
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react", "stage-2"]
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      //apiUrl: "http://192.168.0.17:8080"
      apiUrl: "http://34.230.28.215"
    })
  }
};

module.exports = config;
