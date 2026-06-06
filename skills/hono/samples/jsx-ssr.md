# JSX Server-Side Rendering

Rendering HTML responses with server-side JSX components using `hono/jsx`.

```json
// tsconfig.json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "hono/jsx"
  }
}
```

```tsx
// app.tsx
import { Hono } from 'hono'
import type { FC } from 'hono/jsx'

const app = new Hono()

const Layout: FC<{ title: string }> = ({ title, children }) => (
  <html>
    <head><title>{title}</title></head>
    <body>{children}</body>
  </html>
)

const PostList: FC<{ posts: { id: number; title: string }[] }> = ({ posts }) => (
  <Layout title="Posts">
    <h1>Posts</h1>
    <ul>
      {posts.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  </Layout>
)

app.get('/', (c) => {
  const posts = [
    { id: 1, title: 'Hello Hono' },
    { id: 2, title: 'JSX is fun' },
  ]
  return c.html(<PostList posts={posts} />)
})

// Async component
const AsyncData: FC = async () => {
  const data = await fetch('https://api.example.com/data').then((r) => r.json())
  return <div>{data.message}</div>
}

app.get('/async', (c) => c.html(<AsyncData />))

export default app
```

## Notes

- Files must use the `.tsx` extension
- `c.html()` accepts a JSX element directly and sets `Content-Type: text/html`
- Async components are supported natively; `await` inside the component function body
- For metadata hoisting (`<title>`, `<meta>`), use `c.render()` with the `jsx-renderer` middleware
