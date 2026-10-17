# Importing Schematics from Other Applications

KiCad supports importing schematic designs from other EDA tools, converting them into native KiCad format in one step.

## How to Import

1. Open the Schematic Editor.
2. Use **File** → **Import** → **Non-KiCad Schematic…**.
3. In the "Import Schematic" dialog, choose "All supported formats" or a single format filter and select the source file.
4. KiCad converts the file and loads it into the Schematic Editor; a report dialog lists warnings and unsupported features.

Importing replaces the current schematic; it does not merge into an existing KiCad design. Opening a non-KiCad file with **File** → **Open…** shows a message directing you to the import command.

## Supported Formats

| Format | Extension(s) | Notes |
|--------|--------------|-------|
| Altium Designer | `.SchDoc` | Multi-sheet supported; one `.SchDoc` per sheet |
| Eagle (Autodesk) | `.sch` (XML) | Eagle 6.x and later |
| LTspice | `.asc` | Simulation schematics |
| PADS Logic | `.asc`, `.txt` | PADS Logic ASCII export |
| CADSTAR Schematic Archive | `.csa` | Zuken CADSTAR |
| gEDA / Lepton EDA | `.sch` | gschem and Lepton schematics |
| EasyEDA (JLCEDA) Standard | `.json` | Standard edition export |
| EasyEDA (JLCEDA) Professional | `.epro`, `.zip` | Professional edition project files |

KiCad identifies the Eagle vs. gEDA `.sch` and the PADS vs. LTspice `.asc` formats automatically from file contents.

## Format-Specific Notes

### Altium Designer

- Importing one sheet also attempts to load the other sheets of the project and rebuilds the hierarchy.
- Symbols are placed into a generated symbol library saved alongside the schematic.
- A complete `.PrjPcb` (schematic and PCB) imports from the Project Manager via **File** → **Import Non-KiCad Project…** → **Altium Project…**.

### Eagle

- All sheets are stored in a single file; symbols are extracted from the embedded Eagle libraries into a generated KiCad symbol library.
- Binary Eagle files from versions before 6.x are not supported; re-save in Eagle first.
- The "Bus Entry needed" ERC violation applies only to Eagle imports.

### LTspice

- Circuit topology is imported, but simulation directives and LTspice-specific elements (SPICE parameters, behavioral sources) may not convert fully; review before simulating.

### PADS Logic

- Generate the ASCII file from PADS Logic via **File** → **Export**.

### CADSTAR

- CADSTAR Parts Library files (`.lib`) can also be used as read-only symbol libraries.

### gEDA / Lepton EDA

- External `.sym` files are searched in standard gEDA library locations; missing symbols become a fallback rectangle. Sub-schematics referenced by `source=` attributes are imported recursively.

### EasyEDA

- Standard: export the design with the Export EasyEDA option to get the JSON; symbols come from the embedded library data.
- Professional: a project chooser dialog appears for projects with several schematics.

## After Importing

1. **Save the schematic** — **File** → **Save** creates the `.kicad_sch` file in the current project directory.
2. **Run ERC** — **Inspect** → **Electrical Rules Checker** to detect connectivity or symbol issues introduced during import.
3. **Review the import report** — warnings about unsupported features.
4. **Remap symbols** — imported symbols live in a generated library; to use KiCad standard symbols, the manual points to **Tools** → **Edit Symbol Fields…** (and mentions the symbol remapping tool).
5. **Assign footprints** — **Tools** → **Assign Footprints…** to link each symbol to a KiCad footprint.
6. **Check the drawing sheet** — imported schematics have an empty drawing sheet; add a title block via **File** → **Page Settings**.

## Notes

- Not found in the 10.0 manual: "KiCad legacy (.sch)" as an import format, "Change Symbols" under **Tools** (it is **Edit** → **Change Symbols…**; the manual's import chapter points to the Symbol Fields Table instead), and the statement that import support is under active development.
- Corrected from the earlier page: imported symbols are stored in a generated library alongside the schematic (not embedded in the schematic file).
- Not found in the 10.0 manual (retained from the earlier page as unverified): Altium parametric component data may not fully transfer; EasyEDA symbol mappings may differ from KiCad standard libraries; a "check net names" post-import step for buses and hierarchical connections; complex multi-sheet designs may need manual restructuring; backing up the original before converting a legacy file.
- Legacy KiCad `.sch` files are covered by the "Opening legacy schematics" section of the Schematic Creation and Editing chapter (KiCad 5.0 / 5.1 and pre-5.0).
- The menu label for the Symbol Fields Table is given as **Edit Symbol Fields…** in this chapter but **Bulk Edit Symbol Fields…** elsewhere in the 10.0 manual.

## Related

- [Schematic Creation and Editing](./02-schematic-creation-and-editing.md)
- [Symbols and Symbol Libraries](./09-symbols-and-symbol-libraries.md)
- [Inspecting a Schematic](./04-inspecting-a-schematic.md)
