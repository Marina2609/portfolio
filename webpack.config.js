const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/script.js", // Точка входа
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true, // Очищает папку dist перед сборкой
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Шаблон твоего HTML
      favicon: "./assets/browser.ico",
    }),
    new CopyPlugin({
      patterns: [
        { from: "assets", to: "assets" }, // Копируем картинки и звуки в dist
      ],
    }),
  ],
  devServer: {
    static: "./dist",
    port: 8080,
    open: true, // Автоматически открывает браузер
    hot: true,
  },
  mode: "development",
};
