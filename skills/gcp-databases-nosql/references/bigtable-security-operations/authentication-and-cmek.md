---
source: https://docs.cloud.google.com/bigtable/docs/authentication
---

# Authentication for Bigtable and customer-managed encryption keys (CMEK)

How to authenticate to Bigtable (client libraries via Application Default Credentials, gcloud CLI, service accounts) and how CMEK in Cloud KMS protects Bigtable data at rest. Bigtable encrypts customer content at rest by default (Google default encryption); CMEK is optional.

## Signature / Usage

### Local development: ADC

```bash
gcloud init
```

```bash
gcloud auth application-default login
```

Not needed in Cloud Shell. If you use an external identity provider, first sign in to the gcloud CLI with your federated identity.

### Local development: service account impersonation

Requires `iam.serviceAccounts.getAccessToken` (included in Service Account Token Creator, `roles/iam.serviceAccountTokenCreator`).

```bash
gcloud config set auth/impersonate_service_account SERVICE_ACCT_EMAIL
```

A local ADC file with impersonation is supported only for the Go, Java, Node.js and Python client libraries:

```bash
gcloud auth application-default login --impersonate-service-account=SERVICE_ACCT_EMAIL
```

### On Google Cloud: attach a service account

Requires Create Service Accounts (`roles/iam.serviceAccountCreator`) and Project IAM Admin (`roles/resourcemanager.projectIamAdmin`).

```bash
gcloud iam service-accounts create SERVICE_ACCOUNT_NAME
```

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com" --role=ROLE
```

```bash
gcloud iam service-accounts add-iam-policy-binding SERVICE_ACCOUNT_NAME@PROJECT_ID.iam.gserviceaccount.com --member="user:USER_EMAIL" --role=roles/iam.serviceAccountUser
```

```bash
gcloud compute instances create INSTANCE_NAME --zone=ZONE --service-account=SERVICE_ACCOUNT_EMAIL
```

Replace `SERVICE_ACCOUNT_NAME` with the service account name, `PROJECT_ID` with the project ID where it was created, `ROLE` with the role to grant, and `USER_EMAIL` with a Google Account email.

### CMEK: enabling

1. Create and configure a CMEK key in each region where the instance's clusters will be.
2. Create a new Bigtable instance, selecting a CMEK key for each cluster (the key must be in the cluster's region).
3. Schedule a key rotation for each key.

Applications do not specify a key when reading, writing or deleting; Bigtable accesses the key after you grant the Cloud KMS Encrypter/Decrypter role to the Bigtable service agent. A cluster disabled because of its key returns `FAILED_PRECONDITION` or `NOT_FOUND` errors.

## Options / Props

### CMEK key-state behavior and limits

| Item | Value / behavior |
|------|------------------|
| Key validation | After at least one table exists, Bigtable validates the key for each table in each cluster every 5 minutes |
| Disable/destroy propagation | Can take up to 4 hours; permission changes usually propagate faster |
| Disabled key | Bigtable disables clusters one at a time (cascading) until the whole instance is disabled; this can take up to several hours. Always disable all keys of an instance at the same time |
| Disabled cluster errors | `FAILED_PRECONDITION` or `NOT_FOUND` |
| Admin operations blocked while a cluster is disabled | Create cluster, delete cluster, create table, modify column family, restore table (delete instance, delete table, delete backup still allowed) |
| Inaccessible key for more than 30 consecutive days | Resources (instances, clusters, tables, backups) are automatically deleted |
| Cloud KMS unavailable | Full operation on a best-effort basis for up to 1 hour, then the instance goes offline until Cloud KMS responds that the key is active |
| Newly created table | Key version and status may be reported as unknown for up to five minutes (data is still protected) |
| Cloud KMS audit log entries | A few entries every 5 minutes or so per table in each cluster |

### Data not protected by the CMEK key (Google default encryption)

- A subset of row keys that mark range boundaries and are used for routing
- Debugging data including core dumps and operational logs
- Data in transit or in memory
- A subset of timestamp values used for garbage collection

### CMEK limitations

- Configured only at the cluster level (not on backups, tables or app profiles); the key must be in the same region as the cluster.
- Encryption configuration of an instance, cluster, table or backup is immutable: non-CMEK instances cannot be converted to CMEK, CMEK instances cannot return to Google default encryption, and a cluster's key cannot be changed.
- Disable or delete all versions of a key, not just one (unpredictable behavior otherwise).
- Re-enabling a key can cause some Data API requests to time out while data is brought back online.
- With Cloud EKM, do not mix external and non-external keys in one instance; for multi-region instances make sure the key is supported in those regions.
- Backups are protected by the CMEK key of the cluster they are stored on; a CMEK backup must be restored into a CMEK-protected instance.

## Notes

- Authentication also depends on the interface: client libraries use ADC; the gcloud CLI authenticates as a principal. From outside Google Cloud, workload identity federation is the preferred method. For ADC, service accounts and Workload Identity Federation fundamentals see `gcp-foundation`; for client library setup see `gcp-client-libraries`; for gcloud install/auth see `gcp-cli`.
- For production, do not grant the Owner, Editor or Viewer roles to a service account; grant a predefined or custom role.
- For most services the service account must be attached when the resource is created and cannot be changed later (Compute Engine is an exception).
- CMEK is destructive when mishandled: destroying a key makes every cluster encrypted with it permanently inaccessible. Try key disable/destroy only on a disposable instance first.
- CMEK costs: Cloud KMS charges for the key and its cryptographic operations (requests are sent from every table on every cluster); there is no additional Bigtable charge. Cloud KMS Autokey can create key rings and keys on demand and creates a default key when you create Bigtable clusters; manual setup is described in "Use CMEK".
- The `text` block above only lists identifiers named in the source prose; the CMEK twin contains no code.- The source also shows Console and other-environment instructions.
- Bigtable pages here: wide-column NoSQL database, not a relational database.
- Source: https://docs.cloud.google.com/bigtable/docs/authentication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/bigtable/docs/cmek (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [backups.md](./backups.md)
