# Footprints and Footprint Libraries

Management of footprint libraries and the footprint browser within the PCB Editor.

## Managing Footprint Libraries

KiCad maintains footprint libraries at two scopes:

| Scope | Description |
|-------|-------------|
| Global | Available across all projects; managed in Preferences → Manage Footprint Libraries |
| Project | Specific to the current project; stored alongside project files |

Libraries are listed in a table with a nickname (short identifier) and path. Libraries can be:
- Added (from KiCad standard library or custom directories)
- Removed
- Enabled/disabled without removing from the list

The standard KiCad footprint library is distributed separately and provides thousands of component footprints organized by category.

## Browsing Footprint Libraries

The **Footprint Browser** provides a searchable interface for exploring available footprints before placement.

**Access:**
- Via the footprint placement tool (opens chooser on first click)
- **Tools → Browse Footprint Libraries**

**Features:**
- Category tree navigation on the left
- Footprint list with preview
- Search by name, keywords, or description
- 2D and 3D preview panes

**Using the browser to place footprints:**
1. Activate the footprint placement tool
2. Click on the canvas to open the footprint chooser
3. Browse or search for the desired footprint
4. Click a second time to confirm placement location

## Notes

- Library nicknames are used in board files to reference footprints; changing a nickname breaks existing references
- Custom footprint libraries should be added at project scope for portability, or at global scope if shared across many projects
- The footprint editor (see [12-creating-and-editing-footprints.md](./12-creating-and-editing-footprints.md)) is used to create and modify footprints within libraries

## Related

- [03-creating-a-pcb.md](./03-creating-a-pcb.md)
- [05-editing-a-board.md](./05-editing-a-board.md)
- [12-creating-and-editing-footprints.md](./12-creating-and-editing-footprints.md)
