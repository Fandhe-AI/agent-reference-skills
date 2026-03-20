# Database Filters

クエリにフィルタ条件を追加するメソッド群。`select()`, `update()`, `delete()` 等にチェーンして使用する。

## メソッド一覧

### `eq()`

カラムの値が指定値と等しい行をフィルタする。

**Signature:**
```typescript
.eq(column: string, value: NonNullPrimitive): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .eq('status', 'active')
```

**Parameters:**
- `column` (string) — カラム名
- `value` (NonNullPrimitive) — 比較する値

**Returns:** `PostgrestFilterBuilder`（チェーン可能）

---

### `neq()`

カラムの値が指定値と等しくない行をフィルタする。

**Signature:**
```typescript
.neq(column: string, value: NonNullPrimitive): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .neq('status', 'deleted')
```

**Parameters:**
- `column` (string) — カラム名
- `value` (NonNullPrimitive) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `gt()`

カラムの値が指定値より大きい行をフィルタする。

**Signature:**
```typescript
.gt(column: string, value: NonNullPrimitive): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('products')
  .select()
  .gt('price', 100)
```

**Parameters:**
- `column` (string) — カラム名
- `value` (NonNullPrimitive) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `gte()`

カラムの値が指定値以上の行をフィルタする。

**Signature:**
```typescript
.gte(column: string, value: NonNullPrimitive): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('products')
  .select()
  .gte('stock', 1)
```

**Parameters:**
- `column` (string) — カラム名
- `value` (NonNullPrimitive) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `lt()`

カラムの値が指定値より小さい行をフィルタする。

**Signature:**
```typescript
.lt(column: string, value: NonNullPrimitive): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('products')
  .select()
  .lt('price', 50)
```

**Parameters:**
- `column` (string) — カラム名
- `value` (NonNullPrimitive) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `lte()`

カラムの値が指定値以下の行をフィルタする。

**Signature:**
```typescript
.lte(column: string, value: NonNullPrimitive): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('orders')
  .select()
  .lte('total', 1000)
```

**Parameters:**
- `column` (string) — カラム名
- `value` (NonNullPrimitive) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `like()`

LIKE パターンマッチでフィルタする（大文字小文字区別あり）。

**Signature:**
```typescript
.like(column: string, pattern: string): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .like('name', '%John%')
```

**Parameters:**
- `column` (string) — カラム名
- `pattern` (string) — LIKE パターン（`%` は任意の文字列、`_` は任意の 1 文字）

**Returns:** `PostgrestFilterBuilder`

---

### `ilike()`

ILIKE パターンマッチでフィルタする（大文字小文字区別なし）。

**Signature:**
```typescript
.ilike(column: string, pattern: string): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .ilike('email', '%@example.com')
```

**Parameters:**
- `column` (string) — カラム名
- `pattern` (string) — ILIKE パターン

**Returns:** `PostgrestFilterBuilder`

---

### `is()`

カラムの値が null, true, false のいずれかであるかチェックする。

**Signature:**
```typescript
.is(column: string, value: null | boolean): PostgrestFilterBuilder
```

**Usage:**
```typescript
// null チェック
const { data, error } = await supabase
  .from('users')
  .select()
  .is('deleted_at', null)

// boolean チェック
const { data, error } = await supabase
  .from('users')
  .select()
  .is('is_admin', true)
```

**Parameters:**
- `column` (string) — カラム名
- `value` (null | boolean) — `null`, `true`, または `false`

**Returns:** `PostgrestFilterBuilder`

---

### `in()`

カラムの値が指定した配列内のいずれかに一致する行をフィルタする。

**Signature:**
```typescript
.in(column: string, values: NonNullPrimitive[]): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .in('status', ['active', 'pending'])

const { data, error } = await supabase
  .from('users')
  .select()
  .in('id', [1, 2, 3])
```

**Parameters:**
- `column` (string) — カラム名
- `values` (NonNullPrimitive[]) — 値の配列

**Returns:** `PostgrestFilterBuilder`

---

### `contains()`

配列/JSON/範囲カラムが指定した値を含むかチェックする（`@>` 演算子）。

**Signature:**
```typescript
.contains(column: string, value: string | object | any[]): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 配列カラム
const { data, error } = await supabase
  .from('users')
  .select()
  .contains('tags', ['admin', 'editor'])

// JSON カラム
const { data, error } = await supabase
  .from('users')
  .select()
  .contains('metadata', { role: 'admin' })

// 範囲型
const { data, error } = await supabase
  .from('events')
  .select()
  .contains('schedule', '[2024-01-01, 2024-01-31]')
```

**Parameters:**
- `column` (string) — カラム名
- `value` (string | object | any[]) — 含まれるべき値

**Returns:** `PostgrestFilterBuilder`

---

### `containedBy()`

配列/JSON/範囲カラムの値が指定した値に含まれるかチェックする（`<@` 演算子）。

**Signature:**
```typescript
.containedBy(column: string, value: string | object | any[]): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .containedBy('tags', ['admin', 'editor', 'viewer'])
```

**Parameters:**
- `column` (string) — カラム名
- `value` (string | object | any[]) — 含む側の値

**Returns:** `PostgrestFilterBuilder`

---

### `overlaps()`

配列/範囲カラムが指定した値と重なるかチェックする（`&&` 演算子）。

