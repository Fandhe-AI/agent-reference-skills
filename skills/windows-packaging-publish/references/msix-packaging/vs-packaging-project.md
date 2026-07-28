# Packaging with the Windows Application Packaging Project (Visual Studio)

Use the **Windows Application Packaging Project** in Visual Studio to generate an MSIX package for a desktop (WinForms/WPF/Win32) or UWP app from source code, then distribute it to the Microsoft Store, the web, or an enterprise channel.

## Signature / Usage

1. Open the solution containing your desktop app project.
2. Add a **Windows Application Packaging Project** (choose the language matching your app), set as startup project.
3. Under the packaging project's **Dependencies** node, choose **Add Project Reference...** and select your desktop app project. If you have multiple apps, set one as **Set as Entry Point**.
4. Build the packaging project.
5. Configure `Package.appxmanifest` via the manifest designer (Visual Assets tab for icons/logos, Packaging tab for signing/identity).
6. Right-click the project → **Publish** → **Create App Packages** to generate a package/bundle (or Store submission upload file).

## Options / Props

| Package type | Extension | Purpose |
|--------------|-----------|---------|
| App Package | `.msix` / `.appx` | Single package targeted at one device architecture |
| App Bundle | `.msixbundle` / `.appxbundle` | Contains multiple app packages for different architectures; preferred for widest device reach |
| App Package Upload File | `.msixupload` / `.appxupload` | Store-submission-only file combining package/bundle + symbol file for crash analytics |

| Requirement | Value |
|-------------|-------|
| Visual Studio version | 2017 15.5+ (Windows Application Packaging Project template) |
| Required workload | Universal Windows Platform development, or the MSIX Packaging Tools optional component in .NET / .NET desktop workloads |
| Minimum target | Windows 10 Anniversary Update (10.0; Build 14393) |
| WinUI 3 apps | Use single-project MSIX instead of a separate packaging project |

## Notes

- All MSIX packages must be signed with a certificate; Visual Studio 2019+ no longer auto-generates a temporary certificate — create/export one via PowerShell cmdlets, or sign with a certificate in Azure Key Vault.
- To build the Windows Application Packaging Project (WAP) for x64, add x64 architecture through Configuration Manager before or after adding the WAP project.
- Windows App Certification Kit (WACK), reachable from the Create App Packages wizard, is deprecated but still usable for optional local pre-submission checks; official certification happens at Partner Center submission time.
- This project type produces `.msix`/`.msixbundle`/`.msixupload` output; it does not itself provide command-line packaging — use `makeappx.exe` for manual/CI packaging.

## Related

- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [makeappx.exe CLI](./makeappx-cli.md)
- [Package Bundles and Architecture](./package-bundles-architecture.md)
- [Package Asset Requirements](./package-asset-requirements.md)
