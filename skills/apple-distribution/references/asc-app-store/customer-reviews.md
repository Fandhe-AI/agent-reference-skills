# Customer Reviews

Read the ratings and reviews customers write for your app on the App Store (`customerReviews` resource), plus AI-generated review summarizations per territory.

## Signature / Usage

```
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/customerReviews
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/relationships/customerReviews
GET https://api.appstoreconnect.apple.com/v1/appStoreVersions/{id}/customerReviews
GET https://api.appstoreconnect.apple.com/v1/customerReviews/{id}
GET https://api.appstoreconnect.apple.com/v1/apps/{id}/customerReviewSummarizations
```

Example (limit the number of reviews returned):

```
https://api.appstoreconnect.apple.com/v1/apps/682658836/customerReviews?limit=1
```

```json
{
  "data": [
    {
      "type": "customerReviews",
      "id": "00000028-b08c-0014-729e-fbd500000000",
      "attributes": {
        "rating": 5,
        "title": "Awesome!!!",
        "body": "It's a really fantastic app!",
        "reviewerNickname": "Anne Johnson",
        "createdDate": "2017-11-15T08:10:34-08:00",
        "territory": "USA"
      },
      "relationships": {
        "response": {
          "links": {
            "self": "https://api.appstoreconnect.apple.com/v1/customerReviews/00000028-b08c-0014-729e-fbd500000000/relationships/response",
            "related": "https://api.appstoreconnect.apple.com/v1/customerReviews/00000028-b08c-0014-729e-fbd500000000/response"
          }
        }
      },
      "links": {
        "self": "https://api.appstoreconnect.apple.com/v1/customerReviews/00000028-b08c-0014-729e-fbd500000000"
      }
    }
  ],
  "links": {
    "self": "https://api.appstoreconnect.apple.com/v1/apps/682658836/customerReviews?limit=1",
    "next": "https://api.appstoreconnect.apple.com/v1/apps/682658836/customerReviews?cursor=AQ.AMt2C-U&limit=1"
  },
  "meta": {
    "paging": {
      "total": 4326,
      "limit": 1
    }
  }
}
```

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/apps/{id}/customerReviews` | List all customer reviews for an app |
| GET | `/v1/apps/{id}/relationships/customerReviews` | List customer review IDs for an app |
| GET | `/v1/appStoreVersions/{id}/customerReviews` | List all customer reviews for an app store version |
| GET | `/v1/customerReviews/{id}` | Read customer review information, including the review content |
| GET | `/v1/apps/{id}/customerReviewSummarizations` | Read customer review summarizations for an app |

### Query parameters — `GET /v1/apps/{id}/customerReviews`

Path parameter `id` (required): the `apps` resource ID, obtained from `GET /v1/apps`.

| Name | Type | Description |
|------|------|-------------|
| `fields[customerReviews]` | [string] | `rating`, `title`, `body`, `reviewerNickname`, `createdDate`, `territory`, `response`, `reviewTerritory` |
| `fields[customerReviewResponses]` | [string] | `responseBody`, `lastModifiedDate`, `state`, `review` |
| `fields[territories]` | [string] | `currency` |
| `filter[rating]` | [string] | Array of ratings to filter by, e.g. `1,2,5`. Minimum 1, maximum 5 |
| `filter[territory]` | [string] | Territory codes to include (three-letter codes such as `USA`, `JPN`, `GBR`) |
| `filter[reviewTerritory]` | [string] | Filter by review territory |
| `exists[publishedResponse]` | boolean | `true` returns reviews that already have a published response; `false` returns reviews without a published response. A review can have a response that is not yet published |
| `include` | [string] | `response`, `reviewTerritory` |
| `sort` | [string] | `rating`, `-rating`, `createdDate`, `-createdDate`. One sort parameter at a time |
| `limit` | integer | Number of resources to return, maximum 200 |

### Query parameters — `GET /v1/apps/{id}/customerReviewSummarizations`

| Name | Type | Description |
|------|------|-------------|
| `filter[platform]` | [string] | Required. `IOS`, `MAC_OS`, `TV_OS`, `VISION_OS` |
| `filter[territory]` | [string] | Territories to include |
| `fields[customerReviewSummarizations]` | [string] | `createdDate`, `locale`, `platform`, `text`, `territory` |
| `fields[territories]` | [string] | `currency` |
| `include` | [string] | `territory` |
| `limit` | integer | Maximum 200 |

### `CustomerReview.Attributes`

| Name | Type | Description |
|------|------|-------------|
| `rating` | integer | Rating the customer provided (1 to 5) |
| `title` | string | Title the customer wrote |
| `body` | string | Review text |
| `reviewerNickname` | string | Customer nickname used in the review |
| `createdDate` | date-time | When the review was created |
| `territory` | TerritoryCode | App Store territory |

### `CustomerReviewSummarization.Attributes`

| Name | Type | Description |
|------|------|-------------|
| `createdDate` | date-time | Creation date (no description in the source) |
| `locale` | string | Locale (no description in the source) |
| `platform` | Platform | Apple platform string |
| `text` | string | Summary text (no description in the source) |

## Notes

- `CustomerReview` is available since API version 2.0. `CustomerReviewSummarization` is an AI-generated summary of reviews for an app in a specific territory, introduced at 3.6; its list endpoint is documented as introduced at 4.0.
- Responses to reviews are managed with the `customerReviewResponses` resource (see customer-review-responses.md); `GET /v1/customerReviews/{id}/response` reads the response for a review.
- Reviews can be written in the App Store or when your app requests a review.

## Related

- [Customer Review Responses](./customer-review-responses.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
- [Territories](./territories.md)
