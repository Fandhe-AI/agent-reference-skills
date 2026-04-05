# Pretty JSON Middleware

Enables formatted (indented) JSON responses. Activated by the `?pretty` query parameter or forced globally.

## Signature / Usage

```ts
import { prettyJSON } from 'hono/pretty-json'

app.use(prettyJSON())
app.get('/', (c) => c.json({ message: 'Hono!' }))
// GET /?pretty  →  formatted JSON
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `space` | `number` | `2` | Number of spaces for indentation |
| `query` | `string` | `"pretty"` | Query string parameter name that triggers pretty printing |
| `force` | `boolean` | `false` | Always prettify JSON regardless of query parameter |
