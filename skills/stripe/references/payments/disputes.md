# Disputes

Represents a chargeback or inquiry raised by a cardholder against a charge. Submit evidence to demonstrate the charge is legitimate; Stripe forwards it to the card network.

## Signature / Usage

```bash
# Submit evidence for a dispute
curl https://api.stripe.com/v1/disputes/du_1MtJUT2eZvKYlo2CNaw2HvEv \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d "evidence[customer_email_address]=customer@example.com" \
  -d "evidence[shipping_tracking_number]=794644792798" \
  -d "evidence[product_description]=Blue widget, shipped on 2024-01-10" \
  -d submit=true
```

## Options / Props

### Update (`POST /v1/disputes/:id`)

| Name | Type | Description |
|------|------|-------------|
| `evidence` | object | Evidence fields supporting the charge legitimacy (see below) |
| `submit` | boolean | Set to `true` to submit evidence immediately to the card network |
| `metadata` | object | Arbitrary key-value pairs |

### Evidence Fields

| Name | Description |
|------|-------------|
| `customer_name` | Full name of the customer |
| `customer_email_address` | Customer's email address |
| `customer_purchase_ip` | IP address at purchase time |
| `billing_address` | Customer's billing address |
| `receipt` | File ID of a transaction receipt |
| `customer_communication` | File ID of customer communication logs |
| `shipping_address` | Delivery address |
| `shipping_carrier` | Name of shipping carrier |
| `shipping_date` | Date goods were shipped |
| `shipping_tracking_number` | Tracking number |
| `shipping_documentation` | File ID of shipping documentation |
| `service_date` | Date service was provided |
| `service_documentation` | File ID of service documentation |
| `refund_policy` | File ID or URL of refund policy |
| `refund_policy_disclosure` | Explanation of how policy was disclosed |
| `cancellation_policy` | File ID or URL of cancellation policy |
| `product_description` | Description of the product or service |
| `duplicate_charge_explanation` | Explanation if the dispute reason is duplicate |
| `uncategorized_text` | Any additional evidence in text form |
| `uncategorized_file` | File ID for any additional documentation |

### Object Attributes

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (e.g., `du_...`) |
| `object` | string | Always `"dispute"` |
| `amount` | integer | Disputed amount in smallest currency unit |
| `currency` | enum | ISO 4217 currency code |
| `charge` | string | ID of the disputed Charge |
| `payment_intent` | string | ID of the disputed PaymentIntent (if applicable) |
| `reason` | string | Dispute reason reported by cardholder (e.g., `general`, `fraudulent`, `not_received`) |
| `status` | enum | Current dispute status (see below) |
| `is_charge_refundable` | boolean | Whether the charge can still be refunded |
| `evidence` | object | Evidence fields submitted or staged |
| `evidence_details` | object | Submission metadata: `due_by`, `has_evidence`, `past_due`, `submission_count` |
| `balance_transactions` | array | Fund movements (withdrawal and reinstatement) |
| `metadata` | object | Custom key-value pairs |

### Status Values

| Status | Description |
|--------|-------------|
| `needs_response` | Dispute requires merchant response |
| `under_review` | Dispute under review after evidence submission |
| `won` | Resolved in merchant's favor; funds reinstated |
| `lost` | Resolved in cardholder's favor |
| `warning_needs_response` | Inquiry (pre-dispute) requiring response |
| `warning_under_review` | Inquiry under review |
| `warning_closed` | Inquiry closed without formal dispute |

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/disputes/:id` | Retrieve a dispute |
| POST | `/v1/disputes/:id` | Update evidence or metadata |
| GET | `/v1/disputes` | List all disputes |
| POST | `/v1/disputes/:id/close` | Accept the dispute (concede) |

## Notes

- When a dispute is created, Stripe debits the disputed amount plus a dispute fee from your balance (`charge.dispute.funds_withdrawn`).
- If you win, funds are reinstated (`charge.dispute.funds_reinstated`).
- Evidence must be submitted before `evidence_details.due_by` (typically 7–21 days after the dispute is opened).
- You may submit evidence multiple times; each submission is tracked in `evidence_details.submission_count`.
- Closing a dispute via `/close` accepts the dispute as lost — only do this if you do not intend to contest it.
- Webhook events: `charge.dispute.created`, `charge.dispute.updated`, `charge.dispute.funds_withdrawn`, `charge.dispute.funds_reinstated`, `charge.dispute.closed`.
- Visa Compelling Evidence 3.0 (`enhanced_eligibility`) can strengthen cases with prior undisputed transaction data.

## Related

- [Charges](./charges.md)
- [Refunds](./refunds.md)
