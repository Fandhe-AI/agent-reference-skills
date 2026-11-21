---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/webhooks
---

# CCAI Platform Apps API chat webhooks

With webhooks, the Apps API sends your application a real-time notification each time a relevant event occurs during a chat session, for example when a chat is created, a message is received, or a chat is transferred or escalated. Webhooks are scoped to chat sessions on the Apps API. All supported chat webhook events are delivered as HTTP `POST` requests to a single webhook URL that you configure; there is no per-event subscription.

## Signature / Usage

### Before you begin

- You must be an administrator (or have a role with permission to edit Developer Settings).
- Prepare an endpoint that can receive HTTP `POST` requests. The webhook URL must use HTTPS.

### Turn on webhooks and set the URL

1. In the CCAI Platform portal, click **Settings > Developer Settings** (click **Menu** if you don't see **Settings**).
2. In the **Webhooks** pane, switch the **Webhooks** toggle on. When webhooks are off, no events are sent.
3. In **URL**, enter your webhook endpoint (HTTPS, accepts `POST`).
4. Select **Save** to apply the enabled state and URL.

Delivery begins after webhooks are enabled and a webhook URL and primary secret are set.

### Signing secrets

Every webhook request is signed. The signature is in the `X-Signature` request header and the signing timestamp is in `X-Signature-Timestamp`. You can configure up to two signing secrets:

- **Primary secret**: the main token used to sign webhook requests.
- **Secondary secret**: an optional second token. When set, each request is signed with both secrets, which lets you rotate secrets without missing events.

Generate each secret separately in the **Webhooks** pane (**Generate** in the **Primary Secret** or **Secondary Secret** section, then **Copy**). The full secret is shown only right after you generate it; afterward it is masked. A new secret takes effect immediately, so anything still using a replaced secret fails. Generating or rotating a secret does not require a save operation.

### Rotate signing secrets

When a primary secret exists, **Rotate Secrets** becomes available. Make sure both a primary and a secondary secret are set, click **Rotate Secrets** to swap them, then update your application to verify signatures against the new active secret. During the overlap each request is signed with both secrets, so accept either one.

### Signature format

The `X-Signature` header can contain a primary signature, a secondary signature, or both:

```text
primary=<primary_signature> secondary=<secondary_signature>
```

Each signature is a Base64-encoded HMAC-SHA256 digest. The signed value is:

```text
X-Signature-Timestamp + raw_request_body
```

### Verify a request

Read both headers and reject the request if either is missing, reject stale timestamps, read the raw body before parsing JSON, compute the expected signature with each active secret, compare in constant time, and accept the request if any active secret matches. In your handler, read the body once with `raw_body = read_webhook_body(request)` and reject the request when it returns `nil`: before reading, it rejects a request with a `Transfer-Encoding` header, a missing or non-numeric `Content-Length` and one above `MAX_WEBHOOK_BODY_BYTES`, using the raw Rack header values (`request.get_header("HTTP_TRANSFER_ENCODING")`, `request.get_header("CONTENT_LENGTH")`) rather than `request.content_length`, which reads the whole body when `Transfer-Encoding` is present; then reads at most `MAX_WEBHOOK_BODY_BYTES + 1` bytes with `request.body.read(MAX_WEBHOOK_BODY_BYTES + 1)` and rejects a longer body. `MAX_WEBHOOK_BODY_BYTES` (1 MiB here) is a value chosen for the example; the CCAI Platform docs give no maximum webhook body size. Also set a body size limit at the reverse proxy or load balancer in front of the app, so an oversized request is refused before it reaches Ruby. Then pass that `raw_body` to `verify_ujet_webhook!`, and only when it returns `true` parse the same `raw_body` with `JSON.parse`. The source's Ruby example:

Adapted (not in the official docs): the example also requires `active_support/core_ext/integer/time` (for `5.minutes`) and computes an expected signature only for a secret that is set and not empty; `verify_ujet_webhook!` takes the raw body as an argument instead of reading `request.body` itself; `read_webhook_body` and `MAX_WEBHOOK_BODY_BYTES` bound the body size before verification, from the raw `CONTENT_LENGTH` and `HTTP_TRANSFER_ENCODING` headers; and `X-Signature-Timestamp` must be exactly 10 ASCII digits before it is converted or signed.

```ruby
require "base64"
require "openssl"
require "active_support/security_utils"
require "active_support/core_ext/integer/time"

MAX_WEBHOOK_BODY_BYTES = 1_048_576

def read_webhook_body(request)
  return nil if request.get_header("HTTP_TRANSFER_ENCODING")

  length = request.get_header("CONTENT_LENGTH")
  return nil unless length.to_s.match?(/\A\d+\z/)
  return nil if length.to_i > MAX_WEBHOOK_BODY_BYTES

  raw_body = request.body.read(MAX_WEBHOOK_BODY_BYTES + 1) || ""
  return nil if raw_body.bytesize > MAX_WEBHOOK_BODY_BYTES

  raw_body
end

def parse_ujet_signature(header)
  header.to_s.split(/\s+/).each_with_object({}) do |part, result|
    key, value = part.split("=", 2)
    result[key] = value if key && value
  end
end

def expected_signature(secret, timestamp, raw_body)
  Base64.strict_encode64(
    OpenSSL::HMAC.digest(
      OpenSSL::Digest.new("sha256"),
      secret,
      "#{timestamp}#{raw_body}"
    )
  )
end

def secure_match?(received, expected)
  return false if received.nil? || expected.nil?
  return false unless received.bytesize == expected.bytesize

  ActiveSupport::SecurityUtils.secure_compare(received, expected)
end

def verify_ujet_webhook!(request, raw_body, primary_secret:, secondary_secret:)
  signature_header = request.headers["X-Signature"]
  timestamp = request.headers["X-Signature-Timestamp"]

  return false if signature_header.nil? || timestamp.nil?
  return false unless timestamp.match?(/\A\d{10}\z/)

  # Optional but recommended: reject stale requests.
  return false if (Time.now.utc - Time.at(timestamp.to_i).utc).abs > 5.minutes

  signatures = parse_ujet_signature(signature_header)

  expected = [
    (expected_signature(primary_secret, timestamp, raw_body) unless primary_secret.to_s.empty?),
    (expected_signature(secondary_secret, timestamp, raw_body) unless secondary_secret.to_s.empty?)
  ].compact

  received = [
    signatures["primary"],
    signatures["secondary"]
  ].compact

  received.any? do |received_signature|
    expected.any? do |expected_signature_value|
      secure_match?(received_signature, expected_signature_value)
    end
  end
end
```

### What your application receives

Each request body is a JSON envelope with `event_type`, `timestamp`, `chat_id`, and an event-specific `body`. Events cover lifecycle changes, participant activity, messages, transfers, escalations, web forms, and dismissal warnings.

## Notes

- Store the signing secrets in a server-side secret store; only the receiving server should hold them.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/chat-platform-api-guide (all three blocks and the verification steps; the webhooks page has no code of its own).
- Corrected from the official docs: the Ruby example's `5.minutes` needs Active Support's `active_support/core_ext/integer/time`, which the example does not require (outside Rails it raises `NoMethodError`), and it calls `expected_signature(secondary_secret, ...)` before `.compact`, so with no secondary secret (`nil`) `OpenSSL::HMAC.digest` raises `TypeError`, and an empty secret (`""`, for example an environment variable that is set but empty) is used as an HMAC key, so a signature computed with an empty key is accepted. The page skips a `nil` or empty secret, and if neither secret is set every request is rejected. The source's `verify_ujet_webhook!` also reads the body itself (`raw_body = request.body.read`) and returns only `true` / `false`, so a handler that reads `request.body` after verification gets an empty string from the consumed stream (with a `StringIO` body); the page has the handler read the body once and pass it in (`verify_ujet_webhook!(request, raw_body, primary_secret:, secondary_secret:)`), so the verified bytes are the ones parsed. The source reads the whole body with no size limit before checking the signature; the page bounds it first with `read_webhook_body`. It does not use `request.content_length`: in actionpack 8.1.4.1, `ActionDispatch::Request#content_length` is `return raw_post.bytesize if has_header?(TRANSFER_ENCODING)` (`TRANSFER_ENCODING = "HTTP_TRANSFER_ENCODING"`), and `raw_post` reads the body stream, which with `Transfer-Encoding` present is `body_stream.read # Read body stream until EOF` (https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_dispatch/http/request.rb). The page therefore rejects any request with `Transfer-Encoding`; the CCAI Platform docs do not say whether webhook requests use `Content-Length` or chunked transfer, so if yours arrive chunked, let the reverse proxy buffer and limit them instead. In a Rails controller, also turn off parameter wrapping for the webhook controller (`wrap_parameters false`): when it is enabled for the request's format, `ActionController::ParamsWrapper#process_action` calls `request.request_parameters` before the action runs (https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_controller/metal/params_wrapper.rb), which parses the body before `read_webhook_body` can limit it. The source also converts the timestamp with `timestamp.to_i`, which turns a value such as `1700000000abc` into `1700000000`, so the freshness check and the HMAC input (`"#{timestamp}#{raw_body}"`, the raw header) would read the same header differently; the page rejects any timestamp that is not exactly 10 ASCII digits (`/\A\d{10}\z/`) before `Time.at` and before computing an HMAC. The docs do not state the header's format; the source interprets it as Unix seconds (`Time.at(timestamp.to_i)` compared with a 5-minute window), and Unix seconds have 10 digits from 2001-09-09 until 2286-11-20, so a value of any other length would fail the source's own freshness check today. All six were checked with Ruby 3.4.7 and activesupport 7.2.3 against a stub request with a `StringIO` body and a Rack-style `get_header`. It also assumes a Rails-style `request` (`request.headers`, `request.body`, and `request.get_header` for the Rack environment).
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/webhooks (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [chat-platform-api-guide.md](./chat-platform-api-guide.md)
- [apps-and-manager-apis.md](./apps-and-manager-apis.md)
