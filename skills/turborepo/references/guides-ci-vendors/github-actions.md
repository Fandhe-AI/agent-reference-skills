# GitHub Actions

## ワークフロー設定例（pnpm）

```yaml
name: CI
on:
  push:
    branches: ["main"]
  pull_request:
    types: [opened, synchronize]

jobs:
  build:
    name: Build and Test
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 2
      - uses: pnpm/action-setup@v3
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm build
      - run: pnpm test
```

## Remote Cache 設定

1. Vercel でスコープ付きアクセストークンを作成
2. GitHub Secrets に `TURBO_TOKEN` を登録
3. GitHub Variables に `TURBO_TEAM` を登録
4. ワークフロー YAML に環境変数を追加:

```yaml
env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ vars.TURBO_TEAM }}
```

## actions/cache によるローカルキャッシング

```yaml
- uses: actions/cache@v4
  with:
    path: .turbo
    key: ${{ runner.os }}-turbo-${{ github.sha }}
    restore-keys: |
      ${{ runner.os }}-turbo-
```
