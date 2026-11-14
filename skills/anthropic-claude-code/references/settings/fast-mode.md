<!-- source: https://code.claude.com/docs/en/fast-mode.md / last verified: 2026-11-14 -->

# Speed up responses with fast mode

A high-speed configuration for supported models, up to 2.5x faster at a higher cost per token. Fast mode for Claude Fable 5.2 and Claude Opus 5.5 is available; fast mode for Claude Opus 5 and Claude Opus 4.8 is in research preview. Toggle with `/fast` for interactive work (rapid iteration, live debugging); toggle off when cost matters more than latency. Fast mode is not a different model — same quality/capabilities, different API configuration. Supported on Fable 5.2, Opus 5.5, Opus 5, and Opus 4.8 only on the Anthropic API (not Sonnet, Haiku, or other models). The VS Code extension offers a **Toggle fast mode** command when the selected model supports fast mode. Fast mode for Opus 4.8 was deprecated on October 30, 2026, and will be removed on November 30, 2026; after that date the API rejects requests from Opus 4.8 with fast mode on, so switch to Opus 5.5 (Claude Code v2.1.280 or later; fast mode stays on after the switch) or run `/fast off`. Opus 4.7 doesn't support fast mode (switching to it turns fast mode off); fast mode for Opus 4.7 was deprecated June 25, 2026 and removed July 24, 2026.

## Signature / Usage

```json ~/.claude/settings.json
{ "fastMode": true }
```

Or type `/fast` and press Tab to toggle. Enabling fast mode switches to Opus if the current model doesn't support it (on Agent Platform, `/fast` switches to Fable 5.2 instead); shows "Fast mode ON"; a `↯` icon appears next to the prompt. Turning fast mode off keeps you on Opus (doesn't revert model) — use `/model` to switch elsewhere.

## Options / Props

| Setting | Description |
| --- | --- |
| `fastMode` (settings) | Persists on/off across sessions when toggled in an interactive session |
| `fastModePerSessionOptIn` | `true` resets fast mode off at the start of every session; users still enable with `/fast`. Deployable org-wide via server-managed settings |
| `CLAUDE_CODE_DISABLE_FAST_MODE=1` | Disable fast mode entirely |

Pricing (per MTok, flat across the full 1M context window):

| Model | Input (MTok) | Output (MTok) |
| --- | --- | --- |
| Fable 5.2 | $16 | $80 |
| Opus 5.5 | $8 | $40 |
| Opus 5 | $10 | $50 |
| Opus 4.8 | $10 | $50 |

## Notes

- **Default model**: Opus 5.5 is the fast mode default in Claude Code v2.1.280 and later. Before v2.1.280, fast mode defaulted to Opus 5 from v2.1.219, to Opus 4.8 on v2.1.154 through v2.1.218, and to Opus 4.7 on v2.1.142 through v2.1.153.
- **Cloud sessions**: fast mode works in cloud sessions when it's available on your account, whether the session runs on Anthropic-managed infrastructure or a self-hosted runner (requires Claude Code v2.1.271 or later in the session's environment). Type `/fast on` in the session; it stays on for that session only and isn't saved as your default. In the browser at claude.ai/code you can also toggle it from the model menu. When managed settings disable it, `/fast on` is refused outside an interactive terminal session (non-interactive mode, VS Code extension, cloud sessions).
- **Non-interactive mode**: with `-p`, `/fast` works only in a session launched with fast mode in its `--settings` value (for example `claude -p --settings '{"fastMode": true}'`); the toggle applies to that session only. Requires v2.1.205 or later.
- **Switching away from Opus 4.7**: before v2.1.221, fast mode stayed on after a switch to Opus 4.7 and the API rejected the requests.
- **Cost tradeoff**: the first time you enable fast mode in a conversation, you pay full fast-mode uncached input price for the *entire* conversation context — enable at session start rather than mid-conversation for the lowest cost. Applies once per conversation.
- **Model switching**: switching away from a fast-mode-capable Opus model turns fast mode off; switching back turns it on again only if your saved preference is on (a switch never turns fast mode on for a session whose saved preference is off).
- **Requirements**: Anthropic Console API or subscription plans only (not Amazon Bedrock/Google Cloud's Agent Platform/Microsoft Foundry/Claude Platform on AWS); usage credits must be turned on; Team/Enterprise orgs need an Owner to enable it (disabled by default for those plans). Fast mode usage draws from usage credits even with remaining plan usage.
- **Behind proxies/gateways**: the availability check hits `api.anthropic.com` directly and ignores `ANTHROPIC_BASE_URL`, so it can fail on networks that block direct egress even though inference works through a gateway. Fixes: `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS=1` (treats a failed check as available, still honors an org-disabled response) or `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK=1` (skips the check entirely — needed when a proxy intercepts and answers the check itself, or when authenticating with `ANTHROPIC_AUTH_TOKEN` alone).
- **Rate limits**: separate pool shared across all supported Opus models. On limit, falls back to standard speed/pricing automatically (icon turns gray); re-enables when the cooldown expires. Running out of usage credits mid-session retries each request at standard speed with no cooldown.
- Fast mode vs. effort level: fast mode = same quality, lower latency, higher cost; lower effort = less thinking time, faster, potentially lower quality. Combine both for maximum speed on straightforward tasks.
- **Fable 5.2** (requires Claude Code v2.1.321 or later): `"fastMode": true` alone has no effect on Fable 5.2 until you run `/fast` while using Fable 5.2. When you switch to Fable 5.2, fast mode turns off unless you turned it on while using Fable 5.2; that choice then lasts across sessions on the Anthropic API unless per-session opt-in is set.
- **Agent Platform** (Google Cloud, requires v2.1.322 or later): fast mode is available for Fable 5.2 only; the region must be `global`, `us`, or `eu` (for example `export VERTEX_REGION_CLAUDE_FABLE_5_2=global`). In an interactive session run `/fast`; in non-interactive mode pass `--model claude-fable-5-2 --settings '{"fastMode": true}'`. `"fastMode": true` in a settings file has no effect there, and fast mode isn't saved as your default. If Agent Platform refuses fast mode, Claude Code falls back to standard speed.
- Fast mode with Fable 5.2 or Opus 5.5 also depends on your organization's usage tier. Console organizations using Opus 5 or Opus 4.8 need provisioned access; without it, requests hit the fast mode rate limit and fall back to standard speed.
- Source: https://code.claude.com/docs/en/fast-mode.md (retrieved 2026-11-14)

## Related

- [model-config.md](./model-config.md): effort levels and the Opus/Sonnet/Haiku alias family
- [env-vars.md](./env-vars.md): `CLAUDE_CODE_DISABLE_FAST_MODE`, `CLAUDE_CODE_SKIP_FAST_MODE_NETWORK_ERRORS`, `CLAUDE_CODE_SKIP_FAST_MODE_ORG_CHECK`
- [statusline.md](./statusline.md): the `fast_mode` JSON field exposed to a custom status line
