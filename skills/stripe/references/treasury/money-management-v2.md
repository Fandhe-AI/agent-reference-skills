# Money Management API v2

API v2 resources under `/v2/money_management/` for financial accounts, receiving funds, pulling funds, vaulted recipient bank accounts and payout methods. They are used by Global Payouts and the newer Treasury flows and are separate from the v1 `/v1/treasury/*` resources.

## Signature / Usage

```bash
curl https://api.stripe.com/v2/money_management/financial_accounts \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-10-28.endive"
```

Create a financial address to receive funds into a financial account:

```bash
curl -X POST https://api.stripe.com/v2/money_management/financial_addresses \
  -H "Authorization: Bearer <<YOUR_SECRET_KEY>>" \
  -H "Stripe-Version: 2026-06-24.preview" \
  -H "Stripe-Context: {{CONTEXT_ID}}" \
  --json '{
    "financial_account": "{{FINANCIALACCOUNTID_ID}}",
    "type": "us_bank_account"
  }'
```

## Options / Props

| Resource | Operations | Events |
| --- | --- | --- |
| Financial Accounts | list, retrieve, update; balances `available`, inbound pending, outbound pending | |
| Transactions / Transaction Entries | list, retrieve (Transactions: update `description` and `metadata`) | |
| Adjustments | list, retrieve | |
| Financial Addresses | create, retrieve, list; `bank_account` credentials grouped as `aba`, `iban` or `sort_code` | `v2.money_management.financial_address.activated`, `.failed` |
| Received Credits | retrieve, list (bank transfers and balance transfers) | `v2.money_management.received_credit.available`, `.failed`, `.returned`, `.succeeded` |
| Inbound Transfers | create, retrieve, list (pull from an external bank account by ACH Direct Debit) | `v2.money_management.inbound_transfer.available`, `.bank_debit_queued`, `.bank_debit_processing`, `.bank_debit_succeeded`, `.bank_debit_failed`, `.bank_debit_returned` |
| Payout Methods | retrieve, list, archive, unarchive; bank account requirement specs | `v2.money_management.payout_method.created`, `.updated` |
| Outbound Setup Intents | create, retrieve, update, list, cancel | |
| Vaulted bank accounts (`/v2/core/vault/gb_bank_accounts`, `us_bank_accounts`) | create, retrieve, list, archive; US also microdeposits and Fedwire routing number | |
| Payout Intents, Outbound Payments, Recipient Verifications | see `payout-intents.md` | |

Sandbox test helper: `POST /v2/money_management/test_helpers/financial_addresses/{id}/credit` with `amount` (`currency`, `value`), `network` (`ach`, `chaps`, `fps`, `rtp`, `sepa`, `wire`) and optional `statement_descriptor` simulates an inbound credit and returns a Financial Address Credit Simulation.

## Notes

- All of these were added in `2026-10-28.endive` as non-breaking additions. To use the API v2 vaulted bank account, Payout Method and Outbound Setup Intent resources in production, set `Stripe-Version` to `2026-10-28.endive`.
- Two changes to handle when adopting the new Money Management resources: the `fee_transaction` transaction flow type is renamed `fee_batch`, and list requests for Transactions, Transaction Entries and Adjustments use a nested `created` object instead of flat parameters.
- Regulatory receipts: Transactions expose `regulatory_receipt` (hosted receipt URL valid until `url_expires_at`; `refresh_regulatory_receipt` issues a new one), replacing `receipt_url` on the Adjustment, InboundTransfer, OutboundPayment, OutboundTransfer, ReceivedCredit and ReceivedDebit flow objects. Platforms whose connected accounts cannot access the Stripe Dashboard must make these receipts available in their own product where applicable.
- Official guides disagree on `Stripe-Version`: the Send payouts guide uses `2026-10-28.endive`, while the Fund a financial account guide's Financial Address example still uses `2026-06-24.preview` (and its inbound transfer mandate example uses `2026-10-28.preview`). The create financial address snippet above is verbatim from the latter; use the endive version for production.
- `2026-10-28.preview` made breaking changes to Financial Addresses (for example `last4` removed, `account_holder_address` renamed `address`, `sepa_credit_transfer` network renamed `sepa`, `settlement_currency` no longer accepted on create), Received Credits (`us_bank_account` / `gb_bank_account` / `sepa_bank_account` replaced by `bank_transfer.originating_bank_account`; `sepa_instant` network added) and the financial account create request (`deposit_insurance_eligibility` removed). These are listed on the preview track only and were not verified against the endive API reference; see `../api-core/api-versioning.md`.
- Source: https://docs.stripe.com/treasury/connect/moving-money/fund-a-financial-account (retrieved 2026-11-14)
- Source: https://docs.stripe.com/global-payouts/send-money (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/financial-addresses-v2-api (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/received-credits-v2-api (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/inbound-transfers-v2-api (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/v2-financial-accounts-transactions-adjustments (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/vaulted-bank-account-credentials-payout-methods-outbound-setup-intents (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/sandbox-test-helper-simulate-credits-to-financial-addresses (retrieved 2026-11-14)
- Source: https://docs.stripe.com/changelog/endive/2026-10-28/transaction-regulatory-receipts (retrieved 2026-11-14)

## Related

- [Payout Intents](./payout-intents.md)
- [Financial Accounts](./financial-accounts.md)
- [Money Movement](./money-movement.md)
- [Transactions](./transactions.md)
