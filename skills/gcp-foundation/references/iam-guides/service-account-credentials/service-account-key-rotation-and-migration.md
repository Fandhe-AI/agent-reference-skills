---
source: https://docs.cloud.google.com/iam/docs/key-rotation
---

# Service Account Key Rotation and Migration Away from Keys

How to rotate keys that must remain, and a three-phase plan (assess, plan, deploy) to replace keys with more secure authentication.

## Signature / Usage

Find keys older than a date across an organization with Cloud Asset Inventory:

```bash
gcloud asset search-all-resources \
    --scope="organizations/123456789012" \
    --query="createTime < 2023-03-10" \
    --asset-types="iam.googleapis.com/ServiceAccountKey" \
    --order-by="createTime"
```

Rotation steps: identify keys, create new keys for the same service accounts, replace keys in all applications, disable the replaced keys and monitor, delete them.

Organization policy rules to stop key creation while exempting tagged resources (tag `disableServiceAccountKeyCreation`, values `enforced` / `not_enforced`):

```text
"resource.matchTag('ORGANIZATION_ID/disableServiceAccountKeyCreation', 'not_enforced')"
```

Rule 1: `iam.disableServiceAccountKeyCreation` not enforced where the condition above matches. Rule 2: enforced everywhere else.

## Options / Props

### Authentication decision tree (replace a key)

| Situation | Use |
|---|---|
| Single-user dev environment, no service account needed | User credentials with ADC |
| Single-user dev environment, need a service account | Service account impersonation with user credentials |
| Running in Google Cloud on GKE | Workload Identity Federation for GKE |
| Running in Google Cloud elsewhere | Attach a service account to the resource |
| Outside Google Cloud with an IdP that supports federation | Workload Identity Federation |
| None of the above | Service account key (last resort) |

### Migration phases

| Phase | Activities |
|---|---|
| Assess | Gather key and service account usage (usage tools, Cloud Asset Inventory, role recommendations; sample reference architecture exports to a BigQuery `sa_key_usage` table); enrich with CMDB/labels |
| Plan | Decide workload-owner responsibility; list quick wins (for example no activity for 90 days); choose where to enforce the constraint; design an exceptions process; communicate |
| Deploy | Enforce `iam.disableServiceAccountKeyCreation` (needs `roles/resourcemanager.tagAdmin` and `roles/orgpolicy.policyAdmin` on the organization); remediate workloads; disable then delete unnecessary keys; use the Service Account Key Exposure Response constraint |

## Notes

- Rotate keys at least every 90 days, and immediately if compromised.
- Use a centralized secret manager that rotates automatically (for example HashiCorp Vault); Google does not recommend Secret Manager for storing and rotating service account keys because accessing it already requires a Google-recognized identity. Use Essential Contacts for security notifications.
- Expiring keys are not recommended for rotation because outages result if not rotated.
- Disable before deleting: deletion is irreversible; re-enable if issues appear.
- After all keys in a project are deleted, ensure the constraint is enforced there and remove any exemption tag.
- The constraint does not block existing keys, but can break workloads that rotate keys themselves; roll it out per folder or with tags first.
- Only COTS/SaaS requiring key input or workloads without a federation-capable IdP typically justify keeping keys; follow best practices for managing service account keys.
- Source: https://docs.cloud.google.com/iam/docs/key-rotation
- Source: https://docs.cloud.google.com/iam/docs/migrate-from-service-account-keys
- Retrieved 2026-11-14. Content CC BY 4.0; code samples Apache 2.0.

## Related

- [service-account-key-lifecycle.md](./service-account-key-lifecycle.md)
- [workload-identity-federation-pools.md](../workload-and-workforce-federation/workload-identity-federation-pools.md)
