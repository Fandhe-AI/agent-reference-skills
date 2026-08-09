# PR Auto Comment and Status Check

PR 作成・更新時にテストを実行し、結果を PR にコメントするワークフロー。

**PR のコードを実行するジョブに書き込み token を渡さない**ため、2 つのワークフローに分離する。

1. `pull_request` 側 — PR のコードを実行する。`contents: read` のみで、結果を artifact に残す
2. `workflow_run` 側 — PR のコードを一切実行しない。artifact を検証してコメントする

同一リポジトリのブランチからの PR では `GITHUB_TOKEN` が fork のように read-only へ降格されない。
前段を `pull-requests: write` のまま走らせると、依存関係やテストスクリプトを差し替えられる PR 作成者へ
書き込み token を露出させることになるため、出自にかかわらずこの分離を標準とする。

## 1. 前段: テスト実行と結果の保存（PR のコードを実行する）

```yaml
# .github/workflows/pr-check.yml
name: PR Check

on:
  pull_request:
    branches: [main]
    types: [opened, synchronize, reopened]

permissions:
  contents: read   # PR のコードを実行するジョブに write は渡さない

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4.4.0

      - uses: actions/setup-node@49933ea5288caeca8642d1e84afbd3f7d6820020  # v4.4.0
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - id: coverage
        shell: bash
        run: |
          set -uo pipefail
          npm test -- --coverage --coverageReporters=text-summary 2>&1 | tee coverage.txt
          PERCENT=$(grep 'Statements' coverage.txt | awk '{print $3}' | tr -d '%')
          echo "percent=${PERCENT}" >> "${GITHUB_OUTPUT}"

      - name: Save coverage and PR number
        if: always()
        shell: bash
        # 式を run: 本文へ直接展開せず env 経由でシェル変数として受け取る
        env:
          COVERAGE: ${{ steps.coverage.outputs.percent }}
          PR_NUMBER: ${{ github.event.pull_request.number }}
        run: |
          set -euo pipefail
          mkdir -p pr-meta
          printf '%s' "${COVERAGE}" > pr-meta/coverage.txt
          printf '%s' "${PR_NUMBER}" > pr-meta/pr-number.txt

      - uses: actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02  # v4.6.2
        if: always()
        with:
          name: pr-meta
          path: pr-meta/
```

## 2. 後段: PR へのコメント（PR のコードを実行しない）

```yaml
# .github/workflows/pr-comment.yml
name: PR Comment

on:
  workflow_run:
    workflows: [PR Check]   # 前段の完了を受ける
    types: [completed]

permissions:
  contents: read
  actions: read           # artifact のダウンロードに必要
  pull-requests: write    # コメント投稿に必要

jobs:
  comment:
    runs-on: ubuntu-latest
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
        env:
          CONCLUSION: ${{ github.event.workflow_run.conclusion }}
          RUN_URL: ${{ github.event.workflow_run.html_url }}
        with:
          script: |
            const fs = require('fs');
            // artifact の中身は前段（PR 側のコード）が生成した非信頼データ。
            // 読み取り後に必ず形式を検証し、文字列として扱う（eval / exec へ渡さない）
            const raw = (name) => fs.readFileSync(`pr-meta/${name}`, 'utf8').trim();
            const prNumber = raw('pr-number.txt');
            const coverage = raw('coverage.txt');
            if (!/^[0-9]{1,10}$/.test(prNumber)) {
              core.setFailed('invalid pr number in artifact');
              return;
            }
            // 対象 PR がこの run の head SHA に対応するか API 側で再確認する。
            // 検証しないと他の PR や Issue へコメントを書かせる誘導が成立する
            const { data: pr } = await github.rest.pulls.get({
              owner: context.repo.owner,
              repo: context.repo.repo,
              pull_number: Number(prNumber),
            });
            if (pr.head.sha !== context.payload.workflow_run.head_sha) {
              core.setFailed('artifact pr number does not match the workflow run head sha');
              return;
            }
            const body = process.env.CONCLUSION === 'success' && /^[0-9]{1,3}(\.[0-9]{1,2})?$/.test(coverage)
              ? `## Test Coverage\n\nStatements: **${coverage}%**`
              : `:x: CI failed. Please check the [workflow run](${process.env.RUN_URL}).`;
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: Number(prNumber),
              body,
            });
```

## Notes

- PR へのコメント書き込みには `permissions.pull-requests: write` が必要。ただしその権限は **PR のコードを実行しないワークフロー側だけ**に置く
- fork からの PR では `GITHUB_TOKEN` が読み取り専用になるため、前段だけの構成ではそもそもコメントできない。上記の 2 段構成は fork PR と同一リポジトリ PR の双方で同じように動く
- **`pull_request` を `pull_request_target` へ置き換えて解決してはならない**。`pull_request_target` は base 側の権限と secrets を持つため、PR のコードを checkout・実行する構成のまま置換すると PR 側の任意コードに書き込み token と secrets を渡すことになる
- `actions/github-script` を使うと JavaScript で GitHub API を直接呼び出せる
- 外部 action は可動タグ（`@v4` 等）ではなく**コミット SHA 固定**で参照する。タグは付け替え可能でサプライチェーン攻撃の経路になる
- `${{ ... }}` を `script:` 本文や `run:` 本文へ直接展開しない。PR 側が制御できる値（テスト出力・ブランチ名・PR タイトル等）は引用符を閉じる文字列で任意コード実行に至る。上記のとおり `env:` へ渡し `process.env` から読む

### 信頼境界の要点

- `workflow_run` ジョブでは **head SHA を checkout してはならない**。checkout した時点で PR 側が
  ワークフロー実行環境を制御でき、`pull_request_target` と同じ資格情報漏えい経路になる
- artifact の中身は前段（PR 側のコード）が生成したものであり信頼できない。**PR 番号・数値は
  必ず正規表現で検証し、PR 番号は API で head SHA と突き合わせてから使う**。検証しないと、
  他の PR や Issue へコメントを書かせる誘導が成立する
- やむを得ず `pull_request_target` を使う場合も、`actions/checkout` の `ref` に
  `github.event.pull_request.head.sha` を指定しない。base 側のコードだけを実行する
