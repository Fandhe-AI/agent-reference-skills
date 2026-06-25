# Promotional Offers

Discounted or free trial offers for auto-renewable subscriptions available to eligible existing or former subscribers.

## Signature / Usage

```
POST   /v1/subscriptionPromotionalOffers
GET    /v1/subscriptionPromotionalOffers/{id}
PATCH  /v1/subscriptionPromotionalOffers/{id}
DELETE /v1/subscriptionPromotionalOffers/{id}
```

## Options / Props

### Promotional Offers CRUD

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/subscriptionPromotionalOffers` | Create a promotional offer for a subscription |
| GET | `/v1/subscriptionPromotionalOffers/{id}` | Read promotional offer information |
| PATCH | `/v1/subscriptionPromotionalOffers/{id}` | Modify a promotional offer's prices |
| DELETE | `/v1/subscriptionPromotionalOffers/{id}` | Delete a promotional offer from a subscription |

### Pricing

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptionPromotionalOffers/{id}/prices` | List all promotional offer prices by territory |
| GET | `/v1/subscriptionPromotionalOffers/{id}/relationships/prices` | List promotional offer price IDs |

### Access via Subscription

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/subscriptions/{id}/promotionalOffers` | List all promotional offers for a subscription |
| GET | `/v1/subscriptions/{id}/relationships/promotionalOffers` | List promotional offer IDs for a subscription |

## Notes

- Promotional offers can only be redeemed by customers who are current or lapsed subscribers.
- Use a server-side signature to validate eligibility before displaying an offer in your app.

## Related

- [Subscriptions](./subscriptions.md)
- [Subscription Groups](./subscription-groups.md)
