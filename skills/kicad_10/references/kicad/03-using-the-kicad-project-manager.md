# Using the KiCad Project Manager

The KiCad project manager is the primary interface when launching KiCad. It provides project creation and management, and access to all editing tools.

## Interface Layout

- **Left panel**: Tree view displaying project files
- **Right panel**: Launcher with shortcuts to editors and tools
- **Toolbar**: Quick access to common operations

Accessible tools include: Schematic Editor, PCB Editor, Symbol Editor, Footprint Editor, and utility applications.

## Standalone Mode

Running editor tools independently (outside the project manager) is generally discouraged. In standalone mode, the following features are unavailable:

- Cross-probing between schematic and board editors
- Design synchronization between schematic and board

Standalone mode is typically used for importing projects from other EDA platforms.

## Creating a New Project

1. Open via **File → New Project**, toolbar button, or keyboard shortcut (`Ctrl+N`)
2. Select a template (the **Default** template is always available for blank projects)
3. Enter a project name

By default, KiCad creates a matching directory for the project. Uncheck "Create a new directory for the project" to override (not recommended).

New projects automatically include:

- `.kicad_pro` — project file
- `.kicad_sch` — main schematic file
- `.kicad_pcb` — board file
- Any template-specific files

## Importing a Project from Another EDA Tool

Access via **File → Import Non-KiCad Project**. Supported formats:

| Source | Format |
|--------|--------|
| Altium Designer | `.PrjPcb` |
| CADSTAR | — |
| Eagle 6.x+ | — |
| EasyEDA | — |
| PADS | — |
| gEDA / Lepton EDA | — |

Individual file imports (schematic or board only) are also supported from within the respective editors.

**Schematic file imports**: Altium `.SchDoc`, Eagle `.sch` (XML), LTspice `.asc`, and others.

**PCB file imports**: Altium `.PcbDoc`, Cadence Allegro `.brd`, Eagle `.brd` (XML), and others.

## Project Backups and Autosave

KiCad automatically protects work through two mechanisms:

- **On save**: A backup snapshot is created when any editor saves
- **On inactivity**: An autosave is triggered after a few seconds of inactivity with unsaved changes

### Backup Storage Options

| Mode | Description |
|------|-------------|
| Incremental backups | Snapshots viewable in the Local History panel; backed by a hidden `.history` Git repository managed by KiCad. Restore via right-click → **Restore Commit** |
| Zip archives | Compressed backups of the entire project directory; restore via **File → Unarchive Project…** |

Configure in **Preferences → Preferences → Common → Backup** (location: project directory or KiCad user data directory; maximum total backup size limit).

## Saving and Loading Project Archives

- **Archive**: **File → Archive Project…** — compresses the project into a ZIP file
- **Unarchive**: **File → Unarchive Project…** — extracts a previously archived project

Archives preserve: design files, manufacturing outputs, 3D models, netlists, scripts, documentation, and SPICE models. Unarchiving into an active project directory causes KiCad to reload the project automatically.

## Git Integration

Projects within Git repositories display version control status in the file tree. The active branch name appears next to the project name.

### File Status Icons

| Icon | Meaning |
|------|---------|
| Checkmark | Unchanged |
| Modification indicator | Modified |
| Add icon | Untracked |

### Initializing Version Control

Right-click in the file tree to initialize a new Git repository for an existing project. Remote configuration supports HTTPS, SSH, and local connections.

### Cloning a Repository

**File → Clone Project from Repository…** — supports SSH, HTTPS, and local paths.

### Committing Changes

Right-click on project or individual files to commit changes. Push and pull operations synchronize with remote repositories. Branch switching is available via context menus.

## Notes

- Version control display can be disabled in Preferences without affecting the actual repository
- Cross-probing between editors requires both to be opened from the project manager (not standalone)

## Related

- [KiCad Files and Folders](./04-kicad-files-and-folders.md)
- [Project Templates](./07-project-templates.md)
- [Actions Reference](./10-actions-reference.md)
