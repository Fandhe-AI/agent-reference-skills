---
source: https://kotlinlang.org/docs/inline-functions.html
---

# Inline functions

The `inline` modifier inlines a function and the lambdas passed to it at the call site, removing the closure and function-object overhead of higher-order functions.

## Signature / Usage

```kotlin
inline fun <T> lock(lock: Lock, body: () -> T): T { ... }

// lock(l) { foo() } is emitted as:
l.lock()
try {
    foo()
} finally {
    l.unlock()
}
```

### noinline

```kotlin
inline fun foo(inlined: () -> Unit, noinline notInlined: () -> Unit) { ... }
```

Inlinable lambdas can only be called inside inline functions or passed as inlinable arguments; `noinline` lambdas can be stored in fields or passed around.

### Non-local returns, crossinline, break and continue

A bare `return` in a lambda is forbidden unless the function is inlined:

```kotlin
inline fun inlined(block: () -> Unit) {
    println("hi!")
}

fun foo() {
    inlined {
        return // OK: the lambda is inlined
    }
}
```

If the lambda is called from another execution context (local object, nested function), mark it `crossinline` to forbid non-local control flow:

```kotlin
inline fun f(crossinline body: () -> Unit) {
    val f = object: Runnable {
        override fun run() = body()
    }
    // ...
}
```

`break` and `continue` can also be used in lambdas passed to an inline function that encloses a loop:

```kotlin
for (element in elements) {
    val variable = element.nullableMethod() ?: run {
        log.warning("Element is null or invalid, continuing...")
        continue
    }
    if (variable == 0) return true
}
```

### Reified type parameters

```kotlin
inline fun <reified T> TreeNode.findParentOfType(): T? {
    var p = parent
    while (p != null && p !is T) {
        p = p.parent
    }
    return p as T?
}

treeNode.findParentOfType<MyTreeNode>()
```

### Inline properties

```kotlin
val foo: Foo
    inline get() = Foo()

inline var bar: Bar
    get() = ...
    set(v) { ... }
```

Allowed on accessors of properties without backing fields; annotating the property marks both accessors.

## Notes

- Inlining large functions grows generated code; it pays off for small functions, especially at megamorphic call sites inside loops.
- An inline function with no inlinable function parameters and no reified type parameters triggers a warning; suppress with `@Suppress("NOTHING_TO_INLINE")`.
- Normal (non-inline) functions cannot have reified parameters. Types without a run-time representation (non-reified type parameters, `Nothing`) cannot be arguments for a reified parameter.
- `public` / `protected` inline functions outside `private` / `internal` declarations are public API and are inlined in other modules; they may not use non-public-API declarations. Annotate an `internal` declaration with `@PublishedApi` to allow use in public inline functions (its body is then checked as if public).

## Related

- [Higher-order functions and lambdas](./lambdas.md)
- [Functions](./functions.md)
