# Performance

Source: https://knip.dev/guides/performance

## Cache

```sh
knip --cache
```

Consecutive runs are 10-40% faster. Cache based on file modification time + size.

## Ignoring Files

`ignore` patterns: files are still analyzed but excluded from report. To exclude from analysis, use negated `entry`/`project` patterns instead.

## Metrics

```sh
knip --performance
```

Shows execution data for expensive functions like `findReferences`.

## ignoreExportsUsedInFile

Introduces 0.25%-10% overhead. Measure with:

```sh
knip --performance-fn hasRefsInFile
```

## Bun

On large projects, `knip-bun` is slower than `knip` on Node.js. Knip parses files with oxc-parser, which passes the AST to JavaScript using raw transfer. Raw transfer needs an `ArrayBuffer` larger than 4 GiB, which Bun can't allocate. So oxc-parser disables raw transfer under Bun and uses the slower path that `KNIP_DISABLE_RAW_TRANSFER=1` selects on Node.js.

Measured with Node.js v26.13 and Bun v1.4.4 on macOS, Bun was about 20% slower on the Sentry repository (about 10,000 files) and on par on the Astro monorepo, while using 14-18% less memory. On Knip's own repository, Bun was faster because it starts faster.

## Last Resort

For severe performance issues, lint individual workspaces.

## Notes

- Source: https://knip.dev/guides/performance (knip@6.45.1 docs, retrieved 2026-11-14)
