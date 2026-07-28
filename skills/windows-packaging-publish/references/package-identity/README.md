# Package Identity

| Name | Description | Path |
|------|-------------|------|
| Package Identity Overview | The 5-part tuple (Name, Publisher, Version, ProcessorArchitecture, ResourceId) plus PackageFullName / PackageFamilyName / PublisherId | [package-identity-overview.md](./package-identity-overview.md) |
| APIs Requiring Package Identity | Windows features/APIs gated by package identity and why | [apis-requiring-package-identity.md](./apis-requiring-package-identity.md) |
| Package Class | `Windows.ApplicationModel.Package` — Current, Id, InstalledLocation, DisplayName, Dependencies | [package-class.md](./package-class.md) |
| PackageId Class | `Windows.ApplicationModel.PackageId` — Name, Publisher, Version, Architecture, ResourceId, FullName, FamilyName | [package-id-class.md](./package-id-class.md) |
| PackageManager Class | `Windows.Management.Deployment.PackageManager` — AddPackageAsync, RegisterPackageAsync, RemovePackageAsync, FindPackages | [package-manager.md](./package-manager.md) |
| Sparse Packages and External Location Packages | Granting package identity to unpackaged apps via `uap10:AllowExternalContent` | [sparse-packages-external-location.md](./sparse-packages-external-location.md) |
| Detecting Package Identity | `GetCurrentPackageFullName` and error codes for runtime detection | [detect-package-identity.md](./detect-package-identity.md) |
| Packaged vs Unpackaged Behavior | API/behavior differences between packaged and unpackaged processes | [packaged-vs-unpackaged-behavior.md](./packaged-vs-unpackaged-behavior.md) |
| Package Uninstall and Update Behavior | How install/update/uninstall differs by packaging model | [package-uninstall-update.md](./package-uninstall-update.md) |
