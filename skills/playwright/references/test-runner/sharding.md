# Sharding

Sharding splits the test suite into independent parts ("shards") that run on separate machines, scaling test execution horizontally across CI runners.

## Signature / Usage

```bash
npx playwright test --shard=1/4
npx playwright test --shard=2/4
npx playwright test --shard=3/4
npx playwright test --shard=4/4
```

Each invocation runs one quarter of the suite; running all four in parallel finishes roughly four times faster than a single run.

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `--shard=<index>/<total>` | CLI flag | 1-based shard index and total shard count, e.g. `--shard=1/4` |

## Notes

- With `fullyParallel: true`, tests are distributed at the individual-test level for more balanced shards regardless of file size.
- Without `fullyParallel`, tests split at the file level; unevenly sized files can leave some shards with far more (or zero) work than others.
- Use the `blob` reporter per shard, then merge with `npx playwright merge-reports --reporter html ./all-blob-reports` to produce a single unified report.
- Playwright can only shard tests that are eligible to run in parallel.

```typescript
// playwright.config.ts
export default defineConfig({
  testDir: './tests',
  reporter: process.env.CI ? 'blob' : 'html',
});
```

```yaml
# GitHub Actions matrix
jobs:
  playwright-tests:
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      - uses: actions/checkout@v6
      - uses: actions/setup-node@v6
        with:
          node-version: lts/*
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1

  merge-reports:
    if: ${{ !cancelled() }}
    needs: [playwright-tests]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/download-artifact@v5
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
```

## Related

- [Parallelism & Sharding](./parallelism.md)
- [Reporters](./reporters.md)
