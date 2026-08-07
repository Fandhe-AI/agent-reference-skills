# Listener Action Scripts

Run custom logic when a state machine listener fires — side effects such as updating view model values, responding to pointer input, or triggering external behavior, without changing state.

## Signature / Usage

```lua
function init(self: MyListenerAction): boolean
  return true
end

-- Executes when the listener fires
function perform(self: MyListenerAction)
  -- side effects here
end

return function(): ListenerAction<MyListenerAction>
  return { init = init, perform = perform }
end
```

## Options / Props

| Lifecycle function | Description |
| --- | --- |
| `init(self)` | Runs once during initialization |
| `perform(self)` | Executes when the listener fires |

## Notes

- Attach: select the target listener → click `+` → **Scripted Action** → select the script from the Run dropdown.
- Inputs can control the script, but the script cannot change its own input values; to modify a view model property, access it through `Context` (see [data-binding.md](./data-binding.md)).

## Related

- [interface-listener-action.md](./interface-listener-action.md)
- [data-binding.md](./data-binding.md)
