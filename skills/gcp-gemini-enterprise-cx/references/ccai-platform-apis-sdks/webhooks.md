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

Read both headers and reject the request if either is missing, reject stale timestamps, read the raw body before parsing JSON, compute the expected signature with each active secret, compare in constant time, and accept the request if any active secret matches. In your handler (in Rails, a Rack endpoint, not a controller action; see Notes), read the body once with `raw_body = read_webhook_body(request)` and reject the request when it returns `nil`: before reading, it rejects a request with a `Transfer-Encoding` header, and a `Content-Length` that is present but non-numeric or above `MAX_WEBHOOK_BODY_BYTES`, using the raw Rack header values (`request.get_header("HTTP_TRANSFER_ENCODING")`, `request.get_header("CONTENT_LENGTH")`) rather than `request.content_length`, which reads the whole body when `Transfer-Encoding` is present; then reads at most `MAX_WEBHOOK_BODY_BYTES + 1` bytes with `request.body.read(MAX_WEBHOOK_BODY_BYTES + 1)` and rejects a longer body. A request without `Content-Length` is not rejected; its size is checked by that bounded read, which assumes the server and Rack handle the HTTP framing so that `read(n)` stops at `n` bytes or at the end of the body. `MAX_WEBHOOK_BODY_BYTES` (1 MiB here) is a value chosen for the example; the CCAI Platform docs give no maximum webhook body size. Also set a body size limit at the reverse proxy or load balancer in front of the app, so an oversized request is refused before it reaches Ruby. Then pass that `raw_body` to `verify_ujet_webhook!`, and only when it returns `true` parse the same `raw_body` with `JSON.parse`. The source's Ruby example:

Adapted (not in the official docs): the example also requires `active_support/core_ext/integer/time` (for `5.minutes`) and computes an expected signature only for a secret that is set and not empty; `verify_ujet_webhook!` takes the raw body as an argument instead of reading `request.body` itself; `read_webhook_body` and `MAX_WEBHOOK_BODY_BYTES` bound the body size before verification, from the raw `CONTENT_LENGTH` and `HTTP_TRANSFER_ENCODING` headers when present and with a bounded read; and `X-Signature-Timestamp` must be exactly 10 ASCII digits before it is converted or signed.

