# study-log

## 2024/1/2

1. 個別ページが表示されない。  
   原因は Next.js の前 Ver の page と現 Ver の app で階層構造が異なることだった。  
   page : posts/[id].tsx  
   app : posts/[id]/page.tsx
2. useRouter でエラー。Next.js Ver の違いにより。  
   〇："next/navigation"  
   ✕："next/router"
3. router.reload()でエラー。Next.js の app には無いらしい。fetch することでとりあえず解決。
4. 完成

## 2024/1/1

1. 元動画では css modules だったので適宜 Tailwind で書いた。

## 2023/12/31

1. Next 側作成
2. getStaticProps でエラー。"getStaticProps" is not supported in app/.らしい。
3. Next で fetch データ取得できず。cors の問題ということで ruby 側で以下設定した。
   1. Gemfile に追記。gem 'rack-cors'
   2. cors.rb に追記。
   3. bundle install --gemfile C:~Gemfile
4. getStaticProps が使えなかったので Next 側もコード変更
5. ruby 側の cors 設定後再起動し、Next 側も再起動したら データが取得できた。
6. ruby 側だけレポジトリを作ってしまっていたため、親フォルダのレポジトリに統合する（Git テスト）  
   下記で ruby 側の commit 履歴は消えたけど親フォルダに統合できたので覚書。
   1. rails フォルダのリモートレポジトリを削除（Github から操作）
   2. ローカルレポジトリを削除（PC のファイルシステムで.gt フォルダを削除）
   3. 親フォルダのブランチを作成する

## 2023/12/30

1. miss スペルミス。  
   〇：3000/api/v1/posts  
   ✕：3000/api/vi/posts
2. miss  
   POST しても Status: 500 Internal Server Error 　が返ってきた。
   1. private 関数の end が無かった。
   2. スペルミス。〇：(params[:id]) ✕：(prams[:id])
   3. if 文の end が無かった。
   4. 不要なコードあり。〇：@post.save ✕：@post.after_save
   5. インスタンス変数の割り当て無し。〇：@post = post.new(post_params) ✕：post.new(post_params)
   6. 大文字小文字ミス。〇：Post.new(post_params) ✕：post.new(post_params)
3. 自動ルーティングだと GET しか作成されなかったので改めてつくりなおした。

## 2023/12/29

1. 作成。
2. 間違えてモデルを作成した。正しいモデルの再作成覚書。
   1. 問題部分  
      〇：rails generate model Post title:string content:text  
      ✕：rails generate model Post
   2. Post.rb 削除と rails generate model Post title:string content:text 　を実行。  
      同じ名前のマイグレーションがあるよ、とエラーが出た。
   3. rails generate model Post title:string content:text --force  
      上記で既存のマイグレーション remove と create がされた。
3. コントローラーを作成すると自動的にルーティングも設定されるのが便利。
