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
| `.less` | Built-in |
| `.styl`, `.stylus` | Built-in |
| `.svelte` | Built-in |
| `.tsrx` | Enabled when a `@tsrx/*` package is installed |
| `.vue` | Built-in |

Built-in compilers use regex extraction to collect `import` statements (fast, no dependencies required). Tradeoff: unused exports inside these files go unreported. Override a built-in with the framework's own compiler when that fidelity is needed (see Svelte / Vue examples).

### Manual Enabling

Compilers are enabled only when a related dependency is found. If detection does not work for your project, set `true`:

```typescript
export default {
  compilers: {
    mdx: true,
  },
};
```

### Compiled files and `project` patterns

The default `project` patterns include compiler extensions automatically. When overriding `project`, list them explicitly:

```typescript
export default {
  project: ['src/**/*.{ts,tsx,css}'],
};
```

Files outside `project` are not analyzed, so their imports don't count. Excluding e.g. `.css` drops what stylesheets import (`@import 'tailwindcss'` then reports `tailwindcss` as an unused dependency, a false positive). Knip reports a configuration hint when a compiled extension is excluded this way.

## Custom Compilers

Function signature:

```typescript
(source: string, filename: string) => string | PromiseLike<string>;
```

Return a string or a Promise-like value resolving to a string; the `async` keyword is optional. Extensions are automatically added to file patterns.

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
