# Component Testing

## Signature / Usage

Playwright Test can test the components of your web application in isolation. Since v1.62 a component test is a regular Playwright end-to-end test that runs against a small **story gallery** page served by your own dev server. There is no dedicated component-testing runtime, no bundler integration and no extra npm packages: the built-in `mount` fixture of `@playwright/test` drives it all.

```ts
import { test, expect } from '@playwright/test';

test('click should expand', async ({ mount }) => {
  const component = await mount('components/Expandable/Stateful');
  await component.getByRole('button').click();
  await expect(component.getByTestId('expanded')).toHaveValue('true');
});
```

Tests run in Node.js while components run in a real browser: real clicks are triggered, real layout is executed, visual regression is possible. At the same time, tests get everything Playwright Test offers: parallelism, parametrization, retries and post-mortem tracing.

### Why a framework-agnostic approach

The `@playwright/experimental-ct-*` packages let tests write JSX inline (`mount(<Button onClick={spy} />)`). To make that possible, Playwright had to control the entire pipeline: scan the tests for components, compile a bundle with its own copy of Vite and its own config, serve it from its own server, and marshal props and callbacks across the Node.js/browser boundary. That design kept the packages experimental forever:

- It only worked when your setup matched Playwright's. Path aliases, plugins and CSS handling had to be mirrored into `ctViteConfig` by hand. Projects on webpack, Next.js or custom pipelines could not use their own build at all. Every framework needed its own package.
- The Node.js/browser boundary leaked. Live objects could not cross, callbacks only half-worked through marshalling, and module mocks silently did not apply.

The replacement inverts the control:

- **You own the pipeline.** Components are built and served by your own dev server, with your plugins, your aliases and your CSS. Playwright does not compile or serve anything; it navigates to a page.
- **It is framework-agnostic.** The only framework-specific piece is the gallery page, a small module that you own.
- **It is stable.** Tests import `test` and `expect` from plain `@playwright/test`, and `mount` is a documented built-in fixture.

### How it works

- A **story** is a tiny wrapper component that embeds the component under test in one specific scenario: hard-coded props, mock data, providers, recorded callbacks. Stories live next to the component in `*.story.tsx` (or `.ts`/`.jsx`/`.js`/`.vue`) files; each named export is one story.
- The **gallery** is a single page, served by your dev server, that exposes `window.mount(params)` and `window.unmount()` functions rendering a story (resolved from your story files) into a `#root` element. It is framework-specific and yours to own.
- The `mount` fixture navigates to the gallery (`baseURL`), calls `window.mount()` with the story id and props, and returns a `Locator` for the gallery root. Scope your queries from it: `component.getByRole('button').click()`.

Everything the component needs is set up inside the story, which runs in the browser. Everything the test asserts is observable through the page: DOM, URL, network.

## Options / Props

### mount fixture

`Fixtures.mount` (since v1.62) returns a `Locator`: "Mounts a component story and returns a Locator pointing to the root element the story was rendered into."

```ts
mount(storyId: string, props?: Object): Promise<Locator>
```

| Parameter | Type | Description |
| --- | --- | --- |
| `storyId` | `string` | Identifier of the story to mount, as resolved by the gallery page. Conventionally, the story file path plus the exported story name, for example `'components/Button/Primary'`. |
| `props` | `Object` (optional) | Optional plain, serializable props passed to the story. |

The returned locator is augmented with two methods: `update(props)` re-renders the same story with new props without remounting, preserving component state; `unmount()` unmounts the story. Pass the story type as a template argument to type-check the props:

```ts
import type { WithTitle } from './Button.story';

test('renders the title', async ({ mount }) => {
  const component = await mount<typeof WithTitle>('Button/WithTitle', { title: 'Hello' });
  await expect(component).toContainText('Hello');
});
```

`TestOptions.reuseContext` (v1.62, experimental, discouraged for end-to-end tests) reuses one browser context between tests in a worker; it is intended for component tests that drive a story gallery. See `../test-runner/configuration.md` for its reset list and restrictions.

## Getting started

### Step 1: Point your coding agent at the skill

The gallery is application code and belongs to you. Playwright ships this methodology as an agent skill; install the skills and ask your coding agent (Claude Code, GitHub Copilot or similar) to do the setup:

```bash
npx playwright init-skills
```

```txt
Set up component testing using the playwright-component-testing skill.
```

