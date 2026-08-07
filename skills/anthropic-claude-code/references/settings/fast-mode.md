<!-- source: https://code.claude.com/docs/en/fast-mode.md / last verified: 2026-08-07 -->

# Speed up responses with fast mode

A research-preview, high-speed configuration for Claude Opus, up to 2.5x faster at a higher cost per token. Toggle with `/fast` for interactive work (rapid iteration, live debugging); toggle off when cost matters more than latency. Fast mode is not a different model — same Opus quality/capabilities, different API configuration. Supported on Opus 5 and Opus 4.8 only (not Sonnet, Haiku, or other models). Not supported in the VS Code extension. Opus 4.7 fast-mode support was deprecated June 25, 2026 and removed July 24, 2026.

## Signature / Usage

```json ~/.claude/settings.json
{ "fastMode": true }
```

Or type `/fast` and press Tab to toggle. Enabling fast mode auto-switches to Opus if on a different model; shows "Fast mode ON"; a `↯` icon appears next to the prompt. Turning fast mode off keeps you on Opus (doesn't revert model) — use `/model` to switch elsewhere.

## Options / Props

| Setting | Description |
| --- | --- |
| `fastMode` (settings) | Persists on/off across sessions when toggled in an interactive session |
| `fastModePerSessionOptIn` | `true` resets fast mode off at the start of every session; users still enable with `/fast`. Deployable org-wide via server-managed settings |
| `CLAUDE_CODE_DISABLE_FAST_MODE=1` | Disable fast mode entirely |

Pricing (per MTok, flat across the full 1M context window): Opus 5 and Opus 4.8 both $10 input / $50 output.

## Notes

- **Cost tradeoff**: the first time you enable fast mode in a conversation, you pay full fast-mode uncached input price for the *entire* conversation context — enable at session start rather than mid-conversation for the lowest cost. Applies once per conversation.
- **Model switching**: switching away from a fast-mode-capable Opus model turns fast mode off; switching back turns it on again only if your saved preference is on (a switch never turns fast mode on for a session whose saved preference is off).
- **Requirements**: Anthropic Console API or subscription plans only (not Amazon Bedrock/Google Cloud's Agent Platform/Microsoft Foundry/Claude Platform on AWS); usage credits must be turned on; Team/Enterprise orgs need an Owner to enable it (disabled by default for those plans). Fast mode usage draws from usage credits even with remaining plan usage.
- **Behind proxies/gateways**: the availability check hits `api.anthropic.com` directly and ignores `ANTHROPIC_BASE_URL`, so it can fail on networks that block direct egress even though inference works through a gateway. Fixes: `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1` (treats a failed check as available, still honors an org-disabled response) or `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1` (skips the check entirely — needed when a proxy intercepts and answers the check itself, or when authenticating with `ANTHROPIC_AUTH_TOKEN` alone).
- **Rate limits**: separate pool shared across all supported Opus models. On limit, falls back to standard speed/pricing automatically (icon turns gray); re-enables when the cooldown expires. Running out of usage credits mid-session retries each request at standard speed with no cooldown.
- Fast mode vs. effort level: fast mode = same quality, lower latency, higher cost; lower effort = less thinking time, faster, potentially lower quality. Combine both for maximum speed on straightforward tasks.

## Related

- [model-config.md](./model-config.md): effort levels and the Opus/Sonnet/Haiku alias family
- [env-vars.md](./env-vars.md): `CLAUDE_CODE_DISABLE_FAST_MODE`, `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS`, `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK`
- [statusline.md](./statusline.md): the `fast_mode` JSON field exposed to a custom status line
