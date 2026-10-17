---
source: https://kotlinlang.org/docs/power-assert.html
---

# Power-assert compiler plugin

Improves debugging by generating detailed failure messages with intermediate values of assertion expressions. By default it transforms `assert()` calls; it can also transform `require()`, `check()`, `assertTrue()` and other functions.

## Signature / Usage

Adapted (not in the official docs): the `compilationFilter` lambda compares the compilation name (`main` / `test`) instead of source-set names.

```kotlin
// build.gradle.kts
plugins {
    kotlin("multiplatform") version "2.4.21"
    kotlin("plugin.power-assert") version "2.4.21"
}

powerAssert {
    functions = listOf("kotlin.assert", "kotlin.test.assertTrue", "kotlin.test.assertEquals", "kotlin.test.assertNull")
    compilationFilter = PowerAssertCompilationFilter {
        it.name == KotlinCompilation.MAIN_COMPILATION_NAME
    }
}
```

Example failure message:

```
Incorrect length
assert(hello.length == world.substring(1, 4).length) { "Incorrect length" }
       |     |      |  |     |               |
       |     5      |  |     "orl"           3
       "Hello"      |  "world!"
                    false
```

Maven:

```xml
<configuration>
    <compilerPlugins>
        <plugin>power-assert</plugin>
    </compilerPlugins>
    <pluginOptions>
        <option>power-assert:function=kotlin.assert</option>
        <option>power-assert:function=kotlin.test.assertTrue</option>
    </pluginOptions>
</configuration>
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-maven-power-assert</artifactId>
        <version>2.4.21</version>
    </dependency>
</dependencies>
```

Library support with `@PowerAssert`:

```kotlin
import kotlin.powerassert.PowerAssert
import kotlin.powerassert.toDefaultMessage
import kotlin.contracts.ExperimentalContracts
import kotlin.contracts.contract

@OptIn(ExperimentalContracts::class)
@PowerAssert
fun powerAssert(condition: Boolean, @PowerAssert.Ignore message: String? = null) {
    contract { returns() implies condition }
    if (!condition) {
        val explanation = PowerAssert.explanation
            ?: fail(message)

        val equalityErrors = buildList {
            for (expression in explanation.expressions) {
                if (expression is EqualityExpression && expression.value == false) {
                    add(expression)
                }
            }
        }

        val failureMessage = buildString {
            if (message?.isNotBlank() == true) appendLine(message)
            append(explanation.toDefaultMessage())
        }

        fail(failureMessage, equalityErrors)
    }
}
```

Soft assertions (collect failures, report at the end):

```kotlin
fun <R> assertSoftly(block: AssertScope.() -> R): R {
    val scope = AssertScopeImpl()
    val result = scope.block()
    if (scope.errors.isNotEmpty()) {
        throw AssertionError(scope.errors.joinToString("\n"))
    }
    return result
}

interface AssertScope {
    fun assert(assertion: Boolean, message: (() -> String)? = null)
}

class AssertScopeImpl : AssertScope {
    val errors = mutableListOf<String>()
    override fun assert(assertion: Boolean, message: (() -> String)?) {
        if (!assertion) {
            errors.add(message?.invoke() ?: "Assertion failed")
        }
    }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `functions` | list of fully qualified function paths | Functions transformed when called. If not specified, only `kotlin.assert()` calls are transformed |
| `compilationFilter` | `PowerAssertCompilationFilter` | Which Kotlin compilations the plugin applies to: `PowerAssertCompilationFilter.TESTS` (default, all test source sets), `PowerAssertCompilationFilter.ALL`, or a custom filter |
| `includedSourceSets` | list of Gradle source sets | Deprecated; replaced by `compilationFilter`. If specified, `compilationFilter` is ignored |
| `function` (Maven plugin option) | `power-assert:function=<fq name>` | Same as `functions`; repeat the option per function |

## Notes

- The plugin is Experimental: each build shows warnings; add `@OptIn(ExperimentalKotlinGradlePluginApi::class)` (import `org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi`) before the `powerAssert {}` block to exclude them.
- The official example (kotlin-web-site 0b10373) filters on source-set names (commonMain, jvmMain, ...); PowerAssertCompilationFilter.check receives a KotlinCompilation whose name is main/test (TESTS uses KotlinCompilation.TEST_COMPILATION_NAME in kotlin v2.4.21), so this page compares against the compilation name.
- Transformable functions must have a form that allows a `String` or `() -> String` value as the last parameter. Register them in the build file before use (functions annotated with `@PowerAssert` are transformed automatically).
- To get a more complete message, inline variables into the assertion call (e.g. inline `isValidName && isValidAge` into the `assert()` expression).
- Runtime library provides the `@PowerAssert` annotation and the `CallExplanation` class (`PowerAssert.explanation` provides the call-site info; `toDefaultMessage()` renders the standard message; `@PowerAssert.Ignore` excludes a parameter). Gradle adds the runtime dependency automatically; Maven needs `kotlin-power-assert-runtime`.
- `PowerAssert.explanation` can return `null` if the function is called from Java, from a project without the plugin, or via reflection.
- For soft assertions, specify the full package name of `AssertScope.assert`, e.g. `com.example.AssertScope.assert`.

## Related

- [compiler-plugins-overview](./compiler-plugins-overview.md)
