# Theory of Operations

Explains the coordinate system, item types, and design model used by the Drawing Sheet Editor.

## Basic Drawing Sheet Item Properties

| Item Type | Defined By | Supports Rotation | Can Be Repeated |
|-----------|-----------|-------------------|-----------------|
| Line (segment) | Start point + end point | No | Yes |
| Rectangle | Start point + end point | No | Yes |
| Text | Single position | Yes | Yes (with increment for labels) |
| Poly-polygon | Single position | Yes | Yes |
| Bitmap | Single position | No | Yes |

Repeated text accepts an increment value for labels, meaningful only when the text is a single letter or digit.

## Coordinates Definition

Every position (start point, end point) is defined **relative to a page corner**. This makes drawing sheets independent of paper size — changing the paper size does not shift items relative to their reference corner.

## Reference Corners and Coordinates

- Items are anchored to one of the four page corners.
- When paper size changes, the item's position relative to its reference corner remains unchanged.
- **Default reference corner**: bottom-right (title blocks are typically attached here).
- For rectangles and segments (two defined points): each point has its own reference corner independently.

## Rotation

Only items defined by a single position — text and poly-polygons — can be rotated.

## Repeat Option

Items can be repeated. This is useful for creating grids and grid labels. Repeated text can include an auto-incrementing label value (single letter or single digit).

## Related

- [Constraints](./05-constraints.md)
- [Interactive Editing](./10-interactive-editing.md)
