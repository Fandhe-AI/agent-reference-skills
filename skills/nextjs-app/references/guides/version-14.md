# Upgrading to Version 14

Upgrade a Next.js application from version 13 to 14.

## Signature / Usage

```bash filename="Terminal"
npm i next@next-14 react@18 react-dom@18 && npm i eslint-config-next@next-14 -D
```

## Breaking / notable changes

- Minimum Node.js version bumped from 16.14 to 18.17 (16.x reached end-of-life).
- `next export` command removed in favor of the `output: 'export'` config option (see [Static Exports](./static-exports.md)).
- `next/server` import of `ImageResponse` renamed to `next/og` (`next-og-import` codemod available).
- `@next/font` package fully removed in favor of built-in `next/font` (`built-in-next-font` codemod available).
- WASM target for `next-swc` removed.

## Notes

- If using TypeScript, also upgrade `@types/react` and `@types/react-dom`.
- Migration checklist: Node.js 18.17 or later with compatible React 18 dependencies and types; static exports use `output: 'export'` and `next build` instead of `next export`; `ImageResponse` imports use `next/og` instead of `next/server`; font imports use `next/font` instead of `@next/font`; the app does not rely on the removed `next-swc` WASM target; supported checks and affected runtime behavior pass.

## Related

- [Codemods](./codemods.md)
- [Version 15 Upgrade](./version-15.md)
