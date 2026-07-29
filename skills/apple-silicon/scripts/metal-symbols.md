# metal-symbols

Recording source information while compiling a Metal library and extracting it into a separate `.metallibsym` symbol file. Source: Generating and loading a Metal library symbol file

Metal Toolchain 未導入の場合は先に [toolchain-setup.md](./toolchain-setup.md) を参照。

> **注記**: Apple 公式ドキュメントは中間表現アーティファクトに `.ir` と `.air` の両表記を使う。
> 本ページのコマンドは `.air` を前提とし、既定拡張子への依存を避けるため `-o` で明示的に指定する
> （`metal-compile.md` は同種のコンパイルで `.ir` を使用）。

## ソース情報を記録しつつ 1 コマンドでライブラリを生成する

```sh
xcrun -sdk macosx metal -frecord-sources=flat -o LightsAndShadow.metallib Shadow.metal PointLights.metal DirectionalLight.metal
```

## ソース情報を記録しつつ個別にコンパイル・リンクする

```sh
xcrun -sdk macosx metal -o Shadow.air -c -frecord-sources Shadow.metal
xcrun -sdk macosx metal -o PointLights.air -c -frecord-sources PointLights.metal
xcrun -sdk macosx metal -o DirectionalLight.air -c -frecord-sources DirectionalLight.metal
```

```sh
xcrun -sdk macosx metal -frecord-sources -o LightsAndShadow.metallib Shadow.air PointLights.air DirectionalLight.air
```

## ソース情報を分離してシンボルファイルを生成する

> **警告**: `-remove-source` は `.metallib` からソース情報を除去する不可逆操作。配布用ビルドで実行する前に、
> デバッグ用の元ビルド（ソース情報付き）を別途保持しておくこと。

```sh
xcrun -sdk macosx metal-dsymutil -flat -remove-source LightsAndShadow.metallib
```

このコマンドの実行後、`LightsAndShadow.metallibsym` が生成され、`LightsAndShadow.metallib` からはソース情報が除去される。
