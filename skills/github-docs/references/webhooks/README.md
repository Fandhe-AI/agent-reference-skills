# webhooks

| Name | Description | Path |
|------|-------------|------|
| Webhook 概要 | Webhook は、特定のイベントが発生した際に外部サーバーへ自動的に HTTP リクエスト（POST）を送信する仕組み。 | [about.md](./about.md) |
| Webhook ベストプラクティス | Webhook ペイロード受信時の 10 秒以内レスポンス、非同期処理キュー、イベントサブスクリプション最適化。 | [best-practices.md](./best-practices.md) |
| Webhook 作成 | リポジトリ・Organization Webhook の作成手順、ペイロード URL・Content Type・Secret・SSL 検証等の設定。 | [creating.md](./creating.md) |
| Webhook イベントとペイロード | 配信ヘッダー（X-GitHub-Event、X-Hub-Signature-256）、共通ペイロード、イベント一覧（push、create、fork…）。 | [events.md](./events.md) |
| Webhook セキュリティ | HMAC-SHA256 署名検証、定数時間比較、Secret 管理、ペイロード整合性・送信元真正性の確認。 | [securing.md](./securing.md) |
