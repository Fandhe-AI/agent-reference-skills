# VerificationReport

A VerificationReport is the result of an attempt to collect and verify data from a user. It contains copies of collected data, file references, and the outcome of each verification check performed.

## Signature / Usage

```bash
# Retrieve a VerificationReport
curl https://api.stripe.com/v1/identity/verification_reports/vr_xxx \
  -u "YOUR_SECRET_KEY:"
```

## Options / Props

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/v1/identity/verification_reports/:id` | Retrieve a single VerificationReport |
| `GET` | `/v1/identity/verification_reports` | List all VerificationReports |

### Response object fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the report. |
| `object` | string | Always `"identity.verification_report"`. |
| `created` | integer | Unix timestamp of creation. |
| `livemode` | boolean | `true` for live mode, `false` for test mode. |
| `type` | string | Report type, e.g. `"document"`. |
| `verification_session` | string | ID of the associated VerificationSession. |
| `options` | object | Configuration options used for the session. |
| `document` | object | Results of the document verification check (see below). |
| `id_number` | object | Results of the ID number check (if performed). |
| `selfie` | object | Results of the selfie check (if performed). |

### `document` sub-object fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Check status: `"verified"` or `"unverified"`. |
| `error` | object\|null | Error details if verification failed. |
| `first_name` | string | Extracted first name from document. |
| `last_name` | string | Extracted last name from document. |
| `type` | string | Document type, e.g. `"driving_license"`, `"passport"`, `"id_card"`. |
| `files` | array | File IDs of collected document images (accessible via the Files API). |
| `issuing_country` | string | ISO country code of the issuing country. |
| `issued_date` | object | Date of issue with `month`, `day`, `year` fields. |
| `expiration_date` | object | Expiration date with `month`, `day`, `year` fields. |
| `address` | object | Extracted address with `line1`, `city`, `state`, `zip`, `country`. |

## Notes

- VerificationReports are read-only; they are created automatically by Stripe when a VerificationSession is processed.
- Collected document images are stored as Files and referenced by ID; retrieve them via the Files API.
- The `document`, `id_number`, and `selfie` sub-objects are only present for the checks that were configured on the associated VerificationSession.
- Reports are configured via the VerificationSession `type` and `options` parameters — not directly on the report.

## Related

- [verification-sessions.md](./verification-sessions.md)
