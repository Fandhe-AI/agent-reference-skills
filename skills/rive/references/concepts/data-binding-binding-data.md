# Binding Data

How to connect a View Model property to a specific element/field in the Rive editor, including bind direction and precision options.

## Signature / Usage

Editor workflow (no runtime code):

1. Select an element (e.g., a circle)
2. Right-click the target field (e.g., `X` position)
3. Select **Data Bind**
4. Choose the desired property from the dropdown

A bound field highlights green; a yellow border indicates a type mismatch.

## Options / Props

| Option | Description |
| --- | --- |
| Property | Which View Model property controls the target element |
| Path | Selects which specific nested property instance to use when binding to nested View Models with duplicate names |
| Bind Direction: Source to Target (default) | The property controls the element |
| Bind Direction: Target to Source | Element changes update the property value |
| Bind Direction: Bidirectional | Both directions active; toggle to prefer target or source value on conflict |
| Bind Once | Binding applies only once at scene start or binding creation; subsequent changes ignored |
| Absolute binding | Points to a specific property instance within the View Model hierarchy |
| Relative binding | Searches for a property with a matching name relative to current context |

## Notes

- Enable the Data Binding Preview Toggle to preview data-bound values in the editor without playing the state machine.
- Right-click a bound element and select **Update Bind** to change its binding, or **Unbind** to remove it.
- Data binding extends beyond visual properties to transforms, animation speeds, converter values, script inputs, and transition conditions.

## Related

- [Data Binding](./data-binding.md)
- [View Models](./view-models.md)
- [Controlling Data](./data-binding-controlling-data.md)
- [Property Types](./data-binding-property-types.md)
