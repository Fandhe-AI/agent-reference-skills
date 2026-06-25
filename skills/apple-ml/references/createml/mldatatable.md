# MLDataTable

A spreadsheet-like table of typed data used for training and evaluating Create ML models. Each row is an observation; each column is a feature.

## Signature / Usage

```swift
// Load from CSV
let table = try MLDataTable(contentsOf: csvURL, options: .init())

// Build programmatically
var table = try MLDataTable(dictionary: [
    "price": [150_000, 320_000, 210_000],
    "sqft":  [900, 1500, 1100]
])

// Access a typed column
let prices: MLDataColumn<Int> = table["price", Int.self]!

// Split into train / validation
let (train, validation) = table.randomSplit(
    by: 0.8,
    seed: 42
)

// Write
try table.writeCSV(to: outputURL)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `size` | `(rows: Int, columns: Int)` | Number of rows and columns |
| `columnNames` | `ColumnNames` | Collection of column name strings |
| `columnTypes` | `[String: MLDataValue.ValueType]` | Type of each column |
| `rows` | `Rows` | Iterable row collection |
| `isValid` | `Bool` | Whether the table is in a valid state |
| `error` | `(any Error)?` | Underlying error if table is invalid |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, tvOS 16.0+, visionOS 1.0+
- Subscript with type `table["col", Int.self]` returns `MLDataColumn<Int>?`; untyped subscript returns `MLUntypedColumn`
- `stratifiedSplit(proportions:on:seed:)` preserves class distribution across splits
- `write(to:)` saves in binary format; `writeCSV(to:)` saves as plain CSV

## Related

- [MLDataValue](./mldatavalue.md)
- [MLRegressor](./mlregressor.md)
- [MLClassifier](./mlclassifier.md)
