# StoreProduct

`Windows.Services.Store.StoreProduct` — represents a product (app or add-on) listed in the Microsoft Store, including price, title, and purchasability.

## Signature / Usage

```csharp
StoreContext context = StoreContext.GetDefault();
StoreProduct product = await context.GetStoreProductForCurrentAppAsync();

StorePurchaseResult result = await product.RequestPurchaseAsync();
```

## Options / Props

| Member | Kind | Description |
|---|---|---|
| `Title` | property | Product title from the Store listing |
| `Description` | property | Product description from the Store listing |
| `Price` | property | Price for the product's default SKU/availability |
| `ProductKind` | property | `Application`, `Game`, `Consumable`, `UnmanagedConsumable`, or `Durable` |
| `StoreId` | property | The product's Store ID |
| `Skus` | property | List of `StoreSku` objects available for the product |
| `IsInUserCollection` | property | Whether the current user is entitled to the default SKU |
| `InAppOfferToken` | property | Product ID of the add-on, if this instance represents an add-on |
| `Keywords` | property | Keywords set for the add-on in Partner Center (add-ons only) |
| `RequestPurchaseAsync()` | method | Purchases the default SKU/availability; displays Store purchase UI |
| `RequestPurchaseAsync(StorePurchaseProperties)` | method | Purchase with custom offer details |
| `GetIsAnySkuInstalledAsync()` | method | Whether any SKU (DLC) of the product is installed |

## Notes

- Products are organized as a hierarchy: `StoreProduct` (product) → `StoreSku` (SKU) → `StoreAvailability` (availability/pricing window).
- `RequestPurchaseAsync` must be called on the UI thread and is not supported in elevated applications — same constraint as `StoreContext.RequestPurchaseAsync`.
- Obtained via `StoreContext.GetStoreProductForCurrentAppAsync()` (the app itself) or `GetAssociatedStoreProductsAsync()` / `GetUserCollectionAsync()` (add-ons).

## Related

- [StoreContext](./store-context.md)
