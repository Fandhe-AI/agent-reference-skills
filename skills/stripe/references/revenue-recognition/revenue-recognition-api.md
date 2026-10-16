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
  -u "<<YOUR_SECRET_KEY>>:"
```

## Options / Props

### Report types

| Name | Description |
| --- | --- |
| `revenue_recognition.debit_credit_summary.1` | Debits and credits summary |
| `revenue_recognition.debit_credit_by_price.1` | Debits and credits by price |
| `revenue_recognition.debit_credit_by_product.1` | Debits and credits by product |
| `revenue_recognition.debit_credit_by_customer.1` | Debits and credits by customer |
| `revenue_recognition.debit_credit_by_invoice.1` | Debits and credits by invoice |
| `revenue_recognition.debit_credit_by_invoice_line_item.1` | Debits and credits by invoice line item |

### Report run parameters

| Report Type | Optional Run Parameters |
| --- | --- |
| revenue_recognition.debit_credit_summary.1 | `decimal_format` |
| revenue_recognition.debit_credit_by_price.1 | `customer`, `decimal_format` |
| revenue_recognition.debit_credit_by_product.1 | `customer`, `decimal_format` |
| revenue_recognition.debit_credit_by_customer.1 | `decimal_format` |
| revenue_recognition.debit_credit_by_invoice.1 | `customer`, `invoice`, `invoice_line_item`, `decimal_format` |
| revenue_recognition.debit_credit_by_invoice_line_item.1 | `customer`, `invoice`, `invoice_line_item`, `decimal_format` |

### Report run columns

#### Common columns (all report types)

| Name | Default | Description |
| --- | --- | --- |
| `accounting_period` | Yes | The accounting period |
| `open_accounting_period` | Yes | Entries in open periods are subject to change |
| `currency` | Yes | Three-letter ISO code |
| `debit` | Yes | Debited account |
| `credit` | Yes | Credited account |
| `amount` | Yes | Major units of the currency |
| `credit_gl_code` | No | — |
| `debit_gl_code` | No | — |

#### Additional columns by report type

| Report type | Additional default columns | Additional optional columns |
| --- | --- | --- |
| summary | — | — |
| by_price | `price_id` | — |
| by_product | `product_id` | — |
| by_customer | `customer_id` | — |
| by_invoice | `transaction_model_id`, `booked_date` | `invoice_id`, `invoice_line_item_id`, `invoice_item_id`, `invoice_number`, `subscription_item_id`, `price_id`, `product_id`, `customer_id`, `subscription_id`, `charge_id`, `refund_id`, `dispute_id`, `presentment_currency`, `presentment_amount` |
| by_invoice_line_item | `transaction_model_id`, `booked_date` | `invoice_id`, `invoice_line_item_id`, `invoice_item_id`, `subscription_item_id`, `price_id`, `product_id`, `customer_id`, `subscription_id`, `charge_id`, `refund_id`, `dispute_id`, `presentment_currency`, `presentment_amount` |

## Notes

- All report types require `interval_start` and `interval_end`.
- By default, reports run with the default column set. Customize selection and ordering with the optional `columns` parameter.
- Beta feature; data fields might change. Contact revenue-recognition-api-beta@stripe.com for issues.
- `transaction_model_id` is the Stripe model associated with the change (invoice line item, invoice, invoice item, charge, and so on).
- `invoice_id` and `price_id` are `null` for standalone charges or invoice items not associated with an invoice or price.
- Report Run objects: see the Stripe Reporting API (`/v1/reporting/report_runs`).
- Source: https://docs.stripe.com/revenue-recognition/api (retrieved 2026-10).

## Related

- [Revenue Recognition Reports](./revenue-recognition-reports.md)
- [Revenue Recognition](./revenue-recognition-overview.md)