**Signature:**
```typescript
.overlaps(column: string, value: string | any[]): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .overlaps('tags', ['admin', 'editor'])
```

**Parameters:**
- `column` (string) — カラム名
- `value` (string | any[]) — 重なりを確認する値

**Returns:** `PostgrestFilterBuilder`

---

### `match()`

複数カラムの値が一致する行をフィルタする（AND 条件）。

**Signature:**
```typescript
.match(query: Record<string, NonNullPrimitive>): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .match({ status: 'active', role: 'admin' })
```

**Parameters:**
- `query` (Record<string, NonNullPrimitive>) — カラム名と値のペア

**Returns:** `PostgrestFilterBuilder`

---

### `not()`

フィルタ条件の否定。

**Signature:**
```typescript
.not(column: string, operator: string, value: any): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .not('status', 'eq', 'deleted')

const { data, error } = await supabase
  .from('users')
  .select()
  .not('status', 'in', '("deleted","banned")')
```

**Parameters:**
- `column` (string) — カラム名
- `operator` (string) — フィルタ演算子（`'eq'`, `'neq'`, `'in'`, `'is'` 等）
- `value` (any) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `or()`

OR 条件でフィルタする。

**Signature:**
```typescript
.or(filters: string, options?: { foreignTable?: string; referencedTable?: string }): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .or('status.eq.active,role.eq.admin')

// 外部テーブルに対する OR
const { data, error } = await supabase
  .from('users')
  .select('*, posts(*)')
  .or('title.ilike.%supabase%,body.ilike.%supabase%', { referencedTable: 'posts' })
```

**Parameters:**
- `filters` (string) — フィルタ条件（PostgREST フォーマット。カンマ区切り）
- `options.referencedTable` (string) — 外部テーブル名（省略可）

**Returns:** `PostgrestFilterBuilder`

---

### `filter()`

汎用フィルタメソッド。任意の PostgREST 演算子を使用できる。

**Signature:**
```typescript
.filter(column: string, operator: string, value: any): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .filter('name', 'eq', 'John')

// JSON パスフィルタ
const { data, error } = await supabase
  .from('users')
  .select()
  .filter('metadata->role', 'eq', 'admin')
```

**Parameters:**
- `column` (string) — カラム名（JSON パス表記可）
- `operator` (string) — PostgREST 演算子
- `value` (any) — 比較する値

**Returns:** `PostgrestFilterBuilder`

---

### `textSearch()`

全文検索フィルタ。PostgreSQL の全文検索機能を利用する。

**Signature:**
```typescript
.textSearch(column: string, query: string, options?: { type?: 'plain' | 'phrase' | 'websearch'; config?: string }): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 基本的な全文検索
const { data, error } = await supabase
  .from('posts')
  .select()
  .textSearch('title', 'supabase & database')

// フレーズ検索
const { data, error } = await supabase
  .from('posts')
  .select()
  .textSearch('title', 'supabase database', { type: 'phrase' })

// Web 検索構文
const { data, error } = await supabase
  .from('posts')
  .select()
  .textSearch('title', '"supabase" -firebase', { type: 'websearch' })

// 言語設定
const { data, error } = await supabase
  .from('posts')
  .select()
  .textSearch('title', 'データベース', { config: 'japanese' })
```

**Parameters:**
- `column` (string) — 全文検索対象のカラム名
- `query` (string) — 検索クエリ
- `options.type` (string) — 検索タイプ。`'plain'`（デフォルト）/ `'phrase'` / `'websearch'`
- `options.config` (string) — テキスト検索設定（言語。例: `'english'`, `'japanese'`）

**Returns:** `PostgrestFilterBuilder`

---

### 範囲型フィルタ

PostgreSQL の範囲型カラムに対するフィルタ。

#### `rangeGt()`

**Signature:**
```typescript
.rangeGt(column: string, range: string): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('events')
  .select()
  .rangeGt('schedule', '[2024-01-01, 2024-01-31]')
```

#### `rangeGte()`

```typescript
.rangeGte(column: string, range: string): PostgrestFilterBuilder
```

#### `rangeLt()`

```typescript
.rangeLt(column: string, range: string): PostgrestFilterBuilder
```

#### `rangeLte()`

```typescript
.rangeLte(column: string, range: string): PostgrestFilterBuilder
```

#### `rangeAdjacent()`

```typescript
.rangeAdjacent(column: string, range: string): PostgrestFilterBuilder
```

**Parameters:**（共通）
- `column` (string) — 範囲型カラム名
- `range` (string) — 比較する範囲（PostgreSQL 範囲リテラル形式）

**Returns:** `PostgrestFilterBuilder`

---

## 注意点
- フィルタは AND 条件で結合される。OR 条件には `.or()` を使用する
- `is()` は null / true / false の比較にのみ使用する。他の値には `eq()` を使う
- `like()` / `ilike()` のパターンでは `%` がワイルドカード
- `textSearch()` を使用するには、対象カラムに GIN インデックスを作成することを推奨
- JSON カラムのフィルタには `filter()` で `->` や `->>` 表記を使用する
- 外部テーブルに対するフィルタは `referencedTable` オプションで指定する

## 関連
- [Database CRUD](./database-crud.md)
- [Database Modifiers](./database-modifiers.md)
