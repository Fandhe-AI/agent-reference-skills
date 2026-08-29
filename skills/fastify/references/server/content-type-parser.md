---
source: https://fastify.dev/docs/latest/Reference/ContentTypeParser/
---

# Content-Type Parser

Fastify natively supports `application/json` and `text/plain` (charset `utf-8`); other content types require a custom parser registered with `addContentTypeParser`. Parsed payloads are attached to `request.body`.

## Signature / Usage

```js
fastify.addContentTypeParser('application/jsoff', function (request, payload, done) {
  jsoffParser(payload, function (err, body) {
    done(err, body)
  })
})

// Handle multiple content types with the same function
fastify.addContentTypeParser(['text/xml', 'application/xml'], function (request, payload, done) {
  xmlParser(payload, function (err, body) {
    done(err, body)
  })
})

// Handle all content types that match a RegExp
fastify.addContentTypeParser(/^image\/([\w-]+);?/, function (request, payload, done) {
  imageParser(payload, function (err, body) {
    done(err, body)
  })
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `parseAs` | `'string' \| 'buffer'` | `'buffer'` | How the incoming data is collected before the parser runs. |
| `bodyLimit` | `number` | global `bodyLimit` | Max payload size in bytes this custom parser accepts. |

## Notes

- Unsupported content types throw `FST_ERR_CTP_INVALID_MEDIA_TYPE`. `addContentTypeParser` is encapsulated in the scope where it's declared.
- String matchers are tried before `RegExp` matchers; among overlapping string matchers, the **last** one configured wins (LIFO) — register the more general type before the more specific one to get the specific one matched.
- `GET`/`HEAD` never parse a body. `OPTIONS`/`DELETE` parse only when a valid `content-type` header is present, and — unlike `POST`/`PUT`/`PATCH` — the catch-all (`'*'`) parser does not run for them.
- When a route's `schema.body.content` restricts validation per content type, only content types listed there are validated; a custom parser accepting a type not listed there parses but does not validate.
- Avoid `await` when registering routes inside a `fastify.register` callback that also calls `addContentTypeParser`, or routes may register before the parser is set.
- `fastify.getDefaultJsonParser(onProtoPoisoning, onConstructorPoisoning)` and `fastify.defaultTextParser()` can be reused to build custom parsers on top of the built-in ones.
- A catch-all parser is registered with content type `'*'`; call `removeAllContentTypeParsers()` first if it should run for content types with an existing built-in parser (e.g. `application/json`).

```js
// Catch-all parser, e.g. for piping the raw request stream
fastify.addContentTypeParser('*', function (request, payload, done) {
  done()
})

app.post('/hello', (request, reply) => {
  reply.send(request.raw)
})
```

## Related

- [Instance Content Type](./instance-content-type.md)
- [Factory Options](./factory-options.md) (`bodyLimit`)
