# MSIX Packaging Tool

The MSIX Packaging Tool converts an existing desktop installer (MSI, EXE, ClickOnce, App-V 5.1, script, or manual install) into an MSIX package, without requiring the app's source code. It provides both an interactive UI and a command line.

## Signature / Usage

```powershell
# Install from winget
winget install "MSIX Packaging Tool"

# Offline install of a downloaded package
Add-AppxProvisionedPackage -Path C:\offline -PackagePath C:\MSIX\MyPackage.msix -LicensePath C:\MSIX\MyLicense.xml
```

Conversion flow in the UI (**Application package**):

1. Choose the packaging method: this computer, a remote machine, or a local Hyper-V VM.
2. **Prepare computer**: the tool enables the MSIX Packaging Tool Driver, and can temporarily disable Windows Update/Search.
3. **Choose the installer**: point to the `.msi`/`.exe`/App-V/script, or leave blank for manual install.
4. **Signing preference**: Device Guard signing, a `.pfx` certificate, a `.cer` file (no signing), or no signing (package can't be installed unsigned).
5. **Package information**: package name, display name, publisher name/display name, version, description, install location.
6. **Installation**: the tool monitors the system while you run through the installer wizard.
7. **Manage first launch tasks**: launch the app at least once to capture first-launch behavior; select the main entry point.
8. **Services report** (if applicable): review services detected during conversion.
9. **Create package**: choose a save location and click **Create**.

## Options / Props

| Prerequisite | Value |
|--------------|-------|
| OS | Windows 10, version 1809 or later |
| Privileges | Administrator |
| Account | Valid Microsoft account (MSA) to access the Store listing |

| Task | Icon in the tool |
|------|-------------------|
| Convert an installer to MSIX | **Application package** |
| Create a modification package | **Modification package** |
| View/edit an existing package's content or properties | **Package editor** |

## Notes

- App-V support is limited to App-V 5.1; for App-V 4.x, convert from the original source installer instead.
- Signing with a SHA1 certificate is not supported.
- Command-line conversion is also available (`MSIX Packaging Tool` CLI) for scripted/CI workflows, distinct from `makeappx.exe` which packages already-prepared file layouts rather than monitoring an installer.

## Related

- [What is MSIX?](./msix-overview.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
- [makeappx.exe CLI](./makeappx-cli.md)
- [Modification Packages](./modification-packages.md)
- [Package Support Framework](./package-support-framework.md)
