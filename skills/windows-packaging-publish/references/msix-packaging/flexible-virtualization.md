# Flexible Virtualization

Lets an app declare that some files and Registry entries stay visible to other apps and persist on uninstall, while all other files and Registry entries remain private and are removed on uninstall. Windows 11 adds per-folder / per-key exclusions.

## Signature / Usage

```xml
<Package
  xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10"
  xmlns:desktop6="http://schemas.microsoft.com/appx/manifest/desktop/windows10/6"
  xmlns:rescap="http://schemas.microsoft.com/appx/manifest/foundation/windows10/restrictedcapabilities"
  xmlns:virtualization="http://schemas.microsoft.com/appx/manifest/virtualization/windows10"
  IgnorableNamespaces="rescap desktop6 virtualization">
  <Properties>
    <desktop6:RegistryWriteVirtualization>disabled</desktop6:RegistryWriteVirtualization>
    <desktop6:FileSystemWriteVirtualization>disabled</desktop6:FileSystemWriteVirtualization>

    <virtualization:FileSystemWriteVirtualization>
      <virtualization:ExcludedDirectories>
        <virtualization:ExcludedDirectory>$(KnownFolder:LocalAppData)\Fabrikam\Widgets</virtualization:ExcludedDirectory>
        <virtualization:ExcludedDirectory>$(KnownFolder:RoamingAppData)\Fabrikam\Widgets</virtualization:ExcludedDirectory>
      </virtualization:ExcludedDirectories>
    </virtualization:FileSystemWriteVirtualization>

    <virtualization:RegistryWriteVirtualization>
      <virtualization:ExcludedKeys>
        <virtualization:ExcludedKey>HKEY_CURRENT_USER\Software\Fabrikam\Widgets</virtualization:ExcludedKey>
      </virtualization:ExcludedKeys>
    </virtualization:RegistryWriteVirtualization>
  </Properties>
  <Capabilities>
    <rescap:Capability Name="unvirtualizedResources"/>
  </Capabilities>
</Package>
```

## Options / Props

| Property | Description |
|----------|-------------|
| `desktop6:RegistryWriteVirtualization=disabled` | Writes to HKCU go to the unvirtualized location, visible outside the package, not cleaned up on uninstall |
| `desktop6:FileSystemWriteVirtualization=disabled` | Writes to AppData go to the unvirtualized location, visible outside the package, not cleaned up on uninstall |
| `virtualization:ExcludedDirectories` / `ExcludedDirectory` | Windows 11+: specific folders to leave unvirtualized |
| `virtualization:ExcludedKeys` / `ExcludedKey` | Windows 11+: specific Registry keys to leave unvirtualized |

Default MSIX behavior (pre-Windows 11):

| Location | Behavior |
|----------|----------|
| HKCU install-time | `user.dat` entries written to a private per-app hive, merged for reads, gone on uninstall |
| HKCU run-time | Writes go to a private per-app, per-user hive; removed on uninstall |
| HKLM install-time | `registry.dat` entries presented as HKLM, merged for reads, never actually added to the registry |
| HKLM run-time | Writes allowed only if no matching key in package hive and user has access (effectively elevated Centennial apps) |
| Well-known folders | `VFS` folder contents merged with unvirtualized locations |
| AppData run-time | <=1809: copy-on-write for all writes. >1809: newly created files/folders go to private location; existing AppData files are modified in place. No VFS for AppData |

## Notes

- Windows 11 behavior: only file system locations within `%USERPROFILE%\AppData` and Registry locations within HKCU can be declared.
- The new declarations take precedence where recognized; older devices ignore them and honor the old declarations.
- `unvirtualizedResources` restricted capability support was introduced in Windows 10 version 1903 (build 18362).
- The `desktop6` mechanism turns off HKCU and/or AppData virtualization altogether; it is not fine-grained.
- Typical use: games saving data to AppData that must persist after uninstall.
- Source: https://learn.microsoft.com/en-us/windows/msix/desktop/flexible-virtualization, last updated 10/20/2021 (ms.date).

## Related

- [MSIX Containerization Overview](./msix-containerization-overview.md)
- [Package Manifest Schema](./package-manifest-schema.md)
- [MSIX Features and Supported Platforms](./supported-platforms.md)
