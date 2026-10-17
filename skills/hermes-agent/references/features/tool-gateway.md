# Nous Tool Gateway

Included with every paid Nous Portal subscription, the Tool Gateway routes Hermes tool calls (web search and extract, image generation, text-to-speech, cloud browser automation) through infrastructure Nous runs, so no separate vendor accounts or keys are needed. Billed pay-as-you-use against the subscription; bring your own keys per tool at any time.

## Signature / Usage

```bash
hermes setup --portal     # fresh install: Nous OAuth + set Nous as provider + enable the gateway
hermes model              # switch provider to Nous Portal; offers to enable the gateway for all tools
hermes tools              # per-tool: pick "Nous Subscription"
hermes portal info        # Portal auth + gateway routing summary
hermes portal tools       # gateway catalog with current routing per tool
hermes status --full
```

```yaml
web:
  backend: nous          # web search/extract via the Tool Gateway
image_gen:
  provider: nous
tts:
  provider: nous
stt:
  provider: nous
browser:
  cloud_provider: nous
```

## Options / Props

| Tool | Selection key | Notes |
|---|---|---|
| Web search & extract | `web.backend` (or `web.search_backend` / `web.extract_backend`) | Search and extract can route independently, e.g. `search_backend: firecrawl`, `extract_backend: nous` |
| Image generation | `image_gen.provider` | One Nous Subscription row spans FAL catalog, native Krea 2, Nous Portal image models |
| TTS | `tts.provider` | OpenAI TTS voices |
| STT | `stt.provider` | |
| Cloud browser | `browser.cloud_provider` | Headless Chromium via Browser Use |

| Self-hosted gateway env | Purpose |
|---|---|
| `TOOL_GATEWAY_DOMAIN` / `TOOL_GATEWAY_SCHEME` | Reshape all `{label}-gateway.<domain>` hosts |
| `TOOL_GATEWAY_USER_TOKEN` | Normally auto-populated from Portal login |
| `FIRECRAWL_GATEWAY_URL`, `TOOL_GATEWAY_URL`, `CONNECTOR_GATEWAY_URL` | Pin one host exactly |

## Notes

- The runtime always uses the stored selection; credential presence never reroutes a configured category. `image_gen.provider: fal` without `FAL_KEY` errors rather than falling back. Never-configured categories autodetect from credentials.
- Eligibility: paid subscription; some accounts have a free tool pool (FAL image models only).
- `hermes tools` always lists Nous-managed backends (Web, Image, Video, TTS, Browser); selecting one logs you in inline, enabling only that tool without switching the inference provider.
- Enablement checklist after `hermes model`: explicitly configured alternative backends are never offered; env-only configs are offered unchecked; declined tools are stored in `tool_gateway_declined_tools`.
- Image model is stored as `image_gen.model`; no per-call override. With none set, a paid subscription gets Krea 2 Medium Turbo and the free pool gets FLUX 2 Klein 9B. Krea gateway failures fall back to the FAL default model (`fallback_from` reported); disable with `image_gen.krea.fallback_to_fal: false`; requests with source images never fall back.
- Multiple connector accounts: names are 1-32 characters (lowercase letters, digits, `-`, starting with a letter or digit); no default account; once two or more are active every connector tool takes a `connector_alias` field. Reconnecting replaces an account and keeps the old one as retired; removal is user-only. Manage via the desktop Connectors page, `/connectors` in the TUI, `hermes connectors`, or Nous Portal.
- The legacy `use_gateway: true` flag is deprecated and is read as `nous`; it is never written.
- Modal (serverless terminal) is an optional add-on, not part of the default bundle. Direct keys in `.env` are ignored (not deleted) while the selection is Nous Subscription. Expired subscription: gateway tools stop until renewed or switched to direct keys.
- Source: https://hermes-agent.nousresearch.com/docs/user-guide/features/tool-gateway (pinned to v0.22.2)

## Related

- [Web Search](./web-search.md)
- [Image Generation](./image-generation.md)
- [TTS](./tts.md)
- [Browser](./browser.md)
- [Tool Search](./tool-search.md)
