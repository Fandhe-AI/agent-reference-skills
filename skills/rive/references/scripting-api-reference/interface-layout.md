# Layout (interfaces.Layout)

The lifecycle-method contract implemented by [Layout Scripts](./protocol-layout-scripts.md). A scripted Layout behaves like a Node but can additionally report intrinsic sizing (`measure`) and reacts to size changes (`resize`).

## Signature / Usage

```lua
function measure(self: MyLayout): Vector
  return Vector.xy(100, 100)
end

function resize(self: MyLayout, size: Vector)
  print('Resize:', size.x, size.y)
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `measure(self) -> Vector` | Requests an intrinsic size (not guaranteed; layout may have min/max constraints). Only applies to layouts with Hug fit |
| `resize(self, size: Vector)` | Guaranteed call to set the initial size and on every subsequent size change; runs after `measure` with the granted size |

## Notes

- This is `interfaces.Layout` (the script contract), distinct from `references/concepts/layout.md` (the editor's Fit/Alignment concept).

## Related

- [protocol-layout-scripts.md](./protocol-layout-scripts.md)
