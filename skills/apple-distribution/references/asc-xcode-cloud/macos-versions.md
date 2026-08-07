# macOS Versions (ciMacOsVersions)

A macOS version available in Xcode Cloud's build infrastructure, used to configure a workflow's build environment.

## Signature / Usage

```bash
# List macOS versions
GET https://api.appstoreconnect.apple.com/v1/ciMacOsVersions

# Read a macOS version
GET https://api.appstoreconnect.apple.com/v1/ciMacOsVersions/{id}

# List compatible Xcode versions
GET https://api.appstoreconnect.apple.com/v1/ciMacOsVersions/{id}/xcodeVersions
```

## Options / Props

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| Compatible Xcode versions | `GET /v1/ciMacOsVersions/{id}/xcodeVersions` |
| Xcode version IDs | `GET /v1/ciMacOsVersions/{id}/relationships/xcodeVersions` |

## Notes

- Read-only resource; to change a workflow's build environment, update the `macOsVersion` relationship on the `ciWorkflows` resource, not this resource
- This resource supports JSON web tokens with a lifetime of up to six months

## Related

- [Xcode Versions](./xcode-versions.md)
- [Workflows](./workflows.md)
