# Display and Selection Controls

Controls for managing layer visibility, object selection, and board navigation in the PCB Editor.

## Board Layers

- One layer is always **active**; new objects are created on it
- The active layer renders on top; related layers appear above unrelated ones
- Selected objects always display on top regardless of layer
- Change the active layer by left-clicking it in the Appearance panel, the top toolbar layer drop-down, or a hotkey; any layer (even the active one) can be hidden
- Example: with B.Silkscreen active, all other back layers are drawn above front, user, and inner copper layers; with Edge.Cuts active, the User.* layers and Margin are also brought to the front

## Appearance Panel

Three tabs for managing visual display:

| Tab | Purpose |
|-----|---------|
| Layers | Color swatches and visibility toggles per layer; active layer indicated with arrow |
| Objects | Visibility/color per object type; opacity sliders for tracks, vias, pads, zones (multiplied with layer color opacity; zones translucent by default) |
| Nets | Net/net class ratsnest visibility and color |

- Layers tab: left-click selects the active layer; double-click or middle-click a color swatch to change color (requires a custom color theme created in Preferences first). Non-active layer display: normal, dim, or hide (`Ctrl+H` cycles per the chapter text; the Actions Reference lists `H` for "Inactive Layer View Mode (3-state)"); items on inactive layers cannot be selected in Dim/Hide. **Flip board view** (also in the View menu) mirrors the view around the Y-axis without changing layer ordering
- Nets tab: net color options "All" (copper items too), "Ratsnest" (default), "None"; ratsnest drawn for "All layers" or "Visible layers". Hiding nets does not affect connectivity or DRC. The Default net class cannot have a color; right-click a net class → **Use color from schematic**
- Layer presets (Presets drop-down, **Save preset…** / **Delete preset…**; stored in project settings): quick switcher `Ctrl+Tab`. Viewports (**Save viewport…** / **Delete viewport…**): quick switcher `Shift+Tab`

## Selection

- Single click selects items when no tool is active
- `Esc` cancels the current tool and returns to the selection tool; with the selection tool active it clears the selection
- Rectangular and lasso modes are switched from the palette in the right toolbar
- **Left-to-right drag** (yellow box): selects only fully enclosed items
- **Right-to-left drag** (blue box): selects any items that touch the box
- Lasso: a clockwise lasso selects only fully enclosed items; counter-clockwise selects any touching item; double-click finishes; modifier keys do not apply to lasso
- Click modifiers (Windows/Linux; `Cmd` replaces `Ctrl` on macOS): `Ctrl` toggles, `Shift` adds, `Ctrl+Shift` removes, long click (or `Alt`) opens a pop-up to clarify selection. The same three modifiers apply to rectangular drag selection
- `U` key (**Expand Selection**): first press expands to the nearest pad, second press to all connected items on all layers; obeys the selection filter

**Selection filter panel** disables specific object types to simplify selection in dense areas. The **All items** checkbox toggles the others; **Locked items** is independent; right-click an object type to allow only that type.

## Net Highlighting

Highlights a net brighter while dimming all other items. Activation methods:

- Backtick `` ` `` hotkey after selecting copper objects (or while hovering over one)
- Right-click a copper object → **Net Inspection Tools → Highlight Net**
- Right-click a net in the Appearance panel Nets tab → **Highlight**
- Net Inspector double-click

Clear with the Clear Net Highlight action (`~`) or the Highlight net tool on an empty region; `Esc` also clears by default (configurable in Preferences → PCB Editor → Editing Options). **Toggle Net Highlighting** (left toolbar; hotkey Ctrl + backtick per the chapter text; the Actions Reference lists `Alt` + backtick for "Toggle Net Highlight") turns the display on/off once a net is chosen.

## Cross-Probing from Schematic

Bidirectional synchronization between schematic and PCB editors:

- **Selection cross-probing**: selecting a component in one editor highlights it in the other
- **Highlight cross-probing**: net highlighted in schematic is also highlighted in PCB
- Cross-probing also works with the 3D Viewer
- Defaults: center and zoom on the item; centering/zooming, selection cross-probing, **Flash cross-probed selection**, and **Highlight cross-probed nets** are set in Preferences → Display Options
- Manual cross-probing when disabled: right-click → **Select on PCB** (schematic) / **Select → Select on Schematic** (PCB)

## Left Toolbar Display Controls

| Control | Function |
|---------|----------|
| Grid toggle | Show/hide grid (hiding does not disable snapping by default; see Preferences → Display Options) |
| Grid overrides | Item-specific grid overrides on/off |
| Polar/Cartesian | Switch coordinate display in the status bar |
| Unit selector | Switch between inches, mils, millimeters (click toggles; palette selects directly) |
| Crosshair style | Small, fullscreen, or 45-degree-rotated fullscreen |
| Line mode | Free angle, 90°, or 45° for new tracks, zones, shapes, dimensions (`Shift+Space` toggles) |
| Ratsnest display | Show/hide ratsnest; separate toggle for straight vs curved lines |
| Layer display mode | Toggles non-active layers Normal / Dim; highlighted when Dim or Hide (pressing returns to Normal). Hide is reachable only via the Appearance panel or the 3-state hotkey (`Ctrl+H` in the chapter text, `H` in the Actions Reference) |
| Net highlighting | Toggle highlight display (disabled until a net is highlighted) |
| Zone display | Show filled zones / zone outlines only |
| Pad / via / track sketch | Switch each between filled and outline mode |
| Panels | Show/hide Appearance and Selection Filter panels; show/hide Properties Manager panel |

The toolbar contents are editable in the Toolbar page of PCB Editor Preferences.

## Related

- [01-introduction.md](./01-introduction.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
