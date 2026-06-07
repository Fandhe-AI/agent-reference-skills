# Properties

Individual data fields within a ViewModel. Each property has a name, a type, and a value. Properties are bound to scene elements in the editor and read/written at runtime through the ViewModel Instance API.

## Signature / Usage

```typescript
const vmi = riveInstance.viewModelInstance;

// Number
const score = vmi.number("score");
score.value = 42;

// String
const name = vmi.string("userName");
name.value = "Ada";

// Boolean
const visible = vmi.boolean("isVisible");
visible.value = false;

// Color (RGBA hex string or numeric encoding depending on runtime)
const tint = vmi.color("primaryColor");

// Enum
const mode = vmi.enum("gameMode");
mode.value = "hard";

// Observe a property change (fires after state machine advance)
score.on((event) => console.log(event.data));
score.off(); // remove all observers
```

## Options / Props

| Type | Bound to editor elements | Notes |
| --- | --- | --- |
| Number | Numeric properties (position, opacity, speed, …) | Used in 1D Blend conditions and transition conditions |
| String | Text content, asset paths | |
| Boolean | Visibility toggles, binary flags | |
| Color | Fill color, stroke color (RGBA) | |
| Enum | Solo selection, mode variants | Requires system or custom enum definition |
| List | Repeating components (inventory items, players, …) | Contains nested ViewModel instances |

## Notes

- Properties are created in the Data panel; add via "Add View Model Property" and choose the type.
- Property names are strings and must match exactly in runtime code.
- A property can be bound in multiple directions: Source→Target (ViewModel drives scene), Target→Source (scene drives ViewModel), or Bidirectional.
- The "Bind Once" flag applies the value only at startup and ignores subsequent changes — useful for static initialization.
- Observers (`.on()`) fire **after** state machine advances propagate changes, not immediately on `.value` assignment.

## Related

- [View Models](./view-models.md)
- [Data Binding](./data-binding.md)
- [Converters](./converters.md)
- [Enums](./enums.md)
