# Symbol Commands

The `sym` subcommand manages symbol operations — exporting symbol libraries to alternative formats and upgrading legacy or non-KiCad symbol libraries to the current KiCad format.

## Commands

| Command | Purpose | Main Options |
|---------|---------|--------------|
| `sym export svg` | Export symbols to SVG | `--output`, `--theme`, `--symbol`, `--black-and-white`, `--include-hidden-pins`, `--include-hidden-fields` |
| `sym export kicad_sym` | Export symbols to native KiCad format (not listed in the 10.0 manual; unverified) | `--output` |
| `sym upgrade` | Upgrade symbol libraries to current format | `--output`, `--force` |

---

## sym export svg

Converts symbol libraries to SVG format files.

### Signature / Usage

```
kicad-cli sym export svg [options] INPUT_FILE
```

**INPUT_FILE**: Symbol library file (`.kicad_sym`) to export.

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <dir>` | `-o` | Export destination folder; defaults to current directory (one file per symbol) |
| `--theme <theme name>` | `-t` | Theme for export; uses the symbol editor's current theme if omitted |
| `--symbol <symbol>` | `-s` | Export a single named symbol only; all symbols in the library if omitted |
| `--black-and-white` | | Monochrome output |
| `--include-hidden-pins` | | Include hidden pins in the export |
| `--include-hidden-fields` | | Include hidden fields in the export |

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
| `--output <filename>` | `-o` | Output filename; defaults to input filename with `.kicad_sym` extension (unverified) |

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
- KiCad pre-6.0 symbol libraries (`.lib`)
- Altium schematic libraries (`.SchLib`)
- Altium integrated libraries (`.IntLib`)
- CADSTAR parts libraries (`.lib`)
- EAGLE XML libraries (`.lbr`)
- EasyEDA (JLCEDA) Standard files (`.json`)
- EasyEDA (JLCEDA) Pro files (`.elibz`, `.epro`, `.zip`)

### Options

| Option | Short | Description |
|--------|-------|-------------|
| `--help` | `-h` | Show help |
| `--output <file or dir>` | `-o` | Overwrites the original library if omitted; a file path produces a packed `.kicad_sym`, a folder path produces one `.kicad_sym` per symbol |
| `--force` | | Re-save even if already in current format |

## Notes

- sym export kicad_sym: not found in the 10.0 manual (only `sym export svg` and `sym upgrade` are documented); its option table, including the `.kicad_sym` default output name, is unverified. Verify with `kicad-cli sym export -h` before use.

## Related

- [Introduction](./01-introduction.md)
- [Footprint Commands](./02-footprint-commands.md)
