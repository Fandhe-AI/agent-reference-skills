# Scrolling

Two constraints that add scrolling behavior on top of Layout containers: a Scroll Content constraint for touch-based scrolling of overflowed content, and a Scroll Bar Thumb constraint for a draggable scroll bar.

## Signature / Usage

**Content scrolling** hierarchy: a Scroll view Layout (defines the visible region) containing a Scroll content Layout (the constraint target; typically Hug or Fixed sized) containing the Scroll items. Add a **Scroll Content** constraint to the Scroll content Layout.

**Scroll bar** hierarchy: a Scroll Bar Layout (track) containing a Scroll Thumb Layout. Add a **Scroll Bar Thumb** constraint to the thumb, then target it at the Layout carrying the Scroll Content constraint.

## Options / Props

| Property | Description |
| --- | --- |
| Direction | `Vertical`, `Horizontal`, or `All` |
| Scroll Percent X/Y (animatable) | 0-100%, where 0% is top/left; keyable on the timeline |
| Scroll Index (animatable) | 0-based index of the item to scroll to; only with Vertical or Horizontal direction; keyable on the timeline |
| Physics: Elastic | iOS-style scroll with deceleration and rubber-banding at edges |
| Physics: Clamped | Basic drag-and-drop with no physics |
| Snap | Scroll content always settles with a whole item at the top/left |
| Virtualize (List scrolling only) | Only generates Artboard components for items in the visible content area; one direction only |
| Carousel (List scrolling only) | Endless scroll in either direction; requires Virtualize |

## Notes

- Scroll wheel/trackpad gestures are not currently supported.
- Scroll Percent and Scroll Index both control the same content offset — set only one at a time (e.g., only key one per timeline frame) to avoid contention.
- To combine Scroll Percent/Index with physical drag scrolling, add an empty "reset" timeline/state triggered (e.g., via a Mouse down listener) as soon as the scroll area is interacted with.
- For List scrolling, use a single List as the Scroll content instead of multiple Scroll items.

## Related

- [Layout](./layout.md)
- [Lists](./data-binding-lists.md)
