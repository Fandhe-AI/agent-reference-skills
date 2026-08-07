# Interfaces (Misc: Property variants, Protocol contracts, Assets)

Smaller `interfaces.*` types grouped together: property-accessor variants beyond `Property`/`PropertyTrigger`, lifecycle-method contracts for the remaining protocols, and asset/audio handles.

## Signature / Usage

```lua
-- PropertyEnum / EnumValues
local textAlignment = vmi:getEnum('textAlignment')
if textAlignment then
  local values = textAlignment:values()
  print('count:', #values)
end

-- PropertyList
local items = vmi:getList('items')
if items then
  items:push(newItemVm)
  items:addListener(function() print('list changed') end)
end

-- AudioSound
local sound = self.audioSource:play()
sound:seek(1.5)

-- Blob
local blob = context:blob('myBlob')
print(blob.size, buffer.readu8(blob.data, 0))
```

## Options / Props

| Type | Members | Description |
| --- | --- | --- |
| `PropertyViewModel` | `value -> ViewModel?` | Property holding a nested ViewModel value |
| `PropertyList` | `length`, `list[i]` (1-based), `push(vm)`, `insert(vm, index)`, `pop()`, `shift()`, `removeAt(index)`, `remove(vm)`, `clear()`, `swap(i1, i2)`, `addListener(cb)`, `removeListener(cb)` | Mutable list of ViewModel items |
| `PropertyEnum` | `values() -> EnumValues` | Enum-valued property |
| `EnumValues` | `__len() -> number` | Count of available enum values (`#values`) |
| `TransitionCondition` | `init(self, context) -> boolean`, `evaluate(self) -> boolean` | Contract for [Transition Condition Scripts](./protocol-transition-condition-scripts.md) |
| `ListenerAction` | `init(self, context) -> boolean`, `perform(self, pointerEvent)` (deprecated, prefer `performAction`), `performAction(self, listenerContext: ListenerContext)` | Contract for [Listener Action Scripts](./protocol-listener-action-scripts.md) |
| `Interpolator` | `init(self, context) -> boolean`, `transform(self, value: number) -> number`, `transformValue(self, from, to, value) -> number` | Custom easing/interpolation curve |
| `Output<T>` | — | Typed output value (coming soon) |
| `AudioSound` | `volume`, `play()`, `pause()`, `resume()`, `stop(fadeToStopTime?)`, `seek(seconds)`, `seekFrame(frame)`, `time()`, `timeFrame()`, `completed() -> boolean` | Playback control handle returned by an audio play call |
| `AudioSource` | `duration` (coming soon) | Audio asset handle from `context:audio(name)`, used with the global Audio API |
| `Blob` | `size`, `name`, `data: buffer` | Raw binary asset from `context:blob(name)`; read via Luau `buffer` library |
| `DataContext` | `parent() -> DataContext?`, `viewModel() -> ViewModel?` | Hierarchical data-context navigation, from `context:dataContext()` |

## Related

- [interface-view-model.md](./interface-view-model.md)
- [property.md](./property.md)
- [protocol-listener-action-scripts.md](./protocol-listener-action-scripts.md)
- [protocol-transition-condition-scripts.md](./protocol-transition-condition-scripts.md)
