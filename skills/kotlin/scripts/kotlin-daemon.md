---
source: https://kotlinlang.org/docs/kotlin-daemon.html
---

# Kotlin Daemon

Kotlin daemon のメモリとライフタイムの設定（Gradle / Maven、Kotlin 2.4.21）。daemon 自体に直接のユーザー向けインターフェースはなく、ビルドシステムまたは Build tools API 経由で使う。

## メモリ上限の設定（Gradle）

```properties
kotlin.daemon.jvmargs=-Xmx1500m
```

`gradle.properties` に書く。

## メモリ上限の設定（Maven）

```xml
<kotlin.compiler.daemon.jvmArgs>-Xmx1500m</kotlin.compiler.daemon.jvmArgs>
```

`pom.xml` のプロパティとして書く。

## Attached daemon（Gradle）

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=autoshutdownIdleSeconds=7200,shutdownDelayMilliseconds=1000
```

`gradle.properties` に追加する。クライアントが長時間動作する場合向け。`autoshutdownIdleSeconds` を大きく、`shutdownDelayMilliseconds` を小さくする。

## Attached daemon（Maven）

```sh
mvn package -Dkotlin.daemon.options=autoshutdownIdleSeconds=7200,shutdownDelayMilliseconds=1000
```

## Detached daemon（Gradle）

```properties
org.gradle.jvmargs=-Dkotlin.daemon.jvm.options=shutdownDelayMilliseconds=7200
```

`gradle.properties` に追加する。クライアントが短命な場合向け。`shutdownDelayMilliseconds` を大きくする。

## Detached daemon（Maven）

```xml
<kotlin.compiler.daemon.shutdownDelayMs>7200</kotlin.compiler.daemon.shutdownDelayMs>
```

`pom.xml` に追加する。

## Maven で Kotlin daemon を無効化

```xml
<properties>
    <kotlin.compiler.daemon>false</kotlin.compiler.daemon>
</properties>
```

実行戦略の詳細は https://kotlinlang.org/docs/compiler-execution-strategy.html を参照（出典: https://kotlinlang.org/docs/maven-kotlin-compiler.html）。
