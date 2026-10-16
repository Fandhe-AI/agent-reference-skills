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
| GET | `/v1/subscriptions/{id}/subscriptionLocalizations` | List all localizations (deprecated) |
| GET | `/v1/subscriptions/{id}/relationships/subscriptionLocalizations` | List localization IDs (deprecated) |

### Versions (4.4.1)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/subscriptionVersions` | Create a draft version of an auto-renewable subscription |
| GET | `/v1/subscriptionVersions/{id}` | Get information about a specific draft version |
| GET | `/v1/subscriptionVersions/{id}/image` | Get the review image attached to a draft version |
| GET | `/v1/subscriptionVersions/{id}/images` | List the review images attached to a draft version |
| GET | `/v1/subscriptionVersions/{id}/localizations` | List the localized display names and descriptions captured in a draft version |
| GET | `/v1/subscriptions/{id}/versions` | List the draft versions of an auto-renewable subscription |

### Multi-seat Attributes (4.5)

| Attribute | Type | Values | Description |
|-----------|------|--------|-------------|
| `marketSettings` | [string] | `APPLE_SCHOOL`, `APP_STORE`, `APPLE_BUSINESS` | The markets in which the subscription is available for multi-seat purchase |
| `multiSeatStatus` | string | `ENABLED`, `DISABLED` | The status that indicates whether the subscription supports multiple seats for organizations. Turning on Family Sharing for the subscription automatically sets this value to `DISABLED` |

| Value | Attribute | Meaning |
|-------|-----------|---------|
| `ENABLED` | `multiSeatStatus` | An organization can purchase the subscription in quantities greater than one. This is the default for every auto-renewable subscription |
| `DISABLED` | `multiSeatStatus` | Restricts the subscription to single-seat (quantity of one) purchases. New multi-seat purchases stop, and Apple Business Manager and Apple School Manager no longer offer the SKU. Existing multi-seat subscribers keep renewing at their current seat count but can't add seats |
| `APP_STORE` | `marketSettings` | Directly on the App Store |
| `APPLE_BUSINESS` | `marketSettings` | Through Apple Business Manager (enterprise organizations) |
| `APPLE_SCHOOL` | `marketSettings` | Through Apple School Manager (education institutions) |

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

- Draft versions (4.4.1) of an auto-renewable subscription capture its localized metadata and review images for App Review submission.
- `marketSettings` and `multiSeatStatus` (4.5) are attributes on the `Subscription` resource, set with `PATCH /v1/subscriptions/{id}`. Both apply only to auto-renewable subscriptions; updating them on any other in-app purchase type returns an error.
- Family Sharing (4.5): turning on Family Sharing for a subscription automatically sets `multiSeatStatus` to `DISABLED`. If you turn multi-seat purchasing back on for a family-shareable subscription, Family Sharing only applies when a single seat is purchased.
- `marketSettings` only has an effect while `multiSeatStatus` is `ENABLED`; if it is `DISABLED`, the subscription isn't available for multi-seat purchase in any market, regardless of which values you set.
- API keys with read-only roles can read both multi-seat attributes; updating them requires specific user roles (see the official "Configuring multi-seat subscriptions for organizations" article).
- Subscriptions must belong to a subscription group (`subscriptionGroup` relationship required on create).
- `subscriptionAvailability` relationship is deprecated; use `planAvailabilities` instead. The `GET /v1/subscriptions/{id}/subscriptionAvailability` and `GET /v1/subscriptions/{id}/relationships/subscriptionAvailability` endpoints are marked deprecated.
- The v1 localization list endpoints (`subscriptionLocalizations`, `relationships/subscriptionLocalizations`) are deprecated in 4.4.1; use `GET /v1/subscriptionVersions/{id}/localizations`.
- The `subscription-and-subscription-group-submissions` resources (`POST /v1/subscriptionSubmissions`, `POST /v1/subscriptionGroupSubmissions`) are deprecated and replaced by `review-submissions` (4.4.1).

## Related

- [Subscription Groups](./subscription-groups.md)
- [Promotional Offers](./promotional-offers.md)
