# Generating Outputs

Export and fabrication output generation from the PCB Editor.

## Plotting (Gerber / PostScript / SVG / DXF / PDF)

Access via **File → Plot…** (or the Plot toolbar icon); Gerbers are also reachable via **File → Fabrication Outputs → Gerbers (.gbr)…**

Generates layer-by-layer artwork files for fabrication or documentation.

| Format | Primary Use |
|--------|-------------|
| Gerber (RS-274X) | Industry-standard PCB fabrication |
| PostScript | Print-ready documentation |
| SVG | Scalable vector graphics for documentation |
| DXF | CAD mechanical integration |
| PDF | Multi-layer PDF documentation |

Configure which layers to plot, mirroring, scaling, and format-specific options before generating.

## Drill Files

Contains hole position and size data for PCB drilling operations. Generated via **File → Fabrication Outputs → Drill Files (.drl)…**, or the **Generate Drill Files…** button in the Plot dialog. Supports Excellon format (most common) and Gerber X2.

## IPC-2581

Comprehensive manufacturing data format packaging all design information (layers, components, design intent) in a single file. Access via **File → Fabrication Outputs → IPC-2581 File (.xml)…**.

## ODB++

Advanced manufacturing data format used by many fabrication facilities. Access via **File → Fabrication Outputs → ODB++ Output File…**. Packages layer data, drill information, and component data together.

## Component Placement Files (Position Files)

Required for pick-and-place machine programming. Exported via **File → Fabrication Outputs → Component Placement (.pos, .gbr)…** (formats: plain text, CSV, Gerber X3)

Contains per-component:
- Reference designator
- X/Y coordinates
- Rotation angle
- Board side (top/bottom)

## Footprint Reports

Text-based report of all footprints on the board, useful for assembly verification. **File → Fabrication Outputs → Footprint Report (.rpt)…** (no configurable options).

## IPC-D-356 Netlists

Bare-board test format for flying probe and bed-of-nails test machines. Export via **File → Fabrication Outputs → IPC-D-356 Netlist File…** (option: Do not export unconnected pads).

## Bill of Materials (BOM)

Extracts component data for procurement and assembly. Access via **File → Fabrication Outputs → Bill of Materials…** (no configurable options). The manual calls this PCB Editor exporter legacy and recommends the Schematic Editor's BOM exporter instead.

## Printing

Direct printing from the editor for hardcopy documentation. Access via **File → Print…**. Configure layer selection, scale, and color options.

## Specctra DSN

Export a Specctra-format design file for use with external autorouting tools. **File → Export → Specctra DSN**. Import the resulting `.ses` file after routing.

## GenCAD

CAD interchange format for assembly programming. **File → Export → GenCAD**.

## VRML

3D model export for visualization and web embedding. **File → Export → VRML**.

## IDF

Mechanical design interchange format for coordination with MCAD tools. **File → Export → IDFv3…**.

## 3D Models (STEP / GLB / BREP / XAO / PLY / STL / STPZ / U3D / PDF)

Export the full board assembly as a 3D model. **File → Export → STEP / GLB / BREP / XAO / PLY / STL…**

Supported formats:

| Format | Description |
|--------|-------------|
| STEP | Suitable for mechanical CAD applications |
| GLB | Binary glTF |
| BREP | OCCT-native boundary representation |
| XAO | SALOME/Gmsh; useful for physical simulations |
| PLY | Polygon mesh format |
| STL | Mesh format |
| STPZ | GZIP-compressed STEP |
| U3D | 3D model format |
| PDF | 3D PDF |

Descriptions follow the 10.0 manual's list; use-case examples beyond STEP (MCAD) and XAO (physical simulation) are not found in the 10.0 manual.

## Footprint Association (CMP) Files

Stores footprint-to-schematic symbol associations. Used for back-annotation in some workflows.

## Hyperlynx

Signal integrity analysis format. **File → Export → Hyperlynx**.

## Notes

- Always run DRC before generating fabrication outputs
- Gerber generation requires correct layer assignments; verify in Board Setup stackup
- IPC-2581 and ODB++ are preferred by many modern fabricators as they contain richer information than individual Gerber files

## Related

- [07-inspecting-a-board.md](./07-inspecting-a-board.md)
- [10-design-variants.md](./10-design-variants.md)
