# Composite Action

複数のステップをひとつのアクションにまとめ、複数のワークフローから再利用するパターン。

```yaml
# .github/actions/setup-and-build/action.yml
name: 'Setup and Build'
description: 'Install dependencies and build the project'

inputs:
  node-version:
    description: 'Node.js version'
    required: false
    default: '20'
  working-directory:
    description: 'Working directory'
    required: false
    default: '.'

outputs:
  version:
    description: 'Built package version'
    value: ${{ steps.get-version.outputs.version }}

runs:
  using: 'composite'
  steps:
    - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'

    - name: Install
      shell: bash
      run: |
        set -euo pipefail
        npm ci
      working-directory: ${{ inputs.working-directory }}

    - name: Build
      shell: bash
      run: |
        set -euo pipefail
        npm run build
      working-directory: ${{ inputs.working-directory }}

    - id: get-version
      shell: bash
      run: |
        set -euo pipefail
        VERSION=$(node -p 'require("./package.json").version')
        echo "version=${VERSION}" >> "${GITHUB_OUTPUT}"
      working-directory: ${{ inputs.working-directory }}
```

```yaml
# .github/workflows/ci.yml  （呼び出し元）
name: CI

on: [push, pull_request]

permissions:
  contents: read   # 既定値に依存せず最小権限を明示する

jobs:
  build:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - id: build
        uses: ./.github/actions/setup-and-build
        with:
          node-version: '20'

      - name: Show built version
        shell: bash
        env:
          VERSION: ${{ steps.build.outputs.version }}
        run: |
          set -euo pipefail
          echo "Built version ${VERSION}"
```

## Notes

- `runs.using: 'composite'` が必須。`run` ステップでは `shell` の明示指定が必要（`defaults.run.shell` は複合アクション内で効かない）
- 出力は `$GITHUB_OUTPUT` に書き込んだ値を `outputs.<name>.value: ${{ steps.<id>.outputs.<key> }}` でマッピングする
- ローカルアクション（`./.github/actions/`）を使う場合は先に `actions/checkout` でチェックアウトが必要。ローカル参照（`./...`）は同一リポジトリ・同一コミットを指すため SHA 固定は不要だが、外部 action はコミット SHA 固定で参照する
- 再利用可能ワークフローはジョブレベル、複合アクションはステップレベルで再利用する点が違いの核心
