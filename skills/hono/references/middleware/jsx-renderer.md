# JSX Renderer Middleware

Provides a layout system for JSX-based HTML rendering. Wraps route responses in a shared layout component.

## Signature / Usage

```ts
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'

app.use(jsxRenderer(({ children }) => (
  <html>
    <body>{children}</body>
  </html>
)))

app.get('/', (c) => c.render(<h1>Hello</h1>))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `docType` | `boolean \| string` | `true` | Controls the `<!DOCTYPE>` declaration. `false` omits it; a string uses a custom DOCTYPE. |
| `stream` | `boolean \| Record<string, string>` | — | Enables streaming response. `true` adds default headers; a Record sets custom headers. |

Options can also be a function `(c: Context) => RendererOptions` for dynamic configuration per request.

## Notes

- `useRequestContext()` returns the current `Context` inside JSX components.
- Nested layouts are supported via the `Layout` component prop.
- Streaming integrates with `<Suspense>` for async components.
- `useRequestContext()` is incompatible with Deno's `precompile` JSX option; use `"jsx": "react-jsx"` in `tsconfig.json` instead.
- Declare a custom `ContextRenderer` interface to pass additional props to layouts.
