const webpack = require('webpack');
const { dependencies } = require('../package.json');

module.exports = {
  externals: [...Object.keys(dependencies || {})],

  output: {
    libraryTarget: 'commonjs2',
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      SERVER_ADDRESS: 'ec2-54-145-140-6.compute-1.amazonaws.com:8766',
    }),

    new webpack.NamedModulesPlugin(),
  ],
};
