# Creating and Editing Footprints

A footprint contains pads, graphic shapes and text, optional 3D models, and metadata. A library is a folder (usually `.pretty`) with one `.kicad_mod` file per footprint. The Footprint Editor creates libraries; adds, edits, deletes, and transfers footprints; and imports/exports footprint files.

## Footprint Editor Overview

Launch from the KiCad Project Manager or from the Board Editor (**Tools → Footprint Editor**). A board footprint can be opened with right-click → **Open in Footprint Editor** (`Ctrl+E`) to edit the board copy; the library copy opens via the info bar link or `Ctrl+Shift+E`.

- Editing the library copy does not change board copies until they are updated; editing the board copy changes neither the library copy nor other board copies
- Panels: footprint tree and Properties Manager (left), Appearance and selection filter (right), message panel (bottom)
- Right toolbar tools: selection, Add pad, Add rule area (`Ctrl+Shift+K`), lines (`Ctrl+Shift+L`), arcs (`Ctrl+Shift+A`), bezier (`Ctrl+Shift+B`), rectangles, circles (`Ctrl+Shift+C`), polygons (`Ctrl+Shift+P`), reference image, text (`Ctrl+Shift+T`), textbox, table, dimensions, delete, anchor tool, grid origin, measure
- Top toolbar includes: new footprint, new footprint using wizard, save, print, undo/redo, zoom, rotate, mirror, group/ungroup, footprint properties, pad properties, datasheet, footprint checker, edit a board footprint, insert footprint into the board
- Toolbars are editable in the Toolbar page of Footprint Editor Preferences

## Browsing, Modifying, and Saving Footprints

1. Show the library/footprint tree with the toolbar toggle; select the active library (new footprints go into it)
2. Click a footprint name to open it (hovering shows a preview)
3. Modify
4. Save with the save button (current library), **File → Save As…** (new name and/or library), or **File → Export → Footprint…** (a library file containing only this footprint)

## Creating a New Footprint Library

**File → New Library…** — choose location and name (saved as `<name>.pretty`) and whether to add it to the global or project library table. Table management (deleting, renaming) is in **Preferences → Manage Footprint Libraries…**.

## Creating a New Footprint

**File → New Footprint…** or the toolbar button creates an untitled footprint in the selected library. Set the name in the properties dialog (toolbar button or `E`); it becomes the file name.

- Default fields: Reference (`REF**`) and Value (`Untitled`), plus a text item `${REFERENCE}`
- The anchor (origin, magenta cross) is moved with the Anchor tool
- Wizards: see Footprint Wizards below

## Footprint Properties

Open with the toolbar button, `E`, or by double-clicking an empty spot in the canvas. Tabs: General, Layers, Clearance Overrides, Pad Connections, 3D Models, Embedded Files. Properties are defined in the library copy and can be changed per instance on a board. Fields and attributes sync from symbols (Update PCB From Schematic) and back (Update Schematic From PCB).

| Property | Description |
|----------|-------------|
| Footprint name | Name in the library and file name on disk; initially equals the Value field |
| Description | Footprint description (not the Description field); used in searching |
| Keywords | Additional search terms for the Footprint Chooser and Footprint Editor |
| Component type | SMD, Through hole, or Unspecified; affects placement/STEP filtering, IPC-2581 metadata, 3D visibility, Board Statistics, and pad-type DRC |
| Not in schematic | Footprint not expected to have a symbol; not deleted on update |
| Exclude from position files | Omitted from component placement exports |
| Exclude from bill of materials | Omitted from BOM exports; synced with the symbol |
| Do not populate | Primarily a symbol attribute, synced; can exclude from placement files and 3D view |

These attributes are overridden by the linked symbol's values.

## Footprint Pads

Add with the Add pad tool; each click places a pad, numbers increment, `Esc` ends. Pad properties dialog (`E`) tabs: General, Connections, Clearance Overrides, Backdrill.

