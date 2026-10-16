# Concurrency Deploy Queue

デプロイは `queue: max` で順番待ちにし、PR の CI は `cancel-in-progress` で古い実行を打ち切る使い分け。

```yaml
# .github/workflows/deploy.yml — main への push を 1 件ずつ順に処理
on:
  push:
    branches:
      - main

concurrency:
  group: production-deploy
  queue: max
```

```yaml
# .github/workflows/ci.yml — 同一 PR の古い実行をキャンセル
on:
  pull_request:

concurrency:
  group: ${{ github.workflow }}-${{ github.head_ref || github.run_id }}
  cancel-in-progress: true
```

## Notes

- 既定（`queue: single`）では pending は 1 件のみで、新しい実行が古い pending を置き換える。`queue: max` は最大 100 件まで pending で待機し、満杯後の追加分はキャンセルされる
- `queue: max` と `cancel-in-progress: true` の併用は workflow validation error になる
- 待機中の実行は FIFO（グループ待機を開始した時刻順）で処理されるが、順序は保証されない
- `github.head_ref` は `pull_request` イベントでのみ定義されるため、`|| github.run_id` をフォールバックにする。group 名は大文字小文字を区別しない
