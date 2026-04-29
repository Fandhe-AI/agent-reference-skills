# Generating Outputs

Export and fabrication output generation from the PCB Editor.

## Plotting (Gerber / PostScript / SVG / DXF / PDF)

Access via **File → Plot…**

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

Contains hole position and size data for PCB drilling operations. Generated alongside Gerber files via **File → Plot → Generate Drill Files**. Supports Excellon format (most common) and Gerber X2.

## IPC-2581

Comprehensive manufacturing data format packaging all design information (layers, components, design intent) in a single file. Access via **File → Export → IPC-2581**.

## ODB++

Advanced manufacturing data format used by many fabrication facilities. Access via **File → Export → ODB++**. Packages layer data, drill information, and component data together.

## Component Placement Files (Position Files)

Required for pick-and-place machine programming. Exported via **File → Export → Component Placement…**

Contains per-component:
- Reference designator
- X/Y coordinates
- Rotation angle
- Board side (top/bottom)

## Footprint Reports

Text-based report of all footprints on the board, useful for assembly verification.

## IPC-D-356 Netlists

Bare-board test format for flying probe and bed-of-nails test machines. Export via **File → Export → IPC-D-356 Netlist**.

## Bill of Materials (BOM)

Extracts component data for procurement and assembly. Access via **Tools → Generate BOM**. KiCad uses a configurable BOM generator supporting CSV and other formats via Python scripts.

## Printing

Direct printing from the editor for hardcopy documentation. Access via **File → Print**. Configure layer selection, scale, and color options.

## Specctra DSN

Export a Specctra-format design file for use with external autorouting tools. **File → Export → Specctra DSN**. Import the resulting `.ses` file after routing.

## GenCAD

CAD interchange format for assembly programming. **File → Export → GenCAD**.

## VRML

3D model export for visualization and web embedding. **File → Export → VRML**.

## IDF

Mechanical design interchange format for coordination with MCAD tools. **File → Export → IDF**.

## 3D Models (STEP / GLB / BREP / etc.)

Export the full board assembly as a 3D model. **File → Export → Step / GLB / BREP / …**

Supported formats:

| Format | Description |
|--------|-------------|
| STEP | ISO standard; for MCAD tools (FreeCAD, SolidWorks, etc.) |
| GLB | Binary glTF; for web and visualization tools |
| BREP | OpenCASCADE boundary representation |
| XAO | Salome/OpenCASCADE format |
| PLY | Polygon mesh |
| STL | 3D printing |
| STPZ | Compressed STEP |
| U3D | 3D PDF embedding |

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