The agent detects your framework and bundler, implements the gallery for your stack, adds a Playwright project to the config, and writes the first story and spec. The gallery contract is small:

- It is a single page under `playwright/gallery/`, served by your own dev server. Vite apps serve it with the dev server they already run; other setups run a small standalone Vite server next to the app.
- It discovers your `*.story.*` files and exposes two functions: `window.mount({ story, props })` renders the story with the given id into a `#root` element, and `window.unmount()` tears it down. An unknown story or a render error rejects, which surfaces as the test's `mount()` call throwing.
- It reuses the rendering root across calls, so `component.update(props)` reconciles instead of remounting and component state is preserved.
- It imports your global CSS the same way the app entry does, and the body of `window.mount` is the natural place for app-wide setup (the equivalent of the old `beforeMount` / `afterMount` hooks).

If you prefer to write the gallery by hand, the installed skill contains the full specification with worked React and Vue examples in `references/gallery-spec.md`.

### Step 2: Configure Playwright

```ts
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'components',
      testDir: './tests/components',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:5173/playwright/gallery/index.html',
        serviceWorkers: 'block',
        reuseContext: true,
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173/playwright/gallery/index.html',
    reuseExistingServer: !process.env.CI,
  },
});
```

`mount` navigates to `baseURL`, so it must point at the gallery. `serviceWorkers: 'block'` keeps the app's own service worker from serving cached responses that would shadow your `page.route()` mocks. `reuseContext: true` reuses the browser context between tests in a worker, a large speedup for component suites.

### Step 3: Write a story

Stories live next to the component they exercise. Each named export is one scenario:

```tsx
// src/components/Button.story.tsx
import { Button } from './Button';

export const Primary = () => <Button title='Submit' />;

export const Disabled = () => <Button title='Submit' disabled />;
```

### Step 4: Write a test

```ts
// tests/components/button.spec.ts
import { test, expect } from '@playwright/test';

test('renders primary button', async ({ mount }) => {
  const component = await mount('components/Button/Primary');
  await expect(component.getByRole('button')).toHaveText('Submit');
});

test('disabled button is disabled', async ({ mount }) => {
  const component = await mount('components/Button/Disabled');
  await expect(component.getByRole('button')).toBeDisabled();
});
```

### Step 5: Run

```bash
npx playwright test --project=components
```

## Stories as a methodology

- **One export per scenario.** Prefer a new story export over parameterizing an existing one.
- **Stories live next to the component.** `src/components/Button.story.tsx` documents `src/components/Button.tsx`.
- **Story ids are derived from the file path**: path under `src/` without the `.story.*` extension, plus the export name (`components/Button/Primary`). Any unique suffix works too: `mount('Button/Primary')`.
- **The story owns everything the component needs**: providers, mock data, state, callbacks. The test owns nothing but interactions and assertions.

## Testing patterns

### Record state for assertions

Instead of marshalling callbacks between Node.js and the browser, the story owns the state and provides the callbacks, and records the observable outcome into a hidden form next to the component:

```tsx
// src/components/Expandable.story.tsx
import { useState } from 'react';
import { Expandable } from './Expandable';

export const Stateful = () => {
  const [expanded, setExpanded] = useState(false);
  return <>
    <Expandable expanded={expanded} setExpanded={setExpanded} title='Title'>Details</Expandable>
    <form hidden><input data-testid='expanded' readOnly value={String(expanded)} /></form>
  </>;
};
```

- The whole scenario runs in the browser: no callback marshalling.
- `toHaveValue()` is a web-first assertion: it retries until the state lands.
- Record each observed value in its own `data-testid` input: `String(...)` for scalars, `JSON.stringify(...)` for payloads. The negative direction works the same way: perform the operation, then assert the value did not change.

### Per-test props

Pass plain serializable props as the second argument to `mount`. The gallery hands them to the story as its props. Keep props to plain serializable data; callbacks belong inside the story.

```tsx
// src/components/Button.story.tsx
export const WithTitle = ({ title = 'Default' }: { title?: string }) =>
  <Button title={title} />;
```

### Prop transitions with update()

```ts
const component = await mount('components/Counter/Default', { value: 1 });
await expect(component.getByTestId('value')).toHaveText('1');
await component.update({ value: 2 });
await expect(component.getByTestId('value')).toHaveText('2');
```

### Multiple states and visual comparison

