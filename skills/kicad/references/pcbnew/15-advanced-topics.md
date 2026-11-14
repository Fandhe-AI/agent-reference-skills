# Advanced Topics

Configuration, text automation, custom design rules, scripting, and IDF component outlines.

## Configuration and Customization

Access via **Preferences → Preferences…**. PCB Editor preferences are stored per KiCad minor version. The first sections (Common, Mouse and Touchpad, Hotkeys) are shared by all KiCad programs.

| Page | Options |
|------|---------|
| Display options | Rendering Engine (Accelerated / Fallback graphics), Grid style, Grid thickness, Min grid spacing, Snap to grid (Always / When grid shown), Cursor shape, Always show crosshairs, Net names, Show pad numbers, Show pad `<no net>` indicator, Track clearance, Show pad clearance, Center view on cross-probed items, Zoom to fit cross-probed items, Highlight cross-probed nets |
| Editing options | Flip board items L/R, Step for rotate commands, Allow free pads, Magnetic points (Snap to pads / tracks / graphics; object snapping takes precedence over grid snapping and works on the active layer), Always show selected ratsnest, Show ratsnest with curved lines, Mouse drag track behavior (Move / Drag (45 degree mode) / Drag (free angle)), Limit actions to 45 degrees from start, Show page limits, Refill zones after Zone Properties dialog |
| Colors | Themes "KiCad Default" (default) and "KiCad Classic" (neither editable); New Theme…, Open Theme Folder, Reset to Default; themes are JSON files in the `colors` subfolder of the configuration directory |
| Action plugins | Python plugins; Show button control, ordering arrows, plugin folder, refresh; hidden plugins remain in **Tools → External Plugins** |
| Origin & axes | Display origin (page, drill/place file, or grid origin), X axis direction, Y axis direction |

Hotkey configuration is stored in `user.hotkeys` (see [01-introduction.md](./01-introduction.md)).

## Text Variables

Reference predefined variables with `${VARIABLENAME}` in schematic and PCB text, symbol and footprint text and fields, drawing sheet fields, custom DRC rules, and other text. Project text variables are defined in the Schematic Setup or Board Setup dialogs and are shared by the whole project.

```
Version: ${VERSION}
```

Built-in system variables (availability depends on context):

| Variable | Description |
|----------|-------------|
| `ADDR`, `CELL(<row>, <col>)`, `COL`, `ROW` | Table cell address, content, column, row (zero-indexed; table cells only) |
| `COMMENT1` - `COMMENT9`, `COMPANY`, `ISSUE_DATE`, `REVISION`, `TITLE` | Drawing sheet fields |
| `CURRENT_DATE`, `CURRENT_TIME_HH_MM_SS`, `CURRENT_TIME_LOCALE` | Date (ISO) and time (`14h30m45s`, filename-safe, or locale) |
| `FILENAME`, `FILEPATH`, `PROJECTNAME` | Board file name, full path, project name |
| `KICAD_VERSION`, `PAPER` | Drawing sheet fields only |
| `LAYER` | Layer of the object (not available in DRC rules) |
| `VARIANT`, `VARIANT_DESC` | Active design variant name / description (empty for default) |
| `VCSHASH`, `VCSSHORTHASH` | Git commit hash (full / 8 characters); "no hash" outside Git |
| `<fieldname>`, `<refdes>:<fieldname>` | Footprint field values, e.g. `${VALUE}`, `${U1:VALUE}`; built-in footprint fields: `FOOTPRINT_LIBRARY`, `FOOTPRINT_NAME`, `LAYER`, `NET_CLASS(<pad_number>)`, `NET_NAME(<pad_number>)`, `PIN_NAME(<pad_number>)`, `REFERENCE`, `SHORT_NET_NAME(<pad_number>)`, `VALUE` |
| `DRC_ERROR <name>`, `DRC_WARNING <name>` | Generate a DRC error/warning; must be at the start of the text item |

## Text Expressions

Evaluated with the `@{expression}` syntax; the whole `@{...}` is replaced by the result, or left as-is if it cannot be evaluated. Expressions may be nested, combined with text variables, use scientific notation (`@{2e3 + 1}` = 2001), and units (results are printed in SI units without the unit: `@{1mm + 1in}` = 26.4). Strings use single or double quotes; `+` or `concat` concatenates.

```
@{max(abs(${var}), 5)}
```

