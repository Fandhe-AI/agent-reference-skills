# GitHub Actions -- 環境変数

デフォルト環境変数とカスタム環境変数のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/store-information-in-variables

---

## デフォルト環境変数

GitHub が全ワークフロー実行に自動的に設定する環境変数。

| 変数名 | 説明 |
|---|---|
| `CI` | 常に `true`。CI 環境の検出に使用 |
| `GITHUB_ACTION` | 現在実行中のアクション名またはステップ ID |
| `GITHUB_ACTION_PATH` | アクションが配置されているパス |
| `GITHUB_ACTION_REPOSITORY` | アクションのリポジトリ（`owner/repo` 形式） |
| `GITHUB_ACTIONS` | 常に `true`。GitHub Actions 環境の検出に使用 |
| `GITHUB_ACTOR` | ワークフローをトリガーしたユーザー名 |
| `GITHUB_ACTOR_ID` | トリガーしたアカウントの ID |
| `GITHUB_API_URL` | GitHub REST API の URL（例: `https://api.github.com`） |
| `GITHUB_BASE_REF` | PR のベースブランチ名 |
| `GITHUB_ENV` | 環境変数設定ファイルのパス |
| `GITHUB_EVENT_NAME` | トリガーイベント名 |
| `GITHUB_EVENT_PATH` | webhook ペイロードファイルのパス |
| `GITHUB_GRAPHQL_URL` | GitHub GraphQL API の URL |
| `GITHUB_HEAD_REF` | PR のヘッドブランチ名 |
| `GITHUB_JOB` | 現在のジョブ ID |
| `GITHUB_OUTPUT` | ステップ出力設定ファイルのパス |
| `GITHUB_PATH` | システム PATH 設定ファイルのパス |
| `GITHUB_REF` | トリガーしたブランチ/タグの完全修飾 ref |
| `GITHUB_REF_NAME` | 短い ref 名（ブランチ名/タグ名） |
| `GITHUB_REF_PROTECTED` | ブランチ保護が有効な場合 `true` |
| `GITHUB_REF_TYPE` | ref の種類（`branch` または `tag`） |
| `GITHUB_REPOSITORY` | オーナー/リポジトリ名（例: `octocat/Hello-World`） |
| `GITHUB_REPOSITORY_ID` | リポジトリの数値 ID |
| `GITHUB_REPOSITORY_OWNER` | リポジトリオーナーのユーザー名 |
| `GITHUB_REPOSITORY_OWNER_ID` | オーナーのアカウント ID |
| `GITHUB_RETENTION_DAYS` | ログ/アーティファクトの保持日数 |
| `GITHUB_RUN_ATTEMPT` | ワークフロー実行の試行回数 |
| `GITHUB_RUN_ID` | ワークフロー実行の一意な ID |
| `GITHUB_RUN_NUMBER` | 特定ワークフローの連番実行番号 |
| `GITHUB_SERVER_URL` | GitHub サーバーの URL（例: `https://github.com`） |
| `GITHUB_SHA` | トリガーしたコミット SHA |
| `GITHUB_STEP_SUMMARY` | ジョブサマリー Markdown ファイルのパス |
| `GITHUB_TOKEN` | 自動生成される認証トークン |
| `GITHUB_TRIGGERING_ACTOR` | ワークフロー再実行を開始したユーザー名 |
| `GITHUB_WORKFLOW` | ワークフロー名 |
| `GITHUB_WORKFLOW_REF` | ワークフローの ref パス |
| `GITHUB_WORKFLOW_SHA` | ワークフローファイルのコミット SHA |
| `GITHUB_WORKSPACE` | ランナー上のデフォルトワーキングディレクトリ |
| `RUNNER_ARCH` | ランナーのアーキテクチャ（`X86`, `X64`, `ARM`, `ARM64`） |
| `RUNNER_DEBUG` | デバッグログ有効時に `1` |
| `RUNNER_NAME` | ランナー名 |
| `RUNNER_OS` | ランナーの OS（`Linux`, `Windows`, `macOS`） |
| `RUNNER_TEMP` | テンポラリディレクトリのパス |
| `RUNNER_TOOL_CACHE` | プリインストールツールのディレクトリパス |

---

## カスタム環境変数の設定

### ワークフローレベル

全ジョブの全ステップで利用可能。

