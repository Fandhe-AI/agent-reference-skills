---
source: https://vite.dev/config/dep-optimization-options#optimizedeps-rolldownoptions
---

# optimizeDeps.rolldownOptions / esbuildOptions

Options passed to the bundler during dependency scanning and optimization. `esbuildOptions` is deprecated in favor of `rolldownOptions`.

## Signature / Usage

```ts
optimizeDeps.rolldownOptions: Omit<RolldownOptions, 'input' | 'logLevel' | 'output'> & {
  output?: Omit<RolldownOutputOptions, 'format' | 'sourcemap' | 'dir' | 'banner'>
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `optimizeDeps.rolldownOptions` | `Omit<RolldownOptions, 'input' \| 'logLevel' \| 'output'> & { output?: Omit<RolldownOutputOptions, 'format' \| 'sourcemap' \| 'dir' \| 'banner'> }` | Options passed to Rolldown during dep scanning and optimization |
| `optimizeDeps.esbuildOptions` | `Omit<EsbuildBuildOptions, 'bundle' \| 'entryPoints' \| 'external' \| 'write' \| 'watch' \| 'outdir' \| 'outfile' \| 'outbase' \| 'outExtension' \| 'metafile'>` | Deprecated |

## Notes

- Not inherited by environments.
- Certain options are omitted because changing them would not be compatible with Vite's dep optimization. `plugins` are merged with Vite's dep plugin.
- Deprecated: `optimizeDeps.esbuildOptions` is converted to `optimizeDeps.rolldownOptions` internally. Use `optimizeDeps.rolldownOptions` instead.
- See the migration pages in this skill for the v7 to v8 dependency optimizer change (esbuild to Rolldown).

## Related

- [optimize-deps-entries-include-exclude.md](./optimize-deps-entries-include-exclude.md)
- [optimize-deps-flags.md](./optimize-deps-flags.md)
