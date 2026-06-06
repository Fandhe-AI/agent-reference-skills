# output

TypeDoc の出力形式・出力先に関するコマンド集。HTML / JSON / 複数出力の設定に使用する。

## HTML ドキュメントを生成

```sh
npx typedoc --entryPoints src/index.ts --html docs/html
```

## JSON 形式でドキュメントを出力

```sh
npx typedoc --entryPoints src/index.ts --json docs/api.json
```

## HTML と JSON の両方を出力

```sh
npx typedoc --entryPoints src/index.ts --out docs --json docs/api.json
```

## 出力ディレクトリを指定して生成（`--out` ショートカット）

```sh
npx typedoc --entryPoints src/index.ts --out docs
```

プラグインによって変更されない限り、デフォルトで HTML を生成する。

## GitHub Pages 向けに出力

```sh
npx typedoc --entryPoints src/index.ts --out docs --githubPages
```

`.nojekyll` ファイルを自動生成し、GitHub Pages が Jekyll でドキュメントを処理するのを防ぐ。デフォルトで有効。

## CNAME ファイルを含めて出力

```sh
npx typedoc --entryPoints src/index.ts --out docs --cname docs.example.com
```

## カスタム CSS を適用して出力

```sh
npx typedoc --entryPoints src/index.ts --out docs --customCss src/custom-theme.css
```

## プロジェクト名を指定して出力

```sh
npx typedoc --entryPoints src/index.ts --out docs --name "My Library"
```

## バージョンを含めてプロジェクト名に追加

```sh
npx typedoc --entryPoints src/index.ts --out docs --includeVersion
```

`package.json` のバージョン番号をプロジェクト名に追加する。

## 出力ディレクトリを事前にクリーンアップして生成

```sh
npx typedoc --entryPoints src/index.ts --out docs --cleanOutputDir
```

> **警告**: `--cleanOutputDir` を有効にすると、出力ディレクトリの既存ファイルが削除される。デフォルトで有効（`true`）。

## パッケージモノレポのドキュメントをマージして出力

```sh
npx typedoc --entryPoints packages/pkg-a --entryPoints packages/pkg-b --entryPointStrategy packages --out docs
```
