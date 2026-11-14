---
source: https://docs.cloud.google.com/functions/docs/release-notes
---

# Renamed products

## Signature / Usage

| Current name | Former name | Date | Evidence |
|---|---|---|---|
| Cloud Run functions | Cloud Functions | 2024-08-21 | https://docs.cloud.google.com/functions/docs/release-notes |
| Knowledge Catalog | Dataplex Universal Catalog | 2026-04-10 | https://docs.cloud.google.com/dataplex/docs/release-notes |
| Managed Service for Apache Spark | Dataproc | 2026-04-22 | https://docs.cloud.google.com/dataproc/docs/release-notes |
| Managed Service for Apache Airflow | Cloud Composer | 2026-04-15 | https://docs.cloud.google.com/composer/docs/release-notes |
| Fraud Defense (reCAPTCHA remains a part) | reCAPTCHA Enterprise | 2026-04-22 | https://docs.cloud.google.com/recaptcha/docs/release-notes |
| Agent Search | Vertex AI Search | 2026-04-22 | https://docs.cloud.google.com/generative-ai-app-builder/docs/release-notes |
| Google Cloud Lakehouse | BigLake | 2026-04-22 | https://docs.cloud.google.com/bigquery/docs/release-notes |
| Data Studio | Looker Studio | 2026-04-22 | https://docs.cloud.google.com/bigquery/docs/release-notes |
| Gemini for Google Cloud | Duet AI in Google Cloud | 2024-03-26 | https://docs.cloud.google.com/gemini/docs/release-notes |

```bash
gcloud functions --help
```

## Notes

- Cloud Run functions is still managed through the `gcloud functions` group.
- Dates are from each product's official release notes retrieved 2026-11-14; the BigQuery release notes were checked only up to their first 100k characters.
- Not confirmed in the official release notes: the rename of Vertex AI to Gemini Enterprise Agent Platform (the docs body already uses the new name; gcloud keeps the `ai` and `ai-platform` groups).
- Deployment Manager: support ended 2026-04-01, new users blocked from 2026-06-30, service shutdown on or after 2027-06-30, successor Infrastructure Manager (https://docs.cloud.google.com/deployment-manager/docs/deprecations).
- Source: https://docs.cloud.google.com/functions/docs/release-notes (retrieved 2026-11-14)

## Related

- [products/README.md](../products/README.md)
