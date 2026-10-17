# Artboard Event Types

Event payload types delivered to [Artboard](./artboard-artboard.md) interaction handlers and [ListenerContext](./artboard-listener-context.md) accessors: pointer, scroll, keyboard, focus, gamepad, view-model-change, reported, and none. Several of these are marked "Coming soon" in the official docs (fields listed reflect the current draft API).

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
| `PointerEvent` | `position: Vector`, `id: number`, `type: PointerType`, `previousPosition: Vector` (previous position in local coordinates; node pointer handlers read the origin), `timeStamp: number` (seconds); `new(id, position)`; `hit(isTranslucent?: boolean)` | See [pointer-events.md](./pointer-events.md). `hit()` is opaque; `hit(true)` is translucent. Call it on every event a script owns (press, each drag move, release) or an enclosing target such as a `ScrollConstraint` viewport claims the gesture |
| `ScrollEvent` | `id: number`, `position: Vector` (local), `delta: Vector` (how far content should travel, following the content as a `ScrollConstraint` does, so revealing content further down reads as negative `y`), `phase: ScrollPhase`, `precise: boolean` (true for pixel-precise sources like a trackpad, false for a detented mouse wheel), `timeStamp: number` (seconds); `new(id, position, delta, phase?, precise?, timeStamp?)`; `hit()` | Mouse wheel or trackpad scroll delivered to `pointerScroll`; direct touch arrives as pointer events. `new` defaults phase to `update` and precise to false. `hit()` claims the scroll (otherwise it passes to whatever lies behind, such as a `ScrollConstraint` view); a claimed trackpad gesture stays with this node until it ends |
| `ScrollPhase` (enum) | `begin` (trackpad gesture started), `update` (gesture moved or wheel turned; the only phase a mouse wheel reports), `end` (fingers lifted; hosts that send their own momentum never report it), `momentum` (platform-generated travel after fingers lifted), `inertiaCancel` (fingers landed during momentum to stop it; carries no delta) | Used by `ScrollEvent.phase` |
| `PointerType` (enum) | `pointerEnter`, `pointerExit`, `pointerDown`, `pointerUp`, `pointerMove`, `click`, `pointerDrag`, `unknown` | Used by `PointerEvent.type` |
| `KeyboardEvent` | `key`, `shift: boolean`, `control: boolean`, `alt: boolean`, `meta: boolean`, `phase: KeyPhase` | Coming soon |
| `KeyPhase` (enum) | `'down'`, `'repeat'`, `'up'` | Phase of a keyboard interaction |
| `FocusEvent` | `isFocus: boolean` (true = gained focus, false = lost focus) | Coming soon |
| `NoneEvent` | — | Unknown/unsupported event; coming soon |
| `ReportedEvent` | `delaySeconds: number` (how long ago the event fired: time from its keyframe to where the reporting animation's advance ended; 0 for an event fired by a state or listener) | A reported Rive event, e.g. `context:asReportedEvent()` |
| `ViewModelChange` | — | A view model change event; coming soon |
| `GamepadEvent` | `changeKind: 'button'\|'axis'`, `changeIndex` (1-based W3C index), `changeValue`, `hasStandardButtonIntent`, `hasStandardAxisIntent`, `intentButton`, `intentAxis`, plus read-only full post-change device state (same fields as `GamepadConnected`: `deviceId`, `buttonMask`, `buttons`, `axes`, `isStandardMapping`, `mapping`, `gamepadMapping`, `west`/`south`/`north`/`east`, `leftShoulder`, `rightShoulder`, `back`, `forward`, `leftStickButton`, `rightStickButton`, `dpadUp`/`dpadDown`/`dpadLeft`/`dpadRight`, `start`, `leftStick`, `rightStick`, `leftTrigger`, `rightTrigger`, `leftTriggerPressed`, `rightTriggerPressed`); `buttonPressed(index)`, `buttonValue(index)`, `axis(index)` | Single field change on an already-connected gamepad |
| `GamepadConnected` | `deviceId`, `buttonMask` (bit i set when W3C standard button i is pressed), `buttons[]` (analog 0-1, 1-based), `axes` (1-based; at least six on standard layout), `isStandardMapping`, `mapping: 'standard'\|'unknown'`, `gamepadMapping` (0 = standard, 1 = unknown), face buttons `west`/`south`/`north`/`east`, `leftShoulder`, `rightShoulder`, `back`/`forward` (select/start), `leftStickButton`, `rightStickButton`, `dpadUp`/`dpadDown`/`dpadLeft`/`dpadRight`, `start`, `leftStick`/`rightStick` (axes 0-3 when standard), `leftTrigger`/`rightTrigger` (axes 4-5), `leftTriggerPressed`/`rightTriggerPressed` (digital, indices 6-7); `buttonPressed(index)`, `buttonValue(index)`, `axis(index)` (1-based) | Full state on first device detection; W3C Standard Gamepad layout when `mapping == 'standard'`; named buttons are false for non-standard mappings |
| `GamepadDisconnected` | `deviceId` | Fired when a gamepad is removed |
| `GamepadMappingKind` (enum) | `'standard'`, `'unknown'` | Raw mapping kind of a connected gamepad |

## Related

- [artboard-listener-context.md](./artboard-listener-context.md)
- [pointer-events.md](./pointer-events.md)
- [artboard-artboard.md](./artboard-artboard.md)
