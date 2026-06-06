# Board Setup

Configuration dialog (**File → Board Setup**) for stackup, text/graphics defaults, design rules, and file embedding.

## Board Stackup

### Board Editor Layers

Configure layer usage, naming, and types:
- Rename layers and disable unused non-copper layers
- Create custom user-defined layers
- Required layers (copper, courtyard, `Edge.Cuts`) cannot be disabled
- Copper layer types: Signal, Power Plane, Mixed, Jumper

### Physical Stackup

- Set number of copper layers (even numbers only)
- Configure per-layer thickness and dielectric properties
- Board total thickness is calculated from stackup parameters; adjust dielectric layers to hit a target thickness
- Layer thicknesses affect 3D model exports and via net length calculations

### Board Finish

Defines copper finish type and special features (castellations, edge plating). These settings currently affect only Gerber job file outputs.

### Solder Mask / Paste

| Setting | Description |
|---------|-------------|
| Solder mask expansion | Clearance between mask and pad copper |
| Minimum web width | Minimum distance between adjacent mask openings |
| Paste clearance | Absolute offset from pad edge (negative = smaller than pad) |
| Paste clearance ratio | Relative scaling factor applied in addition to absolute clearance |

### Zone Hatch Offsets

Configure per-layer default offsets for zone hatch patterns. Enables forcing hatch grids to offset between layers for specific applications.

## Text and Graphics Defaults

Sets properties automatically applied to newly created objects, organized by layer category:

- Line thickness, text size, text appearance
- Default zone properties
- Dash/gap length ratios for dashed lines (relative to line width)
- Checkboxes to apply board defaults to footprint fields, text, shapes, dimensions, and barcodes

## Design Rules Configuration

### Constraints
Absolute minimum values for clearances, track widths, via sizes, and other parameters that cannot be overridden by more specific rules.

### Pre-defined Sizes
A list of track widths and via dimensions available for quick switching during interactive routing.

### Teardrops

Board-wide defaults for teardrop geometry applied to pad and via connections. Individual teardrop settings can override these defaults.

### Length-Tuning Patterns

Defines serpentine meander styles (amplitude, spacing) for length tuning operations. **Tuning profiles** link specific geometry presets to net classes for consistent impedance-controlled routing.

### Net Classes
Group nets and assign routing parameters (clearance, track width, via size). Net classes also support **tuning profiles** for controlled impedance — specifying per-layer track geometry for matched-impedance routing.

### Component Classes
Assign components to named groups automatically based on:
- Reference designators
- Footprint identifiers
- Board side (front/back)
- Custom expressions

Component classes can be referenced in custom DRC rules.

### Custom Rules
Write complex design constraints beyond what basic constraints and net classes support. See [15-advanced-topics.md](./15-advanced-topics.md) for syntax details.

## Embedding Files

Files can be embedded inside the board file for improved portability:

- Supported types: fonts, datasheets, 3D models, drawing sheets
- Embedded files are referenced with `kicad-embed://` URIs
- Managed in the **Embedded Files** section of Board Setup

## Importing Settings

Load configuration from an existing board file to use as a template:

- Supports: stackup, design rules, text defaults, net classes, custom rules
- Useful for applying a company-standard configuration to new projects

## Notes

- Board Setup is the primary location for design intent; DRC enforces the rules configured here
- Net class settings override global constraints; custom rules can override net class settings

## Related

- [05-editing-a-board.md](./05-editing-a-board.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
- [15-advanced-topics.md](./15-advanced-topics.md)
