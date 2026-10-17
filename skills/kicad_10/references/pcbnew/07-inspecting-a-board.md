# Inspecting a Board

Tools for verifying design correctness, measuring the board, and analyzing connectivity.

## Design Rules Checking (DRC)

Verifies that the PCB meets the requirements set in Board Setup and that pads are connected according to the netlist or schematic.

**Access:** DRC icon in the top toolbar, or **Inspect → Design Rules Checker**

**DRC Control options:**

| Option | Description |
|--------|-------------|
| Refill all zones before performing DRC | Refills zones on every run; disabling may give incorrect results if zones are not refilled manually |
| Test for parity between PCB and schematic | Also tests for schematic/PCB differences; no effect in standalone PCB editor mode |
| Report all errors for each track (options menu) | Reports all clearance errors per track segment instead of only the first; slower |
| Cross-probe Selected Items (options menu) | Selecting an item or violation moves the cursor to it on the canvas |
| Center on Cross-probe (options menu) | Centers the canvas on the item/marker; no effect if Cross-probe Selected Items is off |

Results are shown in tabs: rule violations, unconnected items, schematic parity differences, and a fourth tab listing ignored tests. **Save…** writes a report as plaintext (`.rpt`) or JSON; `kicad-cli` can produce the same formats.

Right-click actions on a violation:

| Action | Effect |
|--------|--------|
| Exclude this violation | Ignores only this violation; undo with **Remove exclusion for this violation** |
| Exclude with comment… | As above, with a comment (shown when Exclusions are unhidden; edit via **Edit exclusion comment…**) |
| Exclude all violations of rule | Custom-rule violations only; undo with **Remove all exclusions for violations of rule** |
| Change severity | Toggles warning/error for all violations of that type |
| Ignore all | Ignores all violations of that type; moves it to the Ignored Tests tab |
| Edit violation severities… | Opens the Violation Severity panel in Board Setup |

Excluded and ignored violations are remembered between runs. Excluded violations are hidden unless the **Exclusions** checkbox is enabled. **Delete Marker** / **Delete All Markers** clear markers until the next run. Context actions include the clearance/constraint resolution tools and, for library mismatch, Compare Footprint with Library / update from library.

### Clearance and Constraint Resolution

- **Inspect → Clearance Resolution**: select two objects (or pick them when prompted); the Clearance Report shows required clearance per copper layer, the rules responsible, hole clearances, and physical clearances
- **Inspect → Constraints Resolution**: select one object; the Constraints Report shows the constraints that apply

### DRC Configuration

Severity of each check is set in Board Setup → **Violation Severity**: error, warning, or no marker (ignored). Setting a check to Ignore completely disables it.

### DRC Checks and Default Severity

Some checks are only available through custom design rules.

**Electrical**

| Violation | Default |
|-----------|---------|
| Items shorting two nets | Error |
| Tracks crossing | Error |
| Clearance violation (also physical clearance, not configured by default) | Error |
| Creepage violation (creepage constraint in custom rules) | Error |
| Via is not connected or is connected on only one layer | Warning |
| Track has unconnected end | Warning |
| Thermal relief connection to zone incomplete | Error |

**Design for manufacturing**

| Violation | Default |
|-----------|---------|
| Board edge clearance violation | Error |
| Hole clearance violation | Error |
| Drilled hole too close to other hole | Error |
| Drilled holes co-located | Warning |
| Track width | Error |
| Track angle (`track_angle` constraint) | Error |
| Track segment length (`track_segment_length` constraint) | Error |
| Annular width | Error |
| Hole size out of range | Error |
| Micro via hole size out of range | Error |
| Courtyards overlap | Error |
| Footprint has no courtyard defined | Ignore |
| Footprint has malformed courtyard | Error |
| Board has malformed outline | Error |
| Copper sliver | Warning |
| Solder mask aperture bridges items with different nets | Error |
| Copper connection too narrow | Warning |
| Track connected to post-machined or backdrilled layer | Error |
| Track endpoint not centered on via | Warning |
| Tuning profile track geometries | Ignore |

**Schematic parity**

| Violation | Default |
|-----------|---------|
| Duplicate footprints | Warning |
| Missing footprint | Warning |
| Extra footprint | Warning |
| Footprint attributes don't match symbol | Warning |
| Footprint doesn't match symbol's footprint filters | Ignore |
| Pad net doesn't match schematic | Warning |
| Missing connection between items | Error |

**Signal integrity** (all configured via custom rules; all default Error)

| Violation | Constraint |
|-----------|-----------|
| Track length out of range | `length` |
| Skew between tracks out of range | `skew` |
| Too many or too few vias on a connection | `via_count` |
| Differential pair gap out of range | `diff_pair_gap` |
| Differential uncoupled length too long | `diff_pair_uncoupled` |

**Readability**

| Violation | Default |
|-----------|---------|
| Silkscreen clearance | Warning |
| Silkscreen clipped by solder mask | Warning |
| Silkscreen clipped by board edge | Warning |
| Text height out of range | Warning |
| Text thickness out of range | Warning |
| Mirrored text on front layer | Ignore |
| Non-Mirrored text on back layer | Ignore |

**Miscellaneous**

| Violation | Default |
|-----------|---------|
| Items not allowed | Error |
| Copper zones intersect | Error |
| Isolated copper fill | Warning |
| Footprint is not valid | Error |
| Padstack is questionable | Warning |
| PTH inside courtyard | Error |
| NPTH inside courtyard | Error |
| Item on a disabled copper layer | Error |
| Unresolved text variable | Error |
| Footprint component type doesn't match footprint pads | Ignore |
| Footprint field does not match symbol field | Warning |
| Footprint not found in libraries | Warning |
| Footprint doesn't match copy in library | Warning |
| Through hole pad has no hole | Error |

