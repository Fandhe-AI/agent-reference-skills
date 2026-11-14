# Footprint Commands

The `fp` subcommand manages footprint operations — exporting footprints to alternative formats and upgrading legacy footprint libraries to the current KiCad format.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `fp export svg` | Export footprints to SVG | `--output`, `--layers`, `--theme`, `--footprint`, `--black-and-white`, DNP flags |
| `fp upgrade` | Upgrade footprint libraries to current format | `--output`, `--force` |

---

## fp export svg

Converts one or multiple footprints from a library into SVG format.

### Signature / Usage

```
kicad-cli fp export svg [options] INPUT_FILE_OR_DIR
```

**INPUT_FILE_OR_DIR**: Footprint (`.kicad_mod`) or footprint library directory (`.pretty`) to export.

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Output folder; one file per layer per footprint; defaults to current directory |
| `--layers <layer list>` | `-l` | Comma-separated layer names to export (e.g., `F.Cu,B.Cu`); exports all layers if omitted |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--theme <theme name>` | `-t` | Theme for export; uses footprint editor's active theme if omitted |
| `--footprint <name>` | `--fp` | Export a single named footprint; exports all if omitted |
| `--sketch-pads-on-fab-layers` | `--sp` | Render pad outlines and reference numbers on front/back fabrication layers |
| `--hide-DNP-footprints-on-fab-layers` | `--hdnp` | Suppress text and graphics for Do-Not-Populate footprints on fabrication layers |
| `--sketch-DNP-footprints-on-fab-layers` | `--sdnp` | Display DNP footprint graphics in sketch mode on fabrication layers |
| `--crossout-DNP-footprints-on-fab-layers` | `--cdnp` | Plot an "X" over the courtyard of DNP footprints; strikeout their reference designators |
| `--black-and-white` | | Export in monochrome format |

---

## fp upgrade

Transforms footprint libraries from legacy or non-KiCad formats to the current KiCad format. Pre-existing current-format libraries remain unchanged unless `--force` is used.

### Signature / Usage

```
kicad-cli fp upgrade [options] INPUT_FILE_OR_DIR
```

**INPUT_FILE_OR_DIR**: Footprint or footprint library directory to upgrade.

### Supported Input Formats

- KiCad format (`.pretty` directories containing `.kicad_mod` files)
- Legacy KiCad pre-5.0 (`.mod`, `.emp`)
- Altium (`.PcbLib`, `.IntLib`)
- CADSTAR PCB archives (`.cpa`)
- EAGLE XML (`.lbr`)
- EasyEDA / JLCEDA (`.json`, `.elibz`, `.epro`, `.zip`)
- GEDA/PCB (directories with `.fp` files)

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Output directory; overwrites original files if omitted |
| `--force` | | Force re-save of library regardless of current format version |

## Related

- [Introduction](./01-introduction.md)
- [Symbol Commands](./06-symbol-commands.md)
