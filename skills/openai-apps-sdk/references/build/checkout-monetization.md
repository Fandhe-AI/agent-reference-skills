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

MCP server `complete_checkout` tool (Python, `fastmcp` + `pydantic`; the `output_schema` declares the MCP `outputSchema`, `ToolResult.structured_content` supplies `structuredContent`, `meta` supplies `_meta`; this local fixture accepts `example-session` and `example-payment-token` and returns a sample response without charging a payment method or creating an order):

```python
from typing import Any, Literal

from fastmcp import FastMCP
from fastmcp.tools.tool import ToolResult
from pydantic import BaseModel

server = FastMCP("Checkout response fixture")
META_SESSION_ID = "openai/checkoutSessionId"


class Buyer(BaseModel):
    email: str


class PaymentData(BaseModel):
    # Deliberately accepts only a local fixture token, never real payment credentials.
    token: Literal["example-payment-token"]


class CompleteCheckoutOutput(BaseModel):
    id: str
    status: str
    currency: str
    line_items: list[dict[str, Any]]
    fulfillment_address: dict[str, Any]
    fulfillment_options: list[dict[str, Any]]
    fulfillment_option_id: str
    totals: list[dict[str, Any]]
    order: dict[str, Any]


@server.tool(
    description="Return the local checkout response fixture; does not charge a payment method or create a real order.",
    output_schema=CompleteCheckoutOutput.model_json_schema(),
)
async def complete_checkout(
    checkout_session_id: str,
    buyer: Buyer,
    payment_data: PaymentData,
) -> ToolResult:
    if checkout_session_id != "example-session":
        raise ValueError("This response fixture only accepts example-session")
    return ToolResult(
        content=[],
        structured_content={
            "id": checkout_session_id,
            "status": "completed",
            "currency": "USD",
            "line_items": [
                {
                    "id": "line_item_1",
                    "item": {
                        "id": "item_1",
                        "quantity": 1,
                    },
                    "base_amount": 3000,
                    "discount": 0,
                    "subtotal": 3000,
                    "tax": 300,
                    "total": 3300,
                },
            ],
            "fulfillment_address": {
                "name": "Jane Customer",
                "line_one": "123 Main St",
                "line_two": "Apt 4B",
                "city": "San Francisco",
                "state": "CA",
                "country": "US",
                "postal_code": "94107",
                "phone_number": "+1 (555) 555-5555",
            },
            "fulfillment_options": [
                {
                    "id": "fulfillment_option_1",
                    "type": "shipping",
                    "title": "Standard shipping",
                    "subtitle": "3-5 business days",
                    "carrier": "USPS",
                    "earliest_delivery_time": "2026-02-24T15:00:00Z",
                    "latest_delivery_time": "2026-02-28T18:00:00Z",
                    "subtotal": 0,
                    "tax": 0,
                    "total": 0,
                },
            ],
            "fulfillment_option_id": "fulfillment_option_1",
            "totals": [
                {
                    "type": "items_base_amount",
                    "display_text": "Items subtotal",
                    "amount": 3000,
                },
                {
                    "type": "subtotal",
                    "display_text": "Subtotal",
                    "amount": 3000,
                },
                {
                    "type": "tax",
                    "display_text": "Tax",
                    "amount": 300,
                },
                {
                    "type": "total",
                    "display_text": "Total",
                    "amount": 3300,
                },
            ],
            "order": {
                "id": "order_id_123",
                "checkout_session_id": checkout_session_id,
                "permalink_url": "",
            },
        },
        meta={META_SESSION_ID: "checkout-flow"},
        is_error=False,
    )
```

## Options / Props

| Field | Description |
|-------|-------------|
| `id` | Unique checkout session ID |
| `payment_provider.provider` | PSP slug (e.g. `stripe`); consult your PSP for `merchant_id` |
| `payment_provider.supported_payment_methods` | Card (`allowed_card_brands`), `apple_pay`, `google_pay` etc. accepted |
| `payment_provider.managed_payment_methods` | Payment methods already saved with your merchant |
| `payment_mode` | `"live"` or `"test"` |
| `line_items[]` | `id`, `item`, `name`, `base_amount`, `discount`, `subtotal`, `tax`, `total` (integer minor currency units) |
| `totals[]` | Ordered display rows: `items_base_amount`, `subtotal`, `fulfillment`, `tax`, `total` |
| `fulfillment_options[]` / `fulfillment_option_id` | Shipping choices and the selected one |
| `fulfillment_address` | Recipient name/address/phone |
| `messages[]` | Informational / error messages (`type`, `param`, `content_type`, `content`) |
| `links[]` | `terms_of_use`, `privacy_policy`, `support_url` |
| `metadata` | String-valued key/value pairs (e.g. `cart_id`) |
| `merchant`, `logo_url`, `conversation_id`, `connector_id`, `ecosystem_app_uri` | Host-owned checkout session fields added by ChatGPT; the plugin supplies the other session fields |

