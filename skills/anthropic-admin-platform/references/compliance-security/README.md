# compliance-security

| Name | Description | Path |
| --- | --- | --- |
| Access Transparency | Anthropic personnel による組織データへのアクセス監査記録（Activity Feed 経由） | [access-transparency.md](./access-transparency.md) |
| API and data retention | Claude API / Platform on AWS の ZDR / HIPAA readiness 対応 | [api-and-data-retention.md](./api-and-data-retention.md) |
| App Attest for iOS and macOS apps | iOS / macOS ネイティブアプリ → Claude API の App Attest 認証 | [app-attest.md](./app-attest.md) |
| Configure AWS KMS for CMEK | AWS KMS キーを CMEK として Claude workspace データ暗号化に使用 | [cmek-aws-kms.md](./cmek-aws-kms.md) |
| Configure Azure Key Vault for CMEK | Azure Key Vault キーを CMEK として Claude workspace データ暗号化に使用 | [cmek-azure-key-vault.md](./cmek-azure-key-vault.md) |
| Configure Google Cloud KMS for CMEK | Google Cloud KMS キーを CMEK として Claude workspace データ暗号化に使用 | [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md) |
| Customer-managed encryption keys (CMEK) | 顧客管理暗号化キーによる workspace 保存時データ暗号化 | [cmek.md](./cmek.md) |
| Query the Activity Feed | Compliance API Activity Feed のクエリ・フィルタ・ページネーション | [compliance-activity-feed.md](./compliance-activity-feed.md) |
| Compliance API | 組織の Claude アクティビティ・チャット・ファイル・プロジェクト・ユーザーへのプログラムアクセス | [compliance-api.md](./compliance-api.md) |
| Set up the Compliance API | Compliance API 有効化・Compliance Access Key / Admin API key 作成 | [compliance-api-access.md](./compliance-api-access.md) |
| Retrieve and delete chats, files, and projects | claude.ai chat・ファイル・プロジェクト内容の Compliance API 取得・削除 | [compliance-content-data.md](./compliance-content-data.md) |
| Handle Compliance API errors | Compliance API エラーレスポンス: ステータスコード別・原因・対応 | [compliance-errors.md](./compliance-errors.md) |
| Compliance API FAQ | Compliance API アクセス・スコープ・データ範囲・保持・統合パターン FAQ | [compliance-faq.md](./compliance-faq.md) |
| Design your compliance integration | Activity Feed の polling / cursor-driven read・SIEM 連携・内容保持計画 | [compliance-integration-patterns.md](./compliance-integration-patterns.md) |
| List organizations, users, roles, groups, and settings | Compliance API 経由の組織・ユーザー・ロール・グループ・設定一覧 | [compliance-org-data.md](./compliance-org-data.md) |
| Data residency | 推論実行地域・保存先地域の指定・workspace geo 設定 | [data-residency.md](./data-residency.md) |
