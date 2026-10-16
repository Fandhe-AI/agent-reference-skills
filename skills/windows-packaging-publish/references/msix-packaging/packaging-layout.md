# Package Creation with the Packaging Layout

The packaging layout is a single XML document, consumed by MakeAppx.exe, that describes an app's packaging structure: bundles (primary and optional), the packages in them, and the files in each package. It builds all packages in one command.

## Signature / Usage

```xml
<PackagingLayout xmlns="http://schemas.microsoft.com/appx/makeappx/2017">
  <PackageFamily ID="MyGame" FlatBundle="true" ManifestPath="C:\mygame\appxmanifest.xml" ResourceManager="false">
    <Package ID="x64" ProcessorArchitecture="x64">
      <Files>
        <File DestinationPath="*" SourcePath="C:\mygame\*"/>
        <File ExcludePath="*C:\mygame\*.txt"/>
      </Files>
    </Package>
    <AssetPackage ID="Media" AllowExecution="false">
      <Files>
        <File DestinationPath="Media\**" SourcePath="C:\mygame\media\**"/>
      </Files>
    </AssetPackage>
  </PackageFamily>
</PackagingLayout>
```

```cmd
MakeAppx.exe build /f PackagingLayout.xml /op OutputPackages\
```

## Options / Props

| Element / attribute | Description |
|---------------------|-------------|
| `PackageFamily` | Defines an app bundle. `ManifestPath` and `ID` required; `ID` is the resulting file name |
| `FlatBundle` | `true` for a flat bundle, `false` for a classic bundle |
| `ResourceManager` | Whether resource packages use MRT; defaults to `true`, but as of Windows 10 1803 not ready, so set `false` |
| `Package` | Architecture (main) package; `ProcessorArchitecture` is `x64`, `x86`, `arm`, or `neutral`; optional `ManifestPath`, else generated from the family manifest |
| `AssetPackage` | Asset package; `AllowExecution` defaults to `false` (shortens publishing since no virus scan block) |
| `ResourcePackage` | Needs a `Resources` element with `Resource` qualifiers (e.g. `Language="en"`); `Default="true"` marks the fallback |
| `PackageFamily Optional="true"` | Optional package with its own package family name |
| `RelatedSet` | For optional packages; default `true` (updated with the primary package) |
| `PrebuiltPackage Path` | Include or reference an existing package in the bundle |
| `File SourcePath` / `DestinationPath` / `ExcludePath` | Select, place, or exclude files; sources can be relative, absolute, or network shares |

Wildcards: `*` matches within one folder level; `**` matches recursively (cannot be adjacent to partial names). The count of `*` and `**` must match between `SourcePath` and `DestinationPath`.

MakeAppx switches for `build`:

| Switch | Description |
|--------|-------------|
| `/f` | Packaging layout file |
| `/op` | Output directory |
| `/id` | Build only the packages with the given layout `ID` |
| `/ip` | Location of previous version of packages (needed to reference unchanged packages) |
| `/iv` | Auto-increment package version |
| `/pv`, `/bv` | Set package version / bundle version directly |
| `/bc` | Also build children of the selected bundle |
| `/nbp` | Do not build the parent of the selected bundle |

## Notes

- Incremental build example: `MakeAppx.exe build /f PackagingLayout.xml /id "x64" /ip PreviousVersion\ /op OutputPackages\ /iv`.
- Building only an optional bundle in a related set: `MakeAppx.exe build /f PackagingLayout.xml /id "Themes" /op OutputPackages\ /bc /nbp`. For a related-set optional package, the primary bundle must usually also be built for the optional package to be installable.
- Source page last updated 07/02/2026 (ms.date).

## Related

- [MakeAppx CLI](./makeappx-cli.md)
- [Asset Packages](./asset-packages.md)
- [Optional Packages](./optional-packages.md)
- [Resource Packages](./resource-packages.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
