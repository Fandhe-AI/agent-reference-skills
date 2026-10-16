# Digital Wallets with Issuing

Add Issuing cards to digital wallets (Apple Pay, Google Pay, Samsung Pay) via manual provisioning or push provisioning. This page covers the Web push provisioning flow.

## Signature / Usage

```javascript
import {loadStripe} from '@stripe/stripe-js';

const stripe = await loadStripe('<<YOUR_PUBLISHABLE_KEY>>', {
  betas: [
    'issuing_add_to_wallet_button_element_1',
    'issuing_elements_2',
  ],
});
const elements = stripe.elements();

const button = elements.create('issuingAddToWalletButton', {
  issuingCard: cardId,
  nonce,
  ephemeralKeySecret,
  wallet: 'apple', // Use 'google' for the Google Wallet button.
  buttonHeight: 50,
});

button.on('success', () => {
  // The cardholder completed the wallet provider's flow.
});

button.mount('#add-to-wallet-button');
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `issuingCard` | string | Card ID |
| `nonce` | string | Created with `stripe.createEphemeralKeyNonce({issuingCard})` |
| `ephemeralKeySecret` | string | Secret of the Issuing Card ephemeral key (expires after 15 minutes) |
| `wallet` | string | `apple` or `google` |
| `buttonHeight` | number | Pixels |

## Notes

- Digital wallet tokens are live mode only; no sandbox testing. Testing requires live-use-case approval and real cards.
- Provisioning methods: manual (cardholder enters card details in the wallet app) and push (add-to-wallet button in your app or website).
- Manual provisioning: Stripe sends a 6-digit code to the cardholder `phone_number` or `email`; a `card not supported` error appears if neither is set. Works for virtual and physical cards; no code needed.
- US and CA: Apple Pay requires Apple approval (check digital wallets settings in the Dashboard; approval can take 1-2 weeks). Google Pay and Samsung Pay need no extra steps. US-issued stablecoin programs follow the US process.
- EU and UK: digital wallet integrations need additional approval from the Stripe partnership team; Apple Pay needs extra approval.
- Push provisioning requires manual provisioning approval first (US), plus an integration per wallet platform (direct or Stripe SDK). Platform approvals cascade to connected accounts. Samsung Pay push provisioning is not supported with the Stripe SDKs.
- Web push provisioning: live mode only, active physical and virtual cards. The Add to Wallet Element is in private preview (beta flags above). Stripe.js loader 7.7.0 or later is required; if you already use Elements without the beta flags, create a separate Stripe instance. For connected accounts, also pass `stripeAccount`.
- Backend: create an authenticated endpoint that takes card ID and nonce and creates an Issuing Card ephemeral key (on behalf of the connected account for Connect). Verify the requester is authorized for the card; never expose secret keys in browser code.
- If the page stays open 15 minutes, create a new nonce and ephemeral key and call `button.update({nonce, ephemeralKeySecret})`.
- Common reasons a card is not added: outdated OS, JavaScript or pop-ups disabled, device unreachable, card already on the device, flow took too long, tokenization failure (inactive card, ineligible device, wallet terms not accepted).
- Network tokens are managed separately from cards (see Token Management in the Stripe docs).

## Related

- [issuing-elements.md](./issuing-elements.md)
- [physical-cards.md](./physical-cards.md)
- [cards.md](./cards.md)
