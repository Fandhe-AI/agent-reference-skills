---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Content-Type Parser Methods

Methods for inspecting, adding, and removing content-type parsers on a Fastify instance (summary; full behavior in `content-type-parser.md`).

## Signature / Usage

```js
fastify.addContentTypeParser('text/json', { asString: true }, fastify.getDefaultJsonParser('ignore', 'ignore'))
fastify.hasContentTypeParser('text/json')
fastify.removeContentTypeParser('application/json')
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `addContentTypeParser` | `.addContentTypeParser(contentType, options, parser)` | Registers a custom parser for a content type (string, string array, or `RegExp`). |
| `hasContentTypeParser` | `.hasContentTypeParser(contentType)` | Returns whether a parser exists for the given content type in the current context. |
| `removeContentTypeParser` | `.removeContentTypeParser(contentType)` | Removes one or more content-type parsers in the current context (accepts array). |
| `removeAllContentTypeParsers` | `.removeAllContentTypeParsers()` | Removes all parsers in the current context; typically used before registering a catch-all parser. |
| `getDefaultJsonParser` | `.getDefaultJsonParser(onProtoPoisoning, onConstructorPoisoning)` | Returns the built-in JSON parser configured with the given poisoning modes (`'ignore'`, `'remove'`, `'error'`). |
| `defaultTextParser` | `.defaultTextParser()` | The built-in plain-text parser, usable as a parser function for other content types. |

## Notes

- v4 → v5: `DELETE` requests with `Content-Type: application/json` and an empty body are no longer accepted; v4 allowed this.

## Related

- [Content Type Parser](./content-type-parser.md)
- [Instance Handlers](./instance-handlers.md)
