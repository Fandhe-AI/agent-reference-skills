# Inspecting a Board

Tools for verifying design correctness, measuring the board, and analyzing connectivity.

## Design Rules Checking (DRC)

Automatically detects rule violations across the entire board.

**Access:** Inspect menu or toolbar → **Design Rules Checker**

**Violation categories:**

| Category | Examples |
|----------|---------|
| Clearance | Copper-to-copper, copper-to-board-edge |
| Width | Track too narrow, via annular ring too small |
| Connectivity | Missing connections, unconnected nets |
| Courtyard | Overlapping courtyard areas |
| Mask/paste | Solder mask opening issues |
| Custom rules | Violations of user-defined DRC rules |

Individual violations can be suppressed (ignored) without disabling the entire rule type.

## Board Statistics

Provides quantitative design summary:
- Component counts
- Total track length
- Via counts
- Copper area calculations

Access via **Inspect → Board Statistics**.

## Measurement Tool

Interactive point-to-point distance measurement:
- Select two points on the canvas
- Status bar displays direct distance and X/Y coordinate differences

## Find Tool

Searches for board items by:
- Reference designator
- Net name
- Other identifying properties

Quickly locates specific components or nets in large designs.

## Search Panel

Dedicated panel for comprehensive filtering and searching across board elements. Supports multiple simultaneous search criteria for efficient navigation.

## 3D Viewer

Interactive 3D visualization of the PCB assembly (**View → 3D Viewer**):
- Full component model display
- Rotate, pan, zoom inspection
- Export 3D models in STEP, GLB, BREP, and other formats
- Responds to cross-probing selections from the PCB editor

## Net Inspector

Detailed examination of electrical nets:
- Displays net connectivity and statistics
- Highlights net paths on the board
- Enables net-specific analysis and visualization

Access via **Inspect → Net Inspector**.

## Notes

- Run DRC before generating fabrication outputs to catch violations
- DRC results persist until the next run; the indicator in the status bar shows whether DRC is current
- The 3D Viewer updates in real time as the board changes (or on demand)

## Related

- [04-board-setup.md](./04-board-setup.md)
- [09-generating-outputs.md](./09-generating-outputs.md)
- [15-advanced-topics.md](./15-advanced-topics.md)