Arithmetic operators: `+ - * / % ^` (`^` right-associative; division and modulo by zero are not evaluated). Boolean operators `< <= > >= == !=` evaluate to 1 or 0.

| Function | Description / example |
|----------|-----------------------|
| `abs(x)` | absolute value; `@{abs(-1)}` = 1 |
| `sqrt(x)` | square root (not evaluated if x < 0) |
| `pow(x, y)` | x to the power y |
| `floor(x)` / `ceil(x)` | `@{floor(3.7)}` = 3 / `@{ceil(3.2)}` = 4 |
| `round(x, [precision])` | `@{round(3.14159, 2)}` = 3.14; no precision = nearest integer |
| `min(...)` / `max(...)` / `sum(...)` / `avg(...)` | comma-separated values; `@{avg(2, 4, 6)}` = 4 |
| `random()` | 0 (inclusive) to 1 (exclusive) |
| `shunt(r1, r2)` | parallel resistance (r1*r2)/(r1+r2); `@{shunt(10k, 10k)}` = 5000 |
| `db(ratio)` / `dbv(ratio)` | 10*log10(ratio) / 20*log10(ratio) |
| `fromdb(db)` / `fromdbv(db)` | 10^(db/10) / 10^(db/20) |
| `enearest(value, [series])`, `eup(...)`, `edown(...)` | nearest / next higher / next lower E-series value; series "E3", "E6", "E12", "E24" (default), "E48", "E96", "E192"; `@{enearest(5)}` = 5.1, `@{edown(5)}` = 4.7 |
| `if(condition, true_value, false_value)` | `@{if(1 < 2, 5, 10)}` = 5 |
| `upper(str)` / `lower(str)` | case conversion |
| `concat(...)` | concatenates strings and numbers (also `+`) |
| `beforefirst(str, c)`, `beforelast`, `afterfirst`, `afterlast` | substring around first/last occurrence of character c; `@{afterlast("hello.world.txt", ".")}` = txt |
| `format(num, [precision])` = `fixed(num, [precision])` | rounded string, default 2 places; `@{format(1234.5)}` = 1234.50 |
| `currency(amount, [symbol])` | default symbol `$`; `@{currency(999.99, "€")}` = €999.99 |
| `today()` | days since the Unix epoch |
| `now()` | seconds since the Unix epoch |
| `dateformat(days, [format])` | formats "ISO" (default), "US", "EU", "Chinese", "Japanese", "long", "short" |
| `weekdayname(days)` | `@{weekdayname(0)}` = Thursday |
| `timeformat(seconds, [format])` | "24h", "12h", "ISO" (default, = "24h"), "HH_MM_SS" (= "filename"), "short" |

Version control functions (Git only; `<unknown>` outside a repository): `vcsidentifier([length])` (default 40, minimum 4), `vcsbranch()`, `vcsauthor()`, `vcsauthoremail()`, `vcscommitter()`, `vcscommitteremail()`, `vcscommitdate([format])`, `vcsnearestlabel([match], [anyTags])`, `vcslabeldistance([match], [anyTags])`, `vcsdirty([includeUntracked])` (1/0), `vcsdirtysuffix([suffix], [includeUntracked])` (default `-dirty`), `vcsfileidentifier(file, [length])`, `vcsfileauthor(file)`, `vcsfileauthoremail(file)`, `vcsfilecommitter(file)`, `vcsfilecommitteremail(file)`, `vcsfilecommitdate(file, [format])`.

## Graphical Design Rule Editor

Create and manage rules with form controls; open with **Tools → Design Rule Editor**. Rules are stored in the same `.kicad_dru` file as text rules and the two editors can be mixed. Rules follow the same evaluation order as the underlying `.kicad_dru` file, i.e. reverse file order (see Custom Design Rules).

- Rule tree categories: Electrical, Manufacturability, Highspeed design, Footprints, Custom
- Rule panel: Rule name, Comment, constraint values (diagram), Conditions (Any, Net, Netclass, Within Area, Custom Query; combined with AND, OR, AND NOT, OR NOT, evaluated left to right), Layer (Any, specific layer, Outer, Inner), **Show Matches**, Save / Discard
- Footprints constraints (Permitted layers, Allowed orientation) use `assertion` internally and appear as "Assertion violation" errors

## Custom Design Rules

Stored in the `.kicad_dru` file next to `.kicad_pcb` and `.kicad_pro` (keep it under version control; edit only through the Custom Rules page of Board Setup, which has a syntax checker, syntax help, and autocomplete via `Ctrl+Space`). Any syntax error prevents the design rule checker from running (and custom rules from being applied).

