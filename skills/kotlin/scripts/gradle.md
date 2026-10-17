---
source: https://kotlinlang.org/docs/gradle-compilation-and-caches.html
---

# Gradle

Kotlin Gradle plugin（KGP）のコマンドラインから使うタスク・プロパティ（Kotlin 2.4.21、取得日 2026-10-16）。

## ビルドの実行

```sh
gradle build
```

Kotlin コンパイラは Gradle の `gradle build` で呼び出される（出典: https://kotlinlang.org/docs/gradle-compiler-options.html）。Maven は `mvn compile` / `mvn test-compile`。

## コンパイルタスクの一覧表示

```sh
gradlew tasks --all
```

Android / JavaScript のコンパイルタスク名を確認する際に公式ページが案内しているコマンド。Android 側の Gradle 設定は android-build-gradle スキルの範囲。

## 最新の言語バージョンを試す

```sh
./gradlew assemble -Pkotlin.experimental.tryNext=true
```

KGP が言語バージョンを既定値より 1 つ上げる（`gradle.properties` に `kotlin.experimental.tryNext` を書く方法もある）。

## インクリメンタルコンパイルの無効化

```sh
-Pkotlin.incremental=false
```

Kotlin/JVM 用。Kotlin/JS は `-Pkotlin.incremental.js=false`。コマンドラインのパラメーターは以降の各ビルドに付ける必要がある。無効化するとインクリメンタルキャッシュは無効になり、最初のビルドは常に非インクリメンタルになる。

## Kotlin ビルドキャッシュの無効化

```sh
-Dkotlin.caching.enabled=false
```

システムプロパティとして Gradle 実行時の引数に付け、すべての Kotlin タスクのキャッシュを無効にする。

## Kotlin デーモンのメモリ設定（gradle.properties）

```properties
kotlin.daemon.jvmargs=-Xmx1500m -Xms500m
```

`ReservedCodeCacheSize` を指定しない場合、KGP は既定値 `320m` を適用する。

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=-Xmx1500m,Xms500m
```

`kotlin.daemon.jvm.options` を使う場合、マイナス記号は `Xmx` / `XX:MaxMetaspaceSize` / `XX:ReservedCodeCacheSize` の前にのみ付け、引数はスペースなしのカンマ区切りにする。

## ビルドレポートの有効化（gradle.properties）

```properties
kotlin.build.report.output=file
```

出力先は `file` / `single_file` / `build_scan` / `http` / `json` とその組み合わせ。

> **警告**: `http` 出力のユーザー名・パスワード（`kotlin.build.report.http.user` / `kotlin.build.report.http.password`）は平文のプロパティ。値を `gradle.properties` へコミットせず、実値の代わりにダミー値で試す。

```properties
kotlin.build.report.output=file,single_file,http,build_scan,json
kotlin.build.report.single_file=my/directory/path/some_filename
kotlin.build.report.file.output_dir=kotlin-reports
kotlin.build.report.label=some_label
kotlin.build.report.http.url=http://127.0.0.1:8080
kotlin.build.report.http.user=someUser
kotlin.build.report.http.password=somePassword
```

公式ページ掲載の全オプション例（`single_file` 出力を使う場合は `kotlin.build.report.single_file` が必須）。

## 標準ライブラリ依存の制御（gradle.properties）

```properties
kotlin.stdlib.default.dependency=false
kotlin.stdlib.jdk.variants.version.alignment=false
kotlin.test.infer.jvm.variant=false
```

それぞれ標準ライブラリへの既定依存の追加、JDK バリアントのバージョン揃え、kotlin-test の JVM バリアント推論を無効化する値。出典: https://kotlinlang.org/docs/gradle-configure-project.html

## バイナリ互換性の検証

```sh
./gradlew checkKotlinAbi
```

ABI ダンプを比較して差分をエラーとして出力する。バイナリ互換性検証が有効なプロジェクトで `check` タスクを実行すると `checkKotlinAbi` も実行される。出典: https://kotlinlang.org/docs/gradle-binary-compatibility-validation.html

## 基準 ABI ダンプの更新

> **警告**: 基準となる ABI ダンプを上書きする。バイナリ互換性が保たれていると確認できてから実行する。試す場合は使い捨てのブランチ・クローンで行う。

```sh
./gradlew updateKotlinAbi
```
