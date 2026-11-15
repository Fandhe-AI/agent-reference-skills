---
source: https://docs.cloud.google.com/backup-disaster-recovery/docs/bulletins/billing
---

# Backup and DR billing bulletin: VMware Engine pricing

Pricing update rolled out August 10, 2023: backing up Google Cloud VMware Engine moved from usage-based pricing ($0.03 per GiB-month of source capacity) to a flat per-node hourly rate.

## Signature / Usage

Billing formula and worked example from the source:

```text
(List price to backup the node/ hour) X (No. of hours in a day node is active) X (No. of days in a month)
$0.46 X 24 X 30 = $331 USD   (us-central1, 24 hours, 30 days)
```

Snippet: literal formula from this page (the twin has no code).

## Options / Props

| Region | Hourly price per VMware Protected Standard 72 VCPU node |
|---|---|
| us-central1, us-east4 | $0.46 |
| us-west2 | $0.50 |
| asia-south1, asia-southeast1, australia-southeast1, northamerica-northeast1, northamerica-northeast2 | $0.51 |
| asia-northeast1, europe-west2, europe-west3, europe-west4 | $0.53 |
| europe-west8 | $0.54 |
| europe-west6 | $0.58 |
| southamerica-east1 | $0.66 |

## Notes

- A node is considered protected if one or more attached VMs are protected by Backup and DR. Revised pricing applies to current and new customers from August 10, 2023.
- Existing customers must update all backup/recovery appliances to version 11.0.5 or later to adopt the new model (https://docs.cloud.google.com/backup-disaster-recovery/docs/configuration/update-appliance#install). FAQ: https://docs.cloud.google.com/backup-disaster-recovery/docs/faq#node.
- Google Cloud VMware Engine backup through the appliance management console is covered by the legacy console deprecation (September 30, 2026; see `deprecations.md`). Prices are historical list prices from the 2023 bulletin; check https://cloud.google.com/backup-disaster-recovery/pricing for current prices.
- Source: https://docs.cloud.google.com/backup-disaster-recovery/docs/bulletins/billing (retrieved 2026-11-15; CC BY 4.0, code samples Apache 2.0)

## Related

- [deprecations.md](./deprecations.md)
- [backup-dr-overview.md](./backup-dr-overview.md)
