# App Store Review Details and Attachments

Provide the information App Review needs (`appStoreReviewDetails`) and upload supporting files (`appStoreReviewAttachments`). This information is not displayed on the App Store.

## Signature / Usage

```
POST   https://api.appstoreconnect.apple.com/v1/appStoreReviewDetails
GET    https://api.appstoreconnect.apple.com/v1/appStoreReviewDetails/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appStoreReviewDetails/{id}
GET    https://api.appstoreconnect.apple.com/v1/appStoreReviewDetails/{id}/appStoreReviewAttachments
GET    https://api.appstoreconnect.apple.com/v1/appStoreReviewDetails/{id}/relationships/appStoreReviewAttachments

POST   https://api.appstoreconnect.apple.com/v1/appStoreReviewAttachments
GET    https://api.appstoreconnect.apple.com/v1/appStoreReviewAttachments/{id}
PATCH  https://api.appstoreconnect.apple.com/v1/appStoreReviewAttachments/{id}
DELETE https://api.appstoreconnect.apple.com/v1/appStoreReviewAttachments/{id}
```

## Options / Props

### Review detail endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appStoreReviewDetails` | Add review details to an App Store version, including contact and demo account information (`AppStoreReviewDetailCreateRequest`) |
| GET | `/v1/appStoreReviewDetails/{id}` | Read the details you provided: contact information, demo account, and notes |
| PATCH | `/v1/appStoreReviewDetails/{id}` | Update contact information, demo account, and notes (`AppStoreReviewDetailUpdateRequest`) |
| GET | `/v1/appStoreReviewDetails/{id}/relationships/appStoreReviewAttachments` | List attachment IDs |

### `AppStoreReviewDetail.Attributes` (introduced at 1.2)

| Name | Type | Description |
|------|------|-------------|
| `contactFirstName` | string | Contact first name (required for App Review) |
| `contactLastName` | string | Contact last name (required) |
| `contactPhone` | string | Contact phone number (required) |
| `contactEmail` | string | Contact email address (required) |
| `demoAccountRequired` | boolean | Whether testing the app requires a demo account (required) |
| `demoAccountName` | string | Demo account name, if the app uses a single sign-on service |
| `demoAccountPassword` | string | Demo account password, if the app uses a single sign-on service |
| `notes` | string | Optional notes for the review team |

### Attachment endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/appStoreReviewAttachments` | Attach a document for App Review to an App Store version |
| GET | `/v1/appStoreReviewAttachments/{id}` | Read attachment information and its upload and processing status |
| PATCH | `/v1/appStoreReviewAttachments/{id}` | Commit an attachment after uploading |
| DELETE | `/v1/appStoreReviewAttachments/{id}` | Remove an attachment before sending the app to App Review |
| GET | `/v1/appStoreReviewDetails/{id}/appStoreReviewAttachments` | List all attachments included with a version when submitted for App Review |

## Notes

- Use the attachments resource (`appReviewAttachments` in the overview text) to upload app documentation, demo videos, and other items to help prevent delays during review.
- App Clip review information is handled separately (App Clip App Store review details).
- `demoAccountPassword` is a credential; never log or commit it.
- Source: https://developer.apple.com/documentation/appstoreconnectapi/app-store-review-details , https://developer.apple.com/documentation/appstoreconnectapi/app-store-review-attachments

## Related

- [Review Submissions and Items](./review-submissions.md)
- [App Store Versions](../asc-api-core/app-store-versions.md)
- [Uploading Assets](../asc-api-core/uploading-assets.md)
