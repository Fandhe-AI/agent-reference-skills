# Component Testing

Playwright Test can mount and test individual UI components in a real browser. Components execute with real clicks, real layout, and visual regression support. This feature is **experimental**.

## Supported Frameworks

| Framework | Package                               |
| --------- | ------------------------------------- |
| React     | `@playwright/experimental-ct-react`   |
| Vue       | `@playwright/experimental-ct-vue`     |
| Svelte    | `@playwright/experimental-ct-svelte`  |

## Setup

### Installation

```bash
npm init playwright@latest -- --ct
```

### Required Files

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

## mount

The `mount` fixture renders a component into the browser and returns a Locator pointing to the mounted component.

### React

```tsx
import { test, expect } from '@playwright/experimental-ct-react';
import App from './App';

test('renders app', async ({ mount }) => {
  const component = await mount(<App />);
  await expect(component).toContainText('Learn React');
});
```

### Vue

```ts
import { test, expect } from '@playwright/experimental-ct-vue';
import App from './App.vue';

test('renders app', async ({ mount }) => {
  const component = await mount(App, {
    props: { msg: 'greetings' },
  });
  await expect(component).toContainText('greetings');
});
```

### Svelte

```ts
import { test, expect } from '@playwright/experimental-ct-svelte';
import App from './App.svelte';

test('renders app', async ({ mount }) => {
  const component = await mount(App);
  await expect(component).toBeVisible();
});
```

## Props

Pass props during mount:

```tsx
// React
const component = await mount(<Component msg="greetings" />);

// Vue
const component = await mount(Component, { props: { msg: 'greetings' } });

// Svelte
const component = await mount(Component, { props: { msg: 'greetings' } });
```

## Callbacks and Events

```tsx
// React
const component = await mount(<Component onClick={() => { /* ... */ }} />);

// Vue
const component = await mount(Component, {
  on: { click() { /* ... */ } },
});

// Svelte
const component = await mount(Component, {
  on: { click() { /* ... */ } },
});
```

## Children and Slots

```tsx
// React -- pass JSX children
const component = await mount(<Component>Child content</Component>);

// Vue -- use slots
const component = await mount(Component, {
  slots: { default: 'Slot content' },
});

// Svelte -- use slots
const component = await mount(Component, {
  slots: { default: 'Slot content' },
});
```

## Hooks

Hooks run in the browser and configure the environment before or after mounting. Define them in `playwright/index.ts`.

### beforeMount

Runs before the component mounts. Use it to wrap the component with providers (router, store, theme):

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

Pass `hooksConfig` from the test:

```tsx
test('products page with routing', async ({ mount }) => {
  const component = await mount<HooksConfig>(<ProductsPage />, {
    hooksConfig: { enableRouting: true },
  });
  await expect(component).toContainText('Products');
});
```

### afterMount

Runs after the component mounts. Use it for post-mount setup such as waiting for async initialization.

## Lifecycle

### unmount

Remove the component from the DOM:

```tsx
const component = await mount(<Component />);
await component.unmount();
```

### update

Update props, callbacks, or slots on the already-mounted component:

```tsx
const component = await mount(<Component msg="hello" />);
await component.update({
  props: { msg: 'updated' },
  on: { click() { /* ... */ } },
  slots: { default: 'New Child' },
});
```

## Router Fixture

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

## Limitations

### Complex objects cannot be passed as props

Only plain serializable values (strings, numbers, dates, plain objects) work. Class instances and complex objects fail:

```tsx
// This will NOT work
const component = await mount(<ProcessViewer process={process} />);
```

### Synchronous callbacks are not supported

Callbacks live in Node.js and cannot return values synchronously to the browser component:

```tsx
// This will NOT work
const component = await mount(<ColorPicker colorGetter={() => 'red'} />);
```

### Workaround: Test Stories

Create thin wrapper components ("stories") that convert complex objects to serializable data:

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

## Under the Hood

Playwright uses **Vite** to bundle components and serves them from a local static web server. When `mount()` is called, the browser navigates to `/playwright/index.html` and renders the specified component. Vite configuration can be customized via the `ctViteConfig` property in `playwright-ct.config.ts`.
