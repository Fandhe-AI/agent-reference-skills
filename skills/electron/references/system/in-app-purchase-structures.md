---
source: https://www.electronjs.org/docs/latest/api/structures/product
---

# In-app purchase structures (Product, Transaction, discounts)

Structures used by `inAppPurchase`: `Product`, `ProductDiscount`, `ProductSubscriptionPeriod`, `PaymentDiscount` and `Transaction`.

## Signature / Usage

```js
const { inAppPurchase } = require('electron')

inAppPurchase.getProducts(['com.example.product']).then((products) => {
  for (const p of products) {
    console.log(p.productIdentifier, p.formattedPrice, p.currencyCode)
  }
})
```

## Product Object

* `productIdentifier` string - The string that identifies the product to the Apple App Store.
* `localizedDescription` string - A description of the product.
* `localizedTitle` string - The name of the product.
* `price` number - The cost of the product in the local currency.
* `formattedPrice` string - The locale formatted price of the product.
* `currencyCode` string - 3 character code presenting a product's currency based on the ISO 4217 standard.
* `introductoryPrice` ProductDiscount (optional) - The object containing introductory price information for the product. available for the product.
* `discounts` ProductDiscount[] - An array of discount offers
* `subscriptionGroupIdentifier` string - The identifier of the subscription group to which the subscription belongs.
* `subscriptionPeriod` ProductSubscriptionPeriod (optional) - The period details for products that are subscriptions.
* `isDownloadable` boolean - A boolean value that indicates whether the App Store has downloadable content for this product. `true` if at least one file has been associated with the product.
* `downloadContentVersion` string - A string that identifies the version of the content.
* `downloadContentLengths` number[] - The total size of the content, in bytes.

## ProductDiscount Object

* `identifier` string - A string used to uniquely identify a discount offer for a product.
* `type` number - The type of discount offer.
* `price` number - The discount price of the product in the local currency.
* `priceLocale` string - The locale used to format the discount price of the product.
* `paymentMode` string - The payment mode for this product discount. Can be `payAsYouGo`, `payUpFront`, or `freeTrial`.
* `numberOfPeriods` number - An integer that indicates the number of periods the product discount is available.
* `subscriptionPeriod` ProductSubscriptionPeriod (optional) - An object that defines the period for the product discount.

## ProductSubscriptionPeriod Object

* `numberOfUnits` number - The number of units per subscription period.
* `unit` string - The increment of time that a subscription period is specified in. Can be `day`, `week`, `month`, `year`.

## PaymentDiscount Object

* `identifier` string - A string used to uniquely identify a discount offer for a product.
* `keyIdentifier` string - A string that identifies the key used to generate the signature.
* `nonce` string - A universally unique ID (UUID) value that you define.
* `signature` string - A UTF-8 string representing the properties of a specific discount offer, cryptographically signed.
* `timestamp` number - The date and time of the signature's creation in milliseconds, formatted in Unix epoch time.

## Transaction Object

* `transactionIdentifier` string - A string that uniquely identifies a successful payment transaction.
* `transactionDate` string - The date the transaction was added to the App Store's payment queue.
* `originalTransactionIdentifier` string - The identifier of the restored transaction by the App Store.
* `transactionState` string - The transaction state, can be `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
* `errorCode` Integer - The error code if an error occurred while processing the transaction.
* `errorMessage` string - The error message if an error occurred while processing the transaction.
* `payment` Object
  * `productIdentifier` string - The identifier of the purchased product.
  * `quantity` Integer - The quantity purchased.
  * `applicationUsername` string - An opaque identifier for the user's account on your system.
  * `paymentDiscount` PaymentDiscount (optional) - The details of the discount offer to apply to the payment.

## Notes

* Structure pages: https://www.electronjs.org/docs/latest/api/structures/product , .../product-discount , .../product-subscription-period , .../payment-discount , .../transaction

## Related

* [inAppPurchase](./in-app-purchase.md)
