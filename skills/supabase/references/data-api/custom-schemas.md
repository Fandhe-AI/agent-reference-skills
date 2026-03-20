# カスタムスキーマ

public 以外の PostgreSQL スキーマを Data API（PostgREST）に公開する方法と設定。

## 概要

Supabase の Data API はデフォルトで `public` スキーマのみを公開する。アプリケーションの要件に応じて、カスタムスキーマ（例: `api`, `v1`, `private`）を作成し、それを API に公開することができる。これにより、内部テーブルと API 公開テーブルの分離や、API バージョニングが可能になる。

### Exposed Schemas 設定

ダッシュボードの「Settings > API > Exposed Schemas」で、API に公開するスキーマを設定する。複数のスキーマを同時に公開可能。

### カスタムスキーマの利点

- **関心の分離**: 内部テーブル（`private` スキーマ）と API 公開テーブル（`api` スキーマ）を分離
- **API バージョニング**: `v1`, `v2` スキーマで API バージョンを管理
- **セキュリティ**: 公開すべきでないテーブルを別スキーマに配置して非公開にする
- **マイクロサービス境界**: 機能ごとにスキーマを分割

### API でのスキーマ指定

PostgREST は `Accept-Profile`（GET）または `Content-Profile`（POST/PATCH/DELETE）ヘッダーでスキーマを指定する。

## コード例

```sql
-- カスタムスキーマの作成
create schema if not exists api;

-- スキーマに対するロール権限の付与
-- anon ロールと authenticated ロールにスキーマの使用権限を付与
grant usage on schema api to anon, authenticated;

-- テーブルの作成（カスタムスキーマ内）
create table api.products (
  id bigserial primary key,
  name text not null,
  price numeric not null,
  created_at timestamptz default now()
);

-- テーブルに対する権限付与
grant select on api.products to anon;
grant all on api.products to authenticated;

-- シーケンスの権限も付与（INSERT で自動採番するため）
grant usage, select on all sequences in schema api to anon, authenticated;

-- デフォルト権限の設定（今後作成するテーブルにも適用）
alter default privileges in schema api
  grant select on tables to anon;

alter default privileges in schema api
  grant all on tables to authenticated;

alter default privileges in schema api
  grant usage, select on sequences to authenticated;

-- RLS の有効化
alter table api.products enable row level security;

create policy "Anyone can read products"
  on api.products for select
  using (true);

create policy "Authenticated users can insert products"
  on api.products for insert
  to authenticated
  with check (true);
```

```sql
-- ビューを使ったスキーマ間のデータ公開
-- 内部テーブル
create schema if not exists internal;

create table internal.orders (
  id bigserial primary key,
  user_id uuid references auth.users(id),
  product_id bigint,
  quantity int,
  total_amount numeric,
  internal_notes text,  -- API に公開したくないカラム
  created_at timestamptz default now()
);

-- API 用ビュー（内部カラムを除外）
create view api.orders as
select id, user_id, product_id, quantity, total_amount, created_at
from internal.orders;

grant select on api.orders to authenticated;
```

```typescript
// === supabase-js でのカスタムスキーマアクセス ===
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'api',  // デフォルトスキーマを 'api' に設定
    },
  }
);

// 'api' スキーマのテーブルにアクセス
const { data } = await supabase
  .from('products')
  .select('*');

// 別のスキーマに一時的にアクセスする場合
const supabasePublic = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
  {
    db: {
      schema: 'public',
    },
  }
);
```

```bash
# === cURL でのスキーマ指定 ===

# GET リクエスト（Accept-Profile ヘッダー）
curl 'https://<REF>.supabase.co/rest/v1/products?select=*' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Accept-Profile: api"

# POST リクエスト（Content-Profile ヘッダー）
curl -X POST 'https://<REF>.supabase.co/rest/v1/products' \
  -H "apikey: <ANON_KEY>" \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Profile: api" \
  -H "Content-Type: application/json" \
  -d '{"name": "Widget", "price": 9.99}'
```

## 注意点

- カスタムスキーマを API に公開するには、ダッシュボードの「Settings > API > Exposed Schemas」に追加する必要がある
- `grant usage on schema` だけではテーブルにアクセスできない。テーブル単位の `grant select/insert/update/delete` も必要
- スキーマを公開すると、そのスキーマ内のすべてのテーブル・ビュー・関数が API に公開される。RLS で保護すること
- `auth` スキーマや `storage` スキーマは Supabase 内部で使用されるため、Exposed Schemas に追加しない
- supabase-js ではクライアント作成時に `db.schema` を指定する。同じアプリで複数スキーマを使う場合、スキーマごとにクライアントを作成する
- カスタムスキーマの変更後、PostgREST のスキーマキャッシュが更新されるまで数秒かかることがある
- `extensions` スキーマは Exposed Schemas に含めない（セキュリティリスク）

## 関連

- [Data API 概要](./overview.md)
- [REST API](./rest.md)
- [API 堅牢化](./hardening.md)
