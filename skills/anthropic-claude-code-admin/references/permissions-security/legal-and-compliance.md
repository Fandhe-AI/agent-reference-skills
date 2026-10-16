<!-- source: https://code.claude.com/docs/en/legal-and-compliance.md / last verified: 2026-10-16 -->

# Legal and compliance

Legal agreements, compliance certifications, and security-reporting information for Claude Code.

## Signature / Usage

```bash
# API key auth (required for Agent SDK / third-party product builders)
export ANTHROPIC_API_KEY=sk-ant-...

# OAuth sign-in (Free/Pro/Max/Team/Enterprise subscribers using Claude Code
# and other native Anthropic apps) — no API key needed, run:
claude /login
```

## Options / Props

| Topic | Detail |
|---|---|
| License | [Commercial Terms](https://www.anthropic.com/legal/commercial-terms) for Team/Enterprise/API users; [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms) for Free/Pro/Max users |
| Commercial agreements | Existing 1P (Claude API) or 3P (Bedrock/Agent Platform) commercial agreement applies to Claude Code usage unless mutually agreed otherwise |
| Customers offering Claude Code in their products | Requires the Commercial Terms of Service plus conditions: unmodified binary (no removing/disabling/restricting built-in authentication methods); no paying for, reselling, or intermediating usage on end users' behalf (each end user authenticates with their own API key, Claude subscription credentials, or 3P provider credential); plain-text "preinstalled" / "runs Claude Code" statements are fine, but Claude Code / Anthropic names and logos can't be part of your product, feature, company name or logo or imply endorsement |
| Healthcare compliance (BAA) | A customer's BAA extends to Claude Code in two configurations: the HIPAA configuration (Claude Code CLI or Desktop Code tab on Claude for Enterprise, with HIPAA enabled and the HIPAA configuration applied to Claude Code local mode and Cowork local mode), or Zero Data Retention (ZDR) enabled for the organization (not available for all organizations). Under the HIPAA configuration, cloud sessions, Remote Control, Claude Code in the mobile app, and routing through a third-party cloud provider or a gateway are not covered |
| Acceptable use | Subject to the [Anthropic Usage Policy](https://www.anthropic.com/legal/aup); advertised Pro/Max usage limits assume ordinary individual use |
| Trust and safety | [Anthropic Trust Center](https://trust.anthropic.com) and [Transparency Hub](https://www.anthropic.com/transparency) |
| Vulnerability reporting | [HackerOne program](https://hackerone.com/4f1f16ba-10d3-4d09-9ecc-c721aad90f24/embedded_submissions/new) |

## Notes

- Authentication restrictions: **OAuth** sign-in is exclusively for Free/Pro/Max/Team/Enterprise subscription holders using Claude Code and other native Anthropic apps normally. **API key** authentication (via Claude Console or a supported cloud provider) is required for developers building products, including Agent SDK usage. Anthropic does not permit third-party developers to offer claude.ai login or route requests through Free/Pro/Max plan credentials on behalf of their users, and reserves the right to enforce this without prior notice. Developers also may not collect, store, or intermediate claude.ai credentials or session tokens; sign-in to a Claude account must complete through Anthropic's own flow.
- Customers may still provision and manage their own API keys or 3P provider credentials for their own authorized users (e.g. in a dev environment, secrets manager, or machine image), provided usage is billed to the key owner and isn't resold or intermediated. An end user may also sign in to the unmodified Claude Code binary with their own Claude subscription, including on a platform that hosts Claude Code.

## Related

- [zero-data-retention](./zero-data-retention.md)
- [hipaa-setup](./hipaa-setup.md)
- [data-usage](./data-usage.md)
- [security](./security.md)
