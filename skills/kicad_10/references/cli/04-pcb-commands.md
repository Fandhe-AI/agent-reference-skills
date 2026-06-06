# PCB Commands

The `pcb` subcommand performs design rule checks, exports boards to numerous formats, imports boards from third-party tools, renders board images, and upgrades board files.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `pcb drc` | Run Design Rule Check | `--output`, `--format`, `--schematic-parity`, `--severity-*`, `--exit-code-violations`, `--refill-zones` |
| `pcb export 3dpdf` | Export 3D PDF with embedded model | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb export brep` | Export BREP (OCCT) 3D model | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb export drill` | Export drill files | `--output`, `--format`, `--excellon-*`, `--generate-map`, `--map-format` |
| `pcb export dxf` | Export DXF vector format | `--output`, `--layers`, `--mode-single/multi`, `--use-contours` |
| `pcb export gencad` | Export GenCAD format | `--output`, `--flip-bottom-pads`, `--unique-pins`, `--unique-footprints` |
| `pcb export gerbers` | Export Gerber files (one file per layer) | `--output`, `--layers`, `--no-x2`, `--precision`, `--board-plot-params` |
| `pcb export glb` | Export binary glTF (GLB) 3D model | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb export hpgl` | Export HPGL (non-functional in 10.0) | deprecated |
| `pcb export ipc2581` | Export IPC-2581 manufacturing format | `--output`, `--compress`, `--version`, `--units`, `--bom-col-*` |
| `pcb export ipcd356` | Export IPC-D-356 netlist | `--output` |
| `pcb export odb` | Export ODB++ format | `--output`, `--compression`, `--units`, `--precision` |
| `pcb export pdf` | Export PDF | `--output`, `--layers`, `--mode-single/separate/multipage`, `--mirror`, `--theme` |
| `pcb export ply` | Export PLY 3D mesh | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb export pos` | Export pick-and-place position file | `--output`, `--side`, `--format`, `--smd-only`, `--exclude-dnp` |
| `pcb export ps` | Export PostScript | `--output`, `--layers`, `--mode-single/multi`, `--x/y-scale-factor`, `--force-a4` |
| `pcb export stats` | Export board statistics report | `--output`, `--format`, `--units`, `--subtract-holes-*` |
| `pcb export step` | Export STEP 3D CAD model | `--output`, `--force`, `--no-dnp`, `--board-only`, `--no-optimize-step`, 3D geometry options |
| `pcb export stl` | Export STL 3D mesh | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb export stpz` | Export GZIP-compressed STEP | `--output`, `--force`, `--no-dnp`, `--board-only`, `--no-optimize-step`, 3D geometry options |
| `pcb export u3d` | Export Universal 3D (U3D) for PDF embedding | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb export svg` | Export SVG vector graphics | `--output`, `--layers`, `--mode-single/multi`, `--page-size-mode`, `--fit-page-to-board` |
| `pcb export vrml` | Export VRML 3D model | `--output`, `--force`, `--units`, `--models-dir`, `--models-relative` |
| `pcb export xao` | Export XAO (SALOME/Gmsh) 3D model | `--output`, `--force`, `--no-dnp`, `--board-only`, 3D geometry options |
| `pcb import` | Import non-KiCad PCB formats | `--output`, `--format`, `--report-format`, `--report-file` |
| `pcb render` | Render raytraced PNG/JPEG image | `--output`, `--variant`, `--width`, `--height`, `--side`, `--quality`, `--zoom`, `--rotate`, `--light-*` |
| `pcb upgrade` | Upgrade PCB file format | `--force` |

---

## pcb drc

Runs the Design Rule Check on a PCB file.

### Signature / Usage

