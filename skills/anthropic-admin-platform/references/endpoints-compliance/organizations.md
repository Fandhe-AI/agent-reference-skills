<!-- source: https://platform.claude.com/docs/en/api/compliance/organizations/list, https://platform.claude.com/docs/en/api/compliance/organizations/roles/list, https://platform.claude.com/docs/en/api/compliance/organizations/roles/retrieve, https://platform.claude.com/docs/en/api/compliance/organizations/roles/permissions/list, https://platform.claude.com/docs/en/api/compliance/organizations/settings/retrieve, https://platform.claude.com/docs/en/api/compliance/organizations/users/list, https://platform.claude.com/docs/en/api/compliance/organizations/security_posture, https://platform.claude.com/docs/en/api/compliance/organizations/security_posture/retrieve, https://platform.claude.com/docs/en/api/compliance/organizations/user_preferences, https://platform.claude.com/docs/en/api/compliance/organizations/user_preferences/list / last verified: 2026-11-14 -->

# Organizations Compliance API

Directory endpoints covering linked organizations, their RBAC roles/permissions, effective settings, and user membership across a Claude Enterprise tenant, plus per-organization security posture results and members' personal preferences (beta).

## Signature / Usage

| Method | Path | Description |
|--------|------|-------------|
| GET | `/v1/compliance/organizations` | List organizations under the parent organization |
| GET | `/v1/compliance/organizations/{org_uuid}/roles` | List Compliance Roles for an organization |
| GET | `/v1/compliance/organizations/{org_uuid}/roles/{role_id}` | Get a single Compliance Role |
| GET | `/v1/compliance/organizations/{org_uuid}/roles/{role_id}/permissions` | List a role's permissions |
| GET | `/v1/compliance/organizations/{organization_id}/settings` | Get effective (enforced) settings for an organization |
| GET | `/v1/compliance/organizations/{org_uuid}/users` | List current user members of an organization |
| GET | `/v1/compliance/organizations/{organization_id}/security_posture` | Get an organization's security controls and their current results |
| GET | `/v1/compliance/organizations/{org_uuid}/user_preferences` | List organization members' personal preferences (beta) |

