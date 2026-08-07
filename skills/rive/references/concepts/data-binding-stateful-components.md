# Stateful Components

Expose specific View Model properties directly on a nested Component so each nested instance can have its own values, without requiring a separate View Model instance per instance.

## Signature / Usage

1. Create or open the artboard; add a View Model with property bindings to relevant elements
2. Mark the artboard as a Component (`Shift + N`)
3. In the Properties section, click `+` to add exposed properties
4. Set each exposed property as **Input** (settable per nested instance) or **Output** (read-only, reports to parent)
5. When nesting, switch the component to stateful mode in the inspector; this replaces the View Model instance selector with the exposed properties for direct override

## Options / Props

| Property Direction | Description |
| --- | --- |
| Input | Settable independently on each nested component instance |
| Output | Read-only; reports its value outward to the parent (shown with a lock icon) |

## Notes

- Stateful components can nest other stateful components; a parent can override a nested component's properties by data binding them to its own View Model.
- To read an Output property in the parent, bind a parent View Model property to the component's output property.
- Input properties can be keyed on a timeline.

## Related

- [Data Binding](./data-binding.md)
- [View Models](./view-models.md)
- [Property Types](./data-binding-property-types.md)
