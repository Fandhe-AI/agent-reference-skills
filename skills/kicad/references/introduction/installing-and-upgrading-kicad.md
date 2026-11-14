# Installing and Upgrading KiCad

KiCad maintains compatibility and support with maintained versions of Microsoft Windows, Apple macOS, and a number of Linux distributions. For platform-specific installation instructions and system requirements, see the official download page at https://www.kicad.org/download/.

## Version Numbering

KiCad uses a `major.minor.point` release format:

| Level | Purpose |
|-------|---------|
| Major | New features and significant code changes |
| Minor | Relatively rare; bug fixes too complicated for a point release |
| Point | Bugfixes only |

Users are encouraged to update to the latest point release of their major.minor version promptly; point releases do not break file compatibility. Major releases almost always change file formats. KiCad may run on unsupported platforms, but with no guarantees (see https://www.kicad.org/help/system-requirements/).

## Migrating from Previous Versions

To migrate a design to a new major version of KiCad:

1. **Back up your design** before opening it with the new version.
2. Open the project with the new version of KiCad.
3. Open the schematic and PCB files.
4. Save each file.

### Important Notes

- Once a design is saved in a new major version, it **cannot be opened by previous major versions**.
- In general, newer major versions can read files saved by older major versions (backwards compatible), but not the reverse.
- The symbol library format changed in **KiCad 6.0**. Libraries created before version 6.0 require migration before they can be edited; they remain readable in read-only mode without migration.

## Related

- [Welcome](./welcome.md)
- [KiCad Workflow](./kicad-workflow.md)
