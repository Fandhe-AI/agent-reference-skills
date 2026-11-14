# Jobsets

Jobsets enable batch generation of multiple output types with a single click. A jobset contains jobs (specific output types) and destinations (where outputs are saved).

## Signature / Usage

```
File → New Jobset File        Create a new jobset
File → Open Jobset File       Open an existing jobset
```

Jobsets stored in the project directory appear in the file tree and can be opened by double-clicking. The jobset file extension is `.kicad_jobset`.

## Defining Jobs

1. Click the **+** button beneath the Jobs list (opens the Add New Job dialog)
2. Select a job type; filter the list with the Filter textbox at the bottom
3. Press OK to open the job's settings dialog
4. Configure options (same options as manual generation from the respective editor)
5. Click **Save Jobset** to preserve changes

Jobs can be edited by right-clicking (**Edit Job Description** / **Edit Job Settings**) or double-clicking. Use the trash button to remove jobs and arrow buttons to reorder.

### Output Path Variables

Output filenames and paths in job settings are relative to the jobset destination folder or archive root. They support these text variables (plus project text variables):

| Variable | Description |
|----------|-------------|
| `${PROJECTNAME}` | Name of the current project |
| `${CURRENT_DATE}` | Current date at time of generation |

`${JOBSET_OUTPUT_WORK_PATH}` is an environment variable defined by KiCad while jobs run (temporary folder of the current destination); it is not listed among the output path text variables in the manual.

## Defining Jobset Destinations

1. Click the **+** button under Destinations
2. Choose destination type:

| Type | Description |
|------|-------------|
| **Archive** | Saves outputs in a compressed ZIP archive |
| **Folder** | Saves outputs uncompressed to a directory |

3. Select which jobs run for each destination
4. Configure the output path (absolute or relative to the project directory; supports path variables, `${PROJECTNAME}`, `${CURRENT_DATE}` and project text variables). By default all jobs are enabled

One Folder destination is created automatically with a new jobset; at least one destination is required before outputs can be generated.

To generate outputs:
- Click **Generate** for a single destination
- Click **Generate All Destinations** to run all destinations simultaneously

### Status Indicators

| Indicator | Meaning |
|-----------|---------|
| Blue checkmark | Job completed successfully |
| Red exclamation point | Job failed |

Click an indicator to view the Jobset Run Log with per-job status details (click a job to see its logged output). After a successful run, the destination's **Open Output** button opens a file browser at the output location.

## Available Job Types

### PCB Jobs

| Job | Description |
|-----|-------------|
| PCB: Export 3D Model | Exports board in STEP, GLB, XAO, BREP, PLY, STL, STPZ, U3D, or PDF format |
| PCB: Export Board Statistics | Generates board statistics reports in JSON or text format |
| PCB: Export Drill Data | Creates drill files for manufacturing |
| PCB: Export DXF | Exports board design to DXF format |
| PCB: Export Gencad | Exports in GenCAD format |
| PCB: Export Gerbers | Generates Gerber files, one per selected layer |
| PCB: Export IPC-2581 | Exports in IPC-2581 format |
| PCB: Export ODB++ | Exports in ODB++ format |
| PCB: Export PDF | Creates PDF files, one per board layer |
| PCB: Export Position Data | Generates component placement / pick-and-place files |
| PCB: Export PostScript | Exports to PostScript format |
| PCB: Export SVG | Exports to SVG format |
| PCB: Perform DRC | Runs Design Rule Check and generates a report |
| PCB: Render | Produces raytraced 3D board renderings as PNG or JPG |

### Schematic Jobs

| Job | Description |
|-----|-------------|
| Schematic: Export DXF | Exports schematic to DXF format |
| Schematic: Export Netlist | Generates netlists in various formats |
| Schematic: Export PDF | Creates PDF files of schematics |
| Schematic: Export Postscript | Exports to PostScript format |
| Schematic: Export SVG | Exports to SVG format |
| Schematic: Generate Bill of Materials | Produces bill of materials exports |
| Schematic: Perform ERC | Runs Electrical Rule Check and generates a report |

### Special Jobs

| Job | Description |
|-----|-------------|
| Special: Copy Files | Copies specified files to designated locations with overwrite control |
| Special: Execute Command | Runs arbitrary commands with optional output logging and error handling |

## Notes

- The **Execute Command** job is useful when the output of one job must be processed by another
- Output files are generated in a temporary folder and moved to the destination only after all jobs of that destination finish; `${JOBSET_OUTPUT_WORK_PATH}` points to that temporary folder
- **Execute Command** runs in the platform shell (`/bin/sh -c` on Linux/macOS, `cmd.exe /c` on Windows); non-zero exit codes can be ignored or fail the job, and output can be logged to a file
- Corrected from the official docs: the 10.0 manual writes `cmd.exe \c`; the cmd.exe switch is `/c`
- PCB: Perform DRC and Schematic: Perform ERC can optionally report job failure on violations; Special: Copy Files can optionally fail the job on copy failure

## Related

- [Using the KiCad Project Manager](./03-using-the-kicad-project-manager.md)
- [KiCad Files and Folders](./04-kicad-files-and-folders.md)
