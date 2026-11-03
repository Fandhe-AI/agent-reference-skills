---
source: https://developers.cloudflare.com/queues/reference/error-codes/
---

# Error codes

Error codes returned by the Queues JavaScript binding and the Queues REST API.

## Signature / Usage

Adapted (not in the official docs): wrapped in a `fetch` handler so it runs as written; the oversized `delaySeconds` deliberately triggers error 10203.

```js
export default {
	async fetch(req, env, ctx) {
		try {
			await env.MY_QUEUE.send("message", { delaySeconds: 999999 });
			return new Response("Sent message to the queue");
		} catch (error) {
			console.error(error);
			return new Response("Failed to send message to the queue", { status: 500 });
		}
	},
};
```

REST error body:

```json
{
  "errors": [
    {
      "code": 7003,
      "message": "No route for the URI",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    "string"
  ],
  "success": true
}
```

## Options / Props

### Client side errors

| Code | Error | Details | Recommended action |
| --- | --- | --- | --- |
| 10104 | QueueNotFound | Queue does not exist | Check `queue_id` against the List Queues endpoint. |
| 10106 | Unauthorized | Unauthorized request | Ensure the user has permission to push to that queue. |
| 10107 | QueueIDMalformed | Queue ID in the URL is not valid | Use only alphanumeric characters in `queue_id`. |
| 10201 | ClientDisconnected | Client disconnected during processing | Consider increasing the timeout and retrying the send. |
| 10202 | BatchDelayInvalid | Invalid batch delay | `batch_delay` must be within 1 and 86400 seconds. |
| 10203 | MessageMetadataInvalid | Invalid metadata (content type or delay) | `contentType` must be `text`, `bytes`, `json` or `v8`; delay must not exceed 24 hours. |
| 10204 | MessageSizeOutOfBounds | Message size out of bounds | Message size within 0 and 128 KB. |
| 10205 | BatchSizeOutOfBounds | Batch size out of bounds | Batch size within 0 and 256 KB. |
| 10206 | BatchCountOutOfBounds | Batch count out of bounds | Batch count within 0 and 100 messages. |
| 10207 | JSONRequestBodyInvalid | JSON body does not match schema | Match the expected schema. |
| 10208 | JSONRequestBodyMalformed | Body is not valid JSON | Check the error message for details. |

### 429 errors

| Code | Error | Details | Recommended action |
| --- | --- | --- | --- |
| 10250 | QueueOverloaded | Queue is overloaded | Temporarily back off sending. |
| 10251 | QueueStorageLimitExceeded | Queue storage limit exceeded | Purge the queue or wait for the backlog to drain. |
| 10252 | QueueDisabled | Queue disabled | Unpause (resume delivery of) the queue. |
| 10253 | FreeTierLimitExceeded | Free tier limit exceeded | Upgrade to Workers Paid. |

### 500 errors

| Code | Error | Details | Recommended action |
| --- | --- | --- | --- |
| 15000 | UnknownInternalError | Unknown error | — |

## Notes

- For the JavaScript API, operations throw exceptions; the error code is at the end of the `message` property.
- For the Cloudflare API, the response has an `errors` array with `code` and `message`.
- The REST error body above is the page's schema placeholder (`"success": true`, placeholder strings). An actual failed request returns `"success": false` with the populated `errors` array; check `success` and the HTTP status rather than the presence of `errors` alone.

## Related

- [Producer API](./producer-api.md)
- [Limits](./limits.md)
- [Pause and Purge](./pause-purge.md)
