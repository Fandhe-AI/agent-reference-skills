---
source: https://kotlinlang.org/docs/maven-configure-project.html
---

# Configure a Maven project

Add the Kotlin Maven plugin (`kotlin-maven-plugin`) to compile Kotlin sources and modules, either automatically through the `<extensions>` option or manually.

## Signature / Usage

Automatic configuration. Define versions in `<properties>`:

```xml
<properties>
    <maven.compiler.release>17</maven.compiler.release>
    <kotlin.version>2.4.21</kotlin.version>
</properties>
```

Then add the plugin with `<extensions>`:

```xml
<build>
    <plugins>
        <!-- Kotlin compiler plugin configuration -->
        <plugin>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-plugin</artifactId>
            <version>${kotlin.version}</version>
            <extensions>true</extensions> <!-- Enable the extension -->
        </plugin>
        <!-- No need to configure Maven compiler plugin with extensions -->
    </plugins>
</build>
```

The `<extensions>` option:

- Registers `src/main/kotlin` and `src/test/kotlin` as source roots if they exist and are not specified.
- Adds the `kotlin-stdlib` dependency if not already defined.
- Adds `compile`, `test-compile`, `kapt`, and `test-kapt` executions bound to the appropriate lifecycle phases (no manual `<executions>`).
- Aligns the JVM target with the Java compiler version configured in the project.
- In mixed projects: Kotlin is compiled first, Java after (can reference Kotlin classes), and default Maven behavior doesn't override the plugin order.

The extension configuration replaces the whole `<executions>` section. Default Maven compiler plugin version with `<extensions>` is 3.10.1; set a different one separately:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.15.0</version>
</plugin>
```

### JVM target version resolution

Priority order: 1. `kotlin.compiler.jdkRelease` or `kotlin.compiler.jvmTarget`; 2. `maven.compiler.release`; 3. `maven.compiler.target`.

| Kotlin compiler option | Controls bytecode version | Limits API to specified JDK |
| --- | --- | --- |
| `kotlin.compiler.jvmTarget` | Yes | No restrictions on JDK APIs |
| `kotlin.compiler.jdkRelease` | Yes | Yes (equivalent to Java's `--release`) |

| Maven compiler option | Sets Kotlin `jvmTarget` | Sets Kotlin `jdkRelease` | Limits API to specified JDK |
| --- | --- | --- | --- |
| `maven.compiler.target` | Yes | No | No (the build's JDK classpath stays visible) |
| `maven.compiler.release` | Yes | Yes | Yes |

Do not set different JDK options for `kotlin.compiler.jdkRelease` and `kotlin.compiler.jvmTarget` at the same time (error). `<extensions>` only checks project-level properties and the global `maven-compiler-plugin` configuration, not `<executions>`.

### Manual configuration

Kotlin and Java sources: the Java compiler can't see Kotlin declarations until compiled, so Kotlin must run first. Declare `kotlin-maven-plugin` before `maven-compiler-plugin`, disable the default executions (`default-compile`, `default-testCompile`, with phase `none`), and add custom executions.

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-plugin</artifactId>
            <version>${kotlin.version}</version>
            <executions>
                <execution>
                    <id>kotlin-compile</id>
                    <phase>compile</phase>
                    <goals>
                        <goal>compile</goal>
                    </goals>
                    <configuration>
                        <sourceDirs>
                            <sourceDir>${project.basedir}/src/main/kotlin</sourceDir>
                            <!-- Ensure Kotlin code can reference Java code -->
                            <sourceDir>${project.basedir}/src/main/java</sourceDir>
                        </sourceDirs>
                    </configuration>
                </execution>
                <execution>
                    <id>kotlin-test-compile</id>
                    <phase>test-compile</phase>
                    <goals>
                        <goal>test-compile</goal>
                    </goals>
                    <configuration>
                        <sourceDirs>
                            <sourceDir>${project.basedir}/src/test/kotlin</sourceDir>
                            <sourceDir>${project.basedir}/src/test/java</sourceDir>
                        </sourceDirs>
                    </configuration>
                </execution>
            </executions>
        </plugin>

        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.15.0</version>
            <executions>
                <!-- Disable default executions -->
                <execution>
                    <id>default-compile</id>
                    <phase>none</phase>
                </execution>
                <execution>
                    <id>default-testCompile</id>
                    <phase>none</phase>
                </execution>

                <!-- Define custom executions -->
                <execution>
                    <id>java-compile</id>
                    <phase>compile</phase>
                    <goals>
                        <goal>compile</goal>
                    </goals>
                </execution>
                <execution>
                    <id>java-test-compile</id>
                    <phase>test-compile</phase>
                    <goals>
                        <goal>testCompile</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

Kotlin-only sources:

```xml
<build>
    <sourceDirectory>src/main/kotlin</sourceDirectory>
    <testSourceDirectory>src/test/kotlin</testSourceDirectory>
</build>
```

and the plugin with `compile` and `test-compile` executions:

```xml
<plugin>
    <groupId>org.jetbrains.kotlin</groupId>
    <artifactId>kotlin-maven-plugin</artifactId>
    <version>${kotlin.version}</version>
    <executions>
        <execution>
            <id>compile</id>
            <goals>
                <goal>compile</goal>
            </goals>
        </execution>
        <execution>
            <id>test-compile</id>
            <goals>
                <goal>test-compile</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

### Set JDK version

Kotlin supports Maven Toolchains. With `maven-toolchains-plugin` configured, the Kotlin Maven plugin picks up the selected JDK:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-toolchains-plugin</artifactId>
    <version>3.2.0</version>
    <executions>
        <execution>
            <goals>
                <goal>toolchain</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <toolchains>
            <jdk>
                <version>21</version>
            </jdk>
        </toolchains>
    </configuration>
</plugin>
```

Priority: 1. `jdkHome` option of `kotlin-maven-plugin`; 2. JDK in `maven-toolchains-plugin`; 3. `JAVA_HOME`. The plugin-specific `<jdkToolchain>` option sets the JDK only for Kotlin compilation. Setting `maven-toolchains-plugin` does not affect the `kapt` and `test-kapt` goals (KT-79897); set the version in `JAVA_HOME` instead.

### Configure Java modules (JPMS)

No extra JPMS options are needed in the build file; Kotlin must be compiled before Maven's Java compiler. Create `${project.basedir}/src/main/java/module-info.java`:

```java
module org.example.myapp {
    requires transitive kotlin.stdlib;
    requires java.net.http;

    exports org.example.myapp;
}
```

- The descriptor must list all dependencies Kotlin code uses (stdlib, JDK modules except `java.base`, other libraries), otherwise `Unresolved reference` errors occur (compilation uses the module path, not the classpath).
- Package names in Kotlin files must match the ones in `module-info.java` to avoid `Package is empty or does not exist`.

## Notes

- Only Maven v3 is supported. For Maven 4 migration, use the `mvnup` upgrade tool.
- If several build plugins overwrite the default lifecycle and `<extensions>` is enabled, the last plugin in `<build>` has priority; earlier lifecycle changes are ignored.

## Related

- [Maven](./maven.md)
- [Set repositories and dependencies](./maven-set-dependencies.md)
- [Configure Kotlin compiler for Maven](./maven-kotlin-compiler.md)
