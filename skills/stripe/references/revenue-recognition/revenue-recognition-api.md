# Revenue Recognition API

Access Stripe Revenue Recognition reports programmatically through the Reporting API (report runs). Beta: data fields might change.

## Signature / Usage

Create a report run (example: debits and credits summary for May 2025; `interval_start` = 1 May 2025, `interval_end` = 1 Jun 2025):

```bash
curl https://api.stripe.com/v1/reporting/report_runs \
  -u "<<YOUR_SECRET_KEY>>:" \
  -d "report_type=revenue_recognition.debit_credit_summary.1" \
  -d "parameters[interval_start]=1746057600" \
  -d "parameters[interval_end]=1748736000"
```

Poll the report run (ID starts with `frr_`) until `status` is `succeeded`:

```bash
curl https://api.stripe.com/v1/reporting/report_runs/frr_xxx \
  -u "<<YOUR_SECRET_KEY>>:"
```

Download the CSV with `result.id` (starts with `file_`):

```bash
curl https://files.stripe.com/v1/files/file_xxx/contents \
  -u <<YOUR_SECRET_KEY>>:
```

## Report types

- `revenue_recognition.debit_credit_summary.1`
- `revenue_recognition.debit_credit_by_price.1`
- `revenue_recognition.debit_credit_by_product.1`
- `revenue_recognition.debit_credit_by_customer.1`
- `revenue_recognition.debit_credit_by_invoice.1`
- `revenue_recognition.debit_credit_by_invoice_line_item.1`

## Report Run Parameters

All report types require `interval_start` and `interval_end`.

| Report Type | Optional Run Parameters |
| --- | --- |
| revenue_recognition.debit_credit_summary.1 | `decimal_format` |
| revenue_recognition.debit_credit_by_price.1 | `customer`, `decimal_format` |
| revenue_recognition.debit_credit_by_product.1 | `customer`, `decimal_format` |
| revenue_recognition.debit_credit_by_customer.1 | `decimal_format` |
| revenue_recognition.debit_credit_by_invoice.1 | `customer`, `invoice`, `invoice_line_item`, `decimal_format` |
| revenue_recognition.debit_credit_by_invoice_line_item.1 | `customer`, `invoice`, `invoice_line_item`, `decimal_format` |

## Report Run Columns

By default, reports run with the default column set. Customize selection and ordering with the optional `columns` parameter. Columns marked default are included by default.

Common to all report types (default): `accounting_period` (the accounting period), `open_accounting_period` (entries in open periods are subject to change), `currency` (three-letter ISO code), `debit` (debited account), `credit` (credited account), `amount` (major units of the currency). Non-default in all: `credit_gl_code`, `debit_gl_code`.

Additional columns per report type:

| Report type | Additional default columns | Additional optional columns |
| --- | --- | --- |
| summary | — | — |
| by_price | `price_id` | — |
| by_product | `product_id` | — |
| by_customer | `customer_id` | — |
| by_invoice | `transaction_model_id`, `booked_date` | `invoice_id`, `invoice_line_item_id`, `invoice_item_id`, `invoice_number`, `subscription_item_id`, `price_id`, `product_id`, `customer_id`, `subscription_id`, `charge_id`, `refund_id`, `dispute_id`, `presentment_currency`, `presentment_amount` |
| by_invoice_line_item | `transaction_model_id`, `booked_date` | `invoice_id`, `invoice_line_item_id`, `invoice_item_id`, `subscription_item_id`, `price_id`, `product_id`, `customer_id`, `subscription_id`, `charge_id`, `refund_id`, `dispute_id`, `presentment_currency`, `presentment_amount` |

## Notes

- Beta feature; data fields might change. Contact revenue-recognition-api-beta@stripe.com for issues.
- `transaction_model_id` is the Stripe model associated with the change (invoice line item, invoice, invoice item, charge, and so on).
- `invoice_id` and `price_id` are `null` for standalone charges or invoice items not associated with an invoice or price.
- Report Run objects: see the Stripe Reporting API (`/v1/reporting/report_runs`).

## Related

- [Revenue Recognition Reports](./revenue-recognition-reports.md)
- [Revenue Recognition](./revenue-recognition-overview.md)
