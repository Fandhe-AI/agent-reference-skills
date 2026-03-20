# Edge Functions スケジュール実行

pg_cron と pg_net を使った Edge Functions の定期実行。

## 概要

Supabase では `pg_cron` 拡張と `pg_net` 拡張を組み合わせて、Edge Functions を定期的に実行できる。`pg_cron` がスケジュールを管理し、`pg_net` が HTTP リクエストを送信して Edge Functions を呼び出す。cron 式でスケジュールを定義し、SQL で設定を行う。

### 仕組み

1. `pg_cron` が指定されたスケジュールで SQL を実行
2. SQL 内で `net.http_post()` を呼び出し
3. `pg_net` が Edge Functions エンドポイントに HTTP リクエストを送信
4. Edge Functions が通常どおり実行される

### 前提条件

- `pg_cron` 拡張が有効化済み（ダッシュボード > Database > Extensions）
- `pg_net` 拡張が有効化済み

## コード例

### 基本的な cron ジョブの設定

```sql
-- 毎分実行
SELECT cron.schedule(
  'invoke-function-every-minute',  -- ジョブ名
  '* * * * *',                     -- cron 式
  $$
  SELECT
    net.http_post(
      url := 'https://<project-ref>.supabase.co/functions/v1/my-function',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || '<ANON_KEY>'
      ),
      body := jsonb_build_object(
        'scheduled', true,
        'time', now()::text
      )
    ) AS request_id;
  $$
);
```

### よく使う cron 式

```sql
-- 毎時0分に実行
SELECT cron.schedule(
  'hourly-task',
  '0 * * * *',
  $$ SELECT net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/hourly-task',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || '<ANON_KEY>'
    ),
    body := '{}'::jsonb
  ) AS request_id; $$
);

-- 毎日午前9時（UTC）に実行
SELECT cron.schedule(
  'daily-report',
  '0 9 * * *',
  $$ SELECT net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/daily-report',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || '<ANON_KEY>'
    ),
    body := '{}'::jsonb
  ) AS request_id; $$
);

-- 毎週月曜日の午前0時に実行
SELECT cron.schedule(
  'weekly-cleanup',
  '0 0 * * 1',
  $$ SELECT net.http_post(
    url := 'https://<project-ref>.supabase.co/functions/v1/weekly-cleanup',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || '<ANON_KEY>'
    ),
    body := '{}'::jsonb
  ) AS request_id; $$
);
```

### ジョブの管理

```sql
-- すべてのジョブを確認
SELECT * FROM cron.job;

-- ジョブの実行履歴を確認
SELECT * FROM cron.job_run_details
ORDER BY start_time DESC
LIMIT 10;

-- ジョブを削除
SELECT cron.unschedule('invoke-function-every-minute');
```

### スケジュール実行される Edge Function の例

```typescript
// supabase/functions/daily-report/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req: Request) => {
  // スケジュール実行かどうかを確認（オプション）
  const body = await req.json()

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  // 日次レポートのデータを集計
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .gte('created_at', new Date(Date.now() - 86400000).toISOString())

  console.log(`Daily report: ${data?.length} orders in the last 24 hours`)

  return new Response(
    JSON.stringify({ processed: data?.length }),
    { headers: { 'Content-Type': 'application/json' } },
  )
})
```

### cron 式のフォーマット

```
┌───────────── 分 (0-59)
│ ┌───────────── 時 (0-23)
│ │ ┌───────────── 日 (1-31)
│ │ │ ┌───────────── 月 (1-12)
│ │ │ │ ┌───────────── 曜日 (0-7, 0と7は日曜日)
│ │ │ │ │
* * * * *
```

## 注意点

- `pg_cron` のスケジュールは UTC 基準
- `pg_net` は非同期でリクエストを送信するため、レスポンスの確認は `net._http_response` テーブルで行う
- cron ジョブから呼び出す場合、関数の JWT 検証を無効化するか、有効な JWT を Authorization ヘッダーに含める必要がある
- 最小実行間隔は 1 分
- `pg_cron` は Supabase のプライマリデータベース上で動作するため、レプリカでは使用不可
- ジョブが失敗してもリトライは自動では行われない

## 関連

- [概要](./overview.md)
- [デプロイ](./deploy.md)
- [認証・CORS](./auth.md)
- [バックグラウンドタスク](./background-tasks.md)
