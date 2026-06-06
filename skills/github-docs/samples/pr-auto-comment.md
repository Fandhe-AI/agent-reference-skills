# PR Auto Comment and Status Check

PR 作成・更新時にテストを実行し、結果を PR にコメントするワークフロー。

```yaml
# .github/workflows/pr-check.yml
name: PR Check

on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

permissions:
  contents: read
  pull-requests: write

jobs:
  test:
    runs-on: ubuntu-latest
    outputs:
      coverage: ${{ steps.coverage.outputs.percent }}

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - id: coverage
        run: |
          npm test -- --coverage --coverageReporters=text-summary 2>&1 | tee coverage.txt
          PERCENT=$(grep 'Statements' coverage.txt | awk '{print $3}' | tr -d '%')
          echo "percent=$PERCENT" >> $GITHUB_OUTPUT

      - name: Post coverage comment
        uses: actions/github-script@v7
        with:
          script: |
            const coverage = '${{ steps.coverage.outputs.percent }}';
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## Test Coverage\n\nStatements: **${coverage}%**`
            });

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: ':x: CI failed. Please check the [workflow run](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}).'
            });
```

## Notes

- PR へのコメント書き込みには `permissions.pull-requests: write` が必要
- `actions/github-script` を使うと JavaScript で GitHub API を直接呼び出せる
- `if: failure()` でステップ失敗時のみ実行する通知処理を追加できる
- フォークからの PR では `GITHUB_TOKEN` が読み取り専用のため、コメント書き込みは `pull_request_target` イベントで対応する
