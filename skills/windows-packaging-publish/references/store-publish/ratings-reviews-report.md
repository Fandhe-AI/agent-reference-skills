# Ratings & Reviews Report

Partner Center report consolidating customer star ratings and written reviews for an app, with the ability to reply to reviews; shared experience for both MSIX and MSI/EXE (Win32) apps.

## Signature / Usage

Accessed in Partner Center under Insights → Ratings and reviews (`https://partner.microsoft.com/dashboard/insights/analytics/store/reviews`). Filterable by time range (Lifetime, 1/3/6/12 months, or custom), market, device type, package version, OS version, source (Store vs in-app), and star rating.

## Options / Props

| Section | Description |
|---|---|
| Ratings breakdown | Average star rating, total ratings for the period, per-star-rating (1-5) counts, original vs. revised ratings |
| Ratings over time | Time-series of average rating and total ratings volume |
| Reviews | Star rating, title/text, package version, country/region, reviewer name, date; sortable, translatable, exportable to CSV |
| Geographical spread | Average rating, total ratings, total reviews grouped by country/region |
| Review responses | Public reply (shown under the review in the Store) or private reply by email |

## Notes

- The average rating shown to customers in the Store is market/device-scoped and can differ from the Partner Center average.
- Review responses are capped at 1000 characters, must not offer compensation for rating changes, and cannot be edited afterward — a customer revising their review removes the existing response.
- Reviews from certain pre-release/Insider Windows builds, or flagged as spam/policy-violating, may be removed from the Store and disappear from this report.
- CSV export covers up to 1 year per download and excludes responses; use the Downloads Hub for longer ranges.

## Related

- [Analytics Overview](./analytics-overview.md)
- [Usage Report](./usage-report.md)
- [Health Report](./health-report.md)
