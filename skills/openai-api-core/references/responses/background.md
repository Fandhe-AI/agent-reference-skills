# Background mode

Run long-running reasoning-model tasks asynchronously without client-side timeout concerns; poll or stream the response until completion.

## Signature / Usage

```bash
curl https://api.openai.com/v1/responses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-5.6",
    "background": true,
    "input": "Long running analysis task..."
  }'
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| background | boolean | false | Runs the response asynchronously; poll the GET Responses endpoint (`queued` / `in_progress` → terminal state) to track completion |
| stream | boolean | false | Can be combined with `background: true` for immediate event streaming; reconnect and resume using the `sequence_number` cursor if the connection drops |

## Notes

- Response data is temporarily stored to disk for roughly 10 minutes to enable asynchronous execution and polling.
- Background responses can be cancelled via a POST request to the cancel endpoint; cancellation is idempotent (repeated calls just return the final Response object).
- Time to first token for a background response is higher than for a synchronous one.
- Zero Data Retention (ZDR) projects automatically run background requests with `store=false`, though temporary disk storage still occurs to support async execution.
- Supported models include GPT-5.2, GPT-5.2 Pro, and GPT-5.6.

## Related

- [conversation-state](./conversation-state.md)
