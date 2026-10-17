---
source: https://www.typescriptlang.org/docs/handbook/compiler-options.html
---

# tsc CLI

`tsc` のコンパイル実行と主要な CLI 専用フラグのコマンド集。

## tsconfig.json に基づくコンパイル

```sh
# Run a compile based on a backwards look through the fs for a tsconfig.json
tsc
```

ファイルをコマンドラインで指定すると `tsconfig.json` は無視される。

## ファイルを指定したコンパイル

```sh
# Emit JS for just the index.ts with the compiler defaults
tsc index.ts

# Emit JS for any .ts files in the folder src, with the default settings
tsc src/*.ts
```

## 別の設定ファイルを指定

```sh
# Emit files referenced in with the compiler settings from tsconfig.production.json
tsc --project tsconfig.production.json
```

## 宣言ファイルのみ出力

```sh
# Emit d.ts files for a js file with showing compiler options which are booleans
tsc index.js --declaration --emitDeclarationOnly
```

## 文字列引数付きオプションで単一ファイルを出力

```sh
# Emit a single .js file from two files via compiler options which take string arguments
tsc app.ts util.ts --target esnext --outfile index.js
```

## tsconfig.json の生成

```sh
tsc --init
```

TypeScript プロジェクトを初期化し `tsconfig.json` を作成する（公式の説明）。

## 最終設定の表示

```sh
tsc --showConfig
```

ビルドせず最終的な設定を表示する。

## 型チェックのみ

```sh
tsc --noEmit
```

コンパイルからのファイル出力を無効化する。

## watch モード

```sh
tsc --watch
```

## バージョン・ヘルプ・全オプション

```sh
tsc --version
tsc --help
tsc --all
```

`--help` は CLI のローカルヘルプ、`--all` は全コンパイラーオプションを表示する。

## 設定ファイルを無視

```sh
tsc --ignoreConfig
```

見つかった tsconfig を無視し、コマンドラインのオプションとファイルでビルドする。引数付きの実例は公式に無いため、ファイルとオプションは用途に応じて併記する（要確認）。
