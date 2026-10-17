---
source: https://kotlinlang.org/docs/maven-kotlin-compiler.html
---

# Maven

Commands for using kotlin-maven-plugin, and running the packaged output (Kotlin 2.4.21).

## Enable incremental compilation

```sh
mvn package -Dkotlin.compiler.incremental=true
```

You can instead write `<kotlin.compiler.incremental>true</kotlin.compiler.incremental>` in `<properties>` of `pom.xml`. The official page says to add `-Dkotlin.compiler.incremental=true` to the build; `mvn package` is only an example combination.

## List plugin goals and parameters

```sh
mvn help:describe \
  -Dplugin=org.jetbrains.kotlin:kotlin-maven-plugin \
  -Ddetail=true
```

Run it in the directory containing `pom.xml`. It prints details of all goals and parameters.

## Describe a specific goal

```sh
mvn help:describe \
  -Dplugin=org.jetbrains.kotlin:kotlin-maven-plugin \
  -Ddetail=true \
  -Dgoal=compile
```

Example for the `compile` goal.

## Run a self-contained JAR

```sh
java -jar target/mymodule-0.0.1-SNAPSHOT-jar-with-dependencies.jar
```

Pass a JAR built with `maven-assembly-plugin` (`jar-with-dependencies`) directly to the JRE. For the plugin configuration in `pom.xml`, see https://kotlinlang.org/docs/maven-compile-package.html.

## Compile with Maven (invoke the Kotlin compiler)

```sh
mvn compile
mvn test-compile
```

The Kotlin compiler is invoked from Maven's `mvn compile` / `mvn test-compile` (source: the beginning of https://kotlinlang.org/docs/gradle-compiler-options.html).
