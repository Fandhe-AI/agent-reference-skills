# Package Identity Overview

**Package identity** is a unique identifier that identifies a package across space and time. It is a logical construct with 5 parts (the *5-part tuple*): `Name`, `Version`, `Architecture`, `ResourceId`, `Publisher`. No two packages share the same identity, and any change to a package's bits requires a different identity.

## Signature / Usage

```xml
<Identity Name="Contoso.App"
          Publisher="CN=Contoso"
          Version="1.0.0.0"
          ProcessorArchitecture="x64" />
```

## Options / Props

| Field | Description |
|------|-------------|
| Name | Developer-chosen name. Unique within the Microsoft Store, not guaranteed unique in the general ecosystem. Package String (3-50 chars). |
| Publisher | The developer's subject name from their signing certificate (X.509). Case-sensitive, up to 8192 chars. |
| Version | `Major.Minor.Build.Revision` (DotQuad), must increase with updates. Range `0.0.0.0`–`65535.65535.65535.65535`. |
| ProcessorArchitecture | `neutral`, `x86`, `x64`, `arm`, `arm64`, or `x86a64`. Indicates systems the package can run on, not that it exclusively contains that architecture's code. |
| ResourceId | Developer-chosen string identifying a resource package (e.g. language, scale). `~` for bundles. Package String (0-30 chars). |
| PackageFamilyName | Opaque string derived from `Name` + `PublisherId`: `<Name>_<PublisherId>`. Often called a "version-less Package Full Name". Data/security scoping is typically per family. |
| PackageFullName | Opaque string derived from all 5 parts: `<Name>_<Version>_<Architecture>_<ResourceId>_<PublisherId>`. Uniquely identifies an MSIX package or bundle. |
| PublisherId | 13-char fixed-length Base32 (Crockford variant) string derived from `Publisher`. Ordinal case-insensitive. |

## Notes

- Example `PackageFullName`: `Microsoft.Windows.Photos_2020.20090.1002.0_x64__8wekyb3d8bbwe`. Example `PackageFamilyName`: `Microsoft.Windows.Photos_8wekyb3d8bbwe`.
- `Architecture=neutral` does not mean "no executable code" — it means the package works on all architectures (it can bundle per-architecture binaries and `LoadLibrary` the right one at runtime).
- Package identity is mostly case-insensitive (but preserves case); `Publisher` is case-sensitive.
- Unsigned packages still require a `Publisher` field containing the Unsigned marker OID as the last component.
- **Package identity vs. application identity**: a package identity (5-part tuple) uniquely identifies a *package* (unit of distribution/deployment); application identity (`ApplicationUserModelID` / AUMID) uniquely identifies an *application* within that package and is used by Windows for taskbar grouping, notification routing, and app lifecycle. A single package can declare 0-100 applications; framework and resource packages declare none.
- The `PackageId` object (`Windows.ApplicationModel.PackageId`) exposes the 5-part tuple as individual properties.

## Related

- [PackageId Class](./package-id-class.md)
- [Package Class](./package-class.md)
- [APIs Requiring Package Identity](./apis-requiring-package-identity.md)
- [Detecting Package Identity](./detect-package-identity.md)
