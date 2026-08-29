---
source: https://tanstack.com/start/latest/docs/framework/react/guide/server-components
---

# Server Components

React Server Components (RSC) support in TanStack Start, enabled via the `rsc` option of the `tanstackStart()` plugin plus a build-tool-specific RSC plugin (`@vitejs/plugin-rsc` for Vite). `renderServerComponent()` renders a plain (no-slots) server component from within a server function; `createCompositeComponent()` / `<CompositeComponent>` render a server component that accepts client-rendered children/render-props ("slots").

## Signature / Usage

### Setup (Vite)

```bash
npm install -D @vitejs/plugin-rsc
```

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import rsc from '@vitejs/plugin-rsc'

export default defineConfig({
  plugins: [
    tanstackStart({ rsc: { enabled: true } }),
    rsc(),
    viteReact(),
  ],
})
```

### Renderable (no slots)

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { renderServerComponent } from '@tanstack/react-start/rsc'

function Greeting() {
  return <h1>Hello from RSC</h1>
}

const getGreeting = createServerFn().handler(async () => {
  const Renderable = await renderServerComponent(<Greeting />)
  return { Renderable }
})

export const Route = createFileRoute('/')({
  loader: async () => {
    const { Renderable } = await getGreeting()
    return { Greeting: Renderable }
  },
  component: HomePage,
})

function HomePage() {
  const { Greeting } = Route.useLoaderData()
  return <>{Greeting}</>
}
```

### Composite (slots — children, render props, component props)

```tsx
import { createServerFn } from '@tanstack/react-start'
import {
  CompositeComponent,
  createCompositeComponent,
} from '@tanstack/react-start/rsc'

const getCard = createServerFn().handler(async () => {
  const src = await createCompositeComponent(
    (props: { children?: React.ReactNode }) => (
      <div className="card">
        <h2>Server-rendered header</h2>
        <div>{props.children}</div>
      </div>
    ),
  )

  return { src }
})

function HomePage() {
  const { Card } = Route.useLoaderData()

  return (
    <CompositeComponent src={Card.src}>
      <Counter />
    </CompositeComponent>
  )
}
```

### Combining with Selective SSR

```tsx
export const Route = createFileRoute('/dashboard')({
  ssr: 'data-only',
  loader: async () => ({ Dashboard: await getDashboard() }),
  component: DashboardPage,
})
```

### Error handling

```tsx
export const Route = createFileRoute('/')({
  loader: async () => ({
    // If this fails, the errorComponent renders
    Greeting: await getGreeting(),
  }),
  errorComponent: ({ error }) => <div>Failed to load: {error.message}</div>,
  component: HomePage,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `rsc.enabled` | `boolean` | Enables RSC support in the `tanstackStart()` plugin |

### `createCompositeComponent(fn)` slot props

| Name | Type | Description |
|------|------|-------------|
| `props.children` | `React.ReactNode` | Opaque placeholder on the server; passed through from the caller's JSX children |
| `props.renderX` (render prop) | `(data) => React.ReactNode` | A named render-prop function passed by the caller and invoked with server-provided data — used when the child needs server-supplied arguments (children slots cannot receive arguments) |
| Component props | `React.ComponentType<...>` | A caller-supplied client component (e.g. `AddToCart`) rendered inside the server-composed output |

## Notes

- `renderServerComponent()` produces a plain `Renderable` (no slots); `createCompositeComponent()` produces a `src` used with `<CompositeComponent src={...}>` to compose client content into the server output.
- Server-composed slots are opaque on the server: `React.Children.map`/`cloneElement` over `props.children` does not work inside `createCompositeComponent` — use render props (`renderX`) to pass server data down to client-rendered content instead.
- Render-prop arguments must be serializable (crossing the RSC boundary).
- `React.cache` deduplicates a data fetch (e.g. `getUser`) across multiple server components rendered within the same request.
- TanStack Query integration requires `structuralSharing: false` in the query options — RSC `Renderable`/`src` values must not be structurally merged.
- Works with Selective SSR (`ssr: 'data-only'` / `ssr: false`) and streaming (`Suspense` + `use()`, or async-generator handlers yielding successive composite components).
- Route-level `errorComponent` catches loader failures; a promise-based loader field combined with a component-level `<ErrorBoundary>` scopes the failure more narrowly (see `error-boundaries.md`).
- Low-level Flight-stream APIs (`renderToReadableStream`, `createFromFetch`) are available for building custom RSC transport (e.g. serving a Flight stream from a server route).

## Related

- [Server Functions](./server-functions.md)
- [Streaming Data from Server Functions](./streaming-data-from-server-functions.md)
- [Error Boundaries](./error-boundaries.md)
