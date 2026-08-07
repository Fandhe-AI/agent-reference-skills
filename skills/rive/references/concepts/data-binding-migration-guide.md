# Data Binding Migration Guide

Guidance for migrating from State Machine Inputs and runtime Event listeners to Data Binding, and choosing between Constraints and Data Binding.

## Options / Props

| Feature | Inputs | Events | View Model Properties |
| --- | --- | --- | --- |
| Floating point numbers | Yes | Yes | Yes |
| Booleans | Yes | Yes | Yes |
| Triggers | Yes | No | Yes |
| Strings | No | Yes | Yes |
| Enumerations (Enums) | No | No | Yes |
| Colors | No | No | Yes |
| View Model Nesting | No | No | Yes |
| Lists | No | No | Yes |
| Images | No | No | Yes |
| Artboards | No | No | Yes |

## Notes

- Existing files do not need to be updated: Inputs and Events continue to work as before. Data binding is recommended for new work and future updates.
- To migrate State Machine Inputs: open the hamburger menu, select **Convert Inputs to View Models**, then update runtime code to set values on the View Model instead of inputs.
- Inputs only drive state machine transitions; View Model properties can also be transformed with Converters, shared across multiple parts of a file, and drive more than transitions.
- To migrate Events: create a View Model property, update it from the Rive file (animation, listener, or script), and subscribe to that property at runtime instead of listening for a fired event.
- To migrate text runs updated directly by name/hierarchy at runtime: bind a `String` property to the text run and update the value through the View Model instead.
- Constraints remain the best choice for purely visual/spatial object-to-object relationships defined only in the editor; use Data Binding when the value must come from runtime code, multiple elements depend on the same value, or transformation logic (Converters) is needed.

## Related

- [Data Binding](./data-binding.md)
- [Converters](./converters.md)
- [Inputs](./inputs.md)
- [Events](./events.md)
