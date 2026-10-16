# Render Function (vitest-browser-react / vue / svelte)

Community packages that render framework components in Browser Mode and return locators scoped to the rendered `baseElement`. Each exposes a main entry and a `/pure` entry (no automatic cleanup before the next test).

## Signature / Usage

```tsx
// vitest-browser-react
import { render } from 'vitest-browser-react'
import { expect, test } from 'vitest'
import Component from './Component.jsx'

test('counter button increments the count', async () => {
  const screen = await render(<Component count={1} />)

  await screen.getByRole('button', { name: 'Increment' }).click()

  await expect.element(screen.getByText('Count is 2')).toBeVisible()
})
```

```ts
// vitest-browser-vue
import { render } from 'vitest-browser-vue'
import Component from './Component.vue'

const screen = await render(Component, { props: { initialCount: 1 } })
await screen.getByRole('button', { name: 'Increment' }).click()
```

```ts
// vitest-browser-svelte
import { render } from 'vitest-browser-svelte'
import Component from './Component.svelte'

const screen = await render(Component, { initialCount: 1 })
```

Signatures:

```ts
// react
export function render(ui: React.ReactNode, options?: ComponentRenderOptions): Promise<RenderResult>
export function cleanup(): Promise<void>
export function renderHook<Props, Result>(
  renderCallback: (initialProps?: Props) => Result,
  options: RenderHookOptions<Props>,
): Promise<RenderHookResult<Result, Props>>

// vue
export function render(component: Component, options?: ComponentRenderOptions): Promise<RenderResult>
export function cleanup(): void

// svelte
export function render<C extends Component>(
  Component: ComponentImport<C>,
  options?: ComponentOptions<C>,
  renderOptions?: SetupOptions
): Promise<RenderResult<C>>
export function cleanup(): void
```

Configuration:

```js
import { configure } from 'vitest-browser-react/pure'
configure({ reactStrictMode: true }) // disabled by default

import { config } from 'vitest-browser-vue/pure'
config.global.stubs.CustomComponent = { template: '<div></div>' }
```

## Options / Props

| Package | Option | Description |
|---------|--------|-------------|
| react | `container` | Own `HTMLElement`; must be appended to `document.body` manually |
| react | `baseElement` | Base for queries / `debug()`; defaults to `container` or `document.body` |
| react | `wrapper` | React component rendered around the element (providers) |
| react `renderHook` | `initialProps` | Props for the first render-callback call (not passed to `wrapper`) |
| vue | `container`, `baseElement` + all `@vue/test-utils` `mount` options except `attachTo` | |
| svelte | `props` or props directly, `target` | Svelte `mount` options or props; `target` plays the container role |
| svelte | `baseElement` (third argument) | Rarely needed |

Render result members:

| Member | Packages | Description |
|--------|----------|-------------|
| container | all | Containing DOM node (avoid querying through it; use locators) |
| baseElement | react, vue | Base node for queries (default `document.body`) |
| locator | all | Locator of the `container` |
| debug(el?, maxLength?, options?) | all | Shortcut for `console.log(prettyDOM(baseElement))` |
| rerender | all | react: `rerender(ui)`; vue / svelte: `rerender(props: Partial<Props>)` |
| unmount() | all | Unmount the component |
| asFragment() | react | Returns a `DocumentFragment` |
| emitted | vue | `emitted<T>()` / `emitted<T>(eventName)` returns emitted events |
| component | svelte | Mounted component instance |
| result.current, rerender, unmount | react `renderHook` | Latest hook return value, re-render with props, unmount |

## Notes

- `render` is asynchronous (supports `Suspense`): use `await render(...)`. The main entry cleans up before the next test; `/pure` does not (react `pure` also exposes `configure`; vue `config` is available in both entries).
- Trace marks: `react.render` / `react.rerender` / `react.unmount`, `vue.render` / `vue.rerender` / `vue.unmount`, `svelte.render` / `svelte.rerender` / `svelte.unmount` appear in Trace View.
- Results also contain every locator (`getBy*`), including custom ones registered with `locators.extend`.
- Prefer `renderHook` only for libraries publishing hooks; `render` with a real component is more readable.
- Svelte snippets: test simple snippets with a wrapper component and `data-testid`; for argument checks use Svelte's `createRawSnippet`.
- Distinct from `@testing-library/react` / `vue` / `svelte`: these packages return locators that retry assertions even after re-render.
- Source: https://vitest.dev/api/browser/react , https://vitest.dev/api/browser/vue , https://vitest.dev/api/browser/svelte (Vitest v5.0.5)

## Related

- [Component Testing](./component-testing.md)
- [Locators](./locators.md)
- [Assertion API (expect.element)](./assertions.md)
