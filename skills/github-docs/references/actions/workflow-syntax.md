# GitHub Actions -- ワークフロー構文リファレンス

ワークフローファイル (`.github/workflows/*.yml`) で使用可能な全キーの網羅的リファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions

---

## トップレベルキー

### `name`

ワークフローの表示名。省略時はファイルパスが表示される。

```yaml
name: CI Pipeline
```

### `run-name`

個別のワークフロー実行に表示される名前。`github` および `inputs` コンテキストの式をサポート。

```yaml
run-name: Deploy to ${{ inputs.deploy_target }} by @${{ github.actor }}
```

### `on`

ワークフローをトリガーするイベントを定義する。

```yaml
# 単一イベント
on: push

# 複数イベント
on: [push, pull_request]

# イベント設定付き
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
```

詳細は [events-triggers.md](./events-triggers.md) を参照。

### `permissions`

`GITHUB_TOKEN` のアクセスレベルを制御する。ワークフローレベルで設定すると全ジョブに適用される。

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write

# 一括設定
permissions: read-all
permissions: write-all
permissions: {}  # 全権限を無効化
```

利用可能なスコープ: `actions`, `attestations`, `checks`, `contents`, `deployments`, `discussions`, `id-token`, `issues`, `packages`, `pages`, `pull-requests`, `repository-projects`, `security-events`, `statuses`

各スコープの値: `read`, `write`, `none`

### `env`

ワークフロー全体で利用できる環境変数のマップ。

```yaml
env:
  NODE_ENV: production
  API_URL: https://api.example.com
```

注意: 同じ `env` マップ内で他の変数を参照することはできない。

### `defaults`

全ジョブに適用されるデフォルト設定。

```yaml
defaults:
  run:
    shell: bash
    working-directory: ./src
```

#### `defaults.run`

`run` ステップのデフォルト `shell` と `working-directory` を設定する。

対応シェル: `bash`, `pwsh`, `python`, `sh`, `cmd`, `powershell`

### `concurrency`

同じ concurrency グループのジョブ/ワークフローが同時に1つだけ実行されるようにする。

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

- `group`: グループ名（大文字小文字を区別しない）
- `cancel-in-progress`: `true` にすると、同じグループの進行中のジョブをキャンセルする
- `github`, `inputs`, `vars` コンテキストの式をサポート

### `jobs`

ワークフロー内の全ジョブを定義するコンテナ。ジョブはデフォルトで並列実行される。

---

## ジョブレベルキー (`jobs.<job_id>`)

`<job_id>` は英数字、`-`、`_` で構成され、英字または `_` で始まる必要がある。

### `jobs.<job_id>.name`

UI に表示されるジョブの表示名。

```yaml
jobs:
  build:
    name: Build Application
```

### `jobs.<job_id>.permissions`

ジョブ固有のトークン権限。ワークフローレベルの設定を上書きする。

```yaml
jobs:
  deploy:
    permissions:
      contents: read
      deployments: write
```

### `jobs.<job_id>.needs`

このジョブの前に完了する必要があるジョブ ID のリスト。

```yaml
jobs:
  test:
    needs: build
  deploy:
    needs: [build, test]
```

### `jobs.<job_id>.if`

ジョブを実行するかどうかを決める条件式。

```yaml
jobs:
  deploy:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
```

### `jobs.<job_id>.runs-on`

ジョブを実行するランナー環境を指定する。

```yaml
runs-on: ubuntu-latest
runs-on: [self-hosted, linux, x64]
runs-on: ${{ matrix.os }}
```

主なラベル: `ubuntu-latest`, `ubuntu-24.04`, `ubuntu-22.04`, `windows-latest`, `windows-2022`, `macos-latest`, `macos-15`, `macos-14`, `macos-13`

### `jobs.<job_id>.environment`

デプロイジョブの環境名。URL の指定も可能。

```yaml
environment:
  name: production
  url: https://example.com
```

### `jobs.<job_id>.concurrency`

ジョブレベルの concurrency 制御。ワークフローレベルと同じ構文。

### `jobs.<job_id>.outputs`

依存ジョブからアクセス可能な出力マップ。

```yaml
jobs:
  build:
    outputs:
      artifact_url: ${{ steps.upload.outputs.url }}
  deploy:
    needs: build
    steps:
      - run: echo ${{ needs.build.outputs.artifact_url }}
```

### `jobs.<job_id>.env`

ジョブレベルの環境変数。ワークフローレベルの `env` を上書きする。

### `jobs.<job_id>.defaults`

ジョブレベルの `run` ステップのデフォルト設定。ワークフローレベルの設定を上書きする。

### `jobs.<job_id>.timeout-minutes`

ジョブの最大実行時間（分）。デフォルトは 360 分（6 時間）。超過すると自動キャンセルされる。

### `jobs.<job_id>.strategy`

ビルドマトリクスを定義し、ジョブのバリエーションを並列実行する。

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node-version: [18, 20, 22]
  fail-fast: false
  max-parallel: 2
```

- `fail-fast`: `true`（デフォルト）の場合、マトリクスジョブの1つが失敗すると残りもキャンセルされる
- `max-parallel`: 同時実行するマトリクスジョブの最大数

#### `strategy.matrix` の詳細

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [18, 20]
    # include で追加の組み合わせを定義
    include:
      - os: ubuntu-latest
        node: 22
        experimental: true
    # exclude で特定の組み合わせを除外
    exclude:
      - os: windows-latest
        node: 18
