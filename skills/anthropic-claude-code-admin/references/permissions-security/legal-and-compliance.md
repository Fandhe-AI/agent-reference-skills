<!-- source: https://code.claude.com/docs/en/legal-and-compliance.md / last verified: 2026-08-07 -->

# Legal and compliance

Legal agreements, compliance certifications, and security-reporting information for Claude Code.

## Options / Props

| Topic | Detail |
|---|---|
| License | [Commercial Terms](https://www.anthropic.com/legal/commercial-terms) for Team/Enterprise/API users; [Consumer Terms of Service](https://www.anthropic.com/legal/consumer-terms) for Free/Pro/Max users |
| Commercial agreements | Existing 1P (Claude API) or 3P (Bedrock/Agent Platform) commercial agreement applies to Claude Code usage unless mutually agreed otherwise |
| Healthcare compliance (BAA) | A customer's BAA automatically extends to Claude Code only if the customer also has Zero Data Retention (ZDR) activated; ZDR is enabled per-organization |
| Acceptable use | Subject to the [Anthropic Usage Policy](https://www.anthropic.com/legal/aup); advertised Pro/Max usage limits assume ordinary individual use |
| Trust and safety | [Anthropic Trust Center](https://trust.anthropic.com) and [Transparency Hub](https://www.anthropic.com/transparency) |
| Vulnerability reporting | [HackerOne program](https://hackerone.com/4f1f16ba-10d3-4d09-9ecc-c721aad90f24/embedded_submissions/new) |

## Example

```bash
# API key auth (required for Agent SDK / third-party product builders)
export ANTHROPIC_API_KEY=sk-ant-...

# OAuth sign-in (Free/Pro/Max/Team/Enterprise subscribers using Claude Code
# and other native Anthropic apps) — no API key needed, run:
claude /login
```

## Notes

- Authentication restrictions: **OAuth** sign-in is exclusively for Free/Pro/Max/Team/Enterprise subscription holders using Claude Code and other native Anthropic apps normally. **API key** authentication (via Claude Console or a supported cloud provider) is required for developers building products, including Agent SDK usage. Anthropic does not permit third-party developers to offer claude.ai login or route requests through Free/Pro/Max plan credentials on behalf of their users, and reserves the right to enforce this without prior notice.

## Related

- [zero-data-retention](./zero-data-retention.md)
- [data-usage](./data-usage.md)
- [security](./security.md)
