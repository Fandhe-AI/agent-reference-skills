---
source: https://kotlinlang.org/docs/java-interop.html
---

# Calling Java from Kotlin

Existing Java code can be called from Kotlin in a natural way. Covers synthetic properties, platform types, nullability annotations, mapped types, generics, arrays, varargs, SAM conversions, and JNI.

## Signature / Usage

```kotlin
import java.util.*

fun demo(source: List<Int>) {
    val list = ArrayList<Int>()
    // 'for'-loops work for Java collections:
    for (item in source) {
        list.add(item)
    }
    // Operator conventions work as well:
    for (i in 0..<source.size) {
        list[i] = source[i] // get and set are called
    }
}
```

### Getters and setters

No-argument `get*` methods and single-argument `set*` methods are represented as (synthetic) properties. `Boolean` accessors (getter starts with `is`, setter with `set`) become properties named like the getter. A Java class with only a setter is not visible as a property (Kotlin has no set-only properties).

```kotlin
import java.util.Calendar

fun calendarDemo() {
    val calendar = Calendar.getInstance()
    if (calendar.firstDayOfWeek == Calendar.SUNDAY) { // Calls getFirstDayOfWeek()
        calendar.firstDayOfWeek = Calendar.MONDAY     // Calls setFirstDayOfWeek()
    }
    if (!calendar.isLenient) {    // Calls isLenient()
        calendar.isLenient = true // Calls setLenient()
    }
}
```

Only no-argument getters are represented as synthetic properties. If the getter has an overload that takes arguments, that overload isn't exposed as a property and in most cases you call it using its full method name:

```java
// Java
public class Greeting {
    public String getMessage() {
        return "Hello!";
    }

    public String getMessage(String name) {
        return "Hello, " + name + "!";
    }
}
```

The no-argument `getMessage()` is available through the synthetic `message` property. To use the overloaded `getMessage(String)`, call it as a function:

```kotlin
// Kotlin
fun main() {
    val greeting = Greeting()
    println(greeting.message)              // Accesses getMessage() through the synthetic property
    println(greeting.getMessage("Kotlin")) // Calls the overloaded getMessage(String) method
}
```

Calling `greeting.message("Kotlin")` doesn't compile (unresolved reference, receiver type mismatch) because the `message` property doesn't accept arguments.

In some cases, when a Java method with parameters overrides the getter of a Kotlin member extension property, Kotlin treats the method as a property. You can then only call it as a property within the receiver's scope, not by its method name:

```java
// Java
public class Greeter implements Message {
    public String getText(String name) {
        return "Hello, " + name + "!";
    }
}
```

```kotlin
// Kotlin
interface Message {
    val String.text: String
}

fun demo(greeter: Greeter) {
    greeter.getText("Kotlin")       // Error: unresolved reference
    with(greeter) { "Kotlin".text } // Accesses getText(String) through the member extension property
}
```

### Methods returning void and keyword identifiers

A Java `void` method returns `Unit` in Kotlin; if the return value is used, the compiler assigns `Unit` at the call site. Java identifiers that are Kotlin keywords (`in`, `object`, `is`, ...) are escaped with backticks:

```kotlin
matcher.`is`(expected)
```

### Null-safety and platform types

Java declaration types are treated as non-denotable platform types. A platform value can be assigned to a nullable or non-nullable Kotlin type; null-checks are relaxed, so safety is the same as in Java.

```kotlin
val list = ArrayList<String>() // non-null (constructor result)
list.add("Item")
val size = list.size // non-null (primitive int)
val item = list[0] // platform type inferred (ordinary Java object)

item.substring(1) // allowed, throws an exception if item == null

val nullable: String? = item // allowed, always works
val notNull: String = item // allowed, may fail at runtime
```

If you choose a non-nullable type, the compiler emits an assertion upon assignment (also when platform values are passed to Kotlin functions expecting non-null values).

#### Notation for platform types

| Notation | Meaning |
| --- | --- |
| `T!` | `T` or `T?` |
| `(Mutable)Collection<T>!` | Java collection of `T` may be mutable or not, may be nullable or not |
| `Array<(out) T>!` | Java array of `T` (or a subtype of `T`), nullable or not |

