# PSF Fixes: Working Directory, Write Permission, Launch Parameters

Three Package Support Framework (PSF) runtime fixes applied by staging an MSIX, injecting PSF files plus a `config.json`, pointing the manifest at the PSF launcher, then repackaging and signing: working directory, filesystem write permission, and launching with parameters.

## Signature / Usage

Stage, repackage, and sign (common to all three fixes):

```powershell
$AppPath          = "C:\PSF\SourceApp\PSFSampleApp.msix"
$StagingFolder    = "C:\PSF\Staging\PSFSampleApp"
$OSArchitecture   = if ((gwmi Win32_Processor).AddressWidth -eq 64) { 'x64' } else { 'x86' }
$Win10SDKVersion  = "10.0.19041.0"
$KitsRoot = if (${env:ProgramFiles(x86)}) { ${env:ProgramFiles(x86)} } else { $env:ProgramFiles }
Set-Location "$KitsRoot\Windows Kits\10\Bin\$Win10SDKVersion\$OSArchitecture"
.\makeappx.exe unpack /p "$AppPath" /d "$StagingFolder"
# ... add config.json and PSF files, edit AppxManifest.xml ...
.\makeappx.exe pack /p "$AppPath" /d "$StagingFolder"
.\signtool.exe sign /v /fd sha256 /f $CodeSigningCert /p $CodeSigningPass $AppPath
```

Working directory `config.json`:

```json
{
    "applications": [
        {
        "id": "PSFSample",
        "executable": "VFS/ProgramFilesX64/PS Sample App/PSFSample.exe",
        "workingDirectory": "VFS/ProgramFilesX64/PS Sample App/"
        }
    ],
    "processes": [
        { "executable": "PSFSample" }
    ]
}
```

Write permission (File Redirection Fixup) `config.json`:

```json
{
    "applications": [
        { "id": "PSFSample", "executable": "VFS/ProgramFilesX64/PS Sample App/PSFSample.exe" }
    ],
    "processes": [
        {
            "executable": "PSFSample",
            "fixups": [
                {
                    "dll": "FileRedirectionFixup64.dll",
                    "config": {
                        "redirectedPaths": {
                            "packageRelative": [
                                { "base": "VFS/ProgramFilesX64/PS Sample App/", "patterns": [ ".*\\.log" ] }
                            ]
                        }
                    }
                }
            ]
        }
    ]
}
```

Launch with parameters `config.json`:

```json
{
    "applications": [
        {
        "id": "PSFSample",
        "executable": "VFS/ProgramFilesX64/PS Sample App/PSFSample.exe",
        "arguments": "/bootfromsettingshortcut"
        }
    ]
}
```

Manifest update (all three): point the application at the PSF launcher.

```xml
<Application Id="PSFSample" Executable="PSFLauncher64.exe" EntryPoint="Windows.FullTrustApplication">
</Application>
```

## Options / Props

| Fix | Symptom / diagnosis (Process Monitor) | `config.json` keys |
|-----|----------------------------------------|--------------------|
| Working directory | `Name Not Found` with `Desired Access: ...` for a path outside `C:\Program Files\WindowsApps\...` | `applications.workingDirectory`, `processes.executable` |
| Filesystem write permission | `Access denied` with `Desired Access: Generic Write` targeting `C:\Program Files\WindowsApps\...` | `processes.fixups.dll`, `config.redirectedPaths.packageRelative.base` and `patterns` (e.g. `.*\\.log`) |
| Launch parameters | Compare the Win32 shortcut Target (parameters after the exe path) with the Start menu launcher | `applications.arguments` |

PSF files copied from `Microsoft.PackageSupportFramework.<Version>\bin` to the package root:

| x64 | x86 |
|-----|-----|
| PSFLauncher64.exe | PSFLauncher32.exe |
| PSFRuntime64.dll | PSFRuntime32.dll |
| PSFRunDll64.exe | PSFRunDll32.exe |
| FileRedirectionFixup64.dll (write-permission fix only) | FileRedirectionFixup32.dll (the source table wrongly lists FileRedirectionFixup64.dll; see Notes) |

## Notes

- Tools needed: NuGet client (`nuget.exe install Microsoft.PackageSupportFramework`), Windows 10 SDK (Signing Tools for Desktop Apps, SDK for UWP C++ Apps, UWP Apps Localization), SysInternals Process Monitor (filter: Process Name is `<app>.exe`, Result is not `SUCCESS`).
- Windows apps redirect application-related directories to `C:\Program Files\WindowsApps`; a subfolder created by the original installer (e.g. `C:\Program Files\Vendor\subfolder`) will not be found at runtime.
- Set `config.json` values from `AppxManifest.xml`: `id` from `Application Id`, `executable` from the package-relative `Executable` path, `workingDirectory` from its parent folder, `processes.executable` from the file name without path and extension.
- For the write-permission fix the `dll` is `FileRedirectionFixup64.dll` for x64; the source says to use `FileRedirectionFixup86.dll` for x86 or unknown architecture, while its file table lists `FileRedirectionFixup64.dll` for both. Both are wrong: use `FileRedirectionFixup32.dll` for x86 (confirmed in the `bin` folder of the `Microsoft.PackageSupportFramework` NuGet package 1.0.240212.1, which ships `FileRedirectionFixup32.dll` and `FileRedirectionFixup64.dll`).
- The manifest `Executable` must match the architecture of the copied launcher: x64 uses `PSFLauncher64.exe` / `PSFRuntime64.dll` / `*64.dll`, x86 uses `PSFLauncher32.exe` / `PSFRuntime32.dll` / `*32.dll`. The source example hard-codes `PSFLauncher32.exe` although its text says to target the PSFLauncher matching the architecture; the example above is x64, so `PSFLauncher64.exe` is used. The package-support-framework page's statement that `PSFLauncher32.exe` works whichever the architecture applies only when `PSFLauncher32.exe` itself is the file copied.
- The source builds the SDK folder as `x$((gwmi Win32_Processor).AddressWidth)`, which yields `x32` on 32-bit Windows (the SDK folder is `x86`), and always uses `ProgramFiles(x86)`, which does not exist on 32-bit Windows; the example maps 32/64 to x86/x64 and falls back to `ProgramFiles`.
- Sources: https://learn.microsoft.com/en-us/windows/msix/psf/psf-current-working-directory, last updated 12/16/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/psf/psf-launch-apps-with-parameters, last updated 12/16/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/psf/psf-filesystem-writepermission, last updated 07/02/2026 (ms.date); https://www.nuget.org/packages/Microsoft.PackageSupportFramework/1.0.240212.1 (package contents, x86 fixup DLL name).

## Related

- [Package Support Framework](./package-support-framework.md)
- [Create a PSF Fixup](./create-psf-fixup.md)
- [Run Scripts with the Package Support Framework](./psf-run-scripts.md)
- [Automated PSF Config Generation](./psf-mpt-integration.md)
