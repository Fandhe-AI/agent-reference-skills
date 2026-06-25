# MLDataValue

An enum representing the value of a single cell in an `MLDataTable`. Wraps all supported Create ML data types.

## Signature / Usage

```swift
// Access typed value from a data table row
let row: MLDataTable.Row = table.rows.first!
let val: MLDataValue = row["price"]!

switch val {
case .int(let n):    print("Integer:", n)
case .double(let d): print("Double:", d)
case .string(let s): print("String:", s)
default: break
}

// Convenience accessors
let price = val.doubleValue  // Double?
let label = val.stringValue  // String?
```

## Options / Props

| Case | Description |
|------|-------------|
| `.int(Int)` | An integer value |
| `.double(Double)` | A double-precision floating-point value |
| `.string(String)` | A string value |
| `.sequence(SequenceType)` | A sequence of `MLDataValue` elements |
| `.dictionary(DictionaryType)` | A dictionary of named `MLDataValue` values |
| `.multiArray(MultiArrayType)` | A multidimensional array of values |
| `.invalid` | An invalid or missing value |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- `type` property returns the `ValueType` enum indicating which case is active
- `isValid` returns `false` for the `.invalid` case
- Conforms to `Equatable` and `Hashable`

## Related

- [MLDataTable](./mldatatable.md)
