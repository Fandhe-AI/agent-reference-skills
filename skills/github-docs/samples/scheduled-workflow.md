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
      contents: read
      issues: write   # Issue を作成するため（既定 read-only リポジトリでは必須）

    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        shell: bash
        run: |
          set -euo pipefail
          npm ci

      - name: Check outdated packages
        id: outdated
        shell: bash
        run: |
          set -euo pipefail
          # npm outdated は更新候補があると exit 1 を返すため、失敗として扱わない
          OUTDATED=$(npm outdated --json || true)
          [ -n "${OUTDATED}" ] || OUTDATED='{}'
          # 複数行 JSON なので heredoc デリミタで $GITHUB_OUTPUT へ書き込む
          {
            echo 'result<<OUTDATED_JSON'
            printf '%s\n' "${OUTDATED}"
            echo 'OUTDATED_JSON'
          } >> "${GITHUB_OUTPUT}"
          if [ "${OUTDATED}" != '{}' ]; then
            echo 'has_updates=true' >> "${GITHUB_OUTPUT}"
          else
            echo 'has_updates=false' >> "${GITHUB_OUTPUT}"
          fi

      - name: Create issue for outdated packages
        if: steps.outdated.outputs.has_updates == 'true'
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0
        env:
          # npm レジストリ由来の文字列。式展開せず env 経由で渡す
          OUTDATED_JSON: ${{ steps.outdated.outputs.result }}
        with:
          script: |
            const outdated = process.env.OUTDATED_JSON;
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: 'Outdated npm packages detected',
              body: '```json\n' + outdated + '\n```',
              labels: ['dependencies']
            });
```

## Notes

- cron フィールドは `分 時 日 月 曜日` の順。最短間隔は 5 分
- スケジュールはデフォルトブランチのワークフローファイルのみ実行される
- パブリックリポジトリでは 60 日間アクティビティがないとスケジュールが自動無効化される
- `workflow_dispatch` を併記すると手動でもトリガーできるためデバッグに便利
- Issue を作成するジョブには `permissions.issues: write` が必要。既定権限が read-only のリポジトリでは明示しないと 403 になる
- `$GITHUB_OUTPUT` へ複数行の値を書くときは `名前<<デリミタ` 形式の heredoc を使う。1 行 `名前=値` 形式では改行以降が壊れる
- `npm outdated` は更新候補があると終了コード 1 を返す。`set -e` 下では `|| true` を挟まないとステップが失敗する
- 外部 action は可動タグではなくコミット SHA 固定で参照する
