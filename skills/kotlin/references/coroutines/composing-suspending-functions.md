---
source: https://kotlinlang.org/docs/composing-suspending-functions.html
---

# Composing suspending functions

Approaches to composing suspending functions: sequential by default, concurrent with `async`, lazy `async`, async-style functions (discouraged), and structured concurrency with `async`.

## Signature / Usage

```kotlin
suspend fun doSomethingUsefulOne(): Int {
    delay(1000L) // pretend we are doing something useful here
    return 13
}

suspend fun doSomethingUsefulTwo(): Int {
    delay(1000L) // pretend we are doing something useful here, too
    return 29
}
```

### Sequential by default

Code in a coroutine is sequential by default. Invoking the two functions in order takes about 2 seconds in total.

```kotlin
val time = measureTimeMillis {
    val one = doSomethingUsefulOne()
    val two = doSomethingUsefulTwo()
    println("The answer is ${one + two}")
}
println("Completed in $time ms")
```

### Concurrent using async

`async` is like `launch`, but `launch` returns a `Job` with no result, while `async` returns a `Deferred` (a light-weight non-blocking future). Use `.await()` for the result; `Deferred` is also a `Job`, so it can be canceled. Concurrency with coroutines is always explicit.

```kotlin
val time = measureTimeMillis {
    val one = async { doSomethingUsefulOne() }
    val two = async { doSomethingUsefulTwo() }
    println("The answer is ${one.await() + two.await()}")
}
println("Completed in $time ms")
```

### Lazily started async

`async(start = CoroutineStart.LAZY)` starts only when `await` is called or `Job.start` is invoked.

```kotlin
val time = measureTimeMillis {
    val one = async(start = CoroutineStart.LAZY) { doSomethingUsefulOne() }
    val two = async(start = CoroutineStart.LAZY) { doSomethingUsefulTwo() }
    // some computation
    one.start() // start the first one
    two.start() // start the second one
    println("The answer is ${one.await() + two.await()}")
}
println("Completed in $time ms")
```

Calling `await` without first calling `start` leads to sequential behavior. The use case is a replacement for the standard `lazy` function when computing the value involves suspending functions.

### Async-style functions

Shown for illustration only; strongly discouraged with Kotlin coroutines. They use `GlobalScope` to opt out of structured concurrency and are not suspending functions, so a failure between starting and awaiting leaves the computation running in the background.

```kotlin
// The result type of somethingUsefulOneAsync is Deferred<Int>
@OptIn(DelicateCoroutinesApi::class)
fun somethingUsefulOneAsync() = GlobalScope.async {
    doSomethingUsefulOne()
}
```

### Structured concurrency with async

`async` is a `CoroutineScope` extension; use `coroutineScope` to provide the scope. If something inside throws, all coroutines launched in its scope are canceled.

```kotlin
suspend fun concurrentSum(): Int = coroutineScope {
    val one = async { doSomethingUsefulOne() }
    val two = async { doSomethingUsefulTwo() }
    one.await() + two.await()
}
```

Cancellation is always propagated through the coroutine hierarchy:

```kotlin
suspend fun failedConcurrentSum(): Int = coroutineScope {
    val one = async<Int> { 
        try {
            delay(Long.MAX_VALUE) // Emulates very long computation
            42
        } finally {
            println("First child was cancelled")
        }
    }
    val two = async<Int> { 
        println("Second child throws an exception")
        throw ArithmeticException()
    }
    one.await() + two.await()
}
```

Output: `Second child throws an exception`, `First child was cancelled`, `Computation failed with ArithmeticException`.

## Notes

- `GlobalScope` is a delicate API; using it requires an explicit `@OptIn(DelicateCoroutinesApi::class)`.
- Sample timings in the original page (2017 ms sequential, 1017 ms concurrent) are approximate outputs.

## Related

- [Coroutines basics](./coroutines-basics.md)
- [Coroutine exceptions handling](./exception-handling.md)
- [Cancellation and timeouts](./coroutines-cancellation.md)
