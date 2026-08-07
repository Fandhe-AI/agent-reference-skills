# Artboard Event Types

Event payload types delivered to [Artboard](./artboard-artboard.md) interaction handlers and [ListenerContext](./artboard-listener-context.md) accessors: pointer, keyboard, focus, gamepad, view-model-change, reported, and none. Several of these are marked "Coming soon" in the official docs (fields listed reflect the current draft API).

## Signature / Usage

```lua
function pointerDown(self: MyNode, event: PointerEvent)
  print(event.position.x, event.id, event.type)
  event:hit() -- event:hit(true) to allow translucent pass-through
end

function handleKey(self: MyNode, event: KeyboardEvent)
  if event.phase == 'down' and not event.shift then
    -- ...
  end
end
```

## Options / Props

| Type | Fields / Methods | Notes |
| --- | --- | --- |
| `PointerEvent` | `position: Vector`, `id: number`, `type: PointerType`; `new(id, position)`; `hit(isTranslucent?: boolean)` | See [pointer-events.md](./pointer-events.md) |
| `PointerType` (enum) | `pointerEnter`, `pointerExit`, `pointerDown`, `pointerUp`, `pointerMove`, `click`, `pointerDrag`, `unknown` | Used by `PointerEvent.type` |
| `KeyboardEvent` | `key`, `shift: boolean`, `control: boolean`, `alt: boolean`, `meta: boolean`, `phase: KeyPhase` | Coming soon |
| `KeyPhase` (enum) | `'down'`, `'repeat'`, `'up'` | Phase of a keyboard interaction |
| `FocusEvent` | `isFocus: boolean` (true = gained focus, false = lost focus) | Coming soon |
| `NoneEvent` | — | Unknown/unsupported event; coming soon |
| `ReportedEvent` | — | A reported Rive event; coming soon |
| `ViewModelChange` | — | A view model change event; coming soon |
| `GamepadEvent` | `changeKind: 'button'\|'axis'`, `changeIndex`, `changeValue`, `hasStandardButtonIntent`, `hasStandardAxisIntent`, `intentButton`, `intentAxis`, plus full post-change device state; `buttonPressed(index)`, `buttonValue(index)`, `axis(index)` | Single field change on an already-connected gamepad |
| `GamepadConnected` | `deviceId`, `buttonMask`, `buttons[]`, axes (≥6), `mapping: GamepadMappingKind`, `gamepadMapping`, named buttons (`west`/`south`/`north`/`east`/shoulders/D-pad/sticks), `leftStick`/`rightStick`/`leftTrigger`/`rightTrigger`; `buttonPressed(index)`, `buttonValue(index)`, `axis(index)` | Full state on first device detection; W3C Standard Gamepad layout when `mapping == 'standard'` |
| `GamepadDisconnected` | `deviceId` | Fired when a gamepad is removed |
| `GamepadMappingKind` (enum) | `'standard'`, `'unknown'` | Raw mapping kind of a connected gamepad |

## Related

- [artboard-listener-context.md](./artboard-listener-context.md)
- [pointer-events.md](./pointer-events.md)
- [artboard-artboard.md](./artboard-artboard.md)
