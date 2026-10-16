# Safety Checks

OpenAI's automated safety classifier process and enforcement flow for GPT-5-and-later models, and how to respond to it. The official page is now titled "Safety classifiers" (this file keeps its original name).

To route warning and deactivation notices for a safety identifier to your investigation or support workflow, see [Safety enforcement notifications](./safety-enforcement.md).

## Safety classifier process (GPT-5+)

1. **Classification** — requests are categorized by risk level.
2. **Warning phase** — organizations that hit high risk thresholds receive API errors and warning emails.
3. **Access suspension** — continued violations after a stated period (typically seven days) result in full access termination.

## Risk mitigation

- Implement `safety_identifier` for applications with individual end users (hash email/user ID — never send personal information).
- For legitimate low-restriction needs (e.g. beneficial life-sciences research), explore OpenAI's "special access program".

## Safety identifier scope

| API | How `safety_identifier` is sent |
|-----|----------------------------------|
| Responses API | direct `safety_identifier` parameter |
| Chat Completions API | direct `safety_identifier` parameter |
| Realtime API | `OpenAI-Safety-Identifier` header |

Safety identifiers do not carry over between APIs or sessions: if the app already sends `safety_identifier` with Responses API requests, pass the same stable value separately when creating or connecting each Realtime session.

```bash
curl https://api.openai.com/v1/responses \
-H "Content-Type: application/json" \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-d '{
"model": "gpt-5.6-terra",
"input": "This is a test",
"safety_identifier": "user_123456"
}'
```

## Enforcement actions

- **Delayed responses** — lower-consequence intervention; streaming may pause for additional safety checks on suspected violations.
- **Individual user blocking** — high-confidence violations result in permanent access denial for that `safety_identifier`. OpenAI cannot currently reverse an individual block; control access at your account-creation layer instead.

## Notes

- Without a per-user `safety_identifier`, access may be revoked for the entire organization instead of a single user.
- Enforcement criteria may change with real-world usage or new model releases. Currently OpenAI may restrict or block access for safety identifiers with risky or suspicious biology or chemical activity.
- Other safeguards are documented elsewhere: computer-use user confirmation and consent, and fine-tuning safety checks.
- Distinct from [Misalignment monitoring](./misalignment-monitoring.md), which is a separate safeguard (403 `misalignment_policy_violation` for GPT-6 Astra agent workflows) rather than this risk-threshold classifier flow.
- Distinct from [Cybersecurity checks](./cybersecurity-checks.md), which cover a narrower, cyber-specific safeguard for high-cybersecurity-capability models.

## Related

- [Safety best practices](./safety-best-practices.md)
- [Cybersecurity checks](./cybersecurity-checks.md)
- [Safety enforcement notifications](./safety-enforcement.md)
- [Misalignment monitoring](./misalignment-monitoring.md)