Syntax (s-expressions): the file starts with `(version 1)` in KiCad 10.0. Comments start with `#` (`Ctrl+/` toggles).

```
(version 1)
(rule <name>
    [(severity <severity>)]
    [(layer <layer_name>)]
    [(condition <expression>)]
    (constraint <constraint_type> [constraint_arguments]))
```

- **Evaluation order**: rules are evaluated in reverse order (the last rule in the file is checked first); the first match for a set of objects ends checking. Put more specific rules later in the file
- **layer**: any board layer name, `outer` (F.Cu and B.Cu), `inner`; omitted = all layers
- **severity**: `error`, `warning`, `ignore`, `exclusion`. Ignored rules are still evaluated (and can still override earlier rules) but their effects are disabled
- **condition**: boolean expression over objects `A` and `B` (and `AB` for functions testing both), e.g. `A.NetName == 'VDD'`; operators `== != > >= < <= && || !` with equal precedence left to right; unit suffixes `mm`, `mil`/`th`, `in`/`"`, `deg`, `rad`; nullable properties compare with `null`; booleans are tested directly (`A.Do_not_populate`, `!A.Do_not_populate`)
- **constraint**: min/opt/max values written `(min 0.5mm)`, `(opt ...)`, `(max ...)`; math allowed (`(min 0.5mm + 0.1mm)`)
- Text variables resolve before evaluation; object-dependent ones (`${LAYER}`, `${<fieldname>}`) cannot be used

```
(rule HV
    (condition "A.hasNetclass('HV')")
    (constraint clearance (min 1.5mm)))
```

| Constraint type | Arguments |
|-----------------|-----------|
| `annular_width` | min/max |
| `assertion` | boolean expression |
| `bridged_mask` | none (use with severity) |
| `clearance` | min (negative allows overlap) |
| `connection_width` | min |
| `courtyard_clearance` | min |
| `creepage` | min |
| `diff_pair_gap` | min/opt/max |
| `diff_pair_uncoupled` | max |
| `disallow` | `track` `via` `through_via` `micro_via` `blind_via` `buried_via` `pad` `zone` `text` `graphic` `hole` `footprint` |
| `edge_clearance` | min |
| `hole_clearance` | min |
| `hole_size` | min/opt/max |
| `hole_to_hole` | min |
| `length` | min/opt/max |
| `min_resolved_spokes` | 0 to 4 |
| `physical_clearance` | min |
| `physical_hole_clearance` | min |
| `silk_clearance` | min |
| `skew` | min/opt/max/within_diff_pairs |
| `solder_mask_expansion` | opt |
| `solder_paste_abs_margin` / `solder_paste_rel_margin` | opt |
| `text_height` / `text_thickness` | min/max |
| `thermal_relief_gap` | min |
| `thermal_spoke_width` | opt |
| `track_angle` | min/max |
| `track_segment_length` | min/max |
| `track_width` | min/opt/max |
| `via_count` | min/max |
| `via_dangling` | none (use with severity) |
| `via_diameter` | min/opt/max |
| `zone_connection` | `solid` `thermal_reliefs` `none` |

### Object properties

Distances are `dimension` (nanometers without a unit suffix). Property names are listed as in the manual's tables (e.g. `Do_not_Populate`); case sensitivity of property names: not found in the 10.0 manual.

