# Manual Workflow Dispatch

`workflow_dispatch` で GitHub UI・CLI・API から手動実行できるワークフロー。入力パラメータで動作を制御する。

```yaml
# .github/workflows/manual-deploy.yml
name: Manual Deploy

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
      version:
        description: 'Version tag to deploy (e.g. v1.2.3)'
        required: true
        type: string
      dry_run:
        description: 'Dry run (no actual deployment)'
        type: boolean
        default: false

permissions:
  contents: read   # 既定値に依存せず最小権限を明示する

jobs:
  # 入力の検証だけを行う。secrets も environment も持たせない（fail-closed ゲート）
  resolve:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    outputs:
      sha: ${{ steps.resolve.outputs.sha }}
      code_sha: ${{ steps.resolve.outputs.code_sha }}
    steps:
      - name: Validate and resolve the requested version tag
        id: resolve
        shell: bash
        # 入力は実行者が自由に決められるため run: 本文へ式展開せず env 経由で渡す
        env:
          VERSION: ${{ inputs.version }}
          GH_TOKEN: ${{ github.token }}
          REPO: ${{ github.repository }}
          DEFAULT_BRANCH: ${{ github.event.repository.default_branch }}
        run: |
          set -euo pipefail
          # リリースタグ形式のみ許可する。bash の [[ =~ ]] は文字列全体に
          # アンカーされるため、改行を含む入力で一行だけ一致させる迂回ができない
          if [[ ! "${VERSION}" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo 'version must be a release tag like v1.2.3' >&2
            exit 1
          fi
          # 必ずタグ名前空間で解決する。repos/{repo}/commits/{ref} はブランチも
          # 解決してしまい、同名ブランチでタグ限定の検証を迂回できる
          OBJ=$(gh api "repos/${REPO}/git/ref/tags/${VERSION}" --jq '.object.type + " " + .object.sha')
          TYPE=${OBJ%% *}
          SHA=${OBJ##* }
          # annotated tag は tag object を指すため commit に到達するまで peel する
          while [ "${TYPE}" = 'tag' ]; do
            OBJ=$(gh api "repos/${REPO}/git/tags/${SHA}" --jq '.object.type + " " + .object.sha')
            TYPE=${OBJ%% *}
            SHA=${OBJ##* }
          done
          if [ "${TYPE}" != 'commit' ]; then
            echo 'tag does not resolve to a commit' >&2
            exit 1
          fi
          # 後段へは不変の commit SHA を「データ」として渡す
          echo "sha=${SHA}" >> "${GITHUB_OUTPUT}"

          # デプロイを実行するコード（default branch）の SHA もここで確定する。
          # ブランチ名のまま checkout すると、environment 承認待ちの間に先端が
          # 動き、承認対象と実際に走るコードがずれる（TOCTOU）
          CODE_SHA=$(gh api "repos/${REPO}/commits/${DEFAULT_BRANCH}" --jq '.sha')
          echo "code_sha=${CODE_SHA}" >> "${GITHUB_OUTPUT}"

  deploy-staging:
    needs: resolve
    if: inputs.dry_run == false && inputs.environment == 'staging'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: staging   # 固定値。入力では切り替えない
    steps:
      # デプロイを実行するコードは resolve job が確定した不変の commit SHA から
      # 取得する。inputs.version を checkout の ref に指定すると、任意 ref の
      # コードがこの job の environment secrets を読める資格情報漏えい経路になる
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
        with:
          ref: ${{ needs.resolve.outputs.code_sha }}

      - name: Deploy
        shell: bash
        env:
          TARGET_ENV: staging
          VERSION_SHA: ${{ needs.resolve.outputs.sha }}
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          set -euo pipefail
          ./scripts/deploy.sh

  deploy-production:
    needs: resolve
    if: inputs.dry_run == false && inputs.environment == 'production'
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: production   # 固定値。入力では切り替えない
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0
        with:
          ref: ${{ needs.resolve.outputs.code_sha }}

      - name: Deploy
        shell: bash
        env:
          TARGET_ENV: production
          VERSION_SHA: ${{ needs.resolve.outputs.sha }}
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}
        run: |
          set -euo pipefail
          ./scripts/deploy.sh

  dry-run:
    needs: resolve
    if: inputs.dry_run == true
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - name: Dry run
        shell: bash
        env:
          VERSION: ${{ inputs.version }}
          VERSION_SHA: ${{ needs.resolve.outputs.sha }}
          TARGET_ENV: ${{ inputs.environment }}
        run: |
          set -euo pipefail
          echo "Dry run - would deploy ${VERSION} (${VERSION_SHA}) to ${TARGET_ENV}"
```

```bash
# GitHub CLI から手動実行
gh workflow run manual-deploy.yml \
  -f environment=staging \
  -f version=v1.2.3 \
  -f dry_run=false
```

## Notes

- 入力タイプは `string`, `boolean`, `choice`, `environment` の 4 種類
- `choice` タイプは `options` リストで選択肢を定義する
- `workflow_dispatch` はデフォルトブランチのワークフローファイルが使われる
- 最大 25 個の入力パラメータを定義できる
- **`inputs` を `actions/checkout` の `ref` に指定しない**。secrets や environment を持つ job で任意 ref を checkout して実行すると、workflow を変更できない実行者でも攻撃用ブランチを指定して資格情報を窃取できる。デプロイを実行するコードは信頼済みブランチの**不変な commit SHA**（ブランチ名ではなく）から取得し、指定された version はタグ形式を検証して不変の commit SHA へ解決したうえで**データ**として渡す。ブランチ名のまま checkout すると、environment 承認待ちの間に先端が動き承認対象と実行コードがずれる
- 同じ理由で **`environment:` に `${{ inputs.* }}` を指定しない**。environment 名を固定した job へ `if:` で分岐する
- `${{ inputs.* }}` を `run:` 本文へ直接展開しない。入力値は実行者が自由に決められるため、シェルへ展開するとコマンドインジェクションになる。`env:` へ渡して `"${VAR}"` で参照する
- 外部 action はコミット SHA 固定で参照する
