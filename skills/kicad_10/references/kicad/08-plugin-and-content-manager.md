# Plugin and Content Manager

The Plugin and Content Manager (PCM) enables users to discover, install, and manage community-contributed packages including plugins, libraries, color themes, and fabrication tools.

## Signature / Usage

```
Ctrl+M    Open Plugin and Content Manager
```

Also accessible from the main KiCad toolbar.

## Package Types

| Type | Description |
|------|-------------|
| Plugins | Additional tools launchable from the PCB Editor, including footprint wizards |
| Fabrication plugins | Specialized tools for ordering PCBs from specific manufacturers |
| Libraries | Collections of symbols, footprints, and 3D models; automatically added to library tables on install |
| Color themes | Visual themes for various KiCad editors |

## Browsing Packages

Packages are found in the **Repository** tab. Filter by type or search by keyword. Each package listing shows:

- Package description
- License
- Developer contact information
- Version availability status: **Stable**, **Testing**, **Development**, or **Deprecated**

## Installing Packages

Installation uses a queue system:

1. Click **Install** on the desired package — it is added to the **Pending** tab
2. Review pending changes
3. Click **Apply Pending Changes** to install all queued packages

This allows batch operations and review before committing to any changes.

## Managing Repositories

The default KiCad official repository is pre-configured. Third-party repositories can be added:

1. Click **Manage** in the PCM
2. Add a repository by URL
3. Reorder repositories as needed

## Creating Packages and Repositories

Developers can create packages for any repository type by following the specifications at the KiCad development documentation site.

## Notes

- Packages may install code that runs on your computer; packages are not developed by the KiCad team
- Libraries installed via PCM are automatically added to the appropriate global library tables
- Packages are stored in the `KICAD10_3RD_PARTY` path variable directory

## Related

- [Paths and Libraries Configuration](./05-paths-and-libraries-configuration.md)
- [KiCad Preferences](./09-kicad-preferences.md)
