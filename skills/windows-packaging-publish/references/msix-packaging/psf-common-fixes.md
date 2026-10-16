# PSF Fixes: Working Directory, Write Permission, Launch Parameters

Three Package Support Framework (PSF) runtime fixes applied by staging an MSIX, injecting PSF files plus a `config.json`, pointing the manifest at the PSF launcher, then repackaging and signing: working directory, filesystem write permission, and launching with parameters.

## Signature / Usage

Stage, repackage, and sign (common to all three fixes):

```powershell
$AppPath          = "C:\PSF\SourceApp\PSFSampleApp.msix"
$StagingFolder    = "C:\PSF\Staging\PSFSampleApp"
$OSArchitecture   = "x$((gwmi Win32_Processor).AddressWidth)"
$Win10SDKVersion  = "10.0.19041.0"
Set-Location "${env:ProgramFiles(x86)}\Windows Kits\10\Bin\$Win10SDKVersion\$OSArchitecture"
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
<Application Id="PSFSample" Executable="PSFLauncher32.exe" EntryPoint="Windows.FullTrustApplication">
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
- Sources: https://learn.microsoft.com/en-us/windows/msix/psf/psf-current-working-directory, last updated 12/16/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/psf/psf-launch-apps-with-parameters, last updated 12/16/2020 (ms.date); https://learn.microsoft.com/en-us/windows/msix/psf/psf-filesystem-writepermission, last updated 07/02/2026 (ms.date); https://www.nuget.org/packages/Microsoft.PackageSupportFramework/1.0.240212.1 (package contents, x86 fixup DLL name).

## Related

- [Package Support Framework](./package-support-framework.md)
- [Create a PSF Fixup](./create-psf-fixup.md)
- [Run Scripts with the Package Support Framework](./psf-run-scripts.md)
- [Automated PSF Config Generation](./psf-mpt-integration.md)
