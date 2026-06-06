# Schematic Commands

The `sch` subcommand processes schematic files for validation, export, format conversion, and format upgrade.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `sch erc` | Run Electrical Rules Check | `--output`, `--format`, `--severity-*`, `--exit-code-violations` |
| `sch export bom` | Export Bill of Materials | `--output`, `--preset`, `--format-preset`, `--fields`, `--group-by`, `--exclude-dnp` |
| `sch export dxf` | Export DXF (one file per sheet) | `--output`, `--theme`, `--black-and-white`, `--pages` |
| `sch export hpgl` | Export HPGL (non-functional in 10.0) | deprecated |
| `sch export netlist` | Export netlist | `--output`, `--format` |
| `sch export pdf` | Export PDF | `--output`, `--theme`, `--black-and-white`, `--exclude-property-popups`, `--pages` |
| `sch export ps` | Export PostScript (one file per sheet) | `--output`, `--theme`, `--black-and-white`, `--pages` |
| `sch export python-bom` | Export BOM via legacy Python scripts | `--output` |
| `sch export svg` | Export SVG (one file per sheet) | `--output`, `--theme`, `--black-and-white`, `--pages` |
| `sch upgrade` | Upgrade schematic to current format | `--force` |

---

## sch erc

Validates electrical connections and generates compliance reports.

### Signature / Usage

```
kicad-cli sch erc [options] INPUT_FILE
```

**INPUT_FILE**: Root schematic file (`.kicad_sch`).

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <filename>` | `-o` | Report destination filename |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--format <format>` | | Report format: `report` (default) or `json` |
| `--units <unit>` | | Measurement units: `mm` (default), `in`, or `mils` |
| `--severity-all` | | Include all violation categories |
| `--severity-error` | | Report error-level violations only |
| `--severity-warning` | | Report warning-level violations only |
| `--severity-exclusions` | | Report excluded violations |
| `--exit-code-violations` | | Return exit code 5 if violations exist, 0 otherwise |

---

## sch export bom

Generates a Bill of Materials with customizable fields and formatting.

### Signature / Usage

