---
source: https://docs.cloud.google.com/bare-metal/docs/bms-maintenance-process
---

# Bare Metal Solution maintenance

Overview of how Google Cloud performs scheduled maintenance on Bare Metal Solution hardware and infrastructure, and how maintenance events that need server downtime are coordinated with you.

## Signature / Usage

The page has no code. To check the state of a server (for example before and after a maintenance event), describe it (command example from the gcloud help):

```bash
gcloud bms instances describe my-instance --project=my-project \
    --region=us-central1
```

Process:

1. Google creates a maintenance event, ideally 2 to 3 weeks before.
2. You review it and either approve it or reschedule it (propose a new window).
3. You complete the preparation steps (https://docs.cloud.google.com/bare-metal/docs/prepare-for-maintenance) and any extra steps in the event.
4. Maintenance runs; you get start and end notifications.

## Options / Props

| Item | Value |
|---|---|
| Maintenance types | Infrastructure maintenance (network devices, storage; informational only, no response needed). Server maintenance (hardware replacement, patches, upgrades, configuration changes) |
| Needs your permission | Maintenance that affects your server and requires downtime (e.g. DIMM replacement) |
| Informational only | Maintenance not affecting the server (e.g. hot-swappable redundant power supply) |
| Notice | Ideally 2 to 3 weeks; urgent maintenance can have less |
| Reminders | 7 days, 3 days and 1 day before the event |
| Respond by | 5 days before the scheduled start |

## Notes

- Warning: if you do not respond by five days before the scheduled start date, the event might be canceled or rescheduled.
- Warning: failing to complete preparatory steps before the event can cancel it; the server then keeps running in a degraded state until maintenance is done.
- Receiving a maintenance notification means the server is running degraded; allowing the scheduled window is recommended. Canceling is discouraged and only for business-critical reasons (https://docs.cloud.google.com/bare-metal/docs/manage-maintenance-events#cancel-maintenance-event).
- If maintenance does not complete as planned, Google reaches out with options to continue or revert; if you are unreachable, the changes are rolled back.
- IAM roles for maintenance events: `roles/baremetalsolution.maintenanceeventsadmin` / `maintenanceeventseditor` / `maintenanceeventsviewer`.
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bms/instances/describe (gcloud 593.0.0 help; the source page has no code).
- Source: https://docs.cloud.google.com/bare-metal/docs/bms-maintenance-process (retrieved 2026-11-17; CC BY 4.0, code samples Apache 2.0)

## Related

- [bms-iam.md](./bms-iam.md)
- [bms-planning.md](./bms-planning.md)
