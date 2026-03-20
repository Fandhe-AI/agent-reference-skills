# Database Webhooks

テーブルの変更イベントで HTTP リクエストを送信する。

## 概要

Database Webhooks は PostgreSQL トリガーを使い、テーブルの INSERT、UPDATE、DELETE イベント時に指定した URL へ HTTP POST リクエストを送信する。Supabase ダッシュボードまたは SQL で設定できる。

## コード例

```sql
-- pg_net Extension を使った HTTP リクエスト（Webhook の内部実装）
-- ダッシュボードからの設定が推奨

-- 手動でトリガーベースの Webhook を作成する場合
create or replace function notify_webhook()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  perform net.http_post(
    url := 'https://example.com/webhook',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer secret-token'
    ),
    body := jsonb_build_object(
      'type', TG_OP,
      'table', TG_TABLE_NAME,
      'record', row_to_json(NEW),
      'old_record', case when TG_OP = 'UPDATE' then row_to_json(OLD) else null end
    )
  );
  return NEW;
end;
$$;

create trigger on_todo_change
after insert or update or delete on public.todos
for each row execute function notify_webhook();
```

## Webhook ペイロード

```json
{
  "type": "INSERT",
  "table": "todos",
  "record": { "id": 1, "title": "Buy groceries", "is_complete": false },
  "schema": "public",
  "old_record": null
}
```

## 注意点

- Webhook はダッシュボードの Database → Webhooks から設定するのが最も簡単
- `pg_net` Extension がバックグラウンドで HTTP リクエストを送信する（非同期）
- Webhook の失敗はリトライされない（必要に応じて Edge Functions で処理）
- 大量のイベントが発生する場合はパフォーマンスに注意
- Webhook URL のシークレットは Vault に保存することを推奨

## 関連

- [./extensions.md](./extensions.md) — pg_net Extension
- [../realtime/postgres-changes.md](../realtime/postgres-changes.md) — Realtime での変更通知
- [../functions/overview.md](../functions/overview.md) — Edge Functions