#### Nullability annotations

Java types with nullability annotations are represented as actual nullable / non-nullable Kotlin types, not platform types. Supported flavors include: JetBrains (`org.jetbrains.annotations`), JSpecify (`org.jspecify.annotations`), Android (`com.android.annotations`, `android.support.annotation`, `androidx.annotation`, `android.annotation`), JSR-305 (`javax.annotation`), FindBugs (`edu.umd.cs.findbugs.annotations`), Eclipse (`org.eclipse.jdt.annotation`), Lombok (`lombok.NonNull`), RxJava 3 (`io.reactivex.rxjava3.annotations`), Vert.x (`io.vertx.codegen.annotations`).

Report level per annotation package:

```bash
-Xnullability-annotations=@<package-name>:<report-level>
```

`<report-level>` is `ignore`, `warn`, or `strict`. Most supported flavors (e.g. JetBrains, Android) report mismatches as errors by default; JSR-305 is controlled separately by `-Xjsr305` and defaults to `warn`; JSpecify defaults to `strict` since Kotlin 2.1.

#### Mutability annotations

Annotate a Java declaration to say whether a returned collection is read-only or mutable in Kotlin; a mismatching assignment is reported as a type mismatch. Supported include `kotlin.annotations.jvm.ReadOnly`, `kotlin.annotations.jvm.Mutable`, `org.jetbrains.annotations.Unmodifiable`, `org.jetbrains.annotations.UnmodifiableView`.

#### Annotating type arguments and type parameters

```java
@NotNull
Set<@NotNull String> toSet(@NotNull Collection<@NotNull String> elements) { ... }
```

becomes

```kotlin
fun toSet(elements: (Mutable)Collection<String>) : (Mutable)Set<String> { ... }
```

Without `@NotNull` on the type argument: `fun toSet(elements: (Mutable)Collection<String!>) : (Mutable)Set<String!> { ... }`.

Type-parameter bounds are honored too:

```java
public class BaseWithBound<T extends @NotNull Number> {}
```

is seen as `class BaseWithBound<T : Number> {}`. Annotating type arguments and type parameters works with the Java 8 target or higher and requires annotations that support `TYPE_USE` (`org.jetbrains.annotations` version 15 and above). If an annotation supports other targets in addition to `TYPE_USE`, `TYPE_USE` takes priority: `@Nullable String[] f()` becomes `fun f(): Array<String?>!`.

#### JSpecify support

Supported in `org.jspecify.annotations`: `@Nullable`, `@NonNull`, `@NullMarked` (scope default non-null; does not apply to local variables and type variables), `@NullUnmarked` (reverts to platform types).

```java
// Java
import org.jspecify.annotations.*;

@NullMarked
public class InventoryService {
    public String notNull() { return ""; }
    public @Nullable String nullable() { return null; }
}
```

```kotlin
// Kotlin
fun test(inventory: InventoryService) {
   inventory.notNull().length // OK
   inventory.nullable().length // Error: only safe (?.) or non-null asserted (!!) calls are allowed
}
```

```bash
-Xjspecify-annotations=<report-level>
```

| Level | Description |
| --- | --- |
| `strict` | Reports errors for nullability mismatches (default). |
| `warn` | Reports warnings. |
| `ignore` | Ignores nullability mismatches. |

#### JSR-305 support

`@Nonnull(when = ...)`: `When.ALWAYS` = non-nullable; `When.MAYBE` / `When.NEVER` = nullable; `When.UNKNOWN` = platform type. The annotations artifact (e.g. `jsr305.jar`) need not be a compile dependency of library consumers. Custom nullability qualifiers (KEEP-79) are supported:

- Type qualifier nicknames: an annotation annotated with `@TypeQualifierNickname` and `@Nonnull` (or another nickname such as `@CheckForNull`) carries that nullability.
- Type qualifier defaults: `@TypeQualifierDefault({ElementType.METHOD, ElementType.PARAMETER, ...})` with `ElementType.METHOD` (return types), `PARAMETER`, `FIELD`, `TYPE_USE` (any type incl. type arguments, bounds, wildcards). Package-level defaults via `package-info.java` are supported.

