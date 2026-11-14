# Introduction to the KiCad Command-Line Interface

KiCad provides a command-line interface via the `kicad-cli` binary. It allows users to perform automated actions on schematics, PCBs, symbols, and footprints — such as plotting Gerber files from a PCB design or upgrading a symbol library.

## Signature / Usage

```
kicad-cli <subcommand> [subcommand ...] [options] INPUT_FILE
```

**macOS executable path:**
```
/Applications/KiCad/KiCad.app/Contents/MacOS/kicad-cli
```

## Primary Subcommands

| Subcommand | Description |
|------------|-------------|
| `fp` | Footprint operations (export, upgrade) |
| `jobset` | Run predefined jobsets |
| `pcb` | PCB operations (DRC, export, import, render, upgrade) |
| `sch` | Schematic operations (ERC, export, upgrade) |
| `sym` | Symbol operations (export, upgrade) |
| `version` | Display KiCad version information |

## Notes

- Append `--help` or `-h` to any command or subcommand to display usage information.
- Example: `kicad-cli pcb -h` shows help for all PCB subcommands.
- Example: `kicad-cli pcb export gerbers -h` shows help for Gerber export specifically.
- Example: `kicad-cli pcb export gerbers example.kicad_pcb` exports Gerber files from a board.

## Related

- [Footprint Commands](./02-footprint-commands.md)
- [Jobset Commands](./03-jobset-commands.md)
- [PCB Commands](./04-pcb-commands.md)
- [Schematic Commands](./05-schematic-commands.md)
- [Symbol Commands](./06-symbol-commands.md)
- [Version Commands](./07-version-commands.md)
