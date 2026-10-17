---
source: https://vite.dev/guide/api-javascript#transformwithoxc
---

# transformWithOxc / transformWithEsbuild

Transform JavaScript or TypeScript with Oxc Transformer (`transformWithOxc`) or esbuild (`transformWithEsbuild`, deprecated).

## Signature / Usage

```ts
async function transformWithOxc(
  code: string,
  filename: string,
  options?: OxcTransformOptions,
  inMap?: object,
): Promise<Omit<OxcTransformResult, 'errors'> & { warnings: string[] }>
```

```ts
async function transformWithEsbuild(
  code: string,
  filename: string,
  options?: EsbuildTransformOptions,
  inMap?: object,
): Promise<ESBuildTransformResult>
```

## Notes

- `transformWithOxc` is useful for plugins that prefer matching Vite's internal Oxc Transformer transform.
- `transformWithEsbuild` is **Deprecated**: use `transformWithOxc` instead. It is useful for plugins that prefer matching Vite's internal esbuild transform.
- Migration (v7 → v8): `esbuild` is no longer directly used by Vite and is now an optional dependency. A plugin that uses `transformWithEsbuild` requires `esbuild` installed as a `devDependency`. `transformWithEsbuild` is deprecated and will be removed in the future.

## Related

- [oxc / esbuild options](../config-shared/oxc-esbuild.md)
- [Migration: Rolldown and Oxc](../migration-troubleshooting/migration-rolldown-oxc.md)
