# Introduction to the KiCad PCB Editor

A comprehensive PCB layout application for designing printed circuit boards, available on Linux, macOS, and Windows with full cross-platform file compatibility. It integrates footprint placement, track routing, library management, schematic synchronization, DRC, an interactive router, and a 3D viewer.

The interactive router has multiple modes of operation (push-and-shove, walkaround, highlight collisions) and supports differential pair routing plus length and skew tuning. Fabrication/plot export covers Gerber, IPC-2581, ODB++, GenCAD, PDF, PostScript, and SVG; 3D model generation covers STEP, GLB, BREP, XAO, PLY, STL, IDF, and VRML. A netlist from other packages can also be imported.

## User Interface Components

| Element | Description |
|---------|-------------|
| Top toolbars | File management, zoom controls, editing tools |
| Left toolbar | Display and visibility options for layers and objects |
| Right toolbar | Drawing and design placement tools |
| Properties panel | Object property editing and inspection |
| Appearance panel | Layer and object visibility management |
| Selection filter panel | Controls which object types can be selected |
| Message panel / status bar | Feedback and coordinate information |
| Editing canvas | Main board design workspace |

## Canvas Navigation

- **Pan**: Middle or right mouse button drag (default; configurable in Preferences → Mouse and Touchpad)
- **Zoom**: Scroll wheel; top toolbar buttons for zoom in/out (about viewport center), zoom to fit the drawing sheet frame, zoom to fit items within the drawing sheet, and box zoom
- The view can also be flipped to show the board from the bottom
- **Status bar**: Displays cursor X/Y, zoom factor (Z), relative position, grid, and units
- **Space**: Resets relative coordinate origin to zero (useful for distance measurement)

## Hotkeys

- `Ctrl+F1` opens the current hotkey list; the default list is in the Actions Reference ([16-actions-reference.md](./16-actions-reference.md))
- Key labels are for a standard PC keyboard; on an Apple layout use `Cmd` for `Ctrl` and `Option` for `Alt`
- Custom hotkeys are configured in the hotkey editor (Preferences → Preferences… → Hotkeys); **Import Hotkeys** loads a `user.hotkeys` file
- Configuration stored in `user.hotkeys` in the KiCad config directory:
  - Windows: `%APPDATA%\kicad\10.0\`
  - Linux: `~/.config/kicad/10.0/`
  - macOS: `~/Library/Preferences/kicad/10.0/`

## Notes

- Context menus (right-click) provide access to most functions as an alternative to hotkeys
- Many actions have no default hotkey; they can be assigned in Preferences

## Related

- [02-display-and-selection-controls.md](./02-display-and-selection-controls.md)
- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
