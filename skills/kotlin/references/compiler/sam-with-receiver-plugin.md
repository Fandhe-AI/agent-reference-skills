---
source: https://kotlinlang.org/docs/sam-with-receiver-plugin.html
---

# SAM-with-receiver compiler plugin

Makes the first parameter of the annotated Java single abstract method (SAM) interface method a receiver in Kotlin. The conversion only works when the SAM interface is passed as a Kotlin lambda, for both SAM adapters and SAM constructors.

## Signature / Usage

```java
public @interface SamWithReceiver {}

@SamWithReceiver
public interface TaskRunner {
    void run(Task task);
}
```

```kotlin
fun test(context: TaskContext) {
    val runner = TaskRunner {
        // Here 'this' is an instance of 'Task'

        println("$name is started")
        context.executeTask(this)
        println("$name is finished")
    }
}
```

Gradle:

```kotlin
plugins {
    kotlin("plugin.sam.with.receiver") version "2.4.21"
}

samWithReceiver {
    annotation("com.my.SamWithReceiver")
}
```

Maven:

```xml
<plugin>
    <artifactId>kotlin-maven-plugin</artifactId>
    <groupId>org.jetbrains.kotlin</groupId>
    <version>${kotlin.version}</version>

    <configuration>
        <compilerPlugins>
            <plugin>sam-with-receiver</plugin>
        </compilerPlugins>

        <pluginOptions>
            <option>
                sam-with-receiver:annotation=com.my.SamWithReceiver
            </option>
        </pluginOptions>
    </configuration>

    <dependencies>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-maven-sam-with-receiver</artifactId>
            <version>${kotlin.version}</version>
        </dependency>
    </dependencies>
</plugin>
```

Command-line compiler:

```bash
-Xplugin=$KOTLIN_HOME/lib/sam-with-receiver-compiler-plugin.jar
-P plugin:org.jetbrains.kotlin.samWithReceiver:annotation=com.my.SamWithReceiver
```

## Notes

- Usage is the same as all-open and no-arg, except sam-with-receiver has no built-in presets: specify your own list of annotations.

## Related

- [all-open-plugin](./all-open-plugin.md)
- [no-arg-plugin](./no-arg-plugin.md)
