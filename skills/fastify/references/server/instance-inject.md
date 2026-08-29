---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Inject

Fake HTTP injection method for testing routes without binding a real socket.

## Signature / Usage

```js
const response = await fastify.inject({ method: 'GET', url: '/' })
console.log(response.statusCode, response.payload)
```

## Options / Props

| Name | Description |
|------|-------------|
| `inject` | `.inject(options)` — simulates an HTTP request against the instance for testing purposes; full option set and benefits are documented in the Testing guide (`Guides/Testing.md`). |

## Notes

- Detailed `inject` options (headers, payload, query, etc.) and testing patterns live in the `guides` category's testing page since `Testing.md` is a Guides document, not part of `Server.md`.

## Related

- [Instance Misc](./instance-misc.md)
