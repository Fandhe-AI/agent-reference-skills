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
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
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
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0
        env:
          # PR 側コードのテスト出力から生成される値。式展開ではなく env 経由で渡す
          COVERAGE: ${{ steps.coverage.outputs.percent }}
        with:
          script: |
            const coverage = process.env.COVERAGE;
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `## Test Coverage\n\nStatements: **${coverage}%**`
            });

      - name: Notify on failure
        if: failure()
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0
        env:
          RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
        with:
          script: |
            const runUrl = process.env.RUN_URL;
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: `:x: CI failed. Please check the [workflow run](${runUrl}).`
            });
```

## Notes

- PR へのコメント書き込みには `permissions.pull-requests: write` が必要
- `actions/github-script` を使うと JavaScript で GitHub API を直接呼び出せる
- `if: failure()` でステップ失敗時のみ実行する通知処理を追加できる
- 外部 action は可動タグ（`@v4` 等）ではなく**コミット SHA 固定**で参照する。タグは付け替え可能でサプライチェーン攻撃の経路になる
- `${{ ... }}` を `script:` 本文や `run:` 本文へ直接展開しない。PR 側が制御できる値（テスト出力・ブランチ名・PR タイトル等）は引用符を閉じる文字列で任意コード実行に至る。上記のとおり `env:` へ渡し `process.env` から読む

### fork PR へコメントする場合の信頼境界

フォークからの PR では `GITHUB_TOKEN` が読み取り専用のためコメントを書き込めない。
このとき **上記の `pull_request` ワークフローを `pull_request_target` へ置き換えてはならない**。
`pull_request_target` は base 側の権限と secrets を持つため、PR のコードを checkout・実行する
上記構成のまま置換すると、PR 側の任意コードに書き込み token と secrets を渡すことになる。

安全な構成は、**PR のコードを一切実行しないジョブへコメント処理を分離する**こと。

```yaml
# .github/workflows/pr-comment.yml
name: PR Comment

on:
  workflow_run:
    workflows: [PR Check]   # 上記 pull_request ワークフローの完了を受ける
    types: [completed]

permissions:
  contents: read
  pull-requests: write

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      # checkout しない。PR 側のコード・スクリプト・依存関係を一切実行しない
      - name: Download coverage artifact
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0
        env:
          RUN_ID: ${{ github.event.workflow_run.id }}
        with:
          script: |
            // artifact のダウンロードとコメント投稿のみを行う
            // 取得した内容は文字列として扱い、eval / 実行は決してしない
            core.info(`run: ${process.env.RUN_ID}`);
```

- `workflow_run` ジョブでは **head SHA を checkout してはならない**。checkout した時点で PR 側が
  ワークフロー実行環境を制御でき、`pull_request_target` と同じ資格情報漏えい経路になる
- やむを得ず `pull_request_target` を使う場合も、`actions/checkout` の `ref` に
  `github.event.pull_request.head.sha` を指定しない。base 側のコードだけを実行する
- PR 側由来のデータ（テスト結果・ファイル内容）は必ず `env:` 経由で受け取り、
  文字列として出力するだけに留める
