<!-- source: https://platform.claude.com/docs/en/api/beta/user_profiles/create, https://platform.claude.com/docs/en/api/beta/user_profiles/list, https://platform.claude.com/docs/en/api/beta/user_profiles/retrieve, https://platform.claude.com/docs/en/api/beta/user_profiles/update, https://platform.claude.com/docs/en/api/beta/user_profiles/delete, https://platform.claude.com/docs/en/api/beta/user_profiles/create_enrollment_url, https://platform.claude.com/docs/en/api/beta/user_profiles/action_urls/create / last verified: 2026-11-14 -->

# User Profiles API (beta)

Create, list, retrieve, update and delete user profiles (records of end-users or reselled companies that a platform serves through the API), and create enrollment / action URLs for a profile. These endpoints live under `/v1/user_profiles` (not `/v1/organizations`). A profile `id` (prefixed `uprof_`) is sent in the `anthropic-user-profile-id` header to attribute Messages, Message Batches or token counting requests.

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/user_profiles` | List User Profiles |
| POST | `/v1/user_profiles` | Create User Profile |
| GET | `/v1/user_profiles/{user_profile_id}` | Retrieve User Profile |
| POST | `/v1/user_profiles/{user_profile_id}` | Update User Profile |
| DELETE | `/v1/user_profiles/{user_profile_id}` | Delete User Profile |
| POST | `/v1/user_profiles/{user_profile_id}/enrollment_url` | Create Enrollment URL |
| POST | `/v1/user_profiles/{user_profile_id}/action_urls` | Create Action URL |

Adapted (not in the official docs): the `anthropic-beta: user-profiles-2026-08-18` header is removed from this create example, because under that legacy header `external_user_details` is not accepted; the legacy `external_id` / `external_user_onboarded_at` fields are removed from the response below for the same reason.

```bash
curl https://api.anthropic.com/v1/user_profiles \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2026-10-21' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
    -d '{
          "external_user_details": {
            "account_status": "active",
            "country": "US",
            "entity_type": "business",
            "onboarded_at": "2024-11-02T08:15:00Z",
            "reference_id": "user_12345"
          },
          "metadata": {},
          "name": "Example User"
        }'
```

Response (200):

```json
{
  "id": "uprof_011CZkZCu8hGbp5mYRQgUmz9",
  "created_at": "2026-03-15T10:00:00Z",
  "metadata": {},
  "name": "Example User",
  "trust_grants": {
    "cyber": {
      "status": "active"
    }
  },
  "type": "user_profile",
  "updated_at": "2026-03-15T10:00:00Z",
  "access_type": "application",
  "external_user_details": {
    "account_status": "active",
    "country": "US",
    "email_hash": null,
    "entity_type": "business",
    "name_hash": null,
    "onboarded_at": "2024-11-02T08:15:00Z",
    "reference_id": "user_12345"
  }
}
```

Create Action URL:

```bash
curl "https://api.anthropic.com/v1/user_profiles/${USER_PROFILE_ID}/action_urls" \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2026-10-21' \
    -H 'anthropic-beta: user-profiles-2026-08-18' \
    -H "Authorization: Bearer $ANTHROPIC_API_KEY" \
    -d '{
          "action": {
            "type": "enroll_end_user"
          }
        }'
