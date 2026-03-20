# GitHub Actions -- イベントとトリガー

ワークフローをトリガーする全イベントのリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows

---

## イベント設定構文

```yaml
on:
  # 単一イベント
  push:

  # アクティビティタイプ指定
  issues:
    types: [opened, labeled]

  # ブランチ/パスフィルタ
  push:
    branches: [main, 'release/**']
    paths: ['src/**']

  # 複数イベント
  pull_request:
    branches: [main]
    types: [opened, synchronize]
```

---

## フィルタパターン

### ブランチ/タグフィルタ

```yaml
on:
  push:
    branches:
      - main
      - 'release/**'
      - '!release/**-alpha'   # 除外パターン
    branches-ignore:
      - 'feature/**'
    tags:
      - 'v*'
    tags-ignore:
      - 'v*-rc*'
```

- `branches` と `branches-ignore` は同時に使用できない（`!` プレフィックスで除外を表現）
- `tags` と `tags-ignore` は同時に使用できない
- グロブパターン: `*`（単一レベル）, `**`（複数レベル）, `?`, `+`, `!`

### パスフィルタ

```yaml
on:
  push:
    paths:
      - 'src/**'
      - '**.js'
    paths-ignore:
      - 'docs/**'
      - '**.md'
```

- `paths` と `paths-ignore` は同時に使用できない

---

## 全イベント一覧

### branch_protection_rule

ブランチ保護ルールの変更時にトリガー。

- **アクティビティタイプ**: `created`, `edited`, `deleted`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- ワークフローファイルはデフォルトブランチに必要

### check_run

チェック実行のイベント。

- **アクティビティタイプ**: `created`, `rerequested`, `completed`, `requested_action`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- GitHub Actions 自身からの再帰的トリガーを防止

### check_suite

チェックスイートのイベント。

- **アクティビティタイプ**: `completed`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### create

ブランチまたはタグの作成時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: 作成されたブランチ/タグの最新コミット
- **GITHUB_REF**: 作成されたブランチ/タグ
- 3つ以上のタグが同時に作成された場合はイベントが発生しない

### delete

ブランチまたはタグの削除時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### deployment

デプロイメントの作成時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デプロイ対象のコミット
- **GITHUB_REF**: デプロイ対象のブランチ/タグ

### deployment_status

デプロイメントのステータス変更時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デプロイ対象のコミット
- **GITHUB_REF**: デプロイ対象のブランチ/タグ
- ステータスが `inactive` の場合はトリガーしない

### discussion

ディスカッションのイベント。

- **アクティビティタイプ**: `created`, `edited`, `deleted`, `transferred`, `pinned`, `unpinned`, `labeled`, `unlabeled`, `locked`, `unlocked`, `category_changed`, `answered`, `unanswered`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### discussion_comment

ディスカッションコメントのイベント。

- **アクティビティタイプ**: `created`, `edited`, `deleted`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### fork

リポジトリのフォーク時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### gollum

Wiki ページの作成または更新時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### issue_comment

Issue またはプルリクエストのコメントイベント。

- **アクティビティタイプ**: `created`, `edited`, `deleted`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- Issue と PR の両方でトリガーされる。区別には `github.event.issue.pull_request` を使用

### issues

Issue のイベント。

- **アクティビティタイプ**: `opened`, `edited`, `deleted`, `transferred`, `pinned`, `unpinned`, `closed`, `reopened`, `assigned`, `unassigned`, `labeled`, `unlabeled`, `locked`, `unlocked`, `milestoned`, `demilestoned`, `typed`, `untyped`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### label

ラベルのイベント。

- **アクティビティタイプ**: `created`, `edited`, `deleted`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### merge_group

マージキューのチェック要求時。

- **アクティビティタイプ**: `checks_requested`
- **GITHUB_SHA**: マージグループの SHA
- **GITHUB_REF**: マージグループの ref

### milestone

マイルストーンのイベント。

- **アクティビティタイプ**: `created`, `closed`, `opened`, `edited`, `deleted`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### page_build

GitHub Pages のビルド時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### public

リポジトリがプライベートからパブリックに変更された時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### pull_request

プルリクエストのイベント。

- **アクティビティタイプ**: `assigned`, `unassigned`, `labeled`, `unlabeled`, `opened`, `edited`, `closed`, `reopened`, `synchronize`, `converted_to_draft`, `locked`, `unlocked`, `enqueued`, `dequeued`, `milestoned`, `demilestoned`, `ready_for_review`, `review_requested`, `review_request_removed`, `auto_merge_enabled`, `auto_merge_disabled`
- **デフォルトタイプ**: `opened`, `synchronize`, `reopened`
- **GITHUB_SHA**: `GITHUB_REF` ブランチの最新マージコミット
- **GITHUB_REF**: `refs/pull/NUMBER/merge`
- **フィルタ**: `branches`, `branches-ignore`, `paths`, `paths-ignore`

```yaml
on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]
    paths:
      - 'src/**'
```

注意事項:
- マージコンフリクトがある場合は実行されない
- フォークからの PR では `GITHUB_TOKEN` は読み取り専用
- HEAD コミット SHA は `github.event.pull_request.head.sha` で取得

