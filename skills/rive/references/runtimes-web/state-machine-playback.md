# State Machine Playback

Control state machine playback and interact with inputs (booleans, numbers, triggers) from JavaScript.

## Signature / Usage

```ts
import { Rive, StateMachineInputType } from "@rive-app/webgl2";

const r = new Rive({
  src: "interactive.riv",
  canvas: document.getElementById("canvas") as HTMLCanvasElement,
  autoplay: true,
  stateMachines: "MainMachine",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();

    const inputs = r.stateMachineInputs("MainMachine");
    const boolInput  = inputs.find((i) => i.name === "isHovered");
    const numInput   = inputs.find((i) => i.name === "progress");
    const trigInput  = inputs.find((i) => i.name === "clicked");

    // Boolean
    boolInput.value = true;
    // Number
    numInput.value = 0.75;
    // Trigger
    trigInput.fire();
  },
  onStateChange: (event) => {
    console.log("current state(s):", event.data);
  },
});
```

## Options / Props

### Playback methods

| Method | Description |
|--------|-------------|
| `r.play(name?)` | Resume or start the state machine from its current position |
| `r.pause(name?)` | Halt advancement; preserve current frame |
| `r.stop(name?)` | Stop and reset to the entry state |
| `r.reset(params?)` | Dispose and recreate instances (optionally change artboard/state machine) |

### `stateMachineInputs(name: string): StateMachineInput[]`

Returns an array of input objects for the named state machine.

### StateMachineInput

| Member | Type | Description |
|--------|------|-------------|
| `name` | `string` | Input name as set in the Rive editor |
| `type` | `StateMachineInputType` | `Number` (56), `Trigger` (58), or `Boolean` (59) |
| `value` | `boolean \| number` | Read/write for boolean and number inputs |
| `fire()` | `() => void` | Fire a trigger input (sets it true for one frame) |

### StateMachineInputType enum

| Constant | Value | Description |
|----------|-------|-------------|
| `StateMachineInputType.Number` | `56` | Floating-point number |
| `StateMachineInputType.Trigger` | `58` | One-shot trigger |
| `StateMachineInputType.Boolean` | `59` | Boolean flag |

### onStateChange callback

Fires whenever the state machine transitions to a new state.

```ts
onStateChange: (event: { data: string[] }) => void
```

`event.data` contains the name(s) of the current active state(s).

## Notes

- The `stateMachineInputs()` approach is the legacy way of controlling state machines; for new projects, prefer [Data Binding](./data-binding.md).
- State machines may "settle" (stop advancing) when no further state changes will occur — this is a performance optimization.
- Multiple state machine names can be passed to the constructor: `stateMachines: ["Machine1", "Machine2"]`.

## Related

- [rive-constructor.md](./rive-constructor.md)
- [rive-methods.md](./rive-methods.md)
- [data-binding.md](./data-binding.md)
- [events.md](./events.md)
