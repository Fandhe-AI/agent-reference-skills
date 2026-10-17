# MSIX Packaging

| Name | Description | Path |
|------|-------------|------|
| App Streaming Install | Download app's essential files first for immediate launch | [app-streaming-install.md](./app-streaming-install.md) |
| App-V vs. MSIX Feature Comparison | Feature comparison to choose between App-V and MSIX | [appv-vs-msix-comparison.md](./appv-vs-msix-comparison.md) |
| Asset Packages and Flat Bundles | Centralize architecture/language/scale-agnostic files in one package | [asset-packages.md](./asset-packages.md) |
| Create a Package Support Framework Fixup | Author a custom runtime API replacement for MSIX apps | [create-psf-fixup.md](./create-psf-fixup.md) |
| Custom Properties for App Extensions | App extension properties readable without loading content | [custom-props-app-extensions.md](./custom-props-app-extensions.md) |
| Differential (Delta) Package Updates | Download only changed 64 KB blocks on app update | [differential-package-updates.md](./differential-package-updates.md) |
| Flexible Virtualization | Keep selected files and registry entries visible across apps | [flexible-virtualization.md](./flexible-virtualization.md) |
| Framework Packages | Shared MSIX package used as a dependency by other packages | [framework-packages.md](./framework-packages.md) |
| Automate MSIX CI with GitHub Actions (WinUI) | Build, sign, and package single-project MSIX WinUI apps in CI | [github-actions-winui-ci.md](./github-actions-winui-ci.md) |
| Know Your Installer (Conversion Readiness) | Installer behaviors to address before MSIX conversion | [know-your-installer.md](./know-your-installer.md) |
| Support Legacy Context Menus | Register legacy IContextMenu shell extensions via manifest | [legacy-context-menus.md](./legacy-context-menus.md) |
| makeappx.exe (Command-Line Packaging) | Command-line tool to create and sign MSIX packages | [makeappx-cli.md](./makeappx-cli.md) |
| Packaging Overview and Migrating from Legacy Installers | Packaged vs. sparse vs. unpackaged models and migration path | [migrate-from-legacy-installers.md](./migrate-from-legacy-installers.md) |
| Modification Packages | MSIX overlay for app customization without repackaging | [modification-packages.md](./modification-packages.md) |
| MSIX App Attach | Deliver MSIX apps via disk image mount to VMs | [msix-app-attach.md](./msix-app-attach.md) |
| MSIX AppContainer Apps | Run packaged desktop apps in AppContainer (partial trust) | [msix-appcontainer-apps.md](./msix-appcontainer-apps.md) |
| MSIX Containerization Overview | OS-level app isolation with a virtual file system | [msix-containerization-overview.md](./msix-containerization-overview.md) |
| What is MSIX? | Modern Windows app packaging format | [msix-overview.md](./msix-overview.md) |
| MSIX and CI/CD Pipelines (Azure DevOps) | Build and sign MSIX in Azure Pipelines (YAML) | [msix-packaging-extension.md](./msix-packaging-extension.md) |
| MSIX Packaging Tool | Convert existing desktop installers to MSIX | [msix-packaging-tool.md](./msix-packaging-tool.md) |
| MSIX SDK | Cross-platform library to create and verify MSIX packages | [msix-sdk.md](./msix-sdk.md) |
| MSIX SDK on Linux and Cross-Platform Distribution | Build MSIX packages on Linux with the MSIX SDK | [msix-sdk-linux.md](./msix-sdk-linux.md) |
| MSIX Toolkit | Community-driven scripts and tools for MSIX | [msix-toolkit.md](./msix-toolkit.md) |
| MSIX on Windows 10 and Windows 11 | MSIX feature availability by Windows 10 / 11 release | [msix-windows10-windows11.md](./msix-windows10-windows11.md) |
| Native Images (ReadyToRun) | Precompile .NET Framework binaries to improve startup | [native-images-r2r.md](./native-images-r2r.md) |
| Optional Packages and Related Sets | Downloadable content (DLC) or split large apps | [optional-packages.md](./optional-packages.md) |
| Package Asset Requirements (Icons, Tiles, Logos) | Icon and tile asset specifications by scale factor | [package-asset-requirements.md](./package-asset-requirements.md) |
| Package Bundles and Architecture | Bundle multiple architecture packages into a single file | [package-bundles-architecture.md](./package-bundles-architecture.md) |
| Package Extensions How-To Guide | Manifest extensions for firewall, file handlers, and similar features | [package-extensions-guide.md](./package-extensions-guide.md) |
| Package Manifest Schema (AppxManifest.xml) | XML package identity, dependencies, capabilities | [package-manifest-schema.md](./package-manifest-schema.md) |
| MSIX Package Structure | Package format with metadata and signature files | [package-structure.md](./package-structure.md) |
| Package Support Framework (PSF) | Open-source runtime fixes for MSIX containers | [package-support-framework.md](./package-support-framework.md) |
| MSIX Package Types | Main, Framework, Resource, Optional, and Bundle types | [package-types.md](./package-types.md) |
| How Packaged Desktop Apps Run on Windows | App types, VFS, registry virtualization, uninstall | [packaged-desktop-app-internals.md](./packaged-desktop-app-internals.md) |
| Create Package with the Packaging Layout | Single XML layout consumed by MakeAppx.exe | [packaging-layout.md](./packaging-layout.md) |
| MSIX Packaging Tool Command-Line Conversion | Automate installer conversion via conversion templates | [packaging-tool-command-line.md](./packaging-tool-command-line.md) |
| MSIX Packaging Tool Conversion Environment | VM, remote, and disconnected conversion setup | [packaging-tool-environment.md](./packaging-tool-environment.md) |
| MSIX Packaging Tool Best Practices and Known Issues | Tool settings, testing practices, known issues | [packaging-tool-known-issues.md](./packaging-tool-known-issues.md) |
| Analyze and Resolve Runtime Issues (Package Analyzer) | Analyze runtime traces and apply suggested fixes | [packaging-tool-package-analyzer.md](./packaging-tool-package-analyzer.md) |
| MSIX Packaging Tool Package Editor | Edit an existing MSIX without repackaging the installer | [packaging-tool-package-editor.md](./packaging-tool-package-editor.md) |
| Convert an Installer That Includes Services | Convert installers with Windows services to MSIX | [packaging-tool-services.md](./packaging-tool-services.md) |
| Prepare to Package a Desktop App | Checklist of desktop app behaviors before MSIX packaging | [prepare-desktop-app-for-packaging.md](./prepare-desktop-app-for-packaging.md) |
| PSF Fixes: Working Directory, Write Permission, Parameters | Three PSF runtime fixes applied by repackaging | [psf-common-fixes.md](./psf-common-fixes.md) |
| Automated PSF Config Generation (MSIX Packaging Tool) | Generate PSF config.json via the Packaging Tool | [psf-mpt-integration.md](./psf-mpt-integration.md) |
| Run Scripts with the Package Support Framework | Run PowerShell scripts before and after the app | [psf-run-scripts.md](./psf-run-scripts.md) |
| Apply Package Support Framework in Visual Studio | Add PSF launcher and fix DLL to a packaging project | [psf-visual-studio.md](./psf-visual-studio.md) |
| Resource Packages | Language/scale-specific assets packaged separately from the main app | [resource-packages.md](./resource-packages.md) |
| Single-Project MSIX Packaging | WinUI 3 apps build directly to MSIX without a separate packaging project | [single-project-msix.md](./single-project-msix.md) |
| Group Applications Under a Start Menu Folder | VisualGroup attribute to group apps in Start menu | [start-menu-group.md](./start-menu-group.md) |
| MSIX Features and Supported Platforms | Minimum OS support and feature availability by release | [supported-platforms.md](./supported-platforms.md) |
| Unsigned MSIX Package (Local Testing) | Install unsigned MSIX packages in Windows 11 | [unsigned-package.md](./unsigned-package.md) |
| Packaging with the Windows Application Packaging Project (Visual Studio) | Visual Studio project type to generate MSIX packages | [vs-packaging-project.md](./vs-packaging-project.md) |
