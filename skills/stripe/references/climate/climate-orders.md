# Climate Orders

Represents a purchase of carbon removal units from Frontier's offtake portfolio. Creating an order immediately deducts payment from your Stripe balance.

## Signature / Usage

```javascript
// Create an order by metric tons
const order = await stripe.climate.orders.create({
  product: 'climsku_frontier_offtake_portfolio_2027',
  metric_tons: '0.01',
});

// Create an order by amount
const order = await stripe.climate.orders.create({
  product: 'climsku_frontier_offtake_portfolio_2027',
  amount: 10000,
  currency: 'usd',
});
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/v1/climate/orders` | Create an order |
| GET | `/v1/climate/orders/:id` | Retrieve an order |
| POST | `/v1/climate/orders/:id` | Update an order |
| GET | `/v1/climate/orders` | List all orders |
| POST | `/v1/climate/orders/:id/cancel` | Cancel an order |

## Options / Props

### Create Parameters

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `product` | string | Yes | Unique identifier of the Climate product to purchase |
| `amount` | integer | Conditional | Purchase amount in smallest currency unit; either `amount` or `metric_tons` required |
| `metric_tons` | string | Conditional | Quantity in metric tons; either `metric_tons` or `amount` required |
| `currency` | string | No | 3-letter ISO currency code (lowercase); defaults to account's default currency |
| `beneficiary` | object | No | Publicly sharable reference for the end beneficiary of carbon removal |
| `beneficiary.public_name` | string | Conditional | Publicly displayable name for the beneficiary; required if `beneficiary` is set |
| `metadata` | object | No | Key-value pairs for storing additional structured information |

### Order Object Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the order |
| `object` | string | Always `"climate.order"` |
| `amount_fees` | integer | Service fees in smallest currency unit |
| `amount_subtotal` | integer | Carbon removal cost excluding fees |
| `amount_total` | integer | Total charge including fees |
| `beneficiary` | object \| null | End beneficiary reference with `public_name` |
| `canceled_at` | timestamp \| null | Unix timestamp when order was canceled |
| `cancellation_reason` | enum \| null | One of `expired`, `product_unavailable`, `requested` |
| `certificate` | string \| null | URL to delivery certificate (only for delivered orders) |
| `confirmed_at` | timestamp \| null | Unix timestamp when order was confirmed |
| `created` | timestamp | Unix timestamp of order creation |
| `currency` | string | 3-letter ISO currency code |
| `delayed_at` | timestamp \| null | Unix timestamp when delivery year changed |
| `delivered_at` | timestamp \| null | Unix timestamp when delivery completed |
| `delivery_details` | array | Carbon removal delivery details per supplier |
| `expected_delivery_year` | integer | Expected year of carbon removal delivery |
| `livemode` | boolean | `true` for live mode, `false` for test mode |
| `metadata` | object | Custom key-value metadata |
| `metric_tons` | string | Quantity of carbon removal in metric tons |
| `product` | string | Climate product ID (expandable) |
| `product_substituted_at` | timestamp \| null | Unix timestamp if product was substituted |
| `status` | enum | One of `awaiting_funds`, `confirmed`, `canceled`, `delivered` |

## Notes

- Funds are deducted from your Stripe balance immediately upon order creation, not at delivery.
- Orders can be canceled within 24 hours of creation for a refund of `amount_subtotal`; `amount_fees` is non-refundable.
- If Frontier cancels (e.g., supplier fails to deliver), the full `amount_total` including fees is refunded (90 days advance notice given).
- Available in: US, EU, CA, GB, JP, LI, NO.
- Automate orders from webhook events: `checkout.session.completed`, `invoice.paid`, `topup.succeeded`.

### Webhook Events

| Event | Trigger |
|-------|---------|
| `climate.order.created` | Order successfully created |
| `climate.order.canceled` | Order canceled |
| `climate.order.delayed` | Order delivery year changed |
| `climate.order.delivered` | Order fulfilled with carbon removal |
| `climate.order.product_substituted` | Order product was substituted |

### Order Status Flow

```
awaiting_funds → confirmed → delivered
                           ↘ canceled
```

## Related

- [Climate Products](./climate-products.md)
- [Climate Suppliers](./climate-suppliers.md)
