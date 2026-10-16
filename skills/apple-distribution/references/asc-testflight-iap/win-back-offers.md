# Win-Back Offers

Offers you create for your apps to re-acquire churned subscribers of an auto-renewable subscription. Multiple win-back offers can exist for a single subscription.

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v1/winBackOffers
{
  "data": {
    "type": "winBackOffers",
    "attributes": {
      "referenceName": "6 Months for 3 A",
      "offerId": "6Monthfor3_a",
      "startDate": "2024-07-01",
      "endDate": "2024-07-31",
      "priority": "HIGH",
      "promotionIntent": "USE_AUTO_GENERATED_ASSETS",
      "customerEligibilityPaidSubscriptionDurationInMonths": 6,
      "customerEligibilityTimeSinceLastSubscribedInMonths": {
        "minimum": 2,
        "maximum": 24
      },
      "customerEligibilityWaitBetweenOffersInMonths": 2,
      "duration": "SIX_MONTHS",
      "offerMode": "PAY_UP_FRONT",
      "periodCount": 1
    },
    "relationships": {
      "subscription": { "data": { "type": "subscriptions", "id": "6447497832" } },
      "prices": {
        "data": [
          { "id": "${winbackOfferPrice-0}", "type": "winBackOfferPrices" },
          { "id": "${winbackOfferPrice-1}", "type": "winBackOfferPrices" }
        ]
      }
    }
  },
  "included": [
    {
      "type": "winBackOfferPrices",
      "id": "${winbackOfferPrice-0}",
      "relationships": {
        "subscriptionPricePoint": {
          "data": { "type": "subscriptionPricePoints", "id": "eyJzIjoiNjQ0NzQ5NzgzMiIsInQiOiJVU0EiLCJwIjoiMTAxMjcifQ" }
        }
      }
    },
    {
      "type": "winBackOfferPrices",
      "id": "${winbackOfferPrice-1}",
      "relationships": {
        "subscriptionPricePoint": {
          "data": { "type": "subscriptionPricePoints", "id": "eyJzIjoiNjQ0NzQ5NzgzMiIsInQiOiJDQU4iLCJwIjoiMTAxNDIifQ" }
        }
      }
    }
  ]
}
```

Endpoints:

| Operation | Method / Path |
|-----------|---------------|
| Create a Win-Back Offer | `POST /v1/winBackOffers` |
| Read Win-Back Offer Information | `GET /v1/winBackOffers/{id}` |
| Modify a Win-Back Offer | `PATCH /v1/winBackOffers/{id}` |
| Delete a Win-Back Offer | `DELETE /v1/winBackOffers/{id}` |
| List Win-Back Offers | `GET /v1/subscriptions/{id}/winBackOffers` |
| List win-back offer IDs for a subscription | `GET /v1/subscriptions/{id}/relationships/winBackOffers` |
| List Win-Back Offer Prices | `GET /v1/winBackOffers/{id}/prices` |
| List price IDs for a win-back offer | `GET /v1/winBackOffers/{id}/relationships/prices` |

## Options / Props

`WinBackOffer.Attributes` (relationship: `prices`):

| Name | Type | Description |
|------|------|-------------|
| customerEligibilityPaidSubscriptionDurationInMonths | integer | How long a customer was a subscriber. Possible values are 1 to 24 (months as integers), 36 (3 years), 48 (4 years), and 60 (5 years). |
| customerEligibilityTimeSinceLastSubscribedInMonths | IntegerRange | How long since the subscriber last had an active subscription. |
| customerEligibilityWaitBetweenOffersInMonths | integer | Optional. The minimum time between the end of the customer's subscription and redeeming the same offer again. Possible values are 2 to 24 months. |
| duration | SubscriptionOfferDuration | The length of time for the offer period. |
| endDate | date | Minimum length for a win-back offer is 3 days. |
| offerId | string | Required. Alphanumeric characters, periods, and underscores, up to 100 characters. Must be unique (not used for a promotional offer, offer code, or introductory offer). |
| offerMode | SubscriptionOfferMode | Required. How payment is configured for the offer. |
| periodCount | integer | Required. The number of subscription duration intervals. |
| priority | string (`HIGH`, `NORMAL`) | How the offer ranks among your other offers and in-app events. `HIGH` appears above other offers and events on the product page. |
| promotionIntent | string (`NOT_PROMOTED`, `USE_AUTO_GENERATED_ASSETS`) | Promote the offer on the App Store product page; may display in search results and be featured on the Today, Games, and Apps tabs. |
| referenceName | string | Alphanumeric characters, spaces, periods, and underscores, up to 65 characters. Must be unique across offer types. |
| startDate | date | First available date is today + 1 day. |
| targetSubscriptionPlanType | SubscriptionPlanType | The subscription plan type that this offer applies to. |

## Notes

- Required user role: `ACCOUNT_HOLDER`, `ADMIN`, `APP_MANAGER`, or `MARKETING`.
- The app and subscriptions must be approved before a win-back offer can be created. With App Store promotion, an approved promoted-purchase image is also needed.
- Territories and prices are chosen at creation and cannot be changed afterward; to add territories, create a new win-back offer. Look up price points with `v1/subscriptions/id/pricePoints?include=territory&filter[territory]=CAN`.
- After creation, eligibility parameters, start and end dates, priority, and promotion intent can be updated via PATCH. Once the offer is live, only `priority` can be modified.
- If a live offer has `promotionIntent` of `USE_AUTO_GENERATED_ASSETS`, delete the offer to remove it from promotion.
- Promote by URL: `https://apps.apple.com/win-back/{Offer Apple ID}`, using the numeric `id` from the create or list response.
- Distinct from [Promotional Offers](./promotional-offers.md), which target current or lapsed subscribers through app-side signatures.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/creating-and-configuring-win-back-offers , https://developer.apple.com/documentation/appstoreconnectapi/winbackoffer

## Related

- [Promotional Offers](./promotional-offers.md)
- [Subscriptions](./subscriptions.md)
- [Promoted Purchases](./promoted-purchases.md)
