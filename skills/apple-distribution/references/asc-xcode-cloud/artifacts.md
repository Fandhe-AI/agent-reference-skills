# Artifacts (ciArtifacts)

A file output produced by a build action, such as an app archive, test result bundle, or build log.

## Signature / Usage

```bash
# Read an artifact
GET https://api.appstoreconnect.apple.com/v1/ciArtifacts/{id}
```

## Options / Props

| Attribute | Description |
|-----------|--------------|
| `fileType` | Category of the artifact (e.g., archive, log, test bundle) |
| `fileName` | Name of the artifact file |
| `fileSize` | Size in bytes |
| `downloadUrl` | Time-limited URL to download the artifact |

## Notes

- This resource supports JSON web tokens with a lifetime of up to six months
- Use artifact metadata to build statistics or archive Xcode Cloud outputs on your own storage

## Related

- [Build Actions](./build-actions.md)
