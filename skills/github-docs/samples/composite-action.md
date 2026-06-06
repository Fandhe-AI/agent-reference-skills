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
    - uses: actions/setup-node@v4
      with:
        node-version: ${{ inputs.node-version }}
        cache: 'npm'

    - name: Install
      run: npm ci
      shell: bash
      working-directory: ${{ inputs.working-directory }}

    - name: Build
      run: npm run build
      shell: bash
      working-directory: ${{ inputs.working-directory }}

    - id: get-version
      run: echo "version=$(node -p 'require(\"./package.json\").version')" >> $GITHUB_OUTPUT
      shell: bash
      working-directory: ${{ inputs.working-directory }}
```

```yaml
# .github/workflows/ci.yml  （呼び出し元）
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - id: build
        uses: ./.github/actions/setup-and-build
        with:
          node-version: '20'

      - run: echo "Built version ${{ steps.build.outputs.version }}"
```

## Notes

- `runs.using: 'composite'` が必須。`run` ステップでは `shell` の明示指定が必要（`defaults.run.shell` は複合アクション内で効かない）
- 出力は `$GITHUB_OUTPUT` に書き込んだ値を `outputs.<name>.value: ${{ steps.<id>.outputs.<key> }}` でマッピングする
- ローカルアクション（`./.github/actions/`）を使う場合は先に `actions/checkout@v4` でチェックアウトが必要
- 再利用可能ワークフローはジョブレベル、複合アクションはステップレベルで再利用する点が違いの核心
