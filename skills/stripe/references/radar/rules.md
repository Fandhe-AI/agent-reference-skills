# Radar Rules

Custom rules that tell Radar how to handle payments — block, allow, review, or request 3D Secure — based on attributes of the transaction.

## Signature / Usage

Rule syntax:

```
{action} if {attribute} {operator} {value}
```

Example:

```
Block if :card_funding: = 'prepaid' and :amount_in_usd: > 1000
Review if :is_disposable_email: and :card_funding: = 'prepaid'
Request 3D Secure if :risk_level: != 'normal' and :amount_in_usd: > 25
Allow if :ip_country: = 'US' and :risk_level: != 'highest'
```

## Options / Props

### Actions

| Action | Description |
|--------|-------------|
| `Block` | Decline the payment |
| `Allow` | Override all other rules and Stripe's default risk assessment |
| `Review` | Flag for manual inspection |
| `Request 3D Secure` | Require customer authentication before proceeding |

### Operators

| Operator | Description |
|----------|-------------|
| `=` | Equals |
| `!=` | Not equals |
| `>` | Greater than |
| `<` | Less than |
| `>=` | Greater than or equal |
| `<=` | Less than or equal |
| `in` | Membership in a value list (`@list_alias`) |
| `and` | Logical AND |
| `not` | Logical NOT |

### Common Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `:risk_level:` | string | `'normal'`, `'elevated'`, `'highest'` |
| `:risk_score:` | number | Numeric Radar score (0–100) |
| `:amount_in_usd:` | number | Transaction amount in USD |
| `:card_country:` | string | 2-char ISO country of the card issuer |
| `:card_funding:` | string | `'credit'`, `'debit'`, `'prepaid'` |
| `:ip_country:` | string | 2-char ISO country of the client IP |
| `:digital_wallet:` | string | `'apple_pay'`, `'android_pay'`, etc. |
| `:is_disposable_email:` | boolean | `true` if a disposable email domain is used |
| `:is_new_card_on_customer:` | boolean | `true` if the card is new to the customer |
| `:is_off_session:` | boolean | `true` for off-session / recurring payments |
| `:payment_method_type:` | string | `'card'`, `'us_bank_account'`, `'sepa_debit'`, etc. |
| `:seconds_since_card_first_seen:` | number | Seconds since the card was first seen on Stripe |
| `:is_3d_secure:` | boolean | Card supports 3DS and it was attempted |
| `:is_3d_secure_authenticated:` | boolean | Customer completed full 3DS authentication |
| `:has_liability_shift:` | boolean | Stripe has liability shift protection |
| `:has_cryptogram:` | boolean | Tokenized payment (digital wallet) cryptogram present |
| `::metadata_key::` | any | Custom metadata value (double-colon syntax) |

### Value Lists in Rules

Reference a value list with the `@` prefix:

```
Block if :email: in @blocked_emails
Request 3D Secure if :card_country: in @enforce_3ds_list
```

## Notes

- Rules apply only to **future** transactions; they are not retroactive
- `Request 3D Secure` rules are evaluated **before** block/allow/review rules
- `Allow` rules override all other rules including Stripe's default risk assessment
- Maximum **200 transaction rules** and **100 account rules** per account
- Test rules against past 6 months of data before enabling
- Avoid blocking digital wallets (Apple Pay, Google Pay) or off-session payments in 3DS rules
- Stripe automatically triggers 3DS for regulatory compliance (PSD2 SCA) regardless of rules
- Custom metadata attributes use double-colon syntax: `::customer:trusted::`

## Related

- [reviews.md](./reviews.md)
- [early-fraud-warnings.md](./early-fraud-warnings.md)
