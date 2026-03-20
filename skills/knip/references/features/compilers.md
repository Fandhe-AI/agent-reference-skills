# Compilers

Source: https://knip.dev/features/compilers

## Overview

Projects may have non-JS/TS source files requiring compilation. Knip uses compilers to extract import statements from these files.

## Built-in Compilers

| Extension | Note |
|-----------|------|
| `.astro` | Built-in |
| `.css` | Enabled via `tailwindcss` |
| `.mdx` | Built-in |
| `.prisma` | Built-in |
| `.sass`, `.scss` | Built-in |
| `.svelte` | Built-in |
| `.vue` | Built-in |

Built-in compilers use regex extraction (fast, no dependencies required).

### Manual Enabling

```typescript
export default {
  compilers: {
    mdx: true,
  },
};
```

## Custom Compilers

Function signature:

```typescript
(source: string, filename: string) => string;
```

Async functions supported. Extensions are automatically added to file patterns.

### CSS Example

```typescript
export default {
  compilers: {
    css: (text: string) => [...text.matchAll(/(?<=@)import[^;]+/g)].join('\n'),
  },
};
```

### MDX Example

```typescript
import { compile } from '@mdx-js/mdx';
export default {
  compilers: {
    mdx: async text => (await compile(text)).toString(),
  },
};
```

### Svelte Example

```typescript
import { compile } from 'svelte/compiler';
export default {
  compilers: {
    svelte: (source: string) => compile(source, {}).js.code,
  },
};
```

### Vue Example

Uses `vue/compiler-sfc` to parse script blocks, script setup blocks, and style blocks.
