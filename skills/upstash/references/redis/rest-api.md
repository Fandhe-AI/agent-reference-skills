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
```

## Options / Props

| Header / Param | Description |
|----------------|-------------|
| `Authorization: Bearer $TOKEN` | Standard auth header |
| `?_token=TOKEN` | Token as query parameter (alternative to header) |
| `Upstash-Encoding: base64` | Receive response values as base64 |
| `Upstash-Response-Format: resp2` | Receive response in RESP2 format instead of JSON |

## Notes

- Endpoint pattern: `REST_URL/COMMAND/arg1/arg2/...`
- Successful responses return `{ "result": ... }`; failures return `{ "error": "..." }`
- HTTP status codes: `200` success, `400` bad request / syntax error, `401` unauthorized, `405` method not allowed
- `/pipeline` sends multiple commands in one HTTP request; execution is **not atomic**
- `/multi-exec` executes commands atomically (equivalent to `MULTI`/`EXEC`)
- `/monitor` endpoint enables real-time command tracking
- Pub/Sub is supported via `SUBSCRIBE` and `PUBLISH` commands over the REST API

## Related

- [Connection & Authentication](./connection-auth.md)
- [Pipelining & Transactions](./pipelining-transactions.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
