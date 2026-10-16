# How Climate Orders Work

Life cycle of a carbon removal order: procurement, supplier monitoring, and delivery. Climate Orders buys permanent carbon removal from the Frontier offtake portfolio and its individual suppliers.

## Signature / Usage

Frontier handles the following on your behalf (verbatim from the docs):

```text
- Procures supply: This requires establishing purchasing criteria, sourcing promising projects, and negotiating contracts.
- Monitors supplier progress: This includes monitoring supplier performance against key milestones.
- Manages deliveries: This includes validating delivery and retiring purchases.
```

You can purchase carbon removal programmatically using the Climate API or manually using the Dashboard (`https://dashboard.stripe.com/climate/orders`).

## Options / Props

Frontier purchasing criteria:

| Criteria | Description |
|----------|-------------|
| Durability | Store carbon permanently (>1,000 years) |
| Physical footprint | Take advantage of carbon sinks and sources that don't compete for arable land |
| Cost | Have a path to being affordable at scale (<100 USD per ton) |
| Capacity | Have a path to being a meaningful part of the carbon removal solution portfolio (>0.5 gigatons per year) |
| Net negativity | Maximize net removal of atmospheric carbon dioxide |
| Additionality | Result in net new carbon removed, rather than taking credit for removal that was already going to occur |
| Verifiability | Have a published protocol that addresses key pathway uncertainties, has responded to scientific community feedback, and has a plan for independent verification of outcomes |
| Safety and legality | Have a compelling case for why they don't cause additional ecosystem damage or other ongoing externalities, has published ecosystem impact data and responded to feedback from the scientific community, and will actively manage the minimal remaining uncertainty within their deployments based on ongoing ecosystem monitoring |
| Performance data | Have technology that has been validated by data obtained through a pilot deployment |
| Community engagement | Have a community benefits plan and has proactively engaged stakeholders and incorporated feedback into their deployment plans |

## Notes

- Purchasing decisions weigh three factors: Approach (meets target criteria), Execution (team can deliver given current technology), Portfolio (builds a diverse, risk-adjusted portfolio).
- Suppliers are sourced and vetted by Frontier's in-house team and a group of 60+ technical reviewers. Frontier signs long-term offtake agreements (purchase at a certain price if and when tons are delivered and verified).
- Delayed: a project unable to deliver by the original `expected_delivery_year` but expected to deliver within two years. Failed: unable to deliver within 2 years of the original `expected_delivery_year`.
- If an order is delayed or fails, Stripe sends an email and the relevant webhook at least 60 days in advance. On delay you can receive a full refund or wait for delivery. On an individual supplier failure Frontier tries to substitute a similar supplier in the portfolio (units may vary by pathway, geography, and price); you can cancel for a full refund instead.
- Delays and failures do not apply to spot purchases (already verified and delivered to Stripe, retired to you within 30 days of purchase), which have guaranteed inventory.
- On delivery, units are retired on an independent third-party registry and all deliveries are third-party verified. Frontier shares a delivery certificate and supplier details. Units are retired on your behalf (or your beneficiary's) when possible; otherwise in Frontier's name.
- You can use carbon removal units for net zero or carbon neutrality claims only after delivery, not before.
- Net zero (per SBTi as described in the docs) requires reducing current emissions by at least 90%, purchasing permanent carbon removal for the remaining 10%, and supporting beyond value chain mitigation. Carbon neutrality is described as poorly defined, generally claimed when purchased credits or removal units equal remaining emissions.

## Related

- [Climate Orders](./climate-orders.md)
- [Climate Products](./climate-products.md)
- [Climate Suppliers](./climate-suppliers.md)
- [Webhooks for Climate Orders API](./climate-orders-webhooks.md)
- [Climate Commitments](./climate-commitments.md)
