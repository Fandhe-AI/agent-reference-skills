<!-- source: https://platform.claude.com/docs/en/manage-claude/user-profiles / last verified: 2026-11-14 -->

# User Profiles for End-Customer Attribution

User profiles ("profiles") tell Anthropic which of your end customers each API request is for, so a safety enforcement action (a restriction or a ban) can apply to one end customer instead of your whole organization. You register each end customer once with `POST /v1/user_profiles`, store the returned `uprof_` ID, and send it in the `anthropic-user-profile-id` header on every request made on that end customer's behalf. Profiles don't change billing or pricing.

## Signature / Usage

Create a profile (a company reselled through a gateway, so `access_type` is `passthrough`):

```bash
curl https://api.anthropic.com/v1/user_profiles \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "content-type: application/json" \
  -d '{
    "name": "Acme Analytics, Inc.",
    "access_type": "passthrough",
    "external_user_details": {
      "reference_id": "cust-8f2a1c",
      "country": "US"
    }
  }'
```

Response:

```json
{
  "type": "user_profile",
  "id": "uprof_011CZkZCu8hGbp5mYRQgUmz9",
  "name": "Acme Analytics, Inc.",
  "access_type": "passthrough",
  "external_user_details": {
    "reference_id": "cust-8f2a1c",
    "onboarded_at": null,
    "account_status": null,
    "entity_type": null,
    "country": "US",
    "name_hash": null,
    "email_hash": null
  },
  "metadata": {},
  "programs": {
    "cyber": null,
    "efs": null
  },
  "created_at": "2026-03-15T10:00:00Z",
  "updated_at": "2026-03-15T10:00:00Z"
}
```

Attribute a request:

```bash
curl https://api.anthropic.com/v1/messages \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "anthropic-user-profile-id: $PROFILE_ID" \
  -H "content-type: application/json" \
  -d '{
    "model": "claude-opus-5-5",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude"}
    ]
  }'
```

Update (changes only the fields sent; `metadata` merges, empty string deletes a key):

```bash
curl "https://api.anthropic.com/v1/user_profiles/$PROFILE_ID" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "content-type: application/json" \
  -d '{
    "external_user_details": {"account_status": "suspended"},
    "metadata": {"trial_cohort": ""}
  }'
```

Delete:

```bash
curl -X DELETE "https://api.anthropic.com/v1/user_profiles/$PROFILE_ID" \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21"
```

Enforcement fields on a retrieved profile (other fields left out):

```json
{
  "type": "user_profile",
  "id": "uprof_011CZkZCu8hGbp5mYRQgUmz9",
  "enforcement_status": "restricted",
  "enforcement_actions": [
    {
      "type": "restriction",
      "id": "enac_011CZkZEq4TnWb7xLfRgPm2v",
      "reason": "fraud_or_abuse",
      "action": null,
      "opened_at": "2026-10-02T19:30:00Z",
      "expires_at": null
    }
  ]
}
```

## Options / Props

### Who gets a profile

| Who the traffic is for | Profile | `access_type` |
|------------------------|---------|---------------|
| A signed-up user of your product | One for each user, created when they sign up | `application` (default, set when `access_type` is left out) |
| A company you resell API access to, for example as a gateway | One for each company, not for each person within it | `passthrough` (not the default, so you have to send it) |
| Your own organization | None. A request with no profile ID counts as your own usage; keep it in a separate organization | Not applicable |
| A workspace in your organization | No separate profile. A profile belongs to the organization and works through any workspace in it | Not applicable |

### Fields you can send

Every field is optional: `name`, `metadata`, and in `external_user_details`: `entity_type`, `country`, `reference_id`, `onboarded_at`, `account_status`, `name_hash`, `email_hash`.

| Rule | Detail |
|------|--------|
| Unknown values | Leave out instead of sending a placeholder. A value in `external_user_details` can be replaced later but not cleared |
| Company names | For `passthrough`, send the company's legal name in `name` if known |
| `country` | The end customer's country, not yours |
| `reference_id` | Your own stable identifier for the end customer; need not be unique |
| Names / emails you can't share | Omit `name` and send `external_user_details.name_hash`; for email send `external_user_details.email_hash` (no field for the address itself) |
| Hashes | Compute yourself with a function you choose; use the same function and the same case / whitespace normalization for every profile |

### Update semantics

| Field | Behavior |
|-------|----------|
| `name`, `access_type` | Replace the stored value |
| each `external_user_details` field | Replaces the stored value; cannot be cleared, `null` is rejected with `400` |
| `metadata` | Merges key by key; a key sent overwrites, an empty string deletes the key, keys left out stay |

### Enforcement fields (read-only, set by Anthropic)

| Field | Values |
|-------|--------|
| `enforcement_status` | `unrestricted` (no action open), `restricted` (at least one action open, none a ban), `banned` (a ban is open) |
| `enforcement_actions[].type` | `restriction` or `ban` |
| `enforcement_actions[].id` | Starts with `enac_` |
| `enforcement_actions[].reason` | `unsupported_region`, `fraud_or_abuse`, `high_harm`, `usage_policy_violation`, `account_compromise`, `unspecified` |
| `enforcement_actions[].action` | What the end customer can do to clear the action, or `null` |
| `enforcement_actions[].opened_at` | When Anthropic opened the action |
| `enforcement_actions[].expires_at` | When the action ends by itself, or `null` |