| Group | Properties (type) |
|-------|-------------------|
| Common (all objects) | `Layer` (string; first layer for multi-layer objects), `Locked` (bool), `Parent` (string), `Position_X`, `Position_Y` (dimension), `Type` ("Bitmap", "Dimension", "Footprint", "Graphic", "Group", "Leader", "Pad", "Target", "Text", "Text Box", "Track", "Via", "Zone") |
| Connected copper (pads, vias, zones, tracks) | `Net` (integer net code; faster for A.Net == B.Net), `NetClass` (priority-ordered comma list; equals any member or the full ordered list), `NetName`, teardrop: `Curved_Edges`, `Enable_Teardrops`, `Prefer_Zone_Connections`, `Allow_Teardrops_To_Span_Two_Tracks` (bool), `Best_Length_Ratio`, `Best_Width_Ratio`, `Max_Width_Ratio` (double), `Max_Length`, `Max_Width` (dimension) |
| Footprint (children such as pads inherit Reference, Value, Component_Class) | `Clearance_Override`, `Solderpaste_Margin_Override`, `Solderpaste_Margin_Ratio_Override`, `Thermal_Relief_Gap`, `Thermal_Relief_Width` (dimension), `Component_Class` (alphabetical comma list), `Do_not_Populate`, `Exclude_From_Position_Files`, `Exclude_From_Bill_of_Materials`, `Exempt_From_Courtyard_Requirement`, `Not_in_Schematic` (bool), `Keywords`, `Library_Description`, `Library_Link` (`library:footprint`), `Reference`, `Value` (string), `Orientation` (double, degrees), `Zone_Connection_Style` ("Inherited", "None", "Thermal reliefs", "Solid") |
| Pad | `Clearance_Override`, `Hole_Size_X`, `Hole_Size_Y`, `Pad_To_Die_Length`, `Size_X`, `Size_Y`, `Soldermask_Margin_Override`, `Solderpaste_Margin_Override`, `Solderpaste_Margin_Ratio_Override`, `Thermal_Relief_Gap`, `Thermal_Relief_Spoke_Angle`, `Thermal_Relief_Spoke_Width` (dimension), `Fabrication_Property` ("None", "BGA pad", "Fiducial, global to board", "Fiducial, local to footprint", "Test point pad", "Heatsink pad", "Castellated pad"), `Orientation`, `Corner_Radius_Ratio` (double), `Pad_Number`, `Pin_Name` (string), `Pad_Shape` ("Circle", "Rectangle", "Oval", "Trapezoid", "Rounded rectangle", "Chamfered rectangle", "Custom"), `Pad_Type` ("Through-hole", "SMD", "Edge connector", "NPTH, mechanical"), `Pin_Type` ("Input", "Output", "Bidirectional", "Tri-state", "Passive", "Free", "Unspecified", "Power input", "Power output", "Open collector", "Open emitter", "Unconnected"; `+no_connect` suffix, match with `"passive*"`), `Zone_Connection_Style` |
| Track and arc | `Origin_X`, `Origin_Y`, `End_X`, `End_Y`, `Width` (dimension) |
| Via | `Diameter`, `Hole` (dimension), `Layer_Top`, `Layer_Bottom` (string), `Via_Type` ("Blind", "Buried", "Micro", "Through") |
| Tuning pattern | `End_X`, `End_Y`, `Min_Amplitude`, `Max_Amplitude`, `Min_Spacing`, `Target_Length`, `Target_Skew` (dimension), `Tuning_Mode` ("Single track", "Differential pair", "Diff pair skew"), `Initial_Side` ("Left", "Right", "Default"), `Corner_Radius_%` (integer), `Override_Custom_Rules`, `Single-sided`, `Rounded` (bool) |
| Zone and rule area | `Clearance_Override`, `Hatch_Gap`, `Hatch_Width`, `Min_Width`, `Thermal_Relief_Gap`, `Thermal_Relief_Width` (dimension), `Hatch_Minimum_Hole_Ratio` (float), `Hatch_Orientation`, `Priority` (integer), `Name` (string), `Pad_Connections` ("Inherited", "None", "Thermal reliefs", "Solid", "Thermal Reliefs for PTH") |
| Graphic shape | `Angle`, `End_X`, `End_Y`, `Line_Width`, `Start_X`, `Start_Y` (dimension), `Filled` (bool), `Line_Style` ("Solid", "Dashed", "Dotted", "Dash-Dot", "Dash-Dot-Dot"), `Shape` ("Segment", "Rectangle", "Arc", "Circle", "Polygon", "Bezier") |
| Text | `Bold`, `Italic`, `Knockout`, `Mirrored`, `Visible` (bool), `Height`, `Thickness`, `Width` (dimension), `Horizontal_Justification` ("Left", "Center", "Right"), `Vertical_Justification` ("Top", "Center", "Bottom"), `Name` (footprint field name, else empty), `Text` |

### Expression functions (objects `A` and/or `B`; `AB` where noted)

