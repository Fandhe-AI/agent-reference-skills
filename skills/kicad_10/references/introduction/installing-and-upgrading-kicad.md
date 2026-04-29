# Installing and Upgrading KiCad

KiCad maintains compatibility and support with maintained versions of Microsoft Windows, Apple macOS, and a number of Linux distributions. For platform-specific installation instructions and system requirements, see the official download page at https://www.kicad.org/download/.

## Version Numbering

KiCad uses a `major.minor.point` release format:

| Level | Purpose |
|-------|---------|
| Major | New features and significant code changes |
| Minor | Complex bugfixes |
| Point | Bugfixes only |

Users are encouraged to update to the latest point release within their version branch as soon as it is available.

## Migrating from Previous Versions

To migrate a design to a new major version of KiCad:

1. **Back up your design** before opening it with the new version.
2. Open the project with the new version of KiCad.
3. Open the schematic and PCB files.
4. Save each file.

### Important Notes

- Once a design is saved in a new major version, it **cannot be opened by previous major versions**.
- Newer major versions can still read files saved by older major versions (forward-read, backward-incompatible write).
- The symbol library format changed in **KiCad 6.0**. Libraries created before version 6.0 require migration before they can be edited; they remain readable in read-only mode without migration.

## Related

- [Welcome](./welcome.md)
- [KiCad Workflow](./kicad-workflow.md)
