# JSX (Server-Side)

Server-side JSX rendering for Hono applications using `hono/jsx`.

## Configuration

### tsconfig.json

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  }
}
```

Or use per-file pragma directives:

```ts
/** @jsxImportSource hono/jsx */
```

### Deno (deno.json)

```json
{
  "compilerOptions": {
    "jsx": "precompile",
    "jsxImportSource": "@hono/hono/jsx"
  }
}
```

Files must use the `.tsx` extension.

## Signature / Usage

```tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

const Layout: FC = (props) => (
  <html>
    <body>{props.children}</body>
  </html>
)

const Top: FC<{ messages: string[] }> = (props) => (
  <Layout>
    <h1>Hello Hono!</h1>
    <ul>
      {props.messages.map((message) => <li>{message}</li>)}
    </ul>
  </Layout>
)

app.get('/', (c) => {
  const messages = ['Good Morning', 'Good Evening', 'Good Night']
  return c.html(<Top messages={messages} />)
})
```

## Features

### Fragments

```tsx
import { Fragment } from 'hono/jsx'

const List = () => (
  <>
    <p>first child</p>
    <p>second child</p>
  </>
)
```

### PropsWithChildren

```tsx
import { PropsWithChildren } from 'hono/jsx'

function Component({ title, children }: PropsWithChildren<{ title: string }>) {
  return <div><h1>{title}</h1>{children}</div>
}
```

### Raw HTML

```tsx
const inner = { __html: 'JSX &middot; SSR' }
return c.html(<div dangerouslySetInnerHTML={inner} />)
```

### Memoization

```tsx
import { memo } from 'hono/jsx'

const Header = memo(() => <header>Welcome to Hono</header>)
```

### Context API

```tsx
import { createContext, useContext } from 'hono/jsx'

const ThemeContext = createContext(themes.light)

const Button: FC = () => {
  const theme = useContext(ThemeContext)
  return <button style={theme}>Push!</button>
}
```

### Async Components

```tsx
const AsyncComponent = async () => {
  await someAsyncWork()
  return <div>Done!</div>
}
```

### Streaming with Suspense (Experimental)

```tsx
import { renderToReadableStream, Suspense } from 'hono/jsx/streaming'

app.get('/', (c) => {
  const stream = renderToReadableStream(
    <html>
      <body>
        <Suspense fallback={<div>loading...</div>}>
          <AsyncComponent />
        </Suspense>
      </body>
    </html>
  )
  return c.body(stream, {
    headers: {
      'Content-Type': 'text/html; charset=UTF-8',
      'Transfer-Encoding': 'chunked',
    },
  })
})
```

### Metadata Hoisting

`<title>`, `<meta>`, and `<link>` tags are automatically hoisted to `<head>` when using `c.render()`.

```tsx
app.get('/about', (c) => {
  return c.render(
    <>
      <title>About Page</title>
      <meta name='description' content='This is the about page.' />
      <p>content here</p>
    </>
  )
})
```

### Custom Elements

```ts
declare module 'hono/jsx' {
  namespace JSX {
    interface IntrinsicElements {
      'my-custom-element': HTMLAttributes & {
        'x-event'?: 'click' | 'scroll'
      }
    }
  }
}
```

## Notes

- Use `.tsx` file extension (not `.ts`) or JSX will fail at runtime.
- `Suspense` and `ErrorBoundary` are experimental features.
- For CSP nonce support with streaming, use `StreamingContext` from `hono/jsx/streaming`.

## Related

- [jsx-dom.md](./jsx-dom.md)