```java
@Nonnull
@TypeQualifierDefault({ElementType.METHOD, ElementType.PARAMETER})
public @interface NonNullApi {
}

@Nonnull(when = When.MAYBE)
@TypeQualifierDefault({ElementType.METHOD, ElementType.PARAMETER, ElementType.TYPE_USE})
public @interface NullableApi {
}

@NullableApi
interface A {
    String foo(String x); // fun foo(x: String?): String?

    @NotNullApi // overriding default from the interface
    String bar(String x, @Nullable String y); // fun bar(x: String, y: String?): String

    // The List<String> type argument is seen as nullable because of `@NullableApi`
    // having the `TYPE_USE` element type:
    String baz(List<String> x); // fun baz(List<String?>?): String?

    // The type of `x` parameter remains platform because there's an explicit
    // UNKNOWN-marked nullability annotation:
    String qux(@Nonnull(when = When.UNKNOWN) String x); // fun baz(x: String!): String?
}
```

The types in this example only take effect with strict mode enabled; otherwise platform types remain.

`@UnderMigration` (artifact `kotlin-annotations-jvm`) lets library maintainers define migration status: `MigrationStatus.STRICT` (errors, types affected), `WARN` (warnings, types remain platform), `IGNORE` (annotation ignored). The status of a nullability annotation is not inherited by its type qualifier nicknames but is applied to its usages in default type qualifiers; if a default qualifier uses a nickname and both are `@UnderMigration`, the default qualifier's status is used.

JSR-305 compiler flags (`-Xjsr305`):

| Flag | Effect |
| --- | --- |
| `-Xjsr305={strict\|warn\|ignore}` | Behavior for non-`@UnderMigration` annotations (since Kotlin 1.1.60 only affects those). |
| `-Xjsr305=under-migration:{strict\|warn\|ignore}` | Overrides behavior for `@UnderMigration` annotations. |
| `-Xjsr305=@<fq.name>:{strict\|warn\|ignore}` | Overrides behavior for a single annotation; may appear several times. |

Example: `-Xjsr305=ignore -Xjsr305=under-migration:ignore -Xjsr305=@org.library.MyNullable:warn`. The default is the same as `-Xjsr305=warn`; the `strict` value should be considered experimental. Built-in JSR-305 `@Nonnull`, `@Nullable` and `@CheckForNull` are always enabled regardless of `-Xjsr305`.

### Mapped types

The mapping only matters at compile time; the runtime representation remains unchanged.

| Java type | Kotlin type |
| --- | --- |
| `byte` / `short` / `int` / `long` / `char` / `float` / `double` / `boolean` | `kotlin.Byte` / `Short` / `Int` / `Long` / `Char` / `Float` / `Double` / `Boolean` |
| `java.lang.Object` | `kotlin.Any!` |
| `java.lang.Cloneable` | `kotlin.Cloneable!` |
| `java.lang.Comparable` | `kotlin.Comparable!` |
| `java.lang.Enum` | `kotlin.Enum!` |
| `java.lang.annotation.Annotation` | `kotlin.Annotation!` |
| `java.lang.CharSequence` | `kotlin.CharSequence!` |
| `java.lang.String` | `kotlin.String!` |
| `java.lang.Number` | `kotlin.Number!` |
| `java.lang.Throwable` | `kotlin.Throwable!` |
| `java.lang.Byte` / `Short` / `Integer` / `Long` / `Character` / `Float` / `Double` / `Boolean` | `kotlin.Byte?` / `Short?` / `Int?` / `Long?` / `Char?` / `Float?` / `Double?` / `Boolean?` |
| `int[]` | `kotlin.IntArray!` |
| `String[]` | `kotlin.Array<(out) String!>!` |

A boxed primitive used as a type parameter is a platform type: `List<java.lang.Integer>` becomes `List<Int!>`.

