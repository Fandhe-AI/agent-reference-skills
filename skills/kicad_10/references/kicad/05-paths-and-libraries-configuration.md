# Paths and Libraries Configuration

KiCad uses path variables to define locations for libraries and resources, and maintains separate library tables for symbols and footprints.

## KiCad Path Variables

Built-in path variables available in KiCad 10.0:

| Variable | Description |
|----------|-------------|
| `KICAD10_3DMODEL_DIR` | Base path of KiCad's standard 3D footprint model library files |
| `KICAD10_3RD_PARTY` | Location for plugins, libraries, and color themes installed by the Plugin and Content Manager |
| `KICAD10_FOOTPRINT_DIR` | Base path of KiCad's standard footprint library files |
| `KICAD10_SYMBOL_DIR` | Base path of KiCad's standard symbol library files |
| `KICAD10_TEMPLATE_DIR` | Location of KiCad's standard project template library files |
| `KICAD_USER_TEMPLATE_DIR` | Location of personal project templates |
| `SPICE_LIB_DIR` | Location of personal simulation model libraries (not defined by default) |
| `KIPRJMOD` | Absolute path to the current project directory (automatically set; cannot be redefined) |

Path variables are configured via **Preferences → Configure Paths…**

## Advanced Environment Variables

These variables customize file locations but are not displayed in the Configure Paths dialog. Set them as OS-level environment variables before launching KiCad.

| Variable | Description |
|----------|-------------|
| `KICAD_CONFIG_HOME` | Base directory for configuration files; version-specific subdirectories are created automatically |
| `KICAD_DOCUMENTS_HOME` | Base path for user-modifiable documents such as projects and templates |
| `KICAD_STOCK_DATA_HOME` | Base path for stock data managed by the installer or package manager |

## Libraries Configuration

KiCad maintains separate library tables for symbols and footprints at two levels:

| Level | Location | Scope |
|-------|----------|-------|
| Global | User configuration directory | All projects |
| Project | Individual project folder | That project only |

### Accessing Library Tables

- **Symbol libraries**: **Preferences → Manage Symbol Libraries…**
- **Footprint libraries**: **Preferences → Manage Footprint Libraries…**

### Plugin and Content Manager Libraries

Libraries installed via the Plugin and Content Manager are automatically added to the appropriate library tables upon installation.

## Notes

- `KIPRJMOD` is automatically set to the active project directory and cannot be overridden
- `SPICE_LIB_DIR` is not defined by default; create it manually if needed for simulation model libraries
- Project-level library tables override global library tables for the same library nickname

## Related

- [Installing and Upgrading KiCad](./02-installing-and-upgrading-kicad.md)
- [KiCad Files and Folders](./04-kicad-files-and-folders.md)
- [Plugin and Content Manager](./08-plugin-and-content-manager.md)
