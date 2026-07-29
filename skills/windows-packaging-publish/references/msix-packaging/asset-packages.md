# Asset Packages and Flat Bundles

Asset packages centralize an app's architecture/language/scale-agnostic files (for example videos) in one place, removing the need to duplicate those files across every architecture package. Flat bundle app packages are the bundle format required to unlock the publishing-time benefit of asset packages: it lets the Store process each `.appx`/`.msix` inside the bundle in parallel instead of unpacking the whole bundle first.

## Signature / Usage

```cmd
:: MappingFile.txt for an asset package (no ResourceDimensions, unlike a resource-package mapping file)
[ResourceMetadata]
"ResourceId"        "Videos"

[Files]
"Video.mp4"         "Video.mp4"
```

```cmd
MakeAppx.exe pack /r /m AppxManifest.xml /f MappingFile.txt /p Videos.msix
```

```xml
<!-- Mark an asset package non-executable to speed up Store malware scanning -->
<Package IgnorableNamespaces="uap uap6"
         xmlns:uap6="http://schemas.microsoft.com/appx/manifest/uap/windows10/6"
         xmlns:uap="http://schemas.microsoft.com/appx/manifest/uap/windows10"
         xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10">
  <Properties>
    <uap6:AllowExecution>false</uap6:AllowExecution>
  </Properties>
</Package>
```

## Options / Props

| Element | Default | Description |
|---------|---------|--------------|
| `uap6:AllowExecution` | `true` | Set to `false` on asset packages containing no `.dll`/`.exe` files to skip the full malware scan during Store publishing, speeding up submission/update processing |

## Notes

- Submitting an app to the Store that uses asset packages requires contacting Windows developer support for approval first.
- Asset packages contain only files that never change per architecture/language/scale; logo files referenced from `AppxManifest.xml` cannot be moved into an asset package and must still be duplicated across architecture packages.
- Asset packages must not contain a `resources.pri` — MRT cannot access asset package files; access them via the package-folding mechanism instead.
- Asset packages are non-optional and always downloaded, unlike resource packages (language/scale-specific, downloaded per device) or optional packages (developer-controlled add-on content).
- Flat bundles are required alongside asset packages to realize the faster-publishing benefit, since a flat bundle is what lets the Store process each contained package in parallel rather than fully unpacking the bundle.

## Related

- [Resource Packages](./resource-packages.md)
- [Optional Packages and Related Sets](./optional-packages.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
- [makeappx.exe CLI](./makeappx-cli.md)
