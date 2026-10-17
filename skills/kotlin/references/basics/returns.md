---
source: https://kotlinlang.org/docs/returns.html
---

# Returns and jumps

Kotlin has three structural jump expressions: `return` (from the nearest enclosing function or anonymous function), `break` (terminates the nearest enclosing loop), and `continue` (proceeds to the next step of the nearest enclosing loop).

## Signature / Usage

These can be part of larger expressions; their type is the `Nothing` type.

```kotlin
val s = person.name ?: return
```

### Break and continue labels

Labels have the form of an identifier followed by `@`, such as `abc@` or `fooBar@`.

```kotlin
loop@ for (i in 1..100) {
    for (j in 1..100) {
        if (...) break@loop
    }
}
```

A labeled `break` jumps to the point right after the labeled loop; a labeled `continue` proceeds to that loop's next iteration.

### Return to labels

```kotlin
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach lit@{
        if (it == 3) return@lit // local return to the caller of the lambda - the forEach loop
        print(it)
    }
    print(" done with explicit label")
}

// Implicit label: same name as the function the lambda is passed to
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach {
        if (it == 3) return@forEach
        print(it)
    }
    print(" done with implicit label")
}

// Anonymous function: return returns from the anonymous function itself
fun foo() {
    listOf(1, 2, 3, 4, 5).forEach(fun(value: Int) {
        if (value == 3) return
        print(value)
    })
    print(" done with anonymous function")
}
```

There is no direct equivalent for `break` in a lambda, but it can be simulated with an outer `run` lambda and a non-local return:

```kotlin
fun foo() {
    run loop@{
        listOf(1, 2, 3, 4, 5).forEach {
            if (it == 3) return@loop // non-local return from the lambda passed to run
            print(it)
        }
    }
    print(" done with nested loop")
}
```

When returning a value, the parser prefers the qualified return: `return@a 1` means "return `1` at label `@a`", not "return a labeled expression `(@a 1)`".

## Notes

- Local returns in lambdas are similar to `continue` in regular loops.
- The non-local return above is possible because the nested `forEach()` lambda acts as an inline function. Non-local `break` / `continue` / `return` without explicit labels are valid in lambdas of enclosing inline functions.

## Related

- [Conditions and loops](./control-flow.md)
- [Exception and error handling](./exceptions.md)
