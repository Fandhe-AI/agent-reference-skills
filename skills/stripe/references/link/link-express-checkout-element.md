# Link in the Express Checkout Element

Let customers check out faster with Link through the Express Checkout Element's one-click payment method buttons.

## Signature / Usage

```js
const appearance = { /* appearance */ }
const options = { /* options */ }
const elements = stripe.elements({
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  appearance,
})
const expressCheckoutElement = elements.create('expressCheckout', options)
expressCheckoutElement.mount('#express-checkout-element')
```

## Notes

- Supported payment methods in the Express Checkout Element include Link, Apple Pay, Google Pay, PayPal, Klarna, and Amazon Pay.
- Benefits: payment buttons are dynamically sorted by customer location; buttons can be added without frontend changes; an existing Elements instance can be reused.

## Related

- [Link in the Payment Element](./link-payment-element.md)
- [Link in Payment Integrations](./link-payment-integrations.md)
- [Link with Checkout](./link-checkout.md)
