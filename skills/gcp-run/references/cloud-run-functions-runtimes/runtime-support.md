---
source: https://docs.cloud.google.com/run/docs/runtime-support
---

# Cloud Run runtime support schedule

Runtimes on Cloud Run are base images with the OS, software to build and run code for a language, and software supporting your function. This page defines the runtime lifecycle (Preview, GA, deprecated, decommissioned) and the support schedule with runtime IDs, stacks, deprecation and decommission dates.

## Signature / Usage

### Deploy with a runtime ID

The runtime ID is used with `--base-image` when deploying from the command line (or in Terraform). For a runtime in Preview use `gcloud beta run deploy`.

```bash
gcloud run deploy FUNCTION \
    --source . \
    --function FUNCTION_ENTRYPOINT \
    --base-image nodejs24
```

## Options / Props

### Runtime lifecycle

| | GA-level support | Deprecated | Decommissioned |
| --- | --- | --- | --- |
| Creation and redeployment | Yes | Yes | No |
| Running existing workloads | Yes | Yes | May be disabled |
| Language patches | As per policy | As per policy | No updates |
| Patching system packages | As per policy | As per policy | No updates |
| Patching OS | As per policy | As per policy | No updates |
| Customer support | GA-level support | No runtime support | No runtime support |

Notification: Cloud Run begins issuing notifications 90 days before a runtime reaches deprecation. The deprecation date starts the deprecation period, which ends at the decommission date. A blank deprecation or decommission date means that phase is not yet scheduled.

### Node.js

| Runtime | Runtime ID | Stacks | Deprecation | Decommission |
| --- | --- | --- | --- | --- |
| Node.js 26 (Preview) | `nodejs26` | google-24 (default), google-24-full | | |
| Node.js 24 | `nodejs24` | google-24 (default), google-24-full | 2028-04-30 | 2028-10-31 |
| Node.js 22 | `nodejs22` | google-22 (default), google-22-full | 2027-04-30 | 2027-10-31 |
| Node.js 20 | `nodejs20` | google-22 (default), google-22-full | 2026-04-30 | 2026-10-30 |
| Node.js 18 | `nodejs18` | google-22 (default), google-22-full | 2025-04-30 | 2025-10-30 |
| Node.js 16 | `nodejs16` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 14 | `nodejs14` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 12 | `nodejs12` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 10 | `nodejs10` | google-18-full | 2024-01-30 | 2025-01-30 |
| Node.js 8 | `nodejs8` | Decommissioned | 2020-06-05 | Feb 2021 |
| Node.js 6 | `nodejs6` | Decommissioned | 2019-04-17 | Aug 2020 |

### Python

| Runtime | Runtime ID | Stacks | Deprecation | Decommission |
| --- | --- | --- | --- | --- |
| Python 3.15 (Preview) | `python315` | google-24 (default), google-24-full | | |
| Python 3.14 | `python314` | google-24 (default), google-24-full | 2030-10-10 | 2031-04-10 |
| Python 3.13 | `python313` | google-22 (default), google-22-full | 2029-10-10 | 2030-04-10 |
| Python 3.12 | `python312` | google-22 (default), google-22-full | 2028-10-02 | 2029-04-02 |
| Python 3.11 | `python311` | google-22 (default), google-22-full | 2027-10-24 | 2028-04-24 |
| Python 3.10 | `python310` | google-22 (default), google-22-full | 2026-10-04 | 2027-04-04 |
| Python 3.9 | `python39` | google-18-full | 2025-10-05 | 2026-04-05 |
| Python 3.8 | `python38` | google-18-full | 2024-10-14 | 2025-10-14 |
| Python 3.7 | `python37` | google-18-full | 2024-01-30 | 2025-01-30 |

### Other languages (runtime ID: deprecation / decommission)

