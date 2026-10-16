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
| Font | Font asset reference; changes which font is displayed on a specific text style. Affects a single instance only |
| Blob | Blob asset reference; binds arbitrary binary data (e.g. a custom file format) to a view model |
| Artboard | Artboard reference for runtime swapping; the artboard must first be converted to a Component |
| View Model | Nested View Model instance, for hierarchical data structures |
| List | Collection of View Model instances, for repeating content |

## Notes

- Image properties affect only a single instance, unlike other property types which can be shared across instances.
- Font properties affect a single instance; to update a font globally across the whole file use asset loading instead, which replaces the underlying asset for all instances that use it.
- Blob: first import a file Rive does not natively recognize and choose **Import as Blob**, then bind it to a Blob property. Scripts can read and write the blob's bytes at runtime (see the Scripting API Blob interface).
- Artboard properties enable dynamic artboard swapping at runtime from the current file or external `.riv` files.

## Related

- [View Models](./view-models.md)
- [Properties](./properties.md)
- [Enums](./enums.md)
- [Lists](./data-binding-lists.md)
