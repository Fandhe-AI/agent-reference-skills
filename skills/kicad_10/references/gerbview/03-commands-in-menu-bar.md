# Commands in Menu Bar

## File Menu

| Command | Description |
|---------|-------------|
| Export to PCB Editor | Limited export of Gerber files into a KiCad PCB format |

### Export to PCB Editor

This feature provides limited capability to export Gerber files into a KiCad PCB. Conversion success depends on which RS-274X features were used in the source files.

**Conversion rules:**

| Gerber element | Converted to |
|----------------|--------------|
| Flashed items | Vias |
| Lines | Track segments (copper layers) or graphic lines (non-copper layers) |
| Rasterized items (e.g., negative objects) | Not converted |

## Tools Menu

| Command | Description |
|---------|-------------|
| List DCodes | Display D Code information for the active layer |
| Show Source | Display the raw source of the active Gerber file |
| Measure Tool | Measure the distance between two points |
| Clear Current Layer | Erase the contents of the active layer |

## Related

- [Interface](./02-interface.md)
- [Printing](./04-printing.md)
