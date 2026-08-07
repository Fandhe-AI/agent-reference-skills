# Color

An ARGB-packed color value used throughout the scripting drawing API (Paint, DataValue, gradients).

## Signature / Usage

```lua
local c1 = Color.rgb(255, 100, 50)          -- alpha defaults to 255
local c2 = Color.rgba(255, 100, 50, 128)
local mid = Color.lerp(c1, c2, 0.5)
local r = Color.red(c1)
local brighter = Color.alpha(c1, 200)
local floats = Color.toFloat(c1) -- {r, g, b, a} in 0-1 range, for clearColor
```

## Options / Props

| Member | Description |
| --- | --- |
| `Color.rgb(r, g, b) -> Color` | Constructs from red/green/blue (0-255, clamped); alpha = 255 |
| `Color.rgba(r, g, b, a) -> Color` | Constructs from red/green/blue/alpha (0-255, clamped) |
| `Color.lerp(from, to, t) -> Color` | Linear interpolation; `t = 0` returns `from`, `t = 1` returns `to` |
| `Color.red/green/blue/alpha(color, value?) -> number \| Color` | Getter when `value` omitted; returns a new Color with that channel updated when provided |
| `Color.opacity(color, value?) -> number \| Color` | Getter/setter for opacity as 0.0-1.0 (maps to alpha) |
| `Color.toFloat(color) -> {number}` | Converts to `{r, g, b, a}` table in 0-1 range, for use with `clearColor` in GPU render passes |

## Related

- [paint.md](./paint.md)
- [gradient.md](./gradient.md)
- [data-value.md](./data-value.md)