```

- `include`: マトリクスに組み合わせを追加、または既存の組み合わせにプロパティを追加
- `exclude`: マトリクスから特定の組み合わせを除外
- マトリクス値へのアクセス: `${{ matrix.os }}`, `${{ matrix.node }}`
- `fromJSON()` で動的マトリクスを生成可能

### `jobs.<job_id>.container`

ジョブを Docker コンテナ内で実行する設定。

```yaml
container:
  image: node:20
  env:
    NODE_ENV: production
  ports:
    - 80
  volumes:
    - my_docker_volume:/volume_mount
  options: --cpus 1
  credentials:
    username: ${{ github.actor }}
    password: ${{ secrets.GITHUB_TOKEN }}
```

### `jobs.<job_id>.services`

ジョブ実行中に利用可能なサービスコンテナ（データベース、キャッシュ等）を定義する。

```yaml
services:
  postgres:
    image: postgres:15
    env:
      POSTGRES_PASSWORD: postgres
    ports:
      - 5432:5432
    options: >-
      --health-cmd pg_isready
      --health-interval 10s
      --health-timeout 5s
      --health-retries 5
  redis:
    image: redis:7
    ports:
      - 6379:6379
```

### `jobs.<job_id>.uses`

再利用可能ワークフローを参照する。

```yaml
jobs:
  call-reusable:
    uses: owner/repo/.github/workflows/reusable.yml@main
    # または同一リポジトリ
    uses: ./.github/workflows/reusable.yml
```

### `jobs.<job_id>.with`

再利用可能ワークフローやアクションに入力を渡す。

```yaml
jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml
    with:
      environment: production
      version: 1.0.0
```

### `jobs.<job_id>.secrets`

再利用可能ワークフローにシークレットを渡す。

```yaml
jobs:
  call-reusable:
    uses: ./.github/workflows/reusable.yml
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY }}
    # または全シークレットを継承
    secrets: inherit
```

---

## ステップレベルキー (`jobs.<job_id>.steps[*]`)

ステップはジョブ内で順番に実行される。各ステップはランナー上の独自のプロセスで実行される。

### `steps[*].id`

ステップの一意識別子。後続のステップで出力を参照するために使用する。

```yaml
steps:
  - id: build-step
    run: echo "version=1.0" >> $GITHUB_OUTPUT
  - run: echo ${{ steps.build-step.outputs.version }}
```

### `steps[*].if`

条件付きでステップを実行する。ステータス関数やコンテキストを使用可能。

```yaml
steps:
  - if: success()
    run: echo "Previous steps succeeded"
  - if: failure()
    run: echo "A previous step failed"
  - if: always()
    run: echo "Always runs"
  - if: cancelled()
    run: echo "Workflow was cancelled"
  - if: github.event_name == 'push'
    run: echo "Triggered by push"
```

### `steps[*].name`

ログに表示されるステップの説明的な名前。

### `steps[*].uses`

アクションまたは再利用可能ワークフローを実行する。

```yaml
steps:
  # パブリックアクション（バージョン指定）
  - uses: actions/checkout@v4
  # パブリックアクション（SHA 指定）
  - uses: actions/checkout@8e5e7e5ab8b370d6c329ec480221332ada57f0ab
  # 同一リポジトリのアクション
  - uses: ./.github/actions/my-action
  # Docker Hub イメージ
  - uses: docker://alpine:3.18
```

### `steps[*].run`

シェルコマンドを実行する。`defaults.run.shell` と `defaults.run.working-directory` の設定を継承する。

```yaml
steps:
  - run: echo "Hello World"
  # 複数行コマンド
  - run: |
      echo "Line 1"
      echo "Line 2"
```

### `steps[*].working-directory`

このステップのみのワーキングディレクトリを上書きする。

### `steps[*].shell`

このステップのみのシェルを上書きする。

```yaml
steps:
  - run: echo "Using PowerShell"
    shell: pwsh
```

対応シェル: `bash`, `pwsh`, `python`, `sh`, `cmd`, `powershell`

### `steps[*].with`

アクションの入力パラメータ（キーバリューマップ）。

```yaml
steps:
  - uses: actions/setup-node@v4
    with:
      node-version: '20'
      cache: 'npm'
```

### `steps[*].env`

ステップレベルの環境変数。

```yaml
steps:
  - run: echo $MY_VAR
    env:
      MY_VAR: hello
```

### `steps[*].continue-on-error`

`true` に設定すると、ステップが失敗してもジョブの実行を継続する。

```yaml
steps:
  - run: ./optional-check.sh
    continue-on-error: true
```

### `steps[*].timeout-minutes`

ステップ固有の実行タイムアウト（分）。

---

## 条件式

`if` キーで使用される条件式の構文。

```yaml
# コンテキスト参照
if: github.ref == 'refs/heads/main'

# 論理演算子
if: github.event_name == 'push' && github.ref == 'refs/heads/main'
if: github.event_name == 'push' || github.event_name == 'workflow_dispatch'
if: "!cancelled()"

# 関数
if: contains(github.event.pull_request.labels.*.name, 'deploy')
if: startsWith(github.ref, 'refs/tags/')
if: always()
```

詳細は [expressions.md](./expressions.md) を参照。

---

## 制約事項

- ワークフローファイルは `.github/workflows/` ディレクトリに `.yml` または `.yaml` 拡張子で配置する
- `workflow_dispatch` の入力は最大 25 個のトップレベルプロパティ
- パスフィルタリングの Git diff は 300 ファイルまで（超過時はワークフローが自動トリガーされない）
- concurrency グループ名は大文字小文字を区別しない
- スケジュールの最短間隔は 5 分
