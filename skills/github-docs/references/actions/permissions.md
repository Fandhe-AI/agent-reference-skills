# GitHub Actions -- GITHUB_TOKEN パーミッション

GITHUB_TOKEN の自動認証とパーミッションスコープのリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/concepts/security/github_token

## Signature / Usage

```yaml
permissions:
  contents: read
  pull-requests: write
```

---

## 概要

`GITHUB_TOKEN` は各ワークフロー実行の開始時に自動生成されるトークン。ワークフロー内で GitHub API やリポジトリ操作に使用できる。ジョブ終了時に失効する。

トークンの最大寿命はランナー種別で異なる:
- GitHub-hosted ランナー: ジョブ最大実行時間が 6 時間のため、最大 6 時間
- self-hosted ランナー: ジョブ最大 5 日だが、installation access token のリフレッシュは 24 時間まで。24 時間を超えるジョブでは PAT 等の別の認証手段を使う

アクセス方法:
- コンテキスト: `${{ secrets.GITHUB_TOKEN }}` または `${{ github.token }}`
- 環境変数: `$GITHUB_TOKEN`

---

## パーミッションスコープ一覧

| スコープ | 説明 | 許可される値 |
|---|---|---|
| `actions` | ワークフロー、アーティファクト、キャッシュの管理 | `read`, `write`, `none` |
| `artifact-metadata` | ビルドアーティファクトのストレージレコード管理 | `read`, `write`, `none` |
| `attestations` | アーティファクト証明（provenance）の生成・管理 | `read`, `write`, `none` |
| `checks` | チェック実行とチェックスイートの管理 | `read`, `write`, `none` |
| `code-quality` | コードカバレッジレポートのアップロード | `read`, `write`, `none` |
| `contents` | リポジトリコンテンツ（コミット、ブランチ、タグ等）の管理 | `read`, `write`, `none` |
| `copilot-requests` | Copilot リクエストの実行。組織所有リポジトリのワークフローが `GITHUB_TOKEN` で Copilot CLI を使う。組織の billing policy が許可している場合に限る | `write`, `none` |
| `deployments` | デプロイメントの管理 | `read`, `write`, `none` |
| `discussions` | ディスカッションの管理 | `read`, `write`, `none` |
| `id-token` | OIDC トークンのリクエスト | `write`, `none` |
| `issues` | Issue の管理 | `read`, `write`, `none` |
| `packages` | GitHub Packages の管理 | `read`, `write`, `none` |
| `pages` | GitHub Pages の管理 | `read`, `write`, `none` |
| `pull-requests` | プルリクエストの管理 | `read`, `write`, `none` |
| `security-events` | Code scanning / Dependabot アラートの管理 | `read`, `write`, `none` |
| `statuses` | コミットステータスの管理 | `read`, `write`, `none` |
| `vulnerability-alerts` | Dependabot アラートの読み取り | `read`, `none` |

---

## デフォルトパーミッション

リポジトリ設定の「Workflow permissions」で 2 つのデフォルトモード（Permissive / Restricted）から選択可能。スコープ別の既定値は現行 docs に表として掲載されていないため、リポジトリ / 組織の Workflow permissions 設定で確認すること（`## Notes` 参照）。

---

## パーミッションの設定

### ワークフローレベル

全ジョブに適用される。

```yaml
permissions:
  contents: read
  issues: write
  pull-requests: write
```

### ジョブレベル

特定ジョブのみに適用。ワークフローレベルの設定を上書きする。

```yaml
jobs:
  deploy:
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v4
```

### 一括設定

```yaml
# 全スコープに読み取り権限
permissions: read-all

# 全スコープに書き込み権限
permissions: write-all

# 全権限を無効化（GITHUB_TOKEN は使用不可）
permissions: {}
```

### 重要な注意点

- ワークフローレベルで `permissions` を指定すると、明示的に記載されていないスコープは `none` に設定される
- ジョブレベルで `permissions` を指定すると、そのジョブでは明示的に記載されていないスコープは `none` に設定される
- 権限は昇格できない（再利用可能ワークフローチェーンでは維持または制限のみ可能）

---

## フォークリポジトリの制限

フォークされたリポジトリからのプルリクエストでは、`GITHUB_TOKEN` に以下の制限がある:

- **パブリックリポジトリのフォーク**: デフォルトで読み取り専用
- **プライベートリポジトリのフォーク**: リポジトリ設定で制御可能
- フォーク PR では `pull-requests: write` 権限が制限される場合がある
- シークレット（`GITHUB_TOKEN` 以外）はフォーク PR のランナーに渡されない

---

## イベントごとのデフォルト権限

特定のイベントでは、デフォルトの権限が異なる場合がある:

| イベント | 特記事項 |
|---|---|
| `pull_request` from fork | 読み取り専用（`contents: read` のみ） |
| `pull_request_target` | デフォルトブランチの権限で実行 |
| `workflow_call` | 呼び出し元のパーミッション設定を継承（制限のみ可能） |

---

## GITHUB_TOKEN が起こすイベント

`GITHUB_TOKEN` で行った操作が起こすイベントは、原則として新しいワークフロー run を作らない（再帰実行の防止）。例外:

- `workflow_dispatch` と `repository_dispatch` は常に run を作成する
- `GITHUB_TOKEN` を使うワークフローが作成・更新した PR の `pull_request`（`opened` / `synchronize` / `reopened`）は、approval-required 状態の run を作る。write 権限を持つユーザーが **Approve workflows to run** を選ぶまで実行されない。`labeled` / `edited` / `closed` 等の他のタイプは run を作らない
- 承認なしで実行したい場合は、GitHub App の installation access token または PAT で PR を作成・更新する
- `GITHUB_TOKEN` を使うワークフローの push は GitHub Pages の build を起動しない

---

## ベストプラクティス

1. **最小権限の原則**: 必要なスコープのみを明示的に設定する
2. **制限モードをデフォルトに**: リポジトリ設定で Restricted モードを選択する
3. **ジョブレベルで設定**: ワークフロー全体ではなくジョブ単位で権限を設定する
4. **フォーク PR に注意**: `pull_request_target` で信頼できないコードを実行しない
5. **`id-token: write`**: OIDC を使用する場合のみ設定する

```yaml
# 推奨パターン
permissions:
  contents: read

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm run lint

  deploy:
    needs: lint
    permissions:
      contents: read
      deployments: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: ./deploy.sh
```

## Notes

- 現行の公式 permissions 表（workflow-syntax）に `models` と `repository-projects` は記載がない（2026-10-17 確認）。旧版にあった両スコープは上表から外している。利用前に公式ドキュメントで要確認
- 現行 docs にはスコープ別デフォルト値（Permissive / Restricted）の表がない（2026-10-17 確認）。実際の既定値はリポジトリ / 組織の Workflow permissions 設定で確認すること

## Related

- [workflow-syntax.md](./workflow-syntax.md)
- [events-triggers.md](./events-triggers.md)
