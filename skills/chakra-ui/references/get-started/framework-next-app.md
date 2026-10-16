# Framework: Next.js (App Router)

A guide for installing Chakra UI with the Next.js App Router (`app/` directory).

## Compatibility

- Works with Next.js 15 and 16
- No lock-in to a specific Next.js major version — any version supporting compatible React and Emotion versions works
- Templates in the official repo may pin an older Next.js major for stability; you can upgrade `next` to the latest major

## Templates

Pre-configured starter templates:

- [Next.js app template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/next-app)
- [Next.js app (streaming)](https://github.com/chakra-ui/chakra-ui/tree/2e7517745cff2fcde0b8012f136cf99611ff262a/sandbox/next-app-streaming)
- [Next.js pages template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/next-pages)

## Installation

> Minimum Node.js version: **20.x**

### 1. Install dependencies

```bash
npm i @chakra-ui/react @emotion/react
```

### 2. Add snippets

```bash
npx @chakra-ui/cli snippet add
```

### 3. Update tsconfig

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

For JavaScript projects, create `jsconfig.json` with the same content.

### 4. Setup provider

`app/layout.tsx`:

```tsx
import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
```

The `suppressHydrationWarning` prop on `<html>` is required to prevent warnings from the `next-themes` library.

### 5. Optimize Bundle

`next.config.mjs`:

```js
export default {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
}
```

This resolves warnings like:
```
[webpack.cache.PackFileCacheStrategy] Serializing big strings (xxxkiB)
```

### 6. Stream through Suspense (optional)

Skip this unless you stream UI through `<Suspense>`.

You need it when Chakra components first appear inside a streamed `<Suspense>` chunk. If you enable [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) in Next.js 16, that is the default.

Install `@emotion/cache` and add this registry:

`components/ui/emotion-registry.tsx`:

```tsx
"use client"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
import { useServerInsertedHTML } from "next/navigation"
import { useState } from "react"

export function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "css" })
    cache.compat = true

    const previousInsert = cache.insert
    let inserted: string[] = []

    cache.insert = (...args) => {
      const serialized = args[1]
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name)
      }
      return previousInsert(...args)
    }

    const flush = () => {
      const previouslyInserted = inserted
      inserted = []
      return previouslyInserted
    }

    return { cache, flush }
  })

  useServerInsertedHTML(() => {
    const names = flush()
    if (names.length === 0) return null

    const styles = names.map((name) => cache.inserted[name]).join("")

    return (
      <style
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{ __html: styles }}
      />
    )
  })

  return <CacheProvider value={cache}>{children}</CacheProvider>
}
```

Then wrap `Provider` with it in `app/layout.tsx`:

```tsx
import { EmotionRegistry } from "@/components/ui/emotion-registry"
import { Provider } from "@/components/ui/provider"

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body>
        <EmotionRegistry>
          <Provider>{props.children}</Provider>
        </EmotionRegistry>
      </body>
    </html>
  )
}
```

The [streaming sandbox](https://github.com/chakra-ui/chakra-ui/tree/2e7517745cff2fcde0b8012f136cf99611ff262a/sandbox/next-app-streaming) is a repro you can run cold, not a copy of the layout above.

### 7. Hydration errors (Turbopack)

If you see **"Hydration failed because the initial server rendered HTML did not match the client"** with Emotion CSS diffs, this is caused by Turbopack. Use `--webpack` flag instead:

```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack"
  }
}
```

### 8. Usage

```tsx
import { Button, HStack } from "@chakra-ui/react"

const Demo = () => {
  return (
    <HStack>
      <Button>Click me</Button>
      <Button>Click me</Button>
    </HStack>
  )
}
```

## Related

- [Next.js (Pages Router)](./framework-next-pages.md)
- [Installation](./installation.md)
- [CLI](./cli.md)
