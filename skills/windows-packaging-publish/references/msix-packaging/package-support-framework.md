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
- If the app fails because it writes into its install directory (typically "Access Denied" errors in Process Monitor, from Sysinternals), the official docs have a focused end-to-end walkthrough, "How to fix Package Support Framework Filesystem Write Permission errors" (`psf-filesystem-writepermission`).
- If the app cannot find DLLs on launch, set the working directory to match the original shortcut's "Start in" value before conversion; the official step-by-step fix is "Windows app working directory error" (`psf-current-working-directory`).
- PSF does not support registry overrides — it addresses runtime (filesystem, launch, working-directory) issues only.
- The `Microsoft.PackageSupportFramework` NuGet package includes telemetry when the signed binaries are used and the device has data collection enabled; binaries built locally from source do not collect telemetry.

## Related

- [Create a Package Support Framework Fixup](./create-psf-fixup.md)
- [makeappx.exe CLI](./makeappx-cli.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [PSF Fixes: Working Directory, Write Permission, Launch Parameters](./psf-common-fixes.md)
- [Automated PSF Config Generation (MSIX Packaging Tool)](./psf-mpt-integration.md)
- [Run Scripts with the Package Support Framework](./psf-run-scripts.md)
- [Apply Package Support Framework in Visual Studio](./psf-visual-studio.md)
