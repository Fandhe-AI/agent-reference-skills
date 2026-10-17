---
source: https://kotlinlang.org/docs/java-to-kotlin-interop.html
---

# Calling Kotlin from Java

How Kotlin declarations are compiled to Java elements and how to tailor that with JVM annotations (`@JvmName`, `@JvmField`, `@JvmStatic`, `@JvmOverloads`, `@Throws`, ...).

## Signature / Usage

```kotlin
// app.kt
package org.example

class Util

fun getTime() { /*...*/ }
```

```java
// Java
new org.example.Util();
org.example.AppKt.getTime();
```

### Properties

A Kotlin property compiles to a getter (`get` prefix), a setter (`set` prefix, `var` only), and a private field of the same name (only if it has a backing field). `var firstName: String` becomes:

```java
private String firstName;

public String getFirstName() {
    return firstName;
}

public void setFirstName(String firstName) {
    this.firstName = firstName;
}
```

If the property name starts with `is`, the getter has the same name and the setter replaces `is` with `set` (`isOpen` -> `isOpen()` / `setOpen()`), for properties of any type.

### Package-level functions

Functions and properties in `app.kt` in package `org.example` (including extension functions) compile to static methods of class `org.example.AppKt`. Rename with `@file:JvmName`:

```kotlin
@file:JvmName("DemoUtils")

package org.example

class Util

fun getTime() { /*...*/ }
```

Multiple files with the same generated class name are normally an error; annotate all of them with `@JvmMultifileClass` to generate one facade class:

```kotlin
// oldutils.kt
@file:JvmName("Utils")
@file:JvmMultifileClass

package org.example

fun getTime() { /*...*/ }
```

### Instance fields

`@JvmField` exposes a property as a field with the same visibility. Applicable if the property: has a backing field, is not private, has no `open` / `override` / `const` modifiers, is not delegated.

```kotlin
class User(id: String) {
    @JvmField val ID = id
}
```

Late-initialized properties are also exposed as fields, with the visibility of the `lateinit` property setter.

### Static fields

Properties in a named object or companion object have static backing fields in that object / the class containing the companion; usually private, exposed via `@JvmField`, `lateinit`, or `const`.

```kotlin
class Key(val value: Int) {
    companion object {
        @JvmField
        val COMPARATOR: Comparator<Key> = compareBy<Key> { it.value }
    }
}
```

```java
Key.COMPARATOR.compare(key1, key2);
// public static final field in Key class
```

`lateinit` in an object / companion: public static non-final field (visibility of the setter). `const` properties (in classes and top level) become static fields:

```kotlin
object Obj {
    const val CONST = 1
}

class C {
    companion object {
        const val VERSION = 9
    }
}

const val MAX = 239
```

```java
int constant = Obj.CONST;
int max = ExampleKt.MAX;
int version = C.VERSION;
```

### Static methods

Annotate functions in named objects or companion objects with `@JvmStatic`. In a companion object this generates both a static method in the enclosing class and an instance method in the companion; in a named object only the static method.

```kotlin
class C {
    companion object {
        @JvmStatic fun callStatic() {}
        fun callNonStatic() {}
    }
}
```

```java
C.callStatic();              // Success
C.callNonStatic();           // Error: not a static method
C.Companion.callStatic();    // Instance method remains
C.Companion.callNonStatic(); // Success
```

```java
Obj.callStatic();             // Success
Obj.callNonStatic();          // Error: not a static method
Obj.INSTANCE.callNonStatic(); // Success, the call passed through the singleton instance
```

`@JvmStatic` on functions in an interface's companion object compiles to static methods in the interface; on a property of an object / companion it makes getter and setter static.

### Default methods in interfaces

When targeting the JVM, interface functions compile to Java default methods unless configured otherwise.

```kotlin
interface Robot {
    fun move() { println("~walking~") }  // will be default in the Java interface
    fun speak(): Unit
}
```

Java implementers inherit `move()` and may override it. Control with the `-jvm-default` compiler option (replaces the deprecated `-Xjvm-default`):

| Mode | Behavior |
| --- | --- |
| `enable` | Default. Default implementations in interfaces plus compatibility bridges and `DefaultImpls` classes; compatible with older compiled Kotlin code. |
| `no-compatibility` | Only default implementations in interfaces; no bridges or `DefaultImpls`. For new codebases not interacting with code relying on `DefaultImpls`; can break binary compatibility with older Kotlin code. With interface delegation, all interface methods are delegated. |
| `disable` | No default implementations in interfaces; only compatibility bridges and `DefaultImpls` classes. |

### Visibility

- `private` members remain `private`.
- `private` top-level declarations become `private` top-level declarations in Java (package-private accessors are included if accessed from within a class).
- `protected` remains `protected` (Java allows access from the same package; Kotlin does not).
- `internal` becomes `public` in Java; member names are mangled in bytecode to prevent accidental overrides across modules and allow overloading of same-signature members. Names of public members of `internal` classes aren't mangled.
- `public` remains `public`.

### KClass

There is no automatic `Class` to `KClass` conversion; call the equivalent of `Class<T>.kotlin`:

```kotlin
kotlin.jvm.JvmClassMappingKt.getKotlinClass(MainView.class)
```

### Signature clashes with @JvmName

```kotlin
fun List<String>.filterValid(): List<String>

@JvmName("filterValidInt")
fun List<Int>.filterValid(): List<Int>
```