Each `mount()` navigates fresh, so tests are fully isolated and mounting several stories in one test is cheap. Screenshot the returned root locator, not the page:

```ts
await expect(await mount('Button/Primary')).toHaveScreenshot('primary.png');
await expect(await mount('Button/Disabled')).toHaveScreenshot('disabled.png');
```

### Handling network requests

Use `page.route()` as usual and register routes before `mount()`, since mounting navigates:

```ts
test('renders the error state', async ({ page, mount }) => {
  await page.route('**/api/items', route => route.fulfill({ status: 500 }));
  const component = await mount('components/ItemList/Default');
  await expect(component.getByRole('alert')).toContainText('Something went wrong');
});
```

Teams with MSW handler libraries can start the worker inside a story or decorator instead.

### Debugging stories

Open the gallery URL in a browser and call `await window.mount({ story: 'components/Button/Primary' })` from the DevTools console; that is exactly what the `mount` fixture does. An unknown story or a render error rejects `window.mount`, which surfaces as the test's `mount()` throwing with a real stack.

## Notes

- Status (v1.64.1 docs): the experimental `@playwright/experimental-ct-react`, `-ct-react17` and `-ct-vue` packages "have been removed and are no longer published". If you are still on them, stay on Playwright 1.62 until you have followed the migration guide. `@playwright/experimental-ct-svelte` was removed in v1.59.
- Migration mapping (experimental-ct to gallery): `mount(<Button onClick={spy} />)` becomes a stateful story recording the effect into a hidden input, asserted with `toHaveValue()`; `component.update(<Button count={2} />)` becomes `component.update({ count: 2 })`; `component.unmount()` is unchanged; `beforeMount` / `afterMount` hooks become the body of the gallery's `window.mount` (global) or story decorators (per-story); `hooksConfig` becomes props interpreted by the story; the `router` fixture / MSW handlers in Node.js become `page.route()` in the test or MSW `setupWorker` inside a story; `playwright/index.html` becomes the gallery's `index.html` and entry module imports; `ctViteConfig`, `ctPort`, `ctTemplateDir` are gone (the gallery runs through your own dev server); `defineConfig` comes from plain `@playwright/test`.
- Migrate incrementally: while pinned to 1.62, set up the gallery and the `components` project alongside the old CT project, port spec by spec, then drop the `@playwright/experimental-ct-*` dependency along with `playwright/index.html`, `playwright/index.ts` and `playwright/.cache` and upgrade.
- Story ids are strings: renaming or moving a story breaks specs at runtime, not compile time. Per-test JSX is gone: a test that built a different JSX tree per test becomes one story export per composition.
- Accessing a component's internal methods or its instance within test code is neither recommended nor supported.
- `mount()` re-navigates and re-creates the DOM of the story gallery, but with `reuseContext: true` the browser context is shared across tests in a worker and its reset is best-effort: permissions granted via `grantPermissions()`, runtime `setGeolocation()` / `setOffline()` / `setExtraHTTPHeaders()` changes, browsing history and `window.name` are not reset (see `../test-runner/configuration.md`).
- Source: https://playwright.dev/docs/test-components (microsoft/playwright v1.64.1 `docs/src/test-components-js.md`)
- Source: https://playwright.dev/docs/api/class-testoptions (microsoft/playwright v1.64.1 `docs/src/test-api/class-testoptions.md`, for `reuseContext`)
- Source: https://playwright.dev/docs/release-notes (microsoft/playwright v1.64.1 `docs/src/release-notes-js.md`, for the `experimental-ct-svelte` removal in v1.59)

## Legacy packages (experimental-ct-*)

The package-based setup below (React / Vue / Svelte `experimental-ct-*`) is the legacy model, retained for reference only. Do not use it for new work.

### Supported Frameworks (legacy packages)

| Framework | Package                               |
| --------- | ------------------------------------- |
| React     | `@playwright/experimental-ct-react`   |
| Vue       | `@playwright/experimental-ct-vue`     |
| Svelte    | `@playwright/experimental-ct-svelte`  |

### Setup

```bash
npm init playwright@latest -- --ct
```

**`playwright/index.html`** -- the host page for mounted components:

```html
<html lang="en">
  <body>
    <div id="root"></div>
    <script type="module" src="./index.ts"></script>
  </body>
</html>
```

