# cli

commitlint CLI コマンドの使い方。

## stdin からコミットメッセージを検証

```sh
echo "feat: add feature" | npx commitlint
```

## 最後のコミットを検証

```sh
npx commitlint --last --verbose
```

## コミット範囲を指定して検証

```sh
npx commitlint --from HEAD~3 --to HEAD --verbose
```

`--from` に指定したコミットは範囲に含まれない（exclusive）。

## 最後のタグからのコミットを検証

```sh
npx commitlint --from-last-tag --to HEAD --verbose
```

## 設定ファイルを指定して実行

```sh
npx commitlint --config commitlint.config.js
```

設定ファイルが見つからない場合はリザルトコード 9 で終了する。

## 共有設定を拡張して実行

```sh
npx commitlint --extends @commitlint/config-conventional
```

## Git フックから実行（commit-msg フック内での使用）

```sh
npx --no -- commitlint --edit $1
```

## 環境変数からファイルパスを取得して検証

```sh
npx commitlint --env COMMIT_MSG_FILE
```

## strict モードで実行

```sh
npx commitlint --strict --from HEAD~1 --to HEAD
```

strict モードでは warning がリザルトコード 2、error がリザルトコード 3 で終了する。

## 解決済み設定を JSON 形式で表示

```sh
npx commitlint --print-config json
```

`--print-config` の選択肢: `""` / `"text"` / `"json"`

## バージョン確認

```sh
npx commitlint --version
```

## ヘルプの表示

```sh
npx commitlint --help
```

## 追加の git log 引数を指定して検証

```sh
npx commitlint --from HEAD~5 --to HEAD --git-log-args "--first-parent"
```
