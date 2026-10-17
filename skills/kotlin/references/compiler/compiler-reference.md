---
source: https://kotlinlang.org/docs/compiler-reference.html
---

# Kotlin compiler options

Option catalog for the Kotlin compilers (JVM, JS, Native). Used by the IDE, Gradle (`gradle build`), Maven (`mvn compile`) and the command line.

## Signature / Usage

Ways to set compiler arguments: IntelliJ IDEA (Settings | Build, Execution, Deployment | Compiler | Kotlin Compiler, Additional command line parameters); Gradle `compilerOptions` property of the compilation task; Maven `<configuration>` element; command line.

```bash
kotlinc hello.kt -include-runtime -d hello.jar
```

Argument file (`@argfile`): options and paths separated by whitespace; quote values containing whitespace.

```
-include-runtime -d hello.jar hello.kt
```

```bash
kotlinc @compiler.options @classes
kotlinc @options/compiler.options hello.kt
```

Warning severity (`-Xwarning-level`); the value is one of `error`, `warning`, `disabled`:

```bash
kotlinc -Xwarning-level=DIAGNOSTIC_NAME:error
```

Plugin ordering (`-Xcompiler-plugin-order`):

```bash
kotlinc '-Xcompiler-plugin-order=plugin.first>plugin.middle'
kotlinc '-Xcompiler-plugin-order=plugin.middle>plugin.last'
```

## Options / Props

### Common options

| Option | Description |
| --- | --- |
| `-api-version version` | Controls which Kotlin APIs your code can use at runtime. Can't be higher than `-language-version`. Use an older value when developing a library for consumers on an older stdlib. |
| `-help` (`-h`) | Display usage information and exit (standard options only). Use `-X` for advanced options. |
| `-kotlin-home path` | Custom path to the Kotlin compiler used for discovery of runtime libraries. |
| `-language-version version` | Controls which language features are available. One of the latest three stable versions can be configured. An older language version also requires an older API version. |
| `-opt-in annotation` | Enable usages of API that requires opt-in with the given fully qualified requirement annotation. |
| `-P plugin:pluginId:optionName=value` | Pass an option to a Kotlin compiler plugin. |
| `-progressive` | Progressive mode: deprecations and bug fixes for unstable code take effect immediately. |
| `-script` | Evaluate the first Kotlin script (`*.kts`) among the given arguments. |
| `-verbose` | Verbose logging output. |
| `-version` | Display the compiler version. |
| `-X` | Display advanced options and exit. They are unstable: names and behavior may change without notice. |
| `-Xallow-contracts-on-more-functions` | Enables contracts in additional declarations (property accessors, specific operator functions, type assertions on generic types). |
| `-Xallow-condition-implies-returns-contracts` | Allows `returnsNotNull()` in contracts to assume a non-null return value for specified conditions. |
| `-Xallow-holdsin-contract` | Allows the `holdsIn` keyword in contracts to assume a boolean condition is `true` inside a lambda. |
| `-Xallow-returns-result-of` | Allows the `returnsResultOf()` contract for the unused return value checker. |
| `-Xallow-reified-type-in-catch` | Support for reified `Throwable` type parameters in `catch` clauses of `inline` functions. |
| `-Xcollection-literals` | Support for collection literals with brackets syntax `[]`. |
| `-Xcompiler-plugin-order={plugin.before>plugin.after}` | Running order of compiler plugins (backend only, not the frontend). Missing plugins' rules are ignored. |
| `-Xdata-flow-based-exhaustiveness` | Data-flow-based exhaustiveness checks for `when` expressions. |
| `-Xexplicit-context-arguments` | Explicit context arguments for context parameters (resolves overload ambiguity at the call site). |
| `-Xklib-ir-inliner` | Intra-module inlining for Kotlin/Native, Kotlin/JS, Kotlin/Wasm (enabled by default). Modes: `disabled`, `full` (cross-module inlining). |
| `-Xintrinsic-const-evaluation` | Improved compile-time constants. |
| `-Xname-based-destructuring` | Name-based destructuring modes: `only-syntax`, `name-mismatch`, `complete`. |
| `-Xphases-to-dump-before` | Set to `ExternalPackageParentPatcherLowering` to dump after the IR lowering stage; output directory via `-Xdump-directory` (Kotlin/JVM). |
| `-Xrepl` | Activates the Kotlin REPL. |
| `-Xreturn-value-checker` | Reporting of ignored results: `disable` (default), `check`, `full`. |
| `-nowarn` | Suppress all warnings. |
| `-Werror` | Treat all warnings as errors. |
| `-Wextra` | Enable additional declaration, expression, and type checks that emit warnings. |
| `-Xrender-internal-diagnostic-names` | Print internal diagnostic names (the `DIAGNOSTIC_NAME` for `-Xwarning-level`). |
| `-Xwarning-level` | Severity of a specific warning: `error`, `warning` (default), `disabled`. |
| `@argfile` | Read compiler options from the given file(s). |

