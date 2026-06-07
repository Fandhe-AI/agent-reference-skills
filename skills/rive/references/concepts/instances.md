# Instances

ViewModel Instances are the concrete data containers created from a ViewModel blueprint. Each instance holds its own independent set of property values and can be bound to an artboard or component.

## Signature / Usage

```typescript
// Three factory methods on a ViewModel
const vm = riveInstance.viewModel("Player");

const blank    = vm.instance();                  // all properties at type defaults
const fallback = vm.defaultInstance();           // the instance marked default in the editor
const byName   = vm.instanceByName("Player 1"); // lookup by name set in editor
```

## Notes

- Multiple instances can exist for the same ViewModel simultaneously, each with independent values.
- The active instance on a Rive object is accessible via `riveInstance.viewModelInstance`.
- Instances can be swapped at runtime to change the data set driving an artboard.
- To manage instances in the editor: select a ViewModel → click the Controls icon → use `+` / `-` to add or remove, double-click to rename, click an instance to edit its property values.
- Instances marked as "exported" are bundled inside the `.riv` file; unmark to reduce file size when the instance is only needed during design.

## Related

- [View Models](./view-models.md)
- [Data Binding](./data-binding.md)
- [Properties](./properties.md)
