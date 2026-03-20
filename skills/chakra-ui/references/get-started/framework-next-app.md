# Framework: Next.js (App Router)

A guide for installing Chakra UI with the Next.js App Router (`app/` directory).

## Compatibility

- Works with Next.js 15 and 16
- No lock-in to a specific Next.js major version — any version supporting compatible React and Emotion versions works
- Templates in the official repo may pin an older Next.js major for stability; you can upgrade `next` to the latest major

## Templates

Pre-configured starter templates:

- [Next.js app template](https://github.com/chakra-ui/chakra-ui/tree/main/sandbox/next-app)
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

### 6. Hydration errors

If you see **"Hydration failed because the initial server rendered HTML did not match the client"** with Emotion CSS diffs, this is caused by Turbopack. Use `--webpack` flag instead:

```json
{
  "scripts": {
    "dev": "next dev --webpack",
    "build": "next build --webpack"
  }
}
```

### 7. Usage

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
