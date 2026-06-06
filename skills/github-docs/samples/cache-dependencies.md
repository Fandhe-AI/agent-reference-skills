# Cache Dependencies

`actions/cache` を使って依存関係をキャッシュし、ワークフローの実行時間を短縮するパターン。

```yaml
# .github/workflows/ci.yml
name: CI with Cache

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      # setup-node の cache オプションで npm キャッシュを自動管理（推奨）
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm test

      # actions/cache を直接使う場合（cache-hit で条件分岐したい場合など）
      - uses: actions/cache@v4
        id: cache-build
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.ts') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
            ${{ runner.os }}-nextjs-

      - if: steps.cache-build.outputs.cache-hit != 'true'
        run: npm run build
```

## Notes

- `setup-node`, `setup-python`, `setup-go` 等の `setup-*` アクションの組み込み `cache` オプションが最も簡単で推奨される方法
- `key` は `runner.os` + 依存ファイルのハッシュで構成するのがベストプラクティス
- `restore-keys` は具体的なものから一般的なものの順に並べ、完全一致がない場合の部分一致フォールバックに使う
- キャッシュはリポジトリデフォルトあたり 10 GB 上限、7 日間未アクセスで自動削除される
