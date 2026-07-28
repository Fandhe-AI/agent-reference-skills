# Health Report

Partner Center report surfacing app stability: crash rate, hang rate, devices affected, and anomaly alerts.

## Signature / Usage

Accessed in Partner Center under Insights → Health. Key metrics are shown at the top of the dashboard; detailed trends, per-version comparisons, and multi-filter breakdowns (app version, OS version, architecture, device type) are available below.

## Options / Props

| Metric | Definition |
|---|---|
| Devices affected | Unique devices per day experiencing a crash, hang, or other failure (deduplicated per device per day) |
| Crash rate | % of daily active devices (opted into diagnostic data) that experienced at least one crash |
| Hang rate | % of daily active devices (opted into diagnostic data) that experienced at least one unresponsiveness event |
| Anomaly alerts | Automated email + in-dashboard warning when crash/hang rate spikes unexpectedly; max 1 alert per app per day, 3-day cooldown |

## Notes

- Crash/hang rate metrics rely on devices that have opted in to share optional diagnostic data — they are not a complete census.
- Anomaly alerts fire regardless of whether a new app version was recently published (OS/device changes can also trigger them).
- Failure metrics can be compared across app versions, OS versions, and architectures to isolate regressions.
- Corresponds to the `.appxsym` crash-analytics symbol file included in `.msixupload`/`.appxupload` packages (see App Package Requirements).

## Related

- [Analytics Overview](./analytics-overview.md)
- [App Package Requirements](./app-package-requirements.md)
