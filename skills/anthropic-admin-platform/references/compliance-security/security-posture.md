<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/overview / last verified: 2026-11-14 -->

# Security posture in the Compliance API

The Security posture page (headed Security Center) in claude.ai Organization settings compares an organization's Claude settings with Anthropic's recommended security controls. Through the Compliance API, security tools read the changes the page records (Activity Feed) and the current results (endpoint). Security posture reports on settings and does not change them.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/results-reference (the current-results request):

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/91012d09-e48b-438e-a489-1bebfd8fa6f9/security_posture" \
  -H "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  -H "anthropic-version: 2026-10-21"
```

## Options / Props

| Concept | Values / rule |
| --- | --- |
| Control kinds | Automatic control (check of current value against recommended value, e.g. `sso_enabled`); Manual control (a person decides, e.g. `oauth_conditional_access`); Information-only control (no recommended value, reported not rated, e.g. `allowed_invite_domains`) |
| Control fields | identifier (same for every organization), display name, `current_value`, `desired_state` |
| Attestation values | `completed` (in place), `accepted_risk` (not in place, risk accepted), `control_failed` (not in place) |
| Results | `passed`, `failed`, `not_attested`, `descriptive` |
| Attestation ends when | someone clears or changes it; its end date (`review_date`, 90 days or none) arrives; on automatic / information-only controls the current value changes, or (accepted risk on some automatic controls) the check passes |
| Activity Feed scopes | `read:compliance_activities` or `read:org_audit` |
| Endpoint scopes | `read:compliance_org_data` or `read:org_audit` |
| Attester identity in endpoint | `attested_by` needs `read:compliance_org_data` plus `read:compliance_user_data`, or `read:org_audit` |

## Notes

- This is the Compliance API security-posture feature (Security Center page in claude.ai); it is not Claude Code security review.
- Attestations are made on the page only; the API reads them and cannot make them. A comment (up to 2,000 characters) is stored with an attestation; Activity Feed activities and the endpoint never return comments.
- Accepted risk in effect counts as `passed` on an automatic or manual control. An automatic control attested as Completed while its check fails is `failed` in the response.
- Availability: beta. On Claude Enterprise with Security posture available and the Compliance API enabled for the parent organization, the feed records attestation activities and the endpoint returns results. On other plans or Claude Console organizations the feed records nothing and the endpoint returns 404; it also returns 404 when the page is turned off for the organization (even for a parent-organization key) and, for some organizations, even when all conditions hold.
- Feed activities record the user ID, email address at the time, IP address and user agent of the attester, remain readable after the user leaves or is deleted, and are retained 6 years. Tell people who attest before you collect this personal data.
- Anthropic stores one attestation per control (value, time, end date, attester account) until cleared or deleted with the organization; CMEK, ZDR for Claude Code and a HIPAA-ready Enterprise plan do not shorten this and CMEK does not encrypt these fields. Some organizations (CMEK or ZDR) cannot save a comment; the page then shows no comment box.
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/overview (retrieved 2026-11-14)
- Source (snippet): https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/results-reference (retrieved 2026-11-14)

## Related

- [security-posture-send-events.md](./security-posture-send-events.md)
- [security-posture-detect-changes.md](./security-posture-detect-changes.md)
- [security-posture-events-reference.md](./security-posture-events-reference.md)
- [security-posture-results-reference.md](./security-posture-results-reference.md)
- [security-posture-check-events-against-results.md](./security-posture-check-events-against-results.md)
- [security-posture-ocsf-mapping.md](./security-posture-ocsf-mapping.md)
