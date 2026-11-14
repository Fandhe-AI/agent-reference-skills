# Retention Messaging

Messages (and optional discounted retention offers) shown to people who start to cancel an auto-renewable subscription, managed through the `retentionMessages`, `retentionMessageVersions`, `retentionMessageLocalizations`, and `retentionOffers` resources (App Store Connect API 4.6).

## Signature / Usage

Create a message (`referenceName` up to 64 characters; not shown to people) (`POST https://api.appstoreconnect.apple.com/v1/retentionMessages`):

```json
{
  "data": {
    "type": "retentionMessages",
    "attributes": {
      "referenceName": "exa-winter-stay-with-us"
    },
    "relationships": {
      "app": {
        "data": {
          "type": "apps",
          "id": "6446671421"
        }
      }
    }
  }
}
```

Create a version of the message (the optional `placement` relationship shows an image from the app asset library; omit it for a text-only message) (`POST https://api.appstoreconnect.apple.com/v1/retentionMessageVersions`):

```json
{
  "data": {
    "type": "retentionMessageVersions",
    "relationships": {
      "retentionMessage": {
        "data": {
          "type": "retentionMessages",
          "id": "9137205548"
        }
      },
      "placement": {
        "data": {
          "type": "appAssetLibraryPlacements",
          "id": "c3a1f0e2-6b7d-4e55-9a0c-2f4d8b1e7a90"
        }
      }
    }
  }
}
```

Add localized text (`header` up to 66 characters, `body` up to 144 characters) (`POST https://api.appstoreconnect.apple.com/v1/retentionMessageLocalizations`):

```json
{
  "data": {
    "type": "retentionMessageLocalizations",
    "attributes": {
      "locale": "en-US",
      "header": "Your cortado is waiting",
      "body": "Stay subscribed and keep your daily cortado coming."
    },
    "relationships": {
      "retentionMessageVersion": {
        "data": {
          "type": "retentionMessageVersions",
          "id": "4820193376"
        }
      }
    }
  }
}
```

Create a retention offer with its prices (each included price needs only the `subscriptionPricePoint` relationship) (`POST https://api.appstoreconnect.apple.com/v1/retentionOffers`):

```json
{
  "data": {
    "type": "retentionOffers",
    "attributes": {
      "referenceName": "exa-winter-one-month-offer",
      "offerId": "exa_winter_one_month",
      "duration": "ONE_MONTH",
      "offerMode": "PAY_UP_FRONT",
      "periodCount": 1,
      "customerEligibilityPaidSubscriptionDurationInMonths": 3,
      "customerEligibilityWaitBetweenOffersInMonths": 6,
      "targetSubscriptionPlanType": "UPFRONT"
    },
    "relationships": {
      "subscription": {
        "data": {
          "type": "subscriptions",
          "id": "6446671421"
        }
      },
      "prices": {
        "data": [
          {
            "type": "retentionOfferPrices",
            "id": "${price1}"
          }
        ]
      }
    }
  },
  "included": [
    {
      "type": "retentionOfferPrices",
      "id": "${price1}",
      "relationships": {
        "subscriptionPricePoint": {
          "data": {
            "type": "subscriptionPricePoints",
            "id": "eyJzIjoiNjQ0NjY3MTQyMSIsInQiOiJVU0EiLCJwIjoiMTAwMDEifQ"
          }
        }
      }
    }
  ]
}
```

