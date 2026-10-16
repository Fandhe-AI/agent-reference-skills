# Issuing

| Name | Description | Path |
|------|-------------|------|
| Authorizations | Represents an authorization request created when an issued card is used for a purchase; can be approved or declined in real time via a synchronous webhook. | [authorizations.md](./authorizations.md) |
| Cardholders | Represents an individual or business entity that is issued Stripe Issuing cards; a Cardholder must be created before any cards are issued to them. | [cardholders.md](./cardholders.md) |
| Cards | Represents a physical or virtual payment card issued to a Cardholder; virtual cards are available immediately, physical cards are shipped to the cardholder's address. | [cards.md](./cards.md) |
| Digital Wallets | Add Issuing cards to digital wallets (Apple Pay, Google Pay, Samsung Pay) via manual or push provisioning; this page covers the Web push provisioning flow. | [digital-wallets.md](./digital-wallets.md) |
| Issuing Elements | Stripe.js Elements that display sensitive Issuing card data (number, CVC, expiry, PIN) in Stripe-hosted iframes, authenticated with ephemeral keys. | [issuing-elements.md](./issuing-elements.md) |
| Manage Fraud | Overview of transaction fraud, loss liability, and the controls and tools Stripe Issuing offers to prevent, detect, and respond to fraud. | [manage-fraud.md](./manage-fraud.md) |
| Physical Cards | Issue physical cards at Stripe: a standard card (logo on a black or white card, live in as little as two days) or a custom card (fully designed, 8-10 weeks). | [physical-cards.md](./physical-cards.md) |
