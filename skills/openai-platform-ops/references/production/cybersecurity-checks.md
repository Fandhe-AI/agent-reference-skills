# Cybersecurity Checks

Automated safeguards that apply to models classified as High Cybersecurity Capability under OpenAI's Preparedness Framework (GPT-5.3-Codex and newer, including GPT-5.4/GPT-5.5) when used via the API.

## Behavior

These safeguards monitor for signals of potentially suspicious cybersecurity activity, distinct from the safeguards applied in Codex. If defined thresholds are exceeded, model access may be temporarily limited pending review. Legitimate security research/defensive work may occasionally be flagged.

## Safeguard actions — non-ZDR organizations

- Suspicious activity exceeding thresholds returns error code `cyber_policy` and may temporarily revoke access.
- Without a per-user `safety_identifier`, the **entire organization** may be temporarily revoked.
- With a per-user `safety_identifier`, only the **specific affected user** may be revoked (after human review and warnings).

## Safeguard actions — ZDR organizations

Same general process as non-ZDR, plus **request-level mitigations**: a single suspicious request may itself return `cyber_policy` (including mid-stream for streaming requests), in addition to threshold-based user/org access limits.

## Appeals

Contact [support](https://help.openai.com/en/articles/6614161-how-can-i-contact-support) to request early restoration before the 7-day period ends.

## Notes

- Providing a `safety_identifier` per end user minimizes disruption blast radius (per-user vs. whole-org revocation) — same mechanism as [Safety checks](./safety-checks.md).

## Related

- [Safety checks](./safety-checks.md)
- [Safety best practices](./safety-best-practices.md)
