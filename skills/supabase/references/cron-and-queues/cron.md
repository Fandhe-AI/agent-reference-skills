# pg_cron

PostgreSQL のスケジュールジョブ管理 Extension。cron 式による SQL 関数の定期実行。

## 概要

`pg_cron` は PostgreSQL 内でスケジュールジョブを管理する Extension。Supabase ではデフォルトで利用可能で、SQL 文や PostgreSQL 関数を定期的に実行できる。ダッシュボードからの GUI 管理も対応している。

### 用途

- 定期的なデータクリーンアップ（古いレコードの削除）
- 集計テーブルの更新（マテリアライズドビューのリフレッシュ）
- 定期的な通知送信（Edge Functions の呼び出し）
- 一時データの削除
- 統計情報の更新

### cron 式

```
 ┌───────── 分 (0-59)
 │ ┌───────── 時 (0-23)
 │ │ ┌───────── 日 (1-31)
 │ │ │ ┌───────── 月 (1-12)
 │ │ │ │ ┌───────── 曜日 (0-7, 0と7は日曜)
 │ │ │ │ │
 * * * * *
```

| 式 | 説明 |
|----|------|
| `* * * * *` | 毎分 |
| `*/5 * * * *` | 5 分ごと |
| `0 * * * *` | 毎時 0 分 |
| `0 0 * * *` | 毎日 0:00（UTC） |
| `0 0 * * 0` | 毎週日曜 0:00 |
| `0 0 1 * *` | 毎月 1 日 0:00 |
| `30 3 * * 1-5` | 平日 3:30 |

**重要**: pg_cron のスケジュールは **UTC** で実行される。

## コード例

```sql
-- pg_cron Extension の有効化
create extension if not exists pg_cron with schema pg_catalog;

-- ============================================
-- ジョブの作成
-- ============================================

-- 毎日 0:00（UTC）に 30 日以上前のログを削除
select cron.schedule(
  'cleanup-old-logs',            -- ジョブ名（ユニーク）
  '0 0 * * *',                   -- cron 式
  $$delete from public.logs where created_at < now() - interval '30 days'$$
);

-- 毎時マテリアライズドビューをリフレッシュ
select cron.schedule(
  'refresh-stats-view',
  '0 * * * *',
  $$refresh materialized view concurrently public.user_stats$$
);

-- 5 分ごとに関数を実行
select cron.schedule(
  'process-pending-jobs',
  '*/5 * * * *',
  $$select public.process_pending_jobs()$$
);

-- 毎分 Edge Function を呼び出す（pg_net 経由）
select cron.schedule(
  'invoke-edge-function',
  '* * * * *',
  $$
  select net.http_post(
    url := 'https://<REF>.supabase.co/functions/v1/scheduled-task',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || '<SERVICE_ROLE_KEY>'
    ),
    body := jsonb_build_object('scheduled', true)
  );
  $$
);

-- ============================================
-- ジョブの管理
-- ============================================

-- ジョブ一覧の確認
select jobid, jobname, schedule, command, nodename, active
from cron.job
order by jobid;

-- ジョブの実行履歴を確認
select jobid, job_pid, status, return_message, start_time, end_time
from cron.job_run_details
order by start_time desc
limit 20;

-- ジョブの無効化（削除せずに停止）
select cron.alter_job(
  job_id := (select jobid from cron.job where jobname = 'cleanup-old-logs'),
  active := false
);

-- ジョブの再有効化
select cron.alter_job(
  job_id := (select jobid from cron.job where jobname = 'cleanup-old-logs'),
  active := true
);

-- ジョブのスケジュール変更
select cron.alter_job(
  job_id := (select jobid from cron.job where jobname = 'cleanup-old-logs'),
  schedule := '0 3 * * *'  -- 毎日 3:00 UTC に変更
);

-- ジョブの削除
select cron.unschedule('cleanup-old-logs');

-- ジョブ ID で削除
select cron.unschedule(
  (select jobid from cron.job where jobname = 'cleanup-old-logs')
);

-- 実行履歴のクリーンアップ（履歴自体が溜まるため）
select cron.schedule(
  'cleanup-cron-history',
  '0 0 * * *',
  $$delete from cron.job_run_details where end_time < now() - interval '7 days'$$
);
```

```sql
-- ============================================
-- 実用的なジョブ例
-- ============================================

-- 期限切れセッションの削除
select cron.schedule(
  'cleanup-expired-sessions',
  '*/30 * * * *',
  $$delete from public.sessions where expires_at < now()$$
);

-- 日次の集計更新
create or replace function public.update_daily_stats()
returns void
language plpgsql
as $$
begin
  insert into public.daily_stats (date, total_users, total_posts, total_views)
  select
    current_date,
    (select count(*) from auth.users),
    (select count(*) from public.posts where created_at::date = current_date),
    (select coalesce(sum(views), 0) from public.posts where created_at::date = current_date)
  on conflict (date)
  do update set
    total_users = excluded.total_users,
    total_posts = excluded.total_posts,
    total_views = excluded.total_views;
end;
$$;

select cron.schedule(
  'update-daily-stats',
  '55 23 * * *',  -- 毎日 23:55 UTC
  $$select public.update_daily_stats()$$
);

-- ソフトデリートされたレコードの物理削除（30日後）
select cron.schedule(
  'purge-soft-deleted',
  '0 2 * * *',
  $$delete from public.posts where deleted_at is not null and deleted_at < now() - interval '30 days'$$
);
```

## 注意点

- pg_cron のスケジュールは **UTC タイムゾーン** で実行される。JST の場合は -9 時間で計算する（JST 9:00 = UTC 0:00）
- pg_cron は PostgreSQL のプロセスとして実行されるため、長時間かかるジョブはデータベースのパフォーマンスに影響する
- `cron.job_run_details` テーブルは自動的にはクリーンアップされない。定期的に古い履歴を削除するジョブを設定する
- 1 分未満の間隔（秒単位）でのスケジューリングは不可。最小間隔は 1 分
- ジョブ名はユニークである必要がある。同名のジョブを `schedule` すると、既存のジョブが更新される（pg_cron 1.5 以降）
- ダッシュボードの「Database > Extensions > pg_cron」から GUI でジョブを管理できる
- Edge Functions を呼び出す場合は `pg_net` Extension と組み合わせて HTTP リクエストを送信する
- ジョブの SQL は `cron` データベースユーザーとして実行される。RLS が有効なテーブルへのアクセスには注意

## 関連

- [メッセージキュー（pgmq）](./queues.md)
