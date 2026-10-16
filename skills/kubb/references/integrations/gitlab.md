# GitLab CI

GitLab CI からインストール可能な Kubb Studio スナップショットを公開し、ターゲットブランチや前回パイプラインと生成ファイルを比較できるようにする。`KUBB_TOKEN` は masked CI/CD variable に保存し、npm lockfile をコミットし、`npm ci` が CLI を入れられるよう `kubb` を開発依存に置く。

## Signature / Usage

```yaml
# .gitlab-ci.yml
snapshot:
  stage: build
  image: node:22
  script:
    - npm ci
    - npx kubb studio snapshot
  rules:
    - if: $CI_MERGE_REQUEST_IID
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

`kubb` が Studio ランタイムを同梱するため、セットアップは `npm ci` のみ。`rules` によりマージリクエストパイプラインとデフォルトブランチで実行され、マージリクエストが比較対象のターゲットブランチのスナップショットを持てる。

## 結果をノートとして投稿

`--json` でスナップショット結果を保存し、マージリクエストノートとして投稿する。パイプラインごとに同じノートを更新し、Node のみを使う:

```js
// scripts/kubb-note.mjs
import { readFileSync } from 'node:fs'

const snapshot = JSON.parse(readFileSync('snapshot.json', 'utf8'))
const marker = '<!-- kubb-snapshot -->'
const counts = (c) => `${c.added.length} added · ${c.changed.length} changed · ${c.removed.length} removed`
const lines = [marker, `Kubb snapshot: \`npm i ${snapshot.url}\``]

const { branchChanges: branch, changes } = snapshot
if (branch) {
  if (branch.base) lines.push(`Changes against \`${branch.branch}\`: ${counts(branch)}`)
  else if (branch.baseFound) lines.push(`No snapshot of \`${branch.branch}\` for this package yet`)
  else lines.push(`No snapshot of \`${branch.branch}\` to compare with`)
}
if (changes?.base) lines.push(`Changes since ${changes.base.commit?.slice(0, 7) ?? changes.base.createdAt}: ${counts(changes)}`)

const { CI_API_V4_URL, CI_PROJECT_ID, CI_MERGE_REQUEST_IID, GITLAB_API_TOKEN } = process.env
const notes = `${CI_API_V4_URL}/projects/${CI_PROJECT_ID}/merge_requests/${CI_MERGE_REQUEST_IID}/notes`
const headers = { 'PRIVATE-TOKEN': GITLAB_API_TOKEN, 'Content-Type': 'application/json' }
const existing = (await (await fetch(`${notes}?per_page=100`, { headers })).json()).find((note) => note.body.startsWith(marker))
const response = await fetch(existing ? `${notes}/${existing.id}` : notes, {
  method: existing ? 'PUT' : 'POST',
  headers,
  body: JSON.stringify({ body: lines.join('\n\n') }),
})
if (!response.ok) throw new Error(`GitLab answered ${response.status}`)
```

```yaml
# .gitlab-ci.yml
  script:
    - npm ci
    - npx kubb studio snapshot --json > snapshot.json
    - '[ -z "$CI_MERGE_REQUEST_IID" ] || node scripts/kubb-note.mjs'
```

## Notes

- 前提: Kubb 5.6.2 以降の `kubb.config.ts`、Kubb Studio 組織と組織 CI API キー（`KUBB_TOKEN`）。インストール用は別の registry キー（詳細は [ci.md](./ci.md)）
- ノートの書き込みには `api` スコープ付きのプロジェクトアクセストークンを `GITLAB_API_TOKEN` として保存する。`CI_JOB_TOKEN` にはそのスコープがない
- スナップショットは 7 日で失効する。デフォルトブランチ実行のスケジュールを検討する

## Related

- [ci.md](./ci.md)
- [studio.md](./studio.md)
- [github-actions.md](./github-actions.md)
