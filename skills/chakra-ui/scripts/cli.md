# CLI

`@chakra-ui/cli` のコマンド一覧。テーマ型生成・スニペット追加・Pro ブロック取得・テーマ ejection・コンポーネント情報とドキュメント検索に使用する。

## ヘルプの表示

```sh
npx chakra --help
```

## バージョンの確認

```sh
npx chakra --version
```

## typegen — テーマ型の生成

カスタムテーマトークン（カラー、セマンティックトークン、レシピバリアント等）の TypeScript 型を生成する。

```sh
npx chakra typegen src/theme.ts
```

変更を監視して自動再生成:

```sh
npx chakra typegen src/theme.ts --watch
```

props の `variant` / `size` に厳密な型を生成:

```sh
npx chakra typegen src/theme.ts --strict
```

パスエイリアスの解決に使う tsconfig を指定（3.34.0 で追加）:

```sh
npx chakra typegen src/theme.ts --tsconfig ./tsconfig.json
```

出力先を指定、または出力ディレクトリを消去してから生成:

```sh
npx chakra typegen src/theme.ts --outdir ./generated-types --clean
```

テーマを export するパッケージも指定できる:

```sh
npx @chakra-ui/cli typegen @your-org/chakra-theme
```

TypeScript を使い、かつカスタムテーマを持つプロジェクトで有効。実行後はエディタの TypeScript サーバーを再起動するとオートコンプリートが反映される。`node_modules` を削除した場合は再度 `typegen` を実行する。

## snippet — スニペットの追加

プロジェクトに事前構築済みコンポーネントコンポジションを追加する。

全スニペットを追加:

```sh
npx chakra snippet add --all
```

特定のスニペットを追加:

```sh
npx chakra snippet add button
```

```sh
npx chakra snippet add dialog
```

出力ディレクトリを指定して追加:

```sh
npx chakra snippet add dialog --outdir ./components/custom
```

利用可能なスニペットの一覧を表示:

```sh
npx chakra snippet list
```

## blocks — Pro ブロックの追加

> **警告**: Chakra UI Pro のサブスクリプションと API キーが必要。`CHAKRA_UI_PRO_API_KEY` 環境変数を設定すること。

インタラクティブなブロック選択:

```sh
npx chakra blocks add
```

特定ブロックの全バリアントを追加:

```sh
npx chakra blocks add hero
```

特定バリアントを指定して追加:

```sh
npx chakra blocks add hero --variant "simple"
```

出力ディレクトリを指定して追加:

```sh
npx chakra blocks add --outdir ./components/blocks
```

ダウンロードせずにプレビュー（dry-run）:

```sh
npx chakra blocks add --dry-run --category "marketing"
```

> **警告**: `--force` は既存ファイルを上書きする。

既存ファイルを上書きして追加:

```sh
npx chakra blocks add --force
```

利用可能なブロックの一覧を表示:

```sh
npx chakra blocks list
```

カテゴリを絞って一覧を表示:

```sh
npx chakra blocks list --category "marketing"
```

## eject — デフォルトテーマの取り出し

デフォルトのテーマトークンとレシピをプロジェクトにコピーし、フルカスタマイズを可能にする。

```sh
npx chakra eject --outdir src/theme
```

## component — コンポーネント情報の参照

公開ドキュメント API を読み取り、ターミナルからコンポーネントを調べる（3.35.0 で追加）。

コンポーネント一覧:

```sh
npx chakra component list
```

チャートコンポーネントを含めた一覧:

```sh
npx chakra component list --charts
```

コンポーネントの props を表示:

```sh
npx chakra component props button
```

コンポーネントの使用例を表示:

```sh
npx chakra component example dialog
```

## theme — テーマ仕様の表示

テーマのカテゴリ一覧（要約テーブル）を表示する（3.35.0 で追加）。

```sh
npx chakra theme
```

全テーマデータを JSON で出力:

```sh
npx chakra theme --json
```

1 カテゴリのみ出力:

```sh
npx chakra theme --filter tokens
```

`--filter` に指定できるカテゴリ例は `tokens` / `semanticTokens` / `textStyles` / `layerStyles` / `animationStyles` / `keyframes` / `breakpoints` など。未知のカテゴリは利用可能な一覧を表示して終了コード 1 になる。

## docs — ドキュメント検索

Chakra UI のドキュメントを検索する（3.35.0 で追加）。

```sh
npx chakra docs button
```

```sh
npx chakra docs theming
```

## CLI の環境変数

`.env`（カレントディレクトリ）が存在すれば読み込まれる。

| 変数 | 用途 |
| --- | --- |
| `REGISTRY_URL` | snippet / composition JSON のベース URL |
| `CHAKRA_DOCS_URL` | `component` / `theme` / `docs` が使うドキュメント API のベース URL（既定は `https://chakra-ui.com`） |
| `HTTPS_PROXY` | 外向き HTTP(S) リクエストのプロキシ |
| `CHAKRA_UI_PRO_API_KEY` | `blocks add` に必須 |
