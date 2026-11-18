---
source: https://docs.cloud.google.com/service-health/docs/overview
---

# Personalized Service Health overview

Personalized Service Health identifies the Google Cloud disruptions (events) that are relevant to your projects or organization so you can manage and respond to them. Details are available in the Google Cloud console and through the Service Health API, Cloud Logging alerts and Cloud Logging logs.

## Signature / Usage

### Enable the API (prerequisite for the API, logs and alerts)

```bash
gcloud services enable servicehealth.googleapis.com
```

## Options / Props

### Ways to access Service Health events

| Channel | What it gives you |
|---|---|
| Service Health dashboard | Disruptive events with affected products, locations and impacted resources (Preview) for your projects or organization. |
| Service Health API | Pull events for each project or organization. |
| Alerts | Notifications for events relevant to your projects. Alerts are based on logs in Cloud Logging. |
| Logs | Export logs related to Google Cloud events. |

## Notes

- Personalized Service Health is the primary channel for incident information and Service Health events. For the roles of Personalized Service Health and the public Cloud Service Health (CSH) dashboard, see https://docs.cloud.google.com/service-health/docs/incident-communication (not in this category).
- Product names: the API and dashboard display customer-facing monikers; when a product is renamed, events reference the mapped common moniker rather than only internal identifiers (see `concepts.md`, Product identity).
- The dashboard shows incidents relevant to the project, their overall state and affected products and locations. For multi-product or multi-location incidents it also shows the granular disruption status (Affected or Resolved) and recovery timestamp per product and location. It is also available on a mobile device; alerts on a mobile device need an alerting policy.
- Alerts and exported logs: events are logged in Cloud Logging and alerts can be set for new incidents, updated incidents, and incidents for specific products or locations.
- Cloud Hub: if you manage resources with App Hub, Cloud Hub shows incidents for your applications. This supports incidents that relate to products that support App Hub and Gemini Cloud Assist, and that have `Related` relevance. If no application is set up: configure a folder for application management, set up App Hub and create an application, and ensure you have the permissions `servicehealth.events.list`, `apphub.applications.get` (on the specific application) and `apphub.applications.list`; enable the App Hub API if needed.
- Organization-level checks: Organization Views (console, unified view of incidents affecting any project in the organization) and the Service Health API (OrganizationEvents / OrganizationImpacts).
- Snippet taken from https://docs.cloud.google.com/service-health/docs/list-events
- Source: https://docs.cloud.google.com/service-health/docs/overview (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [concepts.md](./concepts.md)
- [view-events.md](./view-events.md)
- [list-events.md](./list-events.md)
- [organization-events.md](./organization-events.md)
- [logs.md](./logs.md)
- [configure-alerts-cloud-logging.md](./configure-alerts-cloud-logging.md)
- [manage-access.md](./manage-access.md)
