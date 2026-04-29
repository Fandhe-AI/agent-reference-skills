# Symbol Commands

The `sym` subcommand manages symbol operations — exporting symbol libraries to alternative formats and upgrading legacy or non-KiCad symbol libraries to the current KiCad format.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `sym export svg` | Export symbols to SVG | `--output`, `--layers`, `--theme`, `--symbol`, `--black-and-white` |
| `sym export kicad_sym` | Export symbols to native KiCad format | `--output` |
| `sym upgrade` | Upgrade symbol libraries to current format | `--output`, `--force` |

---

## sym export svg

Converts symbol libraries to SVG format files.

### Signature / Usage

```
kicad-cli sym export svg [options] INPUT_FILE_OR_DIR
```

**INPUT_FILE_OR_DIR**: Symbol file (`.kicad_sym`) or directory to export.

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Export destination folder; defaults to current directory |
| `--layers <layer list>` | `-l` | Comma-separated layer names to include |
| `--define-var <key>=<value>` | `-D` | Define/override project variables (repeatable) |
| `--theme <theme name>` | `-t` | Theme for export; uses current theme if omitted |
| `--symbol <symbol>` | `--sym` | Export a single named symbol only |
| `--black-and-white` | | Monochrome output |

---

## sym export kicad_sym

Saves symbols in native KiCad symbol format.

### Signature / Usage

```
kicad-cli sym export kicad_sym [options] INPUT_FILE
```

**INPUT_FILE**: Symbol file to export.

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <filename>` | `-o` | Output filename; defaults to input filename with `.kicad_sym` extension |

---

## sym upgrade

Transforms symbol libraries from legacy or non-KiCad formats to the current KiCad format. Pre-existing current-format libraries remain unchanged unless `--force` is used.

### Signature / Usage

```
kicad-cli sym upgrade [options] INPUT_FILE_OR_DIR
```

**INPUT_FILE_OR_DIR**: Symbol file or directory to upgrade.

### Supported Input Formats

- KiCad symbol libraries (`.kicad_sym`)
- KiCad legacy pre-5.0 symbol libraries (`.lib`, `.dcm`)
- Altium integrated libraries (`.IntLib`)
- EAGLE XML libraries (`.lbr`)
- EasyEDA (JLCEDA) Standard files (`.json`)
- EasyEDA (JLCEDA) Pro files (`.elibz`, `.epro`, `.zip`)

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Output directory; overwrites original files if omitted |
| `--force` | | Re-save even if already in current format |

## Related

- [Introduction](./01-introduction.md)
- [Footprint Commands](./02-footprint-commands.md)
