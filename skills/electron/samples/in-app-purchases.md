---
source: https://www.electronjs.org/docs/latest/tutorial/in-app-purchases
---

# In-App Purchases (Mac App Store)

Query products, purchase, and handle transactions with the `inAppPurchase` module in a Mac App Store build.

```js
// Main process
const { inAppPurchase } = require('electron')

const PRODUCT_IDS = ['id1', 'id2']

// Listen for transactions as soon as possible.
inAppPurchase.on('transactions-updated', (event, transactions) => {
  if (!Array.isArray(transactions)) {
    return
  }

  // Check each transaction.
  for (const transaction of transactions) {
    const payment = transaction.payment

    switch (transaction.transactionState) {
      case 'purchasing':
        console.log(`Purchasing ${payment.productIdentifier}...`)
        break

      case 'purchased': {
        console.log(`${payment.productIdentifier} purchased.`)

        // Get the receipt url.
        const receiptURL = inAppPurchase.getReceiptURL()

        console.log(`Receipt URL: ${receiptURL}`)

        // Submit the receipt file to the server and check if it is valid.
        // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
        // ...
        // If the receipt is valid, the product is purchased
        // ...

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      }

      case 'failed':
        console.log(`Failed to purchase ${payment.productIdentifier}.`)

        // Finish the transaction.
        inAppPurchase.finishTransactionByDate(transaction.transactionDate)

        break
      case 'restored':
        console.log(`The purchase of ${payment.productIdentifier} has been restored.`)

        break
      case 'deferred':
        console.log(`The purchase of ${payment.productIdentifier} has been deferred.`)

        break
      default:
        break
    }
  }
})

// Check if the user is allowed to make in-app purchase.
if (!inAppPurchase.canMakePayments()) {
  console.log('The user is not allowed to make in-app purchase.')
}

// Retrieve and display the product descriptions.
inAppPurchase.getProducts(PRODUCT_IDS).then((products) => {
  // Check the parameters.
  if (!Array.isArray(products) || products.length <= 0) {
    console.log('Unable to retrieve the product information.')
    return
  }

  // Display the name and price of each product.
  for (const product of products) {
    console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
  }

  // Ask the user which product they want to purchase.
  const selectedProduct = products[0]
  const selectedQuantity = 1

  // Purchase the selected product.
  inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then((isProductValid) => {
    if (!isProductValid) {
      console.log('The product is not valid.')
      return
    }

    console.log('The payment has been added to the payment queue.')
  })
})
```

## Notes

- Requires the Paid Applications Agreement and in-app purchases configured in App Store Connect (iTunes Connect in the page); replace the example product ids with your own (`com.example.app.product1` has the id `product1`).
- For development testing, change `CFBundleIdentifier` in `node_modules/electron/dist/Electron.app/Contents/Info.plist` from `com.github.electron` to your app's bundle identifier; revert it afterwards, and do this only in a throwaway checkout.
- Listen for `transactions-updated` as early as possible in the app.
- Validate receipts on a server before granting the product.
- Distance: StoreKit-level details and App Store submission are in apple-distribution; Stripe payments are in stripe.
