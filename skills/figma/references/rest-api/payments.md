# Payments

Endpoint for fetching payment information for users of plugins, widgets, and Community files. Personal access token only.

## Signature / Usage

```http
GET /v1/payments?plugin_payment_token=<token>
X-Figma-Token: <personal-access-token>
```

## Options / Props

### GET Payments via Plugin Payment Token

`GET /v1/payments` — Fetches payment information using a short-lived plugin payment token.

| Parameter | Type | Description |
|-----------|------|-------------|
| `plugin_payment_token` | String (query) | Short-lived token returned from `getPluginPaymentTokenAsync` |

**Response:** `PaymentInformation` object for the authenticated plugin/widget user  
**Rate Limit:** 300 requests/min  
**Error Codes:** 400 (invalid parameter), 401 (authentication)

---

### GET Payments via User and Resource ID

`GET /v1/payments` — Fetches payment information using explicit user and resource identifiers.

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_id` | Number (query) | User identifier (obtained via OAuth2) |
| `community_file_id` | Number (query) | Community file identifier (mutually exclusive with below) |
| `plugin_id` | Number (query) | Plugin identifier from manifest or Community page |
| `widget_id` | Number (query) | Widget identifier from manifest or Community page |

Exactly one of `community_file_id`, `plugin_id`, or `widget_id` must be provided.

**Response:** `PaymentInformation` object  
**Rate Limit:** Tier 3  
**Error Codes:** 400 (invalid parameter), 401 (authentication)

## Notes

- Personal access token authentication is required; OAuth 2 is not supported
- Primary use case: server-side purchase validation to gate access to paid plugin/widget features
- `plugin_payment_token` and `user_id` variants are mutually exclusive

## Related

- [Authentication](./authentication.md)
- [Personal Access Tokens](./personal-access-tokens.md)
