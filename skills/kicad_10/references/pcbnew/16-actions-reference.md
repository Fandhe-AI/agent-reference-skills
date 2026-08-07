# Actions Reference

Reference tables of GUI actions and their default hotkeys, grouped into three areas: **PCB Editor**, **3D Viewer**, and **Common** (shared across KiCad applications). Each table lists Action / Default Hotkey / Description.

## PCB Editor

Selected actions (the full table contains roughly 330 rows; not all are reproduced here):

| Action | Default Hotkey | Description |
|--------|-----------------|--------------|
| Align to Left / Right / Top / Bottom | — | Aligns selected items to the edge of the item under the cursor |
| Align to Horizontal / Vertical Center | — | Aligns selected items to the horizontal/vertical center of the item under the cursor |
| Distribute Horizontally/Vertically by Centers | — | Distributes selected items so item centers are equally spaced |
| Distribute Horizontally/Vertically with Even Gaps | — | Distributes selected items so gaps between items are equal |
| Create Array… | `Ctrl+T` | Creates an array of the selected item(s) |
| Place Off-Board Footprints | — | Performs automatic placement of components outside board area |
| Place Selected Footprints | — | Performs automatic placement of selected components |
| Switch Track to Next/Previous Layer | `Ctrl++` / `Ctrl+-` | Switch track to next/previous enabled copper layer |
| Switch Track Width to Next/Previous | `W` / `Shift+W` | Change track width to next/previous pre-defined size |
| Decrease/Increase Via Size | `\` / `'` | Change via size to previous/next pre-defined size |
| Place Vias | `Ctrl+Shift+X` | Place free-standing vias |
| Route Single Track | `X` | Route tracks |
| Place Through Via | `V` | Adds a through-hole via at the end of currently routed track |
| Place Microvia | `Ctrl+V` | Adds a microvia at the end of currently routed track |
| Place Blind/Buried Via | `Alt+Shift+V` | Adds a blind or buried via at the end of currently routed track |
| Router Highlight/Shove/Walkaround Mode | — | Switches the interactive router to highlight/shove/walkaround mode |
| Drag 45 Degree Mode | `D` | Drags the track segment while keeping connected tracks at 45 degrees |
| Drag Free Angle | `G` | Drags the nearest joint in the track without restricting the track angle |
| Draw Filled Zones | `Ctrl+Shift+Z` | Fills all zones on the board |
| Add a Zone Cutout | `Shift+C` | Adds a cutout to an existing zone or rule area |
| Add a Similar Zone | `Ctrl+Shift+.` | Adds a zone with the same settings as an existing zone |
| Toggle Zone Display | — | Cycle between showing zone fills and just their outlines |
| Zone Manager... | — | Show the zone manager dialog |
| Sketch Tracks / Sketch Vias / Sketch Pads | `K` (tracks) | Show tracks/vias/pads in outline mode |
| Show Ratsnest | — | Show lines/arcs representing missing connections on the board |
| Ratsnest Mode (3-state) | — | Cycle between showing ratsnests for all layers, just visible layers, and none |
| Net Color Mode (3-state) | — | Cycle between using net and netclass colors for all nets, just ratsnests, and none |
| Repair Board | — | Run various diagnostics and attempt to repair board |
| Appearance | — | Show/hide the appearance manager |
| Net Inspector | — | Show/hide the net inspector |
| Scripting Console | — | Show the Python scripting console |
| Create Arc/Lines/Polygon/Tracks from Selection | — | Converts selected graphic lines into an arc, graphic lines, a graphic polygon, or tracks respectively |
| Create Rule Area from Selection... | — | Creates a rule area from the selection |
| Flip Board View | — | View board from the opposite side |
| Automatic zoom | — | Automatic zoom on footprint change |

## 3D Viewer

Selected actions (the full table contains roughly 50 rows):

| Action | Default Hotkey | Description |
|--------|-----------------|--------------|
| Show 3D Models marked DNP | `D` | Show 3D models even if marked 'Do Not Place' |
| Show 3D Models not in POS File | `P` | Show 3D models even if not found in .pos file |
| Show Unspecified 3D Models | `V` | Show 3D models for 'unspecified' type footprints |
| Show SMD 3D Models | `S` | Show 3D models for 'Surface mount' type footprints |
| Show Through Hole 3D Models | `T` | Show 3D models for 'Through hole' type footprints |
| Flip Board | `F` | Flip the board view |
| Home View | `Home` | Redraw at the home position and zoom |
| Set Pivot | `Space` | Place point around which the board will be rotated (middle mouse click) |
| Reload board | — | Reload board and refresh 3D view |
| Move Board Up/Down/Left/Right | `Up` / `Down` / `Left` / `Right` | Pans the 3D view |
| Rotate X/Y/Z Clockwise/Counterclockwise | `Shift+R` (Z clockwise) | Rotates the 3D model around the given axis |
| Render CAD Colors | — | Use a CAD color style based on the diffuse color of the material |
| Render Solid Colors | — | Use only the diffuse color property from 3D model file |
| Render Realistic Materials | — | Use all material properties from each 3D model file |
| Copy 3D image to clipboard | — | Copy the current 3D image to the clipboard |
| Export Image... | — | Export the current view as an image file |

## Common

Selected actions shared across KiCad applications (the full table contains roughly 150 rows):

| Action | Default Hotkey | Description |
|--------|-----------------|--------------|
| Undo | `Ctrl+Z` | — |
| Redo | `Ctrl+Y` | — |
| Copy | `Ctrl+C` | Copy selected item(s) to clipboard |
| Cut | `Ctrl+X` | Cut selected item(s) to clipboard |
| Paste | `Ctrl+V` | Paste item(s) from clipboard |
| Delete | `Del` | Delete selected item(s) |
| Duplicate | `Ctrl+D` | Duplicates the selected item(s) |
| Save | `Ctrl+S` | Save changes |
| Save As… | `Ctrl+Shift+S` | Save current document to another location |
| Print... | `Ctrl+P` | — |
| Close | `Ctrl+W` | — |
| Quit | `Ctrl+Q` | — |
| Zoom to Fit | `Home` | Zoom to worksheet area if exists or edited object |
| Find | `Ctrl+F` | — |
| Find Next | `F3` | — |
| Measure Tool | `Ctrl+Shift+M` | Interactively measure distance between points |
| Switch units | `Ctrl+U` | Switch between imperial and metric units |
| Add Library… | — | Add an existing library folder |
| Center Justify | — | Center-justify fields and text items |
| 45 Degree Crosshairs | — | Display full-window crosshairs aligned at 45 and 135 degrees |
| Full-Window Crosshairs | — | Display full-window crosshairs aligned at 0 and 90 degrees |
| Small crosshairs | — | Use small crosshairs aligned at 0 and 90 degrees |
| Grid Origin... | — | Set the grid origin point |
| Edit Grids... | — | Edit grid definitions |
| Refresh Plugins | — | Reload all python plugins and refresh plugin menus |
| Exclude Marker | — | Mark current violation in Checker window as an exclusion |

## Notes

- These tables are excerpts; the official manual's full Actions Reference chapter lists all ~530 default hotkey bindings across the three sections. Hotkeys are user-configurable via **Preferences → Preferences… → Hotkeys**
- Many actions have no default hotkey assigned (shown as `—`) and are accessible only via menus, toolbars, or after custom hotkey assignment
- Descriptions left blank in the source table are shown as `—`

## Related

- [15-advanced-topics.md](./15-advanced-topics.md)
- [02-display-and-selection-controls.md](./02-display-and-selection-controls.md)
