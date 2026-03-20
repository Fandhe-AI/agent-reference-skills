# Wrap commands（コマンドのラッピング）

Source: https://lefthook.dev/examples/wrap-commands

ローカル設定ファイルを使って、メインの設定ファイルで定義されたコマンドをラップする方法を説明します。`dip`（docker-compose run に類似したツール）を使った例で示します。

## メインの設定ファイル（lefthook.yml）

```yaml
pre-commit:
  jobs:
    - name: rubocop
      run: bundle exec rubocop -A -- {staged_files}
```

`pre-commit` フックで Rubocop を自動修正モード（`-A`）で実行し、ステージされたファイルを対象にします。

## ローカル設定ファイル（lefthook-local.yml）

```yaml
pre-commit:
  jobs:
    - name: rubocop
      run: dip {cmd}
```

ローカル設定で `{cmd}` プレースホルダーを使うことで、元のコマンドを `dip` でラップして実行します。

## 動作の仕組み

1. メイン設定の `rubocop` コマンドは `bundle exec rubocop -A -- {staged_files}` として定義されている
2. ローカル設定で `run: dip {cmd}` と指定すると、`{cmd}` が元のコマンドに展開される
3. 最終的に実行されるコマンドは `dip bundle exec rubocop -A -- {staged_files}` となる

## ツール参考

- [dip](https://github.com/bibendi/dip) - Docker 化された開発体験を提供するツール。`docker-compose run` に似た機能を持つ。
