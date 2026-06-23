# Issuing Authorizations

Represents an authorization request created when an issued card is used for a purchase. Authorizations can be approved or declined in real-time via a synchronous webhook before the transaction completes.

## Signature / Usage

```ruby
# Respond to issuing_authorization.request webhook (approve/decline in real-time)
post '/webhook' do
  payload = request.body.read
  sig_header = request.env['HTTP_STRIPE_SIGNATURE']
  event = Stripe::Webhook.construct_event(payload, sig_header, webhook_secret)

  if event['type'] == 'issuing_authorization.request'
    auth = event['data']['object']
    approved = auth['pending_request']['amount'] <= 10000  # custom logic

    status 200
    headers 'Stripe-Version' => '2025-03-31.basil', 'Content-Type' => 'application/json'
    body({ 'approved' => approved }.to_json)
  end
end
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/issuing/authorizations/:id` | Retrieve an authorization |
| `POST` | `/v1/issuing/authorizations/:id` | Update metadata |
| `GET` | `/v1/issuing/authorizations` | List all authorizations |
| `POST` | `/v1/issuing/authorizations/:id/approve` | Approve (deprecated) |
| `POST` | `/v1/issuing/authorizations/:id/decline` | Decline (deprecated) |

## Real-Time Webhook Authorization

The primary way to approve or decline authorizations is via the `issuing_authorization.request` synchronous webhook.

### Webhook Response

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `approved` | boolean | Yes | `true` to approve, `false` to decline |
| `amount` | integer | No | Override hold amount; only valid if `pending_request.is_amount_controllable` is `true` |
| `metadata` | object | No | Custom key-value pairs to attach |
| `send_fraud_challenges` | array | No | `["sms"]` to trigger a fraud challenge before declining |

- Respond within **2 seconds** with HTTP `200`.
- Include header `Stripe-Version: {api-version}`.
- If no response is received within 2 seconds, Autopilot rules apply.

## Options / Props

### approve / decline (deprecated)

| Name | Type | Description |
|------|------|-------------|
| `amount` | integer | Override hold amount (only if `pending_request.is_amount_controllable`) |
| `metadata` | object | Custom key-value pairs |

## Object Fields

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier (`iauth_...`) |
| `approved` | boolean | Whether the authorization was approved |
| `amount` | integer | Total authorized amount in smallest currency unit |
| `currency` | enum | Transaction currency (e.g., `usd`) |
| `status` | enum | `pending`, `closed`, or `reversed` |
| `authorization_method` | enum | `chip`, `contactless`, `keyed_in`, `online`, `swipe` |
| `card` | object | Expandable Card object |
| `cardholder` | string | ID of the associated Cardholder |
| `merchant_data` | object | Merchant name, category, location |
| `merchant_amount` | integer | Amount in merchant's currency |
| `merchant_currency` | enum | Merchant's currency |
| `pending_request` | object | Present while status is `pending`; null after decision |
| `pending_request.amount` | integer | Amount requested by merchant |
| `pending_request.is_amount_controllable` | boolean | Whether `amount` can be overridden in response |
| `request_history` | array | History of approval/decline decisions with reasons |
| `transactions` | array | Associated Transaction objects |
| `verification_data` | object | AVS/CVC check results |
| `wallet` | string | Digital wallet used (e.g., `apple_pay`) |
| `metadata` | object | Custom key-value pairs |

### request_history[].reason values

| Value | Description |
|-------|-------------|
| `verification_failed` | CVC or address verification failed |
| `cardholder_verification_required` | Additional verification needed |
| `cardholder_blocked` | Cardholder status is blocked |
| `insufficient_funds` | Spending limit exceeded |
| `webhook_approved` / `webhook_declined` | Your webhook responded |
| `webhook_timeout` | Webhook did not respond in time |
| `webhook_error` | Invalid Stripe-Version header or unparseable response |

## Notes

- The `approve` and `decline` REST endpoints are **deprecated**. Prefer responding to the `issuing_authorization.request` webhook instead.
- The authorization object's initial `amount` is `0` and `approved` is `false`; these update after your webhook response.
- If Stripe cannot reach your webhook or the response is malformed, `Autopilot` rules determine the outcome.
- Sufficient issuing balance must exist; authorizations are rejected without triggering the webhook if balance is insufficient.
- Monitor `issuing_authorization.created` and `issuing_authorization.updated` events to detect `webhook_error` or `webhook_timeout` in `request_history`.

## Test Mode Helpers

| Endpoint | Description |
|----------|-------------|
| `POST /v1/test_helpers/issuing/authorizations` | Create a test authorization |
| `POST /v1/test_helpers/issuing/authorizations/:id/capture` | Capture a test authorization |
| `POST /v1/test_helpers/issuing/authorizations/:id/expire` | Expire a test authorization |
| `POST /v1/test_helpers/issuing/authorizations/:id/increment` | Increment authorization amount |
| `POST /v1/test_helpers/issuing/authorizations/:id/reverse` | Reverse a test authorization |

## Webhook Events

| Event | Description |
|-------|-------------|
| `issuing_authorization.request` | Synchronous event; respond within 2 s to approve/decline |
| `issuing_authorization.created` | Fired after authorization is created |
| `issuing_authorization.updated` | Fired when authorization is updated |

## Related

- [cardholders.md](./cardholders.md)
- [cards.md](./cards.md)
