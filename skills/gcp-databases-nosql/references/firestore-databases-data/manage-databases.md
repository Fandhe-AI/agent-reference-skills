---
source: https://docs.cloud.google.com/firestore/native/docs/manage-databases
---

# Create and manage databases

Create, list, describe, update, delete and clone Firestore databases. A project can hold multiple databases (for production and testing environments, customer data isolation, data regionalization).

## Signature / Usage

### Create a database

Enterprise edition, Native mode:

```bash
gcloud firestore databases create \
--database=DATABASE_ID \
--location=LOCATION \
--edition=enterprise \
--enable-firestore-data-access \
--no-enable-mongodb-compatible-data-access \
--enable-realtime-updates
```

Replace `DATABASE_ID` with a valid database ID and `LOCATION` with the name of a Firestore multi-region or region. Standard edition: replace `DATABASE_TYPE` with `firestore-native` (Native mode) or `datastore-mode` (Datastore mode):

Adapted (not in the official docs): added the missing line-continuation backslash after `--edition=standard`; the source omits it, which would run `--type` as a separate command.

```bash
gcloud firestore databases create \
--database=DATABASE_ID \
--location=LOCATION \
--edition=standard \
--type=DATABASE_TYPE
```

Optional: `--delete-protection` enables deletion protection; `--tags` binds tags, for example `--tags=123/environment=production,123/costCenter=marketing` or `--tags=tagKeys/333=tagValues/444`.

### List, describe and update

You can change the type (`gcloud firestore databases update --database=DATABASE_ID --type=DATABASE_TYPE`) only if the database is empty. Turn delete protection on or off:

```bash
gcloud firestore databases list
gcloud firestore databases describe --database=DATABASE_ID
gcloud firestore databases update --database=DATABASE_ID --delete-protection
gcloud firestore databases update --database=DATABASE_ID --no-delete-protection
```

### Delete a database

If delete protection is enabled, disable it first. Replace `DATABASE_ID` with the ID of the database to delete; to delete the default database use the ID `'(default)'`.

```bash
gcloud firestore databases delete --database=DATABASE_ID
```

### Clone a database

Clones the source database at a PITR timestamp (minute granularity) into a new database in the same location, including all data and indexes.

```bash
gcloud firestore databases clone \
--source-database='SOURCE_DATABASE' \
--snapshot-time='PITR_TIMESTAMP' \
--destination-database='DESTINATION_DATABASE_ID'
```

To bind tags while cloning, add the optional `--tags` flag (KEY=VALUE pairs). Clone with CMEK encryption:

```bash
gcloud firestore databases clone \
--source-database='projects/example-project/databases/(default)' \
--snapshot-time='2025-06-01T10:20:00.00Z' \
--destination-database='example-dest-db' \
--encryption-type='customer-managed-encryption' \
--kms-key-name='projects/example-project/locations/us-central1/keyRings/example-key-ring/cryptoKeys/example-key'
```

### Per-database access with IAM Conditions

View the current policy with `gcloud projects get-iam-policy PROJECT_ID`. Grant access to one database:

```bash
gcloud projects add-iam-policy-binding PROJECT_ID \
--member='user:EMAIL' \
--role='roles/datastore.user' \
--condition='expression=resource.name=="projects/PROJECT_ID/databases/DATABASE_ID",title=TITLE,description=DESCRIPTION'
```

To grant access to all databases except one, the source uses the same command with `resource.name!=` in the condition expression. To remove the policies for a member and role, it runs `gcloud projects remove-iam-policy-binding PROJECT_ID --member='user:EMAIL' --role='roles/datastore.user' --all`.

## Options / Props

### Required role and permissions

Role: Cloud Datastore Owner (`roles/datastore.owner`).

| Permission | Allows |
|------------|--------|
| `datastore.databases.create` | Create a database |
| `datastore.databases.getMetadata` | Read database configuration |
| `datastore.databases.update` | Configure a database |
| `datastore.databases.delete` | Delete a database |
| `datastore.databases.clone` | Clone a database |

### Database ID rules

- Only lowercase letters, numbers and hyphen (`-`).
- First character must be a letter; last must be a letter or number.
- Minimum 4, maximum 63 characters.
- Must not be a UUID or resemble one (for example `f47ac10b-58cc-0372-8567-0e02b2c3d479`).
- Exception: Standard edition creates a database named `(default)` if you enter no ID.
- After deleting a database, its ID can't be re-used for about 5 minutes.

### Clone flags

| Flag | Description |
|------|-------------|
| `--source-database` | Existing database, format `projects/PROJECT_ID/databases/SOURCE_DATABASE_ID` |
| `--snapshot-time` | RFC 3339 timestamp at minute granularity, e.g. `2025-06-01T10:20:00.00Z` or `2025-06-01T10:30:00.00-07:00` |
| `--destination-database` | ID of the new database; must not match an existing one |
| `--tags` | Optional KEY=VALUE tag pairs to bind |
| `--encryption-type` | `use-source-encryption` (default), `google-default-encryption`, `customer-managed-encryption` (requires `--kms-key-name`) |

PITR window for clone timestamps: with PITR enabled, any minute in the last 7 days (less if PITR was enabled less than 7 days ago); without PITR, any minute in the past hour.

### Limitations

- Maximum 100 databases per project (contact support to raise).
- Can't delete the `(default)` database if it contains GAE search data or Blobstore blob entities (check with GQL `SELECT * FROM __BlobInfo__`); delete that data first, possibly with a waiting period.
- Cloud Functions v1 doesn't support named databases; use Firestore triggers (2nd gen). Firestore function triggers v1 and event triggers may stop working after the database is deleted, even if a new database with the same name is created.

## Notes

- Destructive: `gcloud firestore databases delete` removes the database and its data, and `--no-delete-protection` removes the safety net. Try these on a disposable database first. Deletion does not delete Eventarc triggers for the database (they stop delivering events but continue to exist). Deletion incurs no charges for delete operations. Delete protection is disabled by default.
- Corrected from the official docs: the standard-edition create command in the source ended `--edition=standard` followed by `--type=DATABASE_TYPE` on the next line without a backslash.
- The source's clone "with tags" example repeats the plain clone command without the `--tags` flag it describes, so it is omitted. The source also shows a concrete clone example with `--source-database='projects/example-project/databases/(default)'`.
- A named database is any database not named `(default)`. The Firebase SDKs and Google API client libraries connect to `(default)` by default; set the database ID when instantiating a client to use a named database, and update to the latest SDKs. Console can list and create the `(default)` database, but named databases must be created with gcloud or another method; deletion must use the CLI. IAM conditions at database level are not enforced in the Google Cloud console, only for REST API and client libraries.
- Deploy Firestore Security Rules to each database with the Firebase CLI. In the console, choose Restrictive initial rules if you don't plan to use the Firebase mobile and web SDKs. Enterprise edition lets you enable or disable real-time updates; CMEK is configurable under encryption options.
- Metrics: `firestore.googleapis.com/Database` (database-level) and legacy `firestore_instance` (aggregated at project level). The source also shows Console steps and a Terraform `google_firestore_database` example that are omitted here.
- Firestore pages: Google Cloud's managed document database, distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`). IAM basics are in `gcp-foundation`; gcloud setup in `gcp-cli`.
- Source: https://docs.cloud.google.com/firestore/native/docs/manage-databases (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-database-server-client-library.md](./create-database-server-client-library.md)
- [authentication.md](./authentication.md)
- gcloud reference: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create
