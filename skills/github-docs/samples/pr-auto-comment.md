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

      - name: Install dependencies
        shell: bash
        run: |
          set -euo pipefail
          npm ci

      - id: coverage
        shell: bash
        run: |
          set -euo pipefail
          # shell: bash は `bash --noprofile --norc -eo pipefail {0}` として起動されるため
          # 既定で -e が有効。テスト失敗時も coverage を残せるよう、この区間だけ -e を外す
          set +e
          npm test -- --coverage --coverageReporters=text-summary 2>&1 | tee coverage.txt
          # tee を挟むと $? は tee の結果になる。npm test の終了コードを保持する
          TEST_STATUS=${PIPESTATUS[0]}
          set -e
          PERCENT=$(grep 'Statements' coverage.txt | awk '{print $3}' | tr -d '%' || true)
          echo "percent=${PERCENT}" >> "${GITHUB_OUTPUT}"
          # coverage を保存したうえで、テスト失敗は必ずステップ失敗として伝播させる
          exit "${TEST_STATUS}"

      - name: Save coverage and source PR number
        if: always()
        shell: bash
        # 式を run: 本文へ直接展開せず env 経由でシェル変数として受け取る。
        # PR 番号は「起点の主張」として保存するだけで、後段は値を信頼しない
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
        with:
          script: |
            const fs = require('fs');
            const run = context.payload.workflow_run;

            // 起点の PR 番号は artifact から受け取るが、値そのものは信頼しない。
            // 同一 head ブランチ・コミットから base 違いの PR を複数作れるため、
            // GitHub 由来の情報だけで作った候補集合と突き合わせて一意性を確認する
            const claimed = Number(fs.readFileSync('pr-meta/pr-number.txt', 'utf8').trim());
            if (!Number.isInteger(claimed) || claimed <= 0) {
              core.setFailed('invalid pr number in artifact');
              return;
            }
            const { data: prs } = await github.rest.pulls.list({
              owner: context.repo.owner,
              repo: context.repo.repo,
              state: 'open',
              head: `${run.head_repository.owner.login}:${run.head_branch}`,
              base: 'main',   // 前段の `branches:` と揃える。base 違いの同 head PR を除く
            });
            // 候補集合は GitHub 由来の情報だけで作る。ここに claimed を混ぜると
            // 複数一致が 1 件へ潰れ、一意性の検査そのものが無意味になる
            const candidates = prs.filter((p) =>
              p.head.sha === run.head_sha &&
              p.head.ref === run.head_branch &&
              p.head.repo &&
              p.head.repo.full_name === run.head_repository.full_name
            );
            if (candidates.length > 1) {
              core.setFailed(`cannot uniquely identify the source PR (matched ${candidates.length})`);
              return;
            }
            if (candidates.length === 0) {
              // 後続の push でブランチ先端が進むと、追い越された run では 0 件になる。
              // これは通常の PR 運用で起きるため失敗にせず、書き込まずに終了する
              core.info('no open PR matches this run head sha (superseded run); skip commenting');
              return;
            }
            const pr = candidates[0];
            // 一意に決まった PR が、前段が主張する起点と一致することを最後に確認する
            if (pr.number !== claimed) {
              core.setFailed('artifact pr number does not match the run source PR');
              return;
            }

            // artifact の中身は前段（PR 側のコード）が生成した非信頼データ。
            // 形式を検証し、文字列として扱う（eval / exec へ渡さない）
            const coverage = fs.readFileSync('pr-meta/coverage.txt', 'utf8').trim();
            // CI の成否と coverage の取得可否は別事象。混同すると green な run に
            // 「CI failed」を貼ってしまう（coverage が `Unknown` になる構成がある）
            let body;
            if (run.conclusion !== 'success') {
              body = `:x: CI failed. Please check the [workflow run](${run.html_url}).`;
            } else if (/^[0-9]{1,3}(\.[0-9]{1,2})?$/.test(coverage)) {
              body = `## Test Coverage\n\nStatements: **${coverage}%**`;
            } else {
              body = `## Test Coverage\n\nCoverage summary was not available. See the [workflow run](${run.html_url}).`;
            }
            await github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: pr.number,
              body,
            });
