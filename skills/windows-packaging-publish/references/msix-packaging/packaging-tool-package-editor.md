# MSIX Packaging Tool Package Editor (incl. Icons and Assets)

Package Editor in the MSIX Packaging Tool edits an existing MSIX (manifest properties, capabilities, virtual registry, package files) without repackaging the installer.

## Signature / Usage

Open from the welcome page: select the **Package editor** icon, browse to the package, and select **Open package**. Or right-click an MSIX and choose **Edit with MSIX Packaging Tool** (version 1.2019.1018.0 and later). After editing, verify assets are referenced in the manifest `uap:VisualElements` node:

```xml
<uap:VisualElements ... />
```

## Options / Props

| Page | What you can do |
|------|-----------------|
| Package information | Edit fields in the UI or open the manifest in an editor of your choice (UI is read-only while editing; refreshes after save) |
| Capabilities | Check or clear capabilities; updates the `<capability>` elements in the manifest |
| Virtual registry | Right-click a node: expand/collapse, Key (rename, delete, create), Value (string, binary, DWORD); right-click right pane: Delete, Add String, Add binary, Add DWORD |
| Package files | Folder: Add file, New folder, Add folder, Delete, Move. File: Delete, Move |

## Notes

- An **unpack** button unpacks the MSIX to a chosen location.
- Sign the package and update the version before saving changes.
- Icons and assets: changes made to files during the monitored installation phase of conversion are captured in the final package. After creation, use Package files to add or delete assets (right-click the assets folder > Add file / Add folder; right-click a file > Delete).
- Manifest references must be specific, but asset files can be named whatever you like.
- Source pages last updated 09/07/2018 and 06/27/2019 (ms.date).

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [Package Asset Requirements](./package-asset-requirements.md)
- [Convert an Installer That Includes Services](./packaging-tool-services.md)
