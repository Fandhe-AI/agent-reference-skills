---
source: https://docs.cloud.google.com/stackdriver/docs/deprecations
---

# Google Cloud Observability deprecations and Cloud Debugger shutdown

Lists deprecated Google Cloud Observability features and their shutdown schedules. After a feature is officially deprecated it remains available for at least the period defined in the Terms of Service, then is scheduled for shutdown. This page also carries the Cloud Debugger shutdown notice (merged from the debugger-deprecation page).

## Signature / Usage

### List Ops Agent policies (replacement for the legacy agents)

The source pages have no code block. Snippet from the gcloud help for the Ops Agent policy commands, which manage installation of the Ops Agent that replaces the legacy Monitoring and Logging agents.

```bash
gcloud beta compute instances ops-agents policies list
```

## Options / Props

### Deprecation schedule

| Feature (status) | Deprecated date | Shutdown date | Details |
|---|---|---|---|
| Legacy Monitoring and Logging agents end of support | September 28, 2026 / September 28, 2027 (two dates in the source) | N/A | https://docs.cloud.google.com/stackdriver/docs/deprecations/legacy-agents |
| Monitoring Query Language (MQL) | October 22, 2024 / July 22, 2025 (two dates in the source) | N/A | https://docs.cloud.google.com/stackdriver/docs/deprecations/mql |
| Export trace spans with sinks | February 18, 2026 | February 18, 2027 | https://docs.cloud.google.com/stackdriver/docs/deprecations/export-spans-with-sinks |
| AWS CloudWatch metrics in Connector projects | August 21, 2023 | August 21, 2024 | https://docs.cloud.google.com/stackdriver/docs/deprecations/aws-cloudwatch-metrics-ingestion |
| Cloud Debugger (shut down) | May 16, 2022 | May 31, 2023 | https://docs.cloud.google.com/stackdriver/docs/deprecations/debugger-deprecation |
| Obsolete resource metadata labels | May 21, 2020 | July 31, 2020 | https://docs.cloud.google.com/stackdriver/docs/deprecations/metadata-labels |
| Legacy installation scripts for the Monitoring agent | April 27, 2020 | February 17, 2022 | https://docs.cloud.google.com/stackdriver/docs/deprecations/mon-agent-install |
| Legacy installation script for the Logging agent | April 27, 2020 | February 17, 2022 | https://docs.cloud.google.com/stackdriver/docs/deprecations/log-agent-install |
| Legacy versions of the Monitoring agent | (blank) | (blank) | https://docs.cloud.google.com/stackdriver/docs/deprecations/mon-agent |
| Legacy Monitoring and Logging support for GKE | December 12, 2019 | March 31, 2021 | https://docs.cloud.google.com/stackdriver/docs/deprecations/legacy |
| Various integrations for third-party applications in legacy Monitoring agent | February 28, 2019 | April 09, 2020 | https://docs.cloud.google.com/stackdriver/docs/deprecations/third-party-apps |

### Cloud Debugger

| Item | Value |
|---|---|
| Deprecated | May 16, 2022 |
| Shut down | May 31, 2023 |
| Snapshot Debugger (open source) | Archived September 7, 2023; no bug fixes or security patches; remains available, or fork and maintain your own |
| Snapshot Debugger latency | Adds less than 10ms to request latency, only when application state is captured |

## Notes

- The Google Cloud Platform Terms of Service (section "Discontinuation of Services") defines the deprecation policy; it applies only to the services, features and products listed at https://docs.cloud.google.com/terms/deprecation. Agents have their own policy: https://docs.cloud.google.com/stackdriver/docs/agent-deprecation-policy.
- MQL and the legacy Monitoring and Logging agents are not current: do not use them for new work. The legacy agents' table row shows two deprecated dates and MQL shows two deprecated dates; the source does not label them, so see the linked detail pages.
- Cloud Debugger is shut down and must not be used. Snapshot Debugger (https://github.com/GoogleCloudPlatform/snapshot-debugger) lets you inspect the state of a running application at any code location without stopping it; usable with test, development and production deployments.
- Trace spans export with sinks has a shutdown date of February 18, 2027 as stated in the table.
- Deprecated: the table lists "Legacy Monitoring and Logging agents end of support" (see the legacy-agents detail page) and "Monitoring Query Language (MQL)".
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/beta/compute/instances/ops-agents/policies/list (gcloud 593.0.0 help). The command is in the `beta` track; the help also lists `gcloud compute instances ops-agents policies list`. VM Manager / Compute commands belong to `gcp-compute`.
- Source: https://docs.cloud.google.com/stackdriver/docs/deprecations (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/stackdriver/docs/deprecations/debugger-deprecation (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [observability-overview.md](./observability-overview.md)