Combining warning rules:

| Command | Description |
| --- | --- |
| `-nowarn -Xwarning-level=DIAGNOSTIC_NAME:warning` | Suppress all warnings except for the specified ones. |
| `-Werror -Xwarning-level=DIAGNOSTIC_NAME:warning` | Raise all warnings to errors except for the specified ones. |
| `-Wextra -Xwarning-level=DIAGNOSTIC_NAME:disabled` | Enable all additional checks except for the specified ones. |

Plugin IDs for `-Xcompiler-plugin-order`:

| Compiler plugin | Plugin ID |
| --- | --- |
| `all-open`, `kotlin-spring` | `org.jetbrains.kotlin.allopen` |
| AtomicFU | `org.jetbrains.kotlinx.atomicfu` |
| Compose | `androidx.compose.compiler.plugins.kotlin` |
| `js-plain-objects` | `org.jetbrains.kotlinx.jspo` |
| `jvm-abi-gen` | `org.jetbrains.kotlin.jvm.abi` |
| kapt | `org.jetbrains.kotlin.kapt3` |
| Lombok | `org.jetbrains.kotlin.lombok` |
| `no-arg`, `kotlin-jpa` | `org.jetbrains.kotlin.noarg` |
| Parcelize | `org.jetbrains.kotlin.parcelize` |
| Power-assert | `org.jetbrains.kotlin.powerassert` |
| SAM with receiver | `org.jetbrains.kotlin.samWithReceiver` |
| Serialization | `org.jetbrains.kotlinx.serialization` |

### Kotlin/JVM compiler options (`kotlinc`, `kotlinc-jvm`)

| Option | Description |
| --- | --- |
| `-classpath path` (`-cp path`) | Search for class files in the paths (`;` on Windows, `:` on macOS/Linux; files, directories, ZIP, JAR). |
| `-d path` | Place generated class files in a directory, ZIP, or JAR. |
| `-include-runtime` | Include the Kotlin runtime into the resulting JAR. |
| `-jdk-home path` | Custom JDK home directory if it differs from `JAVA_HOME`. |
| `-Xjdk-release=version` | Target JVM bytecode version and limits the JDK API to it; also sets `-jvm-target`. Values `1.8`, `9`, `10`, ..., `26`. Not guaranteed to be effective for each JDK distribution. |
| `-jvm-default mode` | Interface default methods: `enable` (default), `no-compatibility`, `disable`. |
| `-jvm-target version` | Target JVM bytecode version: `1.8`, `9`, `10`, ..., `26`. Default `1.8`. |
| `-java-parameters` | Generate metadata for Java 1.8 reflection on method parameters. |
| `-module-name name` | Custom name for the generated `.kotlin_module` file. |
| `-no-jdk` | Don't include the Java runtime into the classpath. |
| `-no-reflect` | Don't include `kotlin-reflect.jar`. |
| `-no-stdlib` | Don't include `kotlin-stdlib.jar` and `kotlin-reflect.jar`. |
| `-script-templates classnames[,]` | Script definition template classes (fully qualified, comma-separated). |
| `-Xadd-modules=module[,]` | Additional root modules to resolve; `ALL-MODULE-PATH` resolves all. |
| `-Xdump-directory` | Dump directory for `-Xphases-to-dump-before`. |
| `-Xjvm-expose-boxed` | Generate boxed versions of all inline value classes and functions using them, accessible from Java. |
| `-Xnullability-annotations` | How nullability annotations from specific Java packages are interpreted. |

### Kotlin/JS compiler options (`kotlinc-js`)

