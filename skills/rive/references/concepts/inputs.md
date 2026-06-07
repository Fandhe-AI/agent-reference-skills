# Inputs

Named values attached to a State Machine that drive transition conditions and blend parameters. Inputs are the primary mechanism for controlling a state machine from runtime code or listeners.

## Signature / Usage

Inputs are defined in the State Machine panel and referenced by name in transition conditions. At runtime they are accessed via the `stateMachineInputs()` API (legacy) or Data Binding (recommended).

```typescript
// Legacy API (deprecated — prefer Data Binding)
const inputs = riveInstance.stateMachineInputs("State Machine 1");
const hover   = inputs.find(i => i.name === "isHovered");  // Boolean
const speed   = inputs.find(i => i.name === "speed");       // Number
const clicked = inputs.find(i => i.name === "onClick");     // Trigger

hover.value = true;    // set boolean
speed.value = 0.8;     // set number
clicked.fire();        // fire trigger
```

## Options / Props

| Type | `value` | Description |
| --- | --- | --- |
| Boolean | `true` / `false` | Binary flag; transitions conditioned on true/false equality |
| Number | `number` | Numeric value; transitions conditioned on =, >, < comparisons; also used to drive 1D Blend States |
| Trigger | — | Momentary signal; set to `true` for one frame then auto-resets; use `.fire()` to activate |

## Notes

- Inputs are referenced by **name** (string); names must match exactly between editor and runtime code.
- The `StateMachineInput` object exposes: `.name` (string), `.value` (number | boolean, read/write), `.type` (StateMachineInputType enum), `.fire()` (trigger only).
- **Direct input mutation is deprecated** as of the Data Binding era. The recommended approach is to bind inputs to ViewModel properties and update the ViewModel at runtime instead.
- Triggers automatically reset after one state machine advance frame; they do not need to be manually reset to false.

## Related

- [State Machine](./state-machine.md)
- [Transitions](./transitions.md)
- [Data Binding](./data-binding.md)
