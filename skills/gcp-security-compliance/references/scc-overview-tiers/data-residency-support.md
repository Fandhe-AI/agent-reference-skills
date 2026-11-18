---
source: https://docs.cloud.google.com/security-command-center/docs/data-residency-support
---

# Plan for data residency

Standard-legacy, Standard, Premium, and Enterprise (Deprecated) service tiers; requires organization-level activation. The Security Command Center Enterprise service tier will shut down on May 21, 2027; an organization that uses it automatically moves to the Premium service tier on or after May 21, 2027. Data residency keeps some Security Command Center data in a chosen location when at rest, in use, and in transit. A location is a Google Cloud region or multi-region; "your data" has the meaning of "Customer Data" in the Data Location item of the Google Cloud General Service Terms.

## Signature / Usage

### List mute rules in a data residency location

When data residency is enabled you must specify a location to create or view subject resources; see the regional endpoints page for tools and the jurisdictional console.

```bash
gcloud scc muteconfigs list --organization=123 --location=eu
```

## Options / Props

### Supported data locations

| Location | Code | Meaning |
|---|---|---|
| European Union | `eu` | Data resides in any Google Cloud region within EU member states. |
| Kingdom of Saudi Arabia (KSA) | `sa` | Data resides in any Google Cloud region in KSA. |
| United States | `us` | Data resides in any Google Cloud region in the United States. |

### Features not available with data residency enabled

| Tier | Not available |
|---|---|
| Enterprise (Deprecated) | AI Discovery service in KSA; Gemini inventory in KSA; CIEM for external cloud providers; "Resources scanned" counts on the Compliance page (only if you use Security Health Analytics for compliance management); Model Armor in KSA; Mandiant Attack Surface Management |
| Premium | AI Discovery service in KSA; Gemini inventory in KSA; "Resources scanned" counts on the Compliance page (only with Security Health Analytics compliance management); Model Armor in KSA |
| Standard | AI Discovery service in KSA; "Resources scanned" counts on the Compliance page (only with Security Health Analytics compliance management); Model Armor in KSA |

### Resources subject to data residency controls

| Resource | API representation | Notes |
|---|---|---|
| BigQuery export configurations | `BigQueryExport` | Use regional endpoints to create and manage. |
| Continuous export configurations | `NotificationConfig` | Use regional endpoints to create and manage. |
| Findings | (findings) | A finding for a resource in your data location always resides there; for a resource in another location it eventually resides in your data location but might temporarily reside in a different region. Create all your Google Cloud resources in that location to keep all findings there. |
| Google SecOps resources | (all) | Use regional endpoints. |
| Mute rules | `MuteConfig` | Use regional endpoints to create and manage. |
| Other resources and settings (for example which services are enabled or which tier is active) | — | Not subject to data residency controls; stored under the Google Cloud Platform Terms of Service. |

### Enforcement states

| State | Definition |
|---|---|
| At rest | Committed to persistent storage. |
| In use | In memory. |
| In transit | In memory or on the wire, and encrypted with TLS by a client outside of Google. |

## Notes

- You can enable data residency when you activate Security Command Center for an organization for the first time, and can change it for Standard and Premium. For Enterprise, contact your Google Cloud account representative and schedule an activation date and time before activating with data residency controls; afterwards the representative helps configure your Google SecOps instance.
- Upgrading from Standard or Premium to Enterprise does not change the data location; if you did not enable data residency for Standard or Premium, you cannot enable it when upgrading to Enterprise. To specify a default location that isn't supported, contact your account representative or a Google Cloud sales specialist.
- Data residency requires the Security Command Center v2 API; earlier API versions can't be used when it is enabled. If you don't enable it, data isn't restricted to any location and is stored under the Google Cloud Platform Terms of Service. Data that isn't Customer Data is stored under those terms.
- If the Standard tier was automatically activated in your organization and you then deploy an organization policy that restricts resource locations, Security Command Center might be deactivated and you must reactivate it manually. Change the data residency configuration before deploying such a policy.
- Some detectors in Cloud Run Threat Detection and Container Threat Detection can't be enabled when data residency is enabled for a specific location. Pre-GA features and services aren't covered by the Data Location terms.
- Google SecOps: data residency is always enabled and can't be disabled; by default controls are enforced at rest only; contact your account representative for in-use and in-transit enforcement. Google SecOps data locations are at https://cloud.google.com/terms/secops/data-residency.
- You can create or view data in only one location at a time (listing findings in `us` doesn't show findings in `eu`). Security Command Center chooses a location for findings it creates. The gcloud `--location` flag defaults to `global` and a mute-config call without it is routed to the V1 API (per the gcloud help).
- Project-level activation doesn't support data residency. Related setup: https://docs.cloud.google.com/security-command-center/docs/regional-endpoints.
- Source: https://docs.cloud.google.com/security-command-center/docs/data-residency-support (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/scc/muteconfigs/list (gcloud 593.0.0 help).

## Related

- [activate-scc-overview.md](./activate-scc-overview.md)
- [activate-standard-tier.md](./activate-standard-tier.md)
- [activate-premium-tier.md](./activate-premium-tier.md)
- [service-tiers.md](./service-tiers.md)
