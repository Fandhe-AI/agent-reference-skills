---
source: https://kotlinlang.org/docs/delegated-properties.html
---

# Delegated properties

A delegated property hands its `get()` / `set()` to a delegate's `getValue()` / `setValue()`. Syntax: `val/var <property name>: <Type> by <expression>`.

## Signature / Usage

```kotlin
import kotlin.reflect.KProperty

class Example {
    var p: String by Delegate()
}

class Delegate {
    operator fun getValue(thisRef: Any?, property: KProperty<*>): String {
        return "$thisRef, thank you for delegating '${property.name}' to me!"
    }

    operator fun setValue(thisRef: Any?, property: KProperty<*>, value: String) {
        println("$value has been assigned to '${property.name}' in $thisRef.")
    }
}
```

### Standard delegates

```kotlin
// lazy(): computed on first access, then remembered
val lazyValue: String by lazy {
    println("computed!")
    "Hello"
}

// Delegates.observable(): handler called after each assignment
import kotlin.properties.Delegates

class User {
    var name: String by Delegates.observable("<no name>") {
        prop, old, new ->
        println("$old -> $new")
    }
}
```

`Delegates.vetoable()` takes a handler called before the assignment so it can veto it. `lazy()` is synchronized by default; pass `LazyThreadSafetyMode.PUBLICATION` to allow concurrent initialization, or `LazyThreadSafetyMode.NONE` for no thread-safety guarantees or overhead.

### Delegating to another property

```kotlin
var topLevelInt: Int = 0
class ClassWithDelegate(val anotherClassInt: Int)

class MyClass(var memberInt: Int, val anotherClassInstance: ClassWithDelegate) {
    var delegatedToMember: Int by this::memberInt
    var delegatedToTopLevel: Int by ::topLevelInt

    val delegatedToAnotherClass: Int by anotherClassInstance::anotherClassInt
}
var MyClass.extDelegated: Int by ::topLevelInt

// Backward-compatible rename
class MyClass2 {
    var newName: Int = 0
    @Deprecated("Use 'newName' instead", ReplaceWith("newName"))
    var oldName: Int by this::newName
}
```

### Storing properties in a map

```kotlin
class User(val map: Map<String, Any?>) {
    val name: String by map
    val age: Int     by map
}

class MutableUser(val map: MutableMap<String, Any?>) {
    var name: String by map
    var age: Int     by map
}
```

### Local delegated properties

```kotlin
fun example(computeFoo: () -> Foo) {
    val memoizedFoo by lazy(computeFoo)

    if (someCondition && memoizedFoo.isValid()) {
        memoizedFoo.doSomething()
    }
}
```

### Property delegate requirements

```kotlin
class ResourceDelegate(private var resource: Resource = Resource()) {
    operator fun getValue(thisRef: Owner, property: KProperty<*>): Resource {
        return resource
    }
    operator fun setValue(thisRef: Owner, property: KProperty<*>, value: Any?) {
        if (value is Resource) {
            resource = value
        }
    }
}
```

| Function | Parameter | Requirement |
| --- | --- | --- |
| `getValue()` (val) | `thisRef` | Same type as, or a supertype of, the property owner (for extension properties, the type being extended) |
| `getValue()` (val) | `property` | `KProperty<*>` or its supertype |
| `getValue()` | return | Same type as the property (or its subtype) |
| `setValue()` (var, in addition) | `value` | Same type as the property (or its supertype) |

`getValue()` / `setValue()` can be member or extension functions and must be marked `operator`. Use `ReadOnlyProperty` and `ReadWriteProperty` from the standard library to create delegates as anonymous objects:

```kotlin
fun resourceDelegate(resource: Resource = Resource()): ReadWriteProperty<Any?, Resource> =
    object : ReadWriteProperty<Any?, Resource> {
        var curValue = resource
        override fun getValue(thisRef: Any?, property: KProperty<*>): Resource = curValue
        override fun setValue(thisRef: Any?, property: KProperty<*>, value: Resource) {
            curValue = value
        }
    }

val readOnlyResource: Resource by resourceDelegate()  // ReadWriteProperty as val
var readWriteResource: Resource by resourceDelegate()
```

### Providing a delegate (provideDelegate)

```kotlin
class ResourceLoader<T>(id: ResourceID<T>) {
    operator fun provideDelegate(
            thisRef: MyUI,
            prop: KProperty<*>
    ): ReadOnlyProperty<MyUI, T> {
        checkProperty(thisRef, prop.name)
        // create delegate
        return ResourceDelegate()
    }
}

// PropertyDelegateProvider creates providers without new classes
val provider = PropertyDelegateProvider { thisRef: Any?, property ->
    ReadOnlyProperty<Any?, Int> {_, property -> 42 }
}
val delegate: Int by provider
```

`provideDelegate` takes the same parameters as `getValue` and is called during creation of the owner instance, so it can validate (for example the property name) immediately.

## Notes

- Delegates don't have to implement an interface; they only need `getValue()` (and `setValue()` for `var`).
- Translation rules: for `var prop: Type by MyDelegate()` the compiler generates a hidden `prop$delegate` and accessors `get() = prop$delegate.getValue(this, this::prop)` / `set(value) = prop$delegate.setValue(this, this::prop, value)`. With `provideDelegate`, `prop$delegate` is initialized by `MyDelegate().provideDelegate(this, this::prop)`; accessor code is unchanged.
- The `$delegate` field is omitted when the delegate is a referenced property (`by ::impl`), a named object, a final `val` property with a backing field and default getter in the same module, or a constant expression / enum entry / `this` / `null`. When delegating to another property, accessors call the referenced property directly (no `getValue` / `setValue`, no `KProperty` object); `getProp$delegate()` exists only for reflection.
- A delegated property can be declared inside a function or code block (local delegated property).

## Related

- [Properties](./properties.md)
- [Delegation](./delegation.md)
- [Operator overloading](../functions/operator-overloading.md)
