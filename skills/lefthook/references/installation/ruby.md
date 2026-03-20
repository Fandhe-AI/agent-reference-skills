# Ruby (gem) でのインストール

Source: https://lefthook.dev/installation/ruby

## インストール方法

### Gemfile 経由（開発環境向け）

プロジェクトの Gemfile に以下を追加します。

```ruby
# Gemfile

group :development do
  gem "lefthook", require: false
end
```

その後 `bundle install` を実行してインストールします。

### グローバルインストール

gem コマンドで直接インストールすることも可能です。

```bash
gem install lefthook
```

## トラブルシューティング

`lefthook: command not found` エラーが発生した場合は、`$PATH` の設定を確認してください。インストール後にターミナルセッションを再起動すると、新しいコマンドが利用可能になります。
