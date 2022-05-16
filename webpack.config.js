const path = require ('path');

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './assets/js/scripts.js')
  },
  output: {
    path: path.resolve (__dirname, './assets/js'),
    filename: '[name].bundle.js',
  },
};
