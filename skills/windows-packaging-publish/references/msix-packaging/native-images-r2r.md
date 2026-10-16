# Optimize Binaries with Native Images (ReadyToRun)

Improve startup time of a .NET Framework desktop app by precompiling binaries with the native image compiler NuGet package. Observed up to about 20% improvement in some cases.

## Signature / Usage

```powershell
PM> Install-Package Microsoft.DotNet.Framework.NativeImageCompiler -Version 1.0.0
```

Successful release build output includes:

```text
Native image obj\x86\Release\\R2R\DesktopApp1.exe generated successfully.
```

## Options / Props

| Step | Requirement |
|------|-------------|
| 1 | Target .NET Framework 4.6.2 or above (4.6.2 developer tools from the .NET desktop development workload) |
| 2 | Target one platform, x86 or x64; only the entry-point project must be x86/x64 (other AnyCPU binaries are processed with its architecture). AnyCPU is not supported |
| 3 | Add the NuGet package to the project producing the executable (WinForms or WPF) |
| 4 | Build in Release; set `NgenR2R` to `true` in the project file to run on non-release builds |

## Notes

- Applies to .NET Framework applications targeting 4.6.2 or later; the native payload is used on .NET Framework 4.7.2 and above, earlier versions load the MSIL code.
- For apps packaged by the Windows Application Packaging project, set the Target Platform Minimum version to the Windows Anniversary Update.
- Binaries grow because they contain both managed and native code. The page states the package includes a Go Live license.
- Source page last updated 07/29/2019 (ms.date).

## Related

- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [Prepare to Package a Desktop App](./prepare-desktop-app-for-packaging.md)