| Option | Description |
| --- | --- |
| `-libraries path` | Paths to Kotlin libraries with `.meta.js` and `.kjsm` files. |
| `-main {call\|noCall}` | Whether `main` is called upon execution. |
| `-meta-info` | Generate `.meta.js` and `.kjsm` metadata (JS libraries). |
| `-module-kind {umd\|commonjs\|amd\|plain}` | Kind of generated JS module. |
| `-no-stdlib` | Don't include the default Kotlin/JS stdlib. |
| `-output filepath` | Destination `.js` file. |
| `-output-postfix filepath` / `-output-prefix filepath` | Append / prepend the content of the file to the output. |
| `-source-map` | Generate the source map. |
| `-source-map-base-dirs path` | Base directories for relative paths in the source map. |
| `-source-map-embed-sources {always\|never\|inlining}` | Embed source files into the source map. |
| `-source-map-names-policy {simple-names\|fully-qualified-names\|no}` | Names added to the source map (default `simple-names`). |
| `-source-map-prefix` | Prefix for paths in the source map. |
| `-target {es5\|es2015\|es2020}` | ECMA version of generated JS. |
| `-Xenable-implementing-interfaces-from-typescript` | Allow implementing `@JsExport` Kotlin interfaces from JS/TypeScript. |
| `-Xes-long-as-bigint` | `BigInt` for Kotlin `Long` (required for `es5` and `es2015`; default for `es2020`). |
| `-Xsuspend-lambda-exporting` | Export suspending lambdas in `@JsExport` declarations as JS `async` functions. |

### Kotlin/Native compiler options (`kotlinc-native`)

| Option | Description |
| --- | --- |
| `-enable-assertions` (`-ea`) | Runtime assertions in generated code. |
| `-entry name` (`-e name`) | Qualified entry point name. |
| `-g` | Emit debug information; lowers the optimization level, don't combine with `-opt`. |
| `-generate-test-runner` (`-tr`) / `-generate-no-exit-test-runner` (`-trn`) | Produce a unit test runner application (without explicit process exit for `-trn`). |
| `-include-binary path` (`-ib path`) | Pack an external binary within the klib. |
| `-library path` (`-l path`) | Link with the library. |
| `-library-version version` (`-lv version`) | Set the library version. |
| `-linker-option` / `-linker-options args` | Pass argument(s) to the linker. |
| `-list-targets` | List available hardware targets. |
| `-manifest path` | Manifest addend file. |
| `-module-name name` | Compilation module name (also Objective-C export prefix). |
| `-native-library path` (`-nl path`) | Include the native bitcode library. |
| `-no-default-libs` | Disable linking with prebuilt platform libraries. |
| `-nomain` | Assume `main` is provided by external libraries. |
| `-nopack` | Don't pack the library into a klib. |
| `-nostdlib` | Don't link with stdlib. |
| `-opt` | Enable compilation optimizations. |
| `-output name` (`-o name`) | Output file name. |
| `-produce output` (`-p output`) | Output kind: `program`, `static`, `dynamic`, `framework`, `library`, `bitcode`. |
| `-repo path` (`-r path`) | Library search path. |
| `-target target` | Hardware target. |
| `-Xccall-mode` | New interoperability mode for C / Objective-C libraries imported via cinterop. |
| `-Xoverride-konan-properties=min.version.*` | Lower supported versions of Apple targets, e.g. `kotlinc -Xoverride-konan-properties=minVersion.ios=14.0`. |

## Notes

- A common schema of all compiler options is published as the JAR `org.jetbrains.kotlin:kotlin-compiler-arguments-description` (code representation and JSON, with the version in which each option was introduced or stabilized).
- On Windows, surround arguments containing delimiters (whitespace, `=`, `;`, `,`) with double quotes.
- `-X` options are unstable and may change without notice.
- Arguments containing `>` or `|` are quoted here so the shell does not treat them as redirection/pipes (the official page shows them unquoted).
- Kotlin/JS and Kotlin/Native options are listed here only as an option catalog; those targets are outside the scope of this skill.
- The Gradle `compilerOptions` DSL and Maven configuration are covered under `build-tools`.

## Related

- [command-line](./command-line.md)
- [compiler-execution-strategy](./compiler-execution-strategy.md)
