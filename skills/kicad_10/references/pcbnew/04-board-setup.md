# Board Setup

Configuration dialog (**File → Board Setup**) for stackup, text/graphics defaults, design rules, and file embedding.

## Board Stackup

Accessed via the Physical Stackup page:

- Set number of copper layers (even numbers only)
- Configure per-layer thickness and dielectric properties
- Board total thickness is calculated from stackup parameters; adjust dielectric layers to hit a target thickness
- Thickness values affect 3D model exports and via net length calculations

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
