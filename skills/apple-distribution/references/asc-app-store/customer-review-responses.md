# Customer Review Responses

Get, create, update, and delete your public responses to customer reviews (`customerReviewResponses` resource). Each customer review can have at most one response.

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v1/customerReviewResponses
GET    https://api.appstoreconnect.apple.com/v1/customerReviewResponses/{id}
DELETE https://api.appstoreconnect.apple.com/v1/customerReviewResponses/{id}
GET    https://api.appstoreconnect.apple.com/v1/customerReviews/{id}/response
GET    https://api.appstoreconnect.apple.com/v1/customerReviews/{id}/relationships/response
```

Flow: list reviews with `GET /v1/apps/{id}/customerReviews` (or the app store version variant) to get review resource IDs, then call `POST /v1/customerReviewResponses` with the review's resource ID.

## Options / Props

### Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/customerReviewResponses` | Create or update a response to a customer review (body: `CustomerReviewResponseV1CreateRequest`; 201 returns `CustomerReviewResponseV1Response`) |
| GET | `/v1/customerReviewResponses/{id}` | Read response information, including content and state |
| GET | `/v1/customerReviews/{id}/response` | Get the response to a specific customer review |
| GET | `/v1/customerReviews/{id}/relationships/response` | Get the response ID for a customer review |
| DELETE | `/v1/customerReviewResponses/{id}` | Delete a response, using the response's resource ID |

### `CustomerReviewResponseV1.Attributes`

| Name | Type | Description |
|------|------|-------------|
| `responseBody` | string | Text of the response |
| `lastModifiedDate` | date-time | When the response was last modified |
| `state` | string | `PUBLISHED` or `PENDING_PUBLISH` |

### `CustomerReviewResponseV1.Relationships`

| Name | Description |
|------|-------------|
| `review` | The customer review related to the response |

## Notes

- `POST /v1/customerReviewResponses` creates a response and publishes it in the App Store. If a response already exists, the endpoint updates it by overwriting.
- Responses do not appear in the App Store instantly; allow time for publication (`state` is `PENDING_PUBLISH` until then).
- The `POST` error responses documented: 400, 401, 403, 409 (the provided resource data isn't valid), 422, 429.
- The exact JSON body of `CustomerReviewResponseV1CreateRequest` is not documented on this page; see the official App Store Connect API page for the request body schema.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/customer-review-responses

## Related

- [Customer Reviews](./customer-reviews.md)