Supported PSPs for the ChatGPT payment sheet: Adyen (https://docs.adyen.com/online-payments/agentic-commerce), Checkout.com (https://api-reference.checkout.com/tag/Agentic-Commerce-Protocol/), Fiserv, PayPal (https://docs.paypal.ai/growth/agentic-commerce/agent-ready), Stripe (https://docs.stripe.com/agentic-commerce/apps), Worldpay (https://docs.worldpay.com/access/products/ai/acp).

## Notes

- **External checkout** (recommended, GA): the widget links/redirects the user to a merchant-hosted flow on your own domain; you handle pricing, payment, shipping, and fulfillment for eligible physical goods. Current approval is limited to physical-goods purchases.
- **Saved payment methods**: widget shows previously-saved methods only (cannot collect new credentials); no redirect out of ChatGPT.
- **ChatGPT payment sheet** (private beta, select marketplaces): widget calls `window.openai.requestCheckout(session)`; ChatGPT opens its native sheet, then sends a payment token to your MCP server's `complete_checkout` tool, which charges the token and returns the completed order. Include `_meta.ui.resourceUri` on the response if you want a confirmation widget.
- Flow: the server's MCP tool returns checkout session data (session id, line items, totals, payment provider) in `structuredContent`; the widget previews the cart and calls `requestCheckout(session_data)` with a unique `id` for every checkout session; after the user pays, the widget calls back through `complete_checkout`, and the completed order is returned to the widget as the `requestCheckout` response.
- Populate `payment_provider.merchant_id` with the value specified by your PSP; the exact `id` and `payment_provider` values depend on your PSP and commerce system. Session totals must match server calculations.
- Treat the server as the source of truth for prices and order status — verify the payment token, make `complete_checkout` idempotent, persist the order, never trust totals computed only in the widget.
- Error codes `payment_declined` and `requires_3ds` render directly on the ChatGPT payment sheet; all other errors are returned to the widget as the `requestCheckout` response for custom handling.
- `payment_mode: "test"` opens a sheet that accepts test cards (e.g. 4242) against your PSP's staging environment; `merchant_id` may need a different value in test mode.
- PCI DSS Level 1 certified merchants can optionally receive raw payment methods via the Agentic Commerce Protocol Delegate Payment endpoint instead of a token.
- Checkout session contents: your MCP tool should return line items and quantities, totals (subtotal, tax, discounts, fees, total) matching your server calculations, provider metadata required by your PSP integration, and legal / policy links. ChatGPT adds host-owned fields (`merchant`, `logo_url`, `conversation_id`, `connector_id`, `ecosystem_app_uri`).
- `requestCheckout` details: the widget should feature-detect `window.openai?.requestCheckout`; the promise resolves with the order result or rejects on error / cancel; render the session JSON so users can review what they pay for; use integer minor currency units for all amounts; keep `metadata` values as strings; use the PSP slug required by your integration for `provider`. The payment sheet displays the amount to charge and the payment methods once `requestCheckout` is called.
- `complete_checkout` adaptation: charge the payment method in `payment_data` through your PSP, persist the order, return authoritative order / receipt data, and include `_meta.ui.resourceUri` for a confirmation widget (ChatGPT honors `_meta["openai/outputTemplate"]` as an optional compatibility alias). The payment sheet is "limited to select marketplaces today and is not available to all users"; until broader access, route purchase flows to external checkout.
- Raw payment methods (PCI DSS Level 1 merchants only): implement the Agentic Commerce Protocol Delegate Payment endpoint; the request carries the full payment method (raw card number, expiration, CVC, billing address, allowance constraints, risk signals, metadata). Your response returns an `id` (plus `created` and `metadata`) representing the payment method, which is passed to `complete_checkout` as part of `payment_data`.
- Test mode: the resulting `token` within `payment_data` can be processed in your PSP's staging environment, so end-to-end flows run without moving real funds.
- Implementation checklist: define the session model (IDs, payment provider object, line items, totals, legal links); return the session from your MCP tool in `structuredContent` alongside your widget template; render it in the widget; call `requestCheckout(session_data)` on user action and handle the resolved order or error; implement `complete_checkout` returning a response that follows the checkout spec; test end to end with realistic amounts, taxes, and discounts.
- Source: https://developers.openai.com/plugins/build/monetization (local .md twin copy, fetched 2026-11-14).

## Related

- [Add UI to your MCP server](./chatgpt-ui.md)
- [MCP server](./mcp-server.md)
