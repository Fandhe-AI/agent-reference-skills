# Package Identity

| Name | Description | Path |
|------|-------------|------|
| APIs Requiring Package Identity | A subset of Windows platform features and APIs only work in a process that has package identity — either full MSIX… | [apis-requiring-package-identity.md](./apis-requiring-package-identity.md) |
| Detecting Package Identity | At runtime, an app can determine whether its process has package identity (i.e. whether it is running as MSIX or was… | [detect-package-identity.md](./detect-package-identity.md) |
| Get Activation Info for Packaged Apps | Starting in Windows 10, version 1809, packaged desktop (Win32/.NET) apps can call GetActivatedEventArgs at startup… | [get-activation-info-for-packaged-apps.md](./get-activation-info-for-packaged-apps.md) |
| Integrate a Packaged Desktop App with File Explorer | Windows 11 apps extend the modern File Explorer context menu by implementing IExplorerCommand and registering the… | [integrate-packaged-app-with-file-explorer.md](./integrate-packaged-app-with-file-explorer.md) |
| Package Class | Windows.ApplicationModel.Package provides information about an installed package: its identity, location,… | [package-class.md](./package-class.md) |
| PackageId Class | Windows.ApplicationModel.PackageId provides package identification info such as name, version, architecture, resource… | [package-id-class.md](./package-id-class.md) |
| Package Identity Overview | Package identity is a unique identifier that identifies a package across space and time. It is a logical construct with… | [package-identity-overview.md](./package-identity-overview.md) |
| PackageManager Class | Windows.Management.Deployment.PackageManager manages the software (MSIX packages) available to a user: adding,… | [package-manager.md](./package-manager.md) |
| Package Uninstall and Update Behavior | How a package is uninstalled or updated depends on its packaging model: full MSIX packages are managed atomically by… | [package-uninstall-update.md](./package-uninstall-update.md) |
| Packaged vs Unpackaged Behavior | Whether a process has package identity changes which Windows APIs work, how the app is sandboxed, and how storage/state… | [packaged-vs-unpackaged-behavior.md](./packaged-vs-unpackaged-behavior.md) |
| MSIX Persistent Identity | Signs a package with a new certificate while preserving the app's update experience: an artifact cryptographically… | [persistent-identity.md](./persistent-identity.md) |
| Sparse Packages and External Location Packages | Packaging with external location (also called a sparse package) grants package identity to an existing unpackaged… | [sparse-packages-external-location.md](./sparse-packages-external-location.md) |
