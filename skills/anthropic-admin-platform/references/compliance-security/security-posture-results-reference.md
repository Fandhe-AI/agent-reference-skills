<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/results-reference / last verified: 2026-11-14 -->

# Security posture results reference

The Compliance API endpoint `GET /v1/compliance/organizations/{organization_id}/security_posture` returns an entry for most of an organization's security controls, evaluated at request time. Covers the request, response fields, `status` and `rating` values, attestation states, errors and freshness.

## Signature / Usage

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/91012d09-e48b-438e-a489-1bebfd8fa6f9/security_posture" \
  -H "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  -H "anthropic-version: 2026-10-21"
```

## Options / Props

Request rules:

| Item | Rule |
| --- | --- |
| `organization_id` | `uuid` of a linked organization from List organizations; any other value returns 404 |
| Key | parent-organization key can name any linked organization; a single-organization key only its own; scope `read:compliance_org_data` or `read:org_audit` |
| `anthropic-version` | required; missing returns 400 |
| Query parameters | none; any query parameter returns 400. Not paginated |

Top-level response fields (all always present, `null` when no value; times have no or six fractional digits):

| Field | Type | Description |
| --- | --- | --- |
| `type` | string | Always `security_posture` |
| `organization_id` | string | Organization UUID |
| `evaluated_at` | string (RFC 3339, UTC) | Time every control was evaluated |
| `comments_status` | string | `not_permitted`, `requires_organization_key`, `available`, `not_enabled`, `unavailable` (read an unknown one as `unavailable`) |
| `controls` | array | Never empty |

`controls[]` fields:

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Control identifier, same for every organization, never changes |
| `display_name` | string | English display text; wording can change |
| `section` | string | One of `identity_access`, `data_privacy`, `capabilities`, `connectors_integrations`, `chats_desktop_mdm`, `cowork_admin_console`, `cowork_desktop_mdm`, `claude_code_admin_console`, `claude_code_managed_settings`, `healthy_adoption`; more can be added, treat an unknown one as its own section |
| `setting_name` | string or null | The `name` of the effective-settings entry the control reads; `null` when none; two controls can share one |
| `status` | string | Reason for the result (table below) |
| `rating` | string | Result, follows from `status` |
| `current_value` | string or null | English display text, can change; `null` on a manual control or when no value was read |
| `desired_state` | string or null | Recommended value, `null` when none for this organization |
| `attestation` | object or null | See next table |

`attestation` fields:

| Field | Type | Description |
| --- | --- | --- |
| `state` | string | Whether in effect (states below) |
| `attested_at` | string (RFC 3339, UTC) | When the attestation was made |
| `comment` | string or null | At most 2,000 characters |
| `attested_by` | object or null | `type` always `user_actor`, `user_id` starts with `user_` |

| `status` | Kind | Meaning | `rating` | On the page |
| --- | --- | --- | --- | --- |
| `passed` | automatic | current value meets the recommended value | `passed` | Passed |
| `matches_profile` | automatic | current value equals the recommended value | `passed` | Passed |
| `exceeds_baseline` | automatic | current value is stricter than recommended | `passed` | Passed |
| `failed_check_accepted_risk` | automatic | check fails and an accepted risk is in effect | `passed` | Passed |
| `failed` | automatic or manual | value does not meet recommended, or an attestation the response leaves out gives this result | `failed` | Failed, or Passed with a Completed attestation in effect |
| `review` | automatic | current value is looser than recommended | `failed` | Failed |
| `attested_completed` | manual | Completed attestation in effect | `passed` | Passed |
| `attested_accepted_risk` | manual | Accepted risk attestation in effect | `passed` | Passed |
| `not_attested` | manual | no attestation in effect | `not_attested` | Not attested |
| `attestation_not_enabled` | manual | nobody can attest to the control | `not_attested` | Descriptive |
| `descriptive` | information-only | reported, not rated | `descriptive` | Descriptive |
| `not_applicable` | any | control does not apply to the organization | `descriptive` | Descriptive |
| `not_evaluated` | any | the setting, or another setting deciding applicability, could not be read | `descriptive` | Descriptive |

| `state` | Meaning |
| --- | --- |
| `in_force` | attestation in effect |
| `review_due` | end date has come |
| `setting_changed` | check fails on a value other than the accepted one, or accepted risk already recorded as ended |
| `check_passing` | check passes, so no risk to accept |
| `null` | only on a manual control, and only when end dates do not apply to the organization; the attestation is then in effect |

| `comments_status` | Meaning |
| --- | --- |
| `not_permitted` | key holds neither `read:compliance_user_data` nor `read:org_audit`; every `comment` and `attested_by` is `null` |
| `requires_organization_key` | key not created in the organization (e.g. parent key); every `comment` is `null`; retrying does not help |
| `available` | comments were read; `null` means none or saved moments ago |
| `not_enabled` | endpoint does not return comments for the organization; every `comment` `null` |
| `unavailable` | comments could not be read; later request might succeed |

Errors:

| Status / `error.type` | When |
| --- | --- |
| 400 `invalid_request_error` | version missing/invalid, Compliance API not enabled for parent, or a query parameter |
| 401 `authentication_error` | key missing, unrecognized, or not a Compliance Access Key or Admin API key |
| 403 `permission_error` | key lacks both `read:compliance_org_data` and `read:org_audit` |
| 404 `not_found_error` | non-UUID/unknown/deleted organization; parent or other-parent organization; not Claude Enterprise or Security posture unavailable; page turned off; endpoint does not serve it; availability check failed. All 404 bodies identical |
| 429 `rate_limit_error` | shared Compliance API limit or this endpoint's lower limit; wait for `retry-after` |
| 503 `overloaded_error` with `error.details.error_code` `posture_evaluation_failed` | result could not be produced; wait `retry-after`, retry; contact support once if it recurs |
| 503 without `error_code`, or 504 `timeout_error` | temporary; retry with exponential backoff |

## Notes

- A `null` `attestation` does not prove nobody attested. The response shows: Completed and Accepted risk attestations on manual controls; Accepted risk attestations on automatic controls whose check failed (on an automatic control whose check passed, an Accepted risk attestation is `null` while the check passes on the accepted value); and, while an attestation is not in effect, one whose value an earlier row shows (with a `state` other than `in_force`). It never shows Failed (`control_failed`) attestations, Completed attestations on automatic controls, or any attestation on information-only controls. Every attestation shown on an automatic control is an accepted risk.
- Counting by `rating`: `passed` includes accepted risks in effect (look for `failed_check_accepted_risk` and `attested_accepted_risk`); `failed` includes controls attested Failed and failing automatic checks with a Completed attestation (page shows Passed); `descriptive` can hide `not_evaluated`; a control missing from the response is not Passed and is not named, so compare `id` values with ones seen before. Count unknown `status` by its `rating`; read unknown `rating` as not Passed and unknown `state` as not in effect, but `state: null` as in effect (see the `null` row of the state table). The `review` status is unrelated to the `review_due` state.
- `attested_by` is filled only for `read:compliance_user_data` together with `read:compliance_org_data`, or `read:org_audit`; `read:compliance_user_data` alone gets 403. Its `user_id` equals the feed activity's `actor.user_id`; names and emails come from List organization users. The endpoint returns no comments: every `comment` is `null`, and `comments_status` is `not_enabled` or `not_permitted` in that case.
- When several state reasons apply the response gives the first of `check_passing`, `setting_changed`, `review_due`. From 00:00 UTC on its end date an attestation is not in effect; the response has no end date, so `state` decides.
- Freshness: every control is evaluated per call (`evaluated_at`); changes from the last few minutes might not show; results can change with no setting changed; a rewording of a current value ends an accepted risk on it; a call stores nothing and ends no attestation. A request with a parent or single-organization key on Claude Enterprise records one `compliance_api_accessed` activity (`url` names the organization read; `organization_uuid` is `null` for a parent key).
- This is the Compliance API security-posture feature (not Claude Code security review).
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/results-reference (retrieved 2026-11-14)

## Related

- [security-posture.md](./security-posture.md)
- [security-posture-check-events-against-results.md](./security-posture-check-events-against-results.md)
- [security-posture-events-reference.md](./security-posture-events-reference.md)
- [security-posture-send-events.md](./security-posture-send-events.md)