| Pad Property | Description |
|--------------|-------------|
| Pad type | SMD (no hole, one copper layer); Through-hole (plated hole); Edge Connector (SMD that may overlap Edge.Cuts); NPTH, Mechanical (non-plated, no electrical connection); SMD Aperture (no hole, no connection) |
| Copper layers | SMD: F.Cu or B.Cu (flips with the footprint); through-hole: all, "connected layers only", or "F.Cu, B.Cu, and connected layers" |
| Technical layers | Mask/paste apertures; SMD defaults to the outer layers matching copper; through-hole defaults to F.Mask and B.Mask, no paste |
| Pad number | Net follows the symbol pin with the same number |
| Position X/Y | Pad center relative to the footprint origin |
| Padstack mode | Normal, Front/Inner/Back, Custom (per-layer diameter and hole size) |
| Pad shape | circular, oval, rectangular, trapezoidal, rounded rectangle, chamfered rectangle, chamfered with other corners rounded, custom (circular base), custom (rectangular base) |
| Hole | Circular or oval; "offset shape from hole" (not for circular pads) |
| Fabrication property | BGA pad, Fiducial local/global, Test point, Heatsink pad, Castellated pad, Mechanical, Press-fit pad, None (mostly Gerber X2 metadata; heatsink/mechanical allow PTH in SMD footprints without DRC error; castellated may intersect the board edge) |
| Pad to die length / delay | Added to routed track length/delay by tuning tools and Net Inspector |
| Pad connection (Connections tab) | Solid, thermal relief, or none; default From parent footprint; also teardrops, Zone knockout (custom pads), Relief gap, Spoke width (blank = inherit; 0 = 0 since KiCad 9) |
| Clearance (Clearance Overrides tab) | Pad clearance (blank = inherit; 0 = 0 since KiCad 9), Solder mask expansion (inflates all directions), Solder paste clearance (absolute, relative `%`, or both) |

Helpers:
- Custom pads: add a base pad, then right-click → **Edit Pad as Graphic Shapes** (`Ctrl+E`) and add shapes; exit with **Finish Pad Edit** or `Ctrl+E`. A rectangle with Number Box sets the number position; lines with Thermal Relief Template set spoke locations
- Default pad properties: **Edit → Default Pad Properties…**, **Copy Pad Properties to Default**, **Paste Default Pad Properties to Selected**, **Push Default Pad Properties to Other Pads…** (filters: shape, layers, orientation, type)
- **Edit → Renumber Pads…**: first number, numbering step, optional prefix
- Pad Table (toolbar button): edit all pads in a table
- Pad arrays: right-click → **Create from Selection → Create Array…** (`Ctrl+T`); extra options: Renumber pads, numbering direction, reverse numbering on alternate rows/columns, first free number vs. start value, continuous vs. coordinate-based numbering, decimal/hexadecimal/alphabet digits

## Footprint Graphics and Text

- Shapes, text, and dimensions may sit on nonphysical layers (F.Fab, User.Drawings) or physical layers (Edge.Cuts, silkscreen, mask, copper; copper objects can make electrical connections)
- Closed shapes on F.Courtyard / B.Courtyard form the courtyard; overlapping courtyards cause a DRC violation
- Edge.Cuts shapes become board edges: closed shapes become cutouts, unclosed edges must be closed in the board
- Default styles: Preferences → Footprint Editor → Default Values
- **Edit → Edit Text & Graphic Properties…** edits in bulk; **Tools → Cleanup Graphics…** (merge lines into rectangles, delete redundant graphics, merge overlapping graphics into pads; applied with Update Footprint)

## Footprint Fields

