---
source: https://developers.cloudflare.com/queues/examples/publish-to-a-queue-via-http/
---

# Publish to a Queue via HTTP

Push a message to a queue from any HTTP client using a Cloudflare API token with the `Queues Edit` permission.

## Signature / Usage

Adapted (not in the official docs): the token is read from an environment variable instead of being pasted inline, the variables are quoted, and a JSON `Content-Type` header matches the JSON body. See Notes.

```sh
# Set CLOUDFLARE_API_TOKEN, CLOUDFLARE_ACCOUNT_ID and QUEUE_ID in your shell first.
curl -XPOST \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/queues/${QUEUE_ID}/messages" \
  --data '{ "body": { "greeting": "hello" } }'
```

Expected response:

```sh
{"success":true}
```

## Notes

- Adapted from the official docs: the official command pastes the token, account ID, and queue ID inline and sends the JSON body with curl's default `application/x-www-form-urlencoded` type; here they come from quoted environment variables and the body is sent as `application/json`.
- A successful request returns HTTP 200 with `success: true`.
- HTTP 403 means the API token is invalid or lacks the `Queues Edit` permission.
- `QUEUE_ID` is the queue's ID, not its name. Keep the token out of shell history and version control.
- Full HTTP Push API documentation: https://developers.cloudflare.com/api/resources/queues/subresources/messages/

## Related

- [Producer API](../references/queues/producer-api.md)
- [Get started](../references/queues/get-started.md)
