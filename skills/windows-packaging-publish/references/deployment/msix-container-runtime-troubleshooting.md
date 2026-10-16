# Troubleshoot Runtime Issues in an MSIX Container

Use `Invoke-CommandInDesktopPackage` to run tools inside an MSIX container and inspect the merged virtual file system and registry. When several applications run in the same package identity (via modification packages), the virtual registry and file system overlay in installation order, which can overwrite expected keys or files.

## Signature / Usage

View the merged file system:

```powershell
Invoke-CommandInDesktopPackage -AppId "AppPackage1" -PackageFamilyName "Contoso.AppPackage1_8h66172c634n0" -Command "cmd.exe" -PreventBreakaway
```

View the merged registry hive:

```powershell
Invoke-CommandInDesktopPackage -AppId "AppPackage1" -PackageFamilyName "Contoso.AppPackage1_8h66172c634n0" -Command "regedit.exe" -PreventBreakaway
```

## Notes

- Requires the device to be in Developer mode for Windows 10 builds prior to 18922.
- Use `-PreventBreakaway` to launch subsequent processes in the same container; otherwise any subsequent launch breaks out of the container.
- Not all applications can be launched within the container; for example `explorer.exe` breaks out.

## Related

- [Managing MSIX with PowerShell](./powershell-msix-cmdlets.md)
- [MSIX troubleshooting guide](./msix-troubleshooting-guide.md)
