# Property Groups

Local, artboard-level values that can be keyed on a timeline, animated, and bound to View Model properties — bridging global/shared View Model data with local timelines and state machines.

## Signature / Usage

1. Select the Property Group tool and click the stage to add a group to the artboard
2. Select the group, click `+` in the right sidebar, and choose a property type
3. Key the property's value on the timeline (creates keyframes)
4. Right-click the property, bind it to a View Model property, and set direction to Target → Source so the keyed value drives the View Model property

## Notes

- View Model properties cannot be keyed directly in the timeline (they are global/shared); Property Groups provide a local, keyable proxy that binds to them.
- One View Model property cannot directly control another (this would create hidden dependencies/update loops). Instead, use a Property Group with a Converter (e.g., a Formula converter) that reads one View Model property and, via Target → Source binding, sets another.

## Related

- [Data Binding](./data-binding.md)
- [Converters](./converters.md)
- [Property Types](./data-binding-property-types.md)
