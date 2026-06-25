# Subscriptions

Create and manage auto-renewable subscriptions within subscription groups.

## Signature / Usage

```
POST   /v1/subscriptions
GET    /v1/subscriptions/{id}
PATCH  /v1/subscriptions/{id}
DELETE /v1/subscriptions/{id}
```

## Options / Props

### Core CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/subscriptions` | Create an auto-renewable subscription |
| GET | `/v1/subscriptions/{id}` | Read subscription information |
| PATCH | `/v1/subscriptions/{id}` | Modify an auto-renewable subscription |
| DELETE | `/v1/subscriptions/{id}` | Delete a subscription |

### Localizations

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptions/{id}/subscriptionLocalizations` | List all localizations |
| GET | `/v1/subscriptions/{id}/relationships/subscriptionLocalizations` | List localization IDs |

### Pricing

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptions/{id}/pricePoints` | List all price points for a subscription |
| GET | `/v1/subscriptions/{id}/prices` | List all prices for a subscription |
| DELETE | `/v1/subscriptions/{id}/relationships/prices` | Delete prices from a subscription |

### Offers

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptions/{id}/introductoryOffers` | List all introductory offers |
| DELETE | `/v1/subscriptions/{id}/relationships/introductoryOffers` | Delete an introductory offer |
| GET | `/v1/subscriptions/{id}/promotionalOffers` | List all promotional offers |
| GET | `/v1/subscriptions/{id}/offerCodes` | List all offer codes |
| GET | `/v1/subscriptions/{id}/winBackOffers` | List win-back offers |

### Availability & Marketing

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptions/{id}/planAvailabilities` | List plan availabilities |
| GET | `/v1/subscriptions/{id}/promotedPurchase` | Read promoted purchase information |
| GET | `/v1/subscriptions/{id}/appStoreReviewScreenshot` | Read review screenshot information |

## Notes

- Subscriptions must belong to a subscription group (`subscriptionGroup` relationship required on create).
- `subscriptionAvailability` relationship is deprecated; use `planAvailabilities` instead.

## Related

- [Subscription Groups](./subscription-groups.md)
- [Promotional Offers](./promotional-offers.md)
