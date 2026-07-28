# makeappx.exe (Command-Line Packaging)

`MakeAppx.exe` creates app packages (`.msix`/`.appx`) and app bundles (`.msixbundle`/`.appxbundle`) from the command line, and can extract, encrypt, or decrypt packages/bundles. It ships with the Windows 10 SDK.

## Signature / Usage

```
MakeAppx <command> [options]
```

```powershell
# Pack from a content directory
MakeAppx pack /v /h SHA256 /d "C:\My Files" /p MyPackage.msix

# Pack from a mapping file
MakeAppx pack /v /o /f MyMapping.txt /p MyPackage.msix

# Bundle multiple architecture packages
MakeAppx bundle /v /o /bv 1.0.1.2096 /f MyMapping.txt /p MyBundle.msixbundle

# Unpack a package
MakeAppx unpack /v /p MyPackage.msix /d "C:\My Files"
```

Mapping file (`MyMapping.txt`):

```
[Files]
"C:\MyApp\StartPage.html"    "default.html"
"CustomManifest.xml"         "AppxManifest.xml"
```

## Options / Props

| Command | Description |
|---------|-------------|
| `pack` | Creates a package |
| `unpack` | Extracts all files from a package to an output directory |
| `bundle` | Creates a bundle |
| `unbundle` | Unpacks all packages in a bundle to a subdirectory |
| `encrypt` | Creates an encrypted package/bundle from an input package/bundle |
| `decrypt` | Creates a decrypted package/bundle from an encrypted input |

| Option | Description |
|--------|-------------|
| `/d` | Input/output/content directory |
| `/f` | Mapping file (pack, bundle) |
| `/p` | App package or bundle path |
| `/m` | Input app manifest to base the generated manifest on (used with `/f`) |
| `/h` | Hash algorithm for block map: `SHA256` (default), `SHA384`, `SHA512` |
| `/bv` | Bundle version, `Major.Minor.Build.Revision` |
| `/nc` | Prevents compression of package files |
| `/r` | Builds a resource package (requires `/m`, implies `/l`) |
| `/nv` | Skips semantic validation |
| `/o` / `/no` | Overwrite / don't overwrite output if it exists |
| `/kf` / `/kt` | Encrypt/decrypt using a key file / the global test key |
| `/v` | Verbose logging |

## Notes

- Located at `C:\Program Files (x86)\Windows Kits\10\bin\<build>\<arch>\makeappx.exe`, or under the App Certification Kit folder.
- `MakeAppx.exe` does not create the Store-submission `.msixupload`/`.appxupload` file — that's produced by the Visual Studio wizard or assembled manually (package/bundle + `.appxsym`, zipped and renamed).
- Semantic validation checks manifest-file consistency and forbidden protocol registrations (SMB, FILE, MS-WWA-WEB, MS-WWA); it is not a full guarantee of installability.
- If you used Visual Studio to build the app, prefer the Create App Packages wizard over calling `MakeAppx.exe` directly, unless scripting a CI pipeline.

## Related

- [MSIX Package Structure](./package-structure.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [Package Support Framework](./package-support-framework.md)
