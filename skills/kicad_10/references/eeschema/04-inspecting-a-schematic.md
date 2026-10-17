# Inspecting a Schematic

Tools for examining and validating a schematic design before moving to PCB layout.

## Find Tool

Search for schematic elements by name or reference designator. The tool highlights and navigates to matching items. Options: Match case, Whole words only, Regular Expression, Search pin names and numbers, Search net names, Include hidden fields, Search the current sheet only, Search the current selection only. Find and Replace adds Replace matches in reference designators.

## Search Panel

A docked panel for filtering and locating elements across all sheets. Displays all matches and allows quick navigation between occurrences.

## Net Highlighting

Use the Highlight Net tool (click a wire or pin) or the `` ` `` hotkey to highlight a net (pink by default). If **Highlight cross-probed nets** is enabled in Display Options, the PCB Editor highlights the same net. Clear with `~`, the tool on empty space, or `Esc` (default).

## Net Navigator

A panel listing all nets in the schematic. Select a net to highlight its elements. Useful for tracing signal paths across sheets.

## Cross-Probing from the PCB

When both the Schematic Editor and PCB Editor are open, selection cross-probing (enabled by default, can be disabled in Display Options) selects the corresponding footprint / pad and vice versa; the 3D Viewer also cross-probes.

## Electrical Rules Checking (ERC)

ERC validates the design against electrical rules. Open it via **Inspect** → **Electrical Rules Checker** or the ERC button on the top toolbar.

### Running ERC

Click the ERC toolbar button, then **Run ERC**. Violations appear in the **Violations** tab, with markers placed in the schematic (yellow arrow = warning, red arrow = error, green arrow = excluded). Ignored tests are listed in the **Ignored Tests** tab. **Save…** writes a plain-text report (`.rpt`); `kicad-cli` can also produce text or JSON reports. **Delete Marker** / **Delete All Markers** clear violations until the next run; the error / warning / exclusion counts at the bottom double as filter checkboxes.

### Configuration

Severities (Error / Warning / Ignore) are set in **Schematic Setup** → **Violation Severity**. Which pin-type pairings conflict is set in **Schematic Setup** → **Pin Conflicts Map** (click a cell to cycle allowed / warning / error; by default output-to-output is an error). The **Show all errors** option reports every per-net error instead of one marker per net.

### Checks and Default Severities

Connections:

| Violation | Default |
|-----------|---------|
| Pin not connected | Error |
| Input pin not driven by any Output pins | Error |
| Input Power pin not driven by any Output Power pins | Error |
| A pin with a "no connection" flag is connected | Warning |
| Unconnected "no connection" flag | Warning |
| Label not connected | Error |
| Label connected to only one pin | Warning |
| Global label only appears once in the schematic | Ignore |
| Local and global labels have the same name | Warning |
| Wires not connected to anything | Error |
| Bus Entry needed (EAGLE imports only) | Error |
| Symbol pin or wire end off connection grid | Warning |
| Four connection points are joined together | Ignore |
| Duplicate pins with different nets | Error (not configurable) |
| Label connects more than one wire | Warning |
| Unconnected wire endpoint | Warning |

Conflicts:

| Violation | Default |
|-----------|---------|
| Duplicate reference designators | Error |
| Units of same symbol have different values | Error |
| Different footprint assigned in another unit of the symbol | Error |
| Different net assigned to a shared pin in another unit of the symbol | Error |
| Duplicate sheet names within a given sheet | Error |
| Mismatch between hierarchical labels and sheet pins | Error |
| More than one name given to this bus or net | Warning |
| Conflict between bus alias definitions across schematic sheets | Error |
| Buses are graphically connected but share no bus members | Error |
| Invalid connection between bus and net items | Error |
| Net is graphically connected to a bus but not a bus member | Warning |
| Ground pin not connected to ground net | Warning |

Miscellaneous:

| Violation | Default |
|-----------|---------|
| Pin name resembles stacked pin | Warning |
| Field name has leading or trailing whitespace | Warning |
| Symbol is not annotated | Error |
| Unresolved text variable | Error |
| Undefined netclass | Error |
| SPICE model issue | Ignore |
| Labels are similar (lower/upper case difference only) | Warning |
| Power pins are similar (lower/upper case difference only) | Warning |
| Power pin and label are similar (lower/upper case difference only) | Warning |
| Library symbol issue | Warning |
| Symbol doesn't match copy in library | Warning |
| Footprint link issue | Warning |
| Assigned footprint doesn't match footprint filters | Warning |
| Symbol has more units than are defined | Error |
| Symbol has units that are not placed | Warning |
| Symbol has input pins that are not placed | Warning |
| Symbol has bidirectional pins that are not placed | Warning |
| Symbol has power input pins that are not placed | Error |
| Conflict problem between pins | From Pin Conflicts Map |

### Fixing Common Issues

| Issue | Fix |
|-------|-----|
| Unconnected pin | Wire to a net or add a no-connect flag (Q) |
| Input Power pin not driven | Add a PWR_FLAG symbol to the net (or connect any Output Power pin) |
| Conflicting drivers | Check net connectivity; remove unintended connections |
| Label not connected | Verify label name spelling; connect to correct net |

### Suppressing Violations

Right-click a violation in the ERC dialog: **Exclude this violation**, **Exclude with comment…**, **Change severity** (affects all violations of that type), **Ignore all** (moves the test to the Ignored Tests tab), or **Edit violation severities…** (opens Schematic Setup). **Inspect** → **Exclude Marker** excludes the selected marker. Excluded violations stay hidden unless the **Exclusions** checkbox is enabled. A pin with a no-connect flag is not reported as unconnected.

### User-Defined Violations

Put `${ERC_ERROR <name>}` or `${ERC_WARNING <name>}` at the start of a text item, text box, or field to raise a violation named `<name>`; text after the braces becomes its description.

## Notes

- Cross-probing requires both editors to be running; launch PCB Editor via **Tools** → **Update PCB from Schematic** or open the `.kicad_pcb` file directly.
- ERC does not validate design intent, only electrical rule conformance. Always review results manually.
- Not found in the 10.0 manual: the Fixing Common Issues table, an ERC scope choice ("all sheets or current sheet") in the ERC dialog; the earlier violation names "Missing power source flag", "Pin type mismatch", and "Duplicate net names on a bus" are not manual check names (see the tables above).
- Hotkeys: Highlight Net `` ` ``, Clear Net Highlight `~`, Search panel `Ctrl+G` (**View** → **Panels** → **Search**), Net Navigator under **View** → **Panels** → **Net Navigator**.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
