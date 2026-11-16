---
source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/connect
---

# Authenticate and connect to a database

Connection requirements and the authentication methods for Firestore with MongoDB compatibility: username and password (SCRAM), Compute Engine or Cloud Run service account (MONGODB-OIDC), the Google Auth Library, and a temporary access token.

## Signature / Usage

### Retrieve the base connection string

```text
mongodb://UID.LOCATION.firestore.goog:443/DATABASE_ID?loadBalanced=true&tls=true&retryWrites=false
```

Use `gcloud firestore databases describe` to get the UID and location (`DATABASE_ID` is the database ID):

```bash
gcloud firestore databases describe \
--database=DATABASE_ID \
--format='yaml(locationId, uid)'
```

### SCRAM: create a user credential

Requires `roles/datastore.userCredsAdmin` on the database. The password is displayed once and is not retrievable.

```bash
gcloud firestore user-creds create USERNAME --database=DATABASE_ID
```

Output resembles:

```yaml
name: projects/PROJECT_NAME/databases/DATABASE_ID/userCreds/USERNAME
resourceIdentity:
  principal: principal://firestore.googleapis.com/projects/PROJECT_NUMBER/name/databases/DATABASE_ID/userCreds/USERNAME
securePassword: PASSWORD
```

The new credential has no permissions by default. Grant read and write access restricted to this database (`PROJECT_ID` is the project ID, `PROJECT_NUMBER` the project number):

Adapted (not in the official docs): `PROJECT_NAME` replaced by `PROJECT_ID`; gcloud and the IAM condition's resource name take the project ID, not the project name.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
--member='principal://firestore.googleapis.com/projects/PROJECT_NUMBER/name/databases/DATABASE_ID/userCreds/USERNAME' \
--role=roles/datastore.user \
--condition='expression=resource.name == "projects/PROJECT_ID/databases/DATABASE_ID",title="CONDITION_TITLE"'
```

SCRAM connection string:

```text
mongodb://USERNAME:PASSWORD@UID.LOCATION.firestore.goog:443/DATABASE_ID?loadBalanced=true&authMechanism=SCRAM-SHA-256&tls=true&retryWrites=false
```

### Compute Engine VM / Cloud Run service account

Attach a user-managed service account to the VM or Cloud Run service, then grant it read and write access:

Adapted (not in the official docs): `PROJECT_NAME` replaced by `PROJECT_ID`; gcloud takes the project ID, not the project name.

```bash
gcloud projects add-iam-policy-binding PROJECT_ID --member="serviceAccount:SERVICE_ACCOUNT_EMAIL" --role=roles/datastore.user
```

Connection string (MONGODB-OIDC):

```text
mongodb://DATABASE_UID.LOCATION.firestore.goog:443/DATABASE_ID?loadBalanced=true&tls=true&retryWrites=false&authMechanism=MONGODB-OIDC&authMechanismProperties=ENVIRONMENT:gcp,TOKEN_RESOURCE:FIRESTORE
```

### Temporary access token (diagnostics, valid one hour)

Adapted (not in the official docs): `--password` is moved to the end with no value so `mongosh` prompts for it (paste the output of `gcloud auth print-access-token` at the prompt), instead of passing the token as a process argument through an unquoted `$(...)`.

```bash
mongosh --tls \
      --username access_token \
      'mongodb://UID.LOCATION.firestore.goog:443/DATABASE_ID?loadBalanced=true&authMechanism=PLAIN&authSource=$external&retryWrites=false' \
      --password
```

## Options / Props

| Item | Value |
| --- | --- |
| Driver mode | Must connect in `load balanced` mode |
| TLS | Must connect with SSL enabled |
| Retryable writes | Must be disabled (`retryWrites=false`); retryable reads are supported |
| `UID` | System-generated UUID4 of the database (distinct from the database ID); example `f116f93a-519c-208a-9a72-3ef6c9a1f081` |
| `LOCATION` | Database location, e.g. `nam5`, `us-central1`, `us-east4` |
| Role to create users | `roles/datastore.userCredsAdmin` |
| Role for read/write | `roles/datastore.user` |
| Auth mechanisms | `SCRAM-SHA-256`, `MONGODB-OIDC` (ADC / Workload Identity Federation via Google Auth Library), `PLAIN` with `authSource=$external` (access token) |

## Notes

- The source also shows Console steps, Java and Python administrative samples (create user credentials and set IAM policy) and a Java OIDC callback sample using the Google Auth Library; they are omitted. The administrative samples print the generated password; do not log it.
- Corrected from the official docs: the source's command is `mongosh --tls --username access_token --password $(gcloud auth print-access-token) 'mongodb://...'`, which puts a valid one-hour access token in the `mongosh` process arguments (visible in the process list). The mongosh options reference says: "To force the MongoDB Shell to prompt for a password, enter the `--password` option as the last option and leave out the argument" (https://www.mongodb.com/docs/mongodb-shell/reference/options/). Prefer the MONGODB-OIDC connection string above where the environment supports it.
- The SCRAM connection string embeds `PASSWORD`; passed on a command line (for example to `mongosh`), it ends up in shell history and the process list. Keep connection strings with credentials out of logs and shared shells; the source documents no alternative.
- Source inconsistency: the access-token section's "Replace the following" lists `DATABASE_UID` while the command uses `UID`; both denote the database UID.
- Corrected from the official docs: the `gcloud projects add-iam-policy-binding PROJECT_NAME ...` commands and the condition `resource.name == "projects/PROJECT_NAME/databases/DATABASE_ID"` use `PROJECT_NAME`, described as "the name of your project"; gcloud rejects a project name ("must be set to a valid project ID, not the project name"). The `user-creds create` output example keeps the source's `projects/PROJECT_NAME/...` text verbatim; that resource name also contains the project ID.
- The `datastore.user` binding for SCRAM users uses an IAM condition limiting access to the one database.
- Distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). IAM, service accounts and ADC concepts: `gcp-foundation`.
- Source: https://docs.cloud.google.com/firestore/mongodb-compatibility/docs/connect (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-and-query-database.md](./create-and-query-database.md)
- [supported-data-types-drivers.md](./supported-data-types-drivers.md)
- [behavior-differences.md](./behavior-differences.md)
