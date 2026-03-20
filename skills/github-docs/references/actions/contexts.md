# GitHub Actions -- コンテキスト

ワークフロー実行に関するコンテキスト情報のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/accessing-contextual-information-about-workflow-runs

---

## アクセス構文

コンテキストには 2 つの構文でアクセスできる:

```yaml
# プロパティ参照構文
${{ github.sha }}

# インデックス構文
${{ github['sha'] }}
```

プロパティ参照構文は、プロパティ名が英字または `_` で始まり、英数字・`-`・`_` のみを含む場合に使用できる。

---

## github コンテキスト

ワークフロー実行とトリガーイベントの情報。

| プロパティ | 型 | 説明 |
|---|---|---|
| `github.action` | string | 現在実行中のアクション名またはステップ ID |
| `github.action_path` | string | アクションが配置されているパス |
| `github.action_ref` | string | 実行中のアクションの ref |
| `github.action_repository` | string | アクションのオーナー/リポジトリ名 |
| `github.action_status` | string | 複合アクションの現在の結果 |
| `github.actor` | string | ワークフローをトリガーしたユーザー名 |
| `github.actor_id` | string | トリガーしたユーザー/アプリのアカウント ID |
| `github.api_url` | string | GitHub REST API の URL |
| `github.base_ref` | string | PR のターゲットブランチ |
| `github.env` | string | 環境変数ファイルのパス |
| `github.event` | object | webhook ペイロード全体 |
| `github.event_name` | string | トリガーイベント名 |
| `github.event_path` | string | webhook ペイロードファイルのパス |
| `github.graphql_url` | string | GitHub GraphQL API の URL |
| `github.head_ref` | string | PR のソースブランチ |
| `github.job` | string | 現在のジョブ ID |
| `github.path` | string | システム PATH ファイルのパス |
| `github.ref` | string | トリガーしたブランチ/タグの完全修飾 ref |
| `github.ref_name` | string | 短い ref 名（ブランチ名/タグ名） |
| `github.ref_protected` | boolean | ブランチ保護が適用されているか |
| `github.ref_type` | string | ref の種類（`branch` または `tag`） |
| `github.repository` | string | オーナー/リポジトリ名（例: `octocat/Hello-World`） |
| `github.repository_id` | string | リポジトリの数値 ID |
| `github.repository_owner` | string | リポジトリオーナーのユーザー名 |
| `github.repository_owner_id` | string | オーナーのアカウント ID |
| `github.repositoryUrl` | string | リポジトリの Git URL |
| `github.retention_days` | string | ログ/アーティファクトの保持期間 |
| `github.run_id` | string | ワークフロー実行の一意な番号 |
| `github.run_number` | string | 特定ワークフローの連番実行番号 |
| `github.run_attempt` | string | 現在のワークフロー実行の試行回数 |
| `github.secret_source` | string | シークレットのソース（None, Actions, Codespaces, Dependabot） |
| `github.server_url` | string | GitHub サーバーの URL |
| `github.sha` | string | トリガーしたコミット SHA |
| `github.token` | string | GitHub App 認証トークン |
| `github.triggering_actor` | string | ワークフロー再実行を開始したユーザー名 |
| `github.workflow` | string | ワークフロー名またはファイルパス |
| `github.workflow_ref` | string | ワークフローファイルの ref パス |
| `github.workflow_sha` | string | ワークフローファイルのコミット SHA |
| `github.workspace` | string | ランナー上のデフォルトワーキングディレクトリ |

---

## env コンテキスト

ワークフロー・ジョブ・ステップレベルで設定された環境変数。

| プロパティ | 型 | 説明 |
|---|---|---|
| `env.<env_name>` | string | 指定された環境変数の値 |

```yaml
env:
  MY_VAR: hello
jobs:
  example:
    steps:
      - if: env.MY_VAR == 'hello'
        run: echo ${{ env.MY_VAR }}
```

---

## vars コンテキスト

Organization、リポジトリ、または環境レベルで設定されたカスタム設定変数。

| プロパティ | 型 | 説明 |
|---|---|---|
| `vars.<variable_name>` | string | 設定変数の値 |

```yaml
steps:
  - run: echo ${{ vars.MY_CONFIG_VAR }}
```

---

## job コンテキスト

現在実行中のジョブに関する情報。

| プロパティ | 型 | 説明 |
|---|---|---|
| `job.container` | object | ジョブのコンテナ情報 |
| `job.container.id` | string | コンテナ ID |
| `job.container.network` | string | コンテナネットワーク ID |
| `job.services` | object | サービスコンテナの定義 |
| `job.services.<service_id>.id` | string | サービスコンテナ ID |
| `job.services.<service_id>.network` | string | サービスネットワーク ID |
| `job.services.<service_id>.ports` | object | サービスの公開ポート |
| `job.status` | string | 現在のジョブステータス（`success`, `failure`, `cancelled`） |