```

## Notes

- PR へのコメント書き込みには `permissions.pull-requests: write` が必要。ただしその権限は **PR のコードを実行しないワークフロー側だけ**に置く
- fork からの PR では `GITHUB_TOKEN` が読み取り専用になるため、前段だけの構成ではそもそもコメントできない。上記の 2 段構成は fork PR と同一リポジトリ PR の双方で同じように動く
- **`pull_request` を `pull_request_target` へ置き換えて解決してはならない**。`pull_request_target` は base 側の権限と secrets を持つため、PR のコードを checkout・実行する構成のまま置換すると PR 側の任意コードに書き込み token と secrets を渡すことになる
- `actions/github-script` を使うと JavaScript で GitHub API を直接呼び出せる
- 外部 action は可動タグ（`@v4` 等）ではなく**コミット SHA 固定**で参照する。タグは付け替え可能でサプライチェーン攻撃の経路になる
- `shell: bash` は `bash --noprofile --norc -eo pipefail {0}` として起動されるため既定で `-e` が有効。失敗しても後続処理（成果物の保存など）を続けたい区間は `set +e` / `set -e` で明示的に囲む
- `tee` などを挟んだパイプラインでは `$?` が最終コマンドの結果になる。`${PIPESTATUS[0]}` を保存し、成果物を残したうえで明示的に `exit` して失敗を伝播させる
- `${{ ... }}` を `script:` 本文や `run:` 本文へ直接展開しない。PR 側が制御できる値（テスト出力・ブランチ名・PR タイトル等）は引用符を閉じる文字列で任意コード実行に至る。上記のとおり `env:` へ渡し `process.env` から読む

### 信頼境界の要点

- `workflow_run` ジョブでは **head SHA を checkout してはならない**。checkout した時点で PR 側が
  ワークフロー実行環境を制御でき、`pull_request_target` と同じ資格情報漏えい経路になる
- artifact の中身は前段（PR 側のコード）が生成したものであり信頼できない。**artifact 由来の
  PR 番号をそのままコメント先にしてはならない**。他人の PR の head commit を指すブランチを
  作れば、書き込み権限を持つ後段にその PR へ投稿させられる
- かといって `head SHA の一致` だけでも一意にはならない。同一の head ブランチ・コミットから
  base 違いの open PR を複数作れるため、候補が 1 件に絞れる保証がない
- したがって **artifact の PR 番号は「起点の主張」として扱い**、GitHub 由来の情報
  （`head_repository` / `head_branch` / `head_sha` と、前段の `branches:` に対応する `base`）
  だけで候補集合を作る。**候補が 1 件に絞れないかぎり書き込まない**。1 件に絞れたあとで
  主張と一致するかを確認する。候補の絞り込み条件に artifact 由来の値を混ぜてはならない
  （混ぜると複数一致が 1 件へ潰れ、一意性の検査が無意味になる）
- 候補 0 件と 2 件以上は扱いを分ける。**0 件は追い越された run**（後続 push でブランチ先端が
  進んだ場合に必ず起きる）なので、失敗にせず書き込まずに終了する。連続 push のたびに
  `PR Comment` が失敗する状態を避けるため。2 件以上は対象を特定できないため失敗させる
- CI の成否と coverage の取得可否は別事象として扱う。まとめて判定すると、成功した run に
  「CI failed」コメントを残すことになる
- artifact から受け取る表示用の値も、形式を正規表現で検証してから本文へ埋める
- やむを得ず `pull_request_target` を使う場合も、`actions/checkout` の `ref` に
  `github.event.pull_request.head.sha` を指定しない。base 側のコードだけを実行する