Assign the message to a subscription (returns `204` with no body; replaces the subscription's existing message) (`PATCH https://api.appstoreconnect.apple.com/v1/subscriptions/{id}/relationships/retentionMessage`):

```json
{
  "data": {
    "type": "retentionMessages",
    "id": "9137205548"
  }
}
```

Choose which offers are presented with the message (`POST https://api.appstoreconnect.apple.com/v1/subscriptions/{id}/relationships/retentionMessageOffers`):

```json
{
  "data": [
    {
      "type": "retentionOffers",
      "id": "7710428835"
    }
  ]
}
```

Submit the version for App Review as a review submission item (`POST https://api.appstoreconnect.apple.com/v1/reviewSubmissionItems`):

```json
{
  "data": {
    "type": "reviewSubmissionItems",
    "relationships": {
      "reviewSubmission": {
        "data": {
          "type": "reviewSubmissions",
          "id": "e1d9a3c4-0f52-4b8a-bb71-5c3a9d2e6f08"
        }
      },
      "retentionMessageVersion": {
        "data": {
          "type": "retentionMessageVersions",
          "id": "4820193376"
        }
      }
    }
  }
}
```

## Options / Props

### Endpoints

| Resource | Method | Path | Purpose |
|----------|--------|------|---------|
| Retention messages | POST | `/v1/retentionMessages` | Create a retention message |
| Retention messages | DELETE | `/v1/retentionMessages/{id}` | Delete a retention message |
| Retention messages | GET | `/v1/retentionMessages/{id}`, `/v1/retentionMessages/{id}/versions`, `/v1/retentionMessages/{id}/subscriptions`, `/v1/apps/{id}/retentionMessages` | Read a message, its versions, its subscriptions, or an app's messages |
| Retention messages | GET / PATCH | `/v1/subscriptions/{id}/retentionMessage`, `/v1/subscriptions/{id}/relationships/retentionMessage` | Read / replace the message assigned to a subscription |
| Versions | POST | `/v1/retentionMessageVersions` | Create a version |
| Versions | GET | `/v1/retentionMessageVersions/{id}`, `/v1/retentionMessageVersions/{id}/localizations`, `/v1/retentionMessageVersions/{id}/placement` | Read a version (including `state`), its localizations, its image placement |
| Localizations | GET / POST / PATCH / DELETE | `/v1/retentionMessageLocalizations`, `/v1/retentionMessageLocalizations/{id}` | Read, create, update `header` / `body`, delete |
| Offers | POST / PATCH / DELETE | `/v1/retentionOffers`, `/v1/retentionOffers/{id}` | Create, update eligibility rules, delete |
| Offers | GET | `/v1/retentionOffers/{id}`, `/v1/retentionOffers/{id}/prices`, `/v1/subscriptions/{id}/retentionOffers` | Read an offer, its prices, a subscription's offers |
| Message offers | GET / POST / DELETE | `/v1/subscriptions/{id}/retentionMessageOffers`, `/v1/subscriptions/{id}/relationships/retentionMessageOffers` | Read / add / remove the offers presented with a subscription's message |

### Retention offer attributes

| Attribute | Required | Accepted values |
|-----------|----------|-----------------|
| `referenceName` | Yes | Free text |
| `offerId` | Yes | Identifies the offer in StoreKit |
| `duration` | Yes | `THREE_DAYS`, `ONE_WEEK`, `TWO_WEEKS`, `ONE_MONTH`, `TWO_MONTHS`, `THREE_MONTHS`, `SIX_MONTHS`, `ONE_YEAR` |
| `offerMode` | Yes | `PAY_AS_YOU_GO`, `PAY_UP_FRONT`, `FREE_TRIAL` |
| `periodCount` | Yes | Required by the API; see the official page |
| `customerEligibilityPaidSubscriptionDurationInMonths` | Yes | Minimum months of paid subscription: 1 to 24, 36, 48, 60 |
| `customerEligibilityWaitBetweenOffersInMonths` | No | Wait before redeeming another retention offer for the same subscription: 2 to 24 |
| `targetSubscriptionPlanType` | No | Plan type after the offer ends: `MONTHLY`, `UPFRONT` |

### Retention message version states

`PREPARE_FOR_SUBMISSION`, `READY_FOR_REVIEW`, `WAITING_FOR_REVIEW`, `IN_REVIEW`, `ACCEPTED` or `REJECTED`, then `APPROVED`; `DEVELOPER_REJECTED` if the version is withdrawn from review.

## Notes

- Limits: an app can have at most 10 retention messages; a subscription has at most one retention message; a subscription can have at most 10 active retention offers for each `targetSubscriptionPlanType`.
- A message's `referenceName` cannot be changed after creation. A localization's `locale` cannot be changed; only `header` and `body` can be updated.
- A version cannot be modified or deleted after creation, and localizations cannot be added to an `APPROVED` version; create a new version to change approved content. A new version starts in `PREPARE_FOR_SUBMISSION`.
- For a retention offer, only the eligibility attributes can be changed after creation (`PATCH /v1/retentionOffers/{id}`). Creating an offer does not present it; add it to the subscription's retention message offers.
- Offer prices are subscription prices: find price points with `GET /v1/subscriptions/{id}/pricePoints`, and add one `retentionOfferPrices` resource per territory in the top-level `included` array (local IDs in the form `${local-id}`; no territory is specified).
- All retention messages go through App Review before people can see them. Follow a version with `GET /v1/retentionMessageVersions/{id}` and its `state` attribute.
- Placement images use the App Asset Library; the `RETENTION_MESSAGE_ASSET` placement type is listed in the Placements page.
- Scope: this page covers the App Store Connect API resources (configuration). Choosing the message and offer in real time from your server is the separate Retention Messaging API (https://developer.apple.com/documentation/retentionmessaging), which is not mirrored here.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/setting-up-retention-messaging (fetched 2026-11-14; API 4.6), https://developer.apple.com/documentation/appstoreconnectapi/retention-messages , https://developer.apple.com/documentation/appstoreconnectapi/retention-message-versions , https://developer.apple.com/documentation/appstoreconnectapi/retention-message-localizations , https://developer.apple.com/documentation/appstoreconnectapi/retention-offers , https://developer.apple.com/documentation/appstoreconnectapi/app-store-connect-api-4-6-release-notes

## Related

- [Subscriptions](./subscriptions.md)
- [Promotional Offers](./promotional-offers.md)
- [Win-Back Offers](./win-back-offers.md)
- [App Price Points](./app-price-points.md)
