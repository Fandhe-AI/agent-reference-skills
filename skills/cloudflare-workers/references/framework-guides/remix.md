---
source: https://developers.cloudflare.com/workers/framework-guides/web-apps/remix/
---

# Remix 3

Create a Remix 3 application with Vite+ and deploy it using the Cloudflare CLI (`cf`). The application renders HTML, hydrates a counter, and reads a Workers binding. The guide combines the third-party Pitlane Remix Vite plugin (Remix components and browser assets) with the Cloudflare Vite plugin (runs the server in Workers). Requires Node.js 24 or later, Vite+, and the Cloudflare CLI.

## Signature / Usage

Create a project:

```sh
cf init my-remix-app --package-manager pnpm --no-install
cd my-remix-app
```

Replace `package.json` with the following configuration:

```json
{
  "name": "my-remix-app",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vp dev",
    "build": "vp build",
    "deploy": "cf deploy",
    "check": "cf workers types && vp check"
  },
  "dependencies": {
    "@pitlane/assets": "0.2.1",
    "remix": "3.2.0"
  },
  "devDependencies": {
    "@cloudflare/vite-plugin": "2.0.0-beta.v.15",
    "@pitlane/vite-plugin-remix": "0.9.1",
    "cf": "1.0.0-beta.30",
    "typescript": "7.0.2",
    "vite": "npm:@voidzero-dev/vite-plus-core@1.6.0",
    "vite-plus": "1.6.0"
  }
}
```

Create `pnpm-workspace.yaml` to use the same Vite+ core throughout the project:

```yaml
overrides:
  "vite@*": "npm:@voidzero-dev/vite-plus-core@1.6.0"
allowBuilds:
  esbuild: true
  workerd: true
```

Replace `cloudflare.config.ts`. The `WORLD` text binding supplies the greeting:

```ts
import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
  worker: {
    name: "my-remix-app",
    compatibilityDate: "2026-11-14",
    compatibilityFlags: ["nodejs_compat"],
    entrypoint,
    env: {
      WORLD: bindings.text("World"),
    },
  },
});
```

Replace `vite.config.ts` to configure both plugins:

```ts
import { cloudflare } from "@cloudflare/vite-plugin";
import { remix } from "@pitlane/vite-plugin-remix";
import { defineConfig } from "vite-plus";

export default defineConfig({
  plugins: [
    remix({
      serverEntry: "src/index.ts",
      clientEntry: "src/entry.browser.ts",
      serverHandler: false,
      assets: {
        allowFiles: ["src/entry.browser.ts", "src/**/public/**", "src/routes.ts"],
        allowPackages: ["remix", "@pitlane/vite-plugin-remix"],
        denyFiles: ["**/*.server.*", "**/*.test.*"],
      },
    }),
    cloudflare({ viteEnvironment: { name: "ssr" } }),
  ],
  oxc: {
    jsx: {
      runtime: "automatic",
      importSource: "remix/component",
    },
  },
  lint: { options: { typeAware: true, typeCheck: true } },
});
```

Replace `tsconfig.json` to configure Remix JSX and browser types:

```json
{
  "compilerOptions": {
    "target": "es2024",
    "lib": ["es2024"],
    "module": "preserve",
    "moduleResolution": "bundler",
    "types": ["vite/client"],
    "strict": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "jsx": "react-jsx",
    "jsxImportSource": "remix/component"
  },
  "include": [
    "src",
    "cloudflare.config.ts",
    "vite.config.ts",
    ".cloudflare/types"
  ]
}
```

Create `src/assets.ts` to resolve browser modules and stylesheets:

```ts
import { createAssetResolver } from "@pitlane/assets";
import manifest from "@pitlane/assets/manifest";

export const assets = createAssetResolver(manifest);
export const scriptEntry = await assets.getScriptEntry("src/entry.browser.ts");
export const stylesheets = await assets.getStylesheets("src/index.ts");
```

Create `src/entry.browser.ts` to start Remix in the browser:

```ts
import { run } from "remix/component";

export const app = run({
  async loadModule(moduleUrl, exportName) {
    const module = await import(/* @vite-ignore */ moduleUrl);
    const component = module[exportName];
    if (typeof component !== "function") {
      throw new Error(`Missing client entry: ${moduleUrl}#${exportName}`);
    }
    return component;
  },
});

app.addEventListener("error", (event) => console.error(event.error));
await app.ready();