```
kicad-cli pcb drc [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <filename>` | `-o` | Output filename for DRC report |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--format <format>` | | Report format: `report` (default) or `json` |
| `--all-track-errors` | | Report all errors per track (not just first) |
| `--schematic-parity` | | Test PCB vs. schematic parity |
| `--units <unit>` | | Report units: `mm`, `in`, or `mils` |
| `--severity-all` | | Report all DRC violations |
| `--severity-error` | | Report error-level violations |
| `--severity-warning` | | Report warning-level violations |
| `--severity-exclusions` | | Report excluded violations |
| `--exit-code-violations` | | Exit with code 5 if violations exist, 0 otherwise |
| `--refill-zones` | | Refill zones before running DRC |
| `--save-board` | | Save board after DRC |

---

## pcb export 3dpdf

Creates a PDF file with an embedded 3D model of the board.

### Signature / Usage

```
kicad-cli pcb export 3dpdf [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename (defaults to input with `.pdf` extension) |
| `-D, --define-var` | Define/override project variables (repeatable) |
| `-f, --force` | Overwrite existing output file |
| `--no-unspecified` | Exclude components with "unspecified" footprint type |
| `--no-dnp` | Exclude "Do not populate" components |
| `--variant` | Specify output variant |
| `--grid-origin` | Use grid origin for positioning |
| `--drill-origin` | Use drill origin for positioning |
| `--subst-models` | Replace VRML models with STEP/IGS equivalents |
| `--board-only` | Include only board, exclude component models |
| `--cut-vias-in-body` | Cut via holes even without conductor layers |
| `--no-board-body` | Exclude board body from export |
| `--no-components` | Exclude component 3D models |
| `--component-filter` | Include only matching reference designators (comma-separated, wildcards supported) |
| `--include-tracks` | Include outer conductor layer tracks/vias |
| `--include-pads` | Include pads |
| `--include-zones` | Include zones |
| `--include-inner-copper` | Include inner conductor layer elements |
| `--include-silkscreen` | Include silkscreen as flat faces |
| `--include-soldermask` | Include solder mask as flat faces |
| `--fuse-shapes` | Fuse overlapping geometry |
| `--fill-all-vias` | Don't cut via holes in conductor layers |
| `--no-extra-pad-thickness` | Disable additional pad metal thickness |
| `--min-distance` | Tolerance for point proximity (default: `0.01mm`) |
| `--net-filter` | Include only copper items matching net wildcard |
| `--user-origin` | Custom output origin (e.g., `1x1in`) |

---

## pcb export brep

Exports a BREP (OCCT-native boundary representation) 3D model file.

### Signature / Usage

```
kicad-cli pcb export brep [options] INPUT_FILE
```

### Options

Same options as `pcb export 3dpdf`, with output defaulting to `.brep` extension.

---

## pcb export drill

Generates drill files in Excellon or Gerber format.

### Signature / Usage

```
kicad-cli pcb export drill [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Output directory |
| `--format <format>` | | Format: `excellon` (default) or `gerber` |
| `--drill-origin <origin>` | | Origin: `absolute` or `plot` |
| `--excellon-zeros-format <fmt>` | | Zeros format (Excellon only) |
| `--excellon-oval-format <fmt>` | | Oval holes mode: `route` or `alternate` |
| `--excellon-units <units>` | `-u` | Units: `mm` or `in` (Excellon only) |
| `--excellon-mirror-y` | | Mirror Y axis (Excellon only) |
| `--excellon-min-header` | | Minimal header (Excellon only) |
| `--excellon-separate-th` | | Separate plated/non-plated files (Excellon only) |
| `--generate-map` | | Generate drill map file |
| `--generate-report` | | Generate report listing drill hits |
| `--report-path <filename>` | | Output filename for drill report |
| `--generate-tenting` | | Generate tented drill files (Gerber only) |
| `--map-format <format>` | | Map format: `pdf`, `gerberx2`, `ps`, `dxf`, `svg` |
| `--gerber-precision <precision>` | | Precision: `5` or `6` (Gerber only) |

---

## pcb export dxf

Exports a board design to DXF format.

### Signature / Usage

```
kicad-cli pcb export dxf [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output folder or filename |
| `--layers` | `-l` | Comma-separated layer list |
| `--common-layers` | `--cl` | Layers to plot on all outputs |
| `--drawing-sheet` | | Override board's drawing sheet path |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--exclude-refdes` | `--erd` | Omit reference designators |
| `--exclude-value` | `--ev` | Omit footprint values |
| `--sketch-pads-on-fab-layers` | `--sp` | Draw pad outlines/numbers on fab layers |
| `--hide-DNP-footprints-on-fab-layers` | `--hdnp` | Hide DNP footprint text/graphics |
| `--sketch-DNP-footprints-on-fab-layers` | `--sdnp` | Sketch DNP footprint graphics |
| `--crossout-DNP-footprints-on-fab-layers` | `--cdnp` | Mark DNP with "X" and strikethrough refs |
| `--subtract-soldermask` | | Remove silkscreen from maskless areas |
| `--use-contours` | `--uc` | Plot graphics using contours |
| `--use-drill-origin` | `--udo` | Use drill/place origin instead of absolute |
| `--include-border-title` | `--ibt` | Include sheet border/title block |
| `--output-units` | `--ou` | Output units: `mm` or `in` (default) |
| `--drill-shape-opt` | | Drill marks: `0`=none, `1`=small, `2`=actual size (default) |
| `--mode-single` | | Single output file |
| `--mode-multi` | | Multiple files per layer |
| `--scale` | | Plot scaling factor; `0`=autoscale |
| `--check-zones` | | Verify/refill zones before export |
| `--variant` | | Output variant |

---

## pcb export gencad

Exports a board design to GenCAD format.

### Signature / Usage

```
kicad-cli pcb export gencad [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output filename (defaults to input with `.cad` extension) |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--flip-bottom-pads` | `-f` | Flip bottom footprint padstacks |
| `--unique-pins` | | Generate unique pin names |
| `--unique-footprints` | | Create new shape per footprint instance (no reuse) |
| `--use-drill-origin` | | Use drill/place origin |
| `--store-origin-coord` | | Save origin coordinates in file |

---

## pcb export gerbers

Exports a board design to Gerber files (one layer per file).

### Signature / Usage

```
kicad-cli pcb export gerbers [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output folder (defaults to current directory) |
| `--layers` | `-l` | Comma-separated layers to export; omit for all layers |
| `--common-layers` | `--cl` | Layers to include in every output file |
| `--drawing-sheet` | | Override board's drawing sheet |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--exclude-refdes` | `--erd` | Omit reference designators |
| `--exclude-value` | `--ev` | Omit footprint values |
| `--include-border-title` | `--ibt` | Include sheet border/title block |
| `--sketch-pads-on-fab-layers` | `--sp` | Draw pad outlines/numbers on fab layers |
| `--hide-DNP-footprints-on-fab-layers` | `--hdnp` | Hide DNP footprint elements |
| `--sketch-DNP-footprints-on-fab-layers` | `--sdnp` | Sketch DNP footprint graphics |
| `--crossout-DNP-footprints-on-fab-layers` | `--cdnp` | Mark DNP with "X" courtyard overlay |
| `--no-x2` | | Omit extended X2 format attributes |
| `--no-netlist` | | Exclude netlist attributes |
| `--subtract-soldermask` | | Remove silkscreen from maskless areas |
| `--disable-aperture-macros` | | Disable aperture macros |
| `--use-drill-file-origin` | | Use drill/place origin vs. absolute |
| `--precision` | | Precision digits: `5` or `6` (default) |
| `--no-protel-ext` | | Use `.gbr` extension instead of Protel extensions |
| `--check-zones` | | Verify/refill zones before export |
| `--variant` | | Output variant |
| `--board-plot-params` | | Use board file's configured plot settings |

---

## pcb export glb

Exports a board design to a GLB (binary glTF) 3D model file.

### Signature / Usage

```
kicad-cli pcb export glb [options] INPUT_FILE
```

### Options

Same options as `pcb export 3dpdf`, with output defaulting to `.glb` extension.

---

## pcb export hpgl

> **Non-functional in KiCad 10.0.** HPGL output is no longer supported; the command is retained for compatibility only.

---

## pcb export ipc2581

Exports a board design in IPC-2581 format.

### Signature / Usage

```
kicad-cli pcb export ipc2581 [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename (defaults to input with `.xml` extension) |
| `--drawing-sheet` | Override board's drawing sheet |
| `-D, --define-var` | Define/override project variables (repeatable) |
| `--precision` | Decimal precision (default: `6`) |
| `--compress` | Compress output as ZIP file |
| `--version` | IPC-2581 standard revision: `B` or `C` (default) |
| `--units` | Output units: `mm` (default) or `in` |
| `--bom-col-int-id` | BOM internal ID field name |
| `--bom-col-mfg-pn` | BOM manufacturer part number field name |
| `--bom-col-mfg` | BOM manufacturer field name |
| `--bom-col-dist-pn` | BOM distributor part number field name |
| `--bom-col-dist` | BOM distributor field name |
| `--bom-rev` | BOM revision (defaults to schematic root sheet's Revision field) |
| `--variant` | Output variant |

---

## pcb export ipcd356

Generates an IPC-D-356 netlist from the board design.

### Signature / Usage

```
kicad-cli pcb export ipcd356 [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename (defaults to input with `.d356` extension) |

---

## pcb export odb

Exports a board design in ODB++ format.

### Signature / Usage

```
kicad-cli pcb export odb [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename or folder (folder when uncompressed) |
| `--drawing-sheet` | Override board's drawing sheet |
| `-D, --define-var` | Define/override project variables (repeatable) |
| `--precision` | Decimal precision (default: `2`) |
| `--compression` | Compression: `none`, `zip` (default), or `tgz` |
| `--units` | Output units: `mm` (default) or `in` |
| `--variant` | Output variant |

---

## pcb export pdf

Exports a board design to PDF. Each layer can be a separate file, a separate page, or combined.

### Signature / Usage

```
kicad-cli pcb export pdf [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output folder or filename |
| `--layers` | `-l` | Comma-separated required layer list |
| `--common-layers` | `--cl` | Layers to plot on all outputs |
| `--drawing-sheet` | | Override board's drawing sheet |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--mirror` | `-m` | Mirror board |
| `--exclude-refdes` | `--erd` | Omit reference designators |
| `--exclude-value` | `--ev` | Omit footprint values |
| `--include-border-title` | `--ibt` | Include sheet border/title block |
| `--subtract-soldermask` | | Remove silkscreen from maskless areas |
| `--sketch-pads-on-fab-layers` | `--sp` | Draw pad outlines/numbers on fab layers |
| `--hide-DNP-footprints-on-fab-layers` | `--hdnp` | Hide DNP elements |
| `--sketch-DNP-footprints-on-fab-layers` | `--sdnp` | Sketch DNP graphics |
| `--crossout-DNP-footprints-on-fab-layers` | `--cdnp` | Mark DNP with "X" |
| `--negative` | `-n` | Plot in negative |
| `--black-and-white` | | Plot in black and white |
| `--theme` | `-t` | Theme name (defaults to editor's selection) |
| `--drill-shape-opt` | | Drill marks: `0`=none, `1`=small, `2`=actual (default) |
| `--mode-single` | | Single file; OUTPUT is complete path |
| `--mode-separate` | | Multiple files per layer; OUTPUT is directory |
| `--mode-multipage` | | Single multi-page PDF; OUTPUT is complete path |
| `--scale` | | Scaling factor; `0`=autoscale |
| `--bg-color` | | Background color (hex `#rrggbb[aa]` or CSS `rgb[a]()`) |
| `--check-zones` | | Verify/refill zones before export |
| `--variant` | | Output variant |

---

## pcb export ply

Exports a board design to a PLY 3D mesh file.

### Signature / Usage

```
kicad-cli pcb export ply [options] INPUT_FILE
```

### Options

Same options as `pcb export 3dpdf`, with output defaulting to `.ply` extension.

---

## pcb export pos

Generates a pick-and-place position file.

### Signature / Usage

```
kicad-cli pcb export pos [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output filename |
| `--side` | | Side: `front`, `back`, or `both` |
| `--format` | | Format: `ascii`, `csv`, or `gerber` |
| `--units` | | Units: `in` or `mm` |
| `--bottom-negate-x` | | Negate X coordinates for bottom layer |
| `--use-drill-file-origin` | | Use drill origin |
| `--smd-only` | | Surface-mount components only |
| `--exclude-fp-th` | | Exclude through-hole footprints |
| `--exclude-dnp` | | Exclude "Do not populate" items |
| `--gerber-board-edge` | | Include board edge (Gerber format only) |
| `--variant` | | Output variant |

---

## pcb export ps

Exports a board design to PostScript format.

### Signature / Usage

```
kicad-cli pcb export ps [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output folder or filename |
| `--layers` | `-l` | Comma-separated required layer list |
| `--common-layers` | `--cl` | Layers to include in every output file |
| `--drawing-sheet` | | Override board's drawing sheet |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--mirror` | `-m` | Mirror board |
| `--exclude-refdes` | `--erd` | Omit reference designators |
| `--exclude-value` | `--ev` | Omit footprint values |
| `--include-border-title` | `--ibt` | Include sheet border/title block |
| `--subtract-soldermask` | | Remove silkscreen from maskless areas |
| `--sketch-pads-on-fab-layers` | `--sp` | Draw pad outlines/numbers on fab layers |
| `--hide-DNP-footprints-on-fab-layers` | `--hdnp` | Hide DNP elements |
| `--sketch-DNP-footprints-on-fab-layers` | `--sdnp` | Sketch DNP graphics |
| `--crossout-DNP-footprints-on-fab-layers` | `--cdnp` | Mark DNP with "X" |
| `--negative` | `-n` | Plot in negative |
| `--black-and-white` | | Plot in black and white |
| `--theme` | `-t` | Theme name (defaults to editor's selection) |
| `--drill-shape-opt` | | Drill marks: `0`=none, `1`=small, `2`=actual (default) |
| `--mode-single` | | Single file; OUTPUT is complete path |
| `--mode-multi` | | Multiple files per layer; OUTPUT is directory |
| `--track-width-correction` | `-C` | Millimeter adjustment for tracks/vias/pads |
| `--x-scale-factor` | `-X` | X scale adjustment |
| `--y-scale-factor` | `-Y` | Y scale adjustment |
| `--force-a4` | `-A` | Force A4 paper size |
| `--scale` | | Scaling factor; `0`=autoscale |
| `--check-zones` | | Verify/refill zones before export |
| `--variant` | | Output variant |

---

## pcb export stats

Exports a statistics report for the board design.

### Signature / Usage

```
kicad-cli pcb export stats [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename (defaults to input with `_statistics` suffix) |
| `-D, --define-var` | Define/override project variables (repeatable) |
| `--format` | Report format: `report` (default) or `json` |
| `--units` | Report units: `mm` (default) or `in` |
| `--exclude-footprints-without-pads` | Exclude padless footprints from counts |
| `--subtract-holes-from-board` | Subtract hole area from total board area |
| `--subtract-holes-from-copper` | Subtract hole area from copper area |

---

## pcb export step

Exports a board design to a STEP 3D CAD model file.

### Signature / Usage

```
kicad-cli pcb export step [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output filename (defaults to input with `.step` extension) |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--force` | `-f` | Overwrite existing output |
| `--no-unspecified` | | Exclude unspecified footprint types |
| `--no-dnp` | | Exclude "Do not populate" items |
| `--variant` | | Output variant |
| `--grid-origin` | | Use grid origin |
| `--drill-origin` | | Use drill origin |
| `--subst-models` | | Substitute VRML models with STEP/IGS |
| `--board-only` | | Board without components |
| `--cut-vias-in-body` | | Cut via holes in board body |
| `--no-board-body` | | Exclude board body |
| `--no-components` | | Exclude component 3D models |
| `--component-filter` | | Filter components by reference (wildcards supported) |
| `--include-tracks` | | Include outer layer tracks/vias |
| `--include-pads` | | Include pads |
| `--include-zones` | | Include zones |
| `--include-inner-copper` | | Include inner layer elements |
| `--include-silkscreen` | | Include silkscreen as flat faces |
| `--include-soldermask` | | Include solder mask as flat faces |
| `--fuse-shapes` | | Fuse overlapping geometry |
| `--fill-all-vias` | | Don't cut via holes |
| `--no-extra-pad-thickness` | | Disable extra pad metal thickness |
| `--min-distance` | | Point proximity tolerance (default: `0.01mm`) |
| `--net-filter` | | Include nets matching wildcard |
| `--no-optimize-step` | | Write parametric curves; reduces file size but may reduce compatibility |
| `--user-origin` | | Custom origin (e.g., `1x1mm`) |

---

## pcb export stl

Exports a board design to an STL 3D mesh file.

### Signature / Usage

```
kicad-cli pcb export stl [options] INPUT_FILE
```

### Options

Same options as `pcb export 3dpdf`, with output defaulting to `.stl` extension.

---

## pcb export stpz

Exports a board design to a GZIP-compressed STEP file.

### Signature / Usage

```
kicad-cli pcb export stpz [options] INPUT_FILE
```

### Options

Same options as `pcb export step`, with output defaulting to `.stpz` extension. The `--no-optimize-step` flag writes parametric curves, which reduces file size but may reduce compatibility with some CAD tools.

---

## pcb export u3d

Exports a board design to a U3D (Universal 3D) file for embedding in PDF.

### Signature / Usage

```
kicad-cli pcb export u3d [options] INPUT_FILE
```

### Options

Same options as `pcb export 3dpdf`, with output defaulting to `.pdf` extension.

---

## pcb export svg

Exports a board design to SVG format.

### Signature / Usage

```
kicad-cli pcb export svg [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output folder or filename |
| `--layers` | `-l` | Comma-separated required layer list |
| `--common-layers` | `--cl` | Layers to plot on all outputs |
| `--drawing-sheet` | | Override board's drawing sheet |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--subtract-soldermask` | | Remove silkscreen from maskless areas |
| `--mirror` | `-m` | Mirror board |
| `--theme` | `-t` | Theme name (defaults to editor's selection) |
| `--negative` | `-n` | Plot in negative |
| `--black-and-white` | | Plot in black and white |
| `--sketch-pads-on-fab-layers` | `--sp` | Draw pad outlines/numbers on fab layers |
| `--hide-DNP-footprints-on-fab-layers` | `--hdnp` | Hide DNP elements |
| `--sketch-DNP-footprints-on-fab-layers` | `--sdnp` | Sketch DNP graphics |
| `--crossout-DNP-footprints-on-fab-layers` | `--cdnp` | Mark DNP with "X" |
| `--page-size-mode` | | Sizing: `0`=full sheet, `1`=page size, `2`=board size |
| `--fit-page-to-board` | | SVG size matches board (equivalent to `--page-size-mode 2`) |
| `--exclude-drawing-sheet` | | Plot without drawing sheet |
| `--drill-shape-opt` | | Drill marks: `0`=none, `1`=small, `2`=actual (default) |
| `--mode-single` | | Single file; OUTPUT is complete path |
| `--mode-multi` | | Multiple files; OUTPUT is directory |
| `--scale` | | Scaling factor; `0`=autoscale |
| `--check-zones` | | Verify/refill zones before export |
| `--variant` | | Output variant |

---

## pcb export vrml

Exports a board design to a VRML 3D model file.

### Signature / Usage

```
kicad-cli pcb export vrml [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output filename (defaults to input with `.wrl` extension) |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--force` | `-f` | Overwrite existing file |
| `--no-unspecified` | | Exclude "unspecified" footprint types |
| `--no-dnp` | | Exclude "Do not populate" components |
| `--variant` | | Output variant |
| `--user-origin` | | Custom origin (format: `XxYunit`); defaults to board center |
| `--units` | | Output units: `mm`, `m`, `in` (default), or `tenths` |
| `--models-dir` | | Copy component models to a directory (embedded if omitted) |
| `--models-relative` | | Use relative paths in output (requires `--models-dir`) |

---

## pcb export xao

Exports a board design to an XAO (SALOME/Gmsh) 3D model file.

### Signature / Usage

```
kicad-cli pcb export xao [options] INPUT_FILE
```

### Options

Same options as `pcb export 3dpdf`, with output defaulting to `.xao` extension.

---

## pcb import

Imports a non-KiCad PCB design file and converts it to `.kicad_pcb` format.

### Signature / Usage

```
kicad-cli pcb import [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename (`.kicad_pcb`) |
| `--format` | Input format: `auto` (default), `pads`, `altium`, `eagle`, `cadstar`, `fabmaster`, `pcad`, `solidworks` |
| `--report-format` | Report format: `none`, `json`, or `text` |
| `--report-file` | Import report output filename |

---

## pcb render

Produces a raytraced PNG or JPEG image of the board.

### Signature / Usage

```
kicad-cli pcb render [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output` | `-o` | Output filename (`.png` or `.jpg`) |
| `--define-var` | `-D` | Define/override project variables (repeatable) |
| `--variant` | | Output variant |
| `--width` | `-w` | Image width in pixels (default: `1600`) |
| `--height` | | Image height in pixels (default: `900`) |
| `--side` | | View side: `top`, `bottom`, `left`, `right`, `front`, `back` |
| `--background` | | Background: `default`, `transparent`, `opaque` |
| `--quality` | | Render quality: `basic`, `high`, or `user` |
| `--preset` | | Color preset (e.g., `follow_pcb_editor`) |
| `--use-board-stackup-colors` | | Override with board stackup colors |
| `--floor` | | Enable floor, shadows, and post-processing |
| `--perspective` | | Use perspective projection |
| `--zoom` | | Camera zoom factor (integer) |
| `--pan` | | Pan location in mm (`'X,Y,Z'`) |
| `--pivot` | | Pivot point in cm (`'X,Y,Z'`) |
| `--rotate` | | Rotation in degrees (`'X,Y,Z'`) |
| `--light-top` | | Top light intensity (`'R,G,B'` or scalar 0–1) |
| `--light-bottom` | | Bottom light intensity |
| `--light-side` | | Side light intensity |
| `--light-camera` | | Camera light intensity |
| `--light-side-elevation` | | Side light elevation angle (0–90°) |

---

## pcb upgrade

Converts a KiCad board file from a previous format to the current version's native format.

### Signature / Usage

```
kicad-cli pcb upgrade [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `--force` | Re-save input board even if already in current format |

## Notes

- Layer names use canonical format: `F.Cu`, `B.Cu`, `In.1`, `F.Fab`, `B.Fab`, etc.
- Wildcard patterns are supported in `--component-filter` and `--net-filter`.
- The `--include-tracks`, `--include-pads`, `--include-zones`, and `--fuse-shapes` options for 3D exports can significantly increase processing time.
- Exit code `5` is returned when violations are found with `--exit-code-violations` (DRC).

## Related

- [Introduction](./01-introduction.md)
- [Schematic Commands](./05-schematic-commands.md)
