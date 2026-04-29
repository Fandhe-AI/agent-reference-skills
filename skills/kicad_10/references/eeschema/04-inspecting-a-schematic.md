# Inspecting a Schematic

Tools for examining and validating a schematic design before moving to PCB layout.

## Find Tool

Search for schematic elements by name or reference designator. The tool highlights and navigates to matching items. Supports wildcards and various search parameters for complex designs.

## Search Panel

A docked panel for filtering and locating elements across all sheets. Displays all matches and allows quick navigation between occurrences.

## Net Highlighting

Select a wire or label to highlight all objects on the same net with a distinctive color. If the PCB Editor is also open, the corresponding copper is highlighted simultaneously. Clear highlights via a dedicated hotkey or toolbar button.

## Net Navigator

A panel listing all nets in the schematic. Select a net to highlight its elements. Useful for tracing signal paths across sheets.

## Cross-Probing from the PCB

When both the Schematic Editor and PCB Editor are open, selecting elements in one editor automatically highlights corresponding elements in the other. This bidirectional synchronization helps verify that layout matches schematic intent.

## Electrical Rules Checking (ERC)

ERC automatically validates the design against electrical rules. Access via **Inspect** menu or the ERC toolbar button.

### Running ERC

Launch the ERC dialog, choose scope (all sheets or current sheet), and click **Run ERC**. The dialog lists all violations with severity (Error / Warning) and location.

### Violation Types

**Connection issues:**
- Unconnected pins (pin with no net)
- Unconnected labels (label not attached to a pin or wire)
- Missing power source flag — net has power input pins but no power output or PWR_FLAG

**Net driver conflicts:**
- Multiple conflicting drivers on the same net (e.g., two outputs connected)
- Pin type mismatch between connected pins

**Bus issues:**
- Inconsistent bus alias member definitions across sheets
- Duplicate net names on a bus

### Fixing Common Issues

| Issue | Fix |
|-------|-----|
| Unconnected pin | Wire to a net or add a no-connect flag (X) |
| Missing PWR_FLAG | Add a PWR_FLAG symbol to the power net |
| Conflicting drivers | Check net connectivity; remove unintended connections |
| Unconnected label | Verify label name spelling; connect to correct net |

### Suppressing Violations

Individual violations can be acknowledged/ignored. No-connect flags suppress unconnected-pin warnings for intentionally open pins.

## Notes

- Cross-probing requires both editors to be running; launch PCB Editor via **Tools** → **Update PCB from Schematic** or open the `.kicad_pcb` file directly.
- ERC does not validate design intent, only electrical rule conformance. Always review results manually.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Forward and Back Annotation](./06-forward-and-back-annotation.md)
