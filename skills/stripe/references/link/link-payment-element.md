# Link in the Payment Element

Link in the Payment Element lets customers check out faster by autofilling saved information for logged-in Link users.

## Signature / Usage

```javascript
const paymentElement = elements.create('payment', {
  defaultValues: {
    billingDetails: {
      email: 'foo@bar.com',
    }
  },
  // Other options
});
```

Prefill more customer information:

```javascript
// Pass in defaultValues to prefill consumer information
const paymentElement = elements.create('payment', {
  defaultValues: {
    billingDetails: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      address: {
        city: 'New York',
        country: 'US',
        line1: '123 Main St',
        postal_code: '10001',
        state: 'NY'
      }
    },
}});
```

## Options / Props

| Integration option | Checkout flow | Description |
|--------------------|---------------|-------------|
| Pass a customer email address to the Payment Element (Recommended) | Customer enters email before checkout, or you prefer your own email field | Pass the email programmatically via `defaultValues.billingDetails`; the customer authenticates to Link directly in the payment form |
| Collect a customer email address in the Payment Element | Customers enter email and authenticate or enroll with Link in the Element; no code change | Unenrolled customers are prompted to save details with Link; enrolled customers are autofilled |

## Notes

- The default Payment Element integration includes a Link prompt in the card form. Manage Link in payment method settings.
- Link's prefill tool detects email, phone, or name on the same checkout page and populates Link sign-up or login fields. It is on by default, needs no integration changes, and can be disabled in Link settings. It does not run if `defaultValues` already provides Stripe customer data.
- Prefilled values are not stored in cookies, local storage, or elsewhere; they are held temporarily in local memory. They are stored only if the customer consents to create a Link account.
- Accelerated sign-up (opting customers into saving payment details to Link by default) is enabled by default and configurable under Settings > Payment Methods > Link, or in Connected Accounts settings. Availability depends on the customer's country; Link disables or limits it where local regulations prohibit it.
- Sandbox Link accounts: use any valid email; one-time passcodes `000001` (code invalid), `000002` (code expired), `000003` (max attempts exceeded) produce errors; any other 6 digits succeed. Do not store real user data in sandbox Link accounts.

## Related

- [Link in Payment Integrations](./link-payment-integrations.md)
- [Link in the Express Checkout Element](./link-express-checkout-element.md)
- [Link with Checkout](./link-checkout.md)