```bash
curl https://api.anthropic.com/v1/compliance/organizations \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `limit` | query, number | Max results (orgs: default/max 1000; roles/permissions/users: default 500, max 1000) |
| `page` | query, string | Opaque pagination token from `next_page` |
| `org_uuid` / `organization_id` | path, string | Organization UUID |
| `role_id` | path, string | Tagged ID, e.g. `rbac_role_abc123` |
| `x-api-key` | header, string | API key |
| **Returns (org list)** `data[].uuid` / `name` / `created_at` | string | Organization identity, sorted by creation ascending |
| **Returns (role)** `id` / `name` / `description` | string | Role identity |
| `created_at` / `updated_at` | string (ISO 8601) | Timestamps |
| **Returns (permissions)** `data[].action` / `resource_id` / `resource_type` | string | Permission grant on a role |
| **Returns (settings)** `api_keys[]` | array\<object\> | Compliance API keys for the org hierarchy (no secrets): `id`, `created_at`, `created_by_id`, `is_active`, `name`, `scopes[]`, `expires_at` |
| `settings[]` | array\<union\> | Enforced settings: `Boolean` (43+ named flags, e.g. `sso_enabled`, `claude_code_web_enabled`), `Integer` (`account_session_duration_seconds`), `String` (`claude_code_default_worker_environment_id`/`pool_id`), `StringList` (`allowed_invite_domains`, `ip_allowlist_ip_ranges`, `disabled_admin_request_types`), `ProvisioningMode` (`sso_provisioning_mode`), `DataRetention` (`data_retention_periods`, per-data-type `Fixed`/`Indefinite`) |
| **Returns (users)** `data[].id` / `email` / `full_name` | string | User identity |
| `data[].organization_role` | enum | `admin` \| `billing` \| `claude_code_user` \| `developer` \| `managed` \| `membership_admin` \| `owner` \| `primary_owner` \| `user` |
| `has_more` / `next_page` | boolean / string | Pagination |
| `include_unset` | query, boolean (user_preferences) | Default `false`. When true, list every current member with `null` for unset values; by default only members with at least one value set |
| `limit` (user_preferences) | query, number | Default 20, min 1, max 100 |
| `user_ids` | query, array of string (user_preferences) | Restrict to these users, max 10 per request; an entry that is not a current member matches nothing; enumerate IDs via `GET /v1/compliance/organizations/{org_uuid}/users` |
| `anthropic-version` | header, string | Required on security_posture (missing or unavailable value returns 400; any query parameter also returns 400). On user_preferences an omitted header is treated as `2023-06-01`; any other unavailable value, including empty, returns 400 |
| **Returns (security_posture)** `type` / `evaluated_at` / `organization_id` | string | `type` is always `security_posture`; `evaluated_at` (date-time) is when every control was evaluated; `organization_id` is the organization's UUID |
| `comments_status` | enum | `available` \| `not_enabled` \| `not_permitted` \| `requires_organization_key` \| `unavailable` (read an unknown value as `unavailable`) |
| `controls[]` | array\<object\> | Never empty: `id`, `display_name`, `section`, `setting_name` (string or null), `status`, `rating`, `current_value` (string or null), `desired_state` (string or null), `attestation` (object or null) |
| `controls[].rating` | enum | `descriptive` \| `failed` \| `not_attested` \| `passed` (read an unknown value as not passed) |
| `controls[].status` | enum | `attestation_not_enabled` \| `attested_accepted_risk` \| `attested_completed` \| `descriptive` \| `exceeds_baseline` \| `failed` \| `failed_check_accepted_risk` \| `matches_profile` \| `not_applicable` \| `not_attested` \| `not_evaluated` \| `passed` \| `review` (count an unknown value by its `rating`) |
| `controls[].section` | enum | `capabilities` \| `chats_desktop_mdm` \| `claude_code_admin_console` \| `claude_code_managed_settings` \| `connectors_integrations` \| `cowork_admin_console` \| `cowork_desktop_mdm` \| `data_privacy` \| `healthy_adoption` \| `identity_access` (treat an unknown value as a section of its own) |
| `controls[].attestation` | object or null | `attested_at` (date-time), `attested_by` (object or null: `type` always `user_actor`, `user_id` prefixed `user_`), `comment` (string or null, at most 2,000 characters), `state` (`check_passing` \| `in_force` \| `review_due` \| `setting_changed` \| null; read an unknown value as not in effect) |
| **Returns (user_preferences)** `data[]` | array\<object\> | Members oldest-joined first: `conversation_preferences` ("Instructions for Claude", string or null), `cowork_global_instructions` (Cowork "Global instructions", string or null), `user` (`id`, `email_address`); both texts have leading and trailing whitespace removed |

## Notes

- Directory endpoints (organizations/roles/users/groups) return data from every linked organization when the key covers the parent organization.
- Settings endpoint returns the **enforced** state after all policies apply (may differ from admin console configuration); settings the org cannot change are omitted.
- Enumerate `org_uuid` via `GET /v1/compliance/organizations` before calling any per-organization sub-resource (roles, settings, users) or filtering activities/chats/projects by `organization_ids`.

### security_posture

- Controls are evaluated at request time and returned in one `controls` list that is not paginated; a control can have no entry (for example one about a feature the organization cannot have), so a missing control is not a pass.
- Errors: 400 when `anthropic-version` is missing or unavailable, when any query parameter is sent, or when the Compliance API is not enabled for the key's parent organization; 404 when `organization_id` names no organization, one the key cannot read, or one whose security controls are not available; 429 over a rate limit; 503 with `error.details.error_code` `posture_evaluation_failed` (wait for `Retry-After`); 504 means the evaluation did not finish in time and can be retried.
- `attestation` is also returned after it stops being in effect (see `state`). It is `null` when nobody has attested, when attestations of this kind are not enabled, while `status` is `descriptive`, `not_applicable` or `not_evaluated`, and when the stored attestation is of a kind this endpoint does not return, so `null` does not prove nobody attested. `state` is `null` only on a manual control when end dates do not apply to the organization (the attestation is then in effect).
- `rating` `failed` can occur while the Security posture page shows Passed, because of an attestation this endpoint does not return; `passed` includes a control with an accepted risk in effect.
- `attested_by` is `null` when `comments_status` is `not_permitted`, when showing who attested is not enabled for the organization, when the person's account has been deleted, or while Anthropic holds back who attested for every organization. `requires_organization_key` means the key was not created in the organization (for example a parent-organization key); `attested_by` is returned as it is to a key created in the organization, and retrying does not help. `unavailable` can persist, for example when the organization's customer-managed encryption key cannot be used.
- `current_value` and `desired_state` are English display text whose wording can change; the recommended values are those of the standard profile.
- The guide-level behavior (scopes, which attestations are shown, freshness) is in [security-posture-results-reference.md](../compliance-security/security-posture-results-reference.md). This is the Compliance API security-posture feature (not Claude Code security review).

### user_preferences

- Beta endpoint. Returns each member's "Instructions for Claude" and Cowork "Global instructions" text; both are account-level settings, so the same text is returned under every organization the member belongs to.
- A page may hold fewer than `limit` rows, or none at all, without being the last page, because the server bounds the work per request; follow `next_page` until it is `null`.

```bash
curl "https://api.anthropic.com/v1/compliance/organizations/${ORG_UUID}/user_preferences" \
    -H 'anthropic-version: 2026-10-21' \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

- Source: https://platform.claude.com/docs/en/api/compliance/organizations/security_posture/retrieve and https://platform.claude.com/docs/en/api/compliance/organizations/user_preferences/list (retrieved 2026-11-14)

## Related

- [security-posture-results-reference.md](../compliance-security/security-posture-results-reference.md) — guide for the security_posture endpoint
- [groups.md](./groups.md) — RBAC group directory and membership
- [activities.md](./activities.md) — `organization_ids` filter uses the UUIDs listed here
