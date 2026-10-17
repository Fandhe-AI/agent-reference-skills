---
source: https://kotlinlang.org/docs/maven-kotlin-compiler.html
---

# Maven

kotlin-maven-plugin 利用時のコマンドと、パッケージング後の実行（Kotlin 2.4.21）。

## インクリメンタルコンパイルの有効化

```sh
mvn package -Dkotlin.compiler.incremental=true
```

`pom.xml` の `<properties>` に `<kotlin.compiler.incremental>true</kotlin.compiler.incremental>` を書く方法もある。公式ページはビルド時に `-Dkotlin.compiler.incremental=true` を付けると案内しており、`mvn package` は例としての組み合わせ。

## プラグインのゴールとパラメーターの一覧

```sh
mvn help:describe \
  -Dplugin=org.jetbrains.kotlin:kotlin-maven-plugin \
  -Ddetail=true
```

`pom.xml` のあるディレクトリで実行する。全ゴールとパラメーターの詳細が出力される。

## 特定ゴールの説明

```sh
mvn help:describe \
  -Dplugin=org.jetbrains.kotlin:kotlin-maven-plugin \
  -Ddetail=true \
  -Dgoal=compile
```

`compile` ゴールの例。

## 自己完結 JAR の実行

```sh
java -jar target/mymodule-0.0.1-SNAPSHOT-jar-with-dependencies.jar
```

`maven-assembly-plugin`（`jar-with-dependencies`）で作成した JAR を JRE へ直接渡す。`pom.xml` のプラグイン設定は https://kotlinlang.org/docs/maven-compile-package.html を参照。

## Maven でのコンパイル（Kotlin コンパイラ呼び出し）

```sh
mvn compile
mvn test-compile
```

Kotlin コンパイラは Maven の `mvn compile` / `mvn test-compile` から呼び出される（出典: https://kotlinlang.org/docs/gradle-compiler-options.html の冒頭）。
