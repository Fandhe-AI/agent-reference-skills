# Using the KiCad Project Manager

The KiCad project manager is the primary interface when launching KiCad. It provides project creation and management, and access to all editing tools.

## Interface Layout

- **Left panel**: Tree view displaying project files (only files KiCad can open; only the root schematic sheet, except all sheets when the project is in a Git repository)
- **Right panel**: Launcher with shortcuts to editors and tools
- **Toolbar** (left side): New project, Open project, Archive project (zip), Unarchive project (overwrites files in destination), Refresh tree view, Open project directory in file explorer

Accessible tools: Schematic Editor, Symbol Editor, PCB Editor, Footprint Editor, Gerber Viewer, Image Converter, Calculator Tools, Drawing Sheet Editor, Plugin and Content Manager.

A project has a project file, a schematic and a single board; KiCad expects all three to share the same name. Double-click a file in the tree to open it; right-click for file commands.

## Standalone Mode

Running editor tools independently (outside the project manager) is generally discouraged. In standalone mode, the following features are unavailable:

- Cross-probing between schematic and board editors
- Design synchronization between schematic and board

Standalone mode is typically used for importing projects from other EDA platforms.

## Creating a New Project

1. Open via **File → New Project…**, the New Project toolbar button, or `Ctrl+N` (default)
2. Select a template (the **Default** template is always available for blank projects; recently used templates are listed on the left)
3. Click OK and enter a project name

By default, KiCad creates a directory with the same name (e.g. `MyProject/MyProject.kicad_pro`). Uncheck "Create a new directory for the project" to override (storing each project in its own directory is strongly recommended).

New projects automatically include:

- `.kicad_pro` — project file
- `.kicad_sch` — main schematic file
- `.kicad_pcb` — board file
- Any template-specific files

## Importing a Project from Another EDA Tool

Access via the **File → Import Non-KiCad Project** submenu. Supported project formats:

| Source | Format |
|--------|--------|
| Altium Designer | `.PrjPcb` |
| CADSTAR archive format | `.csa`, `.cpa` |
| Eagle 6.x+ (XML) | `.sch`, `.brd` |
| EasyEDA (JLCEDA) Standard Backup | `.zip` |
| EasyEDA (JLCEDA) Pro Project | `.epro`, `.zip` |
| PADS ASCII Project | `.asc`, `.txt` |
| gEDA / Lepton EDA | `.prj`, `.sch`, `.pcb` |

Imported schematic and board files should share the same base file name (e.g. `project.sch` and `project.brd`); you are then asked for a directory for the resulting project.

Individual file imports (schematic or board only) are also supported from within the respective editors.

**Schematic file imports**: Altium `.SchDoc`; Eagle `.sch` (XML); LTspice `.asc`; PADS Logic `.asc`, `.txt`; CADSTAR `.csa`; gEDA / Lepton `.sch`; EasyEDA Standard `.json`; EasyEDA Professional `.epro`, `.zip`.

**PCB file imports**: Altium `.PcbDoc`, Circuit Maker `.CMPcbDoc`, Circuit Studio `.CSPcbDoc`; Cadence Allegro `.brd`; CADSTAR `.cpa`; Eagle `.brd` (XML); EasyEDA Standard `.json`, `.zip`; EasyEDA Professional `.epro`, `.zip`; Fabmaster `.txt`, `.fab`; gEDA / Lepton `.pcb`; P-CAD 200x `.pcb` (ASCII); PADS `.asc`; Solidworks PCB `.SWPcbDoc`.

## Project Backups and Autosave

When enabled, KiCad backs up the entire current project in two situations:

- **On manual save** in any editor
- **On inactivity**: an autosave when there are unsaved changes after a few seconds of inactivity

### Backup Storage Options

| Mode | Description |
|------|-------------|
| Incremental backups | Snapshots viewable in the Local History panel (View → Panels → Local History; hover for changed files); backed by a hidden `.history` Git repository managed by KiCad (exclude it from your own VCS). Restore via right-click → **Restore Commit** |
| Zip archives | One Zip file per backup of the project directory; restore with the Unarchive tool (**File → Unarchive Project…**) or manual extraction |

Configure in the Project Backup section of Common preferences (format, location: project directory or KiCad user data directory; maximum total backup size).

## Saving and Loading Project Archives

- **Archive**: **File → Archive Project…** — compresses the project into a ZIP file
- **Unarchive**: **File → Unarchive Project…** — extracts a previously archived project

Archived files from the project folder: KiCad design files (`*.kicad_prl`, `*.kicad_pro`, `*.kicad_sch`, `*.kicad_sym`, `*.kicad_pcb`, `*.kicad_mod`, `*.kicad_dru`, `*.kicad_wks`, `*.kicad_jobset`, `*.wbk`, `*.json`, `fp-lib-table`, `sym-lib-table`, `design-block-lib-table`), legacy design files (`*.pro`, `*.sch`, `*.lib`, `*.dcm`, `*.cmp`, `*.brd`, `*.mod`), 3D models (`*.stp`, `*.step`), Gerbers (`*.g?`, `*.g??`, `*.gm??`, `*.gbrjob`), manufacturing files (`*.pos`, `*.drl`, `*.nc`, `*.xnc`, `*.d356`, `*.rpt`), netlists (`*.net`), Python scripts (`*.py`), documentation (`*.pdf`, `*.txt`), SPICE models (`*.cir`, `*.sub`, `*.model`), IBIS models (`*.ibs`, `*.pkg`). Unarchiving into the currently loaded project directory reloads the project automatically.

## Git Integration

Projects within Git repositories display version control status in the file tree. The active branch name appears next to the project name.

### File Status Icons

| Icon | Meaning |
|------|---------|
| Checkmark | Unchanged |
| Modification indicator | Uncommitted changes |
| Add icon | Not tracked |

No icons are shown if the project is not in a Git repository.

### Initializing Version Control

Right-click a file in the tree → **Version Control → Add Project to Version Control…**. A remote must be configured: Location (HTTPS, SSH, or local file; type detected from the URL), SSH private key and SSH key password (SSH only), User name (often `git` for SSH), Password (HTTPS only). **Test Connection** checks authentication.

### Cloning a Repository

**File → Clone Project from Repository…** — supports SSH, HTTPS, and local repositories with the same settings as above.

### Committing Changes

Right-click → **Version Control → Commit Project…** (all changed files) or right-click a file → **Version Control → Commit File…** (that file only); the Commit Changes dialog selects files, message and author. Push: **Version Control → Push**; pull: **Version Control → Pull**; branch: **Version Control → Switch to Branch**. **Version Control → Disable Git Integration** disables KiCad's Git features for the current project only, without touching the repository.

## Notes

- Git integration for all projects can be disabled on the Version Control page of Preferences (also sets update interval and default commit author) without affecting the actual repository
- Cross-probing between editors requires both to be opened from the project manager (not standalone)

## Related

- [KiCad Files and Folders](./04-kicad-files-and-folders.md)
- [Project Templates](./07-project-templates.md)
- [Actions Reference](./10-actions-reference.md)
