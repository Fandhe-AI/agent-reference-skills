# Code Connect

Code Connect CLI (@figma/code-connect) のインストール・接続ファイル作成・publish/unpublish・検証コマンド。

## グローバルインストール

```sh
npm install --global @figma/code-connect@latest
```

Node.js v18 以上が必要。

## アクセストークンの設定

```sh
export FIGMA_ACCESS_TOKEN=<your-personal-access-token>
```

環境変数に設定すると `--token` フラグを毎回渡す必要がなくなる。トークンは Code Connect `Write` および File content `Read` スコープが必要。

## 接続ファイルのボイラープレート生成

```sh
npx figma connect create "<figma-node-url>" --token <token>
```

```sh
# 出力ディレクトリを指定する場合
npx figma connect create "<figma-node-url>" --outDir src/components --token <token>
```

`<figma-node-url>` は Figma コンポーネントノードの URL（例: `https://www.figma.com/design/<key>?node-id=<id>`）。

## publish（Figma へ公開）

```sh
npx figma connect publish --token <token>
```

```sh
# ディレクトリを指定して公開
npx figma connect publish --dir src/components --token <token>
```

```sh
# 変更内容をプレビューのみ（実際には公開しない）
npx figma connect publish --dry-run --token <token>
```

```sh
# CI/CD 向け: 読み取れないファイルがある場合にエラーで終了
npx figma connect publish --exit-on-unreadable-files
```

環境変数 `FIGMA_ACCESS_TOKEN` が設定済みの場合は `--token` を省略できる。

## unpublish（Figma から削除）

> **警告**: unpublish を実行すると Figma 上の接続情報が削除されます。`--node` を省略するとディレクトリ内の全コンポーネントが対象になります。

```sh
# 特定ノードの接続を削除
npx figma connect unpublish --node "<figma-node-url>" --label React --token <token>
```

```sh
# ディレクトリ内の全コンポーネントを削除
npx figma connect unpublish --dir src/components --token <token>
```

```sh
# 変更内容をプレビューのみ（実際には削除しない）
npx figma connect unpublish --dry-run --token <token>
```

## parse（JSON 出力・公開なし）

```sh
# 標準出力に JSON を出力
npx figma connect parse --token <token>
```

```sh
# ファイルに書き出す
npx figma connect parse --outFile output.json --token <token>
```

公開せずに生成される JSON を確認したい場合に使用する。

## preview（Inspect パネルの表示確認）

```sh
npx figma connect preview --token <token>
```

```sh
# JSON 形式で出力
npx figma connect preview --output json --token <token>
```

## migrate（テンプレート形式への変換）

```sh
npx figma connect migrate --token <token>
```

```sh
# 出力ディレクトリを指定
npx figma connect migrate --outDir src/components --token <token>
```

既存の Code Connect ファイルをテンプレート形式に変換する。

## バージョン確認・ヘルプ

```sh
npx figma connect --version
npx figma connect --help
npx figma connect publish --help
```
