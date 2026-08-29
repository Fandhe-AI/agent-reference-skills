---
source: https://fastify.dev/docs/latest/Guides/Getting-Started/
---

# Parsing Request Payloads

Fastify natively parses `application/json` and `text/plain` request payloads, exposing the result on `request.body`.

## Signature / Usage

```js
const opts = {}
fastify.post('/', opts, async (request, reply) => {
  return request.body
})
```

## Notes

- For other content types or custom parsing behavior, see the Content-Type Parser reference (`server/instance-content-type.md`).

## Related

- [serializing-data.md](./serializing-data.md)
