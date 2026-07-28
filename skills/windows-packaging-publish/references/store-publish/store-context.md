# StoreContext

`Windows.Services.Store.StoreContext` — the main entry point for in-app purchases, license checks, and package management via the Microsoft Store, from within a running app.

## Signature / Usage

```csharp
// Single-user apps (most UWP apps)
Windows.Services.Store.StoreContext context = StoreContext.GetDefault();

// Multi-user apps
var users = await Windows.System.User.FindAllAsync();
Windows.Services.Store.StoreContext context = StoreContext.GetForUser(users[0]);

// Check the current app's license (including add-on licenses)
StoreAppLicense appLicense = await context.GetAppLicenseAsync();

// Purchase an add-on/product by Store ID
StorePurchaseResult result = await context.RequestPurchaseAsync(storeId);
```

## Options / Props

| Member | Kind | Description |
|---|---|---|
| `GetDefault()` | static method | `StoreContext` for the current user in a single-user app |
| `GetForUser(User)` | static method | `StoreContext` for a specific user in a multi-user app |
| `GetAppLicenseAsync()` | method | Returns `StoreAppLicense` — license info for the app and its add-ons (used to detect trial state, ownership) |
| `RequestPurchaseAsync(string productStoreId)` | method | Displays Store purchase UI for the given app/add-on Store ID; returns `StorePurchaseResult` |
| `RequestPurchaseAsync(string, StorePurchaseProperties)` | method | Same as above with extra offer details (custom display name, etc.) for large catalogs |
| `GetStoreProductForCurrentAppAsync()` | method | Returns `StoreProduct` listing info for the current app itself |
| `GetAssociatedStoreProductsAsync(IEnumerable<string> productKinds)` | method | Returns `StoreProduct` listing info for purchasable add-ons |
| `GetUserCollectionAsync(IEnumerable<string> productKinds)` | method | Returns add-ons the current user already owns |
| `ReportConsumableFulfillmentAsync(...)` | method | Reports a consumable add-on as fulfilled/granted to the user |
| `OfflineLicensesChanged` | event | Raised when app/add-on license status changes (trial expiry, purchase completion) |

## Notes

- Introduced in Windows 10 version 1607 (`Windows.Services.Store.StoreContract`); for earlier targets, use the legacy `Windows.ApplicationModel.Store` namespace instead (with `CurrentApp`, not the test-only `CurrentAppSimulator`).
- `RequestPurchaseAsync` and other UI-displaying methods must be called on the UI thread, and are **not supported in elevated (admin) applications**.
- In a desktop (non-UWP-shell) app, the `StoreContext` object must be associated with its owner window handle before any UI-displaying method is called.
- Distinct from `Windows.ApplicationModel.Store` (the deprecated pre-1607 in-app purchase API) — do not mix the two namespaces in new code.

## Related

- [StoreProduct](./store-product.md)
- [Resolve Submission Errors](./resolve-submission-errors.md)
