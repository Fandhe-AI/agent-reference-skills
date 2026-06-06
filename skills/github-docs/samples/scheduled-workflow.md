# Scheduled Workflow

cron スケジュールで定期実行するワークフロー。依存関係の更新チェックや定期レポートなどに使用する。

```yaml
# .github/workflows/scheduled-check.yml
name: Scheduled Dependency Check

on:
  schedule:
    - cron: '0 9 * * 1'   # 毎週月曜 9:00 UTC
  workflow_dispatch:       # 手動実行も可能にする

jobs:
  check-outdated:
    runs-on: ubuntu-latest

    permissions:
      contents: write
      pull-requests: write

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Check outdated packages
        id: outdated
        run: |
          OUTDATED=$(npm outdated --json 2>/dev/null || echo '{}')
          echo "result=$OUTDATED" >> $GITHUB_OUTPUT
          if [ "$OUTDATED" != "{}" ]; then
            echo "has_updates=true" >> $GITHUB_OUTPUT
          else
            echo "has_updates=false" >> $GITHUB_OUTPUT
          fi

      - name: Create issue for outdated packages
        if: steps.outdated.outputs.has_updates == 'true'
        uses: actions/github-script@v7
        with:
          script: |
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Outdated npm packages detected',
              body: '```json\n' + '${{ steps.outdated.outputs.result }}' + '\n```',
              labels: ['dependencies']
            });
```

## Notes

- cron フィールドは `分 時 日 月 曜日` の順。最短間隔は 5 分
- スケジュールはデフォルトブランチのワークフローファイルのみ実行される
- パブリックリポジトリでは 60 日間アクティビティがないとスケジュールが自動無効化される
- `workflow_dispatch` を併記すると手動でもトリガーできるためデバッグに便利
