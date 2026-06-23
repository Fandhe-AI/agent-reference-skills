# payments

| Name | Description | Path |
|------|-------------|------|
| PaymentIntents | Tracks a payment from creation to completion; handles authentication, retries, and SCA compliance | [payment-intents.md](./payment-intents.md) |
| PaymentMethods | Represents a customer's payment instrument; combined with PaymentIntent or SetupIntent to accept or save payments | [payment-methods.md](./payment-methods.md) |
| Charges | Represents a single attempt to move money into your account; created automatically by PaymentIntent confirmation in modern flows | [charges.md](./charges.md) |
| Refunds | Refunds a previously created Charge or PaymentIntent; supports full and partial refunds with optional reason codes | [refunds.md](./refunds.md) |
| Disputes | Represents a chargeback or inquiry; submit evidence via the API to contest the dispute with the card network | [disputes.md](./disputes.md) |
