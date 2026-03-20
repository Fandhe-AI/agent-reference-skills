# パフォーマンス最適化

## コンピュートサイズ選択

### 判断基準

- **CPU 使用率**: 常時 70% 以上ならスケールアップ
- **メモリ使用率**: 常時 80% 以上ならスケールアップ
- **接続数**: 上限に近づいている場合はスケールアップまたはプーリング活用

### 確認方法

```sql
-- CPU / メモリはダッシュボードの Reports で確認

-- 現在のアクティブ接続数
SELECT count(*) FROM pg_stat_activity WHERE state = 'active';

-- 接続数の詳細
SELECT
  usename,
  application_name,
  state,
  count(*)
FROM pg_stat_activity
GROUP BY usename, application_name, state
ORDER BY count(*) DESC;
```

## 接続プーリング

### Supavisor（推奨）

Supabase は Supavisor を接続プーラーとして提供する。

#### 接続モード

| モード | ポート | 用途 |
|--------|-------|------|
| Transaction | 6543 | 一般的なアプリケーション（推奨） |
| Session | 5432 | Prepared Statements が必要な場合 |

#### 接続文字列

```
# Transaction モード（推奨）
postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:6543/postgres

# Session モード
postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres
```

#### supabase-js での設定

```typescript
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  db: {
    // Supavisor 経由の接続を使用（デフォルト）
  }
})
```

### 注意事項

- サーバーレス環境（Vercel, Netlify 等）では必ず Transaction モードを使用する
- Transaction モードでは Prepared Statements が使えない
- `pgbouncer=true` パラメータは Supavisor では不要（後方互換で動作する）

## クエリ最適化

### インデックス

```sql
-- 頻繁にフィルタリングするカラムにインデックスを作成
CREATE INDEX idx_posts_user_id ON posts (user_id);

-- 複合インデックス
CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);

-- 部分インデックス
CREATE INDEX idx_active_users ON users (email) WHERE is_active = true;

-- GIN インデックス（JSONB 用）
CREATE INDEX idx_metadata ON posts USING gin (metadata);

-- 全文検索用インデックス
CREATE INDEX idx_posts_fts ON posts USING gin (to_tsvector('english', title || ' ' || content));
```

### クエリプランの確認

```sql
-- EXPLAIN ANALYZE で実行計画を確認
EXPLAIN ANALYZE
SELECT * FROM posts
WHERE user_id = '...'
ORDER BY created_at DESC
LIMIT 10;
```

### 遅いクエリの特定

```sql
-- pg_stat_statements から遅いクエリを特定
SELECT
  query,
  calls,
  mean_exec_time,
  total_exec_time,
  rows
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 20;
```

### よくある最適化

- `SELECT *` を避け、必要なカラムのみ取得する
- ページネーションには `LIMIT` / `OFFSET` よりカーソルベースを推奨
- N+1 クエリを避ける（supabase-js の `.select('*, comments(*)')` を活用）
- 不要な RLS ポリシーの `SELECT` サブクエリを最小化する

```typescript
// 悪い例: N+1 クエリ
const { data: posts } = await supabase.from('posts').select('*')
for (const post of posts) {
  const { data: comments } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', post.id)
}

// 良い例: JOIN で一括取得
const { data: posts } = await supabase
  .from('posts')
  .select('*, comments(*)')
```

## 負荷テスト

### k6 を使用した負荷テスト

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },   // ramp up
    { duration: '1m', target: 20 },    // stay
    { duration: '10s', target: 0 },    // ramp down
  ],
};

const SUPABASE_URL = __ENV.SUPABASE_URL;
const SUPABASE_ANON_KEY = __ENV.SUPABASE_ANON_KEY;

export default function () {
  const res = http.get(
    `${SUPABASE_URL}/rest/v1/posts?select=*&limit=10`,
    {
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
    }
  );
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  sleep(1);
}
```

```bash
# 実行
k6 run -e SUPABASE_URL=https://<ref>.supabase.co -e SUPABASE_ANON_KEY=<key> load-test.js
```

### 負荷テストの注意事項

- ステージング環境でテストする
- Free プランでは rate limit がある
- 段階的に負荷を上げる
- テスト後にメトリクスを確認してボトルネックを特定する

## その他のベストプラクティス

- **キャッシュ**: 頻繁にアクセスされるデータはアプリケーション側でキャッシュする
- **バッチ処理**: 大量の INSERT/UPDATE はバッチで実行する
- **VACUUM**: 自動 VACUUM が適切に動作しているか確認する
- **統計情報**: `ANALYZE` を実行して統計情報を最新に保つ
- **リードレプリカ**: 読み取りワークロードを分散する

## 関連

- [クエリ最適化](../database/query-optimization.md) — インデックス・EXPLAIN
- [接続管理](../database/connections.md) — 接続プーリング
- [コンピュートとディスク](./compute-and-disk.md) — コンピュートサイズ
