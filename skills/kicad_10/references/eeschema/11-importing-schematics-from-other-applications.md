# Importing Schematics from Other Applications

KiCad supports importing schematic designs from other EDA tools, converting them into native KiCad format.

## How to Import

1. Open KiCad or the Schematic Editor.
2. Use **File** → **Import Non-KiCad Schematic** (or the equivalent menu entry).
3. Select the source file.
4. KiCad converts the file and opens it as a new KiCad schematic.

## Supported Formats

| Format | Notes |
|--------|-------|
| Eagle (.sch / .brd) | Autodesk Eagle schematics |
| Altium Designer | `.SchDoc` files |
| CADSTAR | CADSTAR schematic archives |
| EasyEDA / LCSC | JSON export from EasyEDA |
| KiCad legacy (.sch) | Pre-KiCad 6 schematic files — opens natively with conversion prompt |

## Format-Specific Notes

### Eagle

- Symbol and net names are translated to KiCad equivalents.
- Eagle libraries are not directly used; symbols are embedded or re-mapped to KiCad libraries.
- Review all component references and footprints after import.

### Altium Designer

- Net and component data translates well; complex bus structures may need manual review.
- Parametric component data may not fully transfer.

### EasyEDA

- Export from EasyEDA as JSON format before importing.
- Symbol mappings may differ from KiCad standard libraries.

### KiCad Legacy (.sch)

- KiCad automatically detects and converts older `.sch` files to the current `.kicad_sch` format when opened.
- Backup the original file before converting.

## After Importing

Post-import steps recommended for all formats:

1. **Review and re-assign symbols** — Imported symbols may not match KiCad standard libraries. Use **Tools** → **Change Symbols** to remap to official KiCad symbols.
2. **Assign footprints** — Footprint mappings may be missing or incorrect. Verify every symbol's footprint field.
3. **Run ERC** — Inspect → Electrical Rules Checker to detect any connectivity or electrical errors introduced during import.
4. **Check net names** — Verify that net names were preserved correctly, especially for buses and hierarchical connections.
5. **Save as KiCad project** — Save explicitly to a new `.kicad_sch` file to avoid overwriting the source file.

## Notes

- The documentation notes that import support is under active development and some format-specific content may be incomplete.
- Imported designs are independent of the source application's libraries; all symbols are embedded in the schematic file.
- Complex hierarchical or multi-sheet designs from other tools may require manual restructuring after import.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
