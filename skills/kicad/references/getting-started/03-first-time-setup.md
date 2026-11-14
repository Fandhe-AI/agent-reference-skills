# First Time Setup

On the first launch, KiCad displays a Welcome dialog that guides users through initial configuration.

## Setup Steps

### 1. Preferences

Choose one of:
- **Start with default preferences** — begin fresh.
- **Import settings from a previous KiCad version** — migrate existing configuration.

### 2. Symbol and Footprint Libraries

Choose one of:
- **Start with the built-in KiCad libraries (recommended)** — initializes library tables with all included libraries.
- **Import tables from the previous version** — re-use a prior setup; selecting **Migrate built-in libraries to the latest version** as well is recommended (replaces old built-in library references with the updated libraries).
- Start with no libraries and configure them manually — advanced, skips automatic setup.

The recommended option initializes the library tables to include all libraries that come with KiCad. Some options may be unavailable depending on the system and install method; if libraries cannot be found, install them or configure manually after setup. Default library table files: Windows `C:\Program Files\KiCad\10.0\share\kicad\template\`, Linux `/usr/share/kicad/template/`, macOS `/Applications/KiCad/KiCad.app/Contents/SharedSupport/template/`.

### 3. Update Checking and Crash Reporting

- Choose whether to automatically check for updates to KiCad and to third-party packages installed through the Plugin and Content Manager.
- On **Windows** only: opt in or out of anonymous crash reporting, which helps the KiCad team diagnose and fix critical application issues.

## Notes

- These settings can be revisited later via **Preferences** → **Preferences**.
- Library tables are editable at any time through **Preferences** → **Manage Symbol Libraries** or **Preferences** → **Manage Footprint Libraries**.

## Related

- [Basic Concepts and Workflow](./02-basic-concepts-and-workflow.md)
- [Tutorial Part 1: Project](./04-tutorial-part-1-project.md)
