# xAI Grok OAuth (SuperGrok / X Premium+)

Sign in with a SuperGrok or X Premium+ subscription to use Grok models in Hermes Agent via OAuth device code, with no API key.

## Signature / Usage

```bash
hermes model                              # select "xAI Grok OAuth (SuperGrok / X Premium+)"
hermes auth add xai-oauth
hermes auth add xai-oauth --no-browser    # remote / headless: open the printed verification URL anywhere
hermes doctor
hermes auth logout xai-oauth
hermes auth list xai-oauth
hermes auth remove xai-oauth <index|id|label>
```

```bash
hermes config set model.default grok-4.6
hermes config set model.provider xai-oauth
hermes --provider xai-oauth
```

```yaml
model:
  default: grok-4.6
  provider: xai-oauth
  base_url: https://api.x.ai/v1
```

API-key fallback:

```bash
export XAI_API_KEY=xai-...
hermes config set model.provider xai
```

## Options / Props

| Item | Value |
|------|-------|
| Provider ID | `xai-oauth` |
| Aliases | `grok-oauth`, `x-ai-oauth`, `xai-grok-oauth` |
| Auth type | Browser OAuth 2.0 device code (`accounts.x.ai`) |
| Transport | xAI Responses API (`codex_responses`) |
| Default model | `grok-4.6` |
| Endpoint | `https://api.x.ai/v1` (`XAI_BASE_URL` override) |

| Tool | Model |
|------|-------|
| Chat | `grok-4.6`, `grok-build-0.1`, `grok-4.3`, `grok-4.20-0309-reasoning`, `grok-4.20-0309-non-reasoning`, `grok-4.20-multi-agent-0309` |
| Image | `grok-imagine-image`, `grok-imagine-image-2.0`, `grok-imagine-image-quality` |
| Video | `grok-imagine-video`, `grok-imagine-video-1.5-preview` (alias `grok-imagine-video-1.5-2026-05-30`) |
| TTS | default voice via xAI `/v1/tts` |

## Notes

- Needs an active SuperGrok subscription, or X Premium+ on the signed-in X account (xAI links it automatically). `XAI_API_KEY` is not used for this provider.
- xAI may restrict OAuth API access by tier: standard SuperGrok subscribers have been seen to get `HTTP 403` after a successful login (issue #26847); fall back to `XAI_API_KEY` with `provider: xai`.
- The same OAuth token covers TTS, image generation, video generation, transcription, and X search; pick backends via `hermes tools`. `video_gen` is disabled by default and must be enabled in `hermes tools`. `x_search` auto-enables when xAI credentials exist and prefers OAuth over `XAI_API_KEY`.
- No SSH tunnel or local callback listener is needed (device code).
- The chat catalog derives live from the on-disk `models.dev` cache, with `grok-4.6` pinned on top.
- Terminal refresh failure (`invalid_grant`, revoked, HTTP 4xx) quarantines the refresh token locally; run `hermes auth add xai-oauth` again. A timed-out device-code approval needs a re-run.
- "No xAI credentials found": log in or set `XAI_API_KEY`.
- Logout clears the singleton OAuth entry in `auth.json` and credential-pool rows for `xai-oauth`.

## Related

- [oauth-over-ssh](./oauth-over-ssh.md)
- [minimax-oauth](./minimax-oauth.md)
