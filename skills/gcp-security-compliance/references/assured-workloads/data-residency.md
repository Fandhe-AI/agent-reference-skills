---
source: https://docs.cloud.google.com/assured-workloads/docs/data-residency
---

# Data residency

Data residency describes where data is stored at rest. With Assured Workloads you create a folder, select a control package, and the regions you can pick for resources created in the folder are restricted accordingly through the Resource Locations organization policy constraint. This page also covers the jurisdictional Google Cloud console URLs.

## Signature / Usage

### Inspect the Resource Locations constraint

The page has no code block. This help example describes the policy of the constraint `gcp.resourceLocations` on a project.

```bash
gcloud org-policies describe gcp.resourceLocations \
    --project=foo-project
```

## Options / Props

### Jurisdictional Google Cloud console URLs

| Jurisdiction | Console URL | Federated identity users |
|---|---|---|
| United States | `console.us.cloud.google.com` | `console.us.cloud.google` |
| Canada | `console.ca.cloud.google.com` | `console.ca.cloud.google` |
| European Union | `console.eu.cloud.google.com` | `console.eu.cloud.google` |
| India | `console.in.cloud.google.com` | `console.in.cloud.google` |
| Kingdom of Saudi Arabia | `console.sa.cloud.google.com` | `console.sa.cloud.google` |
| Switzerland | `console.ch.cloud.google.com` | `console.ch.cloud.google` |

### Customer Data and Service Data

| Term | Description |
|---|---|
| Customer Data | Residency commitments apply to Customer Data at rest for services that can be configured for data location; Customer Data does not include resource identifiers, attributes or other data labels. Google processes Customer Data in use by the configured service (not including in any user interface) only within the country of the selected Region or the country or countries of the selected Multi-Region; for a Region or Multi-Region in the European Union, only within the European Union (not necessarily in the same country). |
| Service Data (metadata) | Personal data Google collects or generates during administration of Cloud Services, such as billing data; stored as described in the Geography and regions documentation. |

## Notes

- Jurisdictional Google Cloud console URLs: If your workload requires data residency, always access Google Cloud resources through one of the jurisdictional URLs. Some services may be hidden if they do not fully meet the control package's data residency requirements, and other in-page content and functionality may be hidden or modified.
- Organizations with data residency requirements can set a Resource Locations organization policy constraint that restricts the location of new in-scope resources at the organization, folder or project level. Some resources may be out of scope and cannot be restricted; see "Resource locations supported services" in the official docs.
- Do not enter controlled information into free-text fields such as resource names and search queries when using the jurisdictional console.
- For the Kingdom of Saudi Arabia console, depending on the session length set by your Google Workspace administrator, you may be prompted to reauthenticate through a pop-up window; allow future pop-ups from `console.sa.cloud.google.com` for easier reauthentication.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/org-policies/describe (gcloud 593.0.0 help). The full flags of `gcloud org-policies` are in the `gcp-foundation` skill's organization policy pages.
- Merged page: this page also carries https://docs.cloud.google.com/assured-workloads/docs/jurisdictional-console (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0).
- Source: https://docs.cloud.google.com/assured-workloads/docs/data-residency (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [locations.md](./locations.md)
- [control-packages.md](./control-packages.md)
- [eu-data-boundary.md](./eu-data-boundary.md)
