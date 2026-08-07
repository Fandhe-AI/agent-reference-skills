# Font

An immutable font resource, obtained from a host and assignable to view model font properties.

## Signature / Usage

```lua
function init(self: FontBinder, context: Context, viewModel: ViewModelInstance): boolean
  local myFont = context:font('myFont')
  viewModel.myFontProperty = myFont
  return true
end
```

## Notes

- Retrieved similarly to other named assets via `context`, then assigned where a view model exposes a font property.

## Related

- [image.md](./image.md)
- [data-binding.md](./data-binding.md)
