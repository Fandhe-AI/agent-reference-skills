# Summary Report and Insights Report

Two top-level Partner Center analytics views that complement the per-domain reports: Summary (a consolidated cross-app dashboard) and Insights (AI review summary and Trend insights).

## Signature / Usage

Accessed in Partner Center under Insights → Summary (`https://partner.microsoft.com/dashboard/insights/analytics/store/summary`) and Insights → Insights (`https://aka.ms/Insights_Report`), respectively.

## Options / Props

| View | Content |
|---|---|
| Summary | Installs, Monthly Active Devices (MAD), Sessions, Average Engagement Duration, Crash Rate, Hang Rate, Rating Score and Total Ratings — all over the last 30 days, plus a distribution-by-app-version breakdown |
| Insights — AI review summary | Azure OpenAI–generated summaries of an app's most recent positive and negative customer reviews, plus tags highlighting key features and feedback; may show no data if the app has too few reviews |
| Insights — Trend insights | Overlays app-update markers on the same trendline as Installs (in the Acquisitions report), Failure hits, and Rating, to correlate a given update with subsequent metric changes; rolling out to all MSIX apps and games |

## Notes

- The Summary dashboard aggregates across all of a developer's eligible apps, unlike the single-app Acquisitions/Usage/Health/Ratings views.
- Summary is intended as a fast at-a-glance check; drill into Acquisitions, Usage, Health, or Ratings & Reviews reports for full detail and filtering.
- Insights does not perform automatic anomaly/significant-change detection over a rolling window — it surfaces AI-generated review summaries and update-correlated trendlines, not raw-chart change alerts.

## Related

- [Analytics Overview](./analytics-overview.md)
- [Acquisitions Report](./acquisitions-report.md)
- [Usage Report](./usage-report.md)
- [Health Report](./health-report.md)
- [Ratings & Reviews Report](./ratings-reviews-report.md)
