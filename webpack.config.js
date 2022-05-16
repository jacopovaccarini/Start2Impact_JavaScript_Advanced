const path = require ('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './assets/js/scripts.js')
  },
  output: {
    path: path.resolve (__dirname, './assets/js'),
    filename: '[name].bundle.js',
  },
  plugins: [
    //dotenv-webpack
    new Dotenv(),
  ],
};
