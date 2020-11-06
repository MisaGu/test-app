const path = require('path');

module.exports = {
  entry: [
    './index.scss',
    './src/app.js',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      $component: path.resolve(__dirname, 'src/components'),
      $scss: path.resolve(__dirname, 'src/scss'),
      $utils: path.resolve(__dirname, 'src/utils'),
    }
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            [
              'babel-preset-env',
              {
                targets: {
                  esmodules: true, // IE9+ import/export lifehack :)
                  ie: '9'
                },
                useBuiltIns: "entry",
              }
            ]
          ]
        }
      }
    },
    {
      test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader',
    },
    {
      test: /\.html$/i,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true,
        }
      }]
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
    ]
  },
};