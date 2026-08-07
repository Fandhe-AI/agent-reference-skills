# Gradient / GradientStop

`Gradient` defines a fill/stroke gradient (linear or radial) from a list of `GradientStop` color stops; assigned to `Paint.gradient`.

## Signature / Usage

```lua
local g = Gradient.linear(Vector.xy(0, 0), Vector.xy(100, 0), {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})

local radial = Gradient.radial(Vector.xy(50, 50), 40, {
  { position = 0, color = Color.rgb(255, 0, 0) },
  { position = 1, color = Color.rgb(0, 0, 255) },
})
```

## Options / Props

| Member | Description |
| --- | --- |
| `Gradient.linear(from: Vector, to: Vector, stops: {GradientStop}) -> Gradient` | Linear gradient along the line `from -> to` |
| `Gradient.radial(from: Vector, radius: number, stops: {GradientStop}) -> Gradient` | Radial gradient centered at `from` extending to `radius` |
| `GradientStop.position` | Position along the gradient, `0` (start) to `1` (end) |
| `GradientStop.color` | `Color` at that position |

## Related

- [paint.md](./paint.md)
- [color.md](./color.md)
- [vector.md](./vector.md)