| Language | Runtimes |
| --- | --- |
| Go (google-24: go126, go127; google-22: go118-go125; google-18-full: go113, go116) | `go127`: Aug/Sept 2027 / Feb/March 2028; `go126`: Feb/March 2027 / Aug/Sept 2027; `go125`: 2026-10-01 / 2027-04-01; `go124`: 2026-09-02 / 2027-03-02; `go123`: 2026-02-21 / 2026-08-21; `go122`: 2026-01-28 / 2026-07-28; `go121`: 2025-09-03 / 2026-03-03; `go120`: 2024-05-01 / 2025-05-01; `go119`: 2024-04-30 / 2025-01-30; `go118`, `go116`, `go113`: 2024-01-30 / 2025-01-30; `go111`: Decommissioned (2020-08-05 / Feb 2021) |
| Java (google-24: java25; google-22: java17, java21; google-18-full: java11) | `java25`: October 2031 / not scheduled; `java21`: September 2031 / not scheduled; `java17`: October 2027 / not scheduled; `java11`: 2024-10-31 / 2025-10-31 |
| Ruby (google-24-full: ruby40; google-22: ruby32-ruby34; google-18-full: ruby26-ruby30) | `ruby40`: 2029-03-31 / 2029-09-30; `ruby34`: 2028-03-31 / 2028-09-30; `ruby33`: 2027-03-31 / 2027-09-30; `ruby32`: 2026-03-31 / 2026-09-30; `ruby30`: 2024-03-31 / 2025-03-31; `ruby27`, `ruby26`: 2024-01-30 / 2025-01-30 |
| PHP (google-24-full: php85; google-22-full: php82-php84; google-18-full: php74, php81) | `php85`: 2029-12-31 / 2030-06-30; `php84`: 2028-12-31 / 2029-06-30; `php83`: 2027-12-31 / 2028-06-30; `php82`: 2026-12-31 / 2027-06-30; `php81`: 2025-12-31 / 2026-06-30; `php74`: 2024-01-30 / 2025-01-30 |
| .NET (google-24: dotnet10; google-22: dotnet6, dotnet8; google-18-full: dotnet3) | `dotnet10`: 2028-11-14 / 2029-05-14; `dotnet8`: 2026-11-10 / 2027-05-10; `dotnet6`: 2024-11-12 / 2025-11-12; `dotnet3`: 2024-01-30 / 2025-01-30 |
| OS only | `osonly24` (google-24 default): deprecation April 30, 2029, decommission not scheduled |

Base image path form: `us-central1-docker.pkg.dev/serverless-runtimes/<stack>/runtimes/<runtime-id>`, e.g. `google-24/nodejs24` or `google-24-full/nodejs24`.

## Notes

- Container images deployed directly to Cloud Run are not subject to this policy; it applies only to workloads using Google-managed base images (https://docs.cloud.google.com/run/docs/configuring/services/runtime-base-images#using_language_runtimes).
- During GA, runtime components get regular security and bug fixes and Cloud Run avoids breaking changes (announced in advance in the release notes). When a language version is no longer maintained by its community, Cloud Run also stops maintaining that runtime. Google may change a runtime's support schedule or lifecycle.
- During the deprecation period you can generally keep creating and updating workloads on the runtime; after the decommission date you cannot create or update workloads with it, and existing workloads may be disabled.
- Go follows the Go release policy (each major release supported until two newer majors exist), so Go dates might be postponed.
- As of 2026-11-15, `nodejs20` (decommission 2026-10-30), `nodejs18` and older, `python39` (2026-04-05) and older, `go123` and older, `ruby32` and older, `php81` and older, `java11`, `dotnet6` and older are past their decommission date; `python310`, `go124`, `go125`, `dotnet8` are deprecated (deprecation date reached, not yet decommissioned). Use `nodejs24` / `python314` etc. for new work.
- Source inconsistency: in the source's table the `nodejs12` base image link points to the `nodejs14` image and the `go118` google-22-full link points to `go120`; the IDs and dates above are copied as written.
- The source's lifecycle diagram is not reproduced. The Cloud Functions (1st gen) runtime page differs; see the `cloud-functions-1st-gen` category.
- Source: https://docs.cloud.google.com/run/docs/runtime-support (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/run/docs/runtimes/nodejs (gcloud `--base-image` example).

## Related

- [function-runtimes.md](./function-runtimes.md)
- [nodejs.md](./nodejs.md)
- [python.md](./python.md)
