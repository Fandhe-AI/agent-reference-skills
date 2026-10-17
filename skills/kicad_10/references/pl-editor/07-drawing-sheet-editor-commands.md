# Drawing Sheet Editor Commands

Overview of the main screen layout, toolbar buttons, keyboard shortcuts, and mouse interactions.

## Main Screen

The editor presents a central canvas for the open drawing sheet. The right pane is the properties editor and appears only when an item is selected on the canvas.

## Main Window Toolbar

| Button / Control | Action |
|-----------------|--------|
| New file | Create a new drawing sheet |
| Open | Load a drawing sheet file (`.kicad_wks`) |
| Save | Save the current drawing sheet |
| Page Setup | Display the page size selector and the title block user data editor |
| Print | Print the current page |
| Undo / Redo | Undo or redo the last edit |
| Zoom In / Out / Redraw / Auto | Zoom in, zoom out, redraw, and auto (fit) |
| Preview mode | Display text as in the Schematic / PCB Editors, keywords replaced by user text |
| Edit mode | Display text "as is", without keyword replacement |
| Reference corner selector | Reference corner for coordinates displayed in the status bar |
| Page number selector | Select page (page 1 or other pages); meaningful only if some items are not shown on all pages |

## Commands in Drawing Area

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| F1 | Zoom in |
| F2 | Zoom out |
| F3 | Refresh display |
| F4 | Move cursor to center of display window |
| Home | Fit into display window (manual says "footprint") |
| Arrow keys | Move cursor one grid position in the arrow direction |
| Space | Set relative coordinates to the current cursor position |
| M | Move selected item (from Interactive Editing; not in this keyboard list) |

### Mouse Interactions

| Action | Result |
|--------|--------|
| Scroll wheel | Zoom in / out at the cursor position |
| Ctrl + scroll | Pan right and left |
| Shift + scroll | Pan up and down |
| Right-click | Open context menu: Add Line, Add Rectangle, Add Text, Add Bitmap, Zoom selection, Grid selection |
| Left-click | Select item |

## Status Bar Information

The status bar at the bottom of the window shows the current cursor coordinates relative to the corner selected in the reference corner dropdown of the toolbar.

## Related

- [Invoking the Drawing Sheet Editor](./06-invoking-the-drawing-sheet-editor.md)
- [Interactive Editing](./10-interactive-editing.md)
- [Properties Editor](./08-properties-editor.md)
