# Stripe Sigma

Interactive SQL environment within the Stripe Dashboard for querying all transaction data and generating custom reports.

## Signature / Usage

```sql
select
  date_format(created, '%Y-%m-%d') as day,
  id,
  amount,
  currency,
  type
from balance_transactions
where created < data_load_time
  and created >= data_load_time - interval '1' month
order by day desc
limit 100
```

## Core Tables

### Transaction Tables

| Table | Description |
|-------|-------------|
| `balance_transactions` | Ledger of every transaction flowing into/out of your Stripe balance |
| `balance_transaction_fee_details` | Detailed fee breakdown per balance transaction |
| `charges` | Charge objects (payment-specific data: card brand, status, failure info) |
| `refunds` | Refund objects; join with `balance_transactions` via `balance_transaction_id` |
| `transfers` | Payouts to bank accounts and Connect account transfers |
| `transfer_reversals` | Reversed manual payouts |

### Billing Tables

| Table | Description |
|-------|-------------|
| `customers` | Customer objects; `id`, `email` |
| `subscriptions` | Subscription objects; `status`, `price_id`, `period_start`, `period_end` |
| `invoices` | Invoice objects; `amount_due`, `status`, `charge_id` |
| `invoice_line_items` | Line-item breakdown per invoice |
| `subscription_items` | Individual items within a subscription |
| `products` | Product definitions |
| `prices` | Price configurations; `amount`, `currency` |
| `coupons` | Discount codes |
| `discounts` | Applied discounts |
| `promotion_codes` | Redeemable codes |

## Query Syntax

Sigma uses **ANSI SQL** standard. Key supported features:

| Feature | Notes |
|---------|-------|
| `SELECT`, `WHERE`, `ORDER BY`, `LIMIT` | Standard SQL |
| `JOIN` (INNER, LEFT, etc.) | Join on primary/foreign keys across tables |
| `date_format(ts, '%Y-%m-%d')` | Format timestamps |
| `date_trunc('day', ts)` | Truncate to day/week/month |
| `data_load_time` | Built-in parameter: timestamp of last data load |
| `interval '1' month` | Date arithmetic |

### Key Constraints

- All data is **read-only** — queries cannot modify data
- Timezone is **UTC only** (unlike the Dashboard which uses local timezone)
- Date ranges are exclusive of end time: `Jan 13–14` = Jan 13 00:00 to Jan 13 23:59:59
- Editor displays up to **1,000 rows**; full results available via CSV export
- Charts available when result set is < 10,000 rows

## Data Freshness

| Data Category | Freshness |
|---------------|-----------|
| Payments, billing, customers, charges | ~3 hours |
| Connected account payment records | ~6 hours |
| Summarized balance transactions | ~12 hours |
| Transfers, tax, terminal, treasury | ~24 hours |

Use `data_load_time` in scheduled queries to set dynamic date ranges against the latest available data.

## Scheduled Queries API

Stripe exposes scheduled query runs (configured in the Dashboard) via the API.

### Retrieve a Scheduled Query Run

**GET** `/v1/sigma/scheduled_query_runs/:id`

```bash
curl https://api.stripe.com/v1/sigma/scheduled_query_runs/sqr_1NpIuH2eZvKYlo2CP72f3rLR \
  -u "sk_live_..."
```

**Response fields:**

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Run identifier (`sqr_...`) |
| `object` | string | `"scheduled_query_run"` |
| `created` | timestamp | Unix timestamp of run creation |
| `data_load_time` | timestamp | Unix timestamp of data snapshot |
| `file` | object | CSV result file (`id`, `url`, `size`, `type`) |
| `livemode` | boolean | `true` for live mode runs |
| `result_available_until` | timestamp | Expiry of the result file |
| `sql` | string | SQL query that was executed |
| `status` | string | `"completed"` or error status |
| `title` | string | Query title |

### List Scheduled Query Runs

**GET** `/v1/sigma/scheduled_query_runs`

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Number of results to return (1–100, default 10) |
| `starting_after` | string | Cursor for forward pagination |
| `ending_before` | string | Cursor for backward pagination |

```bash
curl -G https://api.stripe.com/v1/sigma/scheduled_query_runs \
  -u "sk_live_..." \
  -d limit=10
```

### Webhook Event

`sigma.scheduled_query_run.created` — fired when a scheduled query run completes. The event payload contains the `ScheduledQueryRun` object.

## Notes

- Amounts are in the **smallest currency unit** (e.g., cents for USD, yen for JPY)
- Filter out partial captures when computing refund rates: `WHERE reason != 'partial_capture'`
- The `balance_transactions` table is the recommended starting point for accounting and reconciliation
- An AI assistant in the query editor supports natural language query generation and editing (English only)
- Queries can be run on demand or scheduled daily, weekly, or monthly with results delivered via email or webhook

## Related

- [Scheduled Query Runs API](https://docs.stripe.com/api/sigma/scheduled_queries)
- [Write Queries Guide](https://docs.stripe.com/stripe-data/write-queries)
- [Query Transactions](https://docs.stripe.com/stripe-data/query-transactions)
- [Query Billing Data](https://docs.stripe.com/stripe-data/query-billing-data)
- [Data Freshness](https://docs.stripe.com/stripe-data/available-data)
