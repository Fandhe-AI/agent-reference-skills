---
source: https://docs.cloud.google.com/compute/docs/deprecations
---

# Compute Engine deprecations

Table of Compute Engine feature deprecations and their shutdown schedule. The policy is defined in Google Cloud's terms of service (section 1, Discontinuation of Services) and applies only to the features and services on the deprecation list. After deprecation a feature stays available at least for the period defined in the terms of service, then is scheduled for shutdown.

## Signature / Usage

The source page has no code; the deprecation schedule is in the table under Options / Props. Four rows are GPU models (NVIDIA P4, T4, P100, K80). To see which accelerator types are offered in your zones, use the command below.

```bash
gcloud compute accelerator-types list \
    --filter="zone:( us-central1-b europe-west1-d )"
```

## Options / Props

| Feature | Deprecated | Shutdown date | Detail page |
|---------|------------|---------------|-------------|
| NVIDIA P4 | August 1, 2026 | August 1, 2027 | https://docs.cloud.google.com/compute/docs/eol/p4-eos |
| NVIDIA T4 | August 1, 2026 | August 1, 2027 | https://docs.cloud.google.com/compute/docs/eol/t4-eos |
| Customer-supplied encryption keys (CSEKs) | June 15, 2026 | June 16, 2027 | https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine |
| Compute Engine Usage Report | January 20, 2026 | March 30, 2026 | https://docs.cloud.google.com/compute/docs/deprecations/usage-export |
| NVIDIA P100 | September 15, 2025 | September 15, 2026 | https://docs.cloud.google.com/compute/docs/eol/p100-eos |
| Container startup agent in Compute Engine | July 21, 2025 | July 31, 2026 | https://docs.cloud.google.com/compute/docs/deprecations/container-startup-agent-on-compute |
| Serial console server SSH key endpoint | March 31, 2025 | March 31, 2026 | https://docs.cloud.google.com/compute/docs/deprecations/serial-console-ssh-host-key-endpoint |
| OS Login POSIX groups support | September 26, 2024 | September 26, 2025 | https://docs.cloud.google.com/compute/docs/deprecations/oslogin-groups |
| Global serial console gateway | April 30, 2024 | April 30, 2025 | https://docs.cloud.google.com/compute/docs/deprecations/global-serial-console |
| NVIDIA K80 | May 1, 2023 | May 1, 2024 | https://docs.cloud.google.com/compute/docs/eol/k80-eol |
| Throttling metrics for persistent disks | June 23, 2022 | June 22, 2023 | https://docs.cloud.google.com/compute/docs/disks/review-disk-metrics#throttling_metrics |
| Method: `projects.moveInstance` | May 2022 | February 2024 | https://docs.cloud.google.com/compute/docs/reference/rest/v1/projects/moveInstance; to move VMs follow "Move a VM instance between zones or regions" (https://docs.cloud.google.com/compute/docs/instances/moving-instance-across-zones) |
| Compute Engine activity Logs | September 30, 2019 | September 30, 2020 | https://docs.cloud.google.com/compute/docs/deprecations/activity-logs |
| Compute Engine v0.1 and v1beta1 metadata server endpoints | September 30, 2019 | September 30, 2020 | https://docs.cloud.google.com/compute/docs/deprecations/v0.1-v1beta1-metadata-server |
| CloudEndure | January 30, 2019 | January 01, 2020 | https://docs.cloud.google.com/compute/docs/deprecations/cloudendure |

## Notes

- Source inconsistency: the deprecations table lists customer-supplied encryption keys (CSEKs) as deprecated "June 15, 2026" with shutdown "June 16, 2027", while the CSEK deprecation notice page (csek-deprecation-in-compute-engine.md in this skill) says "As of **July 20, 2026**, you can no longer use a CSEK to encrypt" Persistent Disks, images, machine images, standard and archive snapshots, and instant snapshots, and "CSEK will be completely removed from Compute Engine on **July 20, 2027**." As of the retrieval date 2026-11-17 the earlier dates of both pages have passed, so new CSEK encryption is blocked per the notice page; the removal date differs by about a month between the pages.
- As of retrieval date 2026-11-17, rows with a shutdown date on or before that day are already shut down (for example Usage Report, serial console server SSH key endpoint, container startup agent on July 31, 2026, NVIDIA P100 on September 15, 2026); do not present them as current.
- The `v0.1` and `v1beta1` metadata server endpoints are listed as shut down (September 30, 2020); do not use them in new code.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/compute/accelerator-types/list (gcloud 593.0.0 help); the deprecations page itself has no code.
- Source (CSEK deprecation notice): https://docs.cloud.google.com/compute/docs/deprecations/csek-deprecation-in-compute-engine (retrieved 2026-11-17)
- Source: https://docs.cloud.google.com/compute/docs/deprecations (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [resource-usage.md](./resource-usage.md)
- [create-start-instance.md](./create-start-instance.md)
