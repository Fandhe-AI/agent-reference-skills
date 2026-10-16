# Converters

Transformation nodes that modify a ViewModel property value before it is applied to a binding target. Converters adapt data to match the type or range expected by a scene element, and can be chained sequentially.

## Signature / Usage

Converters are configured in the editor when setting up a binding or a "View Model Change" listener action. No runtime code is required — converters run automatically as part of the data binding pipeline.

```text
ViewModel Property → [Converter A] → [Converter B] → Scene Property
```

To add one: in the Assets panel click `+` and select a converter type, set its options in the right sidebar (most options can be data bound), then set the **Converter** field when setting or updating a binding.

## Options / Props

### Converter types

Converters can be used individually or combined into groups. Each has its own properties, many bindable to View Model properties (e.g. a Range Map's maximum, a Formula's multiplier, a String Pad amount).

| Category | Converter | Description |
| --- | --- | --- |
| String | Pad | Add padding to a string |
| String | Trim | Remove leading or trailing whitespace |
| String | Convert to String | Convert a value to a string |
| String | Remove Trailing Zeros | Remove unnecessary decimal zeros |
| String | String Template | Build text from a template and view model values |
| Number | Round | Round to the nearest value |
| Number | Calculate | Perform simple calculations |
| Number | Range Map | Map a value from one range to another |
| Number | Interpolator | Smoothly interpolate between values |
| Number | Formula | Evaluate a custom expression |
| Number | Convert to Number | Convert a value to a number |
| Boolean | Toggle | Invert a boolean value |
| List | Number to List | Generate a list of components based on a number |
| List | List to Length | Get the number of items in a list |
| Color | Interpolator | Smoothly interpolate between colors |
| Script | Converter Scripts | Create your own custom converters |

### Pad

Pads a string to a target length by repeating a value at the start or end until the length is reached. Example: Value `1`, Pad `"0"`, Direction Start, Length 3 gives `"001"`.

### String Template

Builds text by filling placeholders in a template string with argument values. Each argument is a **Number** or **String** bound to a view model property. Store the template in a view model String property so it can be swapped at runtime (useful for localization, where word order changes).

Setup: add a String property holding the template (e.g. `You scored ${score} of ${total}`) and Number properties for the values; create the converter via Assets `+` > **String** > **Template**; under **Arguments** click **Add Argument**, choose Number or String, name each argument (`score`, `total`) and bind its value; bind the text to the template String property and set **Converter** to the string template. Result: "You scored 10 of 12".

Placeholders:

| Placeholder | Uses |
| --- | --- |
| `${score}` | The argument named `score` |
| `${0}` | The argument at position 0 (the first argument) |
| `${}` | The next argument in order (first `${}` uses the first argument, and so on) |

Number formatting uses a colon and a printf-style format after the placeholder name:

| Placeholder | Value | Result |
| --- | --- | --- |
| `${score}` | `3.14159` | `3.14159` |
| `${score:%.1f}` | `3.14159` | `3.1` |
| `${score:%,d}` | `1234567` | `1,234,567` |
| `${score:%05.2f}` | `3.14159` | `03.14` |

Without a format, numbers show up to 6 decimal places with trailing zeros removed. The `,` flag adds thousands separators.

**Syntax** option chooses how placeholders are written: `${name}` (default), `{name}`, `{{name}}`, or **Custom** with your own **Open** and **Close** delimiters (1 to 4 symbols each; no letters, digits, spaces, `_`, `\`, or `:`). Put a backslash before a delimiter to show it literally (`\${score}` displays `${score}`).

### Range Map

Maps a number from one range to another. Example: slider value 50, input range 0 → 100, output range 0 → 1 gives `0.5`.

### Numeric Interpolator

Smoothly transitions between number values over time, easing changes instead of jumping instantly.

### Formula

Custom calculations using View Model values or the input. Write it directly or build it with the `+` button in the editor (which generates the equivalent expression).

```lua
random({{NumberConvertersVM/circleX}} / {Input}) + 2
```

`{Input}` is the incoming value; `{{...}}` references View Model properties. Formulas need no inputs (`random(2)` outputs a random number regardless of input).

**Random mode** (when using `random()`): **Once** generates a value only when the formula first runs; **Source Change** generates a new value each time the input changes; **Always** continuously generates new values while the input changes and during interpolation.

### Number to List

Generates a specified number of Components based on a number. See the Lists data binding page.

### Color Interpolator

Smoothly transitions between color values over time, easing changes instead of jumping instantly.

### Converter Scripts

Scripting creates custom converters for behavior not covered by the built-ins (Converter Scripts protocol).

### Converter groups

Chain multiple converters; the output of one becomes the input of the next. Create via Assets `+` > Converter > Group, then add an existing or new converter with `+` in the right sidebar. A group is used like an individual converter when binding.

- Execution: converters run top to bottom. The first receives the original input, each passes its result to the next, and the final output is the last converter's result.
- Reordering: drag a converter up or down to change when it runs; earlier converters affect all that follow.

## Notes

- Multiple converters can be chained in sequence (via groups); the output of each feeds into the input of the next.
- Many converter properties are themselves bindable to ViewModel properties, enabling dynamic behavior.
- The "System Enum to Uint" converter is applied automatically when binding an Enum property to a numeric scene property.

## Related

- [Data Binding](./data-binding.md)
- [Properties](./properties.md)
- [Enums](./enums.md)
