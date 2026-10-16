# Physical Cards

Issue physical cards at Stripe. Two options: a standard card (logo on a black or white card, live in as little as two days) and a custom card (fully designed, 8-10 weeks).

## Signature / Usage

The source page contains no API code. Standard card designs are set up in the Dashboard:

```text
https://dashboard.stripe.com/issuing/personalization-designs
```

## Options / Props

| Option | Standard card | Custom card |
|--------|---------------|-------------|
| Branding | Black or white card plus your company logo | Fully custom; materials such as plastic and metal, various packaging |
| Setup | Dashboard Designs tab | Live design sessions scheduled by Stripe |
| Go live | As little as 2 days after onboarding to Issuing | 8-10 weeks (varies with design/packaging complexity) |
| Minimum order | None stated | 2,500 cards |
| Cost | 3.50 USD (US), 3.50 GBP (UK), 3,50 EUR (EU); shipping costs apply per region | Depends on customization; see Stripe Support |

### Standard card timeline

| Day | You | Stripe |
|-----|-----|--------|
| Day 1 | Select black or white card and add your logo | - |
| Day 2 | - | Reviews design for card network compliance |
| Day 3 | Issue cards to your customers | - |

### Custom card timeline

| Week | You | Stripe | Card Manufacturer |
|------|-----|--------|-------------------|
| Week 1 | Work with Stripe to design your card | Live expert design guidance | - |
| Week 2 | - | Submits a manufacturing order | - |
| Week 3 | - | - | Receives card network approval, begins manufacturing |
| Week 8 | - | Tests card quality | - |
| Week 10 | Issue cards to your customers | - | - |

## Notes

- Custom cards must be manufactured, tested, and stocked before printing and shipping. Stripe recommends piloting with standard cards while custom cards are produced in parallel.
- Digital wallets (Apple Pay, Google Pay, Samsung Pay) support Stripe-issued physical cards. Wallet lead times vary by region and might require partnering with Stripe.
- Support: end users contact the business or platform that issued the card (Stripe cannot assist end users directly); platform users contact Stripe Support and direct cardholders to the platform.
- Shipping costs are documented on a separate page (`/issuing/cards/physical/ship-cards`), not covered here.
- Source: https://docs.stripe.com/issuing/cards/physical (retrieved 2026-10).

## Related

- [cards.md](./cards.md)
- [digital-wallets.md](./digital-wallets.md)
