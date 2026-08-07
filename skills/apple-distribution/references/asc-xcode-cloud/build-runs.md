# Build Runs (ciBuildRuns)

A single execution of a workflow (a "build") comprising one or more build actions, triggered manually or by a start condition.

## Signature / Usage

```bash
# Start a build
POST https://api.appstoreconnect.apple.com/v1/ciBuildRuns

# Read a build run
GET https://api.appstoreconnect.apple.com/v1/ciBuildRuns/{id}

# List actions for a build run
GET https://api.appstoreconnect.apple.com/v1/ciBuildRuns/{id}/actions
```

```json
// POST /v1/ciBuildRuns body (CiBuildRunCreateRequest)
{
  "data": {
    "type": "ciBuildRuns",
    "attributes": {},
    "relationships": {
      "workflow": {
        "data": { "type": "ciWorkflows", "id": "WORKFLOW_ID" }
      }
    }
  }
}
```

## Options / Props

### CiBuildRunCreateRequest

| Name | Type | Description |
|------|------|--------------|
| `data.type` | string | Must be `"ciBuildRuns"` |
| `data.attributes` | object | Empty object; no build-time attributes are set at creation |
| `data.relationships.workflow` | object | Required. References the `ciWorkflows` ID to run |
| `data.relationships.sourceBranchOrTag` | object | Optional. Overrides the branch/tag to build |
| `data.relationships.pullRequest` | object | Optional. References a pull request to build |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| List Xcode Cloud builds (App Store Connect builds produced) | `GET /v1/ciBuildRuns/{id}/builds` |
| List actions | `GET /v1/ciBuildRuns/{id}/actions` |
| Action IDs | `GET /v1/ciBuildRuns/{id}/relationships/actions` |
| Build IDs | `GET /v1/ciBuildRuns/{id}/relationships/builds` |

## Notes

- Starting a build without `sourceBranchOrTag`/`pullRequest` runs the workflow against its default start condition source
- A completed build run may produce one or more App Store Connect `builds` (TestFlight/App Store binaries) — do not confuse `ciBuildRuns` with the `builds` resource in ASC API Core

## Related

- [Workflows](./workflows.md)
- [Build Actions](./build-actions.md)
- [Builds](../asc-api-core/builds.md)
