# MSIX Packaging

| Name | Description | Path |
| --- | --- | --- |
| App Streaming Install | Lets users launch apps while remaining files download in the background | [app-streaming-install.md](./app-streaming-install.md) |
| Asset Packages and Flat Bundles | Centralizes architecture/language/scale-agnostic files to remove duplication across packages | [asset-packages.md](./asset-packages.md) |
| Create a Package Support Framework Fixup | Author a new Package Support Framework fixup for a compatibility issue | [create-psf-fixup.md](./create-psf-fixup.md) |
| Differential (Delta) Package Updates | Package updates only download blocks that changed rather than the whole package | [differential-package-updates.md](./differential-package-updates.md) |
| Framework Packages | MSIX packages that other packages declare as dependencies to share common binaries/resources | [framework-packages.md](./framework-packages.md) |
| makeappx.exe (Command-Line Packaging) | `MakeAppx.exe` creates app packages and bundles from command line | [makeappx-cli.md](./makeappx-cli.md) |
| Modification Packages | MSIX packages that store customizations to overlay onto a main app without repackaging | [modification-packages.md](./modification-packages.md) |
| MSIX App Attach | Delivers MSIX applications by mounting a disk image rather than installing directly | [msix-app-attach.md](./msix-app-attach.md) |
| What is MSIX? | MSIX is the modern Windows app packaging format for reliable install/uninstall and updates | [msix-overview.md](./msix-overview.md) |
| MSIX Packaging Tool | Converts existing desktop installer to MSIX via UI or command line without source code | [msix-packaging-tool.md](./msix-packaging-tool.md) |
| Optional Packages and Related Sets | Optional packages contain DLC/extension content that integrates with a main package | [optional-packages.md](./optional-packages.md) |
| Package Asset Requirements (Icons, Tiles, Logos) | Windows displays app assets at multiple pixel sizes and scale factors | [package-asset-requirements.md](./package-asset-requirements.md) |
| Package Bundles and Architecture | MSIX bundles package multiple architecture/language/scale packages into one distributable | [package-bundles-architecture.md](./package-bundles-architecture.md) |
| Package Extensions How-To Guide | Predefined manifest extensions let packaged apps integrate with Windows | [package-extensions-guide.md](./package-extensions-guide.md) |
| Package Manifest Schema (AppxManifest.xml) | XML document containing info for deploy, display, update: identity, dependencies, capabilities | [package-manifest-schema.md](./package-manifest-schema.md) |
| MSIX Package Structure | Every MSIX contains app payload plus three core system files for deploy/verify/update | [package-structure.md](./package-structure.md) |
| Package Support Framework (PSF) | Open-source kit that applies runtime fixes to desktop apps to run correctly in MSIX container | [package-support-framework.md](./package-support-framework.md) |
| Resource Packages | Segments language/display-scale assets into separate packages Windows downloads by configuration | [resource-packages.md](./resource-packages.md) |
| Unsigned MSIX Package (Local Testing) | Since Windows 11, MSIX packages can be installed unsigned for faster local iteration | [unsigned-package.md](./unsigned-package.md) |
| Packaging with the Windows Application Packaging Project (Visual Studio) | Use Visual Studio's Windows Application Packaging Project to generate MSIX packages | [vs-packaging-project.md](./vs-packaging-project.md) |
