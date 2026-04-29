# Basic Concepts and Workflow

KiCad's design process centers on two primary tasks: creating a schematic and laying out a circuit board.

## PCB Design Workflow

```
Schematic (symbols + wires) → Footprint assignment → PCB layout (footprints + tracks) → Fabrication outputs
```

### Schematic

The schematic represents circuits symbolically, showing which components are used and what connections are made between them. Symbols use pictorial representations (zigzag for resistors, triangles for op-amps, etc.), with wires connecting component pins.

### Circuit Board

The board is the physical realization of the schematic, with component footprints positioned on the board and copper tracks making the connections. A **footprint** is a set of copper pads that match the pins on a physical component.

## Key Editors

| Editor | Purpose |
|--------|---------|
| Schematic Editor | Edit circuit schematics |
| PCB Editor | Edit board layout |
| Symbol Editor | Create/edit schematic symbols |
| Footprint Editor | Create/edit PCB footprints |

## Project Structure

A KiCad project is folder-based and contains:

| File | Extension | Contents |
|------|-----------|---------|
| Project file | `.kicad_pro` | Overall project settings, net classes, design rules |
| Schematic file | `.kicad_sch` | Circuit diagram |
| Board file | `.kicad_pcb` | PCB layout |

Many project-related settings, including net classes and design rules, are stored at the project level.

## Libraries

KiCad ships with a large library of high-quality, user-contributed symbols and footprints. Custom symbols and footprints can also be created and stored in global or project-level libraries.

## Notes

- Updating the PCB with schematic changes is a **manual** process: the designer decides when to synchronize.
- Backup files are automatically created in a `-backups` folder on each save.

## Related

- [Introduction to KiCad](./01-introduction-to-kicad.md)
- [Tutorial Part 1: Project](./04-tutorial-part-1-project.md)
