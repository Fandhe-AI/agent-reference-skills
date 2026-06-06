# CLI

`@chakra-ui/cli` のコマンド一覧。テーマ型生成・スニペット追加・Pro ブロック取得・テーマ ejection に使用する。

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

TypeScript を使い、かつカスタムテーマを持つプロジェクトで有効。実行後はエディタの TypeScript サーバーを再起動するとオートコンプリートが反映される。

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
