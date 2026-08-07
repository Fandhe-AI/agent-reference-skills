# Issues (ciIssues)

A warning or error produced during a build action, associated with a source file location.

## Signature / Usage

```bash
# Read an issue
GET https://api.appstoreconnect.apple.com/v1/ciIssues/{id}
```

## Options / Props

| Attribute | Description |
|-----------|--------------|
| `issueType` | The kind of issue (e.g., build error, warning, test failure) |
| `message` | Human-readable description of the issue |
| `fileSource` | `FileLocation` object — file path, line number, and column of the issue |

## Notes

- This resource supports JSON web tokens with a lifetime of up to six months
- List issues for a build action via `GET /v1/ciBuildActions/{id}/issues` rather than filtering `ciIssues` directly

## Related

- [Build Actions](./build-actions.md)