From Kotlin both are `filterValid`; from Java `filterValid` and `filterValidInt`. Also for a property `x` with a function `getX()`:

```kotlin
val x: Int
    @JvmName("getX_prop")
    get() = 15

fun getX() = 10
```

Rename generated accessors without explicit getters/setters with `@get:JvmName` / `@set:JvmName`:

```kotlin
@get:JvmName("x")
@set:JvmName("changeX")
var x: Int = 23
```

### Overloads generation

Functions with default parameter values are visible in Java only with the full signature. Use `@JvmOverloads` (or `@IntroducedAt`) to generate overloads.

```kotlin
class Circle @JvmOverloads constructor(centerX: Int, centerY: Int, radius: Double = 1.0) {
    @JvmOverloads fun draw(label: String, lineWidth: Int = 1, color: String = "red") { /*...*/ }
}
```

For each parameter with a default value, one overload is generated: default-valued parameters are dropped one by one starting from the last one, while parameters without defaults are always kept:

```java
// Constructors:
Circle(int centerX, int centerY, double radius)
Circle(int centerX, int centerY)

// Methods
void draw(String label, int lineWidth, String color) { }
void draw(String label, int lineWidth) { }
void draw(String label) { }
```

`@JvmOverloads` also works for constructors and static methods; it can't be used on abstract methods, including interface methods. If all constructor parameters have defaults, a public no-argument constructor is generated even without `@JvmOverloads`.

`@IntroducedAt` generates hidden overloads reflecting the version in which each optional parameter was introduced (helps preserve binary compatibility for callers compiled against older versions). Experimental; opt in with `@OptIn(ExperimentalVersionOverloading::class)`:

```kotlin
@OptIn(ExperimentalVersionOverloading::class)
fun Button(
    label: String = "",
    color: Color = DefaultColor,
    @IntroducedAt("1.1") borderColor: Color = DefaultBorderColor,
    @IntroducedAt("1.2") borderStyle: Style = DefaultBorderStyle,
    @IntroducedAt("1.2") borderWidth: Int = 1,
    onClick: () -> Unit
) {
    // Function body
}
```

The compiler generates hidden overloads for the original API (`label`, `color`, `onClick`), version 1.1 (adds `borderColor`), and version 1.2 (adds `borderStyle`, `borderWidth`). Using `@IntroducedAt` and `@JvmOverloads` together can create conflicting overloads: the compiler reports a warning, and if suppressed, `@IntroducedAt` overloads take priority.

### Checked exceptions

Java signatures of Kotlin functions don't declare thrown exceptions; use `@Throws` so Java callers can catch checked exceptions:

```kotlin
@Throws(IOException::class)
fun writeToFile() {
    /*...*/
    throw IOException()
}
```

### Null-safety

Kotlin generates runtime checks for all public functions that expect non-nulls, so passing `null` from Java throws `NullPointerException` immediately.

### Variant generics

For declaration-site variance (`class Box<out T>`), the compiler generates `Box<? extends Super>` for covariant (or `Foo<? super Bar>` for contravariant) types in parameter position; no wildcards in return values. When the argument type is final, no wildcard is generated (`Box<String>` stays `Box<String>`).

```kotlin
fun boxDerived(value: Derived): Box<@JvmWildcard Derived> = Box(value)
// is translated to
// Box<? extends Derived> boxDerived(Derived value) { ... }

fun unboxBase(box: Box<@JvmSuppressWildcards Base>): Base = box.value
// is translated to
// Base unboxBase(Box<Base> box) { ... }
```

`@JvmSuppressWildcards` can also be applied to entire declarations (functions or classes).

The type `Nothing` has no Java counterpart, so a raw type is generated:

```kotlin
fun emptyList(): List<Nothing> = listOf()
// is translated to
// List emptyList() { ... }
```

### Inline value classes

By default inline value classes use unboxed representations, often inaccessible from Java (e.g. no callable `MyInt` constructor). Use `@JvmExposeBoxed` (class, constructor, or function level; opt in with `@OptIn(ExperimentalStdlibApi::class)`) or compile with `-Xjvm-expose-boxed` (same effect as annotating every declaration in the module).

```kotlin
@OptIn(ExperimentalStdlibApi::class)
@JvmExposeBoxed
@JvmInline
value class MyInt(val value: Int)

@OptIn(ExperimentalStdlibApi::class)
@JvmExposeBoxed
fun MyInt.timesTwoBoxed(): MyInt = MyInt(this.value * 2)
```

```java
MyInt input = new MyInt(5);
MyInt output = ExampleKt.timesTwoBoxed(input);
```

`@JvmExposeBoxed` doesn't generate boxed representations for inherited functions; override the function in the implementing class to get one.

## Notes

- The official docs say each overload removes the parameter and all parameters to its right; in fact only default-valued parameters are dropped (from the right) and required parameters stay, e.g. `@JvmOverloads fun f(a: Int = 0, b: String)` yields `f(String)`.
- `@IntroducedAt` is Experimental (opt in with `ExperimentalVersionOverloading`).
- Java-side usage of `@JvmStatic` on interface companion functions: they compile to static methods in interfaces.

## Related

- [Calling Java from Kotlin](./java-interop.md)
- [Using Java records in Kotlin](./jvm-records.md)
- [Inline value classes](../classes-objects/inline-classes.md)
- [Properties](../classes-objects/properties.md)
- [Inheritance](../classes-objects/inheritance.md)
- Generics
