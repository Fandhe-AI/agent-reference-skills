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

## Last Resort

For severe performance issues, lint individual workspaces.