**`playwright/index.ts`** -- entry point for applying styles, themes, and runtime dependencies. Import global CSS or register framework plugins here.

### mount (legacy)

The legacy `mount` fixture renders a component into the browser and returns a Locator pointing to the mounted component.

```tsx
// React
import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test('renders app', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('Learn React');
});
```

```ts
// Vue
import { test, expect } from '@playwright/experimental-ct-vue';
import App from './App.vue';

test('renders app', async ({ mount }) => {
  const component = await mount(App, {
    props: { msg: 'greetings' },
  });
  await expect(component).toContainText('greetings');
});
```

```ts
// Svelte
import { test, expect } from '@playwright/experimental-ct-svelte';
import App from './App.svelte';

test('renders app', async ({ mount }) => {
  const component = await mount(App);
  await expect(component).toBeVisible();
});
```

### Props, callbacks, children and slots (legacy)

```tsx
// Props
const component = await mount(<Component msg="greetings" />);          // React
const component = await mount(Component, { props: { msg: 'greetings' } }); // Vue / Svelte

// Callbacks and events
const component = await mount(<Component onClick={() => { /* ... */ }} />); // React
const component = await mount(Component, { on: { click() { /* ... */ } } }); // Vue / Svelte

// Children and slots
const component = await mount(<Component>Child content</Component>);        // React
const component = await mount(Component, { slots: { default: 'Slot content' } }); // Vue / Svelte
```

### Hooks (legacy)

Hooks run in the browser and configure the environment before or after mounting. Define them in `playwright/index.ts`. `beforeMount` runs before the component mounts (use it to wrap the component with providers); `afterMount` runs after the component mounts.

```tsx
// playwright/index.tsx
import { beforeMount } from '@playwright/experimental-ct-react/hooks';
import { BrowserRouter } from 'react-router-dom';

export type HooksConfig = {
  enableRouting?: boolean;
};

beforeMount<HooksConfig>(async ({ App, hooksConfig }) => {
  if (hooksConfig?.enableRouting) {
    return <BrowserRouter><App /></BrowserRouter>;
  }
});
```

```tsx
test('products page with routing', async ({ mount }) => {
  const component = await mount<HooksConfig>(<ProductsPage />, {
    hooksConfig: { enableRouting: true },
  });
  await expect(component).toContainText('Products');
});
```

### Lifecycle (legacy)

```tsx
const component = await mount(<Component msg="hello" />);
await component.update({
  props: { msg: 'updated' },
  on: { click() { /* ... */ } },
  slots: { default: 'New Child' },
});
await component.unmount();
```

### Router fixture (legacy)

The experimental `router` fixture intercepts network requests at the component level. It supports raw route handlers and MSW (Mock Service Worker) handlers:

```ts
import { http, HttpResponse } from 'msw';

test('mocked API', async ({ mount, router }) => {
  await router.use(
    http.get('/data', async () => {
      return HttpResponse.json({ value: 'mocked' });
    })
  );

  const component = await mount(<DataDisplay />);
  await expect(component).toContainText('mocked');
});
```

### Limitations (legacy)

- Complex objects cannot be passed as props. Only plain serializable values (strings, numbers, dates, plain objects) work; class instances and complex objects fail.
- Synchronous callbacks are not supported. Callbacks live in Node.js and cannot return values synchronously to the browser component.
- Workaround: create thin wrapper components ("stories") that convert complex objects to serializable data:

```tsx
// input-media.story.tsx
export function InputMediaForTest(props: {
  onMediaChange: (name: string) => void;
}) {
  return <InputMedia onChange={(media) => props.onMediaChange(media.name)} />;
}

// input-media.spec.tsx
test('changes the image', async ({ mount }) => {
  let mediaSelected: string | null = null;

  const component = await mount(
    <InputMediaForTest
      onMediaChange={(mediaName) => {
        mediaSelected = mediaName;
      }}
    />
  );

  await component
    .getByTestId('imageInput')
    .setInputFiles('src/assets/logo.png');
  await expect.poll(() => mediaSelected).toBe('logo.png');
});
```

### Under the Hood (legacy)

Playwright uses **Vite** to bundle components and serves them from a local static web server. When `mount()` is called, the browser navigates to `/playwright/index.html` and renders the specified component. Vite configuration can be customized via the `ctViteConfig` property in `playwright-ct.config.ts`.

## Related

- [configuration.md](../test-runner/configuration.md)
