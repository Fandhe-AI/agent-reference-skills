# Beta App Review

Endpoints for submitting builds for beta App Review and managing the required contact/demo details.

## Signature / Usage

```
# Submissions
POST /v1/betaAppReviewSubmissions
GET  /v1/betaAppReviewSubmissions
GET  /v1/betaAppReviewSubmissions/{id}
GET  /v1/betaAppReviewSubmissions/{id}/build

# Review detail (contact info / demo credentials)
GET   /v1/betaAppReviewDetails
GET   /v1/betaAppReviewDetails/{id}
PATCH /v1/betaAppReviewDetails/{id}
```

## Options / Props

### Beta App Review Submissions

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/betaAppReviewSubmissions` | Submit a build for beta app review to enable external testing |
| GET | `/v1/betaAppReviewSubmissions` | List beta app review submissions for all builds |
| GET | `/v1/betaAppReviewSubmissions/{id}` | Get a specific beta app review submission |
| GET | `/v1/betaAppReviewSubmissions/{id}/build` | Get build information for a submission |
| GET | `/v1/betaAppReviewSubmissions/{id}/relationships/build` | Get the build ID for a submission |

### Beta App Review Detail

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/betaAppReviewDetails` | List beta app review details for all apps |
| GET | `/v1/betaAppReviewDetails/{id}` | Get beta app review detail for a specific app |
| GET | `/v1/betaAppReviewDetails/{id}/app` | Get the app for a beta app review detail |
| GET | `/v1/betaAppReviewDetails/{id}/relationships/app` | Get the app ID for a beta app review detail |
| PATCH | `/v1/betaAppReviewDetails/{id}` | Update contact info and demo credentials |

## Notes

- `BetaReviewState` values: `WAITING_FOR_REVIEW`, `IN_REVIEW`, `REJECTED`, `APPROVED`.
- `BetaAppReviewDetail` stores demo account credentials and contact details that reviewers use during review.
- Only builds submitted for **external** testing require beta app review.

## Related

- [Builds (Beta)](./builds-beta.md)
- [Beta Build Localizations](./beta-build-localizations.md)
