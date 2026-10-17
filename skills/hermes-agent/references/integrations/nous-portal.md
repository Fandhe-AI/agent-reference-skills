# Nous Portal

Nous Research's unified subscription gateway and the recommended way to run Hermes Agent. Consolidates access to 300+ frontier models, a managed Tool Gateway, and simplified credential management under a single OAuth login and billing relationship.

## What's in the subscription

- **300+ frontier models, one bill**: a curated catalog billed against your Nous subscription. Routing is per-model (some via OpenRouter, others via proprietary or secondary providers) and can change over time. OpenRouter-specific request extensions (`provider` routing preferences, `session_id` sticky routing, top-level `cache_control`) are not part of the Portal's API contract and may be ignored.
- **Nous Tool Gateway**: routes tool calls through Nous-managed infrastructure (see below).
- **No credentials in your dotfiles**: the refresh token at `~/.hermes/auth.json` is the only credential on disk; Hermes mints short-lived JWTs from it per request.
- **Cross-platform parity**: one OAuth covers the model and every gateway tool, notably smoothing native Windows setup.

| Family | Models (as listed in the v0.22.2 docs) |
|--------|--------|
| Anthropic Claude | Opus 4.7, Opus 4.6, Sonnet 4.6, Haiku 4.5 |
| OpenAI | GPT-5.5, GPT-5.5 Pro, GPT-5.4 Mini, GPT-5.4 Nano, GPT-5.3 Codex |
| Google Gemini | Gemini 3 Pro Preview, Gemini 3 Flash Preview, Gemini 3.1 Pro Preview, Gemini 3.1 Flash Lite Preview |
| DeepSeek | DeepSeek V4 Pro |
| Qwen | Qwen3.7-Max, Qwen3.6-35B-A3B |
| Kimi / Moonshot | Kimi K2.6 |
| GLM / Zhipu | GLM-5.1 |
| MiniMax | MiniMax M2.7 |
| xAI | Grok 4.3 |
| NVIDIA | Nemotron-3 Super 120B-A12B |
| Tencent | Hunyuan 3 Preview |
| Xiaomi | MiMo V2.5 Pro |
| StepFun | Step 3.5 Flash |
| Hermes | Hermes-4-70B, Hermes-4-405B (chat; see below) |
| Others | 280+ additional models |

## Setup

```bash
hermes setup --portal   # OAuth login, model selection, provider config, Tool Gateway enablement
```

This opens portal.nousresearch.com for OAuth, stores the refresh token at `~/.hermes/auth.json`, lets you pick a Nous model, sets Nous as the inference provider (when you pick a model), turns on the Tool Gateway, and returns you ready to `hermes chat`. Sign up first at `portal.nousresearch.com/manage-subscription` if needed.

To add Portal alongside other providers on an existing install:

```bash
hermes model            # pick "Nous Portal" from the provider list
```

Existing providers stay configured. For headless / SSH hosts the loopback callback runs where Hermes runs; use the `ssh -L` patterns from the OAuth over SSH guide. With profiles, the Portal refresh token is shared across all profiles via a shared token store (sign in once).

## Free tier (v0.22.0)

Per the v0.22.0 release notes: a first Desktop install with no provider or Nous account gets the free `nous/welcome` model as a one-time trial (once per OS user) during guided onboarding, so onboarding needs no key; the CLI, TUI, and gateway get no account or free model. The first time a hosted connector app is used, Hermes creates a free connectors-only identity (no Nous account needed). `hermes auth upgrade`, or `/login` in any chat or messaging DM, upgrades the free identity to a full Nous account with connected apps kept. The free rate limit ends the turn immediately with the reset time. `nous.guest: false` turns guest identities off; `tools.connectors.enabled: false` turns connectors off.

## Commands

