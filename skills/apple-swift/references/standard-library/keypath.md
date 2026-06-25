# KeyPath

A strongly typed reference to a property or chain of properties of a root type.

## Signature

```swift
class KeyPath<Root, Value>
```

## Type Hierarchy

| Type | Description |
|------|-------------|
| `AnyKeyPath` | Fully type-erased key path (any root → any value) |
| `PartialKeyPath<Root>` | Root is known; value type is erased |
| `KeyPath<Root, Value>` | Read-only key path with known root and value types |
| `WritableKeyPath<Root, Value>` | Read-write key path (works with value-type roots) |
| `ReferenceWritableKeyPath<Root, Value>` | Read-write key path for reference-type (class) roots |

## Usage

```swift
struct Person { var name: String; var age: Int }

let namePath = \Person.name          // KeyPath<Person, String>
let p = Person(name: "Alice", age: 30)
print(p[keyPath: namePath])          // "Alice"

// WritableKeyPath
var q = p
q[keyPath: \Person.age] = 31

// Chaining
struct Team { var leader: Person }
let leaderNamePath = \Team.leader.name   // KeyPath<Team, String>

// Use with map
let people = [Person(name: "Bob", age: 25), Person(name: "Eve", age: 28)]
let names = people.map(\.name)          // ["Bob", "Eve"]
```

## Key APIs

| Name | Description |
|------|-------------|
| `\Root.property` | Key-path literal expression |
| `subscript(keyPath:)` | Read (or write) a value through a key path on any instance |
| `appending(path:)` | Compose two key paths into a longer one |

## Notes

- Available on iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.
- `KeyPath` conforms to `Hashable`, `Equatable`, `CustomDebugStringConvertible`.
- Key paths are first-class values and can be stored, passed as arguments, or used with higher-order functions like `map` and `sorted(using:)`.
- Use `ReferenceWritableKeyPath` when the root is a class instance and you need mutation through the key path.

## Related

- [Array](./array.md)
