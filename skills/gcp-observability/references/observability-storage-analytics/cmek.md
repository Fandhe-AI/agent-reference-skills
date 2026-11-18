---
source: https://docs.cloud.google.com/stackdriver/docs/observability/cmek
---

# CMEK for observability buckets

Google Cloud Observability can encrypt data in observability datasets (trace data) with customer-managed encryption keys (CMEK) in Cloud KMS instead of Google default encryption. This page lists the supported organization policy constraints and explains how they interact with default settings for observability buckets. It does not apply to Cloud Logging log buckets.

## Signature / Usage

### Check default settings and find the service account

The source page has no code block. Before granting a key to the Observability service account, check the default settings (see the constraint table below for the organization policies that interact with them):

```bash
gcloud observability settings describe \
--location=global --project=PROJECT_ID
```

## Options / Props

### Constraints

| Constraint | Effect |
|---|---|
| `constraints/gcp.resourceLocations` | Defines locations where new resources can be created; the set must include at least one supported observability bucket location. |
| `constraints/gcp.restrictNonCmekServices` (a `Deny` policy) | Requires that new resources are encrypted with CMEKs. |
| `constraints/gcp.restrictCmekCryptoKeyProjects` | Limits which Cloud KMS keys are used. If not specified, all keys are allowed. |

### How the location of a new observability bucket is determined

| Org policy restricts location | Default storage location set (project or ancestor) | Result |
|---|---|---|
| No | No | System selects from supported observability bucket locations. |
| Yes | No | System selects from the intersection of policy-allowed and supported locations. If empty, the bucket isn't created. |
| No | Yes | Default storage location from project defaults, else from the ancestor's. |
| Yes | Yes | Default storage location (project, else ancestor). If not allowed by the org policies, the bucket isn't created. |

### How CMEK use and key are determined

| Org policy requires CMEK | Default Cloud KMS key set | Result |
|---|---|---|
| No | No | Bucket doesn't use CMEK. |
| Yes | No | New buckets aren't created (policy requires CMEK but no default key). |
| No | Yes | Needs a default storage location (project or ancestor); if none, system selects a location and the bucket doesn't use CMEK. If found, project defaults are searched for a key, then ancestor defaults for a key in the bucket's location. Key not found: no CMEK. Key found and allowed: bucket created. Key found but not allowed: not created. |
| Yes | Yes | Needs a default storage location, else the bucket isn't created. Then the same key search; key not found: not created; found and allowed: created; found but not allowed: not created. |

## Notes

- Organization policies can be set at organization, folder or project level. If organization policies require CMEKs, you must configure default settings for observability buckets on that resource or an ancestor; otherwise provisioning of system-created observability buckets fails.
- The parent of an observability bucket must be a project; default settings configured for an organization or folder apply to all descendant projects. Project-level defaults are searched first, then ancestors. Default settings let you configure a default storage location and, per location, a default Cloud KMS key.
- If you set a default Cloud KMS key for a location, you must also set that location as the default storage location; otherwise buckets aren't encrypted with the key even in that location.
- After creation you can modify the display name, description or CMEK (update observability buckets), and retroactively apply a Cloud KMS key or change location through "Remediate data residency and CMEK requirements" (reprovision).
- For Cloud Logging log buckets see Configure CMEKs for Cloud Logging (https://docs.cloud.google.com/logging/docs/routing/managed-encryption); key creation and IAM on keys belong to the `gcp-security` skill.
- Snippet taken from https://docs.cloud.google.com/stackdriver/docs/observability/create-observability-buckets.
- Source: https://docs.cloud.google.com/stackdriver/docs/observability/cmek (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-observability-buckets.md](./create-observability-buckets.md)
- [storage-overview.md](./storage-overview.md)
