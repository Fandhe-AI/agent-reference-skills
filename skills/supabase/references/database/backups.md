# Database Backups

Supabase の自動バックアップと Point-in-Time Recovery（PITR）。

## 概要

Supabase は Pro 以上のプランでデータベースの自動バックアップを提供する。Free プランは手動でのエクスポートが必要。

## バックアップの種類

### 日次バックアップ（Daily Backups）

プランごとの保持期間:

| プラン | 保持期間 |
|--------|---------|
| Free | 自動バックアップなし（手動エクスポートのみ） |
| Pro | 7 日間 |
| Team | 14 日間 |
| Enterprise | 最大 30 日間 |

### Point-in-Time Recovery（PITR）

- **対象プラン**: Pro、Team、Enterprise（有料アドオン）
- Small 以上のコンピュートアドオンが必要
- WAL ファイルのアーカイブ + 物理バックアップで実現
- 秒単位の精度で任意の時点に復元可能
- 最悪ケースの RPO（Recovery Point Objective）は 2 分
- 7 / 14 / 28 日の保持期間から選択

## 手動エクスポート（Free プラン）

```bash
# supabase CLI で pg_dump エクスポート
supabase db dump --db-url "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" -f backup.sql

# psql で直接エクスポート
pg_dump "postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres" \
  --format=custom \
  --file=backup.dump
```

## 復元方法

1. ダッシュボードの **Project Settings > Database > Backups** を開く
2. 復元したいバックアップポイントを選択
3. "Restore" ボタンをクリック
4. 復元中はプロジェクトがダウンタイムになる（DB サイズに比例）

### 復元後の注意

- カスタムロールのパスワードは復元後にリセットが必要
- ストレージファイルはバックアップに含まれない（別途 S3 バックアップなどを検討）

## 注意点

- 復元は上書き操作であり、現在のデータが失われる
- PITR を使用するには Small 以上のコンピュートアドオンが必要
- バックアップ保持期間外のデータは復元できない
- Edge Functions のコードはバックアップに含まれない（GitHub 等でバージョン管理する）

## 関連

- [./connections.md](./connections.md) — データベース接続
- [../../references/platform/README.md](../platform/README.md) — プラットフォーム管理
