# APIバージョン管理

GitHub REST API のバージョニングの仕組みとサポートポリシー。

## 現在のバージョン

| 項目 | 値 |
|------|-----|
| 現在のデフォルトバージョン | `2022-11-28` |
| ヘッダー名 | `X-GitHub-Api-Version` |

### サポート中のバージョン一覧

| バージョン | リリース日 | サポート終了 |
|-----------|-----------|--------------|
| `2026-03-10` | 2026-03-10 | 未定 |
| `2022-11-28`（デフォルト） | 2022-11-28 | 2028-03-10 |

### バージョン指定

```bash
curl -H "X-GitHub-Api-Version: 2026-03-10" \
  -H "Authorization: Bearer TOKEN" \
  https://api.github.com/repos/OWNER/REPO
```

`X-GitHub-Api-Version` ヘッダーを省略した場合、デフォルトバージョン（`2022-11-28`）が使用される。`2026-03-10` を利用するには明示的にヘッダーを指定する必要がある。

## サポートポリシー

- 各APIバージョンは、リリース日から **最低24か月間** サポートされる
- サポート終了後も即座に削除されるとは限らないが、非推奨となる
- 新しいバージョンがリリースされた場合でも、古いバージョンは24か月のサポート期間中は引き続き利用可能
- サポート終了が近づくと、GitHubからの通知やドキュメントで案内される

## 破壊的変更 vs 非破壊的変更

### 破壊的変更（新バージョンが必要）

新しいAPIバージョンでのみ提供される変更:

- レスポンスの既存フィールドの削除・名称変更
- リクエストパラメータの必須/任意の変更
- 既存エンドポイントのURL変更
- 既存のリクエスト/レスポンスの型変更
- デフォルト動作の変更
- 認証要件の変更

### 非破壊的変更（バージョン不要で追加）

既存のバージョンに影響なく追加される変更:

- 新しいエンドポイントの追加
- 既存レスポンスへの新しいフィールドの追加
- 新しいオプショナルなリクエストパラメータの追加
- 新しい列挙値の追加
- 既存パラメータの制限の緩和
- 新しいWebhookイベントの追加

## 2026-03-10 の破壊的変更（抜粋）

`2022-11-28` から `2026-03-10` への主な破壊的変更:

- Rate limit エンドポイントから `rate` プロパティを削除（`resources.core` を使用）
- チーム作成リクエストから非推奨の `permission` プロパティを削除
- リポジトリコンテンツ一覧で submodule が `type: "file"` ではなく `type: "submodule"` を返す
- SARIF レスポンスの `Content-Type` を `application/sarif+json` に修正
- リポジトリ設定から `use_squash_pr_title_as_default` を削除（`squash_merge_commit_title` に置換）
- API ルートエンドポイントから `authorizations_url` / `hub_url` を削除、`/hub` エンドポイント自体を廃止
- Issue の単数形 `assignee` フィールドを削除（`assignees` 配列を使用）
- Pull request レスポンスから `merge_commit_sha` を削除
- Workflow dispatch のレスポンスが `204` から `200`（ワークフロー実行詳細付き）に変更、`return_run_details` パラメータを削除
- Code scanning の言語 enum で個別の `javascript` / `typescript` を統合 `javascript-typescript` に置換
- Advisory のセキュリティメトリクスで `cvss` を非推奨化（`cvss_severities` を使用）
- Attestation bundle 一覧レスポンスから `bundle` プロパティを削除（`bundle_url` を使用）
- Trade control 対象操作（リポジトリ作成・組織削除・メンバー削除等）のステータスコードが `422`/`403` から `451 Unavailable For Legal Reasons` に変更

詳細な全項目は公式ドキュメントの Breaking changes ページを参照。

## バージョン管理のベストプラクティス

- **`X-GitHub-Api-Version` ヘッダーを常に明示する** — デフォルトバージョンに依存しない
- アプリケーションが依存するAPIバージョンをドキュメント化する
- 新バージョンリリース時にはChangelog を確認し、影響がないか検証する
- 移行計画を立て、サポート終了前に新バージョンへ移行する
- テスト環境で新バージョンの動作を確認してから本番環境に適用する

## バージョン一覧の確認

利用可能なAPIバージョンの一覧を取得:

```bash
curl -H "Authorization: Bearer TOKEN" \
  https://api.github.com/versions
```

レスポンス例:

```json
[
  "2022-11-28",
  "2026-03-10"
]
```
