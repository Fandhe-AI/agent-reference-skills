# MSIX Package Structure

Every MSIX package (`.msix`/`.appx`) contains the app payload plus three core system files that Windows uses to deploy, verify, and update the app.

## Signature / Usage

```
MyApp.msix (zip container)
├── AppxManifest.xml      # package identity, dependencies, capabilities, visual elements
├── AppxBlockMap.xml       # per-file 64 KB block hashes
├── AppxSignature.p7x      # digital signature (required)
└── <app payload files>    # code and assets built from source
```

## Options / Props

| File | Description |
|------|-------------|
| App payload | The app code files and assets built from your source |
| `AppxBlockMap.xml` | XML document listing every file in the package with cryptographic hashes for each 64 KB block. Used for incremental download, differential updates, and integrity verification |
| `AppxManifest.xml` | The package manifest; declares identity, dependencies, capabilities, visual elements, and extension points. This is what Windows reads to deploy, display, and update the app |
| `AppxSignature.p7x` | Generated when the package is signed. Combined with `AppxBlockMap.xml`, enables Windows to verify package integrity at install time and at runtime |

### Specialized package formats

| Format | Purpose |
|--------|---------|
| Optional packages | Supplement/extend a main app's functionality; run with the main app's identity; loaded at a later time or alongside |
| App streaming install | Segments an app into a required section for basic activation and additional streamed content |
| Flat bundle packages | Bundle that contains references to app packages instead of the package files themselves, reducing package/download time |
| Asset packages | Centralized source of non-processor/non-language-specific files (for example images or videos) shared across architecture/resource packages |
| Resource packages | Asset-only packages that adapt an app to display sizes and system languages; only relevant resources are downloaded per device |
| MSIX bundle (`.msixbundle`) | Made up of multiple MSIX packages (architectures, languages, resources); only the bundle needs to be distributed |
| Modification package | Lets IT Pros customize an app without repackaging (Windows 10 version 1809+) |

## Notes

- App packages must be signed before installation; the signature is stored in `AppxSignature.p7x`.
- `.appx`/`.appxbundle` is the legacy (UWP-era) extension; `.msix`/`.msixbundle` is the current MSIX extension. Both use the same internal structure.
- Once you distribute an `.msixbundle` for an app, you cannot revert to distributing a single MSIX package for it.

## Related

- [What is MSIX?](./msix-overview.md)
- [Package Manifest Schema](./package-manifest-schema.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
- [Modification Packages](./modification-packages.md)
- [Optional Packages](./optional-packages.md)
- [App Streaming Install](./app-streaming-install.md)
- [Differential (Delta) Package Updates](./differential-package-updates.md)
- [Resource Packages](./resource-packages.md)
- [Asset Packages and Flat Bundles](./asset-packages.md)
- [Framework Packages](./framework-packages.md)
