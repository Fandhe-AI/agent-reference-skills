# Workflows (ciWorkflows)

A set of build/test/archive actions and start conditions (branch, tag, pull request, or schedule) that Xcode Cloud runs for a product.

## Signature / Usage

```bash
# Create a workflow
POST https://api.appstoreconnect.apple.com/v1/ciWorkflows

# Read/list/update/delete
GET    https://api.appstoreconnect.apple.com/v1/ciWorkflows/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/ciWorkflows/{id}
DELETE https://api.appstoreconnect.apple.com/v1/ciWorkflows/{id}
```

```json
// POST /v1/ciWorkflows body (CiWorkflowCreateRequest)
{
  "data": {
    "type": "ciWorkflows",
    "attributes": {
      "name": "Release",
      "description": "Archive and upload to TestFlight",
      "containerFilePath": "MyApp.xcodeproj",
      "isEnabled": true,
      "isLockedForEditing": false,
      "clean": false,
      "actions": [
        { "name": "Archive iOS", "actionType": "ARCHIVE", "scheme": "MyApp", "platform": "IOS", "isRequiredToPass": true }
      ],
      "branchStartCondition": {
        "source": { "isAllMatch": false, "patterns": [{ "pattern": "main", "isPrefix": false }] },
        "autoCancel": true
      }
    },
    "relationships": {
      "product": { "data": { "type": "ciProducts", "id": "PRODUCT_ID" } },
      "xcodeVersion": { "data": { "type": "ciXcodeVersions", "id": "XCODE_VERSION_ID" } },
      "macOsVersion": { "data": { "type": "ciMacOsVersions", "id": "MACOS_VERSION_ID" } },
      "repository": { "data": { "type": "scmRepositories", "id": "REPO_ID" } }
    }
  }
}
```

## Options / Props

### CiWorkflowCreateRequest attributes

| Name | Type | Description |
|------|------|--------------|
| `name` | string | Workflow name (required) |
| `description` | string | Free-text description |
| `containerFilePath` | string | Path to the `.xcodeproj`/`.xcworkspace` (required) |
| `actions` | array | Build/test/archive/analyze steps (required) |
| `isEnabled` | boolean | Whether the workflow is active |
| `isLockedForEditing` | boolean | Prevents further edits from Xcode |
| `clean` | boolean | Perform a clean build |
| `branchStartCondition` | object | Trigger on branch push, with file/folder match rules and `autoCancel` |
| `tagStartCondition` | object | Trigger on tag push |
| `pullRequestStartCondition` | object | Trigger on pull request creation/update |
| `scheduledStartCondition` | object | Trigger on a recurring schedule |

### Key Relationship Endpoints

| Relationship | Endpoint |
|-------------|----------|
| List builds for a workflow | `GET /v1/ciWorkflows/{id}/buildRuns` |
| Repository | `GET /v1/ciWorkflows/{id}/repository` |
| Build run IDs | `GET /v1/ciWorkflows/{id}/relationships/buildRuns` |
| Repository ID | `GET /v1/ciWorkflows/{id}/relationships/repository` |

## Notes

- Change a workflow's build environment (Xcode/macOS version) via the `xcodeVersion` and `macOsVersion` relationships, not the `ciXcodeVersions`/`ciMacOsVersions` resources directly
- `isLockedForEditing: true` prevents the workflow from being edited in Xcode while API-managed

## Related

- [Products](./products.md)
- [Build Runs](./build-runs.md)
- [Xcode Versions](./xcode-versions.md)
- [macOS Versions](./macos-versions.md)
