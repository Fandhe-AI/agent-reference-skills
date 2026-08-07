# ViewModel (interfaces.ViewModel)

Access to named properties used for data binding between application state and a Rive file. Returned by `context:viewModel()` / `context:rootViewModel()` (see [data-binding.md](./data-binding.md)).

## Signature / Usage

```lua
local vmi = context:viewModel()
if vmi then
  local score = vmi:getNumber('score')
  local nested = vmi:getViewModel('character')
  local list = vmi:getList('items')
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `name` | View model name (coming soon) |
| `getNumber(name) -> Property?` | Numeric property |
| `getString(name) -> Property?` | String property |
| `getBoolean(name) -> Property?` | Boolean property |
| `getColor(name) -> Property?` | Color property |
| `getImage(name) -> Property?` | Image property |
| `getFont(name) -> Property?` | Font property |
| `getBlob(name) -> Property?` | Blob property |
| `getList(name) -> PropertyList?` | List property |
| `getViewModel(name) -> PropertyViewModel?` | Nested view model property |
| `getEnum(name) -> PropertyEnum?` | Enum property |
| `getTrigger(name) -> PropertyTrigger?` | Trigger property, fireable with `:fire()` |
| `instance(instanceName?) -> ViewModel` | Creates a new instance of the view model, optionally from a named template |
| `getIndex() -> number` | Numeric index, or `-1` if unavailable |

## Notes

- All getters return `nil` if the property isn't found — always guard with `if property then ... end`.
- This is `interfaces.ViewModel` (the read/write property-access object). It is distinct from `artboard-view-model.md` (`artboards.ViewModel`, constructing/attaching a VM instance to an Artboard input) and from `references/concepts/view-models.md` (the editor concept).

## Related

- [data-binding.md](./data-binding.md)
- [property.md](./property.md)
- [interface-misc.md](./interface-misc.md)
