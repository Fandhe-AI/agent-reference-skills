# MSIX Shared Package Container

Enterprise-only feature that creates a shared runtime container for multiple MSIX packages, merging their virtual file system and virtual registry so the apps can access one another's package root files and state (used for customization, shared prerequisites, and add-ons for converted apps).

## Signature / Usage

```xml
<?xml version="1.0" encoding="utf-8"?>
<AppSharedPackageContainer Name="ContosoContainer">
  <PackageFamily Name="Fabrikam.MainApp_8wekyb3d8bbwe"/>
  <PackageFamily Name="Contoso.MainApp_8wekyb3d8bbwe"/>
  <PackageFamily Name="ContosoCustomize_7xekyb3d8ccde"/>
</AppSharedPackageContainer>
```

```powershell
Add-AppSharedPackageContainer <path>
Get-AppSharedPackageContainer -Name <name>
Reset-AppSharedPackageContainer -Name <name>
Remove-AppSharedPackageContainer -Name <name>
```

## Options / Props

| Command | Description |
| --- | --- |
| `Add-AppSharedPackageContainer <path>` | Deploys the shared package container definition for the current user. Optional `-ForceApplicationShutdown` closes all packages currently running in the container. |
| `Get-AppSharedPackageContainer -Name <name>` | Gets information about the container, including which packages are inside it. |
| `Reset-AppSharedPackageContainer -Name <name>` | Destroys all application data of the container, including virtual files and registry keys. |
| `Remove-AppSharedPackageContainer -Name <name>` | Removes the container definition. Optional `-ForceApplicationShutdown` closes all packages in the container. |
| `Add-AppProvisionedSharedPackageContainer -DefinitionFile "<filepath>" -Online` | Deploys a provisioned (all-users) shared package container. |
| `Get-AppProvisionedSharedPackageContainer -Online` | Verifies that a provisioned shared package container is deployed. |
| `Remove-AppProvisionedSharedPackageContainer -Name "<name>" -Online` | Removes a provisioned shared package container. |

## Notes

- Requires administrative privileges; this is an enterprise-only feature (available from Windows 10 Insider Preview Build 21354 onward), and all member packages must be `.msix`.
- Only main packages need to be listed in the container definition XML; optional packages and modification packages automatically join the container of their main package.
- Package order in the definition sets conflict-resolution priority (topmost package wins when files collide).
- An app can belong to only one shared package container; deploying a definition that includes an app already in another container results in an error.
- Container deployment is independent of app deployment: apps don't need to be installed before the container definition is deployed, and apps inside the container can update independently without modifying the container definition.

## Related

- [Choose a distribution path](./choose-distribution-path.md)
