---
source: https://fastify.dev/docs/latest/Reference/TypeScript/
---

# Using Generics for Route Types

Route methods (`.get`, `.post`, `.route`, etc.) accept a generic object `RouteGenericInterface` with five named properties — `Body`, `Querystring`, `Params`, `Headers`, and `Reply` — that flow through to `request` and `reply` typings.

## Signature / Usage

```typescript
interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

interface IReply {
  200: { success: boolean };
  302: { url: string };
  '4xx': { error: string };
}

server.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
  Reply: IReply
}>('/auth', async (request, reply) => {
  const { username, password } = request.query
  const customerHeader = request.headers['h-Custom']

  // chaining .code with .send allows type narrowing
  reply.code(200).send({ success: true }); // works
  // reply.code(200).send('uh-oh'); // type error
  reply.code(404).send({ error: 'Not found' }); // works for wildcards

  return { success: true }
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Body` | generic property | Typed `request.body` |
| `Querystring` | generic property | Typed `request.query` |
| `Params` | generic property | Typed `request.params` |
| `Headers` | generic property | Typed `request.headers` |
| `Reply` | generic property (status-code keyed) | Typed `reply.code(...).send(...)`, supports literal codes and wildcards (`'4xx'`) |

## Notes

- The same generics are available inside route-level hook methods (e.g. `preValidation`):

```typescript
server.get<{
  Querystring: IQuerystring,
  Headers: IHeaders,
  Reply: IReply
}>('/auth', {
  preValidation: (request, reply, done) => {
    const { username, password } = request.query
    done(username !== 'admin' ? new Error('Must be admin') : undefined)
  }
}, async (request, reply) => {
  const customerHeader = request.headers['h-Custom']
  return { success: true }
})
```
- Omitted generic properties default to `unknown`.

## Related

- [API Type System Documentation](./api-type-system.md)
- [Code Completion Tips](./code-completion-tips.md)
