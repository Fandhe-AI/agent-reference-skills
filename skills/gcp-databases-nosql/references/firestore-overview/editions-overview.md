---
source: https://docs.cloud.google.com/firestore/native/docs/editions-overview
---

# Firestore editions overview

Firestore is available in Enterprise and Standard editions. Enterprise provides the most advanced capabilities (advanced query engine with over 180 capabilities, customizable indexing, up to five times faster performance, MongoDB compatibility) and prices by tranches of bytes read and written, storage and egress. Standard provides core capabilities with automated indexing and prices by documents read and written, storage and egress.

## Signature / Usage

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create (the editions page itself has no code). Create a Firestore Enterprise database named `foo` in `nam5` with Firestore API data access enabled:

```bash
gcloud firestore databases create --database=foo \
  --edition=enterprise --location=nam5 \
  --enable-firestore-data-access
```

## Options / Props

### Editions features

| | Enterprise | Standard |
|---|---|---|
| Query engine | Advanced: more than 180 stages and operators (aggregations, arithmetic, arrays, sets, type conversions, joins). Queries with or without an index. | Standard: basic comparisons and matches. All queries require covered indexes. |
| Document size limit | 16 MiB with MongoDB compatibility; 1 MiB with Firestore in Native mode | 1 MiB |
| Firestore with MongoDB compatibility | Yes | No |
| Native mode (server-side, web, mobile SDKs with real-time and offline support) | Yes | Yes |
| Indexing | Fully customizable, including unique, dense and sparse indexes | Automatic, basic indexing on all document fields |
| Text search | Yes (Preview) | No |
| Geospatial search | Yes (Preview) | No |
| Change data capture | Triggers | Triggers |
| Observability | Cloud Monitoring, Query Explain, Query Insights, Database Center | Same |
| Data protection | Scheduled backups, point-in-time recovery | Same |
| Encryption | Google-owned and Google-managed key; customer-managed encryption keys | Same |
| Storage | SSD | Hybrid (SSD \& HDD) |
| Performance | Best | Good |
| Committed Use Discounts | 20% for 1 year; 40% for 3 years | 20% for 1 year; 40% for 3 years |

### Data access modes

| Mode | Description |
|---|---|
| Firestore with MongoDB compatibility | Reuse existing MongoDB drivers, tools and ecosystem integrations. |
| Firestore in Native mode | All latest Firestore capabilities, including real-time synchronization and offline caching in the client libraries. |
| Firestore in Datastore mode | Best for Datastore and App Engine Datastore apps. |

| Edition | Supported modes |
|---|---|
| Enterprise | MongoDB compatibility APIs or Firestore in Native mode API |
| Standard | Firestore Native API or Datastore API |

## Notes

- You must select a data access mode when you create the database. You can't change this mode.
- Enterprise offers up to five times improved performance over Standard, especially at tail latencies (advanced query engine and SSD storage), and handles bursty network traffic at a rate up to 8x higher.
- You can create both Enterprise and Standard databases in the same project. Firestore data is compatible with both editions; to migrate, create a new Enterprise database (see https://docs.cloud.google.com/firestore/native/docs/migrate-standard-to-enterprise).
- Both editions start with daily free usage. Pricing: https://cloud.google.com/firestore/enterprise/pricing and https://cloud.google.com/firestore/pricing.
- Google Cloud's managed document database (Native mode, Datastore mode, MongoDB compatibility) is distinct from Supabase Postgres (`supabase`) and Cloudflare KV / D1 (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/firestore/native/docs/editions-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet source: https://docs.cloud.google.com/sdk/gcloud/reference/firestore/databases/create (gcloud 593.0.0 help text, EXAMPLES section)

## Related

- [overview.md](./overview.md)
- [firestore-or-datastore.md](./firestore-or-datastore.md)
- [quotas.md](./quotas.md)
- [locations.md](./locations.md)
