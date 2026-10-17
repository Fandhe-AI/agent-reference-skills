---
source: https://kotlinlang.org/docs/command-line.html
---

# Kotlin command-line compiler

Every Kotlin release ships with a standalone compiler (`kotlinc`). Installing it is not essential; IDEs such as IntelliJ IDEA or Android Studio provide full Kotlin support.

## Signature / Usage

```bash
kotlinc hello.kt -include-runtime -d hello.jar
java -jar hello.jar
```

```kotlin
fun main() {
    println("Hello, World!")
}
```

Install options:

```bash
sdk install kotlin                 # SDKMAN!
brew update && brew install kotlin # Homebrew (macOS)
sudo snap install --classic kotlin # Snap (Ubuntu 16.04+)
```

Manual install: download `kotlin-compiler-2.4.21.zip` from GitHub Releases, unzip, and optionally add `kotlinc/bin` to the system path.

## Options / Props

| Option | Description |
| --- | --- |
| `-d` | Output path for generated class files; a directory or a .jar file |
| `-include-runtime` | Makes the resulting .jar self-contained by including the Kotlin runtime library |
| `-help` | Shows all available options |
| `-Xrepl` | Interactive shell (REPL) |
| `-script` | Runs a Kotlin script (`.kts`) |
| `-script-templates` | Manually specifies script definitions |

## Notes

- Compile a library without the runtime: `kotlinc hello.kt -d hello.jar`. Binaries then depend on the Kotlin runtime being in the classpath. Run with `kotlinr -classpath hello.jar HelloKt` (`HelloKt` is the main class generated for `hello.kt`).
- Scripts: `kotlinc -script list_folders.kts -- -d <path_to_folder_to_inspect>`. Script customization (script definitions) is experimental; `kotlinc -script-templates org.example.CustomScriptDefinition -script custom.script1.kts`.
- On Windows, manual install is recommended.
- For Kotlin/Native applications and libraries use the Kotlin/Native compiler (not covered by this skill).

## Related

- [compiler-reference](./compiler-reference.md)
