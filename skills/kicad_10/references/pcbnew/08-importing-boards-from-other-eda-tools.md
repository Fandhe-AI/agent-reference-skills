# Importing Boards from Other EDA Tools

Workflow for migrating PCB designs from other EDA applications into KiCad.

## Supported Import Formats

KiCad supports importing board files from several EDA tools. The specific supported formats are listed in the PCB editor's import dialog and may vary by KiCad version. Typically includes formats from tools such as Eagle, Altium, and others that export in compatible standards.

## How to Import a Board

1. Open the PCB Editor
2. Use **File → Import** and select the appropriate format
3. Choose the source file
4. Proceed through the layer mapping dialog
5. Complete post-import cleanup as needed

## Layer Mapping

A critical step in the import process: maps layers from the source design to KiCad layer equivalents.

- Copper layers → KiCad copper layers (F.Cu, In1.Cu … B.Cu)
- Silkscreen → F.Silkscreen / B.Silkscreen
- Solder mask → F.Mask / B.Mask
- Other technical layers mapped accordingly

The layer mapping dialog is presented during import and allows manual adjustment.

## Post-Import Cleanup

After import, verify and correct:
- Connectivity (run DRC to find unconnected nets)
- Layer assignments
- Text encoding and font substitutions
- Footprint library references

Format conversion may introduce minor issues that require manual review.

## Format-Specific Notes

Different EDA tools represent design data differently. The KiCad documentation provides tool-specific guidance for handling quirks and limitations of each import format.

## Importing Specctra Session Files

KiCad supports importing **Specctra .ses** files, which contain routing information from external autorouters or other tools using the Specctra DSN standard.

**Workflow:**
1. Export a Specctra DSN file from KiCad (**File → Export → Specctra DSN**)
2. Route using an external Specctra-compatible autorouter
3. Import the resulting `.ses` file via **File → Import → Specctra Session**

This enables integration with external routing engines while keeping placement and design rules in KiCad.

## Notes

- Importing from other EDA tools is a one-way conversion; the original file is not modified
- Always run DRC after import to verify design integrity
- Footprints from the original tool may not have KiCad library equivalents; they are typically embedded in the converted board file

## Related

- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
- [09-generating-outputs.md](./09-generating-outputs.md)
