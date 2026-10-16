# Manage Fraud with Issuing

Overview of transaction fraud, loss liability, and the controls and tools Stripe Issuing offers to prevent, detect, and respond to fraud.

## Signature / Usage

Deactivate a card on suspected unauthorized activity (Issuing API `status` field), then cancel it once misuse is confirmed. The source page contains no code; this snippet is derived from the card endpoint documented in `./cards.md`.

```bash
curl https://api.stripe.com/v1/issuing/cards/ic_xxx \
  -u "sk_test_YOUR_SECRET_KEY:" \
  -d status=inactive
```

## Options / Props

| Control / Tool | Stage | Description |
|----------------|-------|-------------|
| KYC/KYB | Proactive | Collect and verify business/individual information; Connect Onboarding can handle it |
| Spending controls | Proactive | Block countries or business categories; per-authorization or per-month limits on cards or cardholders |
| 3D Secure | Proactive | Extra authentication for online purchases; shifts liability to the issuer when the business triggers it |
| Stripe Defense Layer | Real-time | Automatic blocking of card testing and extremely high-risk authorizations (under 0.5% of authorizations); does not affect liability |
| Real-time webhook | Real-time | Approve or decline authorizations with your own logic |
| Fraud challenges | Real-time | SMS confirmation; cardholder can retry after confirming |
| Verification data comparison | Real-time | Mismatch notification on CVV2, expiration date, billing address, billing zip code, PIN |
| Token management | Post-fraud | Shut down digital wallet tokens via the Tokens API |
| Card management | Post-fraud | Deactivate via Dashboard or Issuing API; cancel on confirmed unauthorized use |
| Disputes | Post-fraud | File with Visa or Mastercard with reason "Fraudulent"; recovery not guaranteed |

### Monitoring metrics

| Type | Examples |
|------|----------|
| Leading | Declines for incorrect verification data, authorization rate, authorizations outside geographic footprint, by acquiring business country, by business category code, force captures |
| Lagging | Percentage of spend disputed for fraud, dispute win-loss rate, absolute dispute losses, acquiring businesses with highest percentage of transactions disputed |

## Notes

- Loss liability falls on the business, you (the issuing user), or rarely the cardholder. Stripe may assist with prevention, but you are responsible for losses where the issuer is liable.
- Card-present: issuer is generally liable; manually entered numbers (mail/telephone order) put liability on the business; a chip card used at a magnetic-stripe-only terminal shifts liability to the business; a magnetic stripe used at a chip-capable terminal stays with you.
- Card-not-present: determined primarily by 3DS. When a business triggers 3DS, liability usually shifts to you regardless of whether you enabled 3DS.
- Digital wallet (Apple Pay / Google Pay) card-not-present transactions also shift liability to the issuer.
- Most users file fraud disputes on 0.1% or less of transaction volume.
- You can request adjusted defaults (relaxed 3DS, higher amount caps) case by case; you bear the increased risk.
- Educate cardholders: check for skimmers, transact at trusted businesses, cancel lost or stolen cards immediately.
- Source: https://docs.stripe.com/issuing/manage-fraud (retrieved 2026-10).

## Related

- [cards.md](./cards.md)
- [authorizations.md](./authorizations.md)
- [digital-wallets.md](./digital-wallets.md)
