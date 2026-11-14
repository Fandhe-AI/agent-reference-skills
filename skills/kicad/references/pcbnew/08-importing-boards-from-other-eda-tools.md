# Importing Boards from Other EDA Tools

Workflow for migrating PCB designs from other EDA applications into KiCad. Importing creates a new KiCad board from the foreign file; it does not merge into an existing design. Save the result to create a `.kicad_pcb` file.

## Supported Import Formats

| Source EDA Tool | File Extension(s) | Layer Mapping | Library Import |
|-----------------|-------------------|---------------|----------------|
| Altium Designer | `.PcbDoc` | Yes | Yes |
| Altium Circuit Maker | `.CMPcbDoc` | Yes | No |
| Altium Circuit Studio | `.CSPcbDoc` | Yes | No |
| Cadence Allegro | `.brd` | Yes | No |
| CADSTAR PCB Archive | `.cpa` | Yes | Yes |
| Eagle (Autodesk) | `.brd` (XML) | Yes | Yes |
| EasyEDA / JLCEDA Standard | `.json`, `.zip` | No | Yes |
| EasyEDA / JLCEDA Professional | `.epro`, `.zip` | No | Yes |
| Fabmaster | `.txt`, `.fab` | No | No |
| gEDA / Lepton EDA | `.pcb` | No | Yes |
| P-CAD 200x | `.pcb` (ASCII) | No | No |
| PADS (ASCII) | `.asc` | Yes | No |
| Solidworks PCB | `.SWPcbDoc` | Yes | No |

Specctra session files (`.ses`) are imported separately (see below).

## How to Import a Board

1. Open the PCB Editor
2. Choose **File → Import → Non-KiCad Board File…**
3. Change the file type dropdown to the desired import format and select the file
4. Review the layer mapping dialog if one appears (format dependent)
5. Complete post-import cleanup and save

Eagle and Allegro both use `.brd`; KiCad detects the correct format from file contents (Allegro is binary, Eagle is XML).

## Layer Mapping

For formats with layer mapping, a dialog lists each source layer with a dropdown for the KiCad target layer. The importer proposes a best-guess mapping that should be reviewed.

- Copper layers: verify inner layers on multi-layer boards
- Silkscreen, solder mask, paste: map to the matching front/back layer
- Mechanical and documentation layers: map to User layers or leave unmapped
- Setting a source layer to **Unassigned** skips its content

## Post-Import Cleanup

- Run DRC (**Inspect → Design Rules Checker**)
- Review **File → Board Setup**: stackup, design rules, net classes (rules are translated on a best-effort basis)
- Check footprints: imported footprints are embedded in the board; consider replacing them with library footprints
- Refill zones with **Edit → Fill All Zones** (`B`)
- Verify net assignments and net classes
- Save with **File → Save As…** as a `.kicad_pcb` in a KiCad project directory
- Review messages in the message panel for unsupported features

## Format-Specific Notes

| Format | Notes |
|--------|-------|
| Altium Designer | Up to 32 copper layers; blind/buried vias; design rules partial; OLE objects and Situs/simulation data not imported; `.PcbLib` and `.IntLib` libraries importable via the footprint library manager |
| Altium Circuit Maker / Studio | Same engine as Altium Designer; layer mapping supported |
| Cadence Allegro | Binary `.brd`; rules and constraints not fully imported; flex stackup not supported; some pad shapes approximated |
| CADSTAR PCB Archive | Net classes imported; template areas may be simplified; footprints loadable via library manager |
| Eagle | XML `.brd` of Eagle 6.x and later (older binary files must be re-saved as XML); ULP scripts and CAM jobs not imported; `.lbr` libraries via library manager; `.sch` schematics importable in the Schematic Editor |
| EasyEDA / JLCEDA Standard | `.json` or `.zip` from Export EasyEDA; panelization data not imported |
| EasyEDA / JLCEDA Professional | `.epro` or `.zip`; a project chooser selects the board for multi-board projects; `.elibz` libraries via library manager |
| Fabmaster | Manufacturing-oriented data; layers assigned automatically (not interactive); nets may be incomplete |
| gEDA / Lepton EDA | `.pcb`; simpler layer model; `.fp` footprints via library manager |
| P-CAD | ASCII `.pcb` only; design rules not imported |
| PADS | ASCII `.asc` (File → Export in PADS Layout); rules best-effort; reuse blocks may not be fully preserved |
| Solidworks PCB | Altium-derived format sharing the Altium importer |

## Importing Specctra Session Files

Applies autorouter results to an existing board; it does not create a new board and only adds routing (footprints, nets, and outline must match the exported design).

1. **File → Export → Specctra DSN…**
2. Run an external autorouter on the `.dsn` to produce a `.ses`
3. **File → Import → Specctra Session…**

## Notes

- Always run DRC after import to verify design integrity
- The original foreign file is not modified (not found in the 10.0 manual)
- The PADS notes in the 10.0 manual say both ASCII and binary PADS formats are supported, but its supported-format table and the rest of the section describe only PADS ASCII (`.asc`)

## Related

- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
- [09-generating-outputs.md](./09-generating-outputs.md)