if (import.meta.hot) {
  const { revalidate } = await import("@pitlane/vite-plugin-remix/hmr");
  import.meta.hot.on("server:update", () => revalidate(app));
}
```

Create `src/document.tsx` to load the entry, import map, and stylesheets:

```tsx
import type { Handle, RemixNode } from "remix/component";
import { ImportMap } from "remix/component/server";
import { scriptEntry, stylesheets } from "./assets.ts";

export function Document(handle: Handle<{ children?: RemixNode }>) {
  return () => (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <title>Remix on Cloudflare</title>
        {stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <ImportMap value={scriptEntry.importMap} />
        {scriptEntry.preloads.map((href) => (
          <link key={href} rel="modulepreload" href={href} />
        ))}
        <script type="module" src={scriptEntry.href} />
      </head>
      <body>{handle.props.children}</body>
    </html>
  );
}
```

Create `src/public/counter.tsx`. Keep browser components and their local dependencies in a `public/` directory:

```tsx
import { clientEntry, on, type Handle } from "remix/component";

export const Counter = clientEntry(
  import.meta.url,
  function Counter(handle: Handle) {
    let count = 0;
    return () => (
      <button
        type="button"
        mix={on("click", async () => {
          count++;
          await handle.update();
        })}
      >
        Count: {count}
      </button>
    );
  },
);
```

Create `src/router.tsx`. Pass the asset resolver to `render()`:

```tsx
import { env } from "cloudflare:workers";
import { render } from "remix/middleware/render";
import { createRouter } from "remix/router";
import { assets } from "./assets.ts";
import { Document } from "./document.tsx";
import { Counter } from "./public/counter.tsx";

export const router = createRouter({ middleware: [render({ assets })] });

router.get("/", ({ render }) =>
  render(
    <Document>
      <h1>Hello {env.WORLD}!</h1>
      <Counter />
      <a href="/api/hello">Get the greeting as JSON</a>
    </Document>,
  ),
);

router.get("/api/hello", () =>
  Response.json({ message: `Hello ${env.WORLD}!` }),
);
```

Replace `src/index.ts` to pass incoming requests to Remix:

```ts
import { router } from "./router.tsx";

export default {
  fetch(request: Request): Promise<Response> {
    return router.fetch(request);
  },
} satisfies ExportedHandler;
```

Develop locally, then format, check, sign in, and deploy:

```sh
vp install
vp dev
```

```sh
vp check --fix
vp run check
cf auth login
cf deploy
```

## Options / Props

| File | Purpose |
| --- | --- |
| `src/assets.ts` | Resolves browser modules and stylesheets with `createAssetResolver` from `@pitlane/assets` |
| `src/entry.browser.ts` | Starts Remix in the browser with `run` from `remix/component` |
| `src/document.tsx` | Loads the entry, import map, and stylesheets |
| `src/public/counter.tsx` | Interactive component; keep browser components and their local dependencies in a `public/` directory |
| `src/router.tsx` | Routes; `createRouter` with the `render` middleware |
| `src/index.ts` | Worker entry; forwards `fetch` to the router |
| `cloudflare.config.ts` | Worker name, compatibility date and flags, entrypoint, and bindings (`WORLD` text binding) |
| `vite.config.ts` | Pitlane Remix plugin and Cloudflare Vite plugin |

## Notes

- This guide uses pre-release tooling: `@cloudflare/vite-plugin` `2.0.0-beta.v.15` and `cf` `1.0.0-beta.30` are pinned in `package.json`. Treat versions as a snapshot (fetched 2026-11-14).
- For Remix v2 applications, use the React Router guide ([react-router.md](./react-router.md)); this page is Remix 3 only. Pitlane is a third-party plugin; Vite+ and `cf` are separate tools.
- Use a named export and call `clientEntry` directly in `src/public/counter.tsx`. Pitlane rewrites the source identity and maps it to a browser asset, so hydration works independently of the bundled Worker file paths.
- The official guide streams server-rendered content with a `Frame` (`import { Frame } from "remix/component"`, routes `/frames` and `/panel`); see the source for the full code. Add browser packages or shared files to `assets.allowPackages` or `assets.allowFiles` in `vite.config.ts`.
- `cf deploy` builds with Vite+ and prints your `workers.dev` URL. If prompted, select your Cloudflare account.
- Source: https://developers.cloudflare.com/workers/framework-guides/web-apps/remix/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [react-router.md](./react-router.md)
- [overview.md](./overview.md)
- [react-vite.md](./react-vite.md)
