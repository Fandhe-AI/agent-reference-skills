# Cybersecurity Checks

Automated safeguards that apply to models classified as High Cybersecurity Capability under OpenAI's Preparedness Framework (GPT-5.3-Codex and newer, including GPT-5.4/GPT-5.5) when used via the API.

## Behavior

These safeguards monitor for signals of potentially suspicious cybersecurity activity, distinct from the safeguards applied in Codex. If defined thresholds are exceeded, model access may be temporarily limited pending review. Legitimate security research/defensive work may occasionally be flagged.

## Authorized access and agentic workflows

- Trusted Access for Cyber is a reviewed access program, not the name of a model.
- Approval for Daybreak Blue applies only to the authorized person or service, workspace or API organization and project, model, and product surface. Daybreak Red requires separate approval and provisioning; applying, verifying an identity, or receiving Daybreak Blue access doesn't grant specialist-model access.
- For approved API projects, use a Daybreak alias or a compatible underlying model ID together with an `access_programs.cyber` value. Alias resolution can change and depends on approved access; the model ID alone doesn't grant access. See "Use Daybreak in the Responses API" in the official docs.
- Trusted Access doesn't automatically grant Zero Data Retention; confirm any separately approved retention controls for the exact API organization and endpoint.
- Trusted Access governs approved model access; it doesn't configure tools, environment, or engagement scope.
- If a Responses API or Agents SDK workflow can take sensitive cybersecurity actions, review each proposed tool call against the approved scope before execution: deny unauthorized actions, pause ambiguous or high-risk changes for human approval, enforce independent filesystem and network boundaries, keep audit logs, and fail closed when review is unavailable.
- Application-level tool review and Codex product-side sandboxing are separate from the API cybersecurity safeguards described on this page.

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
