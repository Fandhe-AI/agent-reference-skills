# MSIX Packaging Tool Best Practices and Known Issues

Recommended tool settings, repackaging and testing practices, known issues, and troubleshooting tips for the MSIX Packaging Tool.

## Signature / Usage

Fix a missing license (disconnected install) and set the minimum version for Store-versioning issues:

```powershell
winget download 9N5LW3JBCXKF --source msstore
Add-AppxProvisionedPackage -Online -PackagePath C:\MSIX\MSIXPackagingTool.msixbundle -LicensePath C:\MSIX\MSIXPackagingTool.License.xml
```

```xml
<Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.16299.0" MaxVersionTested="10.0.17763.0" />
</Dependencies>
```

## Options / Props

Tool defaults (Settings):

| Setting | Description |
|---------|-------------|
| Generate a command line with each package | Produces a conversion template file; requires an installer |
| Select all fixes by default for prepare computer | Pre-selects recommended fixes |
| Enforce Microsoft Store versioning requirements | On: minimum Windows 10 1809 and version must end in `.0` (e.g. 1.5.6.0). Off: minimum Windows 10 1709, full control of the 4 version digits |
| Add Package Integrity | Adds Package Integrity to all packages (Windows 10 2004+) |
| Add support for MSIX Core | Adds MSIX Core support; pick the Windows version to support |
| Default save / installer browse location, Server port number, Environment preference | Workflow defaults (port relevant for remote conversion) |
| Signing preference | Device Guard signing; certificate (.pfx); specify a .cer (does not sign); do not sign. Add a timestamp server URL so the app stays installable after the certificate expires |
| File and registry exclusions, Installer exit codes | Defaults exist; restarts are only triggered automatically via the command line, never in the UI |

Known error codes and symptoms:

| Symptom | Cause / action |
|---------|----------------|
| Tool won't launch (Access Denied) | License missing (installed offline); install package with its license via `Add-AppxProvisionedPackage -LicensePath` |
| -2145107924 (0x8024402c), -2145107945 (0x80244017), -2145123272 (0x80240438) | Network connectivity issues acquiring the driver |
| -2145124306 (0x8024002e) | WSUS, Configuration Manager, or group policy affecting Windows Update connectivity |
| 0x80131500 "Insufficient system resources" | Event Trace session limit (default 64) reached; stop sessions in Performance Monitor > Data Collector Sets > Event Trace Sessions |
| Installer exit code 259 | Installer spawned a thread and did not wait; use the appropriate install option for `setup.exe` |
| Bad PE certificate (0x800700C1) | Binary with a corrupt certificate; inspect with `dumpbin.exe /headers` and rewrite headers |
| MakePri / manifest translation errors | Fix the manifest in Package Editor |

## Notes

- Best practices during repackaging: send a desktop shortcut for ClickOnce installers and the main executable; declare the parent package Name (identity name) when creating modification packages; run Prepare computer steps; sign and timestamp; make the declared installation location match the installer's.
- Test the converted MSIX on a clean machine that never had the previous installer (new VM, or revert a checkpoint).
- SHA1 certificates are not supported for signing MSIX packages.
- MSIX with services: the tool sets the minimum version to 10.0.19025.0, so it cannot install below Windows 10 2004 (it can be created on Windows 10 1809+). Lowering the minimum version means services will not work.
- Packages from tool versions earlier than 1.2019.701.0 with Store versioning enforced may fail on Windows 10 1709+; set `MinVersion` to `10.0.16299.0` in Package Editor.
- If the app needs a framework, ensure it is installed during the monitoring phase (check logs). MSIX does not support driver installation.
- Driver (Feature on Demand) failures: Windows Update disabled or Insider flight ring mismatch; a restart may be required when the tool reports the driver needs a reinstall. Insider builds: confirm the signed-in Store MSA is the one enrolled in flighting.
- Log files: `%localappdata%\packages\Microsoft.MsixPackagingTool_8wekyb3d8bbwe\LocalState\DiagOutputDir\`; remote conversion logs under `<Logs_#>\RemoteServer\Log.txt`.
- File Type Associations: context menus are not added automatically; add `desktop4:FileExplorerContextMenus` manually. Shortcuts with arguments that are not detected can be added with `desktop7:Shortcut`.
- Install directory on a secondary drive: use the Package Support Framework write-to-install-directory fix (capability added by default in the tool, supported down to 1809).
- Expired certificates: sign with a timestamp or resign with a valid certificate (MSIX Toolkit scripts include a batch resign).
- Feedback: use Feedback Hub (Category Apps > MSIX Packaging Tool) and attach logs; allow about 24 hours.
- The source snippet for `TargetDeviceFamily` prints a stray `>` after the element name; the corrected form is shown above.
- Source pages last updated 07/02/2026 and 09/07/2018 (ms.date).

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [MSIX Packaging Tool Conversion Environment](./packaging-tool-environment.md)
- [Convert an Installer That Includes Services](./packaging-tool-services.md)
- [Package Support Framework](./package-support-framework.md)
