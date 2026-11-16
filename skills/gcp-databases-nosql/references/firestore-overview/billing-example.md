---
source: https://docs.cloud.google.com/firestore/native/docs/billing-example
---

# Billing example

A worked example of Firestore in Native mode usage and cost for a basic chat app, using North America multi-region (`nam5`) pricing. It is an estimate, not exact pricing.

## Signature / Usage

Queries that reduce billed reads by fetching only items changed since the last fetch.

Chat list (limited to new chats; about 10 updated chats per check means 10 reads):

```javascript
db.collection('groups')
  .where('participants', 'array-contains', 'user123')
  .where('lastUpdated', '>', lastFetchTimestamp)
  .orderBy('lastUpdated', 'desc')
  .limit(25)
```

Messages in a chat:

```javascript
db.collection('groups')
  .doc('group234')
  .collection('messages')
  .where('sentTime', '>', lastFetchTimestamp)
  .orderBy('sentTime', 'desc')
  .limit(50)
```

## Options / Props

### Assumptions

DAUs are 10% of installs; small documents; messages stored for three months (one daily delete per daily write); the estimate covers the bulk but not all costs.

| Collection | Document size (in transit) | Document size (on disk) |
|---|---|---|
| users | 1KB | 3KB |
| groups | 0.5KB | 1.5KB |
| messages | 0.25KB | 0.75KB |

On-disk size includes indexes for message fields but assumes indexing is disabled for message content.

### Per user per day

| Task | Operations | Storage | Networking |
|---|---|---|---|
| See the list of chats | 50 reads | None | 25KB |
| Read messages in a chat | 30 reads | None | 7.5KB |
| Send a message (about 10 per day; each = one write to `messages` and one to the chat parent document) | 20 writes | 15KB | No-cost (ingress) |

Totals (as stated in the source): reads (5 \* 10) + (30) = 80 reads / user / day; writes 20 / user / day; egress "(50 \* 0.25KB) + (30 \* 0.25KB) = 20KB / user / day"; storage 15KB / user / day. The monthly figures below use 20KB / DAU of daily egress.

### Monthly cost by scale

| Installs (DAUs) | Reads+writes+deletes | Storage + network | Total |
|---|---|---|---|
| 50,000 (5,000) | $11.10 | $1.04 | $12.14 |
| 1,000,000 (100,000) | $261.90 | $30.12 | $292.02 |
| 10,000,000 (1,000,000) | $2637.90 | $313.62 | $2951.52 |

Rates used: reads $0.06 / 100K; writes $0.18 / 100K; deletes $0.02 / 100K; storage $0.18 / GB; egress $0.12 / GB. Free allowances used: 50K reads, 20K writes, 20K deletes per day; 1GB storage; 10GB egress per month.

## Notes

- Billed categories: operations (reads incl. queries, fetches and realtime listener updates, writes, deletes, plus reads needed to evaluate Security Rules), storage (data, metadata and indexes) and network egress (ingress is no-cost). Details: https://docs.cloud.google.com/firestore/native/docs/pricing.
- Administrator reports: an aggregation such as `count()` over the `messages` collection group is charged one document read per batch of up to 1,000 index entries matched. Daily counts cost $0.0009 / month (5,000 DAUs), $0.018 / month (100,000 DAUs) and $0.18 / month (1,000,000 DAUs).
- The source's Standard-edition pricing is for Firestore in Native mode; Enterprise edition prices by bytes read and written (see the editions page).
- Source inconsistency: the per-task table gives 25KB + 7.5KB = 32.5KB of egress per user per day, but the source's total and its monthly network estimates use 20KB (computed with 0.25KB for each of the 50 chat-list reads). The figures are kept as stated; recompute egress from the per-task table (32.5KB) for your own estimate.
- Source: https://docs.cloud.google.com/firestore/native/docs/billing-example (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [editions-overview.md](./editions-overview.md)
- [quotas.md](./quotas.md)
- [best-practices.md](./best-practices.md)
