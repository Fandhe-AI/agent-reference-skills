# GitHub Actions -- 同時実行制御 (concurrency)

`concurrency` によるワークフロー / ジョブの同時実行制御のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency

---

## 概要

同一 concurrency group で同時に実行できるジョブまたはワークフローは最大 1 つ。group は任意の文字列または式で、ワークフローレベルとジョブレベル（`jobs.<job_id>.concurrency`）の両方で指定できる。利用可能なコンテキストはレベルで異なる。ワークフローレベルの `concurrency` は `github` / `inputs` / `vars` のみ。ジョブレベルの `jobs.<job_id>.concurrency` は加えて `needs` / `strategy` / `matrix` も使える。

同一 group で実行中のものがあると、新規キューは `pending` になる。既定では同 group の既存 `pending` は取り消され、新しいものに置き換わる。

```yaml
on:
  push:
    branches:
      - main

concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

---

## オプション

| キー | 説明 |
|---|---|
| `group` | concurrency group 名（文字列または式）。大文字小文字を区別しない（`prod` と `Prod` は同一） |
| `cancel-in-progress` | `true` で実行中のものも取り消す。許可コンテキストの式でも指定可（条件付き取り消し） |
| `queue` | `single`（既定）: pending は最大 1 件で新しいものに置換。`max`: 最大 100 件まで pending 可、満杯時は追加分を取り消し |

- `queue: max` と `cancel-in-progress: true` の併用は不可（ワークフロー検証エラー）。
- 同一 group 内は FIFO（group 待機を開始した時刻順）。ジョブ / 実行の実際の開始時刻は変動するため順序は保証されない。

---

## 使用例

### ジョブレベル

```yaml
jobs:
  job-1:
    runs-on: ubuntu-latest
    concurrency:
      group: staging_environment
      cancel-in-progress: true
```

### 複数 pending をキューイング

```yaml
concurrency:
  group: production-deploy
  queue: max
```

### フォールバック値

`github.head_ref` は `pull_request` イベントでのみ定義される。他イベントも扱う場合はフォールバックを指定する（run ID は一意かつ常に定義される）。

```yaml
concurrency:
  group: ${{ github.head_ref || github.run_id }}
  cancel-in-progress: true
```

### 現在のワークフローのみ取り消す

複数ワークフローで group 名が重複すると他ワークフローの実行も取り消される。`github.workflow` を含めて一意にする。

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

### 特定ブランチのみ取り消す

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: ${{ !contains(github.ref, 'release/')}}
```

`release/1.2.3` への複数 push は取り消されず、`main` 等では取り消される。

---

## Notes

- group を指定せず `group: ${{ github.ref }}` のみのような設計では、同じ ref の別ワークフローも取り消し対象になる。`github.workflow` を含めること。
- 組織 / Enterprise の GitHub-hosted runner の処理中ジョブ数は「Viewing your current jobs」で確認できる。
- concurrency group キューの上限（100）は limits ページにも記載（`limits.md`）。

## Related

- [workflow-syntax.md](./workflow-syntax.md)
- [contexts.md](./contexts.md)
- [expressions.md](./expressions.md)
- [limits.md](./limits.md)
