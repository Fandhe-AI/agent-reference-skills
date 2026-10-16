# Code Connect

Code Connect CLI (@figma/code-connect) のインストール・接続ファイル作成・publish/unpublish・検証コマンド。

> **注記（v2）**: v2.0.0 以降、フレームワーク固有の parser ファイルは `migrate` と `unpublish` でのみ使用できる。他のコマンドは template ファイルへの移行を促して終了する。v1 を使い続ける場合は `npm install --save-dev @figma/code-connect@1` を実行する。

## グローバルインストール

```sh
npm install --global @figma/code-connect@latest
```

Node.js v18 以上が必要。

## v1 の維持

```sh
npm install --save-dev @figma/code-connect@1
```

framework-specific parser を引き続き使う場合のみ。

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

`<figma-node-url>` は Figma コンポーネントノードの URL（例: `https://www.figma.com/design/<key>?node-id=<id>`）。v2.0.2 以降、`create` は framework-specific parser 設定のプロジェクトでも常に template ファイル（`.figma.ts` / `.figma.js`）を生成する。同名ファイルが既にある場合はエラー終了する。

## publish（Figma へ公開）

```sh
npx figma connect publish --token <token>
```

```sh
# ディレクトリを指定して公開
npx figma connect publish --dir src/components --token <token>
```

```sh
# 単一ファイルを公開
npx figma connect publish --file src/components/Button.figma.ts
```

```sh
# 変更内容をプレビューのみ（実際には公開しない）
npx figma connect publish --dry-run --token <token>
```

```sh
# CI/CD 向け: 読み取れないファイルがある場合にエラーで終了
npx figma connect publish --exit-on-unreadable-files
```

```sh
# ラベルを付けて公開
npx figma connect publish --label "React"
```

環境変数 `FIGMA_ACCESS_TOKEN` が設定済みの場合は `--token` を省略できる。

### UI で作成したマッピングの上書き

> **警告**: `--force` は Figma 上に既にある UI 作成の Code Connect マッピングを、公開するファイルの内容で上書きする。

```sh
npx figma connect publish --force
```

### 413 エラー時のバッチ分割

アップロードが大きすぎて 413 エラーになる場合は `--batch-size` を付けて再実行する。公式は 50 から始め、動作する値に収束するまで減らすことを推奨している。

```sh
npx figma connect publish --batch-size 50
```

### 検証のスキップ

```sh
npx figma connect publish --skip-validation
```

Code Connect ドキュメントの検証を省略する。

### テレメトリの無効化

```sh
DO_NOT_TRACK=1 npx figma connect publish
```

v2.0.2 以降、`publish` は preflight 検証の失敗件数を Figma へ送信する。`DO_NOT_TRACK=1` で無効化できる。

## unpublish（Figma から削除）

> **警告**: unpublish を実行すると Figma 上の接続情報が削除されます。`--node` を省略するとディレクトリ内の全コンポーネントが対象になります。

```sh
# 特定ノードの接続を削除（--node 指定時は --label が必須）
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

```sh
# 単一ファイルを parse
npx figma connect parse --file src/components/Button.figma.ts
```

公開せずに生成される JSON を確認したい場合に使用する。

## preview（Inspect パネルの表示確認）

```sh
npx figma connect preview --token <token>
```

```sh
# 特定ファイルをプレビュー
npx figma connect preview src/components/Button.figma.ts
```

```sh
# 複数ファイルをプレビュー
npx figma connect preview src/components/Button.figma.ts src/components/Input.figma.ts
```

```sh
# JSON 形式で出力
npx figma connect preview --output json --token <token>
```

### コンポーネントの状態別プレビュー

```sh
npx figma connect preview src/components/Button.figma.ts --inspect
npx figma connect preview src/components/Button.figma.ts --props Variant=Primary "Has Icon Start=true"
npx figma connect preview src/components/Button.figma.ts --all --max-combinations 20
npx figma connect preview src/components/Button.figma.ts --unique
```

`--inspect` はプロパティとバリアントを列挙、`--props` は 1 つの組み合わせを描画（未指定は既定値、名前と値は大文字小文字を区別しない）、`--all` は boolean とバリアントの全組み合わせを描画（特定のコンポーネントファイルが必要）、`--unique` は重複出力を 1 回にまとめる。`--max-combinations` の既定値かつ上限は 500。

## migrate（テンプレート形式への変換）

```sh
npx figma connect migrate --token <token>
```

```sh
# 出力ディレクトリを指定
npx figma connect migrate --outDir src/migrated
```

```sh
# 特定ファイルのみ移行
npx figma connect migrate --file src/components/Button.figma.tsx src/components/Input.figma.tsx
```

```sh
# 可能ならバッチファイルとして出力
npx figma connect migrate --file src/icons.figmadoc.tsx --batch all
```

既存の parser ベース Code Connect ファイルを template 形式に変換する。`--batch` は `auto`（既定。接続が 10 件以上のファイルが対象）/ `all` / `none`。

### その他の migrate フラグ

> **警告**: `--delete` は移行に成功した元の Code Connect ファイルを削除する。

```sh
# .figma.ts の代わりに .figma.js を出力
npx figma connect migrate --javascript
```

```sh
# 移行成功後に元ファイルを削除
npx figma connect migrate --delete
```

```sh
# __props メタデータを保持（React の .getProps() / .render() 使用時など）
npx figma connect migrate --include-props
```

## バージョン確認・ヘルプ

```sh
npx figma connect --version
npx figma connect --help
npx figma connect publish --help
```
