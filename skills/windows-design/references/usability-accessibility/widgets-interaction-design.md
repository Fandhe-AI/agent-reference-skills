# Widget interaction design guidance

Interaction design patterns for Windows widgets: navigation, containers, image links, pagination, hyperlinks, and dropdown menus.

## Signature / Usage

A widget has a single primary page; clicking a call to action should launch the associated app or website rather than implementing the action inline. Never navigate to a different in-widget view on click.

| Widget size | Maximum touchpoints |
|------|-------------|
| Small | 1 |
| Medium | 3 |
| Large | 4 |

## Options / Props

| Element | Guidance |
|------|-------------|
| Containers | Group visual elements into rows/columns forming a hierarchical grid structure |
| Image links | Grid-arranged tappable images |
| Pagination | Dots aligned horizontally or vertically; navigation arrows appear on cursor hover; the larger dot indicates the active page |
| Hyperlinks | Underline appears on hover; must not share the same screen region as pagination dots |
| Dropdown menus | May extend temporarily beyond the widget's bounds while open; must be light-dismiss (closes on outside click) |

## Notes

- Not supported inside widgets: **Pivots**, **L2 pages**, and vertical/horizontal scrolling.
- Pagination navigation arrows are hover-triggered, not always visible.

## Related

- [Widget design fundamentals](./widgets-design-fundamentals.md)
- [Widget states and built-in UI components](./widgets-states-and-ui.md)
- [Widget principles](./widgets-principles.md)
