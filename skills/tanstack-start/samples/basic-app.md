---
source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch
---

# Basic App (router + root route + file route)

Minimal TanStack Start app: `src/router.tsx`, `src/routes/__root.tsx`, and a server-backed index route.

```tsx
// src/router.tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true })
}
```

```tsx
// src/routes/__root.tsx
import type { ReactNode } from 'react'
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}
```

```tsx
// src/routes/index.tsx
import * as fs from 'node:fs'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

const filePath = 'count.txt'

async function readCount() {
  return parseInt(await fs.promises.readFile(filePath, 'utf-8').catch(() => '0'))
}

const getCount = createServerFn({ method: 'GET' }).handler(() => readCount())

const updateCount = createServerFn({ method: 'POST' })
  .validator((d: number) => d)
  .handler(async ({ data }) => {
    const count = await readCount()
    await fs.promises.writeFile(filePath, `${count + data}`)
  })

export const Route = createFileRoute('/')({
  component: Home,
  loader: async () => await getCount(),
})

function Home() {
  const router = useRouter()
  const state = Route.useLoaderData()
  return (
    <button
      type="button"
      onClick={() => {
        updateCount({ data: 1 }).then(() => router.invalidate())
      }}
    >
      Add 1 to {state}?
    </button>
  )
}
```

## Notes

- `src/routeTree.gen.ts` is generated automatically on first `vite dev`/`vite build` run; do not hand-write it.
- `vite.config.ts` must register `tanstackStart()` before `viteReact()`.
- The root route renders the full `<html>` document; every other route renders only its `component` inside `<Outlet />`.
