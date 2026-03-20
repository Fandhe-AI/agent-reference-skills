# Database CRUD

データベースの CRUD 操作メソッド群。PostgREST を通じてテーブル操作を行う。

## メソッド一覧

### `select()`

テーブルからデータを取得する（SELECT）。

**Signature:**
```typescript
supabase.from(table: string).select(
  columns?: string,
  options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }
): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 全カラム取得
const { data, error } = await supabase.from('users').select('*')

// 特定カラムのみ
const { data, error } = await supabase.from('users').select('id, name, email')

// リレーション（外部キー結合）
const { data, error } = await supabase.from('posts').select(`
  id,
  title,
  author:users(id, name),
  comments(id, body, user:users(name))
`)

// カウント取得
const { count, error } = await supabase
  .from('users')
  .select('*', { count: 'exact', head: true })

// 内部結合（!inner）
const { data, error } = await supabase
  .from('users')
  .select('*, posts!inner(title)')
  .eq('posts.status', 'published')

// スプレッド構文でフラット化
const { data, error } = await supabase
  .from('users')
  .select('id, ...profiles(avatar_url, bio)')
```

**Parameters:**
- `columns` (string) — 取得するカラム（デフォルト: `'*'`）
- `options.count` (string) — カウントモード。`'exact'`（正確）/ `'planned'`（推定、高速）/ `'estimated'`（推定）
- `options.head` (boolean) — `true` の場合データを返さずカウントのみ取得

**Returns:** `{ data: T[] | null, error, count?, status, statusText }`

---

### `insert()`

テーブルにデータを挿入する（INSERT）。

**Signature:**
```typescript
supabase.from(table: string).insert(
  values: object | object[],
  options?: { count?: 'exact' | 'planned' | 'estimated'; defaultToNull?: boolean }
): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 1件挿入
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'John', email: 'john@example.com' })
  .select()

// 複数件挿入
const { data, error } = await supabase
  .from('users')
  .insert([
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' },
  ])
  .select()
```

**Parameters:**
- `values` (object | object[]) — 挿入するデータ（単一オブジェクトまたは配列）
- `options.count` (string) — カウントモード（省略可）
- `options.defaultToNull` (boolean) — 未指定カラムを null にするか（デフォルト: true）

**Returns:** `{ data, error, count?, status, statusText }` — `.select()` をチェーンしないと data は null

---

### `update()`

テーブルのデータを更新する（UPDATE）。フィルタ必須。

**Signature:**
```typescript
supabase.from(table: string).update(
  values: object,
  options?: { count?: 'exact' | 'planned' | 'estimated' }
): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Updated Name' })
  .eq('id', 1)
  .select()

// 複数カラム更新
const { data, error } = await supabase
  .from('users')
  .update({
    name: 'Updated Name',
    email: 'updated@example.com',
    updated_at: new Date().toISOString(),
  })
  .eq('id', 1)
  .select()
```

**Parameters:**
- `values` (object) — 更新するデータ
- `options.count` (string) — カウントモード（省略可）

**Returns:** `{ data, error, count?, status, statusText }` — `.select()` をチェーンしないと data は null

---

### `upsert()`

データを挿入し、競合する場合は更新する（UPSERT）。

**Signature:**
```typescript
supabase.from(table: string).upsert(
  values: object | object[],
  options?: {
    onConflict?: string;
    ignoreDuplicates?: boolean;
    count?: 'exact' | 'planned' | 'estimated';
    defaultToNull?: boolean;
  }
): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 基本的な upsert
const { data, error } = await supabase
  .from('users')
  .upsert({ id: 1, name: 'John', email: 'john@example.com' })
  .select()

// 競合カラム指定
const { data, error } = await supabase
  .from('users')
  .upsert(
    { email: 'john@example.com', name: 'John Updated' },
    { onConflict: 'email' }
  )
  .select()

// 重複を無視
const { data, error } = await supabase
  .from('users')
  .upsert(
    [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
    ],
    { ignoreDuplicates: true }
  )
  .select()
```

**Parameters:**
- `values` (object | object[]) — 挿入/更新するデータ
- `options.onConflict` (string) — 競合判定に使用するカラム名（カンマ区切り。省略可）
- `options.ignoreDuplicates` (boolean) — 重複を無視するか（デフォルト: false）
- `options.count` (string) — カウントモード（省略可）
- `options.defaultToNull` (boolean) — 未指定カラムを null にするか（デフォルト: true）

**Returns:** `{ data, error, count?, status, statusText }`

---

### `delete()`

テーブルからデータを削除する（DELETE）。フィルタ必須。

**Signature:**
```typescript
supabase.from(table: string).delete(
  options?: { count?: 'exact' | 'planned' | 'estimated' }
): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { error } = await supabase
  .from('users')
  .delete()
  .eq('id', 1)

// 削除したデータを取得
const { data, error } = await supabase
  .from('users')
  .delete()
  .eq('status', 'inactive')
  .select()
```

**Parameters:**
- `options.count` (string) — カウントモード（省略可）

**Returns:** `{ data, error, count?, status, statusText }`

---

### `rpc()`

データベース関数 (RPC) を呼び出す。

**Signature:**
```typescript
supabase.rpc(
  fn: string,
  args?: object,
  options?: { count?: 'exact' | 'planned' | 'estimated'; head?: boolean }
): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 引数なし
const { data, error } = await supabase.rpc('get_status')

// 引数あり
const { data, error } = await supabase.rpc('search_users', {
  search_term: 'john',
  limit_count: 10,
})

// テーブルを返す関数にフィルタ適用
const { data, error } = await supabase
  .rpc('get_active_users')
  .eq('role', 'admin')
  .order('created_at', { ascending: false })
  .limit(10)
```

**Parameters:**
- `fn` (string) — データベース関数名
- `args` (object) — 関数の引数（省略可）
- `options.count` (string) — カウントモード（省略可）
- `options.head` (boolean) — データを返さずカウントのみ取得（省略可）

**Returns:** `{ data, error, count?, status, statusText }` — 戻り値の型は関数の定義に依存

---

## 注意点
- `update()` と `delete()` にはフィルタが必須。フィルタなしだと全行が対象になる
- `insert()` / `update()` / `upsert()` / `delete()` で挿入/更新/削除したデータを取得するには `.select()` をチェーンする
- RLS（Row Level Security）が有効な場合、ユーザーの権限に基づいてアクセスが制限される
- `.select()` のリレーション構文では外部キーが必要
- `!inner` を使うと INNER JOIN になり、関連データがない行は除外される
- バッチ insert は 1 回のリクエストで効率的に処理される

## 関連
- [Database Filters](./database-filters.md)
- [Database Modifiers](./database-modifiers.md)
- [Initialization](./initialization.md)
