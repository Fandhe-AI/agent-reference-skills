# Method Override Middleware

Allows overriding the HTTP method of a request via a form field, header, or query parameter. Useful for HTML forms that only support GET and POST.

## Signature / Usage

```ts
import { methodOverride } from 'hono/method-override'

const app = new Hono()
app.use('/posts', methodOverride({ app }))
app.delete('/posts', (c) => c.text('Deleted'))
```

```html
<form method="POST" action="/posts">
  <input type="hidden" name="_method" value="DELETE" />
  <button type="submit">Delete</button>
</form>
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `app` | `Hono` | Yes | The Hono application instance |
| `form` | `string` | No | Form field name containing the override value (default: `_method`) |
| `header` | `string` | No | Header name containing the override value |
| `query` | `string` | No | Query parameter name containing the override value |

## Notes

- Only one source (`form`, `header`, or `query`) should be configured at a time.