```

Response (200):

```json
{
  "expires_at": "2026-03-15T10:15:00Z",
  "type": "user_profile_action_url",
  "url": "https://platform.claude.com/user-profiles/enrollment/M3J0bGJxZ2ppMnptbnB1"
}
```

## Options / Props

### Headers (all endpoints)

| Name | Type | Description |
|------|------|-------------|
| anthropic-version | optional string | Claude API version |
| anthropic-beta | optional array of AnthropicBeta | Beta version(s). User profile values: `user-profiles-2026-03-24`, `user-profiles-2026-08-18`, `user-profiles-2026-09-04` |
| anthropic-workspace-id | optional string | Selects the Workspace (for example `wrkspc_011CZkZaBF1tNoB5wlCeusgy`); only needed for credentials that can act on more than one Workspace; if sent for a Workspace-scoped credential it must match |

### List query parameters

| Name | Type | Description |
|------|------|-------------|
| limit | optional number (int32) | 1 to 100, default 20 |
| order | optional `"asc"` \| `"desc"` | Sort direction for the `order_by` field, default `desc` |
| order_by | optional `"created_at"` \| `"name"` | Sort field, default `created_at`; `name` ignores ASCII letter case and profiles without a name come last in either direction |
| page | optional string | Cursor from `next_page` of a previous response; omit for the first page |

List response: `data` (array of user profile) and `next_page` (string or null).

### Create / Update body parameters

| Name | Type | Description |
|------|------|-------------|
| access_type | optional `"application"` \| `"passthrough"` (update also accepts null) | `application` (default): an individual end-user; `passthrough`: a company the platform resells Claude access to. On update, replaces the stored value; omit to leave unchanged |
| name | optional string or null, 1 to 255 chars | Real-world name of the entity; for `passthrough` the company's name where known. On update replaces the stored name |
| metadata | optional map[string] | Max 16 keys, keys up to 64 chars, values up to 512 chars, values non-empty strings on create. On update: merged; keys provided overwrite, an empty string removes a key, other keys unchanged |
| external_user_details | optional object | Details as the platform states them; see below. On update each field sent replaces the stored value; once set a value cannot be cleared and `null` is rejected |
| external_id | optional string or null, 1 to 255 chars | Legacy; accepted only under `user-profiles-2026-03-24` and `user-profiles-2026-08-18`; otherwise send `external_user_details.reference_id` |
| external_user_onboarded_at | optional string (date-time) | Legacy; accepted only under `user-profiles-2026-08-18`; otherwise send `external_user_details.onboarded_at` |

`external_user_details` fields (all optional; not accepted under the legacy `user-profiles-2026-03-24` and `user-profiles-2026-08-18` headers):

| Name | Type | Description |
|------|------|-------------|
| account_status | `"active"` \| `"suspended"` \| `"blocked"` \| null | Status of the entity's account on the platform |
| country | string or null, pattern `^[A-Z]{2}$` | Country of the entity (not the platform), ISO 3166-1 alpha-2 upper case; only the form is checked |
| email_hash | string or null, 1 to 255 chars | Platform-computed hash of the email; opaque to Anthropic |
| entity_type | `"individual"` \| `"business"` \| `"non_profit"` \| `"government"` \| null | Kind of entity |
| name_hash | string or null, 1 to 255 chars | Platform-computed hash of the name; opaque to Anthropic |
| onboarded_at | string (date-time) | RFC 3339; complete timestamp no more than 1 minute in the future |
| reference_id | string or null, 1 to 255 chars | Platform's own reference; not interpreted, not enforced unique |

### User profile object (response)

| Name | Type | Description |
|------|------|-------------|
| type | `"user_profile"` | Object type |
| id | string | Prefixed `uprof_` |
| created_at | string (date-time) | RFC 3339 |
| updated_at | string (date-time) | Last modified; read the status itself rather than watching this timestamp for approvals |
| name | string or null | `null` until supplied |
| metadata | map[string] | Max 16 pairs, keys up to 64 chars, values up to 512 chars |
| trust_grants | map of `{ status: "active" \| "pending" \| "rejected" }` | Keyed by grant name; key omitted when no grant is active or in flight |
| access_type | optional `"application"` \| `"passthrough"` | Absent under legacy `user-profiles-2026-03-24` |
| external_user_details | optional object | Every field present, `null` until supplied (fields as above); absent under the legacy headers |
| external_id | optional string or null | Legacy (`user-profiles-2026-03-24` / `user-profiles-2026-08-18`) |
| external_user_onboarded_at | optional string or null | Legacy (`user-profiles-2026-08-18`) |

### Other response objects

| Endpoint | Object | Fields |
|----------|--------|--------|
| Delete | `BetaDeletedUserProfile` | `type`: `"user_profile_deleted"`, `id`: string prefixed `uprof_` |
| Create Enrollment URL | `BetaUserProfileEnrollmentURL` | `type`: `"enrollment_url"`, `expires_at` (date-time), `url` (string, valid until `expires_at`) |
| Create Action URL | `BetaUserProfileActionURL` | `type`: `"user_profile_action_url"`, `expires_at` (date-time), `url` (string; anyone who holds it can open it until `expires_at`) |

Create Action URL body: `action` (required) = `{ "type": "enroll_end_user" }` (`BetaUserProfileEnrollEndUserAction`: the end-user the profile represents enrolls in a program). Path parameter `user_profile_id` (`uprof_...`) on retrieve, update, delete, enrollment_url and action_urls. Retrieve, Delete and Create Enrollment URL take no body.

## Notes

- Beta: these pages are under `/docs/en/api/beta/user_profiles/`. The official examples send `anthropic-beta: user-profiles-2026-08-18` and `Authorization: Bearer $ANTHROPIC_API_KEY`; the guide examples (see the admin-api user-profiles guide) use `x-api-key` and no `anthropic-beta` header.
- Under the legacy `user-profiles-2026-03-24` / `user-profiles-2026-08-18` headers the response carries top-level `external_id` (and `external_user_onboarded_at` under `2026-08-18`) instead of `external_user_details`; without a legacy header the values live in `external_user_details.reference_id` / `.onboarded_at`.
- The guide documents `programs` (keys `cyber`, `efs`) and `enforcement_status` / `enforcement_actions` fields on profiles; these beta reference pages show `trust_grants` and do not list the enforcement fields. Treat the guide as authoritative for the non-beta-header shape.
- Adapted from the official docs: the official create example sends `anthropic-beta: user-profiles-2026-08-18` together with `external_user_details` (and shows legacy `external_id` in the response), which contradicts the field table of the same page; the example here drops the beta header and the legacy response fields.
- Create Enrollment URL (`/enrollment_url`) is the Claude Platform on AWS variant (guide: send `anthropic-beta: user-profiles-2026-08-18`, no body); `/action_urls` is the Claude API variant.
- Source: https://platform.claude.com/docs/en/api/beta/user_profiles/create and sibling pages listed above (retrieved 2026-11-14)

## Related

- [organizations.md](./organizations.md)
