# MSIX App Attach

MSIX App Attach delivers MSIX applications to physical and virtual machines by mounting a disk image (VHD/VHDX/CIM) containing the app, rather than installing it directly. It is purpose-built for supported products such as Azure Virtual Desktop (AVD), and differs from a regular MSIX install.

## Signature / Usage

Creating an App Attach-ready package from Visual Studio 2022 (WinUI 3 apps only):

1. Install the **App Attach Toolkit** extension from the Visual Studio Marketplace, and the **Azure development** workload.
2. Create a WinUI 3 C#/C++ **Blank App, Packaged (WinUI 3 in Desktop)** project.
3. In Solution Explorer, right-click the project → **Package and Publish** → **Create App Attach Packages**.
4. Choose an output location for the MSIX package and VHDx file, and select the target platform.
5. Sign the package with a certificate trusted on the target machine.
6. Choose a publish target:
   - **Only create a disk image** — produces the App Attach-ready disk image without publishing it.
   - **Local App Attach** — publishes locally for testing/troubleshooting.
   - **Azure (AVD) App Attach** — publishes directly to an existing AVD host pool (subscription, resource group, storage account, file share, application group, workspace, host pool).

Uninstalling a locally attached app:

```powershell
$msixPackageFullName = <msixPackageFullName>
Remove-AppxPackage $msixPackageFullName -PreserveRoamableApplicationData
```

## Options / Props

| Prerequisite | Value |
|--------------|-------|
| IDE | Visual Studio 2022 with "Azure development" workload |
| App type | WinUI 3 (C# or C++) — MSIX image creation currently supports WinUI 3 apps only |
| Target | Windows 11 Enterprise / Windows 10 Enterprise (for Local App Attach APIs) |
| Extension | App Attach Toolkit (Visual Studio Marketplace) |

## Notes

- App Attach is a distribution mechanism layered on top of MSIX for AVD-style scenarios; it is not the general MSIX install path (see MSIX Package Structure / Visual Studio Packaging Project for that).
- The extension creates an `AppAttachPackages` folder and `appattach.config` file at the solution root; these hold MSIX/VHDx artifacts and app metadata.
- Common failure causes: missing MSIX dependencies on the target VM(s), or the VHDx file share being disconnected from the VM.

## Related

- [What is MSIX?](./msix-overview.md)
- [Visual Studio Packaging Project](./vs-packaging-project.md)
