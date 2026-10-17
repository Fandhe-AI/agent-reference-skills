---
source: https://kotlinlang.org/docs/ksp-command-line.html
---

# Running KSP from the command line

KSP is a JVM application; run it with `java` when integrating with other build systems, developing processors, testing, or debugging. Most projects use the Gradle plugin instead.

## Signature / Usage

```bash
java -cp <classpath> <mainclass> <options> <processor>
```

```bash
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

## Options / Props

Entry points:

| Entry point | Platforms |
| --- | --- |
| `KSPJvmMain` | Kotlin/JVM and Android |
| `KSPJsMain` | Kotlin/JS |
| `KSPNativeMain` | Kotlin/Native targets, such as iOS, macOS, Linux, and Windows. |
| `KSPCommonMain` | Common compilations in Kotlin Multiplatform projects. |

Required options:

| Option | Description |
| --- | --- |
| `-language-version=<version>` | The Kotlin language version used in the project. |
| `-api-version=<version>` | The Kotlin API version. |
| `-jvm-target=<version>` | The target JVM version. |
| `-module-name=<name>` | The module name. |
| `-source-roots=<paths>` | The source root directories. Colon-separated list for multiple directories. |
| `-project-base-dir=<path>` | The project root directory. |
| `-output-base-dir=<path>` | The base directory for KSP output. |
| `-caches-dir=<path>` | The directory for KSP caches. |
| `-java-output-dir=<path>` | The directory for generated Java files. |
| `-class-output-dir=<path>` | The directory for generated class files. |
| `-kotlin-output-dir=<path>` | The directory for generated Kotlin files. |
| `-resource-output-dir=<path>` | The directory for generated resources. |
| `<processor>` | The processor classpath. |

Other useful options: `-libraries=<path>` (classpath for dependencies referenced by sources, typically the compile classpath), `-jdk-home=<path>` (JDK home when the processor resolves Java symbols), `-friends=<path>` (classpath of friend modules).

## Notes

- Unlike the Gradle plugin, `java` doesn't resolve dependencies: put the KSP runtime JARs and dependencies on the classpath. Download `artifacts.zip` from the KSP release page (tag 2.3.10); it contains `symbol-processing-aa-2.3.10.jar`, `symbol-processing-common-deps-2.3.10.jar`, `symbol-processing-api-2.3.10.jar`. Also required from Maven: `kotlin-stdlib-2.4.21.jar` and `kotlinx-coroutines-core-jvm-1.11.0.jar`.
- The source's example command line uses `kotlin-stdlib-2.3.20.jar` and `kotlinx-coroutines-core-jvm-1.10.2.jar` (not updated to the versions listed above); use the versions listed above.
- `-Dksp.logging` JVM system property sets the logging level: `error`, `warn` or `warning`, `info`, `debug` (default `warn`; unsupported values are treated as `warn`).
- Run `java -cp <classpath> <mainclass> -h` for the full option list.

## Related

- [ksp-overview](./ksp-overview.md)
- [compiler-reference](./compiler-reference.md)
