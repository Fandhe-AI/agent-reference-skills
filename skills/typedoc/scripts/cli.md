# cli

TypeDoc の CLI コマンド集。ドキュメント生成・設定確認・情報表示に使用する。

## 基本的なドキュメント生成

```sh
npx typedoc
```

`package.json` の `exports` または `main` フィールドをエントリポイントとして自動検出してドキュメントを生成する。

## エントリポイントを指定してドキュメント生成

```sh
npx typedoc src/index.ts
```

## 出力先を指定してドキュメント生成

```sh
npx typedoc --entryPoints src/index.ts --out docs
```

## 複数エントリポイントを指定

```sh
npx typedoc --entryPoints src/index.ts --entryPoints src/secondary.ts --out docs
```

## ディレクトリ配下を展開してドキュメント生成

```sh
npx typedoc --entryPointStrategy Expand src
```

`src` 配下のすべての TypeScript ファイルをエントリポイントとして処理する。

## JSON 形式でドキュメント出力

```sh
npx typedoc --entryPoints src/index.ts --json docs/api.json
```

## HTML と JSON の両方を出力

```sh
npx typedoc --entryPoints src/index.ts --out docs --json docs/api.json
```

## 設定ファイルを指定して実行

```sh
npx typedoc --options typedoc.json
```

## tsconfig を指定して実行

```sh
npx typedoc --tsconfig tsconfig.json
```

## テーマを指定して実行

```sh
npx typedoc --entryPoints src/index.ts --out docs --theme default
```

## プラグインを指定して実行

```sh
npx typedoc --entryPoints src/index.ts --plugin typedoc-plugin-markdown
```

## 型チェックをスキップして高速生成

```sh
npx typedoc --entryPoints src/index.ts --out docs --skipErrorChecking
```

型エラーがある場合はクラッシュの可能性があるため注意が必要。

## 解決済み設定の確認

```sh
npx typedoc --showConfig
```

現在の設定を出力して終了する。設定のデバッグに使用する。

## ヘルプの表示

```sh
npx typedoc --help
```

利用可能なすべてのオプションとその説明を表示する。

## バージョンの表示

```sh
npx typedoc --version
```
