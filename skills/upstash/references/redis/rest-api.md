# REST API

HTTP-based interface for Upstash Redis. Translates Redis commands into REST endpoints. Useful for edge runtimes, browsers, and any environment that supports HTTP but not TCP.

## Signature / Usage

```bash
# GET request — command/arg1/arg2/...
curl https://<db>.upstash.io/set/foo/bar \
  -H "Authorization: Bearer $TOKEN"

# GET request — read value
curl https://<db>.upstash.io/get/foo \
  -H "Authorization: Bearer $TOKEN"

# POST request — for JSON or binary values
curl -X POST https://<db>.upstash.io/set/key \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"field":"value"}'

# Pipeline — multiple commands in one request
curl -X POST https://<db>.upstash.io/pipeline \
  -H "Authorization: Bearer $TOKEN" \
  -d '[["SET","key","val"],["GET","key"]]'

# Transaction — atomic multi-exec
curl -X POST https://<db>.upstash.io/multi-exec \
  -H "Authorization: Bearer $TOKEN" \
  -d '[["SET","key","val"],["GET","key"]]'

# MONITOR over Server-Sent Events
curl -X POST https://<db>.upstash.io/monitor \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept:text/event-stream"

# SUBSCRIBE (SSE) and PUBLISH
curl -X POST https://<db>.upstash.io/subscribe/chat \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept:text/event-stream"
curl -X POST https://<db>.upstash.io/publish/chat/hello \
  -H "Authorization: Bearer $TOKEN"
```

## Options / Props

| Header / Param | Description |
|----------------|-------------|
| `Authorization: Bearer $TOKEN` | Standard auth header |
| `?_token=TOKEN` | Token as query parameter (alternative to header) |
| `Upstash-Encoding: base64` | Receive response values as base64 (all strings except `"OK"`). Without it, invalid UTF-8 bytes are replaced by U+FFFD |
| `Upstash-Response-Format: resp2` | Receive the response as binary RESP2 (`application/octet-stream`) instead of JSON; default `json`, any other value gives HTTP 400 |

## Notes

- Endpoint pattern: `REST_URL/COMMAND/arg1/arg2/...`
- Successful responses return `{ "result": ... }`; failures return `{ "error": "..." }`
- HTTP status codes: `200` success, `400` bad request / syntax error / invalid or unsupported command / command execution failure, `401` unauthorized (missing or invalid token), `405` method not allowed (only `HEAD`, `GET`, `POST` and `PUT` are allowed)
- `/pipeline` sends multiple commands in one HTTP request; execution is **not atomic**
- `/multi-exec` executes commands atomically (equivalent to `MULTI`/`EXEC`)
- `POST` body is appended as the last command argument; arguments after the value go in the query string (`/set/foo?EX=100`), or send the whole command as a JSON array body
- `/monitor` and `/subscribe/<channel>` stream events with Server-Sent Events (`Accept:text/event-stream`); `/publish/<channel>/<message>` publishes. Output lines look like `data: message,chat,hello`
- Base64 and RESP2: `Upstash-Response-Format: resp2` does not apply to `/multi-exec` (JSON only), and combining it with `Upstash-Encoding: base64` returns HTTP 400
- The official page writes the RESP2 header as `Upstash-Reponse-Format` in its examples (misspelt); the header name documented in the text is `Upstash-Response-Format`
- Since `@upstash/redis` 1.40.0 the SDK `responseEncoding` option defaults to `false`, i.e. the SDK no longer asks for base64 responses; pass `responseEncoding: "base64"` to send `Upstash-Encoding: base64` again (release notes). With older SDK versions an undecoded base64 response looked like a hash
- Tokens: every database has a **Standard** token (full privilege) and a **Read Only** token (read commands only; powerful reads such as `SCAN` / `KEYS` are also restricted). Do not expose the Standard token publicly; resetting the database password revokes both (and briefly restarts the database); ACL users' tokens are not changed by the reset
- ACL users get their own REST token via `ACL RESTTOKEN <username> <password>`; ACL commands can run over REST as a JSON array body, but the token must belong to a user allowed to run `ACL` (a Read Only token cannot run any `ACL` subcommand)
- Compatibility: Strings, Bitmap, Hash, List (no blocking `BLPOP` / `BRPOP` / `BRPOPLPUSH`), Set, Sorted Set (no `BZPOPMAX` / `BZPOPMIN`), Geo, HyperLogLog, Transactions (no `WATCH` / `UNWATCH` / `DISCARD`), Generic, Server, Scripting, Pub/Sub, JSON and Streams (no blocking `XREAD` / `XREADGROUP`) are supported; Connection supports only `PING` and `ECHO`; Cluster is not supported
- Pricing is per command/request, same as the Redis pricing page; no REST-specific metrics are exposed in the console
- Source: https://upstash.com/docs/redis/features/restapi (fetched 2026-11-14; no version pin on the site)

## Related

- [Connection & Authentication](./connection-auth.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
