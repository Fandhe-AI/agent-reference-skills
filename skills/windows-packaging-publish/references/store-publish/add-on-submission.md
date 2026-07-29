# Add-on (In-App Product) Submission

Publishing a supplementary purchasable item (add-on, also called an in-app product or IAP) for an app through its own Partner Center submission, separate from the parent app's submission.

## Signature / Usage

1. From the parent app's page in Partner Center, create a new add-on and choose a **Product type**.
2. Complete the add-on submission checklist: Properties, Pricing and availability, Store listing.
3. Submit for certification; the add-on becomes purchasable once published and enabled in the app's code via the in-app purchase API in the `Windows.Services.Store` namespace.

## Options / Props

| Product type | Behavior |
|---|---|
| Consumable (developer-managed) | Purchased, used, and re-purchased; balance/fulfillment tracked entirely in the developer's own backend |
| Consumable (store-managed) | Balance tracked by Microsoft across a customer's Windows 10 (1607+) devices; parent app must target Windows 10 SDK 14393+; quantity is set on the Properties step |
| Durable | Purchased once; default **Product lifetime** is Forever, or a fixed 1-365 day duration after which it can be repurchased |
| Subscription | Recurring charge at a set interval until the customer cancels; requires Windows 10 SDK 14393+ and the `Windows.Services.Store` API (not `Windows.ApplicationModel.Store`); free trial optional |

## Notes

- Add-ons require an active developer account and must be enabled in the app's code in addition to being published in Partner Center.
- Store-managed consumable and subscription add-ons cannot be submitted to the Store until the parent product has been published, though the add-on submission itself can be created and worked on at any time beforehand.
- Runtime purchase/query of add-ons from app code uses `StoreContext` and `StoreProduct` (Windows.Services.Store).

## Related

- [StoreContext](./store-context.md)
- [StoreProduct](./store-product.md)
- [Create App Submission](./create-app-submission.md)
- [Pricing and Availability](./pricing-and-availability.md)
