# compliance-security

| Name | Description | Path |
| --- | --- | --- |
| Verify Access Transparency events with the transparency log (beta) | Access Transparency イベントの透明性ログ検証・inclusion / consistency 証明（beta） | [access-transparency-log.md](./access-transparency-log.md) |
| Access Transparency | Anthropic personnel による組織データへのアクセス監査記録（Activity Feed 経由） | [access-transparency.md](./access-transparency.md) |
| API and data retention | Claude API / Platform on AWS の ZDR / HIPAA readiness 対応 | [api-and-data-retention.md](./api-and-data-retention.md) |
| App Attest for iOS and macOS apps | iOS / macOS ネイティブアプリ → Claude API の App Attest 認証 | [app-attest.md](./app-attest.md) |
| Add and attach an encryption key with the Admin API | Admin API 3 回の呼び出しで CMEK キーを登録・検証・workspace に紐付け | [cmek-admin-api.md](./cmek-admin-api.md) |
| Limit an AWS KMS key to specific workspaces | AWS KMS キーポリシー条件で CMEK 利用を特定 workspace に限定 | [cmek-aws-kms-workspaces.md](./cmek-aws-kms-workspaces.md) |
| Configure AWS KMS for CMEK | AWS KMS キーを CMEK として Claude workspace データ暗号化に使用 | [cmek-aws-kms.md](./cmek-aws-kms.md) |
| Configure Azure Key Vault for CMEK | Azure Key Vault キーを CMEK として Claude workspace データ暗号化に使用 | [cmek-azure-key-vault.md](./cmek-azure-key-vault.md) |
| Set up CMEK on Claude Platform on AWS | Claude Platform on AWS で AWS KMS キーを作成し workspace に紐付ける CMEK 設定 | [cmek-claude-platform-on-aws.md](./cmek-claude-platform-on-aws.md) |
| What CMEK covers on Claude Enterprise | Claude Enterprise で CMEK が暗号化するデータ・無効化される機能の一覧 | [cmek-coverage-claude-enterprise.md](./cmek-coverage-claude-enterprise.md) |
| What CMEK covers on Claude Platform | Claude Platform で CMEK が暗号化するデータ・無効化される機能の一覧 | [cmek-coverage-claude-platform.md](./cmek-coverage-claude-platform.md) |
| CMEK, data retention, and ZDR | CMEK workspace のデータ保持と zero data retention (ZDR) の関係 | [cmek-data-retention.md](./cmek-data-retention.md) |
| Configure Google Cloud KMS for CMEK | Google Cloud KMS キーを CMEK として Claude workspace データ暗号化に使用 | [cmek-google-cloud-kms.md](./cmek-google-cloud-kms.md) |
| How CMEK works | CMEK の仕組み: 顧客キーによる data key のエンベロープ暗号化 | [cmek-how-it-works.md](./cmek-how-it-works.md) |
| What happens when you rotate, disable, or delete your encryption key | CMEK キーのローテーション・無効化・削除時の挙動 | [cmek-key-lifecycle.md](./cmek-key-lifecycle.md) |
| Troubleshoot CMEK | CMEK のエラー・検証失敗・ログ異常の原因と対処 | [cmek-troubleshooting.md](./cmek-troubleshooting.md) |
| Customer-managed encryption keys (CMEK) | 顧客管理暗号化キーによる workspace 保存時データ暗号化 | [cmek.md](./cmek.md) |
| Query the Activity Feed | Compliance API Activity Feed のクエリ・フィルタ・ページネーション | [compliance-activity-feed.md](./compliance-activity-feed.md) |
| Set up the Compliance API | Compliance API 有効化・Compliance Access Key / Admin API key 作成 | [compliance-api-access.md](./compliance-api-access.md) |
| Compliance API | 組織の Claude アクティビティ・チャット・ファイル・プロジェクト・ユーザーへのプログラムアクセス | [compliance-api.md](./compliance-api.md) |
| Retrieve and delete chats, files, and projects | claude.ai chat・ファイル・プロジェクト内容の Compliance API 取得・削除 | [compliance-content-data.md](./compliance-content-data.md) |
| Handle Compliance API errors | Compliance API エラーレスポンス: ステータスコード別・原因・対応 | [compliance-errors.md](./compliance-errors.md) |
| Compliance API FAQ | Compliance API アクセス・スコープ・データ範囲・保持・統合パターン FAQ | [compliance-faq.md](./compliance-faq.md) |
| Design your compliance integration | Activity Feed の polling / cursor-driven read・SIEM 連携・内容保持計画 | [compliance-integration-patterns.md](./compliance-integration-patterns.md) |
| List organizations, users, roles, groups, and settings | Compliance API 経由の組織・ユーザー・ロール・グループ・設定一覧 | [compliance-org-data.md](./compliance-org-data.md) |
| Retrieve session transcripts | Cowork / Claude Code 等のローカル・リモートセッション一覧と transcript 取得 | [compliance-sessions.md](./compliance-sessions.md) |
| Data residency | 推論実行地域・保存先地域の指定・workspace geo 設定 | [data-residency.md](./data-residency.md) |
| Check stored Security posture events against current results | SIEM 保存済み Security posture イベントと現在の結果の日次突合 | [security-posture-check-events-against-results.md](./security-posture-check-events-against-results.md) |
| Detect changes in Security posture | Activity Feed の attestation イベントに対する SIEM 検知ルール例 | [security-posture-detect-changes.md](./security-posture-detect-changes.md) |
| Security posture events reference | Security posture の Activity Feed イベント（attestation 更新）リファレンス | [security-posture-events-reference.md](./security-posture-events-reference.md) |
| Map Security posture events to OCSF | Security posture イベントの OCSF 1.6.0 マッピング | [security-posture-ocsf-mapping.md](./security-posture-ocsf-mapping.md) |
| Security posture results reference | Compliance API security_posture エンドポイントの結果リファレンス | [security-posture-results-reference.md](./security-posture-results-reference.md) |
| Send Security posture events to your SIEM | Security posture イベントの Activity Feed 取得と SIEM 送信 | [security-posture-send-events.md](./security-posture-send-events.md) |
| Security posture in the Compliance API | Compliance API の Security posture（Security Center）概要 | [security-posture.md](./security-posture.md) |
