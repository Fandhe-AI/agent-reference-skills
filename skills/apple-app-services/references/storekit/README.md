# StoreKit

| Name | Description | Path |
|------|-------------|------|
| AppStore | Namespace for App Store interactions: subscription management, device verification, payment capability checks, transaction sync, and offer code redemption. | [appstore.md](./appstore.md) |
| AppTransaction | Information that represents the customer's purchase of the app, cryptographically signed by the App Store. | [apptransaction.md](./apptransaction.md) |
| Message | An instance for receiving and displaying App Store messages (e.g., billing issue alerts) in your app. | [message.md](./message.md) |
| Product.PromotionInfo | Information about a promoted in-app purchase that customizes its order and visibility on the device. | [product-promotioninfo.md](./product-promotioninfo.md) |
| Product.PurchaseError | Error information for product purchase errors. | [product-purchaseerror.md](./product-purchaseerror.md) |
| Product.PurchaseOption | Optional settings for a product purchase that add account info, offer details, or behavioral flags. | [product-purchaseoption.md](./product-purchaseoption.md) |
| Product.PurchaseResult | The result of a product purchase. | [product-purchaseresult.md](./product-purchaseresult.md) |
| Product.SubscriptionInfo | Information about an auto-renewable subscription: status, period, group, and offer details. | [product-subscriptioninfo.md](./product-subscriptioninfo.md) |
| Product.SubscriptionInfo.RenewalState | The renewal states of auto-renewable subscriptions. | [product-subscriptioninfo-renewalstate.md](./product-subscriptioninfo-renewalstate.md) |
| Product.SubscriptionInfo.Status | Renewal status information for an auto-renewable subscription at a point in time. | [product-subscriptioninfo-status.md](./product-subscriptioninfo-status.md) |
| Product.SubscriptionRelationship | An option set that describes the relationship between a subscription and other subscriptions in the same subscription group, used to filter subscription products. | [product-subscriptionrelationship.md](./product-subscriptionrelationship.md) |
| Product | Information about a product that you configure in App Store Connect. | [product.md](./product.md) |
| StoreView | A SwiftUI view that merchandises a collection of In-App Purchase products with localized names, descriptions, prices, and purchase buttons. | [storeview.md](./storeview.md) |
| SubscriptionStoreView | A SwiftUI view that merchandises auto-renewable subscription options within the same subscription group. | [subscriptionstoreview.md](./subscriptionstoreview.md) |
| Transaction | Information that represents the customer's purchase of a product in your app. | [transaction.md](./transaction.md) |
| Transaction.currentEntitlements | A sequence of the latest transactions that entitle the customer to In-App Purchases and subscriptions. | [transaction-currententitlements.md](./transaction-currententitlements.md) |
| Transaction.updates | An asynchronous sequence that emits transactions created or updated outside the app or on other devices. | [transaction-updates.md](./transaction-updates.md) |
| VerificationResult | A type describing the result of StoreKit's automatic JWS verification. | [verificationresult.md](./verificationresult.md) |