Named values (e.g. Reference = R101); visible on any board layer or hidden. Four default fields that cannot be deleted: Reference (`REF**`), Value (footprint name), Datasheet, Description (overwritten by the symbol's description). Names starting with `ki_` are reserved. Fields are added, deleted, and edited in the Footprint Properties dialog (or double-click / `E` on a field). Before KiCad 8.0 footprints had only graphic text. Whether hidden fields appear in BOM output is not stated in the 10.0 PCB Editor manual.

## Footprint Layers

By default a footprint has F.Cu, B.Cu, and one Inner layers group. The Layers tab offers **Use custom stackup** (exact copper layer count; extra layers are ignored on boards with fewer layers), a User Layers table, and private layers (any User.* layer; never shown on the board or in outputs). The number and names of user layers are set globally in the Footprint Editor preferences (User Layer Names).

## Clearance Overrides

Footprint-level pad clearance, solder mask expansion, solder paste clearance, and **exempt from courtyard requirement** (suppresses "Footprint has no courtyard defined"). Resolution priority: pad-level override, then footprint-level override, then board-level default (Board Setup → Solder Mask/Paste).

## Pad Connections, Net Ties, and Jumper Pads

- Pad connection to zones: solid, thermal relief, or none; default From zone setting; individual pads can override
- **Net ties**: add pad numbers (e.g. `1,2` or `1 2`) to the Net Ties table so those pads may short without a DRC error; each net needs its own pad; groups must remain separate
- **Jumper pads**: pads internally connected by the component share one net. Enable **All pads with duplicate numbers are jumpers** or add **Explicit pad jumper groups** (e.g. `3 4 5`); settings transfer from the symbol. Net ties allow different nets to be bridged; jumper pads assume the same net

## 3D Models

The 3D Models tab attaches external models (STEP, VRML, or IDF) by path, which may use variables such as `${KIPRJMOD}` or `${KICAD10_3DMODEL_DIR}` (use **Configure Paths**). Default placement is the footprint origin with no offset, scale, or rotation; adjust offset, scaling, rotation, and opacity; the show checkbox hides a model. Preview buttons: orthographic projection, show/hide PCB, aligned views, refresh, PCB thickness.

## Embedding Files

Files (especially 3D models) can be embedded in a footprint (`kicad-embed://`), deduplicated when several instances are added to a board; they cannot be referenced from the parent board. Enable **Embed File** in the file browser to add and embed a model in one step.

## Rule Areas

Added with `Ctrl+Shift+K`; take effect when the footprint is placed on a board (see [05-editing-a-board.md](./05-editing-a-board.md)).

## Reference Images

Shown only in the Footprint Editor; never in the PCB Editor or fabrication outputs. Add with the right toolbar button.

## Footprint Wizards

Parametric generators for: BGA, QFN, QFP, SOIC/MSOP/SSOP/TSSOP, SIP and DIP, ZIP, ZOIC, FPC connectors, Micromatch SMD connectors, circular pad arrays, touch sliders, mutual capacitance touch buttons, USS-39 barcodes, QR codes. Use the toolbar wizard button, choose a type, fill in parameters, and transfer the result back to the editor. Custom wizards: see Scripting in [15-advanced-topics.md](./15-advanced-topics.md).

## Checking Footprints

The toolbar footprint checker lists issues with arrow indicators on the canvas. It checks: malformed or missing courtyards; pads not matching the footprint type; through-hole pads without a hole; plated through-hole pads on no copper layer, without an annulus, or with a hole not fully within the pad; SMD pads on both front and back; SMD pads with mismatched copper and paste/mask layers; pads co-located with or too close to other holes; silkscreen/solder mask opening collisions; pads shorting outside net tie groups; nonexistent pads in net tie groups; pads in multiple net tie groups.

## Notes

- Editing a footprint in the board editor affects only that instance; use **Tools → Update Footprints from Library…** in the PCB editor to apply library changes (see [05-editing-a-board.md](./05-editing-a-board.md))
- Standalone footprint editor launch, a "Load Footprint from Library" menu item, a `Tools → Footprint Wizards` menu entry, and an `Inspect → Design Rules Checker` entry in the footprint editor: not found in the 10.0 manual (it describes toolbar buttons for the wizards and the footprint checker)

- Save (`Ctrl+S`) is a Common action in the Actions Reference
- Corrected from the official docs: the 10.0 Footprint Editor section still uses `${KICAD9_3DMODEL_DIR}` (and a KICAD8 to KICAD9 resolution example); KiCad 10's built-in variable is `KICAD10_3DMODEL_DIR`. `${KICAD9_3DMODEL_DIR}` resolves to the `KICAD10_3DMODEL_DIR` value only when it is not explicitly defined
- The 10.0 manual describes a new footprint as having two mandatory fields (Reference, Value) in Creating a New Footprint, but four undeletable default fields (Reference, Value, Datasheet, Description) in Footprint Fields

## Related

- [11-footprints-and-footprint-libraries.md](./11-footprints-and-footprint-libraries.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
