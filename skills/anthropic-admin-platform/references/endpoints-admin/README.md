# endpoints-admin

エンドポイントはリソース単位の集約ページ（1 リソース 1 ファイル、計 98 EP）。Admin API キー（sk-ant-admin...）が必要。mcp-tunnels は Deprecated で新 Tunnels API は anthropic-api-tools-mcp を参照。

| Name | Description | Path |
| --- | --- | --- |
| Analytics Admin API | Claude Enterprise 環境のアクティビティ・コスト・利用統計 API 集約 | [analytics.md](./analytics.md) |
| API Keys Admin API | 組織内 API キーの一覧・表示・ステータス更新（secret は非返却） | [api-keys.md](./api-keys.md) |
| Cost Report Admin API | 組織のコスト時系列集計・workspace / description 別グルーピング | [cost-report.md](./cost-report.md) |
| External Keys Admin API | 顧客管理暗号化キー（CMEK）設定の AWS KMS / GCP / Azure 対応 | [external-keys.md](./external-keys.md) |
| Federation Issuers Admin API | Workload Identity Federation に信頼する OIDC issuer 登録 | [federation-issuers.md](./federation-issuers.md) |
| Federation Rules Admin API | Federation issuer の JWT → service account への OIDC 認可ルール | [federation-rules.md](./federation-rules.md) |
| Invites Admin API | 組織へ新規ユーザーを招待 | [invites.md](./invites.md) |
| MCP Tunnels Admin API (deprecated) | MCP Tunnels 管理（deprecated — 新 Tunnels API 推奨） | [mcp-tunnels.md](./mcp-tunnels.md) |
| Organizations Admin API | 認証キーに紐付く組織情報の取得 | [organizations.md](./organizations.md) |
| Rate Limits Admin API | 組織・workspace 単位の Messages API rate limit 一覧 | [rate-limits.md](./rate-limits.md) |
| RBAC Groups Admin API | RBAC グループとメンバーシップの管理（Beta・Claude Enterprise のみ） | [rbac-groups.md](./rbac-groups.md) |
| RBAC Roles Admin API | RBAC ロール・権限の読み取り専用列挙（Beta・Claude Enterprise のみ） | [rbac-roles.md](./rbac-roles.md) |
| Service Accounts Admin API | 非人間ワークロード ID と workspace メンバーシップ管理 | [service-accounts.md](./service-accounts.md) |
| Spend Limits Admin API | ユーザー別支出限度額 / 有効限度額・増額リクエスト管理 | [spend-limits.md](./spend-limits.md) |
| Usage Report Admin API | Claude Code / Messages API の集約利用メトリクス取得 | [usage-report.md](./usage-report.md) |
| Users Admin API | 組織内ユーザーの管理 | [users.md](./users.md) |
| Workspaces Admin API | Workspace・メンバー・rate limit override・service account メンバーシップ | [workspaces.md](./workspaces.md) |
