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

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}

    steps:
      - uses: actions/checkout@v4
        with:
          ref: ${{ inputs.version }}

      - name: Deploy
        if: inputs.dry_run == false
        run: ./scripts/deploy.sh
        env:
          TARGET_ENV: ${{ inputs.environment }}
          DEPLOY_KEY: ${{ secrets.DEPLOY_KEY }}

      - name: Dry run
        if: inputs.dry_run == true
        run: echo "Dry run: would deploy ${{ inputs.version }} to ${{ inputs.environment }}"
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
