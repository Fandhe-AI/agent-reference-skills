# Data Binding (Scripting)

Scripting allows a script to read, modify, and subscribe to changes in View Model properties, and to create new View Model instances at runtime.

## Signature / Usage

```lua
type MyNode = {}

function init(self: MyNode, context: Context): boolean
  -- Get the view model from the node's immediate context
  local vmi = context:viewModel()

  -- Get the root view model
  local rootVmi = context:rootViewModel()

  if vmi then
    local score = vmi:getNumber('score')
    if score then
      print(score.value)
      score.value = 100
      score:addListener(function() print('score changed!') end)
    end
  end
  return true
end

return function(): Node<MyNode>
  return { init = init }
end
```

A script can access a View Model three ways: through `Context` (`context:viewModel()` / `context:rootViewModel()`), by declaring a View Model as an [Input](./script-inputs.md#view-model-inputs), or by data-binding a View Model property to an input.

## Options / Props

| Method (on ViewModel) | Description |
| --- | --- |
| `getNumber(name)` | Reference to a Number property |
| `getTrigger(name)` | Reference to a Trigger property |
| `getString(name)` | Reference to a String property |
| `getBoolean(name)` | Reference to a Boolean property |
| `getColor(name)` | Reference to a Color property |
| `getList(name)` | Reference to a List property |
| `getViewModel(name)` | Reference to a nested ViewModel property |
| `getEnum(name)` | Reference to an Enum property |

## Notes

- Use `addListener(fn)` / `removeListener(fn)` on a property reference to observe triggers or value changes; always remove listeners no longer needed to avoid leaks.
- Nested view models are reached via `getViewModel('name')` chained off a `ViewModel` instance.
- Inputs can control scripts, but scripts cannot change the value of their own inputs; to write a ViewModel property, go through `context:viewModel()` or a declared View Model Input instead.
- This is the scripting runtime API for data binding (Luau, inside a script). It is distinct from `references/concepts/data-binding.md` (the editor's general Data Binding concept) and from `references/runtimes-web/data-binding.md` / `references/runtimes-react/data-binding.md` (the JS/React runtime `viewModelInstance` API).

## Related

- [Script Inputs](./script-inputs.md)
- [interface-view-model.md](./interface-view-model.md)
- [property.md](./property.md)
- [listener.md](./listener.md)
