# New Project

Create a new KiCad project with its required file structure.

```
KiCad Project Manager:
  File → New Project
    Template: Default
    Name: my-board
    ☑ Create a new folder for the project
    → Save

Result:
  my-board/
    my-board.kicad_pro   ← project settings, net classes, DRC rules
    my-board.kicad_sch   ← schematic
    my-board.kicad_pcb   ← PCB layout
```

## Notes

- Always enable "Create a new folder for the project" to keep project files isolated.
- The `.kicad_pro` file stores net classes, design rules, and other project-level settings.
- KiCad auto-creates a `-backups/` directory on each save; configure frequency at Preferences → Preferences → Common → Project Backup.
- Launch Schematic Editor and PCB Editor from the Project Manager buttons — they automatically open the project's associated files.
