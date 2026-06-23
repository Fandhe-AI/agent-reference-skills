# Money Movement

Treasury provides three APIs for moving funds out of or into a FinancialAccount, plus two read-only APIs for inbound funds and their reversals.

| API | Direction | Destination |
|-----|-----------|-------------|
| `InboundTransfer` | Into FinancialAccount | From own PaymentMethod (ACH debit) |
| `OutboundTransfer` | Out of FinancialAccount | To own PaymentMethod / FinancialAccount (ACH or wire) |
| `OutboundPayment` | Out of FinancialAccount | To third-party bank account or FinancialAccount (ACH or wire) |
| `ReceivedCredit` | Received by FinancialAccount | External push (ACH / wire / Stripe network) — read-only |
| `CreditReversal` | Reversal of ReceivedCredit | Returns funds to the original sender |

---

## InboundTransfer

Pulls funds from a PaymentMethod you own into a FinancialAccount via ACH debit.

### Signature / Usage

```bash
curl https://api.stripe.com/v1/treasury/inbound_transfers \
  -u "YOUR_SECRET_KEY" \
  -d financial_account=fa_xxx \
  -d amount=10000 \
  -d currency=usd \
  -d origin_payment_method=pm_xxx \
  -d description="Fund from my bank account"
```

### Options / Props

| Name | Type | Description |
|------|------|-------------|
| `financial_account` | string | **Required.** Destination FinancialAccount ID |
| `amount` | integer | **Required.** Amount in cents |
| `currency` | enum | **Required.** Lowercase ISO 4217 code (e.g., `usd`) |
| `origin_payment_method` | string | **Required.** PaymentMethod ID to debit |
| `description` | string | Arbitrary description |
| `statement_descriptor` | string | Bank statement descriptor (max 10 chars) |
| `metadata` | object | Key-value pairs |

### Notes

- Requires `inbound_transfers.ach` feature to be `active` on the FinancialAccount.
- Returns status `processing`; use test helper `POST /v1/test_helpers/treasury/inbound_transfers/:id/succeed` (or `/fail`, `/return`) to simulate transitions.
- Endpoints: `POST`, `GET /:id`, `GET` (list), `POST /:id/cancel`.

---

## OutboundTransfer

Sends funds from a FinancialAccount to a PaymentMethod belonging to **the same entity** via ACH or domestic wire.

### Signature / Usage

```bash
curl https://api.stripe.com/v1/treasury/outbound_transfers \
  -u "YOUR_SECRET_KEY" \
  -d financial_account=fa_xxx \
  -d destination_payment_method=pm_xxx \
  -d amount=50000 \
  -d currency=usd \
  -d description="Withdraw to business checking"
```

### Options / Props

| Name | Type | Description |
|------|------|-------------|
| `financial_account` | string | **Required.** Source FinancialAccount ID |
| `amount` | integer | **Required.** Amount in cents |
| `currency` | enum | **Required.** Lowercase ISO 4217 code |
| `destination_payment_method` | string | PaymentMethod ID (exclusive with `_data`) |
| `destination_payment_method_data` | object | Inline PaymentMethod (exclusive with above); `type: financial_account` supported |
| `destination_payment_method_options.us_bank_account.network` | enum | `ach` (default) or `us_domestic_wire` |
| `description` | string | Arbitrary description |
| `statement_descriptor` | string | Max 10 chars (ACH) or 140 chars (wire); defaults to `"transfer"` |
| `metadata` | object | Key-value pairs |

### Notes

- Use `OutboundPayment` instead when the destination belongs to a **different** entity.
- Returns status `processing`. Test helpers: `/fail`, `/post`, `/return`.
- Endpoints: `POST`, `GET /:id`, `GET` (list), `POST /:id/cancel`.

---

## OutboundPayment

