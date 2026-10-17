---
source: https://kotlinlang.org/docs/coroutines-guide.html
---

# Coroutines guide

Entry page for the kotlinx.coroutines guide: Kotlin's standard library offers only minimal low-level coroutine APIs, and `kotlinx.coroutines` provides high-level primitives such as `launch` and `async`.

## Signature / Usage

```kotlin
// build.gradle.kts
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.11.0")
}
```

The guide requires a dependency on the `kotlinx-coroutines-core` module (see the project README of `Kotlin/kotlinx.coroutines`).

### Table of contents

| Topic | Page |
|-------|------|
| Coroutines basics | [coroutines-basics.md](./coroutines-basics.md) |
| Cancellation and timeouts | [coroutines-cancellation.md](./coroutines-cancellation.md) |
| Flows | [coroutines-flow.md](./coroutines-flow.md) |
| Tutorial: Intro to coroutines and channels | not included in this skill's references |
| Composing suspending functions | [composing-suspending-functions.md](./composing-suspending-functions.md) |
| Coroutine context and dispatchers | [coroutine-context-and-dispatchers.md](./coroutine-context-and-dispatchers.md) |
| Channels | [channels.md](./channels.md) |
| Coroutine exceptions handling | [exception-handling.md](./exception-handling.md) |
| Shared mutable state and concurrency | [shared-mutable-state-and-concurrency.md](./shared-mutable-state-and-concurrency.md) |
| Select expression (experimental) | [select-expression.md](./select-expression.md) |
| Tutorials: Debug coroutines / Debug Kotlin Flow using IntelliJ IDEA | not included in this skill's references |

## Notes

- `async` and `await` are not keywords in Kotlin and are not part of its standard library. Suspending functions are described as a safer, less error-prone abstraction for asynchronous operations than futures and promises.
- Additional references named on the page: Guide to UI programming with coroutines, the coroutines design document (KEEP), the full kotlinx.coroutines API reference, and Android best-practices / additional-resources pages.
- The page lists a "Tutorial: Debug coroutines" entry; the debugging reference page in this skill is [Debug coroutines](./coroutines-debugging.md).

## Related

- [Coroutines](./coroutines-overview.md)
- [Coroutines basics](./coroutines-basics.md)
