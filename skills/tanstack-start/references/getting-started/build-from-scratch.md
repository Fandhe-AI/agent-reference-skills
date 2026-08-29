---
source: https://tanstack.com/start/latest/docs/framework/react/build-from-scratch
---

# Build a Project from Scratch

Manual setup guide creating a basic TanStack Start app from an empty directory, ending with a working server/client counter.

## Signature / Usage

```shell
mkdir myApp && cd myApp && npm init -y
npm i @tanstack/react-start @tanstack/react-router react react-dom
npm i -D typescript @types/react @types/react-dom @types/node
# Vite
npm i -D vite @vitejs/plugin-react
# or Rsbuild
npm i -D @rsbuild/core @rsbuild/plugin-react
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "moduleResolution": "Bundler",
    "module": "ESNext",
    "target": "ES2022",
    "skipLibCheck": true,
    "strictNullChecks": true
  }
}
```

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    tanstackStart(),
    // react's vite plugin must come after start's vite plugin
    viteReact(),
  ],
})
```

`src/router.tsx`:

```tsx
import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createRouter({ routeTree, scrollRestoration: true })
}
```

`src/routes/__root.tsx`:

```tsx
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

`src/routes/index.tsx` (server-backed counter):

```tsx
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

- Project structure after setup: `src/routes/__root.tsx`, `src/router.tsx`, `src/routeTree.gen.ts` (auto-generated on first run).
- `package.json` needs `"type": "module"` and `dev`/`build` scripts calling `vite dev`/`vite build` (or `rsbuild dev`/`rsbuild build`).
- Enabling `verbatimModuleSyntax` in `tsconfig.json` can leak server bundles into client bundles.

## Related

- [Getting Started](./getting-started.md)
