# App Availability and Pre-Orders

Manage the territories and dates in which your app is available (`appAvailabilities` v2, `territoryAvailabilities`), set up pre-orders (`appPreOrders`), and end a pre-order.

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v2/appAvailabilities
GET    https://api.appstoreconnect.apple.com/v2/appAvailabilities/{id}
GET    https://api.appstoreconnect.apple.com/v2/appAvailabilities/{id}/territoryAvailabilities
GET    https://api.appstoreconnect.apple.com/v2/appAvailabilities/{id}/relationships/territoryAvailabilities
PATCH  https://api.appstoreconnect.apple.com/v1/territoryAvailabilities/{id}
POST   https://api.appstoreconnect.apple.com/v1/endAppAvailabilityPreOrders
```

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v2/appAvailabilities` | Create an app pre-order and set the expected app release date (`AppAvailabilityV2CreateRequest`) |
| GET | `/v2/appAvailabilities/{id}` | Read app availability |
| GET | `/v2/appAvailabilities/{id}/territoryAvailabilities` | Read app availability territories |
| GET | `/v2/appAvailabilities/{id}/relationships/territoryAvailabilities` | List territory availability IDs for an app availability |
| PATCH | `/v1/territoryAvailabilities/{id}` | Modify the territory availability for an app pre-order (update the release territories; `TerritoryAvailabilityUpdateRequest`) |
| POST | `/v1/endAppAvailabilityPreOrders` | End the pre-order for your app and release to the store immediately (`EndAppAvailabilityPreOrderCreateRequest`) |

### `AppAvailabilityV2.Attributes` (introduced at 3.0)

| Name | Type | Description |
|------|------|-------------|
| `availableInNewTerritories` | boolean | Availability in new territories (no description in the source) |

### `TerritoryAvailability.Attributes` (introduced at 3.0)

| Name | Type | Description |
|------|------|-------------|
| `available` | boolean | Whether the app is available in the territory |
| `releaseDate` | date | Release date |
| `preOrderEnabled` | boolean | Whether pre-order is enabled |
| `preOrderPublishDate` | date | Pre-order publish date |
| `contentStatuses` | [string] | Content status values for the territory (see below) |

`contentStatuses` values: `AVAILABLE`, `AVAILABLE_FOR_PREORDER_ON_DATE`, `PROCESSING_TO_NOT_AVAILABLE`, `PROCESSING_TO_AVAILABLE`, `PROCESSING_TO_PRE_ORDER`, `AVAILABLE_FOR_SALE_UNRELEASED_APP`, `PREORDER_ON_UNRELEASED_APP`, `AVAILABLE_FOR_PREORDER`, `MISSING_RATING`, `CANNOT_SELL_RESTRICTED_RATING`, `BRAZIL_REQUIRED_TAX_ID`, `BRAZIL_GAMBLING_NOT_VERIFIED`, `MISSING_GRN`, `UNVERIFIED_GRN`, `ICP_NUMBER_INVALID`, `ICP_NUMBER_MISSING`, `TRADER_STATUS_NOT_PROVIDED`, `TRADER_STATUS_VERIFICATION_FAILED`, `TRADER_STATUS_VERIFICATION_STATUS_MISSING`, plus the `CANNOT_SELL_*` family (for example `CANNOT_SELL`, `CANNOT_SELL_CASINO`, `CANNOT_SELL_ADULT_ONLY`, `CANNOT_SELL_FREQUENT_INTENSE_VIOLENCE`); see the official page for the full list.

## Notes

- You cannot push a pre-order live to the App Store using the App Store Connect API. You can only do so in App Store Connect. The API creates the pre-order settings, updates release territories, and can end a pre-order.
- Set up pre-order settings before submitting the app for review; once approved, you can offer it on the App Store as a pre-order.
- Pre-order lets customers see your product page and order your app before its initial release; customers are notified on release and the app downloads automatically.
- For `ICP_NUMBER_INVALID` and `ICP_NUMBER_MISSING`, see the "Availability in China mainland" section of App Store Connect Help (App information).
- The exact JSON bodies of the create, update, and end-pre-order requests are not documented on this page; see the official App Store Connect API pages for the request body schemas.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/app-availability , https://developer.apple.com/documentation/appstoreconnectapi/app-pre-orders

## Related

- [Territories](./territories.md)
- [App Store Version Release Requests](./release-requests.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
