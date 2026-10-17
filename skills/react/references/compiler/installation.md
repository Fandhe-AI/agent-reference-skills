---
source: https://react.dev/learn/react-compiler/installation
---

# Installation

How to install and configure React Compiler in a React application, per build tool.

## Signature / Usage

Install as a `devDependency`:

```bash
npm install -D babel-plugin-react-compiler@latest
# Yarn
yarn add -D babel-plugin-react-compiler@latest
# pnpm
pnpm install -D babel-plugin-react-compiler@latest
```

Babel (`babel.config.js`):

```js
module.exports = {
  plugins: [
    'babel-plugin-react-compiler', // must run first!
    // ... other plugins
  ],
  // ... other config
};
```

Vite (`@vitejs/plugin-react` 6.0.0 or later, `reactCompilerPreset`):

```bash
npm install -D @rolldown/plugin-babel
```

```js
// vite.config.js
import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()]
    }),
  ],
});
```

Vite with an older `@vitejs/plugin-react` (the inline Babel option was removed in 6.0.0):

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
});
```

Vite using the Babel plugin directly with `@rolldown/plugin-babel`:

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      plugins: ['babel-plugin-react-compiler'],
    }),
  ],
});
```

React Router (`vite-plugin-babel`):

```bash
npm install vite-plugin-babel
```

```js
// vite.config.js
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import { reactRouter } from "@react-router/dev/vite";

const ReactCompilerConfig = { /* ... */ };

export default defineConfig({
  plugins: [
    reactRouter(),
    babel({
      filter: /\.[jt]sx?$/,
      babelConfig: {
        presets: ["@babel/preset-typescript"], // if you use TypeScript
        plugins: [
          ["babel-plugin-react-compiler", ReactCompilerConfig],
        ],
      },
    }),
  ],
});
```

ESLint integration:

```bash
npm install -D eslint-plugin-react-hooks@latest
```

Verify the build output (compiled code includes automatic memoization logic):

```js
import { c as _c } from "react/compiler-runtime";
export default function MyApp() {
  const $ = _c(1);
  let t0;
  if ($[0] === Symbol.for("react.memo_cache_sentinel")) {
    t0 = <div>Hello World</div>;
    $[0] = t0;
  } else {
    t0 = $[0];
  }
  return t0;
}
```

Opt a component out while troubleshooting:

```js
function ProblematicComponent() {
  "use no memo";
  // Component code here
}
```

## Notes

- Prerequisites: React Compiler is designed to work best with React 19, but it also supports React 17 and 18.
- It is designed to work by default without any configuration. Configure it only in special circumstances (for example, to target React versions below 19).
- React Compiler must run **first** in your Babel plugin pipeline. The compiler needs the original source information for proper analysis, so it must process your code before other transformations.
- Next.js: refer to the Next.js docs (`reactCompiler` in next.config.js). Webpack: a community webpack loader is available (SukkaW/react-compiler-webpack). Expo, Rspack and Rsbuild: refer to their own docs. Metro (React Native) uses Babel, so follow the Babel section.
- ESLint: the rule identifies code that can't be optimized. When it reports an error, the compiler skips optimizing that specific component or hook; this is safe and the compiler continues optimizing the rest. The compiler rules are available in the `recommended-latest` preset of `eslint-plugin-react-hooks`.
- Verify setup: components optimized by React Compiler show a "Memo ✨" badge in React DevTools (development mode).
- `"use no memo"` is a temporary opt-out; fix the underlying issue and remove the directive once resolved.
- Distinct from framework-level setup: this page covers the compiler itself; see also the nextjs-app and react-router skills for their framework settings (plain text reference, no link).

## Related

- [Introduction](./introduction.md)
- [target](./target.md)
- [Configuration](./configuration.md)
- [Incremental Adoption](./incremental-adoption.md)
- [Debugging and Troubleshooting](./debugging.md)
- [Compiling Libraries](./compiling-libraries.md)
