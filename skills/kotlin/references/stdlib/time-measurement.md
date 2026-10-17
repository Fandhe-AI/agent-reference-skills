---
source: https://kotlinlang.org/docs/time-measurement.html
---

# Time measurement

The `kotlin.time` package provides `Duration`, `TimeSource` / `TimeMark`, and `measureTime` / `measureTimedValue` for calculating and measuring time. By default a monotonic time source is used.

## Signature / Usage

```kotlin
import kotlin.time.*
import kotlin.time.Duration.Companion.nanoseconds
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.Duration.Companion.seconds
import kotlin.time.Duration.Companion.minutes
import kotlin.time.Duration.Companion.days

fun main() {
    val fiveHundredMilliseconds: Duration = 500.milliseconds
    val zeroSeconds: Duration = 0.seconds
    val tenMinutes: Duration = 10.minutes
    val negativeNanosecond: Duration = (-1).nanoseconds
    val infiniteDays: Duration = Double.POSITIVE_INFINITY.days
    val negativeInfiniteDays: Duration = Double.NEGATIVE_INFINITY.days

    println(fiveHundredMilliseconds) // 500ms
    println(zeroSeconds)             // 0s
    println(tenMinutes)              // 10m
    println(negativeNanosecond)      // -1ns
    println(infiniteDays)            // Infinity
    println(negativeInfiniteDays)    // -Infinity
}
```

### Duration

| Operation | API |
| --- | --- |
| Units (`DurationUnit`) | `NANOSECONDS`, `MICROSECONDS`, `MILLISECONDS`, `SECONDS`, `MINUTES`, `HOURS`, `DAYS` |
| Create | extension properties on `Int` / `Long` / `Double`: `nanoseconds`, `microseconds`, `milliseconds`, `seconds`, `minutes`, `hours`, `days` |
| Arithmetic | `+`, `-`, `* Int`, `/ Int`, `/ Duration` (returns `Double`), unary `-`, `absoluteValue` |
| String | `toString()`, `toString(DurationUnit, decimals)`, `toIsoString()` |
| Convert | `inWholeNanoseconds`, `inWholeMicroseconds`, `inWholeSeconds`, `inWholeMinutes`, `inWholeHours`, `inWholeDays`; `toInt(unit)`, `toDouble(unit)`, `toLong(unit)` |
| Compare | `==`, `<`, `>` |
| Components | `toComponents { hours, minutes, seconds, nanoseconds -> ... }` |

```kotlin
import kotlin.time.Duration.Companion.milliseconds
import kotlin.time.DurationUnit

fun main() {
    // Print in seconds with 2 decimal places
    println(5887.milliseconds.toString(DurationUnit.SECONDS, 2))
    // 5.89s
}
```

```kotlin
import kotlin.time.Duration
import kotlin.time.Duration.Companion.minutes

fun main() {
    val thirtyMinutes: Duration = 30.minutes
    println(thirtyMinutes.toComponents { hours, minutes, _, _ -> "${hours}h:${minutes}m" })
    // 0h:30m
}
```

### Measure time

```kotlin
import kotlin.time.measureTime
import kotlin.time.measureTimedValue

fun main() {
    val timeTaken = measureTime {
        Thread.sleep(100)
    }
    println(timeTaken) // e.g. 103 ms

    val (value, timeTaken2) = measureTimedValue {
        Thread.sleep(100)
        42
    }
    println(value)      // 42
    println(timeTaken2) // e.g. 103 ms
}
```

Mark moments with `TimeSource.Monotonic.markNow()` to get a `TimeMark`. Subtract (`-`) or compare (`<`, `>`) marks from the same time source; use `hasPassedNow()` / `hasNotPassedNow()` for deadlines.

```kotlin
import kotlin.time.*
import kotlin.time.Duration.Companion.seconds

fun main() {
   val timeSource = TimeSource.Monotonic
   val mark1 = timeSource.markNow()
   val fiveSeconds: Duration = 5.seconds
   val mark2 = mark1 + fiveSeconds

   // It hasn't been 5 seconds yet
   println(mark2.hasPassedNow())
   // false

   // Wait six seconds
   Thread.sleep(6000)
   println(mark2.hasPassedNow())
   // true
}
```

### Time sources

Default monotonic source per platform:

| Platform | Source |
| --- | --- |
| Kotlin/JVM | `System.nanoTime()` |
| Kotlin/JS (Node.js) | `process.hrtime()` |
| Kotlin/JS (browser) | `window.performance.now()` or `Date.now()` |
| Kotlin/Native | `std::chrono::high_resolution_clock` or `std::chrono::steady_clock` |

Custom time source (example from the docs for Android, where `System.nanoTime()` stops during deep sleep):

```kotlin
object RealtimeMonotonicTimeSource : AbstractLongTimeSource(DurationUnit.NANOSECONDS) {
    override fun read(): Long = SystemClock.elapsedRealtimeNanos()
}

fun main() {
    val elapsed: Duration = RealtimeMonotonicTimeSource.measureTime {
        Thread.sleep(100)
    }
    println(elapsed) // e.g. 103 ms
}
```

## Notes

- Days in `Duration` are periods of 24 hours, not calendar days.
- A `Duration` can be positive, negative, zero, or positive/negative infinity.
- `toString()` default prints each present unit, e.g. `1h 0m 45.677s`.

## Related

- [UUIDs](./uuids.md)
- [Scope functions](./scope-functions.md)
