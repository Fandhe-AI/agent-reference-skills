# Tutorial Part 1: Project

This section covers creating a new KiCad project and understanding the Project Manager interface.

## Creating a New Project

1. Open the KiCad Project Manager.
2. Go to **File** → **New Project**.
3. Select the **Default** project template and confirm.
4. Navigate to the desired save location.
5. Enter a project name (e.g., `getting-started`).
6. Ensure **Create a new folder for the project** is checked.
7. Click **Save**.

KiCad creates a dedicated subfolder containing all project-related files.

## Project File Structure

After creation, the Project Files pane shows three files (all sharing the project name):

| File | Extension | Contents |
|------|-----------|---------|
| Project file | `.kicad_pro` | Overall project settings |
| Schematic file | `.kicad_sch` | Circuit diagram |
| Board file | `.kicad_pcb` | PCB layout |

## Backups

KiCad automatically creates backups in a `-backups` directory when you save, and optionally at fixed time intervals.

Configure backup frequency: **Preferences** → **Preferences** → **Common** → **Project Backup**.

## Project Manager Interface

The Project Window provides buttons on the right side to launch KiCad tools (Schematic Editor, PCB Editor, etc.). These buttons automatically open the associated design files from the current project.

## Notes

- Always enable **Create a new folder for the project** to keep project files isolated.
- The project file (`.kicad_pro`) stores net classes, design rules, and other project-level settings.

## Related

- [Basic Concepts and Workflow](./02-basic-concepts-and-workflow.md)
- [Tutorial Part 2: Schematic](./05-tutorial-part-2-schematic.md)