| Function | Description |
|----------|-------------|
| `enclosedByArea('x')` | all of the object inside the named rule area or zone (slower than `intersectsArea`) |
| `existsOnLayer('layer_id')` | object exists on the named board layer |
| `fromTo('x', 'y')` | object lies on the copper path between pads (`'RefDes-PadNumber'`, e.g. `'U1-A5'`, or `'U1'` for all pads; `*` and `?` wildcards, case-insensitive) |
| `getField('x')` | value of footprint field x (footprints only) |
| `hasComponentClass('x')` | object's (or parent footprint's) classes contain x |
| `hasExactNetclass('x')` / `hasNetclass('x')` | net class set equals / contains x |
| `inDiffPair('x')` | object in a differential pair with base name x (wildcards; false if no opposite-polarity net exists) |
| `insideArea('x')` | deprecated; use `intersectsArea` |
| `insideCourtyard('x')`, `insideFrontCourtyard`, `insideBackCourtyard` | deprecated; use `intersectsCourtyard`, `intersectsFrontCourtyard`, `intersectsBackCourtyard` |
| `intersectsArea('x')` | any part of the object inside the named rule area or zone (for filled zones, the filled copper regions) |
| `intersectsCourtyard('x')` (+ Front/Back variants) | any part inside the courtyard of footprint x: reference with wildcards, `library:name` with wildcards, or `${Class:ClassName}` |
| `isBlindVia()`, `isBuriedVia()`, `isBlindBuriedVia()`, `isMicroVia()`, `isPlated()` | via/hole type tests |
| `isCoupledDiffPair()` (AB) | A and B are opposite polarities of one differential pair |
| `memberOf('x')` | deprecated; use `memberOfGroup('x')` |
| `memberOfGroup('x')` | member of group x |
| `memberOfFootprint('x')` | member of footprint x (reference, `library:name`, or `${Class:ClassName}`) |
| `memberOfSheet('x')` | member of schematic sheet x (wildcards; children not included) |
| `memberOfSheetOrChildren('x')` | member of sheet x or its child sheets |

**From-To paths** (`A.fromTo('U1-C5', 'U2-D3')`) scope length, skew, track_width, clearance, and diff_pair_gap constraints to the copper path (tracks, vias, pads) between two pads rather than the whole net. A pattern that matches several connected pads on the same net creates no path, so patterns must identify one pad at each end.

```
(rule "DDR_CLK length"
    (condition "A.fromTo('U1-C5', 'U2-D3')")
    (constraint length (min 20mm) (max 25mm)))
```

## Scripting

Python 3 is required (KiCad 6+). Scripts can run interactively or as "action plugins" (toolbar icons); Footprint Wizard API for the footprint editor. The pcbnew API is not stable across versions; consult the Doxygen docs for the matching KiCad version.

- **Console**: toolbar button in the PCB Editor; the API is not preloaded, so run `import pcbnew` first
- **Plugins**: install via the Plugin and Content Manager or copy each plugin into its own folder in the plugins folder (Linux `~/.local/share/kicad/10.0/scripting/plugins`, macOS `~/Documents/KiCad/10.0/scripting/plugins`, Windows `%USERPROFILE%\Documents\KiCad\10.0\scripting\plugins`). Inheriting `pcbnew.ActionPlugin` makes an action plugin; `FootprintWizardBase.FootprintWizard` makes a footprint wizard
- **Board access**: `pcbnew.GetBoard()` returns the open `BOARD`; `board.GetFootprints()`, `board.GetDrawings()`, `board.GetTracks()` (tracks and vias), `board.GetZones()`, `board.GetNetClasses()`; `LoadBoard(filename)`, `SaveBoard(filename, board)`, `board.Save(filename)`

```python
import pcbnew
board = pcbnew.GetBoard()
footprints = board.GetFootprints()
```

Standalone script examples from the manual: `LoadBoard(filename)` then `pcb.GetFootprints()`, `fp.Value().SetVisible(False)`, `fp.Reference().SetVisible(True)`, `pcb.Save("mod_" + filename)`; `pcb.FindFootprintByReference('U304')` with `fp.Pads()`, `p.GetPadName()`, `p.GetLocalSolderPasteMargin()` / `p.SetLocalSolderPasteMargin(0)`, `ToMM(...)`; library enumeration via `PCB_IO_MGR.GuessPluginTypeFromLibPath(libpath)`, `PCB_IO_MGR.PluginFind(src_type)`, `plugin.FootprintEnumerate(libpath)`, `plugin.FootprintLoad(libpath, name)`; board inspection with `pcb.GetTracks()` (`PCB_VIA` / `PCB_TRACK`), `pcb.GetDrawings()` (`PCB_TEXT` / `PCB_SHAPE`), `pcb.GetNetCount()`, `pcb.GetTrackWidthList()`, `pcb.GetViasDimensionsList()`, `pcb.GetAreaCount()` / `pcb.GetArea(idx)`, `pcb.GetAllNetClasses()`.

