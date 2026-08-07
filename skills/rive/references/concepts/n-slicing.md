# N-Slicing

An extension of traditional 9-slicing that lets raster and vector artwork be divided into any number of segments, so corner segments stay undistorted while internal segments scale or tile as the artwork resizes.

## Signature / Usage

- **Raster images**: select the N-Slice option in the Deform section of the inspector, or via right-click context menu; edit mode opens immediately.
- **Vector groups**: use "Convert to N-Slice" on an existing group, or select multiple objects and choose "N-Slice selection" to wrap them together.

## Options / Props

| Tile Mode (raster only) | Description |
| --- | --- |
| Stretch | Expands scaling segments proportionally |
| Repeat | Tiles scaling segments across the resized area |
| Hidden | Omits scaling segments from rendering |

## Notes

- Segments alternate scale behavior starting with a fixed segment, indicated by solid blue borders (fixed) vs. dashed borders (scaling).
- Drag from the outer bounds to create additional axes; hold Control/Command while dragging to avoid creating a mirrored counterpart axis.

## Related

- [Layout](./layout.md)
