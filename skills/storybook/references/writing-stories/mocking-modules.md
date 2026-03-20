# Mocking Modules

Replaces imported module dependencies (local utilities or npm packages) with controlled test doubles so components can be tested in isolation.

## Overview / Signature

Three strategies are available:

| Strategy | Best for |
|----------|---------|
| **Automocking** (`sb.mock()`) | Vite and Webpack (ESM-only packages) |
| **Mock files** (`__mocks__/`) | Custom behavior, Webpack + CommonJS packages |
| **Subpath imports** | Per-condition swapping in `package.json` |
| **Builder aliases** | Vite-only path aliasing |

## Usage

### Automocking — register in `.storybook/preview.ts`

```typescript
import { sb } from 'storybook/test';

// Spy only (preserves original, allows assertions)
sb.mock(import('../lib/session.ts'), { spy: true });
sb.mock(import('uuid'), { spy: true });

// Fully automocked (replaces exports with mock functions)
sb.mock(import('../lib/session.ts'));
sb.mock(import('uuid'));
```

### Mock files

```javascript
// lib/__mocks__/session.js  (local module)
export function getUserFromSession() {
  return { name: 'Mocked User' };
}

// __mocks__/uuid.js  (root level for packages)
export function v4() {
  return '1234-5678-90ab-cdef';
}
```

### Using mocks in stories

```typescript
import { mocked, expect } from 'storybook/test';
import { getUserFromSession } from '../lib/session';

const meta = {
  component: AuthButton,
  beforeEach: async () => {
    mocked(getUserFromSession).mockReturnValue({ name: 'John Doe' });
  },
} satisfies Meta<typeof AuthButton>;

export const LogIn: Story = {
  play: async ({ canvas }) => {
    await expect(getUserFromSession).toHaveBeenCalled();
  },
};
```

### Available mock methods

| Method | Purpose |
|--------|---------|
| `mockReturnValue(value)` | Sets synchronous return value |
| `mockResolvedValue(value)` | For async functions |
| `mockImplementation(fn)` | Custom implementation |

### Subpath imports (`package.json`)

```json
{
  "imports": {
    "#lib/session": {
      "storybook": "./lib/session.mock.ts",
      "default": "./lib/session.ts"
    }
  }
}
```

### Setup and cleanup pattern

```typescript
const meta = {
  component: Page,
  async beforeEach() {
    MockDate.set('2024-02-14');
    return () => MockDate.reset(); // returned function runs as cleanup
  },
} satisfies Meta<typeof Page>;
```

## Notes

- `sb.mock()` must be called only in `.storybook/preview.ts`, not in story files.
- Local module paths in `sb.mock()` must be relative, include the file extension, and avoid aliases.
- Webpack: automocking only works with ESM-only node_modules. Use mock files for CommonJS packages.
- Module code still evaluates at load time even when automocked — side effects still run.
- All mocking decisions are finalized at build time; there is no runtime `unmock()`.

## Related

- [Mocking Network Requests](./mocking-network-requests.md)
- [Mocking Providers](./mocking-providers.md)
- [Play Function](./play-function.md)
