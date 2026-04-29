# Design Blocks

Design blocks are reusable schematic modules that can be saved and instantiated across multiple projects, providing template-based circuit reuse.

## Design Block Concepts

A design block is a saved selection of schematic elements (symbols, wires, labels, etc.) stored in a design block library. Unlike hierarchical sheets, design blocks are portable templates — placing a block inserts a copy of the saved elements, independent of the original.

**Design blocks vs. hierarchical sheets:**

| Aspect | Design Blocks | Hierarchical Sheets |
|--------|--------------|---------------------|
| Reuse | Across projects | Within same project |
| Update behavior | Independent copy after placement | Shared file, changes affect all instances |
| Format | Stored in block library | `.kicad_sch` file |

## The Design Blocks Panel

Open via **View** → **Design Blocks** or the toolbar button.

The panel provides:
- Library tree of available block libraries
- Preview of selected blocks
- Search/filter functionality
- Drag-and-drop or double-click to place

## Creating and Managing Design Blocks

### Creating a Design Block from an Existing Selection

1. Select the schematic elements to capture.
2. Right-click → **Save as Design Block** (or use the **Tools** menu).
3. Choose a target library and provide a name and description.
4. The selected elements are saved as a block in the library.

### Managing Block Libraries

Access **Preferences** → **Manage Design Block Libraries** to:
- Add/remove design block library paths
- Set global vs. project scope for each library
- Create new empty libraries

## Using Design Blocks in a Schematic

1. Open the Design Blocks panel.
2. Browse or search for the desired block.
3. Double-click or drag to place on the canvas.
4. The block's elements are inserted as a copy — edit freely without affecting the original.

After placement, placed elements are ordinary schematic objects. There is no live link back to the block definition.

## Practical Workflows

**Power supply templates:** Save a complete power supply sub-circuit (regulator, capacitors, feedback network) as a block. Reuse across projects by placing from the panel.

**Interface connectors:** Save a connector with its associated ESD protection and decoupling as a block for consistent reuse.

**Module standardization:** Teams can share a project-scoped block library to ensure consistent sub-circuit implementations across designs.

## Notes

- Placing a design block inserts an independent copy; modifying the source block library does not affect already-placed instances.
- Design block libraries use the same scope concept as symbol libraries (global vs. project).
- Labels and net names inside a placed block connect to the schematic if names match existing nets.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Multiple Sheets and Hierarchical Schematics](./03-multiple-sheets-and-hierarchical-schematics.md)
