# Payment Links

A no-code solution for accepting online payments via shareable URLs. Payment Links are reusable — multiple customers can use the same link — and support one-time payments, subscriptions, and donations without writing frontend code.

## Signature / Usage

```javascript
// Create a Payment Link via API
const paymentLink = await stripe.paymentLinks.create({
  line_items: [{ price: 'price_xxx', quantity: 1 }],
});

console.log(paymentLink.url); // Share this URL with customers
```

## Options / Props

### Create parameters

| Name | Type | Description |
|------|------|-------------|
| `line_items` | array | **Required.** Array of `{ price, quantity }` objects. Max 20 items. |
| `line_items[].price` | string | Price ID from your catalog. |
| `line_items[].price_data` | object | Inline price definition: `{ currency, unit_amount, product_data: { name } }`. |
| `line_items[].quantity` | integer | Quantity of the item. |
| `after_completion` | object | Action to take after payment: `{ type: 'redirect', redirect: { url } }` or `{ type: 'hosted_confirmation', hosted_confirmation: { custom_message } }`. |
| `payment_method_types` | array | Explicit list of accepted payment method types. Omit for dynamic selection. |
| `allow_promotion_codes` | boolean | Allow customers to enter promotion codes. |
| `billing_address_collection` | string | `'auto'` (default) or `'required'`. |
| `shipping_address_collection` | object | `{ allowed_countries: string[] }` — collect shipping address. |
| `automatic_tax` | object | `{ enabled: boolean }` — enable automatic tax calculation. |
| `subscription_data` | object | Subscription settings, e.g. `{ trial_period_days: 7 }`. |
| `custom_fields` | array | Collect additional information from customers. |
| `custom_text` | object | Custom text to display on the payment page. |
| `currency` | string | Three-letter ISO currency code. Used for Adaptive Pricing. |
| `inactive_message` | string | Message shown when the link is inactive. |
| `metadata` | object | Set of key-value pairs for storing additional information. |

### Update parameters

| Name | Type | Description |
|------|------|-------------|
| `active` | boolean | Activate or deactivate the payment link. |
| `line_items` | array | Update line items. |
| `after_completion` | object | Update post-payment action. |

## Notes

- Payment Links are reusable: multiple customers can pay via the same URL, unlike Checkout Sessions which are single-use.
- Adaptive Pricing is enabled by default — customers can pay in their local currency across 150+ currencies.
- Variable pricing is supported via `custom_unit_amount[enabled]=true` in the price — customers enter the amount themselves.
- For subscriptions, configure `subscription_data` and use a recurring price; `trial_period_days` sets a free trial.
- Buy buttons can be embedded on any webpage by copying the embed code from the Stripe Dashboard.
- Deactivate a link by setting `active: false` via the API or Dashboard; an `inactive_message` is shown to customers.

### API endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/v1/payment_links` | Create a Payment Link |
| `GET` | `/v1/payment_links/:id` | Retrieve a Payment Link |
| `POST` | `/v1/payment_links/:id` | Update a Payment Link |
| `GET` | `/v1/payment_links` | List all Payment Links |
| `GET` | `/v1/payment_links/:id/line_items` | List line items for a Payment Link |

## Related

- [Checkout Sessions](./checkout-sessions.md)
- [Stripe Elements](./stripe-elements.md)
