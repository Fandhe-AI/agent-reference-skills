# Interactive Editing

Describes how to select, create, and edit items on the drawing sheet canvas.

## Item Selection

Items can be selected by:

- Left-clicking directly on the canvas
- Right-clicking the canvas and using the context menu
- Selecting an item in the Design Inspector window

Selected items appear in a lighter color and their properties open in the Properties Editor panel.

## Item Creation

1. Click the appropriate button in the right toolbar (or use the right-click context menu)
2. Click on the canvas to place the item
3. The new item is selected and opens in the Properties Editor
4. Adjust properties as needed, then click **Apply**

Available item types via toolbar:

| Item | Toolbar Action |
|------|---------------|
| Line | Add graphical segment button |
| Rectangle | Add rectangle button |
| Text | Text button |
| Bitmap | Image button |

## Adding Lines, Rectangles, and Text

- Items can be repositioned by dragging or using the **Move** command (`M` key)
- For lines and rectangles, each endpoint can be adjusted independently
- Recommendation: use the same reference corner for both the start and end points to ensure consistent geometry across different paper sizes

## Adding Logos

Logos must be prepared with the **Image Converter** tool before use:

1. Use the Image Converter tool to generate a `.kicad_wks` file containing a poly-polygon representation of the logo
2. Use **Append Existing Drawing Sheet** to insert the poly-polygon into the current design
3. The poly-polygon can then be moved and its parameters modified in the Properties Editor

## Adding Image Bitmaps

- Supported formats: PNG, JPEG, BMP
- On import, the bitmap PPI (pixels per inch) is set to **300 PPI** by default
- Adjust PPI in the Properties Editor to control the final rendered size
- Bitmaps support repetition but **do not support rotation**

## Notes

- Bitmaps can only be plotted by PDF and PS plotters; other formats render only a bounding box
- Use the same reference corner for both endpoints of lines and rectangles to maintain layout consistency across paper sizes

## Related

- [Theory of Operations](./03-theory-of-operations.md)
- [Properties Editor](./08-properties-editor.md)
- [Design Inspector Window](./09-design-inspector-window.md)
- [Drawing Sheet Editor Commands](./07-drawing-sheet-editor-commands.md)
