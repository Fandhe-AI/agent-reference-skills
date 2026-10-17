---
source: https://kotlinlang.org/docs/command-line.html
---

# kotlinc

Compile, run, REPL, script execution, and compiler options with `kotlinc` / `kotlinr` (Kotlin 2.4.21).

## Compile and run an application

```sh
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

`-d` is the output destination (a directory or a .jar). `-include-runtime` bundles the Kotlin runtime to make a self-contained .jar. `hello.kt` is a file containing `fun main() { println("Hello, World!") }`.

## Compile a library

```sh
kotlinc hello.kt -d hello.jar
```

The runtime is not bundled, so the Kotlin runtime must be on the classpath when the library is used.

## Run with kotlinr

```sh
kotlinr -classpath hello.jar HelloKt
```

`HelloKt` is the main class name the compiler generates for `hello.kt`.

## Show the option list

```sh
kotlinc -help
```

## Start the REPL

```sh
kotlinc -Xrepl
```

Enter Kotlin code in the interactive shell and see the results.

## Run a script (.kts)

```sh
kotlinc -script list_folders.kts -- -d <path_to_folder_to_inspect>
```

`list_folders.kts` is the script example on the official page. Everything after `--` is passed to the script as arguments.

## Specify a script definition template

```sh
kotlinc -script-templates org.example.CustomScriptDefinition -script custom.script1.kts
```

A properly prepared script definition is discovered automatically when its jar is on the compilation classpath. Custom script support is documented as experimental.

## Use argument files (@argfile)

```sh
kotlinc @compiler.options @classes
kotlinc @options/compiler.options hello.kt
```

Pass a file containing options and source paths separated by whitespace. Wrap values that contain whitespace in single or double quotes.

## Set the level of an individual warning

```sh
kotlinc -Xwarning-level=DIAGNOSTIC_NAME:error
```

You can look up `DIAGNOSTIC_NAME` by also passing `-Xrender-internal-diagnostic-names`. The value is exactly one of `error`, `warning`, or `disabled`.

## Set the compiler plugin execution order

Adapted (not in the official docs): both ordering rules, the plugin jars, and a source file are passed to a single kotlinc invocation. The jar names are placeholders.

```sh
kotlinc -Xplugin=first.jar -Xplugin=middle.jar -Xplugin=last.jar '-Xcompiler-plugin-order=plugin.first>plugin.middle' '-Xcompiler-plugin-order=plugin.middle>plugin.last' hello.kt
```

The whole argument is wrapped in single quotes so that `>` is not treated as a shell redirect (the official page shows it without quotes). The official page shows the two rules as separate kotlinc lines; they only combine when passed to the same invocation, and the referenced plugins must be loaded (e.g. via -Xplugin) for a rule to apply — a rule for a missing plugin is ignored. Plugins run in the order `plugin.first`, `plugin.middle`, `plugin.last`. For plugin IDs, see the table at https://kotlinlang.org/docs/compiler-reference.html.

## Resolve additional JVM modules

```sh
kotlinc -Xadd-modules=jdk.incubator.vector
```

An example of resolving an additional root module.