```yaml
env:
  NODE_ENV: production
  API_URL: https://api.example.com

jobs:
  build:
    steps:
      - run: echo $NODE_ENV  # production
```

### ジョブレベル

特定ジョブの全ステップで利用可能。ワークフローレベルの同名変数を上書きする。

```yaml
jobs:
  build:
    env:
      BUILD_TYPE: release
    steps:
      - run: echo $BUILD_TYPE  # release
```

### ステップレベル

特定ステップでのみ利用可能。ジョブ/ワークフローレベルの同名変数を上書きする。

```yaml
steps:
  - run: echo $MY_VAR
    env:
      MY_VAR: step-specific-value
```

---

## 環境変数のアクセス方法

### シェルコマンド内（`run` ステップ）

```yaml
# Bash / Linux / macOS
- run: echo $MY_VAR

# PowerShell / Windows
- run: echo $env:MY_VAR
  shell: pwsh

# cmd.exe / Windows
- run: echo %MY_VAR%
  shell: cmd
```

### コンテキスト経由（`run` ステップ外）

```yaml
# if 条件やアクション入力で使用
- if: env.MY_VAR == 'expected'
  uses: some/action@v1
  with:
    input: ${{ env.MY_VAR }}
```

---

## GITHUB_ENV ファイル（ステップ間の変数共有）

`GITHUB_ENV` ファイルに書き込むことで、後続のステップで利用可能な環境変数を設定する。

```yaml
steps:
  # 変数を設定
  - run: echo "MY_VAR=hello" >> $GITHUB_ENV

  # 後続ステップで利用
  - run: echo $MY_VAR  # hello
```

### 複数行の値

デリミタ構文を使用する:

```yaml
steps:
  - run: |
      {
        echo 'JSON_RESPONSE<<EOF'
        curl https://api.example.com/data
        echo EOF
      } >> $GITHUB_ENV
```

---

## GITHUB_OUTPUT ファイル（ステップ出力）

`GITHUB_OUTPUT` ファイルに書き込むことで、他のステップやジョブから参照可能な出力を設定する。

```yaml
steps:
  # 出力を設定
  - id: build
    run: echo "version=1.0.0" >> $GITHUB_OUTPUT

  # 同じジョブの後続ステップで参照
  - run: echo "Version is ${{ steps.build.outputs.version }}"
```

### 複数行の出力

```yaml
steps:
  - id: generate
    run: |
      {
        echo 'result<<EOF'
        echo 'line 1'
        echo 'line 2'
        echo EOF
      } >> $GITHUB_OUTPUT
```

### ジョブ間での出力共有

```yaml
jobs:
  build:
    outputs:
      version: ${{ steps.ver.outputs.version }}
    steps:
      - id: ver
        run: echo "version=1.0.0" >> $GITHUB_OUTPUT

  deploy:
    needs: build
    steps:
      - run: echo "Deploying ${{ needs.build.outputs.version }}"
```

---

## GITHUB_STEP_SUMMARY（ジョブサマリー）

`GITHUB_STEP_SUMMARY` ファイルに Markdown を書き込むことで、ワークフロー実行のサマリーページにカスタムコンテンツを表示する。

```yaml
steps:
  - run: |
      echo "## Build Results" >> $GITHUB_STEP_SUMMARY
      echo "| Test | Result |" >> $GITHUB_STEP_SUMMARY
      echo "|------|--------|" >> $GITHUB_STEP_SUMMARY
      echo "| Unit | Pass |" >> $GITHUB_STEP_SUMMARY
```

---

## GITHUB_PATH（PATH への追加）

`GITHUB_PATH` ファイルに書き込むことで、後続のステップのシステム PATH にディレクトリを追加する。

```yaml
steps:
  - run: echo "$HOME/.local/bin" >> $GITHUB_PATH
  - run: my-custom-tool  # PATH に追加されたので直接実行可能
```

---

## 設定変数（vars コンテキスト）

リポジトリ、環境、Organization レベルで設定可能なカスタム設定変数。シークレットと異なり暗号化されない。

```yaml
steps:
  - run: echo ${{ vars.DEPLOY_TARGET }}
  - if: vars.FEATURE_FLAG == 'true'
    run: echo "Feature enabled"
```

スコープの優先順位: 環境 > リポジトリ > Organization
