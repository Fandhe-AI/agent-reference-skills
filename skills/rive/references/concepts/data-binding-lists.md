# Lists

A List displays a dynamically generated set of items driven by bound data values configured in View Models, for menus, product listings, feeds, chat, dropdowns, and similar repeating UI.

## Signature / Usage

Two ways to populate an Artboard List:

- **View Model List property**: create a List Item View Model, bind it to an Item Artboard, add a `List` property to a Main View Model, add List items (each pointing at a View Model/instance), then bind the Artboard List's property dropdown to the List property.
- **View Model Number + Number to List converter**: add a `Number` property specifying item count, add a `Number to List` converter referencing the List Item View Model, then bind the Artboard List's property to the Number property with that converter.

## Options / Props

| Concept | Description |
| --- | --- |
| Artboard List | Generates list items using an Artboard per item; must be a child of an Artboard or Layout |
| View Model List property | A property holding a dynamic number of View Model instance items |
| Number to List converter | Converts a `Number` count into that many Artboard instances of a given View Model |
| List item index | A List Attributes property exposing the 0-based index of an item within its parent List |
| Virtualize (with scrolling) | Only generates Artboard components for items currently in the scroll view area; one direction only |
| Carousel (with scrolling) | Endless scroll in either direction; requires Virtualize enabled |

## Notes

- If more than one list item is bound to the same View Model instance, they share the same index value.
- List items placed inside a Layout inherit that Layout's direction, wrap, padding, gap, and alignment.
- Adding a Scroll Constraint to the parent Layout lets List items scroll without additional setup; see List Scrolling for Virtualize/Carousel details.
- Runtimes provide APIs to modify Lists and List items at runtime (add/remove items).

## Related

- [Data Binding](./data-binding.md)
- [View Models](./view-models.md)
- [Property Types](./data-binding-property-types.md)
- [Scrolling](./scrolling.md)
- [Converters](./converters.md)
