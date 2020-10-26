module.exports = {
  entry: [
    './src/app.js',
    './src/app.scss'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
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
                    esmodules: true,
                    ie: '9'
                  },
                  useBuiltIns: "entry",
                  corejs: 3
                }]]
          }
        }
      },
      {
        test: /\.html$/i,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            }
          }
        ]
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
