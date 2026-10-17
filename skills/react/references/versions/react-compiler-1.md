---
source: https://react.dev/blog/2025/10/07/react-compiler-1
---

# React Compiler v1.0

React Compiler 1.0 (October 7, 2025) is the first stable release of the build-time tool that optimizes React apps through automatic memoization. It works on both React and React Native.

## Signature / Usage

```bash
npm install --save-dev --save-exact babel-plugin-react-compiler@latest
```

pnpm:

```bash
pnpm add --save-dev --save-exact babel-plugin-react-compiler@latest
```

yarn:

```bash
yarn add --dev --exact babel-plugin-react-compiler@latest
```

Compiler-powered lint rules via `eslint-plugin-react-hooks` (replaces `eslint-plugin-react-compiler`):

```bash
npm install --save-dev eslint-plugin-react-hooks@latest
```

```js
// eslint.config.js (Flat Config)
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  reactHooks.configs.flat.recommended,
]);
```

```js
// eslintrc.json (Legacy Config)
{
  "extends": ["plugin:react-hooks/recommended"],
  // ...
}
```

## Notes

- Announcements: React Compiler 1.0 is available; compiler-powered lint rules ship in `eslint-plugin-react-hooks`'s `recommended` and `recommended-latest` presets; an incremental adoption guide was published, and Expo, Vite and Next.js partnered so new apps can start with the compiler enabled.
- How it works: currently implemented as a Babel plugin but largely decoupled from Babel; it lowers the Babel AST into its own HIR and runs multiple passes to understand data-flow and mutability, memoizing values granularly, including conditionally (e.g. after an early return). Validation passes encode the Rules of React and surface diagnostics, primarily through `eslint-plugin-react-hooks`.
- Improvements in 1.0: supports optional chains and array indices as dependencies.
- Production numbers reported for Meta Quest Store: initial loads and cross-page navigations improved by up to 12%, certain interactions more than 2.5x faster, memory usage neutral.
- Backwards compatibility: compatible with React 17 and up. If not on React 19, specify a minimum target in the compiler config and add `react-compiler-runtime` as a dependency (see the compiler `target` docs).
- `useMemo` / `useCallback` / `React.memo`: they can continue to be used as an escape hatch for control over which values are memoized (e.g. a memoized value used as an effect dependency). For new code rely on the compiler; for existing code either leave existing memoization in place (removing it can change compilation output) or carefully test before removing.
- New apps: Expo SDK 54 and up has the compiler enabled by default (`npx create-expo-app@latest`); Vite (`npm create vite@latest`) and Next.js (`npx create-next-app@latest`) offer compiler-enabled templates.
- swc support is experimental (Next.js 15.3.1 or greater recommended for build performance); Vite users continue to enable the compiler via vite-plugin-react as a Babel plugin; oxc support was being worked on at the time of the post.
- Upgrading: future compiler versions may change how memoization is applied, which can occasionally cause unexpected behavior (e.g. over- or under-firing of a `useEffect` that depends on a memoized value). Without good test coverage, pin the compiler to an exact version (e.g. `1.0.0`, not `^1.0.0`) using `--save-exact` (npm/pnpm) or `--exact` (yarn) and upgrade manually.
- The lint rules called out: `set-state-in-render`, `set-state-in-effect`, `refs`.

## Related

- [React 19.2](./react-19-2.md)
- [React Versions](./versions.md)
- [Compiler introduction](../compiler/introduction.md)
- [Compiler installation](../compiler/installation.md)
- [Incremental adoption](../compiler/incremental-adoption.md)
- [eslint-plugin-react-hooks](../tooling/eslint-plugin-react-hooks.md)
