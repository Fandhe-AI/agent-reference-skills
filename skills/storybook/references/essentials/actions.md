# Actions

Tracks when event handlers are invoked and displays their arguments in the actions panel. Functions as a mock/spy system for component event callbacks.

## Overview

Actions log calls made to event handler args, showing event names and argument values in a collapsible tree view. Supports both explicit `fn()` spies and automatic matching via `argTypesRegex`.

## Configuration

### Parameters (`parameters.actions`)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `argTypesRegex` | string | — | Regex to auto-create actions for matching arg names (e.g. `'^on.*'`) |
| `disable` | boolean | `false` | Disables the actions panel |
| `expandLevel` | number | `1` | Initial tree expansion depth for nested action arguments |

## Signature / Usage

### Recommended: `fn()` from `storybook/test`

```typescript
import { fn } from 'storybook/test';
import type { Meta } from '@storybook/react';
import { Button } from './Button';

const meta = {
  component: Button,
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;
```

### Via `action()` helper

```typescript
import { action } from 'storybook/actions';

const meta = {
  component: Button,
  args: { onClick: action('on-click') },
};
```

### Via `argTypesRegex` (global)

```typescript
// .storybook/preview.ts
const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on.*' },
  },
};
```

### Spying on arbitrary calls

```typescript
import { spyOn } from 'storybook/test';

const preview: Preview = {
  async beforeEach() {
    spyOn(console, 'log').mockName('console.log');
  },
};
```

## API Exports

```js
import { action, configureActions } from 'storybook/actions';
```

| Export | Type | Description |
|--------|------|-------------|
| `action` | `(name: string, options?: ActionOptions) => HandlerFunction` | Returns a handler function that logs its call arguments to the Actions panel under `name` |
| `configureActions` | `(options?: ActionOptions) => void` | Configures global behavior of the actions addon; call in `.storybook/preview.*` or before actions are used |

```js
args: { onClick: action('on-click') }
```

`configureActions` options:

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `limit` | `number` | `50` | Maximum number of action entries to display; the oldest are discarded when reached |
| `clearOnStoryChange` | `boolean` | `true` | Clear the actions panel when navigating to a different story |
| `depth` | `number` | `10` | Serialization depth for action arguments |

```js
// .storybook/preview.ts
import { configureActions } from 'storybook/actions';

configureActions({
  limit: 20,
  clearOnStoryChange: false,
});
```

## Notes

- Use `fn()` (not `argTypesRegex`) when stories have play functions — auto-matched args are not available as spies inside `play`.
- Actions display both event names and argument values in the panel.
- Actions log automatically on user interaction or when triggered from a play function.
- The docs list the type as `(name?: string) => void`, but the v10.6.2 source (code/core/src/actions/runtime/action.ts) returns a `HandlerFunction` (`(...args: any[]) => any`).

## Related

- [Controls](./controls.md)
- [Toolbars & Globals](./toolbars-and-globals.md)
