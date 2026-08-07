# ViewModel (artboards namespace)

Represents a view model used for data binding: structured data that can be read and modified at runtime so Rive files react to application state. Instantiated via `Data.<ViewModelName>.new()` and bound to an Artboard input.

## Signature / Usage

```lua
type ViewModelExample = {
  character: Input<Artboard<Data.Character>>,
  instance: Artboard<Data.Character>?,
}

function init(self: ViewModelExample, context: Context): boolean
  local vm = Data.Character.new()
  self.instance = self.character:instance(vm)
  return true
end

return function(): Node<ViewModelExample>
  return { character = late(), instance = nil, init = init }
end
```

## Notes

- This is `artboards.ViewModel` (constructing/attaching a view model instance to an artboard). It is distinct from `interface-view-model.md` (`interfaces.ViewModel`, the read/write property-access interface returned by `context:viewModel()`) and from `references/concepts/view-models.md` (the editor concept).

## Related

- [interface-view-model.md](./interface-view-model.md)
- [data-binding.md](./data-binding.md)
