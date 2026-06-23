# Stripe Data Pipeline

No-code product that automatically exports all Stripe data to data warehouses and cloud storage destinations, enabling centralized analytics without custom ETL pipelines.

## Signature / Usage

```sql
-- Combine Stripe data with your own business data
SELECT
  orders.date,
  orders.order_no,
  orders.stripe_txn_no,
  bts.amount,
  bts.fee,
  bts.automatic_transfer_id
FROM mycompany.orders
JOIN stripe.balance_transactions bts
  ON orders.stripe_txn_no = bts.id;
```

## Supported Destinations

### Data Warehouses (data share)

| Warehouse | Cloud Providers | Notes |
|-----------|-----------------|-------|
| Snowflake | AWS, Azure, GCP | Financial Reports available (Snowflake only) |
| Amazon Redshift RA3 | AWS | Cluster encryption required; no support for some regions |
| Databricks | AWS, Azure, GCP | Delta Sharing protocol |

### Cloud Storage (Parquet files)

| Platform | Notes |
|----------|-------|
| Google Cloud Storage | Ingested into BigQuery or Databricks |
| Amazon S3 | Parquet format |
| Azure Blob Storage | Parquet format |

A `SUCCESS` file is created per execution date to confirm successful transfer. A `data_load_times.json` tracks the timestamp of the last successful load per table.

## Schema Structure

Data is split into two schemas based on API mode:

| Schema | Description |
|--------|-------------|
| `STRIPE` | Production (live) data |
| `STRIPE_TESTMODE` | Sandbox (test) data |

All tables include a `merchant_id` column for multi-account filtering.

### API-Based Datasets (3-hour freshness)

| Dataset | Example Tables |
|---------|---------------|
| billing | invoices, subscriptions, plans, prices, coupons |
| payments | charges, payment_intents, refunds, disputes, balance_transactions |
| customers | customers, customer_balance_transactions |
| checkout | checkout_sessions, payment_links |
| connect | accounts, application_fees |
| issuing | issuing_cards, issuing_authorizations, issuing_transactions |

### Derived Datasets (variable freshness)

| Dataset | Frequency | Example Tables |
|---------|-----------|----------------|
| tax | 24h | tax_transactions, tax_transaction_line_items |
| transfers | 24h | transfers, transfer_reversals |
| capital | 24h | financing_balances, financing_offers |
| treasury | 24h | treasury_financial_accounts, treasury_transactions |
| analytics | 24–100h | authentication_report_attempts |
| radar | 24–120h | radar_rules, card_testing |

Most tables have a corresponding `*_metadata` table (e.g., `charges_metadata`).

## Data Freshness

| Metric | Definition |
|--------|-----------|
| Frequency | How often Stripe sends data (e.g., every 3 hours at 00:00, 03:00, 06:00 UTC) |
| P50 | Median time from event creation to data availability |
| P90 | Time by which 90% of data is available |
| Max Latency | Maximum expected time from event creation to availability |

**API-based datasets (standard):**

| Frequency | P50 | P90 | Max Latency |
|-----------|-----|-----|-------------|
| 3h | 6h | 7h | 12h |

**Sample derived dataset freshness:**

| Table | Frequency | P50 | P90 | Max |
|-------|-----------|-----|-----|-----|
| payment_records | 3h | 7h | 9h | 18h |
| itemized_fees | 24h | 44h | 48h | 151h |
| customer_change_events | 24h | 41h | 43h | 79h |
| tax_transactions | 24h | 35h | 39h | 55h |

Query the `data_load_times` table to check when each table was last loaded:

```sql
SELECT created, id, amount, currency, source_id
FROM balance_transactions, data_load_times
WHERE data_load_times.table_name = 'balance_transactions'
  AND datediff(day, created, data_load_times.loaded) <= 7
ORDER BY created DESC;
```

## Setup

### Snowflake

1. Go to **Reporting > Data Management > Data Pipeline Settings** in the Stripe Dashboard
2. Select **Snowflake**, enter Account Identifier, cloud provider, and region
3. Run the provided SQL query in Snowflake; copy the result back to Stripe
4. In Snowflake as `ACCOUNTADMIN`, accept the incoming data share under **Data > Shared Data**
5. Mount the share as a database (e.g., `Stripe`)

### Amazon Redshift RA3

1. Register with **Redshift** in the Stripe Dashboard; provide AWS Account ID and region
2. Wait up to 12 hours for the data share to appear
3. In Redshift console, navigate to **Data Sharing > From Other Accounts**
4. Associate the share `share_[ACCOUNT_ID]` and create a database from it

**Prerequisite:** RA3 cluster with encryption enabled.

### Databricks

1. Run `SELECT current_metastore();` in Databricks; paste the result (`cloud:region:uuid`) into the Stripe Dashboard
2. Grant provider permissions: `GRANT USE PROVIDER ON METASTORE TO 'your_email';`
3. In **Catalog > Delta Sharing > Shared with me**, mount the `stripe` share as a new catalog
4. Run the dashboard verification query in the new catalog and click **Activate Databricks**

### Cloud Storage (GCS / S3 / Azure Blob)

- Stripe sends Parquet files to your storage bucket
- Individual platform setup guides are available in the documentation for each provider

## Notes

- Only one warehouse account can be linked per Stripe account
- Data Pipeline is not available to customers or users in India (data localization regulations)
- Financial Reports (prefixed `FINANCIAL_REPORT`) are available only in Snowflake
- UTF-8 characters unsupported by Redshift are replaced with `?` during data load
- Sandbox testing uses `STRIPE_TESTMODE` schema; does not consume free trial credits
- To change the connected warehouse, disable Data Pipeline and re-register with the new warehouse
- Use Stripe Organizations to manage multiple Stripe accounts sharing a single warehouse

## Related

- [README](./README.md)
