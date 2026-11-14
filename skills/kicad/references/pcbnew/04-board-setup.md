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
- Board thickness is used when exporting a 3D model; layer thicknesses are included in net length calculations for nets that include vias
- Only even numbers of copper layers are supported (for an odd count, choose the next even number and ignore the extra layer)
- **Adjust Dielectric Thickness** distributes an overall board thickness over the dielectric layers; locked dielectric layers are not adjusted
- Dielectric, solder mask, and silkscreen layers can be given colors (affects 3D viewer and 3D exports)

### Board Finish

Defines copper finish type and special features (castellations, edge plating). These settings currently affect only Gerber job file outputs.

### Solder Mask / Paste

Global values; overridden by clearance settings on individual footprints or pads. Most fabricators expect 0 (the default) unless you make the PCB yourself or are advised otherwise.

| Setting | Description |
|---------|-------------|
| Solder mask expansion | Size of mask opening relative to pad (0 = same size; positive = larger; negative = smaller) |
| Solder mask minimum web width | Minimum distance between mask openings; closer openings are plotted as one merged opening |
| Solder mask to copper clearance | Minimum distance between a mask opening and copper of a different net; smaller distances cause a DRC error |
| Allow bridged solder mask apertures between pads within footprints | Controls whether a DRC violation occurs when pads of one footprint share a merged mask opening |
| Tent vias | Front and back tenting set independently; individual vias can override in via properties |
| Solder paste clearance | Absolute offset (e.g. `-0.1mm`), relative value (e.g. `-5%`), or both (e.g. `-0.1mm - 5%`); 0 or blank = same size as pad |

### Zone Hatch Offsets

Configure per-layer default offsets for zone hatch patterns. Enables forcing hatch grids to offset between layers for specific applications.

## Text and Graphics Defaults

Sets properties automatically applied to newly created objects, organized by layer category:

- Line thickness, text size, text appearance
- Default zone properties
- Line thickness, text size, and text appearance are set for six layer categories; dimension defaults apply to all layers
- Dash length / Gap length for dashed lines (relative to line width; a gap length of 2 = twice the line width)
- Checkboxes to apply board defaults to footprint fields, footprint text, non-copper footprint shapes, footprint dimensions, and footprint barcodes
- Text Variables page: project-wide `${VARIABLENAME}` substitutions (shared with the schematic editor)

## Design Rules Configuration

### Constraints
Absolute minimum values for clearances, track widths, via sizes, and other parameters that cannot be overridden by more specific rules. Set them to the values recommended by your manufacturer.

| Setting | Description |
|---------|-------------|
| Arc/circle approximated by segments | Maximum error when arcs/circles are approximated by line segments. Default `0.005mm`; lower is smoother but slower on large boards |
| Allow fillets outside zone outline | Allows inside corners of the zone outline to be filleted even though zone copper then extends outside the outline |
| Minimum thermal relief spoke count | Minimum number of thermal relief spokes connecting a pad to a zone; a DRC violation is generated otherwise |
| Include stackup height in track length calculations | When disabled, via length is excluded from length tuner track length calculations |

### Pre-defined Sizes
A list of track widths and via dimensions available for quick switching during interactive routing.

### Teardrops

Board-wide defaults for teardrop geometry applied to pad and via connections. Individual teardrop settings can override these defaults.

### Length-Tuning Patterns

Default parameters for each type of length-tuning pattern (single-track length, differential-pair length, differential-pair skew). Can be overridden in the properties of each tuning pattern added to the board.

### Tuning Profiles

Per-layer routing parameters for single-ended or differential tracks with impedance requirements.

- Profile fields: name, type (Single / Differential), optional Target impedance (required for auto-calculation), Enable time domain tuning
- Track Propagation table: Signal Layer, Bottom Reference layer, optional Top Reference layer (one reference = microstrip, two = stripline), Track Width, Unit Delay, Diff Pair Gap (differential only). Width/gap/delay can be entered manually or auto-calculated from the stackup; delay values are not updated automatically when the stackup changes
- Via Propagation: Global unit delay plus per-layer-pair overrides (Signal Layer From/To, Via Layer From/To, Delay)
- Assigned to a net class in the Net Classes page, Tuning Profile column; the router then uses the profile's width and diff pair gap
- DRC reports mismatches only if the "Tuning profile track geometries" violation severity is set to Warning or Error

### Net Classes
Group nets and assign routing parameters (clearance, track width, via size, differential pair sizes).

- A net can have several net classes; an aggregate class takes each property from the highest-priority class that sets it (priority = order in the Schematic or Board Setup dialog); the Default net class is the fallback
- Track widths and via sizes are default (optimal) sizes, not minimums or maximums; changing them manually causes no DRC violation (use custom rules to restrict)
- Columns can be shown/hidden via the table header context menu; PCB Color column can override ratsnest/copper colors; **Import colors from schematic** copies schematic colors
- Pattern-based assignments are listed in the lower portion and can also be created from the canvas with **Assign netclass…**
- Tuning Profile column assigns a tuning profile (see above)

### Component Classes
Assign components to named groups automatically. Enabling **Assign component class per sheet** creates a class per schematic sheet. Custom assignment rules consist of a class name, one or more conditions, and **Match all** / **Match any**:
- Reference (comma-separated, wildcards `*` `?`)
- Footprint (library and identifier, wildcards)
- Side (front, back, or any)
- Rotation
- Footprint Field Value (field name and value, wildcards)
- Sheet
- Custom Expression (DRC condition clause)

Component classes can be referenced in custom DRC rules (e.g. `A.hasComponentClass('Power_Stage')`). The Component Class shown on a footprint in the PCB editor is read-only.

### Custom Rules
Write complex design constraints beyond what basic constraints and net classes support. Custom rules are applied only if there are no errors in the definitions; use **Check Rule Syntax** before closing Board Setup. See [15-advanced-topics.md](./15-advanced-topics.md) for syntax details.

### Violation Severity
Sets the severity of each DRC check: error marker, warning marker, or no marker (Ignore). Setting a check to Ignore completely disables it. Individual violations can instead be excluded in the DRC dialog. See [07-inspecting-a-board.md](./07-inspecting-a-board.md).

## Embedding Files

Files can be embedded inside the board file for improved portability:

- Supported types: fonts, datasheets, 3D models, drawing sheets, SPICE models (other files can be stored but are not used by KiCad)
- Embedded files are referenced with `kicad-embed://` URIs (right-click → **Copy Embedded Reference**)
- Managed in the **Embedded Files** section of Board Setup; the **Embed fonts** checkbox embeds all fonts used in the board
- **Tools → Collect and Embed 3D Models** embeds every external 3D model referenced by the board's footprints

## Importing Settings

Use **Import Settings from Another Board…** (bottom of the dialog) and choose a `.kicad_pcb` file to use as a template:

- Selectable: board layers and physical stackup, solder mask/paste defaults, zone hatched fill offsets, text and graphics defaults, text & graphics formatting, design rule constraints, predefined track & via dimensions, teardrop defaults, length-tuning pattern defaults, net classes, component classes, tuning profiles, custom rules, violation severities
- Useful for applying a company-standard configuration to new projects

## Notes

- Board Setup is the primary location for design intent; DRC enforces the rules configured here
- Constraints are absolute minimums: a net class value below the Constraints minimum is raised to the minimum (e.g. net class clearance 0.1 mm with minimum clearance 0.2 mm gives 0.2 mm). Net classes and custom rules can only set values at or above the minimums; custom rules take precedence over net class values

## Related

- [05-editing-a-board.md](./05-editing-a-board.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
- [15-advanced-topics.md](./15-advanced-topics.md)
