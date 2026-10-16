# Issuing Elements

Stripe.js Elements that display sensitive Issuing card data (number, CVC, expiry, PIN) in Stripe-hosted iframes in a PCI-compliant way, authenticated with ephemeral keys.

## Signature / Usage

Server: exchange a nonce for an ephemeral key (API version `2020-03-02` or later).

```javascript
app.post('/ephemeral-keys', async (request, response) => {
  const { card_id, nonce } = request.body;

  /* Important: Authenticate your user here! */

  const ephemeralKey = await stripe.ephemeralKeys.create({
    nonce: nonce,
    issuing_card: card_id,
  }, {
    apiVersion: '2026-09-30.endive',
  });

  response.json({
    ephemeralKeySecret: ephemeralKey.secret,
  });
});
```

Client:

```javascript
const nonceResult = await stripe.createEphemeralKeyNonce({ issuingCard: cardId });
const nonce = nonceResult.nonce;
// ...POST card_id and nonce to your endpoint, receive ephemeralKeySecret...

// Must be called before creating Issuing Elements
await stripe.retrieveIssuingCard(cardId, { ephemeralKeySecret, nonce });

const number = elements.create('issuingCardNumberDisplay', {
  issuingCard: cardId,
  nonce: nonce,
  ephemeralKeySecret: ephemeralKeySecret,
  style: { base: { color: '#fff', fontSize: '16px' } },
});
number.mount('#card-number');
```

## Options / Props

| Element | Name | Availability |
|---------|------|--------------|
| Number (PAN) | `issuingCardNumberDisplay` | Virtual cards only |
| CVC | `issuingCardCvcDisplay` | Virtual cards only |
| Expiry date | `issuingCardExpiryDisplay` | Any card |
| PIN | `issuingCardPinDisplay` | Any card |
| Copy button | `issuingCardCopyButton` | Any card |
| Add to Wallet Button | `issuingAddToWalletButton` | Any card |

Card display Elements (number, CVC, expiry, PIN):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issuingCard` | string | Yes | ID of the issued card (for example `ic_abc123`) |
| `nonce` | string | Yes | Ephemeral key nonce |
| `ephemeralKeySecret` | string | Yes | `secret` of the ephemeral key |
| `style` | Style object | No | Input-only variants such as `::placeholder` do not apply |

Copy button (`issuingCardCopyButton`):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `toCopy` | `'expiry'` / `'cvc'` / `'number'` / `'pin'` | Yes | Card attribute copied to the clipboard |
| `style` | Style object | No | Styling |

Add to Wallet (`issuingAddToWalletButton`, private preview):

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `issuingCard` | string | Yes | Card ID |
| `nonce` | string | Yes | Ephemeral key nonce |
| `ephemeralKeySecret` | string | Yes | Ephemeral key secret |
| `wallet` | string | Yes | `apple` or `google` |
| `buttonHeight` | number | No | Default 44px; must be between 36px and 55px |

Events: `'click'`, `'success'` (via `button.on(eventName, handler)`). Methods: `.mount()`, `.unmount()`, `.destroy()`, `.update(options)`.

## Notes

- Ephemeral keys expire after 15 minutes; refresh the key and nonce and call `update({...})`.
- Your endpoint must authenticate that the user may see the card; only issue keys to users of that card.
- Connect: pass `Stripe-Account` / `stripeAccount` and initialize Stripe.js with betas `issuing_add_to_wallet_button_element_1` and `issuing_elements_2`. Requires a feature flag from Stripe Support, otherwise ephemeral key creation on behalf of connected accounts fails with authorization errors. With `issuing_elements_2` and Connect, `retrieveIssuingCard` must be called before creating elements, else creation fails with "Issuing card has not been retrieved."
- Sandbox returns all card data for any card type. In live mode, number and CVC are virtual-only by default; for physical cards, request the `allow_retrieve_physical_card_details` feature from Stripe Support and initialize with the `issuing_elements_2` beta.
- `issuingCardPinDisplay` requires two-factor authentication before granting access to the page; Stripe may suspend access if measures are inadequate. Issuing Elements has no integration with the verifications API (unlike the mobile SDKs).
- The returned card object has PCI fields removed from `result.issuingCard`.
- No native support for iOS, Android, or React Native; use a web view pointing to your web integration.
- Add to Wallet: review the Add to Apple Wallet badge guidelines and Google Wallet brand guidelines before embedding.

## Related

- [digital-wallets.md](./digital-wallets.md)
- [cards.md](./cards.md)
