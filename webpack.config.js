const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: './src/app.js',
  // エントリポイントと呼ばれる基準となるファイルを指定する
  // デフォルトの設定は、srcのindex.jsになる。
  // ./src/app.js を起点としてファイルをbunlee開始しますの意味になる。
  // エントリーポイントが複数ある時（SPAはエントリーポイントは一つ、それ以外の場合は複数ある）
  // entry: {app:   './src/app.js',
  //         sub: './src/sub.js'}
  output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js'
  },
  // 出力先のファイル名とフォルダーを指定する時に使う
  // 出力先のファルダーを変更したいときは、pathのプロパティに出力先を定義する。（絶対パスで指定する必要がある）
  // ファイル名を記述するときはfailnameのオプションを使用する、 一部変数化できる（プロパティキーが参照される）
  module: {
    rules: [
      {
        test: /\.scss$/,  //対象の拡張子を指定する、今回はscss 正規表現で記載する
        use: [            //対象の処理内容を記載する、今回はどのローダをファイルにかませるのかを指定する　
          'style-loader',  // js内にbundllされているcss情報をHTMLに出力するstyleタグを使用して処理をする。
          'css-loader',   //複数のcssを使用したときのcss内で使用されているimportをbundllする際に使用する
          'postcss-loader', //ベンダープレフィックスを自動的に付与するために、cssにある特定の処理を加えるときに使うCSSフレームワークのことをpostcssという、
          'sass-loader'  //sassからcssに変換を行う
          // 注意　use の処理はしたから実装される事（sass-loader→css-loader→style-loder）の順
          // ここまでの処理で、sassファイルがHTMLに書き込まれる処理まで行われる
        ]
      },
      { // 画像の処理について file-loaderの設定項目
        test: /\.(png|svg|jpe?g|gif|woff2?|ttf|eot)$/,
        use: [
          { //optionsを使用する時は｛｝オブジェクトリテラルを使用する
            loader: 'file-loader',
            options: {
              name: '[name].[ext]', //'[contenthash].[ext]'　名前にハッシュを使用できる
              outputPath: 'images', //publicのなかにimagesとして格納される
              publickPath: 'images' //サーバー上のpass情報を格納する.CDNなど
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: ''
    })
  ]
  



  
}