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

The recommended option is **Start with the built-in KiCad libraries**, which initializes library tables with bundled KiCad resources. Other options include importing from a previous configuration or manual setup.

Default library locations:

| OS | Path |
|----|------|
| Windows | `C:\Program Files\KiCad\10.0\share\kicad\template\` |
| Linux | `/usr/share/kicad/template/` |
| macOS | `/Applications/KiCad/KiCad.app/Contents/SharedSupport/template/` |

### Hotkeys

Hotkey configurations are **not** imported from previous versions automatically; manual import is possible through the Preferences dialog.

### Privacy and Updates

Users configure notifications for application updates and third-party packages. Windows installations offer anonymous crash reporting.

## Migrating Design Files from Previous Versions

Modern KiCad opens earlier file formats but writes only in the current format. No special migration steps are required beyond opening the files.

- File extensions may change upon saving
- Original files remain undeleted after saving in new format
- Files created or modified by one version of KiCad **cannot** be opened by older versions

## Notes

- Maintain backups during version transitions until you are confident in the permanent migration
- Configuration directories are version-specific; settings from KiCad 9.x will not affect KiCad 10.0

## Related

- [Introduction](./01-introduction.md)
- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
