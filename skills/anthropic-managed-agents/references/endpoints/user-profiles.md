<!-- source: https://platform.claude.com/docs/en/api/beta/user_profiles/create.md, https://platform.claude.com/docs/en/api/beta/user_profiles/list.md, https://platform.claude.com/docs/en/api/beta/user_profiles/retrieve.md, https://platform.claude.com/docs/en/api/beta/user_profiles/update.md, https://platform.claude.com/docs/en/api/beta/user_profiles/create_enrollment_url.md / last verified: 2026-08-07 -->

# User Profiles API

A `user_profile` represents the end-user/company/platform entity behind API usage, used for trust and identity purposes (e.g. trust grant enrollment).

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| POST | `/v1/user_profiles` | Create User Profile |
| GET | `/v1/user_profiles` | List User Profiles (`order`, `limit`, `page`) |
| GET | `/v1/user_profiles/{user_profile_id}` | Get User Profile |
| POST | `/v1/user_profiles/{user_profile_id}` | Update User Profile (merge patch) |
| POST | `/v1/user_profiles/{user_profile_id}/enrollment_url` | Create Enrollment URL |

```http
curl https://api.anthropic.com/v1/user_profiles \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: user-profiles-2026-03-24' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "external_id": "user_12345",
          "metadata": {}
        }'
```

## Options / Props

### Body parameters

| Name | Type | Description | Create | Update |
|------|------|-------------|--------|--------|
| `external_id` | `optional string` (≤255 chars) | Platform's own identifier for this user. Not enforced unique. | Optional | Replaces stored value if present; omit to leave unchanged. |
| `name` | `optional string` (≤255 chars) | Display name. **Required when `relationship` is `resold`** (the resold-to company's name). | Conditionally required | Replaces stored value if present. |
| `relationship` | `optional "external" \| "resold" \| "internal"` | `external`: individual end-user. `resold`: a company the platform resells Claude access to. `internal`: the platform's own usage. | Optional | Optional |
| `metadata` | `optional map[string]` | Max 16 keys (≤64 chars), values ≤512 chars. | Free-form | **Merge patch**: provided keys overwrite; set a key's value to `""` to remove it; keys not provided are left unchanged (differs from Agents/Deployments API's `null`-to-delete convention). |

### List User Profiles query parameters

| Name | Type | Description |
|------|------|-------------|
| `order` | `optional "asc" \| "desc"` | |
| `limit` | `optional number` | |
| `page` | `optional string` | Cursor. |

### Response object `BetaUserProfile`

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | `uprof_` prefix. |
| `type` | `"user_profile"` | |
| `external_id`, `name` | `optional string` | |
| `relationship` | `"external" \| "resold" \| "internal"` | |
| `metadata` | `map[string]` | |
| `trust_grants` | `map[string, {status: "active"\|"pending"\|"rejected"}]` | Keyed by grant name; key omitted when no grant is active or in flight. |
| `created_at`, `updated_at` | `string` (RFC 3339) | |

List endpoint wraps in `{data: array<UserProfile>, next_page}`.

### Response object `BetaUserProfileEnrollmentURL` (Create Enrollment URL)

| Field | Type | Description |
|-------|------|-------------|
| `type` | `"enrollment_url"` | |
| `url` | `string` | Send to the end user; valid until `expires_at`. |
| `expires_at` | `string` (RFC 3339) | |

## Notes

- Beta; requires header `anthropic-beta: user-profiles-2026-03-24` (or a superset) on every request.
- `metadata` update semantics differ from Agents/Deployments: **empty-string value removes a key**, not `null`.
- Create Enrollment URL has no body parameters; it always returns a fresh, time-limited URL for the given profile.

## Related

- [agents.md](./agents.md) — resource unrelated to user_profiles directly, but shares the same beta-header and pagination conventions
- [deployments.md](./deployments.md) — resource unrelated to user_profiles directly, but shares the same beta-header and pagination conventions
