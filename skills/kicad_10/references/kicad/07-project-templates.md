# Project Templates

Project templates accelerate new design setup by providing preconfigured settings, layouts, and components. Templates may contain pre-defined sheet sizes, drawing sheets, board outlines, connector positions, schematic elements, design rules, logos, and more.

## Using Templates

1. Open **File → New Project**
2. The Project Template Selector dialog appears
3. Use the dropdown above the list to show all (default), **System templates** (installed with KiCad) or **User templates** (created by you; the default blank template counts as a user template)
4. Select a template; the right panel shows its description
5. Click OK, then specify the project name and location

All template files are copied to the new project location and renamed to match the new project name.

## Template Locations

| Type | Path Variable | Access |
|------|--------------|--------|
| System templates | `KICAD10_TEMPLATE_DIR` | Installed with default libraries; generally should not be modified |
| User templates | `KICAD_USER_TEMPLATE_DIR` | Store your own templates here |

The user template folder location can be changed by editing `KICAD_USER_TEMPLATE_DIR` in **Preferences → Configure Paths…**

## Template Contents

A KiCad template is a project folder with an additional `meta` subdirectory:

```
template-name/
├── template-name.kicad_pro
├── template-name.kicad_sch
├── template-name.kicad_pcb
├── [other project files]
└── meta/
    ├── info.html          (required)
    └── icon.png           (optional, 64×64 px)
```

### Files Copied During Project Creation

All files are copied (including non-KiCad files such as documentation, licenses, logos) **except**:

- Dotfiles (files beginning with `.`), with the exception of `.gitignore` and `.gitattributes`, which are copied if they exist
- Files ignored by a `.gitignore` in the template
- The `meta` directory itself

The template directory name is the template name.

### File Renaming Rules

Files containing the template directory name are renamed to the new project name:

| Template File | Created File (project = `newproject`) |
|---------------|--------------------------------------|
| `example.kicad_pro` | `newproject.kicad_pro` |
| `example-first.kicad_sch` | `newproject-first.kicad_sch` |
| `second-example.kicad_sch` | `second-newproject.kicad_sch` |
| `third.kicad_sch` | `third.kicad_sch` (unchanged) |

If required project files are missing, KiCad creates them using the default new-project behavior. Exception: if the template contains exactly one `.kicad_pro` whose name does not match the template name, renaming is based on that project file's name instead (e.g. `first-example.kicad_pro` becomes `newproject.kicad_pro`). Multiple project files in one template are not recommended.

### Template Metadata

**`meta/info.html`** (required): HTML file displayed in the template browser. The `<title>` tag sets the displayed template name (need not equal the directory name; long names are cut off). Basic HTML is supported, including images. Referenced images should be placed in the `meta` directory.

**`meta/icon.png`** (optional): 64×64 pixel PNG used as the template icon in the selection dialog.

## Creating New Templates

### From an Existing Project

1. Save a copy of the project in the user template folder via **File → Save As…** in the Project Manager (the chosen name becomes the template name)
2. Add a `meta` subdirectory
3. Create `info.html` with a `<title>` and description
4. Optionally add `icon.png` (64×64 px)

### From Scratch

1. Create a new project directly in the user template folder
2. Configure settings, design rules, page layout, etc.
3. Add the `meta` directory with required metadata files

### Cleanup Checklist Before Distribution

Remove the following before sharing a template:

- `*-backups` folder (auto-generated backup directory)
- `.history` snapshot folder
- Version control artifacts (`.git`, etc.)
- Any project-specific files not intended as defaults

## Notes

- Template names should be concise; lengthy names are truncated in the selection interface
- It is not advisable to create templates with multiple project files
- `.gitignore` and `.gitattributes` are copied despite being dotfiles; files they ignore are not copied

## Related

- [Using the KiCad Project Manager](./03-using-the-kicad-project-manager.md)
- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
