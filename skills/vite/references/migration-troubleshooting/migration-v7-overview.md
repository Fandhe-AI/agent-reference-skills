---
source: https://vite.dev/guide/migration
---

# Migration from v7 (overview)

Vite 8 uses Rolldown and Oxc based tools instead of esbuild and Rollup. This page covers the default browser target change, the gradual migration path via `rolldown-vite`, removed deprecated features, and the pointer to the v6 guide.

## Signature / Usage

Users migrating from `rolldown-vite` (the technical preview release for Rolldown integrated Vite for v6 and v7) can undo the dependency change in `package.json` and update to Vite 8:

```json
{
  "devDependencies": {
    "vite": "npm:rolldown-vite@7.2.2" // [!code --]
    "vite": "^8.0.0" // [!code ++]
  }
}
```

## Options / Props

Default `build.target` / `'baseline-widely-available'` browser versions:

| Browser | v7 | v8 |
| --- | --- | --- |
| Chrome | 107 | 111 |
| Edge | 107 | 111 |
| Firefox | 104 | 114 |
| Safari | 16.0 | 16.4 |

## Notes

- If migrating from `rolldown-vite`, only the sections with an `NRV` badge in the title are applicable: "Default Browser Target Change" and "Removed Deprecated Features".
- These browser versions align with Baseline Widely Available feature sets as of 2026-01-01 (released about two and a half years earlier).
- The `rolldown-vite` package implements Vite 7 with Rolldown, without other Vite 8 changes, and can be used as an intermediate step. See the Rolldown Integration guide in the Vite 7 docs (https://v7.vite.dev/guide/rolldown) to switch to `rolldown-vite` from Vite 7.
- Removed deprecated feature (NRV): passing a URL to `import.meta.hot.accept` is no longer supported. Pass an id instead (vitejs/vite#21382).
- Migration from v6: check the Migration from v6 Guide in the Vite v7 docs (https://v7.vite.dev/guide/migration) first, then proceed with the changes on this page.
- Details of the Rolldown / Oxc changes are split into the following pages.

## Related

- [migration-rolldown-oxc.md](./migration-rolldown-oxc.md)
- [migration-minify-interop.md](./migration-minify-interop.md)
- [migration-build-api-changes.md](./migration-build-api-changes.md)
- [migration-advanced.md](./migration-advanced.md)
