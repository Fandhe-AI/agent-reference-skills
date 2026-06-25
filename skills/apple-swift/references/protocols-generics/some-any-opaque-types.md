# some / any — Opaque and Existential Types

`some` declares an opaque type (the compiler knows the concrete type; callers do not). `any` declares an existential type (any conforming type, resolved at runtime).

## Signature / Usage

### `some` — Opaque Return Type

```swift
// The concrete return type is fixed but hidden from callers
func makeShape() -> some Shape {
    Circle(radius: 5)
}

// Swift 5.7+: `some` in parameter position (shorthand for generics)
func draw(_ shape: some Shape) { shape.draw() }
// Equivalent to:
func draw<S: Shape>(_ shape: S) { shape.draw() }
```

### `any` — Existential Type

```swift
// Heterogeneous collection of protocol-conforming values
let shapes: [any Shape] = [Circle(radius: 1), Rectangle(width: 2, height: 3)]

func process(_ shape: any Shape) {
    shape.draw()
}
```

### Constrained Existentials (Swift 5.7+)

```swift
// Requires primary associated type on the protocol
let integers: any Collection<Int> = [1, 2, 3]
```

## Notes

- `some` requires a single concrete type for the entire call site; different branches returning different types is a compile error
- `any` boxes the value and dispatches dynamically — slight runtime overhead; allows heterogeneous collections
- Prefer `some` for return types and parameters when the concrete type is uniform (better performance, static dispatch)
- Use `any` when you need to store or pass values of different conforming types
- Protocols with associated types or `Self` requirements cannot be used as plain existentials without `any` keyword (Swift 5.7+, previously a compile error)
- `opaque types` (using `some`) preserve type identity: the compiler can verify type relationships across calls

## Related

- [Generics](./generics.md)
- [Sequence](./sequence.md)
- [Collection](./collection.md)
