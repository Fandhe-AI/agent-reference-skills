---
source: https://kotlinlang.org/docs/scope-functions.html
---

# Scope functions

Standard library functions (`let`, `run`, `with`, `apply`, `also`) whose sole purpose is to execute a block of code within the context of an object. Called with a lambda, they form a temporary scope in which the object is accessible without its name.

## Signature / Usage

```kotlin
data class Person(var name: String, var age: Int, var city: String) {
    fun moveTo(newCity: String) { city = newCity }
    fun incrementAge() { age++ }
}

fun main() {
    Person("Alice", 20, "Amsterdam").let {
        println(it)
        it.moveTo("London")
        it.incrementAge()
        println(it)
    }
}
```

## Function selection

| Function | Object reference | Return value | Is extension function |
| --- | --- | --- | --- |
| `let` | `it` | Lambda result | Yes |
| `run` | `this` | Lambda result | Yes |
| `run` | - | Lambda result | No: called without the context object |
| `with` | `this` | Lambda result | No: takes the context object as an argument. |
| `apply` | `this` | Context object | Yes |
| `also` | `it` | Context object | Yes |

Short guide by purpose:

- Executing a lambda on non-nullable objects: `let`
- Introducing an expression as a variable in local scope: `let`
- Object configuration: `apply`
- Object configuration and computing the result: `run`
- Running statements where an expression is required: non-extension `run`
- Additional effects: `also`
- Grouping function calls on an object: `with`

## Distinctions

The two main differences are how the context object is referenced and the return value.

- `run`, `with`, `apply`: context object is the lambda receiver (`this`); `this` can usually be omitted. Recommended for lambdas that mainly operate on the object's members.
- `let`, `also`: context object is the lambda argument (`it`, or a name you give it). Better when the object is mostly used as an argument in function calls or when multiple variables are used in the block.
- `apply` and `also` return the context object, so they can be used as side steps in call chains.
- `let`, `run`, `with` return the lambda result.

```kotlin
data class Person(var name: String, var age: Int = 0, var city: String = "")

fun main() {
    val adam = Person("Adam").apply {
        age = 32
        city = "London"
    }
    println(adam)
}
```

```kotlin
fun main() {
    val str: String? = "Hello"
    val length = str?.let {
        println("let() called on $it")
        it.length
    }
}
```

## takeIf and takeUnless

`takeIf` returns the object if it satisfies the predicate, otherwise `null`. `takeUnless` has the opposite logic. The object is available as `it`. The return value is nullable, so chain with a safe call (`?.`).

```kotlin
import kotlin.random.*

fun main() {
    val number = Random.nextInt(100)

    val evenOrNull = number.takeIf { it % 2 == 0 }
    val oddOrNull = number.takeUnless { it % 2 == 0 }
    println("even: $evenOrNull, odd: $oddOrNull")
}
```

```kotlin
fun displaySubstringPosition(input: String, sub: String) {
    input.indexOf(sub).takeIf { it >= 0 }?.let {
        println("The substring $sub is found in $input.")
        println("Its start position is $it.")
    }
}
```

## Notes

- Scope functions don't introduce new technical capabilities; the choice depends on intent and project conventions, as their use cases overlap.
- Avoid overusing them and avoid nesting; be careful when chaining because the current `this` / `it` becomes easy to confuse.
- `with` is not an extension function: the object is passed as an argument. Non-extension `run` has no context object.

## Related

- [Opt-in requirements](./opt-in-requirements.md)
- [Kotlin Metadata JVM library](./metadata-jvm.md)
