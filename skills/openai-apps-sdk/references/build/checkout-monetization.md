# Checkout and monetization

How a plugin's widget and MCP server implement purchases. External checkout (redirecting to a merchant-hosted flow) is the recommended, generally-available approach; saved-payment-method checkout and the embedded ChatGPT payment sheet (`requestCheckout` / `complete_checkout`) are the in-ChatGPT alternatives, with the payment sheet currently in private beta for select marketplaces.

## Signature / Usage

```tsx
// Widget: open the ChatGPT payment sheet
const order = await window.openai.requestCheckout({
  id: "checkout_session_123",
  payment_provider: {
    provider: "stripe",
    merchant_id: "merchant_123",
    supported_payment_methods: [{ type: "card", allowed_card_brands: ["visa", "mastercard"] }],
  },
  payment_mode: "live",
  status: "ready_for_payment",
  currency: "USD",
  line_items: [
    {
      id: "line_item_123",
      item: { id: "item_123", quantity: 1 },
      name: "Canvas backpack",
      base_amount: 3000,
      discount: 0,
      subtotal: 3000,
      tax: 300,
      total: 3300,
    },
  ],
  totals: [{ type: "total", display_text: "Total", amount: 3850 }],
});
```

```py
# MCP server: complete_checkout tool (Python SDK)
@tool(description="")
async def complete_checkout(
    self, checkout_session_id: str, buyer: Buyer, payment_data: PaymentData,
) -> Annotated[types.CallToolResult, CompleteCheckoutOutput]:
    return types.CallToolResult(
        content=[],
        structuredContent={
            "id": checkout_session_id,
            "status": "completed",
            "currency": "USD",
            "order": {"id": "order_id_123", "checkout_session_id": checkout_session_id, "permalink_url": ""},
            # line_items, fulfillment_address, fulfillment_options, totals ...
        },
        isError=False,
    )
```

## Options / Props

| Field | Description |
|-------|-------------|
| `id` | Unique checkout session ID |
| `payment_provider.provider` | PSP slug (e.g. `stripe`); consult your PSP for `merchant_id` |
| `payment_provider.supported_payment_methods` | Card/Apple Pay/Google Pay etc. accepted |
| `payment_provider.managed_payment_methods` | Payment methods already saved with your merchant |
| `payment_mode` | `"live"` or `"test"` |
| `line_items[]` | `id`, `item`, `name`, `base_amount`, `discount`, `subtotal`, `tax`, `total` (integer minor currency units) |
| `totals[]` | Ordered display rows: `items_base_amount`, `subtotal`, `fulfillment`, `tax`, `total` |
| `fulfillment_options[]` / `fulfillment_option_id` | Shipping choices and the selected one |
| `fulfillment_address` | Recipient name/address/phone |
| `links[]` | `terms_of_use`, `privacy_policy`, `support_url` |
| `metadata` | String-valued key/value pairs (e.g. `cart_id`) |

Supported PSPs for the ChatGPT payment sheet: Adyen, Checkout.com, Fiserv, PayPal, Stripe, Worldpay.

## Notes

- **External checkout** (recommended, GA): the widget links/redirects the user to a merchant-hosted flow on your own domain; you handle pricing, payment, shipping, and fulfillment for eligible physical goods. Current approval is limited to physical-goods purchases.
- **Saved payment methods**: widget shows previously-saved methods only (cannot collect new credentials); no redirect out of ChatGPT.
- **ChatGPT payment sheet** (private beta, select marketplaces): widget calls `window.openai.requestCheckout(session)`; ChatGPT opens its native sheet, then sends a payment token to your MCP server's `complete_checkout` tool, which charges the token and returns the completed order. Include `_meta.ui.resourceUri` on the response if you want a confirmation widget.
- Treat the server as the source of truth for prices and order status — verify the payment token, make `complete_checkout` idempotent, persist the order, never trust totals computed only in the widget.
- Error codes `payment_declined` and `requires_3ds` render directly on the ChatGPT payment sheet; all other errors are returned to the widget as the `requestCheckout` response for custom handling.
- `payment_mode: "test"` opens a sheet that accepts test cards (e.g. 4242) against your PSP's staging environment; `merchant_id` may need a different value in test mode.
- PCI DSS Level 1 certified merchants can optionally receive raw payment methods via the Agentic Commerce Protocol Delegate Payment endpoint instead of a token.

## Related

- [Add UI to your MCP server](./chatgpt-ui.md)
- [MCP server](./mcp-server.md)
