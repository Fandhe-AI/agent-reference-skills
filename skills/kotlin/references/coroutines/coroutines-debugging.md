---
source: https://kotlinlang.org/docs/coroutines-debugging.html
---

# Debug coroutines

JVM features that make debugging coroutines easier: debug mode, stack trace recovery, and the debug agent (`kotlinx-coroutines-debug`).

## Signature / Usage

```kotlin
// build.gradle.kts
dependencies {
    testImplementation("org.jetbrains.kotlinx:kotlinx-coroutines-debug:1.11.0")
}
```

Debug mode and stack trace recovery are in `kotlinx-coroutines-core`; the debug agent is in `kotlinx-coroutines-debug`.

### Enable debug mode

Debug mode assigns a unique name to every launched coroutine, visible in a Java debugger, in the coroutine's string representation, and in the thread name while it runs the coroutine. Overhead is negligible. It is enabled automatically when Java assertions are enabled (unit tests run with assertions enabled by default). To enable explicitly, pass `-Dkotlinx.coroutines.debug` to the JVM through Gradle / Maven or an IDE run configuration (in IntelliJ IDEA, add it to the VM options of the Run/Debug configuration).

### Stack trace recovery

When a coroutine receives an exception from another coroutine through a suspending function such as `Deferred.await()`, the stack trace lacks the receiving coroutine's frames. Stack trace recovery throws a copy of the exception with extra frames, and the original becomes its cause; suppressed exceptions stay attached to the original. Debug mode enables it by default; disable with `-Dkotlinx.coroutines.stacktrace.recovery=false`.

A custom exception is copied automatically when its class has a public constructor accepting a message, a cause, both, or no arguments. Otherwise implement `StackTraceRecoverable` (standard library) and override `copyForStackTraceRecovery()`; return `null` to opt out.

```kotlin
@OptIn(ExperimentalStdlibCoroutineSupportApi::class)
class FileEditException
// The implementation requires a private constructor
// to pass the cause to the IllegalStateException constructor
private constructor(
    val line: Int,
    private val detail: String,
    cause: Throwable?,
) : IllegalStateException("When editing line $line: $detail", cause),
    // Implements StackTraceRecoverable for stack trace recovery
    StackTraceRecoverable<FileEditException> {

    constructor(line: Int, detail: String) : this(line, detail, null)

    // Copies the line number and message details
    override fun copyForStackTraceRecovery(): FileEditException =
        FileEditException(line, detail, this)
}
```

### The debug agent

`DebugProbes` is the main entry point: it tracks coroutines as they are created, suspended and resumed. Start tracking by adding `-javaagent:/path/to/kotlinx-coroutines-debug-1.11.0.jar` to the VM options, or by calling `DebugProbes.install()` before starting the coroutines.

| API | Behavior |
|-----|----------|
| `DebugProbes.dumpCoroutines()` | Prints all active coroutines |
| `DebugProbes.dumpCoroutinesInfo()` | Returns information about active coroutines |
| `DebugProbes.printJob()` | Prints a coroutine dump for the hierarchy of a `Job` |
| `DebugProbes.printScope()` | Prints a coroutine dump for the hierarchy of a `CoroutineScope` |
| `DebugProbes.enableCreationStackTraces` | Set to `false` to avoid the per-coroutine stack trace overhead in production |

```kotlin
@OptIn(ExperimentalCoroutinesApi::class)
fun main() {
    // Installs the debug agent
    // This is only required if you don't use the -javaagent VM option
    DebugProbes.install()

    runBlocking {
        // Starts a coroutine with two child coroutines
        val loadingJob = launch {
            loadUserProfile()
        }

        // Gives the child coroutines time to suspend
        delay(1.seconds)

        // Prints all active coroutines
        DebugProbes.dumpCoroutines()

        println("============")

        // Prints the loading job and its child coroutines
        DebugProbes.printJob(loadingJob)
    }
}
```

### Print active coroutines when JUnit tests time out

`CoroutinesTimeout` installs debug probes automatically; on timeout it prints all active coroutines and their stack traces and fails the test.

```kotlin
// JUnit 4: fails with TestTimedOutException
@OptIn(ExperimentalCoroutinesApi::class)
class UserProfileTest {
    @get:Rule
    val timeout = CoroutinesTimeout.seconds(1)
    // ...
}
```

```kotlin
// JUnit 5: fails with CoroutinesTimeoutException
@OptIn(ExperimentalCoroutinesApi::class)
// Sets a one-second timeout for all test functions in the class
@CoroutinesTimeout(testTimeoutMs = 1_000)
class UserProfileTest {
    // ...
}
```

### Resolve resource conflicts on Android

`kotlinx-coroutines-debug` has transitive dependencies on JNA, JNA Platform, Byte Buddy and Byte Buddy Agent whose duplicate resource paths can cause `DuplicateRelativeFileException` when Android merges resources. Exclude them:

```kotlin
// build.gradle.kts
android {
    packaging {
        resources {
            // Excludes license files from JNA and JNA Platform
            excludes += setOf(
                "META-INF/AL2.0",
                "META-INF/LGPL2.1",
            )

            // Excludes the ASM license file from Byte Buddy
            excludes += "META-INF/licenses/ASM"

            // Retains one copy of each Byte Buddy Agent file
            pickFirsts += setOf(
                "win32-x86-64/attach_hotspot_windows.dll",
                "win32-x86/attach_hotspot_windows.dll",
            )
        }
    }
}
```

## Notes

- The debug agent is not supported on Android.
- Enabling `DebugProbes` in production can significantly reduce performance because it creates a stack trace for each new coroutine.
- Since JDK 21, loading the agent dynamically with `DebugProbes.install()` can produce a warning; use the `-javaagent` VM option to avoid it.
- `StackTraceRecoverable` and `ExperimentalStdlibCoroutineSupportApi` are Experimental and require `@OptIn(ExperimentalStdlibCoroutineSupportApi::class)`; the interface exists on all targets but `kotlinx.coroutines` uses it for recovery only on the JVM.
- `kotlinx-coroutines-debug` provides automatic BlockHound integration to detect blocking calls in disallowed coroutine contexts.
- The `android {}` packaging block above is an Android Gradle Plugin setting; AGP configuration is covered by android-build-gradle.

## Related

- [Coroutines basics](./coroutines-basics.md)
- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
- [Coroutine exceptions handling](./exception-handling.md)
