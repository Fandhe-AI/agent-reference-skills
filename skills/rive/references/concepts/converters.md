# Converters

Transformation nodes that modify a ViewModel property value before it is applied to a binding target. Converters adapt data to match the type or range expected by a scene element, and can be chained sequentially.

## Signature / Usage

Converters are configured in the editor when setting up a binding or a "View Model Change" listener action. No runtime code is required — converters run automatically as part of the data binding pipeline.

```text
ViewModel Property → [Converter A] → [Converter B] → Scene Property
```

## Options / Props

### String Converters

| Converter | Description |
| --- | --- |
| Pad | Pads a string to a fixed length |
| Trim | Removes leading/trailing whitespace |
| Convert to String | Converts a non-string value to its string representation |
| Remove Trailing Zeros | Strips insignificant trailing zeros from a numeric string |

### Number Converters

| Converter | Description |
| --- | --- |
| Round | Rounds to a specified number of decimal places |
| Calculate | Applies a simple arithmetic operation |
| Range Map | Maps a value from one numeric range to another |
| Interpolator | Smooths changes over time |
| Formula | Evaluates a custom formula expression |
| Convert to Number | Converts a non-number value to a number |

### Boolean Converters

| Converter | Description |
| --- | --- |
| Toggle | Inverts a boolean value |

### List Converters

| Converter | Description |
| --- | --- |
| Number to List | Maps a number to a list index |
| List to Length | Returns the length of a list |

### Color Converters

| Converter | Description |
| --- | --- |
| Interpolator | Smoothly interpolates between two colors over time |

### Custom

| Converter | Description |
| --- | --- |
| Converter Script | Scripted custom transformation logic |

## Notes

- Multiple converters can be chained in sequence; the output of each feeds into the input of the next.
- Many converter properties (e.g., a Range Map's maximum value, a Formula's multiplier) are themselves bindable to ViewModel properties, enabling dynamic behavior.
- The "System Enum to Uint" converter is applied automatically when binding an Enum property to a numeric scene property.

## Related

- [Data Binding](./data-binding.md)
- [Properties](./properties.md)
- [Enums](./enums.md)
