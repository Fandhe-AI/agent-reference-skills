# Display and Selection Controls

Controls for managing layer visibility, object selection, and board navigation in the PCB Editor.

## Board Layers

- One layer is always **active**; new objects are created on it
- The active layer renders on top; related layers appear above unrelated ones
- Selected objects always display on top regardless of layer

## Appearance Panel

Three tabs for managing visual display:

| Tab | Purpose |
|-----|---------|
| Layers | Color swatches and visibility toggles per layer; active layer indicated with arrow |
| Objects | Opacity sliders for tracks, vias, pads, zones |
| Nets | Net visibility and ratsnest / copper coloring |

Layer presets save/restore visibility configurations. Viewports store view location and zoom level.

## Selection

- Single click selects items when no tool is active
- **Left-to-right drag**: selects only fully enclosed items
- **Right-to-left drag**: selects any items that touch the box
- `U` key (**Expand Selection**): progressively extends selection across connected copper items and layers

**Selection filter panel** disables specific object types to simplify selection in dense areas.

## Net Highlighting

Highlights a net brighter while dimming all other items. Activation methods:

- Backtick `` ` `` hotkey after selecting copper objects
- Right-click context menu
- Appearance panel net list
- Net Inspector double-click

## Cross-Probing from Schematic

Bidirectional synchronization between schematic and PCB editors:

- **Selection cross-probing**: selecting a component in one editor highlights it in the other
- **Highlight cross-probing**: net highlighted in schematic is also highlighted in PCB
- Manual cross-probing via right-click → **Select on PCB** / **Select on Schematic**

## Left Toolbar Display Controls

| Control | Function |
|---------|----------|
| Grid toggle | Show/hide grid dots |
| Unit selector | Switch between inches, mils, millimeters |
| Crosshair style | Small, fullscreen, or 45-degree modes |
| Line mode | Free angle, 90°, or 45° routing/drawing angle |
| Ratsnest display | Show/hide unrouted connections |
| Layer display mode | Normal / Dim / Hide for non-active layers |
| Net highlighting | Toggle net highlight mode |
| Zone/pad sketch | Toggle zone fill and pad/via outline display |

## Related

- [01-introduction.md](./01-introduction.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
