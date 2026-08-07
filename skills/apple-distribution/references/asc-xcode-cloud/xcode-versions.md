# Xcode Versions (ciXcodeVersions)

An Xcode version available in Xcode Cloud's build infrastructure, used to configure a workflow's build environment.

## Signature / Usage

```bash
# List Xcode versions
GET https://api.appstoreconnect.apple.com/v1/ciXcodeVersions

# Read an Xcode version
GET https://api.appstoreconnect.apple.com/v1/ciXcodeVersions/{id}

# List compatible macOS versions
GET https://api.appstoreconnect.apple.com/v1/ciXcodeVersions/{id}/macOsVersions
```

## Options / Props

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| Compatible macOS versions | `GET /v1/ciXcodeVersions/{id}/macOsVersions` |
| macOS version IDs | `GET /v1/ciXcodeVersions/{id}/relationships/macOsVersions` |

## Notes

- Read-only resource; to change a workflow's build environment, update the `xcodeVersion` relationship on the `ciWorkflows` resource, not this resource
- This resource supports JSON web tokens with a lifetime of up to six months

## Related

- [macOS Versions](./macos-versions.md)
- [Workflows](./workflows.md)
