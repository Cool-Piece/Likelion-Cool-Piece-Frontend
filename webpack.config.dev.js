const dotenv = require("dotenv-webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlPageNames = ["login", "index", "detail", "create", "edit", "mypage", "githubCallback", "mystudy"];
const jsFileNames = ["login", "index", "detail", "create", "edit", "mypage", "githubCallback", "mystudy"];

const multipleHtmlPlugins = htmlPageNames.map((name) => {
  return new HtmlWebpackPlugin({
    template: `./src/client/html/${name}.html`,
    filename: `html/${name}.html`,
    chunks: [`${name}`],
  });
});

const getEntry = () => {
  const entry = {};
  jsFileNames.forEach((name) => {
    const src = `./src/client/js/${name}.js`;

    entry[name] = src;
  });
  return entry;
};

module.exports = (env) => ({
  mode: "development",
  entry: getEntry(),
  watch: true,
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "js/[name].js",
    clean: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),

    new dotenv({
      path: ".env",
    }),

    new HtmlWebpackPlugin({
      template: "./src/client/html/index.html",
      filename: "html/index.html",
      chunks: ["index"],
    }),
  ].concat(multipleHtmlPlugins),

  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "image/[name][ext]",
        },
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
});
