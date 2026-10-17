# Introduction to the KiCad Schematic Editor

The KiCad Schematic Editor (Eeschema) is a schematic capture application for Linux, macOS, and Windows. It is an integrated environment for schematic drawing, PCB footprint selection, library management, and data transfer to the PCB editor.

## Key Features

- Electrical rules checking (ERC)
- Circuit simulation via ngspice
- Plot file export in multiple formats (PostScript, PDF, HPGL, SVG per the feature list; see Notes)
- Bill of materials generation via Python or XSLT scripts
- Multi-sheet schematics (flat, simple hierarchical, and complex hierarchical)

## User Interface

The main interface has eight key elements:

| Element | Description |
|---------|-------------|
| Top toolbars | File management, zoom, and editing tools |
| Properties panel | Object property editing |
| Schematic hierarchy navigator | Sheet navigation |
| Selection filter panel | Controls which object types are selectable |
| Message panel / status bar | Cursor position, zoom, grid info |
| Left toolbar | Display and visibility options |
| Right toolbar | Drawing and design tools |
| Editing canvas | The schematic workspace |

## Navigating the Canvas

- **Pan**: Middle or right mouse button drag
- **Zoom**: Mouse wheel scroll
- **Zoom In / Zoom Out / Zoom to Page / Zoom to Objects / Zoom to Selection**: Top toolbar buttons

The status bar shows cursor position (X, Y), zoom (Z), relative offset (dx, dy, distance), grid, and units. Press **Space** to reset relative origin.

## Hotkeys

- **Ctrl+F1**: Show full hotkey list (use Cmd on macOS)
- Configure custom hotkeys via **Preferences** → **Preferences…** → **Hotkeys**
- Hotkey files are stored at:
  - Windows: `%APPDATA%\kicad\10.0\user.hotkeys`
  - Linux: `~/.config/kicad/10.0/user.hotkeys`
  - macOS: `~/Library/Preferences/kicad/10.0/user.hotkeys`
- Import configurations with the **Import Hotkeys** button

## Selection

**Rectangular selection** (left-to-right: fully enclosed items; right-to-left: touching items):

**Lasso selection** (clockwise: enclosed; counter-clockwise: touching):

**Modifier keys:**

| Modifier | Effect |
|----------|--------|
| Ctrl / Cmd | Toggle item selection |
| Shift | Add to selection |
| Ctrl+Shift / Cmd+Shift | Remove from selection |
| Long click (Windows); long click or Alt (Linux); long click or Option (macOS) | Clarify from pop-up menu |

Modifiers cannot be used with lasso selections.

The **Selection Filter** panel (lower left) controls which object types are selectable. Use the "All items" checkbox for a quick toggle.

## Left Toolbar Display Controls

| Control | Function |
|---------|----------|
| Grid visibility | Toggle grid display |
| Grid override | Enable per-object grid overrides |
| Unit toggles | Switch between inches, mils, millimeters |
| Cursor shape | Cycle cursor styles (small, fullscreen, 45° fullscreen) |
| Hidden pins | Show/hide invisible pins |
| Wire angle mode | Cycle free angle / 90° / 45° (Shift+Space) |
| Auto-annotation | Toggle automatic reference designator assignment |
| Hierarchy navigator | Open/close sheet navigation panel |
| Properties manager | Open/close properties panel |

## Notes

- Context menus (right-click) expose additional actions based on selection
- Many actions have no default hotkey but can be assigned via Preferences
- The 10.0 manual's feature list names PostScript, PDF, HPGL, and SVG plot formats; DXF is not listed there (not found in the introduction). The feature list (including the HPGL entry above) is the source's wording only: the 10.0 Plot dialog offers just PostScript, PDF, SVG, and DXF, and `kicad-cli sch export hpgl` is non-functional (see [Generating Outputs](./07-generating-outputs.md)).
- Default zoom/pan: middle or right drag pans, wheel zooms (configurable in the Mouse and Touchpad preferences). `Esc` cancels the current tool and, with the selection tool active, clears the selection. Toolbar contents are editable in the Toolbar page of the Schematic Editor Preferences.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Advanced Topics](./14-advanced-topics.md)
