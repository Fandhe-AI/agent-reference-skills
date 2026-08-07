# Verifying Webhooks

Verify inbound OpenAI webhook requests with `client.webhooks.unwrap`, then react to the event type (e.g. fetch the completed response).

```python
import os
from openai import OpenAI, InvalidWebhookSignatureError
from flask import Flask, request, Response

app = Flask(__name__)
client = OpenAI(webhook_secret=os.environ["OPENAI_WEBHOOK_SECRET"])


@app.route("/webhook", methods=["POST"])
def webhook():
    try:
        # with webhook_secret set above, unwrap raises if the signature is invalid
        event = client.webhooks.unwrap(request.get_data(as_text=True), request.headers)

        if event.type == "response.completed":
            response_id = event.data.id
            response = client.responses.retrieve(response_id)
            print("Response output:", response.output_text)

        return Response(status=200)
    except InvalidWebhookSignatureError as e:
        print("Invalid signature", e)
        return Response("Invalid signature", status=400)


if __name__ == "__main__":
    app.run(port=8000)
```

## Notes

- `client.webhooks.unwrap(request.get_data(as_text=True), request.headers)` both verifies the `webhook-signature` header and parses the payload into a typed event; catch `InvalidWebhookSignatureError` and return HTTP 400 on failure.
- Pass the raw request body exactly as received — as text (`request.get_data(as_text=True)`), not a parsed/re-serialized JSON object — or signature verification fails.
- Combine with `background=True` on `responses.create` (see `background-responses.md`) to avoid polling: the webhook fires `response.completed` / `response.failed` when the long-running response finishes.
- Example from the OpenAI API (developers.openai.com) `guides/webhooks` page.
