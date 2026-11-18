---
source: https://docs.cloud.google.com/developer-device-platform/device-run/share-storage
---

# Share Cloud Storage buckets with the Developer Device Platform

Developer Device Platform (DDP) has a dedicated service agent that reads and writes Cloud Storage on its own credentials, not yours. A bucket in another project, or with extra access controls, must be shared with the service agent explicitly. Status: Preview.

## Signature / Usage

### Grant read access on a bucket

Adapted (not in the official docs): the source put `--role` on the same line after a stray `\` continuation; it is split onto its own line so the command parses.

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
  --member="serviceAccount:service-PROJECT_ID@gcp-sa-devicerun.iam.gserviceaccount.com" \
  --role="roles/storage.objectViewer"
```

## Options / Props

| Item | Value |
|---|---|
| Service agent | `service-PROJECT_ID@gcp-sa-devicerun.iam.gserviceaccount.com`, created the first time DDP is used in a project. |
| Service agent role | `roles/devicerun.serviceAgent`, assigned at the project level when the Device Run API (`devicerun.googleapis.com`) is enabled. |
| Read access for buckets in other projects | `roles/storage.objectViewer` on the bucket. |
| Write access (not recommended) | `roles/storage.objectUser` |

## Notes

- Corrected from the official docs: the source wrote `--role="roles/storage.objectViewer"` on the same line after the `\` continuation (`... \  --role=...`), which does not parse; the example puts `--role` on its own line.
- The service agent uses its own credentials to read and write Cloud Storage buckets and objects, download input files into the internal system, and upload files to the output bucket.
- Grant `roles/storage.objectViewer` on the specific bucket (not project-wide) when the bucket is in a different project from the one where the DDP request starts. Granting `roles/storage.objectUser` would allow uploads, but the source recommends against placing output files in buckets outside the project where DDP was triggered.
- Validation: if the service agent cannot access the specified files, the test fails to start.
- The source writes the agent address with `PROJECT_ID`; confirm the exact address in the project's IAM page before binding.
- Related docs named by the source: service agent types, the list of all service agents, and Cloud Storage roles and permissions (IAM documentation).
- Source: https://docs.cloud.google.com/developer-device-platform/device-run/share-storage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [device-run.md](./device-run.md)
- [android-instrument.md](./android-instrument.md)
- [ios.md](./ios.md)
