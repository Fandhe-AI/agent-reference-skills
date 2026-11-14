<!-- source: https://platform.claude.com/docs/en/manage-claude/user-profiles-verification-portal / last verified: 2026-11-14 -->

# Send an End Customer a Link to the Verification Portal

For an end customer's program approvals to apply when they use Claude through your platform, the end customer links their user profile to their own Anthropic organization in the Verification Portal (`portal.anthropic.com`). You start the process: create an enrollment link for the profile and give it to the end customer. The profile must already exist. You can skip this page if you need only attribution, or if creating enrollment links isn't enabled for your organization.

## Signature / Usage

```bash
curl https://api.anthropic.com/v1/user_profiles/uprof_011CZkZCu8hGbp5mYRQgUmz9/action_urls \
  -H "x-api-key: $ANTHROPIC_API_KEY" \
  -H "anthropic-version: 2026-10-21" \
  -H "content-type: application/json" \
  -d '{"action": {"type": "enroll_end_user"}}'
```

Response:

```json
{
  "type": "user_profile_action_url",
  "url": "https://portal.anthropic.com/enroll?enrollment_token=...",
  "expires_at": "2026-03-15T11:00:00Z"
}
```

CLI equivalent:

```bash
ant user-profiles:action-urls create \
  --user-profile-id uprof_011CZkZCu8hGbp5mYRQgUmz9 \
  --action '{type: enroll_end_user}'
```

## Options / Props

| Item | Detail |
|------|--------|
| Endpoint | `POST /v1/user_profiles/{id}/action_urls` (profile ID in the path) |
| Body `action.type` | `enroll_end_user` |
| Response `type` | `user_profile_action_url` |
| Response `url` | Link to give to the end customer |
| Response `expires_at` | Time the link stops working, about an hour after creation |
| Claude Platform on AWS | Use `POST /v1/user_profiles/{id}/enrollment_url` with header `anthropic-beta: user-profiles-2026-08-18`; no body; same `url` and `expires_at` fields |
| Microsoft Foundry (hosted on Anthropic) | `POST /v1/user_profiles/{id}/action_urls` is not available; create the link from the Claude API organization that created the profile |

SDK / CLI names for the Claude Platform on AWS call (beta namespace): `client.beta.user_profiles.create_enrollment_url()` (typescript: `client.beta.userProfiles.createEnrollmentURL()`; csharp: `client.Beta.UserProfiles.CreateEnrollmentUrl()`; go: `client.Beta.UserProfiles.NewEnrollmentURL()`; java: `client.beta().userProfiles().createEnrollmentUrl()`; php: `$client->beta->userProfiles->createEnrollmentURL()`; cli: `ant beta:user-profiles create-enrollment-url`).

### `programs` on a retrieved profile

| Value | Meaning |
|-------|---------|
| `null` | Anthropic has no status to report for that program. Every key is `null` if Anthropic hasn't enabled programs for your organization |
| object | `status` is `active` when the program applies to the profile, otherwise `pending` or `rejected` |

Keys include `cyber` and `efs`; every profile has every key.

## Notes

- The call returns `404` if creating enrollment links isn't enabled for your organization, the same status as for an unknown profile ID, so check the ID first.
- Create the link when the end customer asks for it (for example on a button click), not ahead of time. The end customer can open it more than once until it expires. Each call returns a fresh link; creating a new one doesn't cancel earlier ones.
- Anyone holding the link can use it until it expires: give it only to the end customer. Send it to an admin or owner of the end customer's Anthropic organization, because only an admin or owner can link a profile. Don't parse the URL or build one yourself; its format can change.
- What the end customer sees: (1) Log in with an Anthropic account (existing Claude Console / claude.ai account or a new one; the portal keeps its own session; with several organizations they pick one). (2) A card titled "Link your partner profile" names your platform, the profile ID, the organization and the expiry; they select "Link profile" or "Skip for now". Non-admins see "Admin access needed". (3) Confirmation "Profile linked".
- Expired link: the portal shows "This invitation has expired" and tells them to ask you for a new one. A profile links to one organization; if already linked elsewhere the portal says "This partner profile is already linked to a different organization". An admin or owner of the linked organization can unlink it under Linked accounts, then you create a new link.
- The portal doesn't send the end customer back to your product and Anthropic doesn't notify you; tell the end customer in your own interface to return when finished.
- Linking doesn't approve anything by itself: programs the organization is approved for then apply to requests carrying the profile ID, except Cyber Verification Program access levels, which the end customer turns on for each linked profile in the portal. The profile has no field saying it is linked.
- If inference runs on Claude Models on Google Cloud (Google managed) or Claude in Amazon Bedrock, you must also link your own AWS accounts / Google Cloud projects to the Anthropic organization that creates your profiles.
- Source: https://platform.claude.com/docs/en/manage-claude/user-profiles-verification-portal (retrieved 2026-11-14)

## Related

- [user-profiles.md](./user-profiles.md)
