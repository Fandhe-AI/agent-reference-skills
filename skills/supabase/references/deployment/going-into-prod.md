# 本番チェックリスト

## セキュリティ

### RLS（Row Level Security）

- [ ] すべてのテーブルで RLS が有効になっている
- [ ] 各テーブルに適切なポリシーが設定されている
- [ ] `public` スキーマのテーブルは必ず RLS で保護されている

```sql
-- RLS が無効なテーブルを確認
SELECT schemaname, tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename NOT IN (
    SELECT tablename FROM pg_tables t
    JOIN pg_class c ON c.relname = t.tablename
    WHERE c.relrowsecurity = true
  );
```

### API キー管理

- [ ] `anon` キーはクライアント側でのみ使用（RLS で保護）
- [ ] `service_role` キーはサーバー側でのみ使用（絶対にクライアントに公開しない）
- [ ] 環境変数で管理し、コードにハードコードしない

### その他

- [ ] カスタムの JWT シークレットを使用している（デフォルトから変更）
- [ ] 不要な API エンドポイントを無効化
- [ ] CORS の設定が適切
- [ ] MFA を有効化（ダッシュボードアクセス）

## パフォーマンス

### インデックス

- [ ] 頻繁にクエリされるカラムにインデックスが設定されている
- [ ] 外部キーカラムにインデックスがある
- [ ] 複合クエリに対して適切な複合インデックスがある

```sql
-- 使用されていないインデックスを確認
SELECT
  schemaname,
  relname AS table,
  indexrelname AS index,
  idx_scan AS scans
FROM pg_stat_user_indexes
WHERE idx_scan = 0
  AND schemaname = 'public'
ORDER BY relname;
```

### 接続プール

- [ ] Supavisor（接続プーラー）を使用している
- [ ] サーバーレス環境では Transaction モードを使用
- [ ] 接続数が上限に達していないか確認

### クエリ最適化

- [ ] `pg_stat_statements` で遅いクエリを特定・改善
- [ ] N+1 クエリを排除
- [ ] 適切なページネーション（カーソルベース推奨）

## 運用

### バックアップ

- [ ] PITR（Point-in-Time Recovery）が有効（Pro 以上）
- [ ] バックアップからのリストア手順をテスト済み
- [ ] 重要データのオフサイトバックアップを設定

### 監視

- [ ] ダッシュボードのメトリクスを定期的に確認
- [ ] ログを確認する運用フローがある
- [ ] 外部監視サービスとの連携を検討（Grafana, Datadog 等）

### アラート

- [ ] CPU / メモリ使用率のアラートを設定
- [ ] ディスク使用量のアラートを設定
- [ ] エラー率のアラートを設定
- [ ] 使用量（課金）のアラートを設定

### インフラ

- [ ] コンピュートサイズが適切（本番は Small 以上推奨）
- [ ] リージョンがユーザーに近い場所に設定されている
- [ ] Spend Cap の設定を確認（本番は無効推奨）
- [ ] ネットワーク制限の設定を検討

### 災害復旧

- [ ] RTO（復旧時間目標）と RPO（復旧点目標）を定義
- [ ] 障害時の対応手順書を作成
- [ ] 定期的に復旧訓練を実施

## デプロイ前の最終確認

```bash
# データベースのリント
supabase db lint

# マイグレーションの確認
supabase db diff

# ローカルでの動作確認
supabase db reset
```

## 関連

- [RLS 詳細](../security/rls.md) — Row Level Security
- [パフォーマンス](../platform/performance.md) — パフォーマンス最適化
- [バックアップ](../platform/backups.md) — バックアップ設定
- [ログ](../telemetry/logs.md) — ログ監視
