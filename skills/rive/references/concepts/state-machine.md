# State Machine

A visual framework for connecting animations and defining interactive transition logic within a Rive artboard. Every artboard includes one default state machine; additional state machines can be created as needed.

## Signature / Usage

The State Machine replaces the timeline when selected in the editor. It consists of a **graph** workspace where states and transitions are arranged to define how animations flow in response to inputs and events.

```text
Artboard
└── State Machine
    ├── Layers (one or more)
    │   ├── Entry State  → (transition) → Animation State
    │   ├── Animation State(s)
    │   ├── Any State
    │   └── Exit State
    ├── Inputs (Boolean / Number / Trigger)
    └── Listeners
```

## Options / Props

| Component | Description |
| --- | --- |
| Entry State | Starting point of a state machine layer; first state played on load |
| Exit State | Signals the layer to stop playing; useful with multiple layers |
| Any State | Transitions connected to it can activate from any current state |
| Animation States | Single, 1D Blend, or Additive Blend states containing timeline animations |
| Inputs | Named values (Boolean, Number, Trigger) that drive transition conditions |
| Layers | Independent parallel animation tracks within one state machine |
| Listeners | Pointer/event handlers that update inputs or fire events at runtime |

## Notes

- Each state machine layer plays one animation at a time.
- Multiple layers can run concurrently to blend animations; rightmost layer takes priority when properties conflict.
- State machines are the recommended mechanism for interactivity — direct animation playback control at runtime is deprecated in favor of state machines driven by Data Binding.

## Related

- [States](./states.md)
- [Transitions](./transitions.md)
- [Layers](./layers.md)
- [Inputs](./inputs.md)
- [Listeners](./listeners.md)
