# Plugin and Content Manager

The Plugin and Content Manager (PCM) enables users to discover, install, and manage community-contributed packages including plugins, libraries, color themes, and fabrication tools.

## Signature / Usage

```
Ctrl+M    Open Plugin and Content Manager
```

Launched from the main KiCad Project Manager window.

## Package Types

| Type | Description |
|------|-------------|
| Plugins | Additional tools launchable from the PCB Editor, including footprint wizards |
| Fabrication plugins | Specialized tools for ordering PCBs from specific manufacturers |
| Libraries | Symbols, footprints, and/or 3D models; by default automatically added to library tables on install and removed on uninstall (library name prefix `PCM_` by default; set in Packages and Updates preferences) |
| Color themes | Color themes for the Schematic, Symbol, Board, and Footprint editors; select in each editor's Colors preferences |

## Browsing Packages

Packages are found in the **Repository** tab (choose the repository from the dropdown; only the KiCad official repository is enabled by default), grouped into one tab per package type. Filter with the filter box; **Refresh** reloads the list. Each package shows:

- Package description
- License
- Developer contact information
- Version table: package size, status, and compatibility with your KiCad version (only compatible versions shown unless **Show all versions** is checked)
- Status: **Stable** (general use), **Testing** (use caution), **Development** (may not fully work), or **Deprecated** (no longer maintained)

## Installing Packages

Installation uses a queue system:

1. Click **Install** on the desired package — it is added to the **Pending** tab
2. Review pending changes
3. Click **Apply Pending Changes** to install all queued packages

Update and Uninstall are queued the same way. **Discard Pending Changes** cancels all pending items. Installed packages are listed in the **Installed** tab (Update, Update All, Uninstall; **Pin Package** in the dropdown excludes a package from updates). **Download** saves a package without installing; **Install from file…** installs it; **Open Package Directory** opens the install folder.

## Managing Repositories

The default KiCad official repository is pre-configured. Third-party repositories can be added:

1. Click **Manage…** at the top of the Repository tab
2. Add a repository by its full URL (or remove / reorder with the list buttons)
3. If the default repository was removed, re-add it via **Add Default Repository** in the add-button dropdown

## Creating Packages and Repositories

Follow https://dev-docs.kicad.org/en/addons/index.html to create packages. To create a repository, publish a repository JSON file following the schema at https://go.kicad.org/pcm/schemas/v1.

## Notes

- Packages may install code that runs on your computer; packages are not developed by the KiCad team
- Automatic addition/removal of libraries depends on the Packages and Updates preferences
- `KICAD10_3RD_PARTY` is the location for plugins, libraries, and color themes installed by the PCM (see Paths and Libraries Configuration)
- KiCad gives no guarantee of package quality or safety; send feedback to the package developer

## Related

- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
- [KiCad Preferences](./09-kicad-preferences.md)
