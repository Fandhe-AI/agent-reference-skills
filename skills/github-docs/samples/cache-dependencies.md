# Cache Dependencies

`actions/cache` を使って依存関係をキャッシュし、ワークフローの実行時間を短縮するパターン。

```yaml
# .github/workflows/ci.yml
name: CI with Cache

on: [push, pull_request]

permissions:
  contents: read   # 既定値に依存せず最小権限を明示する

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      # setup-node の cache オプションで npm キャッシュを自動管理（推奨）
      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        shell: bash
        run: |
          set -euo pipefail
          npm ci

      - name: Test
        shell: bash
        run: |
          set -euo pipefail
          npm test

      # actions/cache を直接使う場合（cache-hit で条件分岐したい場合など）
      - uses: actions/cache@0057852bfaa89a56745cba8c7296529d2fc39830  # v4.3.0
        id: cache-build
        with:
          path: .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-${{ hashFiles('**/*.js', '**/*.ts') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json') }}-
            ${{ runner.os }}-nextjs-

      # `.next/cache` はインクリメンタルビルドの中間キャッシュであり成果物ではない。
      # cache-hit の有無にかかわらずビルドは常に実行する（キャッシュは再ビルドを速くするだけ）
      - name: Build
        shell: bash
        run: |
          set -euo pipefail
          npm run build
```

## Notes

- `setup-node`, `setup-python`, `setup-go` 等の `setup-*` アクションの組み込み `cache` オプションが最も簡単で推奨される方法
- `key` は `runner.os` + 依存ファイルのハッシュで構成するのがベストプラクティス
- `restore-keys` は具体的なものから一般的なものの順に並べ、完全一致がない場合の部分一致フォールバックに使う
- キャッシュはリポジトリデフォルトあたり 10 GB 上限、7 日間未アクセスで自動削除される
- **中間キャッシュ（`.next/cache` 等）の `cache-hit` でビルド自体をスキップしない**。復元されるのは成果物ではなく中間生成物であり、スキップするとビルド出力が存在しないまま後続ステップへ進む
- `cache-hit` による分岐が妥当なのは、キャッシュ対象がそれ自体で完結する成果物（インストール済み依存ツリー等）の場合に限る
- 外部 action は可動タグではなくコミット SHA 固定で参照する
