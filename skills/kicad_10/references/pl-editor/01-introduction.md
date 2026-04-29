# Introduction to the KiCad Drawing Sheet Editor

The Drawing Sheet Editor is a specialized KiCad tool for creating custom drawing sheets used in the Schematic and Board Editors.

## Overview

Drawing sheets can contain the following item types:

- **Lines** — borders and dividers
- **Rectangles** — structured layout areas
- **Text** — static strings or keyword-based dynamic text (e.g., date, page number)
- **Poly-polygons** — primarily for logos and special graphic shapes
- **Bitmaps** — image-based logos (plotted only by PDF and PS plotters; other formats render a bounding box only)

## Capabilities

- Items can be repeated to create grids and grid labels
- Text and poly-polygons support rotation
- Lines and rectangles are defined by two points and cannot be rotated

## Notes

- Bitmaps are limited to PDF and PS output; other plotters render only a bounding box
- Keyword placeholders in text are replaced dynamically when used inside the Schematic or PCB Editor

## Related

- [Drawing Sheet Editor Files](./02-drawing-sheet-editor-files.md)
- [Theory of Operations](./03-theory-of-operations.md)
