# Controlling Data

Overview of the ways data can be updated: from within a Rive file (editor-driven) and from application code (runtime-driven).

## Options / Props

| Source | Mechanism |
| --- | --- |
| State machine actions | Change property values during transitions or state changes |
| Listener actions | Update data in response to user interactions |
| Scripting | Custom logic to read and modify data |
| Target-to-source binding | Elements update data via their bound property values |
| Property groups | Animate a value with data binding via a keyed local group |
| Application code | Runtime updates for scores, profile info, dynamic content, or state triggers |

## Notes

- Runtime implementation details are platform-specific; see the Runtime Data Binding Overview for the target platform's API.

## Related

- [Data Binding](./data-binding.md)
- [Binding Data](./data-binding-binding-data.md)
- [Property Groups](./data-binding-property-groups.md)
