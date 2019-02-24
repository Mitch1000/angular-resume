const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  entry: `${path.resolve()}/src/app.js`,
  output: {
    path: `${path.resolve()}/src/app.js`,
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        // vue-loader config to load `.vue` files or single file components.
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true,
        },
      },
      // this will apply to both plain `.css` files
      // AND `<style>` blocks in `.vue` files
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  devtool: '#source-map',
};
