# Drawing Sheet Editor Commands

Overview of the main screen layout, toolbar buttons, keyboard shortcuts, and mouse interactions.

## Main Screen

The editor presents a central canvas for the open drawing sheet. Selecting an item on the canvas opens the properties editor panel on the right side.

## Main Window Toolbar

| Button / Control | Action |
|-----------------|--------|
| New file | Create a new drawing sheet |
| Open | Load a drawing sheet file (`.kicad_wks`) |
| Save | Save the current drawing sheet |
| Page Setup | Open the page size and title block data dialog |
| Print | Print the current drawing sheet |
| Undo / Redo | Undo or redo the last edit |
| Zoom In / Out | Zoom the canvas in or out |
| Zoom Refresh | Refresh the zoom level |
| Zoom Fit | Fit the drawing sheet to the window |
| Preview mode | Display text with keywords replaced (as seen in editors) |
| Edit mode | Display raw text without keyword substitution |
| Reference corner selector | Choose the reference corner for coordinate display |
| Page number selector | Navigate between pages in multi-page documents |

## Commands in Drawing Area

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F1 | Zoom in |
| F2 | Zoom out |
| F3 | Zoom refresh |
| F4 | Center view on cursor |
| Arrow keys | Move cursor |
| Space | Set relative coordinate origin |
| M | Move selected item |

### Mouse Interactions

| Action | Result |
|--------|--------|
| Scroll wheel | Zoom in / out |
| Ctrl + scroll | Pan horizontally |
| Shift + scroll | Pan vertically |
| Right-click | Open context menu (add items, display settings) |
| Left-click | Select item |

## Status Bar Information

The status bar at the bottom of the window shows the current cursor coordinates relative to the selected reference corner.

## Related

- [Invoking the Drawing Sheet Editor](./06-invoking-the-drawing-sheet-editor.md)
- [Interactive Editing](./10-interactive-editing.md)
- [Properties Editor](./08-properties-editor.md)
