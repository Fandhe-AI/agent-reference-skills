# Usage Report

Partner Center report showing how customers engage with an app over time: active devices, sessions, engagement duration, retention, and custom events.

## Signature / Usage

Accessed in Partner Center under Insights → Usage. Filterable by time range, market, device type, package version, and OS version; near-real-time data available for MSIX apps via the recent data view.

## Options / Props

| Metric | Description |
|---|---|
| Monthly Active Devices (MAD) | Distinct devices accessing the app in a month |
| Sessions | Total user sessions initiated |
| Average Engagement Duration | Average time spent per session |
| DAD/MAD Ratio | Daily-to-monthly active device ratio (stickiness) |
| Monthly/Daily Activity | Active and new users/devices over time |
| Cohort Active Usage (90 days) | Heatmap of weekly retention by user cohort |
| App Version Breakdown | Actives/sessions distributed by app version |
| Country Distribution | Actives/sessions by country/region |
| App Version Adoption Over Time | Stacked area chart of version adoption |
| User-Initiated Uninstalls | Daily uninstall counts |
| Custom events | Occurrence counts for developer-defined events |
| Custom events breakdown | Event counts broken down by market, device type, package version |

## Notes

- Custom events are logged via `StoreServicesCustomEventLogger.Log` from the Microsoft Store Services SDK.
- Charts and tables can be exported for offline analysis.

## Related

- [Analytics Overview](./analytics-overview.md)
- [Acquisitions Report](./acquisitions-report.md)
- [Health Report](./health-report.md)