| Command | Purpose |
|---------|---------|
| `hermes portal` | Log in, pick a Nous model, set Nous as provider, offer Tool Gateway opt-in (alias of `hermes auth add nous --type oauth` flow; same as `hermes setup --portal`) |
| `hermes portal info` / `hermes portal status` | Login status, subscription info, model + gateway routing |
| `hermes portal tools` | Detailed Tool Gateway catalog with per-tool routing |
| `hermes portal open` | Open subscription management in the browser |
| `/model [name]` | Switch models mid-session (e.g. `/model anthropic/claude-sonnet-4.6`) |
| `hermes tools` | Configure per-tool backends |

## Tool Gateway

| Tool | Partner | Notes |
|------|---------|-------|
| Web search & extract | Nous-managed | No search API key |
| Image generation | FAL | Nine models: FLUX 2 Klein 9B, FLUX 2 Pro, Z-Image Turbo, Nano Banana Pro (Gemini 3 Pro Image), GPT Image 1.5, GPT Image 2, Ideogram V3, Recraft V4 Pro, Qwen Image |
| Text-to-speech | OpenAI TTS | Enables voice mode across messaging platforms |
| Cloud browser automation | Browser Use | Headless Chromium for `browser_navigate`, `browser_click`, `browser_type`, `browser_vision` |
| Cloud terminal sandbox | Modal | Optional add-on |

The gateway is opt-in per tool: pick "Nous Subscription" per category in `hermes tools` while keeping other backends (e.g. a Browserbase account). Managed backends show in `hermes tools` even when not logged in; choosing one before authenticating runs the Portal login inline without changing your inference provider.

## Configuration reference

```yaml
model:
  provider: nous
  default: anthropic/claude-sonnet-4.6     # or whatever model you picked
  base_url: https://inference-api.nousresearch.com/v1

web:
  backend: nous
image_gen:
  provider: nous
tts:
  provider: nous
browser:
  cloud_provider: nous
```

Picking **Nous Subscription** in `hermes tools` (or `hermes setup --portal`) writes the value `nous` into each category's selection key. The runtime always follows the stored selection: direct API keys left in `.env` are ignored while a category is `nous`, and picking a direct provider (e.g. `image_gen.provider: fal`) without its key errors instead of silently rerouting. Older configs used `use_gateway: true`, read as equivalent to `nous` but no longer written. The OAuth refresh token stays in `~/.hermes/auth.json`.

## Token handling

Hermes mints a short-lived JWT from the stored refresh token on each inference call. Long-running gateway and dashboard processes run a background keepalive (`nous.keepalive_interval_seconds: 900` upper bound on the tick; `0` disables). If the Portal invalidates the refresh token (password change, manual revoke, session expiry), it is quarantined locally and the next call surfaces a "re-authentication required" message; run `hermes auth add nous` (the quarantine clears on successful login).

## Troubleshooting

- `hermes portal info` shows "not logged in": run `hermes portal`, or `hermes model` and re-select Nous Portal.
- "re-authentication required" mid-session: run `hermes auth add nous`.
- Model not appearing in `/model`: try the OpenRouter-style slug (e.g. `/model anthropic/claude-opus-4.6`); file a GitHub issue if genuinely missing.
- Bills not appearing on the Portal account: `hermes portal info` should show "using Nous as inference provider"; if another provider is active, run `hermes model` and pick Nous Portal.

## Notes

- A note on Hermes 4: Hermes-4-70B and Hermes-4-405B are available at heavily discounted rates but are frontier hybrid-reasoning chat models and are **not recommended inside Hermes Agent**; they are tuned for chat and reasoning, not the rapid-fire tool-calling loop. Use a frontier agentic model (`anthropic/claude-sonnet-4.6`, `openai/gpt-5.5-pro`, `google/gemini-3-pro-preview`, `deepseek/deepseek-v4-pro`) for agent work. The Portal's own model info page carries the same warning.
- Subscription management: `portal.nousresearch.com/manage-subscription` or `hermes portal open`.
- The Tool Gateway feature page has the full per-tool configuration matrix; the Subscription Proxy lets non-Hermes tools use your Portal subscription.
- Source: https://hermes-agent.nousresearch.com/docs/integrations/nous-portal (pinned to v0.22.2)

## Related

- [MCP](../features/mcp.md)
- [Voice Mode](../features/voice-mode.md)
