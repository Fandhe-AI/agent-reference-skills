# Converter Scripts

Custom data-binding converters for when built-in options ("Convert to String", "Round", etc.) aren't enough.

## Signature / Usage

```lua
function init(self: MyConverter): boolean
  return true
end

-- Transforms the input property value into the desired output format
function convert(self: MyConverter, input: DataInputs): DataOutput
  -- ...
end

-- For bidirectional binding: converts target values back to source values
function reverseConvert(self: MyConverter, output: DataOutput): DataInputs
  -- ...
end

return function(): Converter<MyConverter>
  return { init = init, convert = convert, reverseConvert = reverseConvert }
end
```

## Options / Props

| Lifecycle function | Description |
| --- | --- |
| `init(self)` | Runs once when the script loads; returns a boolean |
| `convert(self, input)` | Transforms the input property value into the output value |
| `reverseConvert(self, output)` | Converts a target value back to a source value for bidirectional binding |

## Notes

- Attach: in the Data panel, click `+` → **Converters → Script → [YourConverterName]**.

## Related

- [interface-converter.md](./interface-converter.md)
- [data-value.md](./data-value.md)
