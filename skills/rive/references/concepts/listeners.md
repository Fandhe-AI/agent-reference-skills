# Listeners

State Machine components that respond to user interactions (pointer events) or internal changes (ViewModel property changes, component events) and translate them into actions — updating data, firing events, or repositioning objects — without requiring runtime code.

## Signature / Usage

A listener is configured entirely in the editor. Each listener has three parts: a Target, a Condition, and one or more Actions.

```text
Listener
├── Target       — shape/group acting as a hit area, or an Artboard/Component
├── Condition    — what triggers the listener
└── Action(s)   — what happens when triggered
```

## Options / Props

### Target

| Option | Description |
| --- | --- |
| Shape / Group | Functions as a hitbox for pointer events |
| Artboard / Component | Used for listening to forwarded events from nested components |

### Condition

| Condition | Description |
| --- | --- |
| Pointer Down | Fires when pointer is pressed on target |
| Pointer Up | Fires when pointer is released on target |
| Pointer Enter | Fires when pointer enters target bounds |
| Pointer Exit | Fires when pointer leaves target bounds |
| Pointer Move | Fires on every pointer movement over target |
| Click | Fires on a full click (down + up) on target |
| Listen for Event | Fires when a specified event is received from an Artboard/Component target |
| View Model Property Change | Fires when a selected ViewModel property changes value |

### Action

| Action | Description |
| --- | --- |
| View Model Change | Sets a ViewModel property to a specific value or to the value of another property |
| Report Event | Fires a named Rive event |
| Align Target | Moves an object to follow the pointer; preserves original offset if configured |

## Notes

- **Opaque Target**: When disabled, pointer events pass through the hit area and can trigger multiple overlapping listeners simultaneously.
- Converters can be applied to "View Model Change" actions when mapping one property to another (e.g., incrementing a number).
- Listeners enable fully designer-authored interactivity without any runtime code for common pointer interactions.

## Related

- [State Machine](./state-machine.md)
- [Inputs](./inputs.md)
- [Data Binding](./data-binding.md)
- [Events](./events.md)
