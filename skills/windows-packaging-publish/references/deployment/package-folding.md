# Asset Packages and Package Folding

Mechanism that hard-links asset package files into an app's architecture package folder at install time, so split-out files (e.g. localized audio/video) remain accessible via the same relative paths used during development.

## Signature / Usage

```example
MyGame_1.0_x64.appx        (architecture package: Engine, XboxLive, Game.exe)
MyGame_1.0_Audios.appx     (asset package: Audios/...)
MyGame_1.0_Videos.appx     (asset package: Videos/...)
```

After deployment, `Audios/` and `Videos/` are hard-linked into the `MyGame_1.0_x64` install folder alongside the architecture package's own files, so the app can keep using ordinary relative file access instead of MRT/PackageManager APIs.

## Notes

- Files split into non-architecture packages (asset or resource packages) are installed to separate folders under `WindowsApps`; without folding, accessing them requires MRT APIs (`Windows.ApplicationModel.Resources.Core`) or the `PackageManager` class.
- The relative path used in the mapping file / packaging layout for `MakeAppx.exe` is the path used to access the file after folding.
- Two files in different asset packages that resolve to the same relative path cause a collision; deployment then fails with an error.
- Package folding relies on hard links, so apps using asset packages cannot be deployed to non-NTFS drives (e.g. removable drives).
- Submitting an app that uses asset packages/package folding to the Store requires prior approval from Windows developer support.

## Related

- [Choose a distribution path](./choose-distribution-path.md)