Collections (Kotlin types in package `kotlin.collections`):

| Java type | Kotlin read-only type | Kotlin mutable type | Loaded platform type |
| --- | --- | --- | --- |
| `Iterator<T>` | `Iterator<T>` | `MutableIterator<T>` | `(Mutable)Iterator<T>!` |
| `Iterable<T>` | `Iterable<T>` | `MutableIterable<T>` | `(Mutable)Iterable<T>!` |
| `Collection<T>` | `Collection<T>` | `MutableCollection<T>` | `(Mutable)Collection<T>!` |
| `Set<T>` | `Set<T>` | `MutableSet<T>` | `(Mutable)Set<T>!` |
| `List<T>` | `List<T>` | `MutableList<T>` | `(Mutable)List<T>!` |
| `ListIterator<T>` | `ListIterator<T>` | `MutableListIterator<T>` | `(Mutable)ListIterator<T>!` |
| `Map<K, V>` | `Map<K, V>` | `MutableMap<K, V>` | `(Mutable)Map<K, V>!` |
| `Map.Entry<K, V>` | `Map.Entry<K, V>` | `MutableMap.MutableEntry<K,V>` | `(Mutable)Map.(Mutable)Entry<K, V>!` |

Static members of mapped Java types are not on the Kotlin types' companion objects; use the Java type's fully qualified name, e.g. `java.lang.Integer.toHexString(foo)`.

### Java generics in Kotlin

- Wildcards become type projections: `Foo<? extends Bar>` -> `Foo<out Bar!>!`, `Foo<? super Bar>` -> `Foo<in Bar!>!`.
- Raw types become star projections: `List` -> `List<*>!` (that is `List<out Any?>!`).

Generics are not retained at runtime, so Kotlin only allows `is`-checks for star-projected types:

```kotlin
if (a is List<Int>) // Error: cannot check if it is really a List of Ints
// but
if (a is List<*>) // OK: no guarantees about the contents of the list
```

### Java arrays

Kotlin arrays are invariant; Java methods may accept `Array<(out) String>!`. Use specialized classes (`IntArray`, `DoubleArray`, `CharArray`, ...) for Java primitive arrays; they are not related to `Array` and compile to Java primitive arrays.

```kotlin
val javaObj = JavaArrayExample()
val array = intArrayOf(0, 1, 2, 3)
javaObj.removeIndices(array)  // passes int[] to method
```

Array access, `for (x in array)`, `array.indices` iteration and `i in array.indices` checks compile without overhead (no `get()` / `set()` calls, no iterator).

### Java varargs

Use the spread operator `*` to pass an array to a Java varargs parameter:

```kotlin
val javaObj = JavaArrayExample()
val array = intArrayOf(0, 1, 2, 3)
javaObj.removeIndicesVarArg(*array)
```

### Operators

Any Java method with the right name and signature can be used as an operator overload and other conventions (`invoke()` etc.). Calling Java methods using infix call syntax is not allowed. For example, a Java class that declares `get(int)` and `set(int, T)` methods works with the indexed access operator:

```java
public class IntContainer {
    private final int[] values = new int[10];

    public int get(int index) {
        return values[index];
    }

    public void set(int index, int value) {
        values[index] = value;
    }
}
```

```kotlin
fun main() {
    val container = IntContainer()
    container[0] = 42     // Calls set(0, 42)
    println(container[0]) // Calls get(0)
}
```

### Checked exceptions

All exceptions are unchecked in Kotlin; calling a Java method that declares a checked exception requires nothing.

```kotlin
fun render(list: List<*>, to: Appendable) {
    for (item in list) {
        to.append(item.toString()) // Java would require us to catch IOException here
    }
}
```

### Object methods

References of type `java.lang.Object` become `Any`, which declares only `toString()`, `hashCode()` and `equals()`; other members are available via extension functions.

- `wait()` / `notify()`: not available on `Any`; use `java.util.concurrent` where possible. If needed, access them through a `java.lang.Object` and suppress the `PLATFORM_CLASS_MAPPED_TO_KOTLIN` warning:

