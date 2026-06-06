# figma.textreview

Sub-API for managing the text review plugin lifecycle. Requires `"textreview"` in the `capabilities` array of `manifest.json`.

## Signature / Usage

```ts
// Request to be enabled as a text review plugin
try {
  await figma.textreview.requestToBeEnabledAsync();
  console.log('Text review enabled');
} catch {
  console.log('User declined');
}

// Check status
if (figma.textreview.isEnabled) {
  // Plugin is active for text review
}

// Disable
await figma.textreview.requestToBeDisabledAsync();
```

## Options / Props

### Properties

| Name | Type | Description |
|------|------|-------------|
| `isEnabled` | `boolean` (readonly) | Whether the plugin is currently enabled as a text review plugin |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| `requestToBeEnabledAsync()` | `() => Promise<void>` | Show a user consent modal; resolves if accepted, rejects if cancelled |
| `requestToBeDisabledAsync()` | `() => Promise<void>` | Disable text review; rejects if the plugin was not enabled |

## Notes

- `manifest.json` must include `"capabilities": ["textreview"]`.
- Multiple cancellations in a single plugin run cause `requestToBeEnabledAsync` to auto-reject to prevent spam.
- `figma.payments.requestCheckout()` is available for gating text review behind payment.

## Related

- [manifest](./manifest.md)
- [figma.payments](./figma-payments.md)
- [figma global object](./figma-global.md)
