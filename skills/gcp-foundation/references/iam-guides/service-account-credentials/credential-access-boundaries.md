---
source: https://docs.cloud.google.com/iam/docs/downscoping-short-lived-credentials
---

# Credential Access Boundaries (Downscoped Credentials)

Restrict the IAM permissions a short-lived OAuth 2.0 access token can use. Available only for Cloud Storage.

## Signature / Usage

Bucket-level boundary using the Storage Object Viewer role:

```json
{
  "accessBoundary": {
    "accessBoundaryRules": [
      {
        "availablePermissions": [
          "inRole:roles/storage.objectViewer"
        ],
        "availableResource": "//storage.googleapis.com/projects/_/buckets/example-bucket"
      }
    ]
  }
}
```

Specific objects (prefix `customer-a`):

```json
{
  "accessBoundary": {
    "accessBoundaryRules": [
      {
        "availablePermissions": [
          "inRole:roles/storage.objectViewer"
        ],
        "availableResource": "//storage.googleapis.com/projects/_/buckets/example-bucket",
        "availabilityCondition": {
          "expression" : "resource.name.startsWith('projects/_/buckets/example-bucket/objects/customer-a')"
        }
      }
    ]
  }
}
```

Reads and listing under a prefix (listing evaluates against the bucket name, so also check the list prefix attribute):

```json
{
  "accessBoundary": {
    "accessBoundaryRules": [
      {
        "availablePermissions": [
          "inRole:roles/storage.objectViewer"
        ],
        "availableResource": "//storage.googleapis.com/projects/_/buckets/example-bucket",
        "availabilityCondition": {
          "expression":
            "resource.name.startsWith('projects/_/buckets/example-bucket/objects/customer-a/invoices/') || api.getAttribute('storage.googleapis.com/objectListPrefix', '').startsWith('customer-a/invoices/')"
        }
      }
    ]
  }
}
```

Folders (hierarchical namespace buckets):

```json
{
  "accessBoundary": {
    "accessBoundaryRules": [
      {
        "availablePermissions": [
          "inRole:roles/storage.objectUser"
        ],
        "availableResource": "//storage.googleapis.com/projects/_/buckets/example-folder",
        "availabilityCondition": {
          "expression" : "resource.name.startsWith('projects/_/buckets/example-bucket/objects/example-folder') || resource.name.startsWith('projects/_/buckets/example-bucket/folders/example-folder') || api.getAttribute('storage.googleapis.com/objectListPrefix', '').startsWith('{example-folder}')"
        }
      }
    ]
  }
}
```

## Options / Props

| Field | Type | Description |
|---|---|---|
| `accessBoundary.accessBoundaryRules[]` | object list | Up to 10 rules; one boundary per short-lived credential |
| `availablePermissions[]` | string list | Upper bound as `inRole:ROLE` (predefined or custom role); permission names cannot be given directly |
| `availableResource` | string | `//storage.googleapis.com/projects/_/buckets/bucket-name` |
| `availabilityCondition.expression` | string | Optional CEL; limits to specific objects |
| `availabilityCondition.title` / `description` | string | Optional metadata |

## Notes

- Only the resources in the boundary are accessible; no permissions on others.
- Cloud Storage API attributes (`storage.googleapis.com/objectListPrefix`) work only in Credential Access Boundaries; in conditional role bindings they break Cloud Storage methods and slow permission checks.
- Useful instead of many service accounts when each session needs different permissions.
- Source: https://docs.cloud.google.com/iam/docs/downscoping-short-lived-credentials
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-account-key-lifecycle.md](./service-account-key-lifecycle.md)
- [iam-signing-to-credentials-api.md](./iam-signing-to-credentials-api.md)
