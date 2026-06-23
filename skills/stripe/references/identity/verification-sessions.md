# VerificationSession

A VerificationSession guides a user through the identity collection and verification process. It tracks the verification type, collected data, and status transitions throughout its lifetime.

## Signature / Usage

```bash
# Create a VerificationSession
curl https://api.stripe.com/v1/identity/verification_sessions \
  -u "YOUR_SECRET_KEY:" \
  -d type=document
```

## Options / Props

### Create parameters

| Name | Type | Description |
|------|------|-------------|
| `type` | enum | Verification check type: `document` or `id_number`. Required if `verification_flow` not provided. |
| `verification_flow` | string | ID of a Dashboard-configured verification flow. Use instead of `type`. |
| `client_reference_id` | string | Reference string to reconcile with internal systems (e.g., customer ID). |
| `metadata` | object | Arbitrary key-value pairs for additional structured information. |
| `return_url` | string | URL to redirect the user to after completing the verification flow. |
| `related_customer` | string | Customer ID to associate with this verification. |
| `provided_details` | object | Pre-filled user details (`email`, `phone`) that may be shown to the user. |
| `options.document.allowed_types` | array | Restrict accepted document types: `driving_license`, `id_card`, `passport`. |
| `options.document.require_id_number` | boolean | Collect ID number and perform an ID number check. |
| `options.document.require_live_capture` | boolean | Require camera capture; disable file uploads. |
| `options.document.require_matching_selfie` | boolean | Capture a face image and perform a selfie check. |

### Session statuses

| Status | Description |
|--------|-------------|
| `created` | Initial state after session creation. |
| `processing` | User submitted information; verification checks are running. |
| `verified` | All checks passed. Access results via `verified_outputs`. |
| `requires_input` | At least one check failed. Details in `last_error`. |
| `canceled` | Session was canceled; further submissions are invalid. |
| `redacted` | PII has been removed from the session. |

### Webhook events

| Event | Trigger |
|-------|---------|
| `identity.verification_session.created` | Session created |
| `identity.verification_session.processing` | Verification checks started |
| `identity.verification_session.verified` | All checks passed |
| `identity.verification_session.requires_input` | One or more checks failed |
| `identity.verification_session.canceled` | Session canceled |
| `identity.verification_session.redacted` | Session redacted |

## Notes

- Create only **one** VerificationSession per verification in your system; reuse the same session (by storing its ID) if the user abandons and restarts.
- On failure, retrieve the session to obtain a new `url` or `client_secret` for retry — do not create a new session.
- `last_error.code` is machine-readable for programmatic handling; `last_error.reason` is human-readable for display to users.
- Sessions can be canceled before reaching `processing` or `verified` status via `POST /v1/identity/verification_sessions/:id/cancel`.
- Redacting a session removes PII and takes up to 4 days; a `identity.verification_session.redacted` webhook fires on completion.

## Related

- [verification-reports.md](./verification-reports.md)
