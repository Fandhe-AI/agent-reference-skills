# 接続管理

Supavisor、Serverless Drivers、直接接続による PostgreSQL 接続管理。

## 概要

Supabase は PostgreSQL への接続に複数の方法を提供する。用途に応じて適切な接続方法を選択する。

## 接続方式

### 1. Data API（推奨）

supabase-js 経由の HTTP ベース接続。コネクションプールの管理が不要。

```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### 2. Supavisor（接続プーラー）

PostgreSQL クライアントから接続する場合に使用。Transaction モードと Session モードを提供。

```
# Transaction モード（ポート 6543）— サーバーレス環境向け
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres

# Session モード（ポート 5432）— Prepared Statement 使用時
postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
```

### 3. 直接接続（ポート 5432）

```
postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

### 4. Serverless Drivers（Edge 環境向け）

```typescript
// @supabase/supabase-js は内部で HTTP を使用するため追加設定不要
// Drizzle や Prisma などの ORM は接続文字列を使用
```

## 接続方式の選択

| 方式 | ユースケース | 環境 |
|------|-------------|------|
| Data API | 一般的なアプリ | すべて |
| Supavisor (Transaction) | ORM、サーバーレス | Vercel, Cloudflare Workers |
| Supavisor (Session) | Prepared Statement | 長時間接続 |
| 直接接続 | マイグレーション、管理 | サーバー環境 |

## 注意点

- サーバーレス環境（Vercel, Cloudflare）では必ず Supavisor を使う
- Transaction モードでは Prepared Statement、LISTEN/NOTIFY、SET は使えない
- `connection_limit` はプランによって異なる（Free: 60、Pro: 200〜）
- IPv4 アドレスは Pro プラン以上で利用可能
- SSL はデフォルトで有効

## 関連

- [./orms.md](./orms.md) — ORM 連携
- [./query-optimization.md](./query-optimization.md) — パフォーマンス
