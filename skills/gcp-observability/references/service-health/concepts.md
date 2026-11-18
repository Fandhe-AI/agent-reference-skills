---
source: https://docs.cloud.google.com/service-health/docs/concepts
---

# Personalized Service Health concepts

Key terms used by Personalized Service Health (PSH): events, incidents, event state and detailed state, granular disruption status, relevance, impacted resources (Preview) and product identity.

## Signature / Usage

### List impacted resources (v1beta, Preview)

An `Impact` is named `projects/{PROJECT_ID}/locations/global/impacts/{IMPACT_ID}` and links to project-level events named `projects/{PROJECT_ID}/locations/global/events/{EVENT_ID}`.

```bash
gcloud beta service-health impacts list \
    --project=PROJECT_ID \
    --location=global
```

## Options / Props

### Event state

| Value | Meaning |
|---|---|
| Active | Event is actively affecting Google Cloud and will continue to receive updates. |
| Closed | Event is no longer affecting any Google Cloud product, or has been merged with another event. |

### Detailed state (incidents only)

| Value | Meaning |
|---|---|
| Emerging | Google engineers are investigating to determine the impact; becomes confirmed or resolved after the impact assessment. An active incident can be emerging. Support for emerging incidents is available for Google Cloud networking products only. |
| Confirmed | Confirmed by Google engineers and impacting at least one Google Cloud product; ongoing status updates until resolved. An active incident can be confirmed. |
| Merged | Merged into a parent incident; all further updates are published to the parent only. |
| Resolved | No longer affecting any Google Cloud product after action was taken; no further updates. A closed incident is usually resolved. |
| False positive | Engineers concluded the incident is not affecting a Google Cloud product. This state can change if the incident is reviewed again. |
| Auto-closed | Closed automatically because the impact could not be confirmed, or the incident was intermittent or resolved itself. No resolution, because no action or investigation happened. If intermittent, it may reopen. |

### Granular disruption status (per product / per location)

| Value | Meaning |
|---|---|
| Affected | The product or location is experiencing disruption due to the incident. |
| Resolved | The specific product or location is no longer disrupted and has recovered. |

### Relevance

| Value | Meaning |
|---|---|
| Impacted | Confirmed to be affecting your project. For supported products (Preview) you can also see which resources are impacted. |
| Related | Direct connection with your project; impacts a product in a location your project uses. |
| Partially Related | Associated with a product your project uses, but may not impact the project (for example a location your project does not use). |
| Not Impacted | Not impacting your project. |
| Unknown | Impact to your project is not known at this point. |

### `Impact` resource fields (v1beta, Preview)

| Field | Description |
|---|---|
| `events` | One or more project-level `Event` resource names associated with the resource impact. |
| `asset.assetName` | Full resource name of the affected resource. |
| `asset.assetType` | Cloud Asset Inventory resource type (for example `sqladmin.googleapis.com/Instance`, `container.googleapis.com/Cluster`). |
| `description` | Additional context about the impact on the resource, when available. |
| `createTime`, `updateTime` | When the impact record was first created and last updated. |

### Product display fields (`v1alpha` and `v1beta` only)

| Field | Description |
|---|---|
| `display_name` (string) | `OUTPUT_ONLY` human-readable product title (for example `"Google Cloud SQL"`). |
| `previous_display_names` (repeated string) | `OUTPUT_ONLY` titles the product had formerly. |

## Notes

- An event ([v1](https://docs.cloud.google.com/service-health/docs/reference/rest/v1/projects.locations.events#resource:-event), [v1beta](https://docs.cloud.google.com/service-health/docs/reference/rest/v1beta/projects.locations.events#resource:-event)) is any disruptive event impacting a Google Cloud product that is relevant to your projects or resources. An incident is an emerging or active outage or degradation, and also a category of event; it carries incident impact, updates from Google Cloud, personalized relevance, and symptoms, workarounds and ETAs.
- Incident reports exist only for incidents with global impact or affecting a significant percentage of customer projects across one or more regions, where one or more products are unavailable or severely degraded.
- Overall event state and detailed state apply to the whole incident: it stays Active (for example Confirmed) while at least one product or location is Affected, and becomes Closed (Resolved) only after all associated products and locations are Resolved. Granular status is independent per product or location and is available for project-level and organization-level events. When an incident is Merged into a parent, the child's granular statuses are cleared and the parent is the single source of truth.
- Alerting policies configured in Cloud Logging apply to overall event revisions and state changes, not to isolated granular status transitions.
- Impacted resources are Preview ("Pre-GA Offerings Terms"; available "as is" and might have limited support). They are available when the event has relevance `IMPACTED` for your project and the product is a supported product; see https://docs.cloud.google.com/service-health/docs/supported-products-locations#resource-level-impact.
- `projects.locations.impacts` is scoped to one project and returns non-container resources only when the event has confirmed `IMPACTED` relevance for that project and product support is available. `organizations.locations.organizationImpacts` aggregates across the organization and returns container assets (projects) with any non-zero relevance (`PARTIALLY_RELATED`, `RELATED` or `IMPACTED`), meaning any project that may be affected by an `OrganizationEvent`.
- To receive `Impact` records, the Service Health API (`servicehealth.googleapis.com`) must be enabled on the project at least 24 hours before the event starts. Enabling the API after an event starts backfills project-level events from the past 90 days but does not backfill resource-level impacts.
- Once a resource is identified as impacted, its `Impact` record stays associated with the event for the lifecycle of the incident. The source says to use the linked `Event` to track the overall state as `ACTIVE` or `COMPLETED`, while other pages describe states Active and Closed; this page keeps both as written.
- If an event affects a product without resource-level impact support, or the disruption is at a control-plane or regional level not tied to resource instances, the project `Event` still appears with `relevance: IMPACTED` while `impacts.list` returns an empty list.
- Product identity: `display_name` and `previous_display_names` are for display and may change on rebranding; use stable product IDs for programmatic logic (API calls and alerting policies). Display fields are deferred on the `vGA (v1)` surface. Find a stable product ID in https://docs.cloud.google.com/service-health/docs/supported-products-locations (column Product ID) or from the `product` property inside the `impact` block of an events API response (for example `projects.locations.events.list`).
- Source inconsistency: the source's field list names the repeated field `previous_display_names`, while its note on product identity writes `previous_display_name`; this page uses the field-list name.
- Snippet taken from https://docs.cloud.google.com/service-health/docs/list-events (the concepts twin has no code block).
- No Discovery document for `servicehealth.googleapis.com` exists in the data directory, so the field and enum names above come only from the twins.
- Source: https://docs.cloud.google.com/service-health/docs/concepts (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [list-events.md](./list-events.md)
- [organization-events.md](./organization-events.md)
- [view-events.md](./view-events.md)
