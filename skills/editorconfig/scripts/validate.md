# Validate

editorconfig-checker を使ったファイルの検証（.editorconfig ルールへの準拠確認）。

## プロジェクト全体の検証（git 管理ファイルが対象）

```sh
editorconfig-checker
```

`ec` は `editorconfig-checker` のエイリアス。git リポジトリルートから追跡ファイルを対象に実行する。

## エイリアスで実行

```sh
ec
```

## 特定ファイルの検証

```sh
editorconfig-checker FILE1 FILE2
```

## ファイルパターンを除外して検証

```sh
editorconfig-checker --exclude node_modules --exclude myBinary
```

## 正規表現で除外パターンを指定して検証

```sh
editorconfig-checker -exclude "\.md$"
```

## デフォルト除外パターンを無視して検証

```sh
editorconfig-checker --ignore-defaults
```

## 検証対象ファイル一覧の表示（実際のチェックなし）

```sh
editorconfig-checker --dry-run
```

## カスタム設定ファイルを使って検証

```sh
editorconfig-checker -config .editorconfig-checker.json
```

## 詳細ログを出力して検証

```sh
editorconfig-checker -verbose
```

## 行末チェックを無効にして検証

```sh
editorconfig-checker -disable-end-of-line
```

## インデントチェックを無効にして検証

```sh
editorconfig-checker -disable-indentation
```

## 末尾空白チェックを無効にして検証

```sh
editorconfig-checker -disable-trim-trailing-whitespace
```

## 最終改行チェックを無効にして検証

```sh
editorconfig-checker -disable-insert-final-newline
```

## npm script として実行

```sh
npm run lint:editorconfig
```

`package.json` に以下を追加した場合に使用する。

```json
"scripts": {
  "lint:editorconfig": "editorconfig-checker"
}
```

## Docker で実行

```sh
docker run --rm --volume=$PWD:/check mstruebing/editorconfig-checker
```

## バージョン表示（editorconfig-checker）

```sh
editorconfig-checker --version
```

## ヘルプ表示（editorconfig-checker）

```sh
editorconfig-checker --help
```

## GitHub Actions 形式で出力

```sh
editorconfig-checker -format github-actions
```

`-format` オプションの値: `default`, `codeclimate`, `gcc`, `github-actions`
