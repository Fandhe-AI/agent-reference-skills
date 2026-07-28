# PackageId Class

`Windows.ApplicationModel.PackageId` provides package identification info such as name, version, architecture, resource ID, and publisher — the 5-part tuple that makes up a package's identity, exposed as individual properties.

## Signature / Usage

```csharp
using Windows.ApplicationModel;

PackageId id = Package.Current.Id;
string name = id.Name;
string publisher = id.Publisher;
string familyName = id.FamilyName;
string fullName = id.FullName;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Name` | `String` | Name of the package. |
| `Publisher` | `String` | Publisher of the package (X.509 subject name). |
| `PublisherId` | `String` | 13-char Base32-encoded publisher ID. |
| `Version` | `PackageVersion` | Package version info (Major, Minor, Build, Revision). |
| `Architecture` | `ProcessorArchitecture` | Processor architecture for which the package was created. |
| `ResourceId` | `String` | Resource ID of the package (e.g. language/scale variant). |
| `FullName` | `String` | The full package identity string (`PackageFullName`). |
| `FamilyName` | `String` | The package family name string (`PackageFamilyName`). |

## Notes

- Obtain a `PackageId` via `Package.Current.Id` (or another `Package` instance's `Id`); there is no public constructor.
- Do not confuse with the Win32 `PACKAGE_ID` struct (`appmodel.h`), which is the native equivalent used by APIs such as `PackageFamilyNameFromId`.

## Related

- [Package Class](./package-class.md)
- [Package Identity Overview](./package-identity-overview.md)
