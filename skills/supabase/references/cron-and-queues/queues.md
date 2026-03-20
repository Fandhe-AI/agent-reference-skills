# pgmq（メッセージキュー）

PostgreSQL ベースのメッセージキュー。キュー作成、メッセージ送受信、可視性タイムアウト、アーカイブ管理。

## 概要

`pgmq`（Postgres Message Queue）は PostgreSQL 上に軽量なメッセージキューを実装する Extension。外部のキューサービス（SQS、RabbitMQ 等）を使わずに、データベース内でメッセージの送受信を行える。

### 主な機能

- **キュー作成**: `pgmq.create()` でキューを作成
- **メッセージ送信**: `pgmq.send()` / `pgmq.send_batch()` でメッセージを追加
- **メッセージ読み取り**: `pgmq.read()` で可視性タイムアウト付き読み取り、`pgmq.pop()` で即座に削除して読み取り
- **可視性タイムアウト（VT）**: 読み取ったメッセージを一定時間他のコンシューマーから非表示にする
- **アーカイブ**: 処理済みメッセージをアーカイブテーブルに移動
- **削除**: メッセージの完全削除

### 基本フロー

1. キューを作成
2. プロデューサーがメッセージを送信（`send`）
3. コンシューマーがメッセージを読み取り（`read`）→ 可視性タイムアウト開始
4. 処理完了後にメッセージを削除（`delete`）またはアーカイブ（`archive`）
5. タイムアウト内に処理が完了しなければ、メッセージが再度可視化される（リトライ）

## コード例

```sql
-- pgmq Extension の有効化
create extension if not exists pgmq;

-- ============================================
-- キューの管理
-- ============================================

-- キューの作成
select pgmq.create('task_queue');

-- パーティション付きキューの作成（大量メッセージ向け）
select pgmq.create_partitioned(
  'high_volume_queue',
  '5 minutes'  -- パーティション間隔
);

-- キュー一覧
select queue_name from pgmq.list_queues();

-- キューの削除
select pgmq.drop_queue('task_queue');

-- ============================================
-- メッセージの送信
-- ============================================

-- 単一メッセージの送信（JSONB ペイロード）
select pgmq.send(
  'task_queue',
  '{"type": "email", "to": "user@example.com", "subject": "Welcome"}'::jsonb
);
-- 返却値: メッセージ ID (bigint)

-- 遅延付き送信（30 秒後に可視化）
select pgmq.send(
  'task_queue',
  '{"type": "reminder", "user_id": "123"}'::jsonb,
  30  -- delay_seconds
);

-- バッチ送信
select pgmq.send_batch(
  'task_queue',
  array[
    '{"type": "email", "to": "user1@example.com"}'::jsonb,
    '{"type": "email", "to": "user2@example.com"}'::jsonb,
    '{"type": "email", "to": "user3@example.com"}'::jsonb
  ]
);
-- 返却値: メッセージ ID の配列

-- ============================================
-- メッセージの読み取り
-- ============================================

-- 1 件読み取り（可視性タイムアウト 30 秒）
select * from pgmq.read(
  'task_queue',
  30,   -- vt (visibility timeout in seconds)
  1     -- qty (読み取り件数)
);
-- 返却: msg_id, read_ct, enqueued_at, vt, message

-- 複数件読み取り
select * from pgmq.read(
  'task_queue',
  60,   -- 60 秒の可視性タイムアウト
  5     -- 最大 5 件
);

-- 条件付き読み取り（特定のメッセージのみ）
select * from pgmq.read_with_poll(
  'task_queue',
  30,    -- vt
  5,     -- qty
  5000,  -- max_poll_ms (最大ポーリング時間 ms)
  500    -- poll_interval_ms (ポーリング間隔 ms)
);

-- pop（読み取りと同時に削除）
select * from pgmq.pop('task_queue');

-- ============================================
-- メッセージの処理完了
-- ============================================

-- メッセージの削除（処理完了後）
select pgmq.delete('task_queue', 1);  -- msg_id = 1

-- バッチ削除
select pgmq.delete('task_queue', array[1, 2, 3]);

-- メッセージのアーカイブ（削除せずにアーカイブテーブルに移動）
select pgmq.archive('task_queue', 1);

-- バッチアーカイブ
select pgmq.archive('task_queue', array[1, 2, 3]);

-- ============================================
-- 可視性タイムアウトの管理
-- ============================================

-- 可視性タイムアウトの延長（処理に時間がかかる場合）
select pgmq.set_vt(
  'task_queue',
  1,     -- msg_id
  60     -- 新しい VT（秒）
);

-- ============================================
-- キューの統計情報
-- ============================================

-- キューのメトリクス
select * from pgmq.metrics('task_queue');
-- queue_name, queue_length, newest_msg_age_sec, oldest_msg_age_sec, total_messages

-- 全キューのメトリクス
select * from pgmq.metrics_all();
```

```typescript
// === Edge Functions でのキュー消費 ===
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );

  // キューからメッセージを読み取り
  const { data: messages, error } = await supabase.rpc('pgmq_read', {
    queue_name: 'task_queue',
    vt: 30,
    qty: 5,
  });

  if (error) throw error;
  if (!messages || messages.length === 0) {
    return new Response(JSON.stringify({ processed: 0 }));
  }

  const processedIds: number[] = [];

  for (const msg of messages) {
    try {
      // メッセージの処理
      const payload = msg.message;

      if (payload.type === 'email') {
        // メール送信処理
        await sendEmail(payload.to, payload.subject);
      }

      processedIds.push(msg.msg_id);
    } catch (err) {
      console.error(`Failed to process message ${msg.msg_id}:`, err);
      // 処理失敗 → VT が切れると自動的に再処理対象になる
    }
  }

  // 処理済みメッセージを削除
  if (processedIds.length > 0) {
    await supabase.rpc('pgmq_delete_batch', {
      queue_name: 'task_queue',
      msg_ids: processedIds,
    });
  }

  return new Response(
    JSON.stringify({ processed: processedIds.length }),
    { headers: { 'Content-Type': 'application/json' } }
  );
});
```

```sql
-- === pgmq を RPC 関数でラップ（supabase-js から呼び出し用） ===

-- メッセージ読み取り用 RPC
create or replace function pgmq_read(
  queue_name text,
  vt integer default 30,
  qty integer default 1
)
returns table (
  msg_id bigint,
  read_ct integer,
  enqueued_at timestamptz,
  vt timestamptz,
  message jsonb
)
language plpgsql security definer
as $$
begin
  return query
  select * from pgmq.read(queue_name, vt, qty);
end;
$$;

-- メッセージ送信用 RPC
create or replace function pgmq_send(
  queue_name text,
  payload jsonb
)
returns bigint
language plpgsql security definer
as $$
begin
  return pgmq.send(queue_name, payload);
end;
$$;

-- バッチ削除用 RPC
create or replace function pgmq_delete_batch(
  queue_name text,
  msg_ids bigint[]
)
returns table (deleted boolean)
language plpgsql security definer
as $$
begin
  return query
  select pgmq.delete(queue_name, unnest(msg_ids));
end;
$$;
```

```sql
-- === pg_cron と pgmq の組み合わせ ===
-- 定期的にキューを消費する

-- キュー処理関数
create or replace function public.process_task_queue()
returns void
language plpgsql
as $$
declare
  msg record;
begin
  -- 最大 10 件を処理
  for msg in select * from pgmq.read('task_queue', 30, 10)
  loop
    begin
      -- メッセージの処理ロジック
      perform public.handle_task(msg.message);
      -- 処理完了 → 削除
      perform pgmq.delete('task_queue', msg.msg_id);
    exception when others then
      -- エラー時はログを残し、VT 切れを待つ（自動リトライ）
      raise warning 'Failed to process message %: %', msg.msg_id, sqlerrm;
    end;
  end loop;
end;
$$;

-- 毎分キューを処理
select cron.schedule(
  'process-task-queue',
  '* * * * *',
  $$select public.process_task_queue()$$
);
```

## 注意点

- pgmq のメッセージペイロードは JSONB 型。テキストやバイナリデータは JSON に変換して格納する
- 可視性タイムアウト（VT）内に `delete` / `archive` しないと、メッセージは再度可視化される。これはリトライの仕組みとして利用できるが、意図しない重複処理に注意
- `read` はポーリング型。リアルタイム通知が必要な場合は Supabase Realtime と組み合わせる
- `pop` は読み取りと同時に削除するため、処理に失敗するとメッセージが失われる。信頼性が必要な場合は `read` + `delete` パターンを使用
- pgmq の関数は直接 REST API に公開されない。supabase-js から使用する場合は RPC 関数でラップする
- 大量のメッセージを扱う場合は `create_partitioned` でパーティション付きキューを使用
- `read_ct`（読み取り回数）で何回リトライされたかを追跡できる。無限リトライを防ぐためにデッドレターキューを検討
- Edge Functions から定期実行するには pg_cron + pg_net で Edge Functions を呼び出すか、外部のスケジューラを使用

## 関連

- [pg_cron（スケジュールジョブ）](./cron.md)
