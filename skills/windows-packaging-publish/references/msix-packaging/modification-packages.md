# Modification Packages

A modification package is an MSIX package that stores customizations (registry keys, files, plugins) to overlay onto a main app's container, without repackaging the main app. Introduced in Windows 10, version 1809, primarily for enterprises that don't own the main app's source but need to customize it.

## Signature / Usage

```xml
<Dependencies>
    <TargetDeviceFamily Name="Windows.Desktop" MinVersion="10.0.15063.0"/>
    <uap4:MainPackageDependency Name="Main.App" Publisher="CN=Contoso, C=US" />
</Dependencies>

<Properties>
   <rescap6:ModificationPackage>true</rescap6:ModificationPackage>
</Properties>
```

```powershell
# List modification packages installed on the device
Get-AppPackage -PackageTypeFilter Optional
```

## Options / Props

| Creation method | How |
|------------------|-----|
| MSIX Packaging Tool | Select **Modification package**, specify the main package (MSIX version available locally), then edit customizations in Package Editor |
| MakeAppx.exe | Manually declare `uap4:MainPackageDependency` in the manifest, create `Registry.dat`/`User.dat`/`Userclass.dat` for the needed registry keys, then `makeappx pack` |

| `.dat` file | Registry hive captured |
|-------------|-------------------------|
| `Registry.dat` | `HKLM\Software\*` |
| `User.dat` | `HKCU\Software\*` |
| `Userclass.dat` | `HKCU\Software\Classes\*` |

## Notes

- `rescap6:ModificationPackage` must be `true` in the manifest for the package to work correctly on Windows 10, version 1903 and later.
- At runtime, the main package's and modification package's virtual registries (VREG) are merged so the main app sees the modification's keys/files.
- If multiple modification packages change the same value, conflicts are resolved by alphabetical order of the modification packages' names.
- File-system plugin customizations only work if the main app's executable is not itself inside a virtual file system (VFS).
- Install with the `-OptionalPackagePath` parameter; a modification package is a specialized case of an optional package (`Get-AppPackage -PackageTypeFilter Optional` lists both).

## Related

- [Optional Packages](./optional-packages.md)
- [MSIX Packaging Tool](./msix-packaging-tool.md)
- [makeappx.exe CLI](./makeappx-cli.md)
- [Package Manifest Schema](./package-manifest-schema.md)