---

## jobs コンテキスト

再利用可能ワークフローでのみ利用可能。出力の設定に使用する。

| プロパティ | 型 | 説明 |
|---|---|---|
| `jobs.<job_id>.result` | string | ジョブの結果（`success`, `failure`, `cancelled`, `skipped`） |
| `jobs.<job_id>.outputs` | object | ジョブの出力コレクション |
| `jobs.<job_id>.outputs.<output_name>` | string | 特定の出力値 |

---

## steps コンテキスト

現在のジョブで `id` が設定されたステップの情報。

| プロパティ | 型 | 説明 |
|---|---|---|
| `steps.<step_id>.outputs` | object | ステップの出力コレクション |
| `steps.<step_id>.outputs.<output_name>` | string | 特定の出力値 |
| `steps.<step_id>.conclusion` | string | `continue-on-error` 適用後の完了ステップの結果 |
| `steps.<step_id>.outcome` | string | `continue-on-error` 適用前のステップの結果 |

`conclusion` と `outcome` の値: `success`, `failure`, `cancelled`, `skipped`

```yaml
steps:
  - id: my-step
    run: echo "result=value" >> $GITHUB_OUTPUT
  - run: echo ${{ steps.my-step.outputs.result }}
  - if: steps.my-step.conclusion == 'success'
    run: echo "Step succeeded"
```

---

## runner コンテキスト

ジョブを実行しているランナーの詳細。

| プロパティ | 型 | 説明 |
|---|---|---|
| `runner.name` | string | ランナー名 |
| `runner.os` | string | OS（`Linux`, `Windows`, `macOS`） |
| `runner.arch` | string | アーキテクチャ（`X86`, `X64`, `ARM`, `ARM64`） |
| `runner.temp` | string | テンポラリディレクトリのパス |
| `runner.tool_cache` | string | プリインストールツールのディレクトリパス |
| `runner.debug` | string | デバッグログが有効な場合 `1` |
| `runner.environment` | string | ランナータイプ（`github-hosted` または `self-hosted`） |

---

## secrets コンテキスト

ワークフローで利用可能なシークレットの名前と値。

| プロパティ | 型 | 説明 |
|---|---|---|
| `secrets.GITHUB_TOKEN` | string | 自動作成される認証トークン |
| `secrets.<secret_name>` | string | 指定されたシークレットの値 |

```yaml
steps:
  - run: echo "token length: ${#TOKEN}"
    env:
      TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

注意: シークレットは `if:` 条件で直接参照できない。環境変数経由で使用する。

---

## strategy コンテキスト

マトリクス実行戦略の情報。

| プロパティ | 型 | 説明 |
|---|---|---|
| `strategy.fail-fast` | boolean | 失敗時に進行中のジョブをキャンセルするか |
| `strategy.job-index` | number | 現在のジョブのゼロベースインデックス |
| `strategy.job-total` | number | マトリクスジョブの総数 |
| `strategy.max-parallel` | number | 同時実行ジョブの最大数 |

---

## matrix コンテキスト

ワークフローで定義されたマトリクスプロパティ。

| プロパティ | 型 | 説明 |
|---|---|---|
| `matrix.<property_name>` | string | マトリクスプロパティの値 |

```yaml
strategy:
  matrix:
    os: [ubuntu-latest, windows-latest]
    node: [18, 20]
steps:
  - run: echo "OS=${{ matrix.os }}, Node=${{ matrix.node }}"
```

---

## needs コンテキスト

現在のジョブが依存する全ジョブの出力。

| プロパティ | 型 | 説明 |
|---|---|---|
| `needs.<job_id>.outputs` | object | 依存ジョブの出力 |
| `needs.<job_id>.outputs.<output_name>` | string | 特定の出力値 |
| `needs.<job_id>.result` | string | 依存ジョブの結果ステータス |

```yaml
jobs:
  build:
    outputs:
      version: ${{ steps.ver.outputs.version }}
    steps:
      - id: ver
        run: echo "version=1.0" >> $GITHUB_OUTPUT
  deploy:
    needs: build
    steps:
      - run: echo "Deploying version ${{ needs.build.outputs.version }}"
```

---

## inputs コンテキスト

再利用可能ワークフローまたは手動トリガーワークフローの入力プロパティ。

| プロパティ | 型 | 説明 |
|---|---|---|
| `inputs.<name>` | string/number/boolean | 個別の入力値 |

```yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        type: string
        required: true
jobs:
  deploy:
    steps:
      - run: echo "Deploying to ${{ inputs.environment }}"
```
