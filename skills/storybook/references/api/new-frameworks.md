# Frameworks (Adding New Framework Support)

How to create a new framework integration for Storybook.

## Overview

Storybook supports React, Vue, Angular, Web Components, Svelte, and others. To add a new framework you need to provide: (1) **server-side** build configuration and (2) **client-side** rendering logic.

Use `@storybook/html` as a starting point — it has no framework-specific peculiarities and an available boilerplate template.

## Project Structure

```
app/<framework>/           # framework package
examples/<framework>-kitchen-sink/  # example application
```

## Server-Side Setup

### package.json bin entries

```json
{
  "bin": {
    "storybook": "./bin/index.js",
    "build-storybook": "./bin/build.js"
  }
}
```

Both scripts pass an **options object** to `@storybook/core/server`.

### Server Options

```typescript
export default {
  packageJson: JSON.parse(readFileSync(pkg.up({ cwd: process.cwd() }))),
  framework: 'vue',
  frameworkPresets: [import.meta.resolve('./framework-preset-vue.js')],
  // optional: frameworkPath resolves from .storybook dir to dist/client/index.js
};
```

| Option | Description |
|--------|-------------|
| `framework` | String identifier passed to addons for framework-specific tasks |
| `frameworkPresets` | Array of preset paths with webpack/babel customizations |
| `frameworkPath` | Optional path to custom client entry (`dist/client/index.js`) |

## Client-Side Implementation

### Renderable Objects

Stories return framework-specific objects:

```typescript
// Vue-style story
export const Sample: Story = {
  render: () => ({
    template: '<button :label="label" />',
    data: { label: 'hello button' },
  }),
};
```

### Render Function

```typescript
const rootElement = document.getElementById('root');

export default function renderMain({ storyFn }: RenderMainArgs) {
  const storyObj = storyFn();
  const html = fn(storyObj);
  rootElement.innerHTML = html;
}
```

### Client Entry (`src/client/preview/index.ts`)

```typescript
import { start } from 'storybook/preview-api';
import './globals';
import render from './render';

const api = start(render);
```

### Globals File

```typescript
import { global } from '@storybook/global';
global.window.STORYBOOK_ENV = 'vue';
```

## Reference Implementations

| Framework | Location |
|-----------|----------|
| React | `code/renderers/react` |
| Vue 3 | `code/renderers/vue3` |
| Angular | `code/frameworks/angular` |
| Web Components | `code/renderers/web-components` |

## Notes

- Framework presets are standard Storybook presets — use them for webpack/babel customization
- The server options object abstracts framework-independent functionality via `@storybook/core/server`
- `frameworkPath` should resolve to `dist/client/index.js` within your framework package

## Related

- [CLI Options](./cli-options.md)
- [CSF](./csf.md)
