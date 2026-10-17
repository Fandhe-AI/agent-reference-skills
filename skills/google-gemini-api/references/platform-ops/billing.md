---
source: https://ai.google.dev/gemini-api/docs/billing
---

# Billing

Overview of Gemini API billing options: usage tiers, Prepay and Postpay plans, spend caps, processing times, refunds, Cloud Billing accounts, and FAQs.

## Signature / Usage

Source page has no code; tier table from the page:

```text
| Usage tier | Qualification | Billing tier cap |
|---|---|---|
| Free | Active project or free trial | N/A |
| Tier 1 | Set up and link an active billing account | $250 |
| Tier 2 | Paid $100 + 3 days from first successful payment | $2,000 |
| Tier 3 | Paid $1,000 + 30 days from first successful payment | $20,000 - $100,000+ |
```

## Options / Props

| Topic | Details |
|-------|---------|
| Free tier | New accounts start here; access to certain models up to free tier rate limits |
| Paid tier setup | In AI Studio, link a billing account and prepay a minimum of $5 (or equivalent); users either prepay, choose Prepay / Postpay, or are assigned Postpay in an intermediary period |
| Prepay | Credits bought in advance (minimum $5, maximum $5,000), deducted in near real-time; unused credits expire after 12 months and are non-refundable (except when switching to Postpay); at $0 balance all API keys in all projects linked to the billing account stop working (HTTP 402 Payment Required) |
| Auto-reload | Optional; set payment method, reload amount, and minimum balance trigger; optional Monthly auto-charge limit disables auto-reload until next month once reached (manual purchases do not count) |
| Postpay | Costs accrue on the Cloud Billing account and are charged at month end or when reaching the automatically assigned spend cap |
| Project spend caps | Experimental; set per project in AI Studio (Spend page, Monthly spend cap); about 10 minute latency may cause overages; batch and agent sessions may exceed the cap |
| Billing account tier spend caps | Free N/A; Tier 1 $250; Tier 2 $2,000; Tier 3 $20,000 - $100,000; enforced at billing account level; at the limit service pauses for all linked projects until the 1st of the next month |
| Billed for | Input token count, output token count, cached token count, cached token storage duration |

## Notes

- Prepay and Postpay plans start taking effect March 23, 2026. Accounts that predate them are evaluated and assigned a plan or offered a choice; Prepay is not available for Invoiced (Offline) accounts, and spend caps are not available for Invoiced accounts.
- Migrating Postpay to Prepay: AI Studio Billing page, Switch to Prepay, purchase credits (minimum $5). Switching from Prepay to Postpay by choice is not supported; an eligible manual upgrade to Postpay closes the Prepay account and refunds unused credits.
- Billing pipeline latency is about 10 minutes; Prepay can overshoot into a negative balance, deducted from the next credit purchase. Batch mode and agents may keep consuming credits beyond the balance before usage halts.
- Tier upgrades usually reflect within 10 minutes; cost-breakdown graphs can take up to 24 hours.
- Tiers, rate limits, and caps are determined at the billing account level; all projects linked inherit them. API keys have no independent billing settings.
- Google Cloud Welcome credit / free trial credit cannot be used for Gemini API or AI Studio usage if the account was opened after March 2, 2026 (the page also states Gemini API usage is excluded from the $300 Free Trial starting March 2026). Prepay users must purchase credits before eligible Google Cloud credits apply.
- Failed requests (400 or 500) are not charged for tokens but still count against quota. `GetTokens` requests are not billed and do not count against inference quota.
- Missing payments for other Postpay Google Cloud services can suspend Gemini API access regardless of Prepay balance.
- Google Cloud Starter Tier: eligible accounts can publish up to 2 full-stack apps from Build mode without a Google Cloud project or billing account.
- Docs fetched 2026-10-16.

## Related

- [pricing](./pricing.md)
- [rate-limits](./rate-limits.md)
- [api-errors](./api-errors.md)
