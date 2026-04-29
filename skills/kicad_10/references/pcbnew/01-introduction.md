# Introduction to the KiCad PCB Editor

A comprehensive PCB layout application for designing printed circuit boards, available on Linux, macOS, and Windows with full cross-platform file compatibility. It integrates footprint placement, track routing, library management, schematic synchronization, DRC, an interactive router, and a 3D viewer.

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

- **Pan**: Middle or right mouse button drag
- **Zoom**: Scroll wheel; toolbar buttons for zoom-to-fit and box zoom
- **Status bar**: Displays cursor X/Y, zoom factor (Z), relative position, grid, and units
- **Space**: Resets relative coordinate origin to zero (useful for distance measurement)

## Hotkeys

- `Ctrl+F1` opens the current hotkey list
- Custom hotkeys are configurable via Preferences
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
