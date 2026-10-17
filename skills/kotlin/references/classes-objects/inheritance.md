---
source: https://kotlinlang.org/docs/inheritance.html
---

# Inheritance

All Kotlin classes have the common superclass `Any` (with `equals()`, `hashCode()`, `toString()`). Classes are final by default; mark a class or member `open` to allow inheritance or overriding.

## Signature / Usage

```kotlin
open class Base(p: Int)

class Derived(p: Int) : Base(p)
```

If the derived class has no primary constructor, each secondary constructor must initialize the base type with `super` or delegate to another constructor that does:

```kotlin
class MyView : View {
    constructor(ctx: Context) : super(ctx)

    constructor(ctx: Context, attrs: AttributeSet) : super(ctx, attrs)
}
```

### open / override / final

```kotlin
open class Shape {
    open fun draw() { /*...*/ }
    fun fill() { /*...*/ }
}

class Circle() : Shape() {
    override fun draw() { /*...*/ }
}

open class Rectangle() : Shape() {
    final override fun draw() { /*...*/ }
}
```

### Overriding properties

```kotlin
open class Shape {
    open val vertexCount: Int = 0
}

class Rectangle : Shape() {
    override val vertexCount = 4
}

interface Shape2 {
    val vertexCount: Int
}

class Rectangle2(override val vertexCount: Int = 4) : Shape2 // Always has 4 vertices
```

### Calling the superclass implementation

```kotlin
open class Rectangle {
    open fun draw() { println("Drawing a rectangle") }

    val borderColor: String get() = "black"
}

class FilledRectangle : Rectangle() {
    override fun draw() {
        super.draw()
        println("Filling the rectangle")
    }

    val fillColor: String get() = super.borderColor
}
```

In an inner class, call the outer class's superclass with `super@Outer`, for example `super@FilledRectangle.draw()`.

### Overriding rules

```kotlin
open class Rectangle {
    open fun draw() { /* ... */ }
}

interface Polygon {
    fun draw() { /* ... */ } // interface members are 'open' by default
}

class Square() : Rectangle(), Polygon {
    // The compiler requires draw() to be overridden:
    override fun draw() {
        super<Rectangle>.draw() // call to Rectangle.draw()
        super<Polygon>.draw() // call to Polygon.draw()
    }
}
```

## Notes

- A member marked `override` is itself open; use `final` to prohibit re-overriding. `open` has no effect on members of a final class.
- Without `open` on a function, declaring a method with the same signature in a subclass is not allowed (with or without `override`). `override` is required when overriding.
- A `val` property can be overridden by a `var`, but not vice versa.
- Initialization order: base class initialization is first (preceded only by evaluating the base constructor arguments), before the derived class's initialization logic. When the base constructor runs, properties declared or overridden in the derived class are not yet initialized, so avoid using `open` members in base constructors, property initializers, or `init` blocks.
- If a class inherits multiple implementations of the same member from its immediate supertypes, it must override the member (use `super<Type>` to pick a specific implementation).
- Before building a class hierarchy, consider abstract classes or interfaces, which are inheritable by default.

## Related

- [Classes](./classes.md)
- [Interfaces](./interfaces.md)
- [Sealed classes and interfaces](./sealed-classes.md)
- [Visibility modifiers](../basics/visibility-modifiers.md)
