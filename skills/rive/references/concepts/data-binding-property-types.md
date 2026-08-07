# View Model Property Types

A View Model property is a single named, typed data field within a View Model (comparable to a field in object-oriented programming), addressable from code and bindable to matching-type editor elements or state machine conditions.

## Signature / Usage

In the Data panel, select **Add View Model Property** next to a View Model name, then choose a property type.

## Options / Props

| Type | Purpose |
| --- | --- |
| Number | Numeric values |
| String | Text content |
| Boolean | True/false values |
| Color | RGBA color values |
| Trigger | Fire-and-forget, one-time events (e.g., button presses) |
| Enum | Selection from a fixed set of predefined options |
| Image | Image asset reference; affects a single instance only |
| Artboard | Artboard reference for runtime swapping; the artboard must first be converted to a Component |
| View Model | Nested View Model instance, for hierarchical data structures |
| List | Collection of View Model instances, for repeating content |

## Notes

- Image properties affect only a single instance, unlike other property types which can be shared across instances.
- Artboard properties enable dynamic artboard swapping at runtime from the current file or external `.riv` files.

## Related

- [View Models](./view-models.md)
- [Properties](./properties.md)
- [Enums](./enums.md)
- [Lists](./data-binding-lists.md)
