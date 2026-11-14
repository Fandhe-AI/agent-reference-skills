<!-- source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/check-events-against-results / last verified: 2026-11-14 -->

# Check stored Security posture events against current results

A daily comparison of the attestation activities a SIEM has stored with the endpoint's current results, with a 17-row decision table (Match / Expected / Look into) and placeholder rules. The feed can deliver late and the endpoint keeps no history, so each can show a change the other does not. If you only report current results, the check is not needed.

## Signature / Usage

Snippet taken from https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/results-reference (the endpoint call made once per organization in step 2):

```bash
curl --fail-with-body -sS \
  "https://api.anthropic.com/v1/compliance/organizations/91012d09-e48b-438e-a489-1bebfd8fa6f9/security_posture" \
  -H "x-api-key: $ANTHROPIC_COMPLIANCE_ACCESS_KEY" \
  -H "anthropic-version: 2026-10-21"
```

## Options / Props

Field matching:

| Response | Activity | Relation |
| --- | --- | --- |
| `organization_id` | `organization_uuid` | same value (the activity's `organization_id` has the `org_` prefix) |
| `controls[].id` | `control` | same identifier except rule S2 |
| `attestation.attested_at` | `created_at` of newest `attested`, `changed` or `renewed` | same time; compare as times |
| `status` | `status` | `attested_completed` pairs with `completed`; `attested_accepted_risk` and `failed_check_accepted_risk` pair with `accepted_risk`; nothing pairs with `control_failed` |

Set-aside rules:

| # | What | Rule |
| --- | --- | --- |
| S1 | stored `action` not `attested`, `changed`, `renewed`, `cleared`, `lapsed` | leave out of the whole check; flag each new value once |
| S2 | activity naming `mdm_cowork_required_organization` | count as one for `mdm_chat_required_organization` |
| S3 | stored control with no entry in the response | report as not in the response, never as `passed` |
| S4 | entry `status` is `descriptive`, `not_applicable` or `not_evaluated` | skip (a `not_evaluated` run does not count for that control) |

Decision table (newest stored activity / response entry -> verdict):

| # | Newest stored activity | Entry in the response | Verdict |
| --- | --- | --- | --- |
| 1 | `attested`, `changed`, `renewed` | `attested_at` equals `created_at`; `state` `in_force`; `status` pairs | Match |
| 2 | `cleared` | `attestation` `null` (except row 11) | Match |
| 3 | `lapsed` with `accepted_risk` | `attestation` `null`, or earlier time with `state` `check_passing` / `setting_changed` | Match |
| 4 | `lapsed` with `completed` or `control_failed` | `attestation` `null` | Match |
| 5 | `attested`/`changed`/`renewed` | `attested_at` equals `created_at`; `state` `review_due`, `check_passing` or `setting_changed` | Expected (act once per new state) |
| 6 | as 5 with `completed`, `created_at` later than first run | first comparing run: `attestation` `null`, `status` `failed` with a `current_value` | Look into (page may show a failing check as Passed; no wait) |
| 7 | as 5 with `completed` | `attestation` `null`; `status` neither `not_attested` nor `failed` with `null` `current_value`; row 6 does not fit | Expected |
| 8 | as 5 as `control_failed` | `attestation` `null`; `status` `failed`, or an automatic-check status, or `not_attested` from `review_date` (UTC) on | Expected (act once when `status` leaves `failed` from the end date on) |
| 9 | as 5 with `accepted_risk` | `attestation` `null`; `status` `passed`, `matches_profile` or `exceeds_baseline` | Expected (store placeholder, rule 7) |
| 10 | none, or all older than `attested_at` | `attestation` present | Look into (placeholder rules) |
| 11 | none, or value not `control_failed` | `current_value` `null` and `status` `failed` | Look into (placeholder; act once when `status` leaves `failed`) |
| 12 | `attested`/`changed`/`renewed`/`cleared` newer than `attested_at`, with another activity at almost the same time | `attestation` present | Expected (either order possible) |
| 13 | same, no such second activity | `attestation` present | Look into (contact Anthropic support once) |
| 14 | `attested`/`changed`/`renewed` | `in_force` but `status` does not pair | Look into (contact support once) |
| 15 | as 14, no earlier row fits | `attestation` `null` | Look into (most likely cleared: placeholder, flag once) |
| 16 | none | `attestation` `null`, row 11 does not fit | Match |
| 17 | any other | any other | Look into (flag once) |

## Notes

- Run steps (start after the day's daily re-read completes, so late activities are stored): (1) list linked organizations for each `uuid`; (2) call the endpoint once per organization (200, or 404 meaning the organization is not read this run; keep the `evaluated_at` of the first 200 as your first run); (3) set aside per S1-S4; (4) group remaining stored activities by control and take the newest by `created_at`; (5) find the decision row; (6) act on a Look into only when the next run that reads the organization shows it again (row 6 at once; rows 10 and 11 follow the placeholder rules). A run that did not read the organization neither counts nor restarts the wait.
- Key: Compliance Access Key covering the organization with `read:compliance_org_data` (endpoint) and `read:compliance_activities` (feed), or `read:org_audit` for both. Pace calls and handle 429; an organization whose calls fail after retries is not read on that run, and a failed call is not a change.
- Row 10 placeholders are keyed on control + `attested_at`: re-read from the newest stored activity (15 days counted from `attested_at`), build the placeholder from the entry marked as having no activity, update `status`/`state` each run, replace it when an activity with `created_at` equal to `attested_at` arrives, resolve it when two runs in a row do not show the attestation (flag unless explained), and reopen the same placeholder if it shows again. A run that did not read the organization, or shows `not_evaluated`, neither counts toward nor restarts those two runs. On the first run store it at once, with no review.
- Row 9, 11 and 15 placeholders are keyed on the control alone; for row 11 the 15 days count from the first run that shows the `status`; resolve on a newer activity, the attestation showing, or two runs fitting another row. Flag a row 9 placeholder once if it resolves as `failed_check_accepted_risk` (the risk is in effect).
- Cannot find: a missing activity for an attestation the response leaves out on an automatic control (no sign, or only `failed`).
- An organization that returned 200 and then 404 on several runs in a row needs a person once: ask whether the page was turned off, else contact your Anthropic representative; resolve its placeholders with no review, keep calling, reopen if it returns 200.
- This is the Compliance API security-posture feature (not Claude Code security review).
- Source: https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/check-events-against-results (retrieved 2026-11-14)
- Source (snippet): https://platform.claude.com/docs/en/manage-claude/compliance-security-posture/results-reference (retrieved 2026-11-14)

## Related

- [security-posture.md](./security-posture.md)
- [security-posture-results-reference.md](./security-posture-results-reference.md)
- [security-posture-events-reference.md](./security-posture-events-reference.md)
- [security-posture-send-events.md](./security-posture-send-events.md)
- [security-posture-detect-changes.md](./security-posture-detect-changes.md)
