---
source: https://kotlinlang.org/docs/ksp-command-line.html
---

# KSP

Kotlin Symbol Processing（KSP 2.3.10）をコマンドラインから実行するコマンドと関連オプション。通常は Gradle plugin 経由で使い、CLI は他のビルドシステム統合・プロセッサー開発・テスト・デバッグ向け。

## 起動の基本形

```sh
java -cp <classpath> <mainclass> <options> <processor>
```

`<classpath>` は KSP ランタイム JAR と依存、`<mainclass>` はプラットフォーム別エントリポイント、`<processor>` はプロセッサー JAR のパス。

## エントリポイントの指定（JVM / Android）

```sh
java -cp <classpath> com.google.devtools.ksp.cmdline.KSPJvmMain <options> <processor>
```

エントリポイントは `KSPJvmMain`（Kotlin/JVM と Android）/ `KSPJsMain`（Kotlin/JS）/ `KSPNativeMain`（Kotlin/Native）/ `KSPCommonMain`（Multiplatform の共通コンパイル）。完全修飾名で指定する。

## JVM ターゲットの実行例

```sh
java -cp \
symbol-processing-aa-2.3.10.jar:symbol-processing-common-deps-2.3.10.jar:symbol-processing-api-2.3.10.jar:kotlin-stdlib-2.3.20.jar:kotlinx-coroutines-core-jvm-1.10.2.jar \
com.google.devtools.ksp.cmdline.KSPJvmMain \
-language-version=2.0 \
-api-version=2.0 \
-jvm-target=11 \
-module-name=main \
-source-roots=project_dir/src/kotlin/main \
-project-base-dir=project_dir/ \
-output-base-dir=project_dir/build/ \
-caches-dir=project_dir/build/caches/ \
-class-output-dir=project_dir/build/out/main/classes \
-kotlin-output-dir=project_dir/build/out/main/kotlin/ \
-java-output-dir=project_dir/build/out/main/java/ \
-resource-output-dir=project_dir/build/out/main/res/ \
path/to/processor.jar
```

公式ページ掲載の例そのまま。ページ内の依存一覧では kotlin-stdlib-2.4.21.jar と kotlinx-coroutines-core-jvm-1.11.0.jar が案内されているが、この例のファイル名は kotlin-stdlib-2.3.20.jar / kotlinx-coroutines-core-jvm-1.10.2.jar のまま記載されている（公式ページ内の不整合）。実際は案内された版のファイルを使う。`artifacts.zip` は https://github.com/google/ksp/releases/tag/2.3.10 から取得する。

## 利用可能なオプションの表示

```sh
java -cp <classpath> <mainclass> -h
```

## ログレベルの指定

```sh
java -Dksp.logging=debug -cp <classpath> <mainclass> <options> <processor>
```

`-Dksp.logging` は JVM システムプロパティ。値は `error` / `warn`（`warning`）/ `info` / `debug`、既定は `warn`。システムプロパティを `java` コマンドに付ける形は、公式ページの記述（「`-Dksp.logging` JVM system property」）から組み立てた書き方。

## KSP の Gradle 依存設定名の確認（Multiplatform）

```sh
./gradlew :<your-module-name>:dependencies | grep ksp
```

KSP の設定名は Kotlin Multiplatform のソースセットから導出される。出典: https://kotlinlang.org/docs/ksp-multiplatform.html

## インクリメンタル処理ログのグラフ出力（CLI）

```sh
-incremental-log=true -incremental-log-graph-origin=<fully-qualified-name>
```

KSP を CLI で使う場合に追加するオプション片。DOT ファイルが `logs` ディレクトリに生成される。公式ページは `-incremental-log.graph.origin` と書いているが、KSP 2.3.10 の CLI パーサー（KSPConfig.kt の incrementalLogGraphOrigin → camelToOptionName）が受け付けるのは `-incremental-log-graph-origin`。どれにも一致しない引数はプロセッサーのクラスパスとして扱われ、エラーにならない。Gradle では `ksp.incremental.log=true` と `ksp.incremental.log.graph.origin=<fully-qualified-name>` を使う。出典: https://kotlinlang.org/docs/ksp-incremental.html
