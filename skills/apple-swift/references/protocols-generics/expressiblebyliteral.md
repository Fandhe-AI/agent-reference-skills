# ExpressibleByLiteral Protocols

A family of protocols that allow custom types to be initialized directly from Swift literal syntax.

## Protocols

| Protocol | Literal Syntax | Required Initializer |
|----------|---------------|----------------------|
| `ExpressibleByIntegerLiteral` | `42` | `init(integerLiteral: IntegerLiteralType)` |
| `ExpressibleByFloatLiteral` | `3.14` | `init(floatLiteral: FloatLiteralType)` |
| `ExpressibleByBooleanLiteral` | `true` / `false` | `init(booleanLiteral: BooleanLiteralType)` |
| `ExpressibleByStringLiteral` | `"hello"` | `init(stringLiteral: StringLiteralType)` |
| `ExpressibleByArrayLiteral` | `[1, 2, 3]` | `init(arrayLiteral: ArrayLiteralElement...)` |
| `ExpressibleByDictionaryLiteral` | `["k": v]` | `init(dictionaryLiteral: (Key, Value)...)` |
| `ExpressibleByNilLiteral` | `nil` | `init(nilLiteral: ())` |

## Signature / Usage

```swift
protocol ExpressibleByStringLiteral : ExpressibleByExtendedGraphemeClusterLiteral
```

## Usage

```swift
struct Regex: ExpressibleByStringLiteral {
    let pattern: String

    init(stringLiteral value: String) {
        self.pattern = value
    }
}

let r: Regex = "\\d+"   // initialized from a string literal
```

```swift
struct Bag<T>: ExpressibleByArrayLiteral {
    var items: [T]
    init(arrayLiteral elements: T...) {
        self.items = elements
    }
}

let bag: Bag<Int> = [1, 2, 3]
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- `ExpressibleByStringLiteral` refines `ExpressibleByExtendedGraphemeClusterLiteral`, which refines `ExpressibleByUnicodeScalarLiteral`; implement all three or use a `String` underlying type
- `ExpressibleByNilLiteral` conformance is only for `Optional`; avoid conforming other types
- `ExpressibleByStringInterpolation` enables `"\(value)"` syntax on custom types via `StringInterpolationProtocol`

## Related

- [CustomStringConvertible](./customstringconvertible.md)
- [RawRepresentable](./rawrepresentable.md)
