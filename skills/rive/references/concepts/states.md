# States

Nodes in the State Machine graph that represent distinct animation conditions. Each state holds a timeline animation (or blend of animations) that plays while the state is active.

## Signature / Usage

States appear as nodes on the State Machine graph. They are connected by transitions and activated according to input conditions.

```text
State Machine Layer
├── Entry State         (auto-included)
├── Exit State          (auto-included)
├── Any State           (auto-included)
└── [User States]
    ├── Single Animation State
    ├── 1D Blend State
    └── Additive Blend State
```

## Options / Props

| Type | Description |
| --- | --- |
| Entry State | The starting point of a layer; the animation attached here plays first |
| Exit State | Stops the layer; useful when coordinating multiple layers |
| Any State | Connected states can be reached from any current state regardless of normal transition logic |
| Single Animation State | Plays one timeline; can be one-shot, looping, or ping-pong |
| 1D Blend State | Blends two or more timelines using a single Number input; animations ramp additively as the value changes |
| Additive Blend State | Blends multiple timelines using multiple Number inputs; useful for complex outcomes like facial expressions |

## Notes

- State properties include: animation selection, playback speed (positive = forward, negative = reverse), and transitions.
- Actions can be triggered at the start or end of a state (e.g., set a property, fire an event).
- 1D Blend States are commonly used for things like health bars and loading indicators.
- Additive Blend States support "by value" (baseline, uncontrolled) and "by property" (controlled via Number inputs) blending modes.

## Related

- [State Machine](./state-machine.md)
- [Transitions](./transitions.md)
- [Inputs](./inputs.md)
