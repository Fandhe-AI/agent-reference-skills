# Stripe Elements

A set of pre-built, customizable UI components for building payment flows in the browser. Provided as part of Stripe.js, Elements tokenize sensitive payment details client-side so they never pass through your server.

## Signature / Usage

```javascript
// 1. Load Stripe.js
import { loadStripe } from '@stripe/stripe-js';
const stripe = await loadStripe('pk_test_...');

// 2. Create an Elements instance
const elements = stripe.elements({
  clientSecret: 'pi_xxx_secret_xxx',
  appearance: { theme: 'stripe' },
});

// 3. Create and mount the Payment Element
const paymentElement = elements.create('payment');
paymentElement.mount('#payment-element');

// 4. Confirm payment on form submit
const { error } = await stripe.confirmPayment({
  elements,
  confirmParams: { return_url: 'https://example.com/success' },
});
```

## Options / Props

### `Stripe()` constructor

| Name | Type | Description |
|------|------|-------------|
| `publishableKey` | string | **Required.** Your Stripe publishable API key. |
| `options.stripeAccount` | string | Connected account ID for Stripe Connect. |
| `options.locale` | string | Locale for UI strings. Default: `'auto'` (browser-detected). |
| `options.apiVersion` | string | Override your account's Stripe API version. |

### `stripe.elements(options)`

| Name | Type | Description |
|------|------|-------------|
| `clientSecret` | string | Client secret from a PaymentIntent or SetupIntent. Required for Payment Element and Contact Details Element. |
| `appearance` | object | Customize colors, fonts, borders, and spacing via the Appearance API. |
| `locale` | string | Locale for placeholder text and error messages. Default: `'auto'`. |
| `fonts` | array | Custom fonts to use in elements. Accepts `CssFontSource` or `CustomFontSource`. |
| `loader` | string | Show skeleton loader while elements load. `'auto'` (default), `'always'`, or `'never'`. |
| `currency` | string | Three-letter ISO currency code. Filters available payment methods. |
| `customerSessionClientSecret` | string | Client secret from a CustomerSession for saved payment method display. |
| `paymentMethodCreation` | string | Set to `'manual'` to enable `stripe.createPaymentMethod()` with the Payment Element. |
| `syncAddressCheckbox` | string | Configure billing/shipping address sync. `'billing'` (default) or `'none'`. |

### `elements.create(type, options)` — element types

| Type | Description |
|------|-------------|
| `'payment'` | Accepts cards and 100+ payment methods. Core element for most integrations. |
| `'expressCheckout'` | One-click wallet buttons: Apple Pay, Google Pay, PayPal, Link. |
| `'address'` | Collects billing or shipping address with autocomplete. |
| `'contactDetails'` | Collects email; enables Link authentication and auto-fill. |
| `'paymentMethodMessaging'` | Displays available installment/BNPL options to customers. |
| `'currencySelector'` | Lets customers choose their local currency (Checkout Sessions API only). |
| `'taxId'` | Collects business tax IDs for invoices and VAT refunds. |

### Payment Element options

| Name | Type | Description |
|------|------|-------------|
| `layout` | object | `{ type: 'accordion' \| 'tabs', defaultCollapsed, radios, visibleAccordionItemsCount }` |
| `defaultValues` | object | Pre-fill billing details: `{ billingDetails: { name, email, phone, address } }` |
| `fields` | object | Control which fields are collected: `{ billingDetails: 'never' \| object }` |
| `paymentMethodOrder` | array | Custom ordering of payment methods. Unspecified methods appear after. |
| `readOnly` | boolean | Disable all user input. Does not change visual appearance. |
| `terms` | object | Control when mandate/terms text is displayed per payment method. |
| `wallets` | object | Show or hide wallet buttons: `{ applePay: 'auto' \| 'never', googlePay: 'auto' \| 'never' }` |
| `business` | object | `{ name: string }` — displayed in payment method terms. |

### Address Element options

| Name | Type | Description |
|------|------|-------------|
| `mode` | string | **Required.** `'billing'` or `'shipping'`. |
| `allowedCountries` | array | ISO 3166-1 alpha-2 country codes to restrict address input. |
| `autocomplete` | object | `{ mode: 'automatic' \| 'disabled' \| 'google_maps_api', apiKey? }` |
| `defaultValues` | object | Pre-fill name, phone, and address fields. |
| `fields` | object | `{ phone: 'auto' \| 'always' }` |
| `display` | object | `{ name: 'full' \| 'split' \| 'organization' }` |
| `blockPoBox` | boolean | Reject P.O. box addresses. |

### Element instance methods

| Method | Description |
|--------|-------------|
| `element.mount(selector)` | Mount element into a DOM node. |
| `element.unmount()` | Unmount element from the DOM (preserves state). |
| `element.destroy()` | Permanently destroy the element. |
| `element.update(options)` | Update element options after creation. |
| `element.focus()` | Programmatically focus the element. |
| `element.blur()` | Remove focus from the element. |
| `element.clear()` | Clear the element's value. |
| `element.getValue()` | Return the current value (Address Element and Tax ID Element only). |
| `element.collapse()` | Collapse the Payment Element to its payment method selection view. |
| `element.on(event, handler)` | Subscribe to element events. |

### Element events

| Event | Elements | Description |
|-------|----------|-------------|
| `'change'` | all | Fired when the value changes. |
| `'ready'` | all | Fired when element is rendered and ready for user interaction. |
| `'focus'` | all | Fired when element gains focus. |
| `'blur'` | all | Fired when element loses focus. |
| `'escape'` | all | Fired when Escape key is pressed inside the element. |
| `'loaderror'` | all | Fired when the element fails to load. |
| `'confirm'` | expressCheckout | Fired when the customer finalizes a wallet payment. |
| `'cancel'` | expressCheckout | Fired when the customer dismisses the wallet payment sheet. |
| `'shippingaddresschange'` | expressCheckout | Fired when the shipping address changes in the wallet sheet. |
| `'availablepaymentmethodschange'` | payment, expressCheckout | Fired when available payment methods change. |

## Notes

- Load Stripe.js via `@stripe/stripe-js` npm package or `https://js.stripe.com/v3/` script tag; never self-host it.
- Create a single `Stripe` instance per publishable key — multiple instances may cause performance issues.
- If you disable field collection with the `fields` option, pass the omitted data in `stripe.confirmPayment()` `confirmParams.payment_method_data`; omitting it will cause payment rejection.
- For Checkout Sessions with `ui_mode: 'elements'`, use `stripe.initCheckoutElementsSdk({ clientSecret })` instead of `stripe.elements()`.
- Appearance API supports `theme` values: `'stripe'`, `'night'`, `'flat'`, `'none'`.
- For RTL languages (Arabic, Hebrew), wrap mounted elements in an HTML element with `dir="rtl"`.
- `stripe.confirmPayment()` redirects by default; pass `redirect: 'if_required'` to avoid redirects for payment methods that don't require them.

## Related

- [Checkout Sessions](./checkout-sessions.md)
- [Payment Links](./payment-links.md)
