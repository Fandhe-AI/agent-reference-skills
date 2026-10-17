---
source: https://www.electronjs.org/docs/latest/api/in-app-purchase
---

# inAppPurchase (Mac App Store)

In-app purchases on Mac App Store. Process: Main.

## Signature / Usage

The original page has no code example; this usage only combines the documented events and methods below.

```js
const { inAppPurchase } = require('electron')

// Listen before calling purchaseProduct.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  console.log(transactions)
})

inAppPurchase.getProducts(['com.example.product']).then((products) => {
  console.log(products)
})
```

### Events

#### Event: 'transactions-updated'

* `event` Event
* `transactions` Transaction[] - Array of `Transaction` objects.

Emitted when one or more transactions have been updated.

### Methods

#### `inAppPurchase.purchaseProduct(productID[, opts])`

* `productID` string
* `opts` Integer | Object (optional) - If specified as an integer, defines the quantity.
  * `quantity` Integer (optional) - The number of items the user wants to purchase.
  * `username` string (optional) - The string that associates the transaction with a user account on your service (applicationUsername).

Returns `Promise<boolean>` - Returns `true` if the product is valid and added to the payment queue.

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

#### `inAppPurchase.getProducts(productIDs)`

* `productIDs` string[] - The identifiers of the products to get.

Returns `Promise<Product[]>` - Resolves with an array of `Product` objects.

Retrieves the product descriptions.

#### `inAppPurchase.canMakePayments()`

Returns `boolean` - whether a user can make a payment.

#### `inAppPurchase.restoreCompletedTransactions()`

Restores finished transactions. This method can be called either to install purchases on additional devices, or to restore purchases for an application that the user deleted and reinstalled.

The payment queue (SKPaymentQueue) delivers a new transaction for each previously completed transaction that can be restored. Each transaction includes a copy of the original transaction.

#### `inAppPurchase.getReceiptURL()`

Returns `string` - the path to the receipt.

#### `inAppPurchase.finishAllTransactions()`

Completes all pending transactions.

#### `inAppPurchase.finishTransactionByDate(date)`

* `date` string - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.

## Notes

* `purchaseProduct` and `getProducts` return Promises instead of using callbacks (past breaking change; see the breaking-changes category). The `username` option of `purchaseProduct` was added in a later release.
* Distinction: StoreKit-based purchases for Mac App Store builds of Electron apps. Native StoreKit and App Store distribution are covered by apple-distribution; web payments by stripe.

## Related

* [In-app purchase structures](./in-app-purchase-structures.md)
