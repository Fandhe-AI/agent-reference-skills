# StoreKit

| Name | Description | Path |
|------|-------------|------|
| Product | In-App Purchase product info from App Store Connect; fetch, display, and purchase | [product.md](./product.md) |
| Product.PurchaseResult | Enum returned by `purchase()`: `.success`, `.userCancelled`, `.pending` | [product-purchaseresult.md](./product-purchaseresult.md) |
| Product.PurchaseOption | Optional settings for purchase calls: account token, quantity, offers, behavior | [product-purchaseoption.md](./product-purchaseoption.md) |
| Transaction | Signed record of a customer purchase; properties, finish, refund | [transaction.md](./transaction.md) |
| Transaction.updates | Async sequence emitting transactions from outside the app or other devices | [transaction-updates.md](./transaction-updates.md) |
| Transaction.currentEntitlements | Async sequence of latest transactions granting current entitlements | [transaction-currententitlements.md](./transaction-currententitlements.md) |
| VerificationResult | Generic enum wrapping JWS-verified or unverified StoreKit values | [verificationresult.md](./verificationresult.md) |
| AppStore | Namespace for sync, canMakePayments, showManageSubscriptions, and more | [appstore.md](./appstore.md) |
| AppTransaction | Cryptographically signed record of the app purchase; originalAppVersion | [apptransaction.md](./apptransaction.md) |
| Message | Receive and control display of App Store messages (e.g., billing alerts) | [message.md](./message.md) |
| Product.SubscriptionInfo | Auto-renewable subscription metadata: status, period, group, offers | [product-subscriptioninfo.md](./product-subscriptioninfo.md) |
| Product.SubscriptionInfo.Status | Snapshot of subscription renewal state, transaction, and renewal info | [product-subscriptioninfo-status.md](./product-subscriptioninfo-status.md) |
| Product.SubscriptionInfo.RenewalState | Subscription states: subscribed, expired, inBillingRetryPeriod, inGracePeriod, revoked | [product-subscriptioninfo-renewalstate.md](./product-subscriptioninfo-renewalstate.md) |
| StoreView | SwiftUI view merchandising a collection of In-App Purchase products | [storeview.md](./storeview.md) |
| SubscriptionStoreView | SwiftUI view merchandising auto-renewable subscription options in a group | [subscriptionstoreview.md](./subscriptionstoreview.md) |