```
kicad-cli sch export bom [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `-o, --output` | Output filename (default extension: `.csv`) |
| `--variant` | Select design variant for output |
| `--preset` | Apply a named BOM configuration preset |
| `--format-preset` | Use a named format template (e.g., `CSV`) |
| `--fields` | Specify exported columns; `*` includes all fields |
| `--labels` | Assign column header names |
| `--group-by` | Consolidate rows by matching field values |
| `--sort-field` | Define primary sort column |
| `--sort-asc` | Enable ascending sort order (descending is default) |
| `--filter` | Include only matching reference designators |
| `--exclude-dnp` | Omit "Do not populate" components |
| `--include-excluded-from-bom` | Retain components marked "Exclude from BOM" |
| `--field-delimiter` | Separator between columns (default: `,`) |
| `--string-delimiter` | Character surrounding field values |
| `--ref-delimiter` | Character between references (default: `,`) |
| `--ref-range-delimiter` | Character for reference ranges (default: `-`) |
| `--keep-tabs` | Preserve tab characters from input |
| `--keep-line-breaks` | Preserve line break characters from input |

---

## sch export dxf

Generates vector DXF drawings. Produces one file per schematic sheet.

### Signature / Usage

```
kicad-cli sch export dxf [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Target directory for exported files |
| `--drawing-sheet` | | Override drawing sheet template path |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--variant` | | Select design variant |
| `--theme` | `-t` | Apply named color/style theme |
| `--black-and-white` | `-b` | Disable color rendering |
| `--exclude-drawing-sheet` | `-e` | Omit template frame and borders |
| `--default-font` | | Primary font selection (default: "KiCad Font") |
| `--draw-hop-overs` | | Illustrate wire crossing patterns |
| `--pages` | | Comma-separated sheet identifiers to export |

---

## sch export hpgl

> **Non-functional in KiCad 10.0.** HPGL output is no longer supported; the command is retained for compatibility only.

---

## sch export netlist

Creates a connectivity netlist in multiple EDA formats.

### Signature / Usage

```
kicad-cli sch export netlist [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <filename>` | `-o` | Output filename (default extension: `.net`) |
| `--variant` | | Select design variant |
| `--format <format>` | | Output format: `kicadsexpr` (default), `kicadxml`, `cadstar`, `orcadpcb2`, `spice`, `spicemodel`, `pads`, `allegro` |

---

## sch export pdf

Generates a PDF with embedded properties and sheet navigation links.

### Signature / Usage

```
kicad-cli sch export pdf [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <filename>` | `-o` | Output filename (default extension: `.pdf`) |
| `--drawing-sheet` | | Override drawing sheet template path |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--variant` | | Select design variant |
| `--theme` | `-t` | Apply named color/style theme |
| `--black-and-white` | `-b` | Monochrome rendering |
| `--exclude-drawing-sheet` | `-e` | Omit frame and title block |
| `--default-font` | | Primary font (default: "KiCad Font") |
| `--draw-hop-overs` | | Show wire crossing marks |
| `--exclude-property-popups` | | Disable interactive field overlays |
| `--exclude-hierarchical-links` | | Remove clickable sheet navigation |
| `--exclude-metadata` | | Omit AUTHOR/SUBJECT metadata |
| `--no-background-color` | `-n` | Strip background regardless of theme |
| `--pages` | | Comma-separated sheet identifiers to include |

---

## sch export ps

Creates PostScript vector documents. Produces one file per schematic sheet.

### Signature / Usage

```
kicad-cli sch export ps [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Target directory for files |
| `--drawing-sheet` | | Override drawing sheet template path |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--variant` | | Select design variant |
| `--theme` | `-t` | Apply named color/style theme |
| `--black-and-white` | `-b` | Disable colors |
| `--exclude-drawing-sheet` | `-e` | Omit borders |
| `--default-font` | | Font selection (default: "KiCad Font") |
| `--draw-hop-overs` | | Wire crossing illustration |
| `--no-background-color` | `-n` | Strip background color |
| `--pages` | | Comma-separated sheet identifiers to include |

---

## sch export python-bom

Generates a BOM using the legacy XML/Python workflow. This represents the old approach; modern projects should use `sch export bom` instead.

### Signature / Usage

```
kicad-cli sch export python-bom [options] INPUT_FILE
```

---

## sch export svg

Generates SVG files with theme support. Produces one file per schematic sheet.

### Signature / Usage

```
kicad-cli sch export svg [options] INPUT_FILE
```

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Target directory or single filename |
| `--drawing-sheet` | | Override drawing sheet template path |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--variant` | | Select design variant |
| `--theme` | `-t` | Apply named color/style theme |
| `--black-and-white` | `-b` | Monochrome rendering |
| `--exclude-drawing-sheet` | `-e` | Omit borders/frame |
| `--default-font` | | Font selection (default: "KiCad Font") |
| `--draw-hop-overs` | | Show wire crossing marks |
| `--pages` | | Comma-separated sheet identifiers to export |

---

## sch upgrade

Converts schematic files from a previous KiCad format to the current version.

### Signature / Usage

```
kicad-cli sch upgrade [options] INPUT_FILE
```

### Options

| Option | Description |
|--------|-------------|
| `-h, --help` | Show help |
| `--force` | Re-save even if already in current format |

## Notes

- All schematic commands accept `.kicad_sch` as the root input file.
- Default output filenames match the input filename with an appropriate extension (`.rpt`, `.json`, `.csv`, `.net`, `.pdf`, etc.).
- Multi-sheet designs: `--pages` accepts comma-separated sheet identifiers; omitting it exports all sheets.
- `sch erc` and `sch export bom` support `--variant` for filtering components per assembly variant.

## Related

- [Introduction](./01-introduction.md)
- [PCB Commands](./04-pcb-commands.md)
