# Nous Portal

Nous Research's unified subscription gateway and the recommended way to run Hermes Agent. Consolidates access to 300+ frontier models, a managed Tool Gateway, and simplified credential management under a single OAuth login and billing relationship.

## What It Provides

- **Single subscription covering 300+ frontier models** from Anthropic, OpenAI, Google, DeepSeek, and others
- **Unified Tool Gateway** routing web search, image generation, text-to-speech, browser automation, and cloud terminals through managed infrastructure
- **Simplified credential management** requiring only one refresh token instead of multiple API keys
- **Cross-platform consistency**, particularly benefiting Windows users

## Setup & Configuration

```bash
hermes setup --portal   # OAuth login, model selection, provider config, Tool Gateway enablement
```

Users without a subscription should sign up first at `portal.nousresearch.com/manage-subscription`.

To add Portal to an existing installation:

```bash
hermes model            # then select "Nous Portal" from the provider list
```

Existing providers remain configured alongside the Portal. For SSH/browser-less environments, the same port-forwarding patterns as the OAuth-over-SSH guide apply.

### Resulting Configuration

`~/.hermes/config.yaml`:

```yaml
model:
  provider: nous
  default: anthropic/claude-sonnet-4.6  # user-selected model
  base_url: https://inference-api.nousresearch.com/v1

web:
  backend: firecrawl
  use_gateway: true
image_gen:
  use_gateway: true
tts:
  provider: openai
  use_gateway: true
browser:
  cloud_provider: browser-use
  use_gateway: true
```

OAuth refresh tokens are stored separately in `~/.hermes/auth.json`.

## Commands

| Command | Purpose |
|---------|---------|
| `hermes portal` | Login and configure Portal |
| `hermes portal info` | Display auth status and subscription details |
| `hermes portal tools` | View Tool Gateway catalog and routing |
| `hermes portal open` | Open subscription management in browser |
| `/model [name]` | Switch models mid-session |
| `hermes tools` | Configure per-tool backends |

## Tool Gateway

| Capability | Backend |
|------------|---------|
| Web search & extract | Firecrawl |
| Image generation | FAL (nine models, incl. FLUX 2, GPT Image variants) |
| Text-to-speech | OpenAI TTS |
| Browser automation | Browser Use (headless Chromium) |
| Cloud terminal (optional add-on) | Modal |

Portal-managed tools can be mixed with existing backends — e.g. route web search and images through Nous while keeping a separate Browserbase account for browser automation.

## Token Handling

Hermes mints a short-lived JWT from the stored Portal refresh token on each inference call rather than reusing a long-lived API key. Refresh logic is automatic; invalid tokens are quarantined locally to prevent repeated failed requests.

## Notes

- Nous Research's Hermes 4 models (70B/405B) are available at discounted rates via the Portal but are **not recommended for Hermes Agent use** — they are tuned for chat/reasoning, not the rapid-fire tool-calling loop the agent relies on. Use frontier agentic models (Claude Sonnet, GPT-5.5 Pro, Gemini 3 Pro, etc.) instead.
- **Not logged in**: run `hermes portal` or `hermes model` and re-select Nous Portal.
- **Re-authentication required**: refresh token invalidated (password change, manual revoke, expiry) — run `hermes auth add nous`.
- **Model not appearing**: try the OpenRouter-style slug directly (e.g. `/model anthropic/claude-opus-4.6`); file a GitHub issue if genuinely missing.
- **Billing gaps**: verify via `hermes portal info` that Nous is the active provider; run `hermes model` to correct drift.

## Related

- [MCP](../features/mcp.md)
- [Voice Mode](../features/voice-mode.md)
