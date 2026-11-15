---
source: https://docs.cloud.google.com/rust/docs/reference
---

# Rust crate names

Lists the Rust Cloud Client Library crates. Unlike Node.js and Python, the source table is keyed by crate name only (each row is the crate name and a docs.rs link), and many crate names carry an API-version suffix (`-v1`, `-v2`, `-v3`).

## Signature / Usage

### Source table excerpt (four contiguous rows, verbatim)

```markdown
| google-cloud-rpc | [google-cloud-rpc](https://docs.rs/google-cloud-rpc/latest) |
| google-cloud-run-v2 | [google-cloud-run-v2](https://docs.rs/google-cloud-run-v2/latest) |
| google-cloud-scheduler-v1 | [google-cloud-scheduler-v1](https://docs.rs/google-cloud-scheduler-v1/latest) |
| google-cloud-secretmanager-v1 | [google-cloud-secretmanager-v1](https://docs.rs/google-cloud-secretmanager-v1/latest) |
```

### Selected crates

Docs URL pattern: `https://docs.rs/<crate>/latest`.

| Crate |
| --- |
| `google-cloud-storage` |
| `google-cloud-bigquery` |
| `google-cloud-bigquery-v2` |
| `google-cloud-spanner` |
| `google-cloud-spanner-admin-database-v1` |
| `google-cloud-spanner-admin-instance-v1` |
| `google-cloud-bigtable-admin-v2` |
| `google-cloud-firestore-admin-v1` |
| `google-cloud-datastore-admin-v1` |
| `google-cloud-run-v2` |
| `google-cloud-functions-v2` |
| `google-cloud-tasks-v2` |
| `google-cloud-scheduler-v1` |
| `google-cloud-build-v1` |
| `google-cloud-build-v2` |
| `google-cloud-artifactregistry-v1` |
| `google-cloud-kms-v1` |
| `google-cloud-secretmanager-v1` |
| `google-cloud-logging-v2` |
| `google-cloud-monitoring-v3` |
| `google-cloud-compute-v1` |
| `google-cloud-sql-v1` |
| `google-cloud-iam-v1` |
| `google-cloud-iam-admin-v1` |
| `google-cloud-iam-credentials-v1` |
| `google-cloud-resourcemanager-v3` |
| `google-cloud-api-serviceusage-v1` |
| `google-cloud-apikeys-v2` |
| `google-cloud-billing-v1` |
| `google-cloud-eventarc-v1` |
| `google-cloud-workflows-v1` |
| `google-cloud-workflows-executions-v1` |
| `google-cloud-aiplatform-v1` |
| `google-cloud-documentai-v1` |
| `google-cloud-vision-v1` |
| `google-cloud-speech-v2` |
| `google-cloud-texttospeech-v1` |
| `google-cloud-translation-v3` |
| `google-cloud-container-v1` |
| `google-cloud-privacy-dlp-v2` |
| `google-cloud-longrunning` |
| `google-cloud-rpc` |
| `google-cloud-location` |
| `google-cloud-type` |
| `google-cloud-common` |

## Notes

- Selection: the source table has about 250 crates; this page keeps a selected subset. Find the rest at the source URL.
- The crate names above are exactly as in the source table, which has no description column.
- Current Rust ClientBuilder, policies and setup guides are in the `rust-setup` and `rust-calls` categories; this category only covers naming.
- This is the Google Cloud client library family (`google-cloud-*` crates), distinct from the `google-genai` Gemini SDK (`google-gemini-api` skill).
- Source: https://docs.cloud.google.com/rust/docs/reference (retrieved 2026-11-16; CC BY 4.0)

## Related

- [nodejs-packages.md](./nodejs-packages.md)
- [python-packages.md](./python-packages.md)
- [client-libraries-explained.md](./client-libraries-explained.md)
