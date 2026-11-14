# Interface

GerbView's main window consists of a canvas for viewing Gerber and drill layers, surrounded by toolbars and a Layers Manager panel.

## Top Toolbar

| Icon | Description |
|------|-------------|
| delete_gerber | Clear all layers |
| load_gerber | Load Gerber files |
| gerbview_drill_file | Load Excellon drill files |
| sheetset | Set page size |
| print_button | Print |
| zoom_redraw | Redraw view |
| zoom_in / zoom_out | Zoom in or out |
| zoom_fit_in_page | Zoom to fit page |
| zoom_area | Zoom to selection |
| gerbview_top_layer | Select active layer |
| gerbview_top_info | Display info about active layer |
| gerbview_x2_component | Highlight items belonging to selected component (Gerber X2) |
| gerbview_x2_net | Highlight items belonging to selected net (Gerber X2) |
| gerbview_x2_attribute | Highlight items with the selected attribute (Gerber X2) |
| gerbview_top_dcode | Highlight items of selected D Code on the active layer |

## Left Toolbar

| Icon | Description |
|------|-------------|
| cursor | Select items |
| measurement | Measure between two points |
| grid | Toggle grid visibility |
| polar_coord | Toggle polar coordinates display |
| unit_inch / unit_mil / unit_mm | Select inch, mils, or millimeter units |
| cursor_shape | Toggle full-screen cursor |
| pad_sketch | Display flashed items in sketch (outline) mode |
| track_sketch | Display lines in sketch (outline) mode |
| opt_show_polygon | Display polygons in sketch (outline) mode |
| gerbview_show_negative_objects | Show negative objects in ghost color |
| show_dcodenumber | Show/hide D Codes |
| gbr_select_mode2 | Display layers in diff (compare) mode |
| contrast_mode | Toggle inactive layers between normal and dimmed display |
| layers_manager | Show/hide layer manager |
| flip_board_24 | Show Gerbers as mirror image |

## Layers Manager

The Layers Manager panel controls and displays visibility of all layers.

### Mouse Interactions

| Action | Result |
|--------|--------|
| Left click | Select (activate) the layer |
| Right click | Show layer options (visibility, hiding, sorting) |
| Middle click or double-click on color swatch | Change layer color |

The active layer is indicated by an arrow symbol. Each layer has a checkbox to toggle visibility.

### Tabs

| Tab | Purpose |
|-----|---------|
| Layers | Controls visibility and color of all loaded Gerber and drill layers |
| Items | Controls color and display of the grid, D Codes, and negative objects |

## Related

- [Introduction](./01-introduction.md)
- [Commands in Menu Bar](./03-commands-in-menu-bar.md)
