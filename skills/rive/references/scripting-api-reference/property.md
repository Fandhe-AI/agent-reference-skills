# Property / PropertyTrigger / Listener

`Property` is a mutable, listenable reference to a ViewModel property value (returned by `ViewModel:getNumber/getString/getBoolean/getColor/...`). `PropertyTrigger` is the trigger-property variant (no persistent value, fires an event). `Listener` is the callback type both use.

## Signature / Usage

```lua
local vm = context:viewModel()
local health = vm:getNumber('health')
if health then
  print(health.value)   -- read
  health.value = 100    -- write

  local function onHealthChanged(prop)
    print('New health:', prop.value)
  end
  health:addListener(onHealthChanged)
  -- ...
  health:removeListener(onHealthChanged)
end

local trigger = vm:getTrigger('myTrigger')
if trigger then
  trigger:addListener(function() print('Fire!') end)
  trigger:fire()
end
```

## Options / Props

| Member | Description |
| --- | --- |
| `value` | Current property value, readable/writable (`Property` only; `PropertyTrigger` has none) |
| `addListener(callback)` / `addListener(anchor, callback)` | Registers a change (or fire) listener; the anchor form keeps `anchor` alive alongside the listener |
| `removeListener(callback)` / `removeListener(anchor, callback)` | Removes a previously registered listener (matched by callback) |
| `fire()` | `PropertyTrigger` only: fires the trigger and notifies listeners |

## Notes

- If a `ViewModel` is only referenced by a local variable while a listener is attached, it may be garbage-collected after the function returns; store it on `self` or pass it as the `anchor` argument to `addListener` to keep it alive.
- Always call `removeListener` when a listener is no longer needed to avoid leaks.
- This is distinct from `references/concepts/properties.md` (the editor concept of ViewModel property types) — this page documents the Luau scripting-runtime accessor object.

## Related

- [data-value.md](./data-value.md)
- [data-binding.md](./data-binding.md)
- [interface-view-model.md](./interface-view-model.md)
