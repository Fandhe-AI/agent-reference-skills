# Promoted Purchases

Manage the In-App Purchase or auto-renewable subscription that is promoted on an app listing in the App Store, including visibility and ordering.

## Signature / Usage

```
POST   /v1/promotedPurchases
GET    /v1/promotedPurchases/{id}
PATCH  /v1/promotedPurchases/{id}
DELETE /v1/promotedPurchases/{id}
GET    /v1/apps/{id}/promotedPurchases
GET    /v1/apps/{id}/relationships/promotedPurchases
PATCH  /v1/apps/{id}/relationships/promotedPurchases
```

Endpoints:

| Operation | Method / Path | Description |
|-----------|---------------|-------------|
| Promote a purchase | `POST /v1/promotedPurchases` | Add an existing In-App Purchase or auto-renewable subscription to the promoted In-App Purchases on an app listing |
| Read promoted purchase information | `GET /v1/promotedPurchases/{id}` | Get details about a specific promoted In-App Purchase |
| Modify a promoted In-App Purchase | `PATCH /v1/promotedPurchases/{id}` | Update the visibility of a promoted In-App Purchase |
| Remove a promoted purchase | `DELETE /v1/promotedPurchases/{id}` | Remove a promotion from the App Store listing |
| List all promoted purchases for an app | `GET /v1/apps/{id}/promotedPurchases` | List promoted In-App Purchases, including subscriptions, for an app |
| List promoted purchase ids for an app | `GET /v1/apps/{id}/relationships/promotedPurchases` | List resource IDs of promoted purchases |
| Modify the order of a promoted purchase for an app | `PATCH /v1/apps/{id}/relationships/promotedPurchases` | Update the order of promoted purchases (`AppPromotedPurchasesLinkagesRequest`) |

## Options / Props

`PromotedPurchase.Attributes`:

| Name | Type | Description |
|------|------|-------------|
| enabled | boolean | No description in the source |
| state | string (`APPROVED`, `IN_REVIEW`, `PREPARE_FOR_SUBMISSION`, `REJECTED`) | No description in the source |
| visibleForAllUsers | boolean | No description in the source |

`PromotedPurchase.Relationships`:

| Name | Type | Description |
|------|------|-------------|
| inAppPurchaseV2 | PromotedPurchase.Relationships.InAppPurchaseV2 | The promoted In-App Purchase |
| subscription | PromotedPurchase.Relationships.Subscription | The promoted auto-renewable subscription |

## Notes

- Request/response objects: `PromotedPurchaseCreateRequest`, `PromotedPurchaseUpdateRequest`, `PromotedPurchaseResponse`, `PromotedPurchasesResponse`, `AppPromotedPurchasesLinkagesRequest`, `AppPromotedPurchasesLinkagesResponse`.
- The "Promoted Purchase Images" collection (create, commit, and delete images for a promoted In-App Purchase) is a sibling collection under the same Promoted Purchases group; its endpoints are not covered by this page; see the official promoted-purchase-images pages.
- Win-back offers using App Store promotion require an approved promoted-purchase image (see Win-Back Offers).

## Related

- [Win-Back Offers](./win-back-offers.md)
- [In-App Purchases](./in-app-purchases.md)
- [Subscriptions](./subscriptions.md)
