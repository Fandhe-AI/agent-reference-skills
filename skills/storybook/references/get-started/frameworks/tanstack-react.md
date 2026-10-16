# Storybook for TanStack React (Vite)

`@storybook/tanstack-react` is the Storybook framework for TanStack Router and TanStack Start applications built with React and Vite. It builds on `@storybook/react-vite` and adds router-aware story rendering, automatic router mocking, and mocked TanStack Start server functions.

## Signature / Usage

```bash
npm create storybook@latest
# Manual install
npm install --save-dev @storybook/tanstack-react
```

```ts
// Page.stories.ts
import type { Meta, StoryObj } from '@storybook/tanstack-react';

import { Route } from './Page';

const meta = {
  parameters: {
    layout: 'fullscreen',
    tanstack: {
      router: {
        route: Route, // 👈 Supply the Route here
        params: { id: '42' },
        query: { tab: 'details' },
      },
    },
  },
} satisfies Meta<typeof Route>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

## Options / Props

Framework option:

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |

Parameters under `tanstack.router`:

| Name | Type | Description |
|------|------|-------------|
| `context` | `Record<string, unknown> \| (({ storyContext }) => Record<string, unknown>)` | Router context injected into the story router. A factory runs before the initial load, outside React rendering, so values reach `loader` and `beforeLoad`. |
| `params` | `ResolveParams<Path>` | Interpolates route params into the path; constrained to the params in a typed file route's path. |
| `path` | `string` | Initial URL path for the story router. |
| `query` | `Record<string, unknown>` | Search params appended to the initial URL. |
| `route` | `AnyRoute \| route options object` | Route instance, or route options to create a temporary story route. May include `head`, `search`, `params.parse`. |
| `routeOverrides` | `Partial<Record<string, RouteOverrideOptions>>` | Per-route overrides keyed by route ID (`'__root__'` for the root). Each entry can override `loader`, `beforeLoad`, `validateSearch`, `loaderDeps`, `context`. |
| `useRouterContext` | `({ storyContext }) => RouterContext` | Hook computing router context during rendering; runs after the initial load, so it does not reach `loader` / `beforeLoad` (use the `context` factory for that). |

Additional exported modules: `@storybook/tanstack-react/react-router` (TanStack Router compatible mocks) and `@storybook/tanstack-react/start` (TanStack Start mocks including a mocked `createServerFn()`).

## Notes

- Requirements: React ≥ 18, Vite ≥ 7; `@tanstack/react-router` must be available (keep matching TanStack Start packages if you use server functions).
- Every story is wrapped in a memory-backed TanStack Router automatically; remove manual `RouterProvider` / `createRouter` / `createMemoryHistory` / `createRootRoute` decorators.
- `@tanstack/react-router` imports are redirected to a Storybook mock layer so hooks like `useNavigate`, `useSearch`, `useParams` work and navigation attempts are observable. TanStack Start server/runtime entry points are stubbed and `createServerFn()` handlers become mock functions that can be overridden per story.
- App-level server-only modules (e.g. database clients) must be mocked with a `__mocks__` file (use `import type` only) registered in `.storybook/preview.ts`; automocking still evaluates the original module. Errors like `does not provide an export named 'default'` or `AsyncLocalStorage is not defined` indicate a server-only module reached the browser.
- TanStack Query is not set up automatically: create one `QueryClient` in the preview file, clear it in `beforeEach`, and share it via `parameters.tanstack.router.context` and a `QueryClientProvider` decorator.
- React Server Components are not supported.
- Migrating from `react-vite`: `npx storybook automigrate react-vite-to-tanstack-react`, or manually replace the package, the `framework` property, and preview imports.
- Use `@storybook/react-vite` for standard React + Vite projects without TanStack Router.
- Source: https://storybook.js.org/docs/get-started/frameworks/tanstack-react (Storybook v10.6.2 docs)

## Related

- [react-vite](./react-vite.md)
