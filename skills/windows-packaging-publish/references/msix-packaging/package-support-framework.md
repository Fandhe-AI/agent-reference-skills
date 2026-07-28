# Package Support Framework (PSF)

The Package Support Framework is an open-source kit that applies runtime fixes to an existing desktop app — without modifying its source or recompiling it — so it can run correctly inside an MSIX container. It uses Detours-based API redirection/hooking.

## Signature / Usage

`config.json` (placed at the package root, referenced by the PSF launcher):

```json
{
    "applications": [
        {
            "id": "PSFSample",
            "executable": "PSFSampleApp/PSFSample.exe",
            "workingDirectory": "PSFSampleApp/"
        }
    ],
    "processes": [
        {
            "executable": "PSFSample",
            "fixups": [
                {
                    "dll": "FileRedirectionFixup.dll",
                    "config": {
                        "redirectedPaths": {
                            "packageRelative": [
                                { "base": "PSFSampleApp/", "patterns": [".*\\.log"] }
                            ]
                        }
                    }
                }
            ]
        }
    ]
}
```

Manifest change to route launch through the PSF launcher:

```xml
<Applications>
  <Application Id="PSFSample"
               Executable="PSFLauncher32.exe"
               EntryPoint="Windows.FullTrustApplication">
    ...
  </Application>
</Applications>
```

```powershell
# Rebuild and sign after adding PSF binaries + config.json
makeappx pack /d PackageContents /p PSFSamplePackageFixup.msix
signtool sign /a /v /fd sha256 /f ExportedSigningCertificate.pfx PSFSamplePackageFixup.msix
```

## Options / Props

| `config.json` key | Array | Meaning |
|--------------------|-------|---------|
| `applications[].id` | applications | Matches the `Id` attribute of the `Application` element in the manifest |
| `applications[].executable` | applications | Package-relative path to the real executable to start |
| `applications[].workingDirectory` | applications | (Optional) package-relative working directory; defaults to `System32` if unset |
| `processes[].executable` | processes | Name of the target executable (no path/extension) to match for fixup injection |
| `fixups[].dll` | processes.fixups | Package-relative path to the fixup DLL to load |
| `fixups[].config` | processes.fixups | (Optional) fixup-specific configuration blob |

| Common fixup | Purpose |
|--------------|---------|
| `FileRedirectionFixup.dll` | Redirects reads/writes from a package-inaccessible directory (e.g. install folder) to a writable location such as local app data |
| `TraceFixup.dll` | Emits detailed diagnostic tracing of filesystem/registry operations, similar to Process Monitor |

## Notes

- PSF ships an executable (`PSFLauncher32/64.exe`), a runtime manager DLL (`PSFRuntime32/64.dll`), `PSFRunDll32/64.exe`, and the individual fixup DLLs, obtained via the `Microsoft.PackageSupportFramework` NuGet package.
- Use Process Monitor to identify the failing file/registry operations before choosing a fixup (common causes: wrong working directory, writes to the install folder, missing launch parameters).
- PSF does not support registry overrides — it addresses runtime (filesystem, launch, working-directory) issues only.
- The `Microsoft.PackageSupportFramework` NuGet package includes telemetry when the signed binaries are used and the device has data collection enabled; binaries built locally from source do not collect telemetry.

## Related

- [makeappx.exe CLI](./makeappx-cli.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
