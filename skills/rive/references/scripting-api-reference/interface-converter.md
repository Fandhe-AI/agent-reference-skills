# Converter (interfaces.Converter)

The lifecycle-method contract implemented by [Converter Scripts](./protocol-converter-scripts.md). Generic over `T` (converter type), `I`/`O` (input/output types, both must be [DataValue](./data-value.md) types).

## Signature / Usage

```lua
function init(self: MyConverter, context: Context): boolean
  return true
end

function convert(self: MyConverter, input: DataValueNumber): DataValueString
  -- ...
end

function reverseConvert(self: MyConverter, input: DataValueString): DataValueNumber
  -- ...
end

return function(): Converter<MyConverter>
  return { init = init, convert = convert, reverseConvert = reverseConvert }
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `init(self, context) -> boolean` | Runs once on creation |
| `convert(self, input: I) -> O` | Converts a view-model property value to an output value |
| `reverseConvert(self, input: O) -> I` | Converts an output value back to a view-model property value (bidirectional binding) |
| `advance(self, seconds) -> boolean` | Optional per-frame update; returns whether to keep receiving calls |

## Related

- [protocol-converter-scripts.md](./protocol-converter-scripts.md)
- [data-value.md](./data-value.md)
