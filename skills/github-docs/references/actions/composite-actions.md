# GitHub Actions -- 複合アクション

複合アクション（Composite Actions）のリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/sharing-automations/creating-actions/creating-a-composite-action

---

## 概要

複合アクションは、複数のワークフローステップを 1 つのアクションにまとめる仕組み。`run` コマンドと `uses` アクションを組み合わせて使用できる。

---

## action.yml の構造

```yaml
name: 'Setup and Build'
description: 'Install dependencies and build the project'
author: 'Your Name'

inputs:
  node-version:
    description: 'Node.js version to use'
    required: false
    default: '20'
  working-directory:
    description: 'Working directory for the build'
    required: false
    default: '.'

outputs:
  build-version:
    description: 'The version that was built'
    value: ${{ steps.version.outputs.version }}

runs:
  using: 'composite'
  steps:
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}

    - name: Install dependencies
      run: npm ci
      shell: bash
      working-directory: ${{ inputs.working-directory }}

    - name: Build
      run: npm run build
      shell: bash
      working-directory: ${{ inputs.working-directory }}

    - name: Get version
      id: version
      run: echo "version=$(node -p 'require(\"./package.json\").version')" >> $GITHUB_OUTPUT
      shell: bash
      working-directory: ${{ inputs.working-directory }}
```

---

## 必須要素

### `runs.using: "composite"`

複合アクションであることを宣言する必須キー。

### `runs.steps`

実行するステップの配列。各ステップは以下のキーをサポートする:

| キー | 必須 | 説明 |
|---|---|---|
| `run` | `uses` と排他 | 実行するシェルコマンド |
| `shell` | `run` 使用時は必須 | シェルの種類（`bash`, `pwsh`, `sh`, `cmd`, `powershell`, `python`） |
| `uses` | `run` と排他 | 使用するアクション |
| `with` | いいえ | アクションへの入力パラメータ |
| `name` | いいえ | ステップの表示名 |
| `id` | いいえ | ステップの一意識別子（出力参照に必要） |
| `if` | いいえ | 条件式 |
| `env` | いいえ | ステップの環境変数 |
| `working-directory` | いいえ | ワーキングディレクトリ |
| `continue-on-error` | いいえ | 失敗しても続行するか |

重要: `run` ステップでは `shell` の指定が必須。複合アクション内では `defaults.run.shell` が適用されない。

---

## 入力（inputs）

```yaml
inputs:
  environment:
    description: 'Target deployment environment'
    required: true
  debug:
    description: 'Enable debug mode'
    required: false
    default: 'false'
```

### 入力へのアクセス方法

- **式内**: `${{ inputs.environment }}`
- **環境変数**: `INPUT_ENVIRONMENT`（大文字、スペースはアンダースコアに変換）

```yaml
steps:
  - run: echo "Deploying to ${{ inputs.environment }}"
    shell: bash

  - run: echo "Environment is $INPUT_ENVIRONMENT"
    shell: bash
```

---

## 出力（outputs）

ステップの出力をアクションの出力にマッピングする。

```yaml
outputs:
  result:
    description: 'The action result'
    value: ${{ steps.compute.outputs.result }}

runs:
  using: 'composite'
  steps:
    - id: compute
      run: echo "result=success" >> $GITHUB_OUTPUT
      shell: bash
```

`value` キーは複合アクションでは必須。ステップの `$GITHUB_OUTPUT` に書き込まれた値を参照する。

---

## 呼び出し方法

### 別リポジトリのアクション

```yaml
steps:
  - uses: owner/repo-name@v1
    with:
      environment: production
```

### 同一リポジトリのアクション

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: ./.github/actions/my-composite-action
    with:
      environment: production
```

ローカルアクションを使用するには、先に `actions/checkout` でリポジトリをチェックアウトする必要がある。

---

## ディレクトリ構造

```
.github/actions/my-action/
  action.yml     # アクションメタデータ
  scripts/       # オプション: 補助スクリプト
    helper.sh
```

または独立したリポジトリとして:

```
my-action/
  action.yml
  scripts/
    helper.sh
  README.md
```

---

## 実践的な例

### テストとリント

```yaml
name: 'Lint and Test'
description: 'Run linting and tests'

inputs:
  node-version:
    description: 'Node.js version'
    default: '20'

outputs:
  coverage:
    description: 'Test coverage percentage'
    value: ${{ steps.test.outputs.coverage }}

runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'

    - run: npm ci
      shell: bash

    - run: npm run lint
      shell: bash

    - id: test
      run: |
        COVERAGE=$(npm test -- --coverage 2>&1 | grep 'All files' | awk '{print $4}')
        echo "coverage=$COVERAGE" >> $GITHUB_OUTPUT
      shell: bash
```

### 条件付きステップ

```yaml
runs:
  using: 'composite'
  steps:
    - if: inputs.debug == 'true'
      run: echo "Debug mode enabled"
      shell: bash

    - run: ./build.sh
      shell: bash
      continue-on-error: ${{ inputs.allow-failure == 'true' }}
```

---

## 再利用可能ワークフローとの違い

| 特性 | 複合アクション | 再利用可能ワークフロー |
|---|---|---|
| 定義場所 | `action.yml` | `.github/workflows/*.yml` |
| 呼び出し | `steps[*].uses` | `jobs.<id>.uses` |
| 粒度 | ステップレベル | ジョブレベル |
| `runs-on` | 呼び出し元ジョブのランナーを使用 | 独自に `runs-on` を定義可能 |
| ネスト | 他のアクションを `uses` で呼び出し可能 | 最大 10 レベル |
| シークレット | 呼び出し元の `secrets` コンテキストをそのまま利用可能 | 明示的に渡す必要がある |
| `shell` | 各ステップで明示的に指定が必要 | `defaults.run.shell` が使用可能 |

---

## セキュリティ上の注意

- 入力値に信頼できないデータが含まれる可能性がある場合、インジェクション攻撃に注意する
- 外部入力を直接シェルコマンドに埋め込まない

```yaml
# NG: インジェクションの危険
- run: echo "${{ inputs.user-input }}"
  shell: bash

# OK: 環境変数経由
- run: echo "$USER_INPUT"
  shell: bash
  env:
    USER_INPUT: ${{ inputs.user-input }}
```
