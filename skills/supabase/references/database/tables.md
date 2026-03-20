# テーブル操作

PostgreSQL テーブルの作成・管理・型・制約の設定方法。

## 概要

Supabase は PostgreSQL をフルに活用し、テーブルはダッシュボードの Table Editor または SQL で作成・管理できる。カラム型、主キー、外部キー、制約、デフォルト値などを設定可能。

## コード例

```sql
-- テーブル作成
create table public.todos (
  id bigint generated always as identity primary key,
  title text not null,
  is_complete boolean default false,
  user_id uuid references auth.users(id) on delete cascade,
  inserted_at timestamptz default now()
);

-- RLS を有効化
alter table public.todos enable row level security;

-- テーブルにコメント追加
comment on table public.todos is 'タスク管理テーブル';

-- カラム追加
alter table public.todos add column description text;

-- カラム型変更
alter table public.todos alter column title type varchar(255);

-- テーブル削除
drop table if exists public.todos;
```

```typescript
// supabase-js でのテーブル操作
const { data, error } = await supabase
  .from('todos')
  .select('*')
  .eq('is_complete', false)
  .order('inserted_at', { ascending: false });
```

## 主要なカラム型

| PostgreSQL 型 | 説明 | 用途例 |
|--------------|------|--------|
| `int2`, `int4`, `int8` | 整数（2/4/8バイト） | カウンター、ID |
| `float4`, `float8` | 浮動小数点 | 計算値 |
| `numeric` | 任意精度数値 | 金額 |
| `text` | 可変長文字列 | テキスト |
| `varchar(n)` | 長さ制限付き文字列 | 名前等 |
| `bool` | 真偽値 | フラグ |
| `uuid` | UUID | 主キー、外部キー |
| `timestamptz` | タイムゾーン付きタイムスタンプ | 日時 |
| `date` | 日付 | 誕生日等 |
| `jsonb` | バイナリ JSON | 構造化データ |
| `text[]` | テキスト配列 | タグ等 |

## 注意点

- テーブルは `public` スキーマに作成すると Data API 経由で自動公開される
- `auth` や `storage` スキーマのテーブルは Supabase 内部で使用されるため直接変更しない
- RLS はテーブル作成後に必ず有効化すること（`alter table ... enable row level security`）
- `bigint generated always as identity` を主キーに使うのが推奨パターン
- 外部キーには `on delete cascade` や `on delete set null` を適切に設定する

## 関連

- [./secure-data.md](./secure-data.md) — Row Level Security
- [./functions.md](./functions.md) — Database Functions
- [./json.md](./json.md) — JSON カラム操作
- [./arrays.md](./arrays.md) — 配列型操作
