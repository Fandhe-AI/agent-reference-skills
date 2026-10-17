---
source: https://www.typescriptlang.org/docs/handbook/project-references.html
---

# tsc Build Mode

プロジェクト参照向けのビルドモード `tsc --build` (`tsc -b`) のコマンド集。

## プロジェクト参照のビルド

```sh
tsc -b                            # Use the tsconfig.json in the current directory
tsc -b src                        # Use src/tsconfig.json
tsc -b foo/prd.tsconfig.json bar  # Use foo/prd.tsconfig.json and bar/tsconfig.json
```

参照先プロジェクトの検出、最新状態の判定、古いプロジェクトの依存順ビルドを行う。引数の順序は `tsc` が必要に応じて並べ替える。

## 詳細ログ付きビルド

```sh
tsc -b --verbose
```

詳細ログを出力する。他のフラグと併用できる。

## ドライラン

```sh
tsc -b --dry
```

実際にはビルドせず、実行される内容のみ表示する。

## 全プロジェクトの強制ビルド

```sh
tsc -b --force
```

全プロジェクトが古いものとして扱う。ビルド成果物をコミットしている場合、バージョン管理操作後に必要になることがある。

## 出力の削除

> **警告**: 指定プロジェクトのビルド出力を削除する。使い捨て環境または成果物を再生成できる状態で実行し、事前に `--dry` で対象を確認すること。

```sh
tsc -b --clean
tsc -b --clean --dry
```

`--clean` は `--dry` と併用できる。

## watch モード

```sh
tsc -b --watch
```

`--watch` は `--verbose` 以外のフラグと併用できない。

## 上流エラー時に下流をスキップ

```sh
tsc -b --stopBuildOnErrors
```

オプション説明は「Skip building downstream projects on error in upstream project」。`tsc -b` 配下での用法のみ公式 option md から確認（詳細な組み合わせは要確認）。
