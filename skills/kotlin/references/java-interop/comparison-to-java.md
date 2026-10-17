---
source: https://kotlinlang.org/docs/comparison-to-java.html
---

# Comparison to Java

Lists the Java issues Kotlin addresses, what Java has that Kotlin does not, and what Kotlin has that Java does not.

## Signature / Usage

```kotlin
// Java's static members -> companion object / top-level function / @JvmStatic
class C {
    companion object {
        @JvmStatic fun callStatic() {}
    }
}
```

### Some Java issues addressed in Kotlin

- Null references are controlled by the type system ([null-safety](../basics/null-safety.md)).
- No raw types ([Java generics in Kotlin](./java-interop.md)).
- Arrays in Kotlin are invariant (arrays).
- Kotlin has proper function types ([lambdas](../functions/lambdas.md)), as opposed to Java's SAM-conversions.
- Use-site variance without wildcards (generics).
- Kotlin does not have checked exceptions ([exceptions](../basics/exceptions.md)).
- Separate interfaces for read-only and mutable collections ([collections overview](../collections/collections-overview.md)).
- A performant and ergonomic replacement for `Enum.values()` ([enum classes](../classes-objects/enum-classes.md)).

### What Java has that Kotlin does not

- Checked exceptions.
- Primitive types that are not classes. The byte-code uses primitives where possible, but they are not explicitly available.
- Static members, replaced with companion objects, top-level functions, extension functions, or `@JvmStatic` ([Calling Kotlin from Java](./java-to-kotlin-interop.md)).
- Wildcard-types, replaced with declaration-site variance and type projections.
- Ternary operator `a ? b : c`, replaced with the `if` expression ([control flow](../basics/control-flow.md)).
- Records (see [Using Java records in Kotlin](./jvm-records.md)).
- Package-private visibility modifier ([visibility modifiers](../basics/visibility-modifiers.md)).

Kotlin doesn't have pattern matching, but smart casts (typecasts) provide similar functionality to pattern matching in Java.

### What Kotlin has that Java does not

- Lambda expressions + inline functions = performant custom control structures ([inline functions](../functions/inline-functions.md))
- Extension functions ([extensions](../classes-objects/extensions.md))
- Null-safety
- String templates (strings)
- Properties ([properties](../classes-objects/properties.md))
- Primary constructors ([classes](../classes-objects/classes.md))
- First-class delegation ([delegation](../classes-objects/delegation.md))
- Type inference for variable and property types (Java 10: Local-Variable Type Inference)
- Singletons ([object declarations](../classes-objects/object-declarations.md))
- Declaration-site variance and type projections (generics)
- Range expressions ([ranges](../collections/ranges.md))
- Operator overloading ([operator overloading](../functions/operator-overloading.md))
- Companion objects
- Data classes ([data classes](../classes-objects/data-classes.md))
- Coroutines ([coroutines overview](../coroutines/coroutines-overview.md))
- Top-level functions
- Parameters with default values, named parameters, infix functions ([functions](../functions/functions.md))
- Expect and actual declarations
- Explicit API mode and better control of API surface (opt-in requirements)

Java doesn't have smart casts, but pattern matching provides similar functionality to smart casts in Kotlin.

## Related

- [Calling Java from Kotlin](./java-interop.md)
- [Calling Kotlin from Java](./java-to-kotlin-interop.md)
- [Strings in Java and Kotlin](./java-to-kotlin-idioms-strings.md)
- [Collections in Java and Kotlin](./java-to-kotlin-collections-guide.md)
- [Nullability in Java and Kotlin](./java-to-kotlin-nullability-guide.md)
