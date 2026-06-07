# Data Binding

The system that connects data stored in ViewModels to properties in a Rive scene. When data changes, the scene updates automatically; changes in the scene can optionally write back to the data source.

## Signature / Usage

Data binding is configured in the editor and consumed at runtime via the ViewModel instance API.

```typescript
// Runtime: get ViewModel instance and read/write properties
const vmi = riveInstance.viewModelInstance;

// Number
const hp = vmi.number("health");
hp.value = 80;

// String
const label = vmi.string("playerName");
label.value = "Ada";

// Boolean
const active = vmi.boolean("isActive");
active.value = true;

// Trigger
const hit = vmi.trigger("onHit");
hit.trigger();

// Observe changes driven by the state machine
hp.on((event) => console.log("health changed:", event.data));
```

## Options / Props

| Bind Direction | Description |
| --- | --- |
| Source to Target (default) | ViewModel property drives the scene element |
| Target to Source | Scene element changes push back to the ViewModel property |
| Bidirectional | Both directions active simultaneously |
| Bind Once | Value applied once at startup; subsequent changes ignored |

## Notes

- Binding is established in the editor: right-click a property → "Data Bind" → select ViewModel property. A green highlight indicates a valid binding; yellow indicates a type mismatch.
- Binding decouples data from scene hierarchy: reorganizing elements or renaming properties in the editor does not require runtime code changes.
- Data can be updated from the editor, runtime code, state machines, or scripting.
- The `Path` binding option selects which specific nested ViewModel instance binds when ViewModels are hierarchically composed.
- Property observers (`.on()`) fire after state machine advances apply the change, not immediately on assignment.

## Related

- [View Models](./view-models.md)
- [Instances](./instances.md)
- [Properties](./properties.md)
- [Converters](./converters.md)
- [Enums](./enums.md)
