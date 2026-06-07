# Events

Subscribe to Rive runtime lifecycle events and Rive-defined custom events from animations and state machines.

## Signature / Usage

```ts
import { Rive, EventType, RiveEventType } from "@rive-app/webgl2";

const r = new Rive({
  src: "scene.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  stateMachines: "Main",
});

// Subscribe to Rive events fired from the animation
r.on(EventType.RiveEvent, (event) => {
  const riveEvent = event.data;

  if (riveEvent.type === RiveEventType.OpenUrl) {
    // Handle URL event manually
    const anchor = document.createElement("a");
    anchor.href = riveEvent.properties.url;
    anchor.target = riveEvent.properties.target ?? "_blank";
    if (anchor.href) anchor.click();
  }

  if (riveEvent.type === RiveEventType.General) {
    console.log("General event:", riveEvent.name, riveEvent.properties);
  }
});

// Subscribe to lifecycle events
r.on(EventType.StateChange, (event) => {
  console.log("state changed to:", event.data);
});

// Unsubscribe
r.off(EventType.RiveEvent, myCallback);
```

## Options / Props

### `on` / `off`

```ts
r.on(type: EventType, callback: (event: Event) => void): void
r.off(type: EventType, callback: (event: Event) => void): void
```

### EventType enum

| Value | Fires when |
|-------|-----------|
| `EventType.Load` | `.riv` file finished loading |
| `EventType.LoadError` | File load failed |
| `EventType.Play` | Playback started or resumed |
| `EventType.Pause` | Playback paused |
| `EventType.Stop` | Playback stopped |
| `EventType.Loop` | Timeline animation completed a loop |
| `EventType.StateChange` | State machine transitioned to a new state |
| `EventType.RiveEvent` | A Rive-defined event fired from animation/state machine |
| `EventType.Advance` | Artboard advanced (fires every frame) |

### RiveEventType enum (for `EventType.RiveEvent` payloads)

| Value | Description |
|-------|-------------|
| `RiveEventType.General` | Custom general event with arbitrary properties |
| `RiveEventType.OpenUrl` | URL navigation event |

### Event payload shape for `EventType.RiveEvent`

```ts
{
  data: {
    name: string;           // event name from the editor
    type: RiveEventType;    // General or OpenUrl
    properties: Record<string, unknown>;  // custom key/value pairs
    // OpenUrl-specific:
    properties.url?: string;
    properties.target?: string;  // e.g. "_blank"
  }
}
```

### Lifecycle event payload

```ts
// StateChange
{ data: string[] }   // active state name(s)

// Play / Pause / Stop / Loop
{ data: string }     // animation or state machine name
```

### Constructor callback shortcuts

The following constructor parameters are shorthand for `on()` calls:

| Parameter | Equivalent |
|-----------|-----------|
| `onLoad` | `EventType.Load` |
| `onLoadError` | `EventType.LoadError` |
| `onPlay` | `EventType.Play` |
| `onPause` | `EventType.Pause` |
| `onStop` | `EventType.Stop` |
| `onLoop` | `EventType.Loop` |
| `onStateChange` | `EventType.StateChange` |
| `onAdvance` | `EventType.Advance` |

## Notes

- `EventType.RiveEvent` replaces the deprecated general Rive Events system; prefer Data Binding for state communication in new projects.
- `OpenUrl` events do **not** navigate automatically; you must implement the navigation logic in the callback.
- Setting `automaticallyHandleEvents: true` in the constructor makes the runtime open URLs for `OpenUrl` events without a manual callback.
- General (deprecated) events still fire via `EventType.RiveEvent` with `type === RiveEventType.General`.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [rive-methods.md](./rive-methods.md)
- [state-machine-playback.md](./state-machine-playback.md)
- [data-binding.md](./data-binding.md)
