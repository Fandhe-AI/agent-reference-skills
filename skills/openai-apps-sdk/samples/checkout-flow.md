# Checkout API: Widget Purchase Flow

Trigger the ChatGPT native payment sheet from a widget with `window.openai.requestCheckout`, backed by an MCP tool that completes the checkout session server-side.

Widget side — build a checkout session and open the payment sheet:

```tsx
const checkoutRequest = {
  id: "checkout_session_123",
  payment_provider: {
    provider: "stripe",
    merchant_id: "merchant_123",
    supported_payment_methods: [
      {
        type: "card",
        allowed_card_brands: ["visa", "mastercard"],
      },
      { type: "apple_pay" },
      { type: "google_pay" },
    ],
    managed_payment_methods: [
      {
        type: "card",
        id: "pm_123",
        display_name: "Visa ending in 4242",
        display_last4: "4242",
        display_brand: "visa",
      },
    ],
  },
  payment_mode: "live",
  status: "ready_for_payment",
  currency: "USD",
  metadata: {
    cart_id: "cart_123",
    merchant_order_reference: "order_ref_123",
  },
  line_items: [
    {
      id: "line_item_123",
      item: { id: "item_123", quantity: 1 },
      name: "Canvas backpack",
      description: "A weather-resistant everyday backpack.",
      images: ["https://merchant.example.com/images/canvas-backpack.png"],
      base_amount: 3000,
      discount: 0,
      subtotal: 3000,
      tax: 300,
      total: 3300,
    },
  ],
  totals: [
    { type: "items_base_amount", display_text: "Items subtotal", amount: 3000 },
    { type: "subtotal", display_text: "Subtotal", amount: 3000 },
    { type: "fulfillment", display_text: "Shipping", amount: 550 },
    { type: "tax", display_text: "Tax", amount: 300 },
    { type: "total", display_text: "Total", amount: 3850 },
  ],
  fulfillment_options: [
    {
      id: "standard_shipping",
      type: "shipping",
      title: "Standard shipping",
      subtitle: "Arrives in 3-5 business days",
      carrier: "USPS",
      earliest_delivery_time: "2027-01-15T15:00:00Z",
      latest_delivery_time: "2027-01-19T18:00:00Z",
      subtotal: 500,
      tax: 50,
      total: 550,
    },
  ],
  fulfillment_option_id: "standard_shipping",
  fulfillment_address: {
    name: "Jane Customer",
    line_one: "123 Main St",
    line_two: "Apt 4B",
    city: "San Francisco",
    state: "CA",
    country: "US",
    postal_code: "94107",
    phone_number: "+14155550123",
  },
  messages: [
    {
      type: "info",
      param: "fulfillment_address",
      content_type: "plain",
      content: "Free returns within 30 days.",
    },
  ],
  links: [
    { type: "terms_of_use", url: "https://merchant.example.com/terms" },
    { type: "privacy_policy", url: "https://merchant.example.com/privacy" },
    { type: "support_url", url: "https://merchant.example.com/support" },
  ],
};

const response = await window.openai.requestCheckout(checkoutRequest);
```

Server side — MCP tool that finalizes the session. ChatGPT sends `payment_data` (a PSP payment token, not a completed payment) once the buyer confirms the sheet; the tool must charge that token with the PSP itself and only return `status: "completed"` if the charge succeeds — never mark an order completed on the strength of the request alone. MCP calls can be retried before the caller sees a response, so `complete_checkout` must be idempotent: pass a stable `idempotency_key` derived from `checkout_session_id` to the PSP charge call, and short-circuit with the stored result if the session is already `completed` — otherwise a retry re-charges the buyer's payment token on every attempt. On decline, return `isError: true` describing the failure instead of a completed order. The completed order must otherwise carry the same totals and `fulfillment_option_id` the buyer approved above (line items 3000 + tax 300 + shipping 550 = total 3850) — do not silently drop the shipping line or the payer will be charged less than what the payment sheet displayed. The `fulfillment_options` delivery window must also stay `2027-01-15T15:00:00Z`–`2027-01-19T18:00:00Z`, the same dates the buyer approved in the session above — reporting a different (and already-elapsed) window on the completed order would contradict what the payment sheet showed:

