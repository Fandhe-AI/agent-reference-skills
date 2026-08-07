# ListenerContext

Provides access to the event context that triggered a state-machine [Listener Action](./protocol-listener-action-scripts.md). Supports pointer, keyboard, text-input, focus, view-model-change, gamepad, and reported events via type-guard + accessor pairs.

## Signature / Usage

```lua
function perform(self: MyListenerAction, ctx: ListenerContext)
  if ctx:isPointerEvent() then
    local event = ctx:asPointerEvent()
    print(event.position.x, event.position.y)
  end
end
```

## Options / Props

| Guard | Accessor | Returns |
| --- | --- | --- |
| `isPointerEvent()` | `asPointerEvent()` | `PointerEvent?` |
| `isKeyboardEvent()` | `asKeyboardEvent()` | `KeyboardEvent?` |
| `isTextInput()` | `asTextInput()` | `TextInput?` |
| `isFocus()` | `asFocus()` | `FocusEvent?` |
| `isReportedEvent()` | `asReportedEvent()` | `ReportedEvent?` |
| `isViewModelChange()` | `asViewModelChange()` | `ViewModelChange?` |
| `isGamepadConnected()` | `asGamepadConnected()` | `GamepadConnected?` |
| `isGamepadEvent()` | `asGamepadEvent()` | `GamepadEvent?` |
| `isGamepadDisconnected()` | `asGamepadDisconnected()` | `GamepadDisconnected?` |
| `isNone()` | `asNone()` | `NoneEvent?` |

## Related

- [protocol-listener-action-scripts.md](./protocol-listener-action-scripts.md)
- [artboard-events.md](./artboard-events.md)
