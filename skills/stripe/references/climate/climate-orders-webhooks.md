# Webhooks for Climate Orders API

Webhook events Stripe sends for Climate products and orders. Set up a webhook endpoint to listen for product availability and delivery updates.

## Signature / Usage

```text
climate.product.created
climate.product.pricing_updated
climate.order.delivered
climate.order.delayed
climate.order.product_substituted
climate.order.canceled
```

## Options / Props

| Event | Trigger |
|-------|---------|
| `climate.product.created` | Frontier adds a new product to the carbon removal inventory. |
| `climate.product.pricing_updated` | Price of a product changes. Email notice two weeks in advance, then this event. Prices never change for confirmed orders. Availability updates are only notified through this event. |
| `climate.order.delivered` | Frontier received carbon removal from the supplier, verified delivery, and retired the units on behalf of you or your beneficiary. Sent within 30 days of order for spot purchases. |
| `climate.order.delayed` | Order cannot be fulfilled by the delivery date. Sent with an email at least 60 days before the end of the delivery year; includes the updated `expected_delivery_year`. |
| `climate.order.product_substituted` | Individual supplier failed and Frontier substituted a similar product. Sent with an email with replacement details at least 60 days before the end of the delivery year. |
| `climate.order.canceled` | Frontier cannot fulfill the order within 2 years of the original expected delivery date; full refund. Cancellation decisions are made at least 60 days before the order is due; email plus this event. |

## Notes

- On `climate.order.delayed` you can accept the delay or cancel the order within 30 days for a full refund; with no action, Frontier attempts delivery by the updated `expected_delivery_year`.
- On `climate.order.product_substituted`, if you do not want the substitute you can cancel the order within 30 days for a full refund.
- You receive an event any time an order's status changes.

## Related

- [Climate Orders](./climate-orders.md)
- [Climate Products](./climate-products.md)
- [How Climate Orders Work](./climate-orders-how-it-works.md)
