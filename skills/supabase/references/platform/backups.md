# バックアップ

## 日次自動バックアップ

すべてのプロジェクトで日次自動バックアップが有効。

| プラン | バックアップ頻度 | 保持期間 |
|--------|-----------------|---------|
| Free | 日次 | 7日間 |
| Pro | 日次 | 14日間 |
| Team | 日次 | 30日間 |
| Enterprise | カスタム | カスタム |

### バックアップの確認

ダッシュボードの **Project Settings → Database → Backups** から確認可能。

## PITR（Point-in-Time Recovery）

Pro プラン以上で利用可能なアドオン。WAL（Write-Ahead Log）を使用して任意の時点に復元できる。

### 特徴

- 秒単位の粒度で復元可能
- WAL をリアルタイムでアーカイブ
- データ損失を最小限に抑えられる

### 保持期間

| プラン | PITR 保持期間 |
|--------|-------------|
| Pro | 7日間 |
| Team | 14日間 |
| Enterprise | カスタム |

### PITR の有効化

ダッシュボードの **Project Settings → Add-ons → Point-in-Time Recovery** で有効化。

### PITR を使った復元

1. ダッシュボードの **Backups → Point in Time** に移動
2. 復元したい日時を選択
3. **Restore** をクリック
4. 復元中はプロジェクトが一時停止される

## バックアップのダウンロード

### ダッシュボードから

1. **Project Settings → Database → Backups** に移動
2. ダウンロードしたいバックアップの **Download** をクリック

### pg_dump を使用

```bash
# データベース全体をダンプ
pg_dump -h db.<project-ref>.supabase.co -U postgres -d postgres -F c -f backup.dump

# スキーマのみ
pg_dump -h db.<project-ref>.supabase.co -U postgres -d postgres --schema-only -f schema.sql

# データのみ
pg_dump -h db.<project-ref>.supabase.co -U postgres -d postgres --data-only -f data.sql
```

## リストア方法

### ダッシュボードから

日次バックアップの **Restore** ボタンをクリック。プロジェクトは一時停止される。

### pg_restore を使用

```bash
# カスタム形式のダンプからリストア
pg_restore -h db.<project-ref>.supabase.co -U postgres -d postgres --clean --if-exists backup.dump

# SQL形式からリストア
psql -h db.<project-ref>.supabase.co -U postgres -d postgres < backup.sql
```

### 注意事項

- リストア中はアプリケーションを停止することを推奨
- リストア後は接続プールのリセットが必要な場合がある
- 大規模なリストアは時間がかかるため、メンテナンスウィンドウを設定すること

## ベストプラクティス

- 本番環境では PITR を有効化する
- 定期的にバックアップからのリストアをテストする
- 重要な変更前には手動で `pg_dump` を取得する
- バックアップのダウンロードを自動化してオフサイト保管する

## 関連

- [コンピュートとディスク](./compute-and-disk.md) — ディスク管理
- [本番チェックリスト](../deployment/going-into-prod.md) — 本番準備
- [ローカル開発](../local-dev/overview.md) — ローカル環境
