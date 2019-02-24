const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  watch: false,
  mode: 'production',
  entry: `${path.resolve()}/src/app.js`,
  output: {
    path: `${path.resolve()}/dist/`,
    filename: 'app.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          `${path.resolve()}/src/three/`,
          `${path.resolve()}/node_modules/angular/angular.js`,
        ],
      },
      {
        // vue-loader config to load `.vue` files or single file components.
        test: /\.vue$/,
        loader: 'vue-loader',
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
    new CopyWebpackPlugin([
      { from: './src/index.html',     to: '../dist/index.html' },
    
      { from: './src/css',            to: '../dist/css' },
      { from: './src/fonts',          to: '../dist/fonts' },
      { from: './src/lib',            to: '../dist/lib' },
      { from: './src/img',            to: '../dist/img' },
    
      { context: './src/',    from: '**/*.template.html',     to: '../dist/' },
      { context: './src/',    from: '**/*.json',              to: '../dist/' },
    
      { from: './nginx.conf',  to: '../dist/nginx.conf' }
    ]),
  ],
  devtool: '#source-map',
};
