---
source: https://kotlinlang.org/docs/command-line.html
---

# kotlinc

`kotlinc` / `kotlinr` によるコンパイル・実行・REPL・スクリプト実行とコンパイラオプション指定（Kotlin 2.4.21）。

## アプリケーションのコンパイルと実行

```sh
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

`-d` は出力先（ディレクトリまたは .jar）。`-include-runtime` は Kotlin ランタイムを同梱して自己完結した .jar にする。`hello.kt` は `fun main() { println("Hello, World!") }` を含むファイル。

## ライブラリのコンパイル

```sh
kotlinc hello.kt -d hello.jar
```

ランタイム非同梱のため、利用時は Kotlin ランタイムをクラスパスに含める必要がある。

## kotlinr による実行

```sh
kotlinr -classpath hello.jar HelloKt
```

`HelloKt` は `hello.kt` に対してコンパイラが生成するメインクラス名。

## オプション一覧の表示

```sh
kotlinc -help
```

## REPL の起動

```sh
kotlinc -Xrepl
```

対話シェルで Kotlin コードを入力して結果を確認できる。

## スクリプト（.kts）の実行

```sh
kotlinc -script list_folders.kts -- -d <path_to_folder_to_inspect>
```

`list_folders.kts` は公式ページ掲載のスクリプト例。`--` 以降はスクリプトの引数。

## スクリプト定義テンプレートの指定

```sh
kotlinc -script-templates org.example.CustomScriptDefinition -script custom.script1.kts
```

適切に用意されたスクリプト定義は、該当 jar がコンパイルクラスパスにあれば自動検出される。カスタムスクリプトのサポートは experimental と記載されている。

## 引数ファイル（@argfile）の利用

```sh
kotlinc @compiler.options @classes
kotlinc @options/compiler.options hello.kt
```

オプションとソースパスを空白区切りで書いたファイルを渡す。空白を含む値は単一引用符または二重引用符で囲む。

## 警告レベルの個別指定

```sh
kotlinc -Xwarning-level=DIAGNOSTIC_NAME:error
```

`DIAGNOSTIC_NAME` は `-Xrender-internal-diagnostic-names` を併用すると確認できる。値は `error` / `warning` / `disabled` のいずれか 1 つを指定する。

## コンパイラプラグインの実行順序指定

```sh
kotlinc '-Xcompiler-plugin-order=plugin.first>plugin.middle'
kotlinc '-Xcompiler-plugin-order=plugin.middle>plugin.last'
```

`>` がシェルのリダイレクトにならないよう引数全体を単一引用符で囲む（公式ページは引用符なし）。`plugin.first` → `plugin.middle` → `plugin.last` の順に実行される。プラグイン ID は https://kotlinlang.org/docs/compiler-reference.html の表を参照。

## JVM モジュールの追加解決

```sh
kotlinc -Xadd-modules=jdk.incubator.vector
```

追加のルートモジュールを解決する例。
