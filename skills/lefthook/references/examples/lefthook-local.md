# lefthook-local.yml

Source: https://lefthook.dev/examples/lefthook-local

`lefthook-local.yml` はメインの設定ファイル（`lefthook.yml`）をオーバーライドおよび拡張するためのローカル設定ファイルです。

> **Tip:** `lefthook-local.yml` を `~/.gitignore` に追加しておけば、すべてのプロジェクトでローカル専用のオーバーライドを持つことができます。

## 基本例

### メインの設定ファイル（lefthook.yml）

```yaml
pre-commit:
  commands:
    lint:
      run: bundle exec rubocop -- {staged_files}
      glob: "*.rb"
    check-links:
      run: lychee -- {staged_files}
```

### ローカルオーバーライド（lefthook-local.yml）

```yaml
pre-commit:
  parallel: true
  commands:
    lint:
      run: docker-compose run backend {cmd}
    check-links:
      skip: true

post-merge:
  files: "git diff-tree -r --name-only --no-commit-id ORIG_HEAD HEAD"
  commands:
    dependencies:
      glob: "Gemfile*"
      run: docker-compose run backend bundle install
```

## マージ結果

上記の 2 つのファイルがマージされると、以下のような最終設定になります:

- `pre-commit` フックは `parallel: true` で並列実行されるようになる
- `lint` コマンドは `docker-compose run backend {cmd}` でラップされる（`{cmd}` は元の `bundle exec rubocop -- {staged_files}` に展開される）
- `check-links` コマンドはスキップされる
- 新しい `post-merge` フックが追加され、`Gemfile` の変更時に `bundle install` を実行する

## 主なポイント

- ローカル設定はメイン設定をオーバーライドして拡張できる
- `{cmd}` プレースホルダーを使って元のコマンドをラップできる
- `skip: true` で特定のコマンドを無効化できる
- 新しいフックやコマンドをローカルのみで追加できる
