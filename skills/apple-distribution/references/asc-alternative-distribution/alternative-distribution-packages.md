# Alternative Distribution Packages

Distributable package IDs for a marketplace app, an app on an alternative marketplace, or an app distributed via web distribution, containing versioned variants and delta updates.

## Overview

App developers can create and manage alternative distribution package IDs through the App Store Connect API. These packages are valid for distributing marketplace apps, apps on alternative marketplaces, or through web distribution. Packages contain versioned variants and delta updates to optimize download sizes.

## Signature / Usage

```
POST   /v1/alternativeDistributionPackages
GET    /v1/alternativeDistributionPackages/{id}
GET    /v1/alternativeDistributionPackages/{id}/versions
GET    /v1/alternativeDistributionPackages/{id}/relationships/versions
GET    /v1/appStoreVersions/{id}/alternativeDistributionPackage
```

## Options / Props

### Packages

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/alternativeDistributionPackages` | Create an alternative distribution package for an App Store version |
| GET | `/v1/alternativeDistributionPackages/{id}` | Read alternative distribution package information |
| GET | `/v1/alternativeDistributionPackages/{id}/versions` | Read version information for an alternative distribution package |
| GET | `/v1/alternativeDistributionPackages/{id}/relationships/versions` | Read version IDs for an alternative distribution package |
| GET | `/v1/appStoreVersions/{id}/alternativeDistributionPackage` | Read an app store version's alternative distribution package |

### Versions, Variants & Deltas

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/alternativeDistributionPackageVersions/{id}` | Read information for an alternative distribution package version |
| GET | `/v1/alternativeDistributionPackageVersions/{id}/variants` | List variants information for a package version |
| GET | `/v1/alternativeDistributionPackageVersions/{id}/relationships/variants` | List variant IDs for a package version |
| GET | `/v1/alternativeDistributionPackageVersions/{id}/deltas` | List deltas information for a package version |
| GET | `/v1/alternativeDistributionPackageVersions/{id}/relationships/deltas` | List delta IDs for a package version |
| GET | `/v1/alternativeDistributionPackageVariants/{id}` | Read variant information for an alternative distribution package |
| GET | `/v1/alternativeDistributionPackageDeltas/{id}` | Read information for alternative distribution package deltas |

## Notes

- `AlternativeDistributionPackageVersion` is a versioned snapshot of a package with its associated variants and deltas
- `AlternativeDistributionPackageVariant` is a device-specific file package targeting a particular device family
- `AlternativeDistributionPackageDelta` is an incremental update package containing only changes between two versions to reduce download size
- A package is created automatically once the app reaches `Pending Developer Release`, `Pending Apple Release`, or `Ready for Distribution` after App Review approval; otherwise the developer creates it manually via POST

## Related

- [Configuring Alternative Marketplaces and Alternative Marketplace Apps](./configuring-alternative-marketplaces.md)
- [Configuring Apps for Web Distribution](./configuring-web-distribution.md)
- [Notifications](./notifications.md)
