# Build Actions (ciBuildActions)

The execution result of a single action step (build, test, archive, or analyze) within a build run, including its status, artifacts, issues, and test results.

## Signature / Usage

```bash
# Read a build action
GET https://api.appstoreconnect.apple.com/v1/ciBuildActions/{id}

# List artifacts / issues / test results for an action
GET https://api.appstoreconnect.apple.com/v1/ciBuildActions/{id}/artifacts
GET https://api.appstoreconnect.apple.com/v1/ciBuildActions/{id}/issues
GET https://api.appstoreconnect.apple.com/v1/ciBuildActions/{id}/testResults
```

## Options / Props

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| Parent build run | `GET /v1/ciBuildActions/{id}/buildRun` |
| Artifacts | `GET /v1/ciBuildActions/{id}/artifacts` |
| Issues | `GET /v1/ciBuildActions/{id}/issues` |
| Test results | `GET /v1/ciBuildActions/{id}/testResults` |
| Artifact IDs | `GET /v1/ciBuildActions/{id}/relationships/artifacts` |
| Build run ID | `GET /v1/ciBuildActions/{id}/relationships/buildRun` |
| Issue IDs | `GET /v1/ciBuildActions/{id}/relationships/issues` |
| Test result IDs | `GET /v1/ciBuildActions/{id}/relationships/testResults` |

## Notes

- Build actions are defined per-workflow (`actionType`: `ARCHIVE`, `BUILD`, `TEST`, `ANALYZE`) and instantiated per build run; they are read-only via the API
- Use the `issues` and `testResults` relationships to surface failure details without downloading full artifacts

## Related

- [Build Runs](./build-runs.md)
- [Artifacts](./artifacts.md)
- [Issues](./issues.md)
- [Test Results](./test-results.md)
