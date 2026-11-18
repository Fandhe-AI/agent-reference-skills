---
source: https://docs.cloud.google.com/kms/docs/kms-autokey
---

# Cloud KMS with Autokey

Introduction to Cloud KMS Autokey and a comparison with Google default encryption and manually managed Cloud KMS keys. Autokey is like an autopilot for CMEK: it provisions and assigns keys on demand, at the recommended granularity, while you keep full control of the keys.

## Signature / Usage

The `KeyHandle` request that triggers Autokey key creation:

```bash
curl -H "Content-Type: application/json" \
    -H "X-Goog-User-Project: USER_PROJECT" \
    -H "Authorization: Bearer TOKEN" \
    -X POST https://cloudkms.googleapis.com/v1/projects/RESOURCE_PROJECT_ID/locations/LOCATION/keyHandles \
    -d '{"resource_type_selector": "RESOURCE_TYPE"}'
```

## Options / Props

### Autokey versus other options

| Feature or capability | Google default encryption | Cloud KMS | Cloud KMS Autokey |
|---|---|---|---|
| Cryptographic isolation: keys exclusive to one customer's account | No | Yes | Yes |
| Customer owns and controls keys | No | Yes | Yes |
| Developer triggers key provisioning and assignment | Yes | No | Yes |
| Specificity: keys created at the recommended granularity | No | No | Yes |
| Lets you crypto-shred your data | No | Yes | Yes |
| Automatically aligns with recommended key management practices | No | No | Yes |
| Uses HSM-backed keys that are FIPS 140-2 Level 3 compliant | No | Optional | Yes |

## Notes

- Compatible services (the table with resource types is in [autokey-overview.md](./autokey-overview.md)): AlloyDB for PostgreSQL, Apigee, Apigee API hub, Artifact Registry, Backup and DR Service, Backup for GKE, BigQuery (datasets), Bigtable (clusters), Cloud Run (Service, Job; one key per location within a project), Cloud SQL, Cloud Storage (buckets; one key per bucket), Compute Engine (Disk, Image, Instance, MachineImage), Google Kubernetes Engine (Cluster; one key per cluster), Dataflow, Datastream, Document AI, Managed Service for Apache Airflow, Managed Service for Apache Spark (Batch and Session: one key per location within a project), Memorystore for Redis, Memorystore for Valkey, Migrate to Virtual Machines, Pub/Sub, Secret Manager (one key per location within a project), Secure Source Manager, Spanner, Filestore, Workflows. All other services use one key per resource.
- Autokey is available in all Google Cloud locations where Cloud HSM is available; no additional cost, keys are priced like other Cloud HSM keys (https://docs.cloud.google.com/kms/pricing).
- Dedicated-project key storage requires an organization resource that contains a folder; same-project key storage enables Autokey on a folder or project.
- You can use manually created keys alongside Autokey keys, and you can disable Autokey and keep using the keys it created like any other Cloud KMS key.
- If you need a protection level other than `HSM` or a custom rotation period, use CMEK without Autokey.
- Good fit when you want consistent key usage across projects, low operational overhead, and Google's key recommendations.
- Many services are Terraform or REST API only; the per-service restrictions are in autokey-overview.md.
- Autokey keys are CMEKs: disabling or destroying one makes the data it protects inaccessible (destruction is irreversible after the scheduled for destruction period). Try it on a disposable resource first.
- `TOKEN` in the curl example is an OAuth access token; a real token on the command line lands in shell history and process lists, so don't paste it into shared terminals or CI logs.
- Source: https://docs.cloud.google.com/kms/docs/kms-autokey (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/kms/docs/create-resource-with-autokey.

## Related

- [autokey-overview.md](./autokey-overview.md)
- [create-resource-with-autokey.md](./create-resource-with-autokey.md)
- [cmek.md](./cmek.md)