```kotlin
@Suppress("PLATFORM_CLASS_MAPPED_TO_KOTLIN")
(instance as java.lang.Object).wait()
```

- `getClass()`: `foo::class.java` (bound class reference) or `foo.javaClass`.
- `clone()`: the class must extend `kotlin.Cloneable`.
- `finalize()`: declare it without `override`; it must not be `private`. `finalize()` is deprecated in modern Java versions; consider `java.lang.ref.Cleaner` or try-with-resources instead.

```kotlin
class C {
    protected fun finalize() {
        // Finalization logic
    }
}
```

### Inheritance from Java classes and static members

At most one Java class (and any number of Java interfaces) can be a supertype of a Kotlin class. Static members of Java classes form "companion objects" for these classes; they can't be passed as a value but members are accessible explicitly:

```kotlin
if (Character.isLetter(a)) { ... }
```

To call a static method of an imported Java class, use the class name directly, just like in Java:

```java
package org.example;

public class MathUtils {
    public static int triple(int value) {
        return value * 3;
    }
}
```

```kotlin
import org.example.MathUtils

fun main() {
    println(MathUtils.triple(5)) // Calls the static triple() method
}
```

For Java types mapped to Kotlin types use the fully qualified name: `java.lang.Integer.bitCount(5)`.

### Java reflection

Use `instance::class.java`, `ClassName::class.java` or `instance.javaClass` to enter Java reflection. Do not use `ClassName.javaClass` (it refers to the companion object class, same as `ClassName.Companion::class.java`). `Int::class.java` is the primitive class (`Integer.TYPE`); `Int::class.javaObjectType` is the wrapper type (`Integer.class`).

### SAM conversions

Kotlin function literals convert automatically to implementations of Java interfaces with a single non-default method, and also work for Kotlin fun interfaces.

```kotlin
import java.util.concurrent.Executors

val runnable = Runnable { println("This runs in a runnable") }

val executor = Executors.newSingleThreadExecutor()
// Java signature: void execute(Runnable command)
executor.execute { println("This runs in a thread pool") }

// Adapter function to pick a specific SAM type:
executor.execute(Runnable { println("This runs in a thread pool") })
executor.shutdown()
```

### Using JNI with Kotlin

Mark natively implemented functions `external`; property accessors can be `external` too (creating `getMyProperty` / `setMyProperty`).

```kotlin
external fun calculateSum(x: Int): Double

var myProperty: String
    external get
    external set
```

## Notes

- The official docs claim JSpecify is the only flavor that is `strict` by default; most other supported flavors (e.g. JetBrains, Android) also report mismatches as errors by default, while JSR-305 defaults to warn.
- The official page no longer has the "Java synthetic property references" section (`Person::age` / `person::age`, Experimental since Kotlin 1.8.20, enabled with `-language-version 2.1`) that earlier versions of this page carried. kotlin-language-features-and-proposals lists the feature as Revoked, and in the Kotlin 2.4.21 compiler the ReferencesToSyntheticJavaProperties feature has no since-version, so no -language-version value enables it. Don't rely on such references.
- SAM conversions work only for interfaces, not abstract classes.
- The official SAM conversion example now uses Executors.newSingleThreadExecutor(); the import and the final `executor.shutdown()` call in the snippet above were added here and are not in the official docs.
- Source: https://kotlinlang.org/docs/java-interop.html (kotlin-web-site 2f28ab9, fetched 2026-11-14)
- Lombok-generated declarations: usable in Kotlin code; to generate and use them in the same mixed Java/Kotlin module see the Lombok compiler plugin page (`../compiler/lombok.md`). Calling them from another module needs no plugin.
- Full lists of supported nullability / mutability annotations are in the Kotlin compiler source (`JvmAnnotationNames.kt`).

## Related

- [Calling Kotlin from Java](./java-to-kotlin-interop.md)
- [Nullability in Java and Kotlin](./java-to-kotlin-nullability-guide.md)
- [Lombok compiler plugin](../compiler/lombok.md)
- [Null safety](../basics/null-safety.md)
- [Generics](../types/generics.md)
