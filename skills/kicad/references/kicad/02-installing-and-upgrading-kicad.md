# Installing and Upgrading KiCad

Covers first-time setup when launching a new KiCad major version and migration of design files from previous versions.

## First-Time Setup

When launching a new major KiCad version, a Welcome window appears to initialize settings. Each major release maintains separate configuration folders, allowing multiple versions to coexist.

### Configuration Storage Locations

| OS | Path |
|----|------|
| Windows | `%APPDATA%\kicad\10.0` |
| Linux | `~/.config/kicad/10.0` |
| macOS | `/Users/<username>/Library/Preferences/kicad/10.0` |

### Library Initialization Options

Symbol, footprint, and design block libraries are initialized with one of:

- **Start with the built-in KiCad libraries** (recommended for first-time setup): library tables include all libraries shipped with KiCad
- **Import tables from the previous version** (with **Migrate built-in libraries to the latest version**, recommended, to replace old built-in library references)
- Start with no libraries and configure manually

Some options may be unavailable depending on the system and install method; libraries may be a separate package on some systems.

Configuration setup: start with defaults, or import settings from a detected previous version (location auto-detected, can be overridden).

Default library table file locations:

| OS | Path |
|----|------|
| Windows | `C:\Program Files\KiCad\10.0\share\kicad\template\` |
| Linux | `/usr/share/kicad/template/` |
| macOS | `/Applications/KiCad/KiCad.app/Contents/SharedSupport/template/` |

### Hotkeys

Hotkey configurations are **not** imported from previous versions. Use the **Import Hotkeys…** button on the Hotkeys page of Preferences and browse to the `.hotkeys` file in the old version's configuration directory; this replaces the current version's hotkey settings.

### Privacy and Updates

Users choose whether to be notified of updates to KiCad and to packages installed via the Plugin and Content Manager. On Windows, anonymous crash reporting can also be enabled.

## Migrating Design Files from Previous Versions

Modern KiCad opens earlier file formats but writes only in the current format. No special migration steps are required beyond opening the files.

- File extensions may change upon saving
- Original files remain undeleted after saving in new format
- Files created or modified by one version of KiCad generally **cannot** be opened by older versions; keep backup copies
- Legacy schematic considerations are described in the Schematic Editor documentation

## Notes

- The 10.0 manual is inconsistent: the first-time setup section mentions crash reporting on Windows only, while the Data Collection preferences section says it is supported on Windows and macOS (see KiCad Preferences)
- Maintain backups during version transitions until you are confident in the permanent migration
- Configuration directories are version-specific; settings from KiCad 9.x will not affect KiCad 10.0

## Related

- [Introduction](./01-introduction.md)
- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
