# Matrix Build

複数の OS・言語バージョンの組み合わせでジョブを並列実行するマトリクスビルド。

```yaml
# .github/workflows/matrix.yml
name: Matrix CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ${{ matrix.os }}

    strategy:
      fail-fast: false
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [18, 20, 22]
        exclude:
          - os: windows-latest
            node-version: 18

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'

      - run: npm ci
      - run: npm test
```

## Notes

- `fail-fast: false` を指定すると、1 つのマトリクスジョブが失敗しても他のジョブを継続できる
- `exclude` で特定の組み合わせを除外し、不要なジョブ実行を削減できる
- `include` を使うと既存の組み合わせにプロパティを追加したり、新しい組み合わせを追加できる
- `max-parallel` でマトリクスジョブの同時実行数を制限できる（デフォルトは可能な最大数）
