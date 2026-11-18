---
source: https://docs.cloud.google.com/secret-manager/docs/creating-and-accessing-secrets
---

# Create a secret

A secret contains one or more secret versions plus metadata such as labels and replication policies; the actual contents are stored in a secret version. This page shows creating a global secret with the console, gcloud, REST and client libraries.

## Signature / Usage

### gcloud

```bash
gcloud secrets create SECRET_ID \
    --replication-policy="REPLICATION_POLICY"
```

### REST

HTTP method and URL:

```text
POST https://secretmanager.googleapis.com/v1/projects/PROJECT_ID/secrets?secretId=SECRET_ID
```

Request JSON body (save as `request.json`). The REST field names differ from the gcloud values: use `automatic` for automatic replication:

Adapted (not in the official docs): the `REPLICATION_POLICY` placeholder is replaced by the REST field `automatic`, and the user-managed case is shown as a separate body with `userManaged.replicas[].location`.

```json
{
  "replication": {
    "automatic": {}
  }
}
```

For user-managed replication, use `userManaged` with at least one replica location:

```json
{
  "replication": {
    "userManaged": {
      "replicas": [
        {"location": "LOCATION"}
      ]
    }
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://secretmanager.googleapis.com/v1/projects/PROJECT_ID/secrets?secretId=SECRET_ID"
```

Response shape:

```json
{
  "name": "projects/PROJECT_ID/secrets/SECRET_ID",
  "createTime": "2024-03-25T08:24:13.153705Z",
  "etag": "\"161477e6071da9\""
}
```

## Options / Props

| Item | Detail |
|---|---|
| Required role | Secret Manager Admin (`roles/secretmanager.admin`) on the project, folder, or organization, or a custom or other predefined role with the needed permissions. |
| Secret name | Uppercase and lowercase letters, numerals, hyphens, and underscores; maximum 255 characters. |
| Secret value size | Any format, not larger than 64 KiB (console upload creates the version automatically). |
| Secret type (Preview, console) | `Other DB credentials`, `Access key`, `Certificate`, `Other`. Selectable only at creation; can't be added or updated on an existing secret. |
| `REPLICATION_POLICY` | `automatic` or `user-managed`. |

## Notes

- `user-managed` also needs locations: with gcloud add `--locations=LOCATION[,...]` (gcloud 593.0.0 help: "If user-managed then --locations must also be provided"); in the REST body the `replication` key is `automatic` or `userManaged` (Discovery document `Replication`; `user-managed` is the gcloud spelling), and `userManaged.replicas` is required and cannot be empty.
- Workloads on Compute Engine or GKE need the `cloud-platform` OAuth scope on the instance or node.
- Replication policy and secret type are immutable after creation. See [choosing-replication.md](./choosing-replication.md).
- The source's client library samples (Go, Java, Node.js, Python) show an optional secret TTL; a TTL makes the secret expire and be deleted irreversibly, so avoid it on production secrets.
- Secret versions hold the sensitive value. Passing a value on the command line (for example the gcloud 593.0.0 help example `printf "s3cr3t" | gcloud secrets create my-secret --data-file=- ...`) leaves it in shell history; prefer `--data-file=PATH` with a protected file. Do not print secret values in shared terminals or CI logs.
- The source also shows Console, Windows PowerShell / cmd.exe variants, and C#, Go, Java, Node.js, PHP, Python and Ruby client library samples (omitted).
- Versions are added and accessed on separate pages (https://docs.cloud.google.com/secret-manager/docs/add-secret-version and https://docs.cloud.google.com/secret-manager/docs/access-secret-version); aliases such as `latest` or version numbers such as `42` identify versions.
- Quotas and rate limits: https://docs.cloud.google.com/secret-manager/quotas
- Adapted from the official docs: the REST request body is `{"replication": {"REPLICATION_POLICY": {}}}`, where `REPLICATION_POLICY` is described as automatic or user-managed; the gcloud value `user-managed` is not a REST field (the Discovery document `Replication` has `automatic` and `userManaged`, and `userManaged.replicas` needs `location` per replica), so the page shows one body per policy.
- Source: https://docs.cloud.google.com/secret-manager/docs/creating-and-accessing-secrets (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [choosing-replication.md](./choosing-replication.md)
- [secret-rotation.md](./secret-rotation.md)
- [data-integrity.md](./data-integrity.md)
- [overview.md](./overview.md)
