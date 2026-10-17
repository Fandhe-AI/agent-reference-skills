# MiniMax OAuth

Log into MiniMax via browser OAuth (PKCE) and use MiniMax-M2.7 models in Hermes Agent, with no API key.

## Signature / Usage

```bash
hermes model                              # select "MiniMax (OAuth)"
hermes auth add minimax-oauth
hermes auth add minimax-oauth --no-browser   # remote / headless: prints URL and user code
hermes auth logout minimax-oauth
hermes doctor                             # "MiniMax OAuth (logged in, region=global)"
```

```bash
hermes config set model.default MiniMax-M2.7
hermes config set model.provider minimax-oauth
hermes --provider minimax-oauth
```

```yaml
model:
  default: MiniMax-M2.7
  provider: minimax-oauth
  base_url: https://api.minimax.io/anthropic
```

## Options / Props

| Item | Value |
|------|-------|
| Provider ID | `minimax-oauth` |
| Aliases | `minimax-portal`, `minimax-global`, `minimax_oauth` |
| Auth type | Browser OAuth (PKCE redirect flow) |
| Transport | `anthropic_messages` (Anthropic Messages-compatible `/anthropic`) |
| Models | `MiniMax-M2.7` (long-context reasoning, tool-calling), `MiniMax-M2.7-highspeed` (lower latency) |
| Context | Up to 200,000 tokens |
| Global endpoint | `https://api.minimax.io/anthropic` |
| China endpoint | `https://api.minimaxi.com/anthropic` (provider `minimax-cn`) |

| Variable | Effect |
|----------|--------|
| `MINIMAX_API_KEY` | Used by `minimax` provider only; ignored for `minimax-oauth` |
| `MINIMAX_CN_API_KEY` | Used by `minimax-cn` provider only |

## Notes

- Flow: Hermes generates a PKCE verifier/challenge and state, POSTs to `{base_url}/oauth/code` to get `user_code` and `verification_uri`, polls `{base_url}/oauth/token`, and stores `access_token`, `refresh_token`, and expiry in `~/.hermes/auth.json` under `minimax-oauth`. Tokens refresh at session start when within 60 seconds of expiry.
- China-platform accounts use the API-key `minimax-cn` provider (`echo 'MINIMAX_CN_API_KEY=your-key' >> ~/.hermes/.env`); `minimax-cn` has no OAuth flow.
- Needs a MiniMax account. The official guide lists "Python 3.9+", but current first-party Hermes installations run on Python 3.14 (see installation.md); follow the installation guide's runtime requirement.
- `MiniMax-M2.7` is also used automatically as the auxiliary model for vision and delegation when `minimax-oauth` is primary.
- Terminal refresh failure (HTTP 4xx, `invalid_grant`, `refresh_token_reused`, revoked) quarantines the refresh token locally; run `hermes auth add minimax-oauth` again.
- Authorization timeout: re-run the login. State mismatch (possible CSRF): re-run, check for proxies modifying the response.
- "Provider 'minimax-oauth' is set in config.yaml but no credentials were found": log in, or switch to `minimax` with an API key.
- Source: https://hermes-agent.nousresearch.com/docs/guides/minimax-oauth (pinned to v0.22.2)

## Related

- [oauth-over-ssh](./oauth-over-ssh.md)
- [xai-grok-oauth](./xai-grok-oauth.md)
- [installation](../getting-started/installation.md)