### User-Definable DRC Violations

Place `${DRC_ERROR <violation name>}` or `${DRC_WARNING <violation name>}` at the start of a text item or text box on any board layer. It resolves to an empty string; text after the braces becomes the violation description.

## Board Statistics

Summary of board contents and size. Open with **Inspect → Show Board Statistics**.

- General tab: footprint counts (THT / SMD / unspecified, by board side), pad counts (THT / SMD / connector / NPTH), via counts (through / blind / buried / micro), board dimensions and area, front/back copper area, minimum track width, minimum track clearance, minimum drill diameter
- Options: Subtract holes from board area, Subtract holes from copper areas, Exclude footprints with no pads
- Drill Holes tab: each unique hole type with shape, X/Y size, plating, pad or via type, start/stop layers, and count
- **Generate Report File…** saves the statistics

## Measurement Tool

Activated from the right toolbar or with `Ctrl+Shift+M`. Click to set the start point, click again to finish. Displays the radial distance, the X and Y distances, and the angle from horizontal. Measurements are shown only while the tool is active; use the Dimension tools for permanent dimensions.

## Find Tool

Searches text in the PCB (reference designators, footprint fields, graphic text); zooms and centers on the match. Launch from the top toolbar.

| Option | Description |
|--------|-------------|
| Match case | Case-sensitive search |
| Whole words only | Match only complete words |
| Wildcards | `?` any single character, `*` any number; partial matches are not returned (`abc*` matches `abcd`, `abc` does not) |
| Wrap | Return to first hit after the last |
| Search footprint reference designators | Include reference designators |
| Search footprint values | Include value fields |
| Include hidden fields | Include hidden footprint fields |
| Search other text items | Graphical text and footprint fields other than value and reference |
| Search DRC markers | Violation descriptions of DRC markers |
| Search net names | Net names |

## Search Panel

Docked panel listing footprints, zones (copper zones and rule areas), nets, ratsnest lines, text items, groups, and drills. Toggle with **View → Panels → Search** or `Ctrl+G`.

- Optional filter string: wildcards (`*`, `?`) and regular expressions (e.g. `/footprint value/`)
- Footprints filter by field contents (hidden fields via **Search Hidden Fields**, metadata via **Search Metadata**, in the options menu); zones by name; nets/ratsnest by net name; text by content; groups by name; drills by any column
- Click a column header to sort; clicking an item selects it on the canvas (pan/zoom depends on the options menu); double-click opens its properties dialog (net classes dialog for net and ratsnest items)

## 3D Viewer

Shows the board and components in 3D. Open with **View → 3D Viewer** or `Alt+3`. A component model appears only if the 3D model file exists and is assigned to the footprint.

- Navigation: left-drag orbits; mouse wheel zooms; `Ctrl`+wheel pans horizontally, `Shift`+wheel vertically; middle-drag pans; `Space` over a point resets the pivot
- 3D Navigator widget (six spheres: Front, Back, Left, Right, Top, Bottom); toggle with **Preferences → Show 3D Navigator**
- **View → 3D Grid** sets grid size; **Preferences → Show Model Bounding Boxes**
- Selecting a footprint in the PCB editor highlights it in the 3D Viewer (color: Preferences → Preferences… → 3D Viewer → Realtime Renderer → Selection Color)
- Appearance Manager: visibility, color, opacity; options *use board stackup colors* and *use PCB editor copper colors*; presets ("Follow PCB Editor", "Follow PCB Plot Settings", "legacy colors"; `Ctrl+Tab` cycles) and viewports (`Shift+Tab` cycles)
- **File → Export Image…** saves an image; **Edit → Copy 3D Image to Clipboard**; raytracing via toolbar button or **Preferences → Raytracing** (3D grid and selection highlights are not shown in raytracing mode)
- 3D model export formats (STEP, GLB, etc.) belong to the PCB editor output tools; see [09-generating-outputs.md](./09-generating-outputs.md)

## Net Inspector

Docked panel with statistics for all nets; can add, delete, and rename nets. Open with the icon at the top of the Nets section of the Appearance panel, or **View → Panels → Net Inspector**.

- Columns: Pad Count, Via Count, Via Length (Via Count × stackup height), Track Length (sum of all segments, also per copper layer), Die Length (sum of Pad to Die Length)
- Double-click a net, or right-click → **Highlight Selected Net**, to highlight; **Clear Net Highlighting** removes it
- Filter box matches net names and net class names (toggle **Filter by Net Name** / **Filter by Netclass**); **Show Unconnected Nets** and **Show Zero Pad Nets** are off by default
- Grouping: **Group by netclass**, **Add Custom Group** (case-insensitive name pattern; `/regex/` also supported), **Remove Selected Custom Group**, **Remove All Custom Groups**
- Editing: right-click → **Add Net**, **Delete Selected Net**, **Rename Selected Net**. Nets are normally defined in the schematic; edits made here do not reach the schematic until back-annotation
- **Save Net Inspector Report** writes a CSV of all nets and columns
- Lengths can differ from the length tuner: the Net Inspector sums every segment (including all branches) and always includes effective via height; the length tuner measures a point-to-point electrical length and includes via height only when *Include stackup height in track length calculations* is enabled

## Notes

- Run DRC before generating fabrication outputs to catch violations
- Setting a check to Ignore in Violation Severity disables it entirely; use Exclude to ignore only individual violations
- Status-bar DRC-currency indicator and real-time 3D Viewer updates: not found in the 10.0 manual

## Related

- [04-board-setup.md](./04-board-setup.md)
- [09-generating-outputs.md](./09-generating-outputs.md)
- [15-advanced-topics.md](./15-advanced-topics.md)