Sends funds from a FinancialAccount to an **external** party (third-party bank account or another entity's FinancialAccount).

### Signature / Usage

```bash
curl https://api.stripe.com/v1/treasury/outbound_payments \
  -u "YOUR_SECRET_KEY" \
  -d financial_account=fa_xxx \
  -d amount=10000 \
  -d currency=usd \
  -d customer=cus_xxx \
  -d destination_payment_method=pm_xxx \
  -d description="Payment to vendor"
```

### Options / Props

| Name | Type | Description |
|------|------|-------------|
| `financial_account` | string | **Required.** Source FinancialAccount ID |
| `amount` | integer | **Required.** Amount in cents |
| `currency` | enum | **Required.** Lowercase ISO 4217 code |
| `customer` | string | Customer ID (must match destination payment method owner) |
| `destination_payment_method` | string | PaymentMethod ID (exclusive with `_data`) |
| `destination_payment_method_data` | object | Inline PaymentMethod hash |
| `destination_payment_method_options.us_bank_account.network` | enum | `ach` (default) or `us_domestic_wire` |
| `description` | string | Arbitrary description |
| `statement_descriptor` | string | 10 chars (ACH), 140 chars (wire), 500 chars (Stripe network) |
| `end_user_details` | object | `present` (boolean) + `ip_address`; `ip_address` required when `present=true` |
| `purpose` | enum | Payment purpose (e.g., `payroll`) |
| `metadata` | object | Key-value pairs |

### Notes

- Returns status `processing`. Test helpers: `/fail`, `/post`, `/return`.
- Endpoints: `POST`, `GET /:id`, `GET` (list), `POST /:id/cancel`.

---

## ReceivedCredit

Read-only. Represents funds pushed **into** a FinancialAccount from an external source (ACH credit, wire, Stripe network payout).

### Signature / Usage

```bash
curl -G https://api.stripe.com/v1/treasury/received_credits \
  -u "YOUR_SECRET_KEY" \
  -d financial_account=fa_xxx \
  -d limit=3
```

### Options / Props (list)

| Name | Type | Description |
|------|------|-------------|
| `financial_account` | string | Filter by FinancialAccount ID |
| `status` | enum | `succeeded` or `failed` |
| `linked_flows.source_flow_type` | enum | `credit_reversal`, `outbound_payment`, `outbound_transfer`, `payout`, `other` |
| `limit` | integer | 1–100, default 10 |
| `starting_after` / `ending_before` | string | Pagination cursors |

### Object fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | `rc_…` identifier |
| `amount` | integer | Amount in cents |
| `currency` | string | ISO 4217 code |
| `network` | string | Payment network (e.g., `ach`) |
| `status` | enum | `succeeded` or `failed` |
| `initiating_payment_method_details` | object | Source payment method info |
| `linked_flows` | object | References to associated flow objects |
| `reversal_details` | object | Reversal deadline and restrictions |

### Notes

- ReceivedCredits cannot be created via the API (use test helper `POST /v1/test_helpers/treasury/received_credits` for testing).
- Check `reversal_details` to determine if a ReceivedCredit is eligible for reversal.

---

## CreditReversal

Reverses a `ReceivedCredit`, returning funds to the originating sender. Eligibility depends on the payment network and source flow.

### Signature / Usage

```bash
curl https://api.stripe.com/v1/treasury/credit_reversals \
  -u "YOUR_SECRET_KEY" \
  -d received_credit=rc_xxx
```

### Options / Props

| Name | Type | Description |
|------|------|-------------|
| `received_credit` | string | **Required.** ID of the ReceivedCredit to reverse |
| `metadata` | object | Key-value pairs |

### Object fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | `credrev_…` identifier |
| `object` | string | `"treasury.credit_reversal"` |
| `amount` | integer | Amount reversed in cents |
| `currency` | string | ISO 4217 code |
| `financial_account` | string | Associated FinancialAccount ID |
| `network` | string | Payment network (e.g., `ach`) |
| `received_credit` | string | ID of the reversed ReceivedCredit |
| `status` | string | `processing` on creation |
| `status_transitions` | object | Timestamps for status changes |
| `transaction` | string | Associated Transaction ID |
| `hosted_regulatory_receipt_url` | string | URL for regulatory receipt |

### Notes

- Reversing creates a new `CreditReversal` object — the original `ReceivedCredit` is not modified.
- Endpoints: `POST /v1/treasury/credit_reversals`, `GET /:id`, `GET` (list).

## Related

- [financial-accounts.md](./financial-accounts.md)
- [transactions.md](./transactions.md)
