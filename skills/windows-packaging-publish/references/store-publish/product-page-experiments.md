# Product Page Experiments

A/B testing feature in Partner Center for comparing app logo and screenshot variants on the Store product page to find which performs best.

## Signature / Usage

Configured from the app's overview page in Partner Center: create an experiment, define a variant with a new logo and/or screenshots, submit it through certification, then compare performance metrics against the original listing.

## Options / Props

| Field | Requirement | Notes |
|---|---|---|
| Experiment name | Required, ≤40 characters | Identifies the test |
| Variant name | Optional, ≤40 characters | Identifies the variant being tested |
| Logo | PNG, <50 MB, 300 x 300 px (poster 720x1080 or 1440x2160 for casual games) | Either logo or screenshots required |
| Screenshots | PNG, <50 MB, ≥1366 x 768 px (4K 3840x2160 supported), up to 10 (4 recommended) | Landscape or portrait |

## Notes

- Tests run across all languages and for a maximum of 90 days by default; can be stopped manually.
- Experiments go through the normal certification process before going live.
- Once live, 50% of customers see the new variant and 50% see the original product page.
- Avoid changing logos/screenshots in the original listing via an update submission while an experiment is live — this can invalidate results.
- Draft experiments can be deleted from the app overview page before submission.
- Results (search impressions, page views, installs, conversion rate) are reviewed in Partner Center insights; the best-performing assets can then be applied to the live listing.

## Related

- [Screenshots and Images](./screenshots-and-images.md)
- [Summary Report and Insights Report](./app-performance-insights.md)
- [Store Listings](./store-listings.md)
