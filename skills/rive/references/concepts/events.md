# Events

Signals emitted from within a Rive artboard to notify the runtime that something has happened. Events originate from timelines, states, transitions, or listeners and are consumed via runtime callbacks or ViewModel property observers.

## Signature / Usage

```typescript
// Playback lifecycle callbacks (provided in Rive constructor)
const r = new Rive({
  src: "animation.riv",
  onPlay:        (event) => console.log("playing:", event.data),   // string[]
  onPause:       (event) => console.log("paused:",  event.data),   // string[]
  onStop:        (event) => console.log("stopped:", event.data),   // string[]
  onLoop:        (event) => console.log("looped:",  event.data),   // LoopEvent
  onStateChange: (event) => console.log("state:",   event.data),   // string[]
});

// Alternative: subscribe after construction
r.on(EventType.StateChange, (event) => {
  console.log("new state(s):", event.data); // string[] of state names
});

// Rive custom events (Report Event) via ViewModel property observers
const prop = vmi.boolean("wasTriggered");
prop.on((event) => console.log("custom event data:", event.data));
```

## Options / Props

### Playback Lifecycle Callbacks

| Callback | `event.data` Type | Description |
| --- | --- | --- |
| `onPlay` | `string[]` | Fires when one or more animations/state machines start playing; data is their names |
| `onPause` | `string[]` | Fires when one or more animations/state machines pause |
| `onStop` | `string[]` | Fires when one or more animations/state machines stop |
| `onLoop` | `LoopEvent` | Fires each time an animation completes a loop cycle; `LoopEvent` has `animation: string` and `type: LoopType` |
| `onStateChange` | `string[]` | Fires when the active state changes in a state machine layer; data is the new state name(s) |

### Rive Event Types (editor-defined)

| Type | Description |
| --- | --- |
| Open URL Event | Launches a URL in the browser at runtime |
| Audio Event | Triggers audio playback |
| General Event | Deprecated; previously used for custom runtime communication |

### Signaling Events (editor)

| Source | Method |
| --- | --- |
| Timeline | Use "Report Event" in the Inspector to fire at a specific frame |
| State | Click `+` next to Events in the state; choose start or end |
| Transition | Click `+` next to Events in the transition; choose start or end |
| Listener | Click `+` below the State Machine graph → "Report Event" |

## Notes

- `onStateChange` delivers the **string name(s)** of the newly active states; use these to react to state machine transitions in application logic.
- Custom events (Report Event) fired from Rive are now consumed via ViewModel property observers (`.on()`) rather than a dedicated event API, because the general "Rive Events" system is deprecated in favor of Data Binding.
- `onLoop` `LoopType` values: `OneShot`, `Loop`, `PingPong`.
- All callbacks can also be registered/deregistered dynamically using `riveInstance.on(EventType, callback)` and `riveInstance.off(EventType, callback)`.

## Related

- [State Machine](./state-machine.md)
- [Listeners](./listeners.md)
- [Data Binding](./data-binding.md)
