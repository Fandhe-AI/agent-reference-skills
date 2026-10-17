# classes-objects

| Name | Description | Path |
|------|-------------|------|
| Classes | Kotlin classes encapsulate data (properties) and behavior (functions). | [classes.md](./classes.md) |
| Data classes | Data classes (`data` modifier) hold data; the compiler derives `equals()`/`hashCode()`, `toString()`, `componentN()` and `copy()` from the primary constructor properties. | [data-classes.md](./data-classes.md) |
| Delegated properties | A delegated property hands its `get()` / `set()` to a delegate's `getValue()` / `setValue()`. | [delegated-properties.md](./delegated-properties.md) |
| Delegation | Kotlin supports the delegation pattern natively (class delegation with the `by` clause), as an alternative to implementation inheritance, with zero boilerplate. | [delegation.md](./delegation.md) |
| Enum classes | Enum classes represent a fixed set of possible values. | [enum-classes.md](./enum-classes.md) |
| Extensions | Extensions let you add functions and properties to a class or interface without inheritance or patterns such as Decorator. | [extensions.md](./extensions.md) |
| Functional (SAM) interfaces | An interface with exactly one abstract member function is a functional (Single Abstract Method, SAM) interface. | [fun-interfaces.md](./fun-interfaces.md) |
| Inheritance | All Kotlin classes have the common superclass `Any` (with `equals()`, `hashCode()`, `toString()`). | [inheritance.md](./inheritance.md) |
| Inline value classes | Inline (value) classes wrap a single value into a domain-specific type without the usual heap-allocation overhead. | [inline-classes.md](./inline-classes.md) |
| Interfaces | Interfaces can contain abstract methods and method implementations. | [interfaces.md](./interfaces.md) |
| Nested and inner classes | Classes (and interfaces) can be nested in other classes. | [nested-classes.md](./nested-classes.md) |
| Object declarations and expressions | Objects define a class and create an instance in one step: object declarations create named singletons; object expressions create anonymous one-time objects. | [object-declarations.md](./object-declarations.md) |
| Properties | Properties store and manage data through accessors: an automatically generated getter (`get()`) and, for `var`, a setter (`set()`). | [properties.md](./properties.md) |
| Sealed classes and interfaces | Sealed classes and interfaces give controlled inheritance: all direct subclasses are known at compile time, and none can appear outside the module and package where the sealed type is defined. | [sealed-classes.md](./sealed-classes.md) |
| This expressions | `this` refers to the current receiver: the current object in a class member, or the receiver in an extension function or a function literal with receiver. | [this-expressions.md](./this-expressions.md) |
