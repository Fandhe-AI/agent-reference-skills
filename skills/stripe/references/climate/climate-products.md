# Climate Products

Represents a type of carbon removal unit available for reservation. Use products to check current pricing and available metric tons before placing an order.

## Signature / Usage

```javascript
// List all available products
const products = await stripe.climate.products.list();

// Retrieve a specific product
const product = await stripe.climate.products.retrieve(
  'climsku_frontier_offtake_portfolio_2027'
);
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/climate/products/:id` | Retrieve a product |
| GET | `/v1/climate/products` | List all products |

## Options / Props

### Product Object Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (format: `climsku_*`) |
| `object` | string | Always `"climate.product"` |
| `created` | timestamp | Unix timestamp of creation |
| `current_prices_per_metric_ton` | object | Pricing keyed by 3-letter currency code |
| `current_prices_per_metric_ton.<currency>.amount_fees` | integer | Fees per metric ton in smallest currency unit |
| `current_prices_per_metric_ton.<currency>.amount_subtotal` | integer | Carbon removal cost per metric ton (excluding fees) |
| `current_prices_per_metric_ton.<currency>.amount_total` | integer | Total per metric ton including fees |
| `delivery_year` | integer \| null | Expected delivery year for carbon removal |
| `livemode` | boolean | `true` for live mode, `false` for test mode |
| `metric_tons_available` | string | Available metric tons remaining for reservation |
| `name` | string | Human-readable product name |
| `suppliers` | array | Array of Climate Supplier objects included in this product |

## Notes

- Products are managed by Stripe/Frontier; you cannot create or modify them.
- `metric_tons_available` decreases as orders are placed; check before ordering to avoid failures.
- A single product may aggregate multiple suppliers (portfolio purchase).
- Pricing changes trigger the `climate.product.pricing_updated` webhook event.

### Webhook Events

| Event | Trigger |
|-------|---------|
| `climate.product.created` | New product becomes available |
| `climate.product.pricing_updated` | Product pricing changes |

## Related

- [Climate Orders](./climate-orders.md)
- [Climate Suppliers](./climate-suppliers.md)
