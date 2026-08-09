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

安全な構成は、**PR のコードを一切実行しないジョブへコメント処理を分離する** 2 段構えである。

1. `pull_request` 側（PR のコードを実行する。書き込み権限を持たない）
   … coverage と PR 番号をファイルへ書き出し artifact として upload するだけにする
2. `workflow_run` 側（PR のコードを一切実行しない。書き込み権限を持つ）
   … artifact を取得し、値を検証してコメントする

#### 1. 前段: `pull_request` 側に artifact upload を追加する

上記 `pr-check.yml` の `permissions` を `contents: read` のみに下げ、コメント投稿ステップの
代わりに次を置く。

```yaml
      - name: Save coverage and PR number
        shell: bash
        env:
          COVERAGE: ${{ steps.coverage.outputs.percent }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
        run: |
          set -euo pipefail
          mkdir -p pr-meta
          printf '%s' "${COVERAGE}" > pr-meta/coverage.txt
          printf '%s' "${PR_NUMBER}" > pr-meta/pr-number.txt

      - uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02  # v4.6.2
        with:
          name: pr-meta
          path: pr-meta/
```

#### 2. 後段: `workflow_run` でコメントする

```yaml
# .github/workflows/pr-comment.yml
name: PR Comment

on:
  workflow_run:
    workflows: [PR Check]   # 前段の pull_request ワークフローの完了を受ける
    types: [completed]

permissions:
  contents: read
  actions: read           # artifact のダウンロードに必要
  pull-requests: write    # コメント投稿に必要

jobs:
  comment:
    runs-on: ubuntu-latest
    # 前段が同一リポジトリの PR 由来であっても、artifact の中身は PR 側が制御できる
    if: github.event.workflow_run.event == 'pull_request'
    steps:
      # checkout しない。PR 側のコード・スクリプト・依存関係を一切実行しない
      - name: Download PR metadata artifact
        uses: actions/download-artifact@d3f86a106a0bac45b974a628896c90dbdf5c8093  # v4.3.0
        with:
          name: pr-meta
          path: pr-meta
          run-id: ${{ github.event.workflow_run.id }}
          github-token: ${{ secrets.GITHUB_TOKEN }}

      - name: Comment coverage on the PR
        uses: actions/github-script@f28e40c7f34bde8b3046d885e986cb6290c5673b  # v7.1.0
        with:
          script: |
            const fs = require('fs');
            // artifact の中身は PR 側が制御できる。読み取り後に必ず形式を検証し、
            // 文字列として扱う（eval / exec には決して渡さない）
            const raw = (name) => fs.readFileSync(`pr-meta/${name}`, 'utf8').trim();
            const prNumber = raw('pr-number.txt');
            const coverage = raw('coverage.txt');
            if (!/^[0-9]{1,10}$/.test(prNumber)) {
              core.setFailed('invalid pr number in artifact');
              return;
            }
            if (!/^[0-9]{1,3}(\.[0-9]{1,2})?$/.test(coverage)) {
              core.setFailed('invalid coverage value in artifact');
              return;
            }
            // 対象 PR が本当にこの run の head branch に対応するかを API 側で再確認する
            const { data: pr } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: Number(prNumber),
            });
            if (pr.head.sha !== context.payload.workflow_run.head_sha) {
              core.setFailed('artifact pr number does not match the workflow run head sha');
              return;
            }
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: Number(prNumber),
              body: `## Test Coverage\n\nStatements: **${coverage}%**`
            });
```

- `workflow_run` ジョブでは **head SHA を checkout してはならない**。checkout した時点で PR 側が
  ワークフロー実行環境を制御でき、`pull_request_target` と同じ資格情報漏えい経路になる
- artifact の中身は前段（PR 側のコード）が生成したものであり信頼できない。**PR 番号・数値は
  必ず正規表現で検証し、PR 番号は API で head SHA と突き合わせてから使う**。検証しないと、
  他の PR や Issue へコメントを書かせる誘導が成立する
- やむを得ず `pull_request_target` を使う場合も、`actions/checkout` の `ref` に
  `github.event.pull_request.head.sha` を指定しない。base 側のコードだけを実行する
