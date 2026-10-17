---
source: https://kotlinlang.org/docs/kapt.html
---

# Compiler Plugins

Command-line options for kapt and the compiler plugins (all-open, no-arg, SAM with receiver, Lombok) (Kotlin 2.4.21).

## Run kapt from the CLI

```sh
kapt <options> <source files>
```

kapt is a standalone CLI included in the Kotlin compiler binary distribution. Source: https://kotlinlang.org/docs/kapt.html

## kapt example

```sh
kapt -Kapt-mode=stubsAndApt \
  -Kapt-sources=build/kapt/sources \
  -Kapt-classes=build/kapt/classes \
  -Kapt-stubs=build/kapt/stubs \
  -Kapt-classpath=lib/ap.jar \
  -Kapt-classpath=lib/anotherAp.jar \
  src/main/kotlin
```

All valid Kotlin compiler options can also be passed (see `kotlinc -help`).

## Specify the all-open plugin

```sh
-Xplugin="${KOTLIN_HOME}/lib/allopen-compiler-plugin.jar"
```

```sh
# The plugin option format is: "-P plugin:<plugin id>:<key>=<value>". 
# Options can be repeated.

-P plugin:org.jetbrains.kotlin.allopen:annotation=com.my.Annotation
-P plugin:org.jetbrains.kotlin.allopen:preset=spring
```

Option fragments passed as `kotlinc` arguments. Source: https://kotlinlang.org/docs/all-open-plugin.html

## Specify the no-arg plugin

```sh
-Xplugin="${KOTLIN_HOME}/lib/noarg-compiler-plugin.jar"
-P plugin:org.jetbrains.kotlin.noarg:annotation=com.my.Annotation
-P plugin:org.jetbrains.kotlin.noarg:preset=jpa
```

Option fragments passed as `kotlinc` arguments. Source: https://kotlinlang.org/docs/no-arg-plugin.html

## Specify the SAM with receiver plugin

```sh
-Xplugin="${KOTLIN_HOME}/lib/sam-with-receiver-compiler-plugin.jar"
-P plugin:org.jetbrains.kotlin.samWithReceiver:annotation=com.my.SamWithReceiver
```

Option fragments passed as `kotlinc` arguments. Source: https://kotlinlang.org/docs/sam-with-receiver-plugin.html

## Specify the Lombok plugin

```sh
-Xplugin="${KOTLIN_HOME}/lib/lombok-compiler-plugin.jar"
```

To use `lombok.config`:

```sh
# The plugin option format is: "-P plugin:<plugin id>:<key>=<value>". 
# Options can be repeated.

-P plugin:org.jetbrains.kotlin.lombok:config=<PATH_TO_CONFIG_FILE>
```

Replace `<PATH_TO_CONFIG_FILE>` with the path to `lombok.config`. Source: https://kotlinlang.org/docs/lombok.html
