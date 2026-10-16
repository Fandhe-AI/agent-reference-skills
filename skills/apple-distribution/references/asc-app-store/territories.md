# Territories

Read-only list of the App Store territories (storefronts) in which apps, subscriptions, and In-App Purchases are offered.

## Signature / Usage

```
GET https://api.appstoreconnect.apple.com/v1/territories?limit=200&fields[territories]=currency
```

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/territories` | List all territories where the App Store operates (200 returns `TerritoriesResponse`) |
| GET | `/v1/endUserLicenseAgreements/{id}/territories` | List all territories to which a custom app license agreement applies |
| GET | `/v1/endUserLicenseAgreements/{id}/relationships/territories` | List territory IDs for an end user license agreement |

### Query parameters — `GET /v1/territories`

| Name | Type | Description |
|------|------|-------------|
| `fields[territories]` | [string] | `currency` |
| `limit` | integer | Number of resources to return, maximum 200 |

### `Territory.Attributes` (introduced at 1.2)

| Name | Type | Description |
|------|------|-------------|
| `currency` | string | Currency of the territory |

## Notes

- `territories` is a read-only resource.
- The `TerritoryCode` type (for example `USA`, `JPN`) is used in places such as the customer review `filter[territory]` parameter.
- Response variants: `TerritoriesResponse`, `TerritoriesWithoutIncludesResponse` (without related resources), `TerritoryResponse` (single territory).

## Related

- [App Availability and Pre-Orders](./app-availability-pre-orders.md)
- [Customer Reviews](./customer-reviews.md)