### pull_request_review

PR レビューのイベント。

- **アクティビティタイプ**: `submitted`, `edited`, `dismissed`
- **GITHUB_SHA**: `GITHUB_REF` ブランチの最新マージコミット
- **GITHUB_REF**: `refs/pull/NUMBER/merge`
- 承認状態は `github.event.review.state` で確認

### pull_request_review_comment

PR の diff コメントのイベント。

- **アクティビティタイプ**: `created`, `edited`, `deleted`
- **GITHUB_SHA**: `GITHUB_REF` ブランチの最新マージコミット
- **GITHUB_REF**: `refs/pull/NUMBER/merge`

### pull_request_target

PR イベント（ベースブランチのコンテキストで実行）。

- **アクティビティタイプ**: `pull_request` と同じ
- **デフォルトタイプ**: `opened`, `synchronize`, `reopened`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- **フィルタ**: `branches`, `branches-ignore`, `paths`, `paths-ignore`
- セキュリティ注意: デフォルトブランチのコンテキストで実行されるため、信頼できないコードの実行に注意

### push

コミットのプッシュ時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: プッシュされた先端コミット
- **GITHUB_REF**: 更新された ref
- **フィルタ**: `branches`, `branches-ignore`, `tags`, `tags-ignore`, `paths`, `paths-ignore`

```yaml
on:
  push:
    branches: [main, 'release/**']
    tags: ['v*']
    paths-ignore:
      - '**.md'
```

注意: 5,000 以上のブランチが同時にプッシュされた場合はイベントが発生しない

### registry_package

パッケージの公開/更新時。

- **アクティビティタイプ**: `published`, `updated`
- **GITHUB_SHA**: 公開されたパッケージのコミット
- **GITHUB_REF**: パッケージのブランチ/タグ

### release

リリースのイベント。

- **アクティビティタイプ**: `published`, `unpublished`, `created`, `edited`, `deleted`, `prereleased`, `released`
- **GITHUB_SHA**: タグ付きリリースの最新コミット
- **GITHUB_REF**: `refs/tags/TAG_NAME`
- ドラフトリリースは `created`/`edited`/`deleted` をトリガーしない
- 安定版とプレリリースの両方には `published` を使用

### repository_dispatch

外部イベントによるトリガー。

- **アクティビティタイプ**: カスタム（ユーザー指定の `event_type`）
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- `client_payload`: 最大 10 個のトップレベルプロパティ、65,535 文字制限
- `event_type`: 100 文字制限

```yaml
on:
  repository_dispatch:
    types: [deploy, rollback]
```

### schedule

cron スケジュールによる定期実行。

```yaml
on:
  schedule:
    - cron: '30 5 * * 1-5'   # 平日 5:30 UTC
    - cron: '0 0 * * 0'      # 毎週日曜 0:00 UTC
```

cron フィールド: `分 時 日 月 曜日`

| フィールド | 値 |
|---|---|
| 分 | 0-59 |
| 時 | 0-23 |
| 日 | 1-31 |
| 月 | 1-12 |
| 曜日 | 0-6（0=日曜） |

演算子: `*`（任意）, `,`（リスト）, `-`（範囲）, `/`（ステップ）

- デフォルトブランチでのみ実行
- 最短間隔: 5 分
- 高負荷時は遅延する可能性がある
- パブリックリポジトリでは 60 日間アクティビティがないと自動無効化
- `github.event.schedule` でトリガーしたスケジュールにアクセス可能

### status

コミットステータスの変更時。

- **アクティビティタイプ**: なし
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- 状態: `error`, `failure`, `pending`, `success`

### watch

リポジトリがスターされた時。

- **アクティビティタイプ**: `started`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ

### workflow_call

再利用可能ワークフローとして呼び出された時。

- **アクティビティタイプ**: なし
- 呼び出し元ワークフローのコンテキストを継承

```yaml
on:
  workflow_call:
    inputs:
      environment:
        type: string
        required: true
    secrets:
      deploy_key:
        required: true
    outputs:
      result:
        value: ${{ jobs.build.outputs.result }}
```

入力タイプ: `boolean`, `number`, `string`

詳細は [reusable-workflows.md](./reusable-workflows.md) を参照。

### workflow_dispatch

手動トリガー。

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Deploy environment'
        required: true
        type: choice
        options:
          - staging
          - production
      dry_run:
        description: 'Dry run'
        type: boolean
        default: false
```

- 入力タイプ: `string`, `boolean`, `choice`, `environment`
- 最大 25 個のトップレベルプロパティ
- 65,535 文字のペイロード制限

### workflow_run

他のワークフローの実行イベント。

- **アクティビティタイプ**: `completed`, `requested`, `in_progress`
- **GITHUB_SHA**: デフォルトブランチの最新コミット
- **GITHUB_REF**: デフォルトブランチ
- **フィルタ**: `branches`, `branches-ignore`
- 最大 3 レベルのワークフローチェーン
- トリガーワークフローのアーティファクトに REST API でアクセス可能

```yaml
on:
  workflow_run:
    workflows: ["Build"]
    types: [completed]
    branches: [main]
```
