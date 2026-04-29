# Creating and Editing Footprints

The Footprint Editor is an integrated tool within KiCad for creating and modifying component footprints and managing footprint libraries.

## Footprint Editor Overview

Access via:
- **Tools → Footprint Editor** from the PCB Editor
- Double-click a footprint on the board → **Edit Footprint** (edits the board-embedded copy)
- Open as a standalone application

The editor shares many tools with the PCB Editor but operates on individual footprints rather than full boards.

## Browsing, Modifying, and Saving Footprints

1. Open the footprint editor
2. Use the library tree on the left to navigate to a footprint
3. Double-click or use **File → Load Footprint from Library** to open it
4. Make modifications
5. Save back to the library with `Ctrl+S` or **File → Save Footprint to Library**

## Creating a New Footprint Library

1. **File → New Library…**
2. Choose global or project scope
3. Assign a directory and nickname
4. The library appears in the library tree

## Creating a New Footprint

**From scratch:**
1. **File → New Footprint…**
2. Enter footprint name and type (SMD, through-hole, other)
3. Add pads, courtyard, silkscreen, and documentation

**From a wizard:**
- **Tools → Footprint Wizards** provides parametric templates for common package types (DIP, QFP, BGA, etc.)

## Footprint Properties

Accessed via **Edit → Footprint Properties** or `E`:

| Property | Description |
|----------|-------------|
| Reference | Default reference designator prefix (e.g., R, C, U) |
| Value | Default component value |
| Footprint name | Library identifier |
| Type | SMD / Through-hole / Other |
| Board side | Front/Back default |
| Attributes | Exclude from BOM, DNP, etc. |
| Keywords | Search terms for the footprint browser |
| Description | Human-readable description |

## Footprint Pads

| Pad Property | Description |
|--------------|-------------|
| Shape | Circle, rectangle, oval, trapezoid, rounded rectangle, custom |
| Size | Width × height |
| Drill | Hole diameter and shape (through-hole pads) |
| Type | Through-hole, SMD, NPTH, connect |
| Copper layers | Which layers the pad appears on |
| Net tie group | For net tie / jumper pad configurations |
| Thermal relief | Zone connection style |
| Solder mask/paste | Clearance overrides |

## Footprint Graphics and Text

- Silkscreen shapes and text provide assembly reference
- Courtyard outlines (F.Courtyard / B.Courtyard) define component exclusion zones
- Fab layer drawings provide detailed component outlines for documentation
- All graphical elements follow the same tools as the PCB Editor

## Footprint Fields

Fields store metadata synchronized with the schematic:
- **Reference** (mandatory)
- **Value** (mandatory)
- Custom fields (datasheet URL, manufacturer part number, etc.)

Fields are visible or hidden; hidden fields still appear in BOM generation.

## Footprint Layers

| Layer | Purpose |
|-------|---------|
| F.Cu / B.Cu | Copper pads |
| F.Silkscreen / B.Silkscreen | Silkscreen markings |
| F.Fab / B.Fab | Fabrication/documentation outlines |
| F.Courtyard / B.Courtyard | Component placement exclusion zones |
| F.Mask / B.Mask | Solder mask openings |
| F.Paste / B.Paste | Solder paste stencil openings |

## Clearance Overrides

Individual pads can override:
- Solder mask expansion
- Solder paste coverage ratio

Useful for fine-pitch or special-process components.

## Pad Connections, Net Ties, and Jumper Pads

Net ties connect pads from different nets within a single footprint. Used for:
- Zero-ohm jumpers
- Current sense resistors (Kelvin connections)
- Ferrite beads with separate supply and ground nets

Configure net tie groups in pad properties to suppress DRC unconnected-net violations.

## 3D Models

Footprints reference 3D model files for visualization:
- Supported formats: STEP, VRML
- Configure offset, rotation, and scale to align the model with the footprint
- Multiple models can be attached to one footprint
- Models can be embedded in the board file via **Embedded Files**

## Embedding Files

Files (3D models, datasheets) can be embedded directly in the footprint or board for improved portability using `kicad-embed://` URIs.

## Rule Areas

Keepout regions can be defined within a footprint, automatically instantiated whenever the footprint is placed on a board.

## Reference Images

Import reference images (component drawings, manufacturer land pattern PDFs) as non-printed drawing aids within the footprint editor.

## Footprint Wizards

Parametric generators for standard package types. Access via **Tools → Footprint Wizards**. Configure parameters (pin count, pitch, pad size) and generate a complete footprint automatically.

## Checking Footprints

**Inspect → Design Rules Checker** within the footprint editor verifies:
- Pad clearances
- Courtyard coverage
- Silk-to-pad clearance
- Minimum annular ring

## Notes

- Editing a footprint in the board editor edits only that board's copy; use the footprint editor to update the library definition
- Use **Tools → Update Footprints from Library** in the PCB editor to synchronize board footprints with updated library definitions

## Related

- [11-footprints-and-footprint-libraries.md](./11-footprints-and-footprint-libraries.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