```py
from typing import Annotated, Any

from pydantic import BaseModel


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


async def charge_with_psp(payment_data: PaymentData, amount: int, currency: str, idempotency_key: str):
    # payment_data.token is the PSP payment token ChatGPT collected in the sheet.
    # Send it to the PSP (Stripe/Adyen/...) to actually capture funds; the token
    # itself is not proof of payment. idempotency_key must be stable across retries
    # of the same checkout session so the PSP dedupes repeated charge attempts
    # instead of capturing funds again. Returns an object with `.succeeded` and,
    # on failure, `.decline_reason` (e.g. "insufficient_funds").
    return await psp_client.charge(
        token=payment_data.token,
        amount=amount,
        currency=currency,
        idempotency_key=idempotency_key,
    )


@tool(description="")
async def complete_checkout(
    self,
    checkout_session_id: str,
    buyer: Buyer,
    payment_data: PaymentData,
) -> Annotated[types.CallToolResult, CompleteCheckoutOutput]:
    # A retried MCP call must not re-charge: if this session already completed,
    # return the stored result instead of calling the PSP again.
    stored = await get_stored_checkout_result(checkout_session_id)
    if stored is not None and stored["status"] == "completed":
        return types.CallToolResult(
            content=[],
            structuredContent=stored,
            _meta={META_SESSION_ID: "checkout-flow"},
            isError=False,
        )

    charge = await charge_with_psp(
        payment_data,
        amount=3850,
        currency="USD",
        idempotency_key=checkout_session_id,
    )

    if not charge.succeeded:
        # `payment_declined` is one of the error codes the ChatGPT payment sheet
        # renders directly; do not populate structuredContent (it must satisfy
        # CompleteCheckoutOutput, i.e. a *completed* order) on this path.
        return types.CallToolResult(
            content=[
                {"type": "text", "text": f"payment_declined: {charge.decline_reason}"}
            ],
            isError=True,
        )

    result = {
        "id": checkout_session_id,
        "status": "completed",
        "currency": "USD",
        "line_items": [
            {
                "id": "line_item_123",
                "item": {"id": "item_123", "quantity": 1},
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
                "id": "standard_shipping",
                "type": "shipping",
                "title": "Standard shipping",
                "subtitle": "3-5 business days",
                "carrier": "USPS",
                "earliest_delivery_time": "2027-01-15T15:00:00Z",
                "latest_delivery_time": "2027-01-19T18:00:00Z",
                "subtotal": 500,
                "tax": 50,
                "total": 550,
            },
        ],
        "fulfillment_option_id": "standard_shipping",
        "totals": [
            {"type": "items_base_amount", "display_text": "Items subtotal", "amount": 3000},
            {"type": "subtotal", "display_text": "Subtotal", "amount": 3000},
            {"type": "fulfillment", "display_text": "Shipping", "amount": 550},
            {"type": "tax", "display_text": "Tax", "amount": 300},
            {"type": "total", "display_text": "Total", "amount": 3850},
        ],
        "order": {
            "id": "order_id_123",
            "checkout_session_id": checkout_session_id,
            "permalink_url": "",
        },
    }
    await store_checkout_result(checkout_session_id, result)

    return types.CallToolResult(
        content=[],
        structuredContent=result,
        _meta={META_SESSION_ID: "checkout-flow"},
        isError=False,
    )
```

## Notes

- `window.openai.requestCheckout` opens ChatGPT's native payment sheet and returns the finalized `order` payload; always feature-detect (`window.openai?.requestCheckout`) before calling it.
- Give every checkout session a unique `id`; totals must reconcile (`items_base_amount` + `fulfillment` + `tax` = `total`).
- `payment_data` is a PSP token, not a completed payment — `complete_checkout` must call the PSP (`charge_with_psp` above) and only return `status: "completed"` once the charge succeeds. On decline, return `isError: true` describing the failure (mentioning `payment_declined`, the code the payment sheet renders directly) with no `structuredContent`, since `CompleteCheckoutOutput` only describes a completed order.
- MCP calls can be retried before the caller observes the response, so `complete_checkout` must be idempotent: pass an idempotency key derived from `checkout_session_id` to the PSP charge, and return the stored result for an already-`completed` session instead of charging again — otherwise a retry after a successful-but-unacknowledged charge re-bills the buyer's payment token.
- The MCP server tool (Python example above) runs after the PSP charge succeeds and must derive its response from the same checkout session — matching `fulfillment_option_id`, `fulfillment_options` (including the delivery-window timestamps), and `totals` (including the `fulfillment` line) that the buyer approved, then returns the completed order plus a session-tracking `_meta` key.
- Monetization/Checkout is ChatGPT-specific and not part of the shared MCP Apps standard; this is the ChatGPT-app (server/publisher) side of MCP.

Source: https://developers.openai.com/plugins/build/monetization
