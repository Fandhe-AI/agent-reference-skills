---
source: https://kotlinlang.org/docs/kapt.html
---

# Compiler Plugins

コマンドラインから kapt および各コンパイラプラグイン（all-open / no-arg / SAM with receiver / Lombok）を使うためのオプション（Kotlin 2.4.21）。

## kapt の CLI 実行

```sh
kapt <options> <source files>
```

kapt は Kotlin コンパイラのバイナリ配布物に含まれるスタンドアロン CLI。出典: https://kotlinlang.org/docs/kapt.html

## kapt の実行例

```sh
kapt -Kapt-mode=stubsAndApt \
  -Kapt-sources=build/kapt/sources \
  -Kapt-classes=build/kapt/classes \
  -Kapt-stubs=build/kapt/stubs \
  -Kapt-classpath=lib/ap.jar \
  -Kapt-classpath=lib/anotherAp.jar \
  src/main/kotlin
```

有効な Kotlin コンパイラオプションもすべて渡せる（`kotlinc -help` で確認）。

## all-open プラグインの指定

```sh
-Xplugin="${KOTLIN_HOME}/lib/allopen-compiler-plugin.jar"
```

```sh
# The plugin option format is: "-P plugin:<plugin id>:<key>=<value>". 
# Options can be repeated.

-P plugin:org.jetbrains.kotlin.allopen:annotation=com.my.Annotation
-P plugin:org.jetbrains.kotlin.allopen:preset=spring
```

`kotlinc` の引数として渡すオプション片。出典: https://kotlinlang.org/docs/all-open-plugin.html

## no-arg プラグインの指定

```sh
-Xplugin="${KOTLIN_HOME}/lib/noarg-compiler-plugin.jar"
-P plugin:org.jetbrains.kotlin.noarg:annotation=com.my.Annotation
-P plugin:org.jetbrains.kotlin.noarg:preset=jpa
```

`kotlinc` の引数として渡すオプション片。出典: https://kotlinlang.org/docs/no-arg-plugin.html

## SAM with receiver プラグインの指定

```sh
-Xplugin="${KOTLIN_HOME}/lib/sam-with-receiver-compiler-plugin.jar"
-P plugin:org.jetbrains.kotlin.samWithReceiver:annotation=com.my.SamWithReceiver
```

`kotlinc` の引数として渡すオプション片。出典: https://kotlinlang.org/docs/sam-with-receiver-plugin.html

## Lombok プラグインの指定

```sh
-Xplugin="${KOTLIN_HOME}/lib/lombok-compiler-plugin.jar"
```

`lombok.config` を使う場合:

```sh
# The plugin option format is: "-P plugin:<plugin id>:<key>=<value>". 
# Options can be repeated.

-P plugin:org.jetbrains.kotlin.lombok:config=<PATH_TO_CONFIG_FILE>
```

`<PATH_TO_CONFIG_FILE>` は `lombok.config` のパスに置換する。出典: https://kotlinlang.org/docs/lombok.html