**Action plugins** associate a script with a button; they appear in **Tools → External Plugins** and optionally the toolbar (Action Plugins preferences page). Subclass `pcbnew.ActionPlugin`, define `defaults(self)` (set `self.name`, `self.category`, `self.description`) and `Run(self)`, then call `<ClassName>().register()`.

**Footprint wizards** subclass `FootprintWizardBase.FootprintWizard`, define the six required functions `GetName()`, `GetDescription()`, `GetValue()`, `GenerateParameterList()` (parameters via `self.AddParam("page", "name", self.uMM, default)`), `CheckParameters()` (reads `self.parameters["page"]["name"]`), and `BuildThisFootprint()`, then call `<ClassName>().register()` (end of file or `__init__.py`). KiCad does not reload a plugin after it raised an error; restart KiCad.

## IDF Component Outlines

Used by the IDF exporter (`.emn` board and `.emp` library files) to give mechanical designers component outlines. Attach an IDF outline (`*.idf`) in the footprint's 3D Models tab using the IDF filetype filter; only the offset values (in IDF output units, mm or mils, IDF coordinate system) and Z rotation (degrees, counter-clockwise positive) are used. IDF models do not conflict with 3D models for other purposes. An outline file contains a single `.ELECTRICAL` or `.MECHANICAL` section, optionally preceded by comment lines (7-bit ASCII only). Command-line tools shipped with KiCad help to generate outline files.

Outline file format: record 1 is the section heading; record 2 has four fields (Geometry Name, Part Number, IDF Unit `MM` or `THOU`, Height); record 3 entries give the outline with four fields (Loop Index 0 = counter-clockwise or 1 = clockwise, X, Y, Included Angle: 0 = straight line, 360 = previous point is a circle center, negative = clockwise arc, positive = counter-clockwise arc). Only one closed loop (no cutouts); the last point equals the first unless the outline is a circle. Geometry Name plus Part Number must be a unique identifier. Outlines should match the footprint's orientation and origin because the exporter ignores X/Y offsets.

```
.ELECTRICAL
    "cylinder" "5mm OD, 5mm height" MM 5
    0 0 0 0
    0 2.5 0 360
.END_ELECTRICAL
```

| Tool | Purpose |
|------|---------|
| `idfcyl` | cylinder outline; inputs: unit (mm/in), orientation (V), lead type (X axial / R radial), body diameter and length, board offset, wire diameter and pitch, wire side (L/R), lead length, file name ending `.idf` |
| `idfrect` | rectangle outline with an axial lead or a 45-degree chamfer on the upper left corner; inputs: unit, width, length, height, chamfer, leaded (Y/N), wire diameter, pitch, file name |
| `dxf2idf` | converts line, arc, and circle segments of a DXF (prepare with LibreCAD) into an outline; inputs: DXF file, unit, geometry name, part name, height, comment lines (empty line ends), output file |
| `idf2vrml` | `idf2vrml -f input_file.emn -s scale_factor {-k} {-d} {-z} {-m}` renders an IDF board (`.emn`) plus component file (`.emp`) to VRML; `-k` KiCad-friendly output, `-d` no default outline substitution, `-z` skip zero-height outlines, `-m` print mapping; e.g. `idf2vrml -f input.emn -s 0.3937008 -k` |

Each tool run with no arguments prints its usage; scripts feed the answers on stdin.

## Notes

- The 10.0 manual spells the DNP property both `Do_not_populate` (condition-clause text) and `Do_not_Populate` (property table and rule examples); it does not state whether property names are case-sensitive
- The manual says text-expression results are printed "in SI units", but its own example `@{1mm + 1in}` = 26.4 is in millimetres (not metres)
- The 10.0 manual is inconsistent on snapping: Editing Options says object snapping works only on the active layer, while the Grids and Snapping section says tools snap to objects on visible layers and `Shift+S` toggles all layers vs. the current layer
- A `Tools → Scripting Console` menu entry: not found in the 10.0 manual (the console opens from a top toolbar button)
- The manual does not state that Python scripting changes are individually undoable, nor that text variables transfer via Board Setup import (Board Setup import lists text & graphics settings but not text variables)
- Rule precedence: constraints in Board Setup are absolute minimums; custom rules are evaluated in reverse file order and the first match wins

## Related

- [04-board-setup.md](./04-board-setup.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
