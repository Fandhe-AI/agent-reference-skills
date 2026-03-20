# previewAnnotations

Adds scripts that execute within the story preview environment. Intended for framework maintainers.

## Type

```typescript
type previewAnnotations =
  | string[]
  | ((config: string[], options: Options) => string[] | Promise<string[]>)
```

## Usage

```typescript
// Used in a framework preset (e.g. @storybook/nextjs)
import type { StorybookConfig } from './types';

export const previewAnnotations: StorybookConfig['previewAnnotations'] = (entry = []) => [
  ...entry,
  import.meta.resolve('@storybook/nextjs/preview'),
];
```

## Notes

- **Intended for framework developers**, not typical Storybook users or addon authors
- Addon authors and end users should configure `preview.js` instead
- Supports both static string arrays and async function-based configuration

## Related

- [preview-head.md](./preview-head.md)
- [preview-body.md](./preview-body.md)
