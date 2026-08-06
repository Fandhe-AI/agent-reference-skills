# Safety Checks

OpenAI's automated safety classifier process and enforcement flow for GPT-5-and-later models, and how to respond to it.

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

## Enforcement actions

- **Delayed responses** — lower-consequence intervention; streaming may pause for additional safety checks on suspected violations.
- **Individual user blocking** — high-confidence violations result in permanent access denial for that `safety_identifier`. OpenAI cannot currently reverse an individual block; control access at your account-creation layer instead.

## Notes

- Without a per-user `safety_identifier`, access may be revoked for the entire organization instead of a single user.
- Distinct from [Cybersecurity checks](./cybersecurity-checks.md), which cover a narrower, cyber-specific safeguard for high-cybersecurity-capability models.

## Related

- [Safety best practices](./safety-best-practices.md)
- [Cybersecurity checks](./cybersecurity-checks.md)
