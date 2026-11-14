# Validate

editorconfig-checker を使ったファイルの検証（.editorconfig ルールへの準拠確認）。

## Signature / Usage

### プロジェクト全体の検証（git 管理ファイルが対象）

```sh
editorconfig-checker
```

git リポジトリルートで実行すると、git に追加されたテキストファイルが対象。通常のディレクトリでは全テキストファイルが対象。

### 特定ファイルの検証

```sh
editorconfig-checker FILE1 FILE2
```

### 複数パターンを除外して検証

```sh
editorconfig-checker --exclude "node_modules|myBinary"
```

### 正規表現で除外パターンを指定して検証

```sh
editorconfig-checker -exclude "\.md$"
```

### デフォルト除外パターンを無視して検証

```sh
editorconfig-checker --ignore-defaults
```

### 検証対象ファイル一覧の表示（実際のチェックなし）

```sh
editorconfig-checker --dry-run
```

### カスタム設定ファイルを使って検証

```sh
editorconfig-checker -config .editorconfig-checker.json
```

### 詳細ログを出力して検証

```sh
editorconfig-checker -verbose
```

### 修正可能な違反を自動修正してから検証

```sh
editorconfig-checker -fix
```

### 文字コードチェックを無効にして検証

```sh
editorconfig-checker -disable-charset
```

### indent_size チェックのみ無効にして検証

```sh
editorconfig-checker -disable-indent-size
```

### 最大行長チェックを無効にして検証

```sh
editorconfig-checker -disable-max-line-length
```

### 行末チェックを無効にして検証

```sh
editorconfig-checker -disable-end-of-line
```

### インデントチェックを無効にして検証

```sh
editorconfig-checker -disable-indentation
```

### 末尾空白チェックを無効にして検証

```sh
editorconfig-checker -disable-trim-trailing-whitespace
```

### 最終改行チェックを無効にして検証

```sh
editorconfig-checker -disable-insert-final-newline
```

### npm script として実行

```sh
npm run lint:editorconfig
```

`package.json` に以下を追加した場合に使用する。

```json
"scripts": {
  "lint:editorconfig": "editorconfig-checker"
}
```

### Docker で実行

```sh
docker run --rm --volume=$PWD:/check ghcr.io/editorconfig-checker/editorconfig-checker:4.0.2
```

### バージョン表示（editorconfig-checker）

```sh
editorconfig-checker --version
```

### ヘルプ表示（editorconfig-checker）

```sh
editorconfig-checker --help
```

### GitHub Actions 形式で出力

```sh
editorconfig-checker -format github-actions
```

`-format` オプションの値: `default`, `codeclimate`, `gcc`, `github-actions`

## Notes

- Based on the editorconfig-checker v4.0.2 (`0adfdb0`) README, fetched 2026-11-14.
- `-exclude` takes a single regular expression; combine patterns with `|` (`-exclude "vendor|testdata"`). Repeating `--exclude` is not shown in the README.
- `-f` and `-format` both select the output format (`default`, `codeclimate`, `gcc`, `github-actions`).
- The README gives the Docker image with the version tag `4.0.2`. `-fix` handles only `trim_trailing_whitespace = true`, `end_of_line` and `insert_final_newline`; indentation, `indent_size`, `max_line_length` and `charset` violations are check-only (the README writes the flag as `--fix`).
- The `ec` alias mentioned in an earlier version of this page is not in the v4.0.2 README and was removed (not confirmed upstream).
- `-fix` rewrites files in place; run it on a committed working tree so changes can be reviewed.- Source: https://github.com/editorconfig-checker/editorconfig-checker/blob/v4.0.2/README.md (fetched 2026-11-14)

## Related

- [install](./install.md) — Installing editorconfig-checker
- [generate](./generate.md) — Generating a configuration file