### Where profile IDs are sent

| Platform | Create profiles | Send the profile ID in |
|----------|-----------------|------------------------|
| Claude API | Yes | `anthropic-user-profile-id` header |
| Claude Platform on AWS | Yes | `anthropic-user-profile-id` header |
| Microsoft Foundry, deployments hosted on Anthropic | No. Create them on the Claude API, and ask Anthropic to link your Foundry resource | `anthropic-user-profile-id` header |
| Claude Models on Google Cloud (Anthropic managed) | Yes | `anthropic-user-profile-id` header |
| Claude Models on Google Cloud (Google managed) | No. Create them on the Claude API or Claude Platform on AWS | `anthropic-user-profile-id` header |
| Claude in Amazon Bedrock | No. Create them on the Claude API or Claude Platform on AWS | `user_profile_id` field in the request body |

SDK / CLI argument that sends the header: `user_profile_id` (java: `userProfileId`; php: `userProfileID`; csharp, go: `UserProfileID`; cli: `--user-profile-id`).

## Notes

- `POST /v1/user_profiles` isn't idempotent: every call creates a new profile, even when `reference_id` matches an existing one. There is no cap on the number of profiles, but creation is rate limited; contact your Anthropic account team before bulk registration.
- Examples use a regular API key; an Admin API key isn't needed. Create one profile per end customer in onboarding and store the `id` on your customer record.
- A profile contains only what you send plus program status and enforcement status set by Anthropic; no conversation content. Anthropic doesn't verify the details. `programs` is read-only; attribution doesn't use it.
- Keep end-customer traffic and your own internal usage in separate organizations (profiles belong to an organization, not a workspace).
- Amazon Bedrock: profiles work only with Claude in Amazon Bedrock, not Amazon Bedrock (`bedrock-runtime`, `InvokeModel` / `Converse`). Claude Models on Google Cloud (Google managed) and Amazon Bedrock don't have the `/v1/user_profiles` endpoints. On Claude in Amazon Bedrock the body looks like `{"model": "anthropic.claude-opus-5-5", "max_tokens": 1024, "user_profile_id": "uprof_011CZkZCu8hGbp5mYRQgUmz9", "messages": [...]}`.
- The header also works on token counting, Message Batches (applies to every request in the batch) and OpenAI SDK compatibility requests.
- Validation: the Claude API, Claude Platform on AWS, Claude Models on Google Cloud (Anthropic managed) and Foundry deployments hosted on Anthropic check the ID on every request; a malformed ID or one from another organization returns `400` `invalid_request_error`. Foundry returns that `400` until Anthropic links the Foundry resource to the creating organization. Message Batches checks only the ID format at creation; each request then fails with an `errored` result containing the same error. Google Cloud (Google managed) and Claude in Amazon Bedrock check format only and accept any well-formed ID; a request with no ID goes through unattributed, and an enforcement action then applies to the whole organization.
- Linking AWS accounts / Google Cloud projects: an admin or owner starts the link in the Verification Portal (`portal.anthropic.com`) under Linked accounts; someone with IAM rights runs a command the portal provides; the admin or owner completes verification. Programs apply to the account's requests only after the portal shows it as Linked.
- `passthrough` profiles identify a company, not a person: also send `metadata.user_id` in the Messages request (the request's own `metadata`, not the profile's) when one identifiable person made the request. Optional.
- Enforcement: both fields appear in create, retrieve, update and list responses when no `user-profiles-` value is in `anthropic-beta` (`user-profiles-2026-09-04` and earlier values leave them out). Find affected profiles by listing with `enforcement_status[]=restricted` and `enforcement_status[]=banned`. A change doesn't reliably move `updated_at`. Sending either field on create / update returns `400`. `enforcement_status` is separate from `external_user_details.account_status`. Treat unrecognized values as: status `restricted`, type `restriction`, reason `unspecified`, action `null`. On Claude Platform on AWS, `enforcement_status` is always `unrestricted` and `enforcement_actions` always empty.
- Delete: permanently removes `name`, `external_user_details`, and `metadata` but not Anthropic's trust and safety records for that ID. Stop sending the ID first. The response repeats the ID with `"type": "user_profile_deleted"`. Retry on server error; a `404` on retry means the first delete went through. For about 10 minutes after deletion, inference requests carrying the ID can still succeed; after that, platforms that check IDs reject with `400`.
- Where to create profiles: an organization on the Claude API, or on Claude Platform on AWS (use its base URL and authentication; the calling principal needs the user profile IAM actions). On Claude Models on Google Cloud (Anthropic managed) you can create, retrieve, list, and update profiles.
- Source: https://platform.claude.com/docs/en/manage-claude/user-profiles (retrieved 2026-11-14)

## Related

- [user-profiles-verification-portal.md](./user-profiles-verification-portal.md)
