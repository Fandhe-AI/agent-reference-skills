# GitHub Actions -- GITHUB_TOKEN パーミッション

GITHUB_TOKEN の自動認証とパーミッションスコープのリファレンス。

公式ドキュメント: https://docs.github.com/en/actions/security-for-github-actions/security-guides/automatic-token-authentication

---

## 概要

`GITHUB_TOKEN` は各ワークフロー実行の開始時に自動生成されるトークン。ワークフロー内で GitHub API やリポジトリ操作に使用できる。ジョブ終了時に失効する。

アクセス方法:
- コンテキスト: `${{ secrets.GITHUB_TOKEN }}` または `${{ github.token }}`
- 環境変数: `$GITHUB_TOKEN`

---

## パーミッションスコープ一覧

| スコープ | 説明 | 許可される値 |
|---|---|---|
| `actions` | ワークフロー、アーティファクト、キャッシュの管理 | `read`, `write`, `none` |
| `attestations` | アーティファクト署名の管理 | `read`, `write`, `none` |
| `checks` | チェック実行とチェックスイートの管理 | `read`, `write`, `none` |
| `contents` | リポジトリコンテンツ（コミット、ブランチ、タグ等）の管理 | `read`, `write`, `none` |
| `deployments` | デプロイメントの管理 | `read`, `write`, `none` |
| `discussions` | ディスカッションの管理 | `read`, `write`, `none` |
| `id-token` | OIDC トークンのリクエスト | `write`, `none` |
| `issues` | Issue の管理 | `read`, `write`, `none` |
| `packages` | GitHub Packages の管理 | `read`, `write`, `none` |
| `pages` | GitHub Pages の管理 | `read`, `write`, `none` |
| `pull-requests` | プルリクエストの管理 | `read`, `write`, `none` |
| `repository-projects` | プロジェクトボードの管理 | `read`, `write`, `none` |
| `security-events` | Code scanning / Dependabot アラートの管理 | `read`, `write`, `none` |
| `statuses` | コミットステータスの管理 | `read`, `write`, `none` |

---

## デフォルトパーミッション

リポジトリ設定の「Workflow permissions」で 2 つのデフォルトモードから選択可能:

### Permissive（寛容）モード

`contents: write` を含む広いデフォルト権限。

| スコープ | デフォルト値 |
|---|---|
| `actions` | `write` |
| `checks` | `write` |
| `contents` | `write` |
| `deployments` | `write` |
| `id-token` | `none` |
| `issues` | `write` |
| `packages` | `write` |
| `pages` | `write` |
| `pull-requests` | `write` |
| `repository-projects` | `write` |
| `security-events` | `write` |
| `statuses` | `write` |

### Restricted（制限）モード（推奨）

`contents: read` と `packages: read` のみ。その他は `none`。

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
