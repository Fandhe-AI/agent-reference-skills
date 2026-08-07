# DataValue

Foundational type for storing values passed into scripted converter/data inputs (`DataInputs`/`DataOutput`), with type-checking helpers. Concrete variants: `DataValueNumber`, `DataValueString`, `DataValueBoolean`, `DataValueColor`.

## Signature / Usage

```lua
local n = DataValue.number()
n.value = 42

local s = DataValue.string()
s.value = 'Rive for life!'

local b = DataValue.boolean()
b.value = false

local c = DataValue.color()
c.value = Color.rgba(128, 55, 12, 128)

if n:isNumber() then
  print(n.value)
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `DataValue.number() -> DataValueNumber` | Creates a numeric data value; `.value: number` |
| `DataValue.string() -> DataValueString` | Creates a string data value; `.value: string` |
| `DataValue.boolean() -> DataValueBoolean` | Creates a boolean data value; `.value: boolean` |
| `DataValue.color() -> DataValueColor` | Creates a color data value; `.value: Color` |
| `isNumber() / isString() / isBoolean() / isColor() -> boolean` | Type-checks the stored value |

## Related

- [protocol-converter-scripts.md](./protocol-converter-scripts.md)
- [property.md](./property.md)
- [color.md](./color.md)
