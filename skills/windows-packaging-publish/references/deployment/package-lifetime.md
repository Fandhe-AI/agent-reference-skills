# Package Registration and Lifetime

Removing an MSIX package for a user doesn't always immediately delete its staged files. Windows tracks whether users, other packages, or running processes still reference a staged package.

## Signature / Usage

To avoid interrupting a running process when removing a package, call `PackageManager.RemovePackageAsync` with `RemovalOptions.DeferRemovalWhenPackagesAreInUse`; Windows completes the removal after the package is no longer in use.

```powershell
# Remove a user's registration (does not prove staged files are deleted)
Remove-AppxPackage -Package <PackageFullName>

# Diagnose references held by other users or provisioning
Get-AppxPackage -AllUsers
```

## Options / Props

| Term | Meaning |
| --- | --- |
| Stage | Place a package's payload in a Windows-managed installation store. |
| Register | Make a staged package available to a user and create its user-specific integrations. |
| Remove / deregister | Remove a user's registration and integrations. |
| Destage | Delete the staged package payload from storage. |

Strong references (prevent destaging):

- A user's explicit package registration.
- Provisioning that makes the package available to users.
- A static dependency declared through `PackageDependency`.
- A host-runtime dependency.
- A persisted dynamic dependency that only the package can satisfy.
- A process that is currently using package content.
- A system pin.
- Unified Update Platform (UUP) product membership.

## Notes

- A removal operation can deregister a package without immediately destaging it.
- On removal Windows first removes the user registration and user-specific integrations, then evaluates strong references: if one remains the package stays staged; if none remain it becomes eligible for destaging, and the payload is removed when deployment next evaluates and collects the unreferenced package. Destaging can occur after the removal operation completes.
- Weak references (for example resource-package relationships) don't keep a package staged on their own.
- Framework packages commonly remain staged because other packages depend on them; multiple Framework-package versions can remain side by side.
- If a process is using the package, removal normally requests application shutdown.
- Removing a provisioned package affects future registrations but doesn't remove registrations that already exist for users.

## Related

- [Package storage volumes](./package-volumes.md)
- [Managing MSIX with PowerShell](./powershell-msix-cmdlets.md)
