# Concurrency Deploy Queue

デプロイは `queue: max` で順番待ちにし、PR の CI は `cancel-in-progress` で古い実行を打ち切る使い分け。

```yaml
# .github/workflows/deploy.yml — main への push を 1 件ずつ順に処理
name: deploy
on:
  push:
    branches:
      - main

concurrency:
  group: production-deploy
  queue: max

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Deploy
        shell: bash
        run: |
          set -euo pipefail
          echo "deploy ${GITHUB_SHA}"
```

```yaml
# .github/workflows/ci.yml — 同一 PR の古い実行をキャンセル
name: ci
on:
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true

jobs:
  test:
    runs-on: ubuntu-latest
    permissions:
      contents: read
    steps:
      - name: Test
        shell: bash
        run: |
          set -euo pipefail
          echo "test ${GITHUB_SHA}"
```

## Notes

- 既定（`queue: single`）では pending は 1 件のみで、新しい実行が古い pending を置き換える。`queue: max` は最大 100 件まで pending で待機し、満杯後の追加分はキャンセルされる
- `queue: max` と `cancel-in-progress: true` の併用は workflow validation error になる
- 待機中の実行は、各実行がグループで待機を開始した時刻順（dispatch 時刻ではない）で処理される。実際の開始時刻は変動しうるため、厳密な順序は保証されない（原文: ordering is not guaranteed）
- `github.ref` は `pull_request` で `refs/pull/<番号>/merge` となり PR ごとに分離される。公式例の `github.head_ref` はブランチ名のため、fork の同名ブランチ間で group が衝突し得る。group 名は大文字小文字を区別しない
- Source: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency
