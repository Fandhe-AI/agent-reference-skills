# リードレプリカ

## 概要

リードレプリカは読み取り専用のデータベースコピーで、読み取りワークロードをプライマリデータベースから分散できる。Pro プラン以上で利用可能。

## 設定方法

### ダッシュボードから

1. **Project Settings → Infrastructure → Read Replicas** に移動
2. **Add Replica** をクリック
3. リージョンを選択
4. コンピュートサイズを選択
5. **Create Replica** をクリック

### CLI から

```bash
supabase projects create-replica \
  --project-ref <project-ref> \
  --region <region-code> \
  --size <compute-size>
```

## リージョン選択

リードレプリカはプライマリとは異なるリージョンに配置可能。ユーザーに近いリージョンに配置することでレイテンシを削減できる。

利用可能なリージョン:
- us-east-1, us-west-1, us-west-2
- eu-west-1, eu-west-2, eu-central-1
- ap-southeast-1, ap-southeast-2, ap-northeast-1
- sa-east-1
- その他（リージョン一覧を参照）

## supabase-js での利用

### 基本設定

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://<project-ref>.supabase.co',
  '<anon-key>'
)
```

### リードレプリカの指定

supabase-js v2.39.0 以降で `db` オプションにより利用可能。

```typescript
const supabase = createClient(
  'https://<project-ref>.supabase.co',
  '<anon-key>',
  {
    db: {
      // リードレプリカの接続文字列を指定
      // Transaction モード（Supavisor pooler）のURLを使用
      replicaUrl: 'https://<replica-host>.supabase.co'
    }
  }
)
```

### 読み取り/書き込みの自動ルーティング

- `select` クエリ → リードレプリカにルーティング
- `insert`, `update`, `delete`, `upsert` → プライマリにルーティング
- RPC（関数呼び出し）→ デフォルトはプライマリ、`get: true` オプションでレプリカへ

```typescript
// 読み取り → レプリカに自動ルーティング
const { data } = await supabase
  .from('posts')
  .select('*')

// 書き込み → プライマリに自動ルーティング
const { data } = await supabase
  .from('posts')
  .insert({ title: 'New Post' })
```

## ストリーミングレプリケーション

- PostgreSQL のネイティブなストリーミングレプリケーションを使用
- 非同期レプリケーション（通常数ミリ秒の遅延）
- レプリケーションラグはダッシュボードで確認可能

### レプリケーションラグの確認

```sql
-- プライマリで実行
SELECT
  client_addr,
  state,
  sent_lsn,
  write_lsn,
  flush_lsn,
  replay_lsn,
  pg_wal_lsn_diff(sent_lsn, replay_lsn) AS replication_lag_bytes
FROM pg_stat_replication;
```

## 注意事項

- リードレプリカは読み取り専用（書き込み不可）
- レプリケーション遅延があるため、強い整合性が必要な読み取りはプライマリを使用する
- 各レプリカに独立したコンピュートサイズを設定可能
- リードレプリカには独自の接続プーラーが割り当てられる
- リードレプリカの追加・削除はダウンタイムなしで可能

## 関連

- [コンピュートとディスク](./compute-and-disk.md) — コンピュートサイズ
- [接続管理](../database/connections.md) — 接続方式
- [リージョン](./regions.md) — リージョン選択
