# figma.payments

Sub-API for gating plugin features behind a payment. Requires `"payments"` in the `permissions` array of `manifest.json`.

## Signature / Usage

```ts
// Check payment status
if (figma.payments.status === 'UNPAID') {
  // Show upsell prompt or initiate checkout
  await figma.payments.initiateCheckoutAsync({ interstitial: 'PAID_FEATURE' });
}

// Generate a backend-verifiable token
const token = await figma.payments.getPluginPaymentTokenAsync();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `status` | `'UNPAID' \| 'PAID' \| 'NOT_SUPPORTED'` (readonly) | User's payment status; `NOT_SUPPORTED` indicates an internal error |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `initiateCheckoutAsync()` | `(options?: { interstitial?: 'PAID_FEATURE' \| 'TRIAL_ENDED' \| 'SKIP' }) => Promise<void>` | Open Figma checkout flow |
| `getUserFirstRanSecondsAgo()` | `() => number` | Seconds since user first ran the plugin (0 on first run / in development) |
| `getPluginPaymentTokenAsync()` | `() => Promise<string>` | Secure token for backend payment verification |
| `requestCheckout()` | `() => void` | Queue checkout for after text review mode exits |
| `setPaymentStatusInDevelopment()` | `(status: PaymentStatus) => void` | Override status during local development only |

## Notes

- `manifest.json` must include `"permissions": ["payments"]`.
- `initiateCheckoutAsync` throws if called during query mode or widget rendering.
- `setPaymentStatusInDevelopment` changes apply globally to all locally-tested plugins and do not persist across client restarts.
- `requestCheckout()` is only for text review plugins.

## Related

- [manifest](./manifest.md)
- [figma global object](./figma-global.md)