```ruby
require "base64"
require "openssl"
require "active_support/security_utils"
require "active_support/core_ext/integer/time"

MAX_WEBHOOK_BODY_BYTES = 1_048_576

def read_webhook_body(request)
  return nil if request.get_header("HTTP_TRANSFER_ENCODING")

  length = request.get_header("CONTENT_LENGTH")
  unless length.nil?
    return nil unless length.match?(/\A\d+\z/)
    return nil if length.to_i > MAX_WEBHOOK_BODY_BYTES
  end

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
- Corrected from the official docs: the Ruby example's `5.minutes` needs Active Support's `active_support/core_ext/integer/time`, which the example does not require (outside Rails it raises `NoMethodError`), and it calls `expected_signature(secondary_secret, ...)` before `.compact`, so with no secondary secret (`nil`) `OpenSSL::HMAC.digest` raises `TypeError`, and an empty secret (`""`, for example an environment variable that is set but empty) is used as an HMAC key, so a signature computed with an empty key is accepted. The page skips a `nil` or empty secret, and if neither secret is set every request is rejected. The source's `verify_ujet_webhook!` also reads the body itself (`raw_body = request.body.read`) and returns only `true` / `false`, so a handler that reads `request.body` after verification gets an empty string from the consumed stream (with a `StringIO` body); the page has the handler read the body once and pass it in (`verify_ujet_webhook!(request, raw_body, primary_secret:, secondary_secret:)`), so the verified bytes are the ones parsed. The source reads the whole body with no size limit before checking the signature; the page bounds it first with `read_webhook_body`. It does not use `request.content_length`: in actionpack 8.1.4.1, `ActionDispatch::Request#content_length` is `return raw_post.bytesize if has_header?(TRANSFER_ENCODING)` (`TRANSFER_ENCODING = "HTTP_TRANSFER_ENCODING"`), and `raw_post` reads the body stream, which with `Transfer-Encoding` present is `body_stream.read # Read body stream until EOF` (https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_dispatch/http/request.rb). The page therefore rejects any request with `Transfer-Encoding`; the CCAI Platform docs do not say whether webhook requests use `Content-Length` or chunked transfer, so if yours arrive chunked, let the reverse proxy buffer and limit them instead. A request with no `Content-Length` header is accepted for reading, and its size is checked only by the bounded `request.body.read(MAX_WEBHOOK_BODY_BYTES + 1)`; a `Content-Length` that is present must be digits only and at most `MAX_WEBHOOK_BODY_BYTES`. In Rails, do not receive the webhook in an `ActionController` action: in actionpack 8.1.4.1, `ActionController::Instrumentation#process_action` builds its payload with `params: request.filtered_parameters` before the action runs (https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_controller/metal/instrumentation.rb), and `ActionController::ParamsWrapper#process_action` calls `request.request_parameters` when wrapping is enabled for the format (https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_controller/metal/params_wrapper.rb), so the JSON body is parsed before `read_webhook_body` and the signature check run, whatever `wrap_parameters` says. Route the webhook path to a Rack application instead; the Rails routing guide says a route can point at "any Rack application" that "responds to `call` and returns a `[status, headers, body]`", and shows a lambda route `get '/health', to: ->(env) { [204, {}, ['']] }` (https://github.com/rails/rails/blob/v8.1.4.1/guides/source/routing.md#routing-to-rack-applications). In that application, wrap `env` in `ActionDispatch::Request.new(env)` (not `Rack::Request`, which has no `headers` method, while the example reads `request.headers[...]`) and call `read_webhook_body`, then `verify_ujet_webhook!`, then `JSON.parse` on the same `raw_body`. Checked with Ruby 3.4.7, actionpack 8.1.4.1 and rack 3.2.9 by drawing `post "/ujet/webhook", to: app` on an `ActionDispatch::Routing::RouteSet` and calling the route set with mock requests: a valid JSON request reached `JSON.parse` with neither `RAW_POST_DATA` nor the parsed request parameters (`action_dispatch.request.request_parameters`) set in `env`; a body over `MAX_WEBHOOK_BODY_BYTES` without `Content-Length`, and a request with `Transfer-Encoding`, got 413; a bad signature got 401; and `request.filtered_parameters` on the same kind of request parsed the JSON body and set both keys. This covers the router and the endpoint only, not middleware that runs before the router: in rack 3.2.9, `Rack::MethodOverride` (in the Rails middleware stack unless `config.api_only`, https://github.com/rails/rails/blob/v8.1.4.1/railties/lib/rails/application/default_middleware_stack.rb) calls `req.POST` on a POST whose content type is form data or multipart, which parses that body before the router, so keep the reverse proxy's body size limit in front of the application. The source also converts the timestamp with `timestamp.to_i`, which turns a value such as `1700000000abc` into `1700000000`, so the freshness check and the HMAC input (`"#{timestamp}#{raw_body}"`, the raw header) would read the same header differently; the page rejects any timestamp that is not exactly 10 ASCII digits (`/\A\d{10}\z/`) before `Time.at` and before computing an HMAC. The docs do not state the header's format; the source interprets it as Unix seconds (`Time.at(timestamp.to_i)` compared with a 5-minute window), and Unix seconds have 10 digits from 2001-09-09 until 2286-11-20, so a value of any other length would fail the source's own freshness check today. All six were checked with Ruby 3.4.7 and activesupport 7.2.3 against a stub request with a `StringIO` body and a Rack-style `get_header`. It also assumes a Rails-style `request` (`request.headers`, `request.body`, and `request.get_header` for the Rack environment).
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/webhooks (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_dispatch/http/request.rb (actionpack 8.1.4.1, retrieved 2026-11-21)
- Source: https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_controller/metal/params_wrapper.rb (actionpack 8.1.4.1, retrieved 2026-11-21)
- Source: https://github.com/rails/rails/blob/v8.1.4.1/actionpack/lib/action_controller/metal/instrumentation.rb (actionpack 8.1.4.1, retrieved 2026-11-21)
- Source: https://github.com/rails/rails/blob/v8.1.4.1/guides/source/routing.md#routing-to-rack-applications (Rails Guides at v8.1.4.1, retrieved 2026-11-21)
- Source: https://github.com/rails/rails/blob/v8.1.4.1/railties/lib/rails/application/default_middleware_stack.rb (railties 8.1.4.1, retrieved 2026-11-21)
- Source: https://github.com/rack/rack/blob/v3.2.9/lib/rack/method_override.rb (rack 3.2.9, read from the installed gem 2026-11-21)

## Related

- [chat-platform-api-guide.md](./chat-platform-api-guide.md)
- [apps-and-manager-apis.md](./apps-and-manager-apis.md)
