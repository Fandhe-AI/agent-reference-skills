# Reusable Workflow for Deploy

再利用可能ワークフローを定義し、複数のリポジトリ・環境から呼び出すデプロイパターン。

```yaml
# .github/workflows/reusable-deploy.yml  （再利用可能ワークフロー側）
name: Reusable Deploy

on:
  workflow_call:
    inputs:
      environment:
        description: 'Target environment (staging or production)'
        required: true
        type: string
      version:
        description: 'Version to deploy'
        required: false
        type: string
        default: 'latest'
    secrets:
      deploy_key:
        required: true
    outputs:
      deploy_url:
        description: 'Deployed URL'
        # 実行された側のジョブ出力を採る。skip されたジョブの出力は空文字になる
        value: ${{ jobs.deploy-staging.outputs.url || jobs.deploy-production.outputs.url }}

permissions:
  contents: read   # 呼び出し元から継承せず、再利用可能ワークフロー側でも最小権限を明示する

jobs:
  # environment を有効化する前に入力を検証する fail-closed ゲート。
  # `environment: ${{ inputs.environment }}` のように呼び出し元の入力で
  # environment を選ばせると、許可外の environment の保護ルールと
  # environment secret（caller が渡した secret より優先される）が適用されてしまう
  validate:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Validate target environment
        shell: bash
        # inputs は呼び出し元が自由に決められるため run: 本文へ式展開せず env 経由で渡す
        env:
          TARGET_ENV: ${{ inputs.environment }}
        run: |
          set -euo pipefail
          case "${TARGET_ENV}" in
            staging|production) ;;
            *) echo 'unsupported environment' >&2; exit 1 ;;
          esac

  deploy-staging:
    needs: validate
    if: inputs.environment == 'staging'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: staging   # 固定値。入力では切り替えない
    outputs:
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
      - id: deploy
        shell: bash
        env:
          VERSION: ${{ inputs.version }}
          TARGET_ENV: staging
          DEPLOY_KEY: ${{ secrets.deploy_key }}
        run: |
          set -euo pipefail
          echo "Deploying ${VERSION} to ${TARGET_ENV}"
          echo "url=https://${TARGET_ENV}.example.com" >> "${GITHUB_OUTPUT}"

  deploy-production:
    needs: validate
    if: inputs.environment == 'production'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: production   # 固定値。入力では切り替えない
    outputs:
      url: ${{ steps.deploy.outputs.url }}
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
      - id: deploy
        shell: bash
        env:
          VERSION: ${{ inputs.version }}
          TARGET_ENV: production
          DEPLOY_KEY: ${{ secrets.deploy_key }}
        run: |
          set -euo pipefail
          echo "Deploying ${VERSION} to ${TARGET_ENV}"
          echo "url=https://${TARGET_ENV}.example.com" >> "${GITHUB_OUTPUT}"
```

```yaml
# .github/workflows/release.yml  （呼び出し元側）
name: Release

on:
  push:
    tags: ['v*']

permissions:
  contents: read

jobs:
  deploy-staging:
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: staging
      version: ${{ github.ref_name }}
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY }}

  deploy-production:
    needs: deploy-staging
    uses: ./.github/workflows/reusable-deploy.yml
    with:
      environment: production
      version: ${{ github.ref_name }}
    # callee が宣言するシークレットだけを明示的に渡す。`secrets: inherit` は
    # 呼び出し元の全シークレットを一括注入するため使わない
    secrets:
      deploy_key: ${{ secrets.DEPLOY_KEY_PRODUCTION }}
```

## Notes

- 出力の流れはステップ出力 (`$GITHUB_OUTPUT`) -> ジョブ出力 (`outputs`) -> ワークフロー出力 (`workflow_call.outputs`) の順にマッピングが必要
- **シークレットは callee が宣言したものだけを個別に渡す**。`secrets: inherit` は呼び出し元の全シークレットを callee へ一括注入するため、callee が必要としない資格情報まで露出範囲が広がる。最小権限の観点から推奨しない（同一 Organization 内でのみ動作するという制約もある）
- 別リポジトリの再利用可能ワークフローを参照する場合は `owner/repo/.github/workflows/file.yml@<40 桁コミット SHA>` 形式を使う。`@main` や `@v1` などの可動 ref は付け替え可能で、参照先の改変がそのまま自リポジトリの CI で実行されるため使わない
- 再利用可能ワークフローファイルは `.github/workflows/` のルートに配置する（サブディレクトリ不可）
- 呼び出し元が渡す `inputs` は信頼できない。`$GITHUB_OUTPUT` へ書く前に許可リスト等で検証する。未検証の値を `名前=値` の単一行形式で書くと、改行を含む入力で出力行を注入できる
- **`environment:` に `${{ inputs.* }}` を直接指定しない**。environment の解決は job 開始時に行われ、保護ルールと environment secret はステップ内の検証より前に適用される。environment secret は caller が渡した同名 secret を上書きするため、許可外の environment を選ばせると意図しない資格情報でジョブが動く。environment 名を固定した job へ `if:` で分岐し、検証は別の gate job で先に済ませる
