# X (Twitter) Search

The `x_search` tool searches X posts, profiles and threads using xAI's built-in `x_search` Responses tool at `https://api.x.ai/v1/responses`. Grok runs the search server-side and returns a synthesized answer with citations. Use it for discussion and reactions on X; keep `web_search` for general web pages.

## Signature / Usage

```yaml
# ~/.hermes/config.yaml
x_search:
  model: grok-4.5
  # reasoning_effort: low       # low | medium | high | xhigh (xhigh only on models documenting it)
  timeout_seconds: 180          # minimum 30
  retries: 2                    # on 5xx / ReadTimeout / ConnectionError
```

```bash
hermes tools                    # toggle "X (Twitter) Search"
hermes auth add xai-oauth       # SuperGrok / X Premium+ OAuth
```

## Options / Props

| Parameter | Type | Description |
|-----------|------|-------------|
| `query` | string (required) | What to look up on X |
| `allowed_x_handles` | string array | Include only these handles (max 10, leading `@` stripped) |
| `excluded_x_handles` | string array | Exclude handles (max 10); mutually exclusive with `allowed_x_handles` |
| `from_date` | string | `YYYY-MM-DD` start date |
| `to_date` | string | `YYYY-MM-DD` end date |
| `enable_image_understanding` | boolean | Analyze images attached to matching posts |
| `enable_video_understanding` | boolean | Analyze videos attached to matching posts |

Result JSON fields: `answer`, `citations`, `inline_citations` (`url`, `title`, `start_index`, `end_index`), `degraded`, `degraded_reason`, `credential_source` (`xai-oauth` or `xai`), `model`, `query`, `provider`, `tool`, `success`.

## Notes

- Registers when either `XAI_API_KEY` or an xAI OAuth login is available; when both exist the API key wins (OAuth answers in a degraded explanatory mode with no citations), which means metered API billing. Tools with revoked tokens and failed refresh are hidden from the schema.
- `degraded: true` means a narrowing filter (handles or dates) was set and both citation channels were empty, so the answer came from the model's own knowledge and is unsourced.
- Dates are validated client-side: both must parse as `YYYY-MM-DD`, `from_date` must not be after `to_date` or after today (UTC); a future `to_date` is allowed. Failures return `{"error": "..."}` without an HTTP call.
- `x_search` is read-only discovery. Posting, replying, liking, DMs, media upload and authenticated reads belong to the `xurl` skill; an `x_search` answer is never evidence that a write happened.
- Errors: "No xAI credentials available" (set `XAI_API_KEY` or run `hermes auth add xai-oauth`, restart the session); "`x_search` is not enabled for this model" (switch to `grok-4.5` or another model with the tool).

## Related

- [Web Search](./web-search.md)
- [Tool Gateway](./tool-gateway.md)
