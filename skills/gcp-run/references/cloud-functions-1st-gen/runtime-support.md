---
source: https://docs.cloud.google.com/functions/docs/runtime-support
---

# Runtime support (Cloud Run functions, incl. 1st gen)

The Cloud Functions runtime support page. Same lifecycle model as the Cloud Run runtime support page (see https://docs.cloud.google.com/run/docs/runtime-support and the `cloud-run-functions-runtimes` category), but its schedule adds a Generation column showing which runtimes are available to 1st gen and Cloud Run functions. Updates follow your selected security update policy.

## Signature / Usage

Pick the runtime with `--runtime` (runtime ID). Snippet taken from https://docs.cloud.google.com/functions/docs/deploy:

```sh
gcloud functions deploy YOUR_FUNCTION_NAME \
   --region=YOUR_REGION \
   --runtime=YOUR_RUNTIME \
   --source=YOUR_SOURCE_LOCATION \
   --entry-point=YOUR_CODE_ENTRYPOINT \
   TRIGGER_FLAGS
```

For a runtime in Preview, the source says to use the `gcloud beta functions deploy` command (https://docs.cloud.google.com/sdk/gcloud/reference/beta/functions/deploy).

## Options / Props

Differences from the Cloud Run runtime page: the Generation column, updates tied to the security update policy, and release notes at https://docs.cloud.google.com/functions/docs/release-notes. Lifecycle table, 90-day deprecation notification and deprecation/decommission semantics are identical to the Cloud Run page.

### Node.js

| Runtime ID | Generation | Deprecation | Decommission |
| --- | --- | --- | --- |
| `nodejs26` (Preview) | Run functions | | |
| `nodejs24` | Run functions | 2028-04-30 | 2028-10-31 |
| `nodejs22` | 1st gen, Run functions | 2027-04-30 | 2027-10-31 |
| `nodejs20` | 1st gen, Run functions | 2026-04-30 | 2026-10-30 |
| `nodejs18` | 1st gen, Run functions | 2025-04-30 | 2025-10-30 |
| `nodejs16` | 1st gen, Run functions | 2024-01-30 | 2025-01-30 |
| `nodejs14` | 1st gen, Run functions | 2024-01-30 | 2025-01-30 |
| `nodejs12` | 1st gen, Run functions | 2024-01-30 | 2025-01-30 |
| `nodejs10` | 1st gen, Run functions | 2024-01-30 | 2025-01-30 |
| `nodejs8` | 1st gen, Run functions (Decommissioned) | 2020-06-05 | Feb 2021 |
| `nodejs6` | 1st gen, Run functions (Decommissioned) | 2019-04-17 | Aug 2020 |

### Python

| Runtime ID | Generation | Deprecation | Decommission |
| --- | --- | --- | --- |
| `python315` (Preview) | Run functions | | |
| `python314` | Run functions | 2030-10-10 | 2031-04-10 |
| `python313` | Run functions | 2029-10-10 | 2030-04-10 |
| `python312` | 1st gen, Run functions | 2028-10-02 | 2029-04-02 |
| `python311` | 1st gen, Run functions | 2027-10-24 | 2028-04-24 |
| `python310` | 1st gen, Run functions | 2026-10-04 | 2027-04-04 |
| `python39` | 1st gen, Run functions | 2025-10-05 | 2026-04-05 |
| `python38` | 1st gen, Run functions | 2024-10-14 | 2025-10-14 |
| `python37` | 1st gen, Run functions | 2024-01-30 | 2025-01-30 |

### Other languages

| Language | Run functions only | 1st gen and Run functions |
| --- | --- | --- |
| Go | `go127`, `go126`, `go125`, `go124`, `go123`, `go122` | `go121`, `go120`, `go119`, `go118`, `go116`, `go113`; `go111` (Decommissioned) |
| Java | `java25`, `java21` | `java17`, `java11` |
| Ruby | `ruby40`, `ruby34` | `ruby33`, `ruby32`, `ruby30`, `ruby27`, `ruby26` |
| PHP | `php85`, `php84`, `php83` | `php82`, `php81`, `php74` |
| .NET | `dotnet10`, `dotnet8` | `dotnet6`, `dotnet3` |

Deprecation / decommission dates for these runtime IDs are identical to the Cloud Run runtime support page.

## Notes

- Newest runtime available to 1st gen per language: `nodejs22`, `python312`, `go121` (decommissioned 2026-03-03), `java17`, `ruby33`, `php82`, `dotnet6` (decommissioned 2025-11-12).
- As of 2026-11-15, 1st gen runtimes already past decommission include `nodejs20` and older, `python39` and older, `go121` and older, `java11`, `ruby32` and older, `php81` and older, `dotnet6` and older; after the decommission date you cannot create or update workloads with the runtime and existing workloads may be disabled. For new work use the Cloud Run page's `nodejs24` / `python314` (Run functions only).
- A blank deprecation or decommission date means the phase is not scheduled yet. Go dates may be postponed (Go releases are supported until two newer majors exist).
- Source inconsistency: the `nodejs12` base image link points to `nodejs14` and the `go118` google-22-full link points to `go120`; IDs and dates copied as written.
- Base image path form: `us-central1-docker.pkg.dev/serverless-runtimes/<stack>/runtimes/<runtime-id>` (stacks google-18-full, google-22, google-22-full, google-24, google-24-full).
- Source: https://docs.cloud.google.com/functions/docs/runtime-support (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/functions/docs/deploy (snippet)

## Related

- [deploy-1st-gen.md](./deploy-1st-gen.md)
- [gcloud-functions-deploy.md](./gcloud-functions-deploy.md)
- [upgrade-gen1-functions.md](./upgrade-gen1-functions.md)
