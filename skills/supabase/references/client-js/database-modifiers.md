# Database Modifiers

クエリ結果の形式やソート、件数制限を制御するモディファイアメソッド群。

## メソッド一覧

### `select()`

返すカラムを指定する。`insert()`, `update()`, `upsert()`, `delete()` の後にチェーンして使用する。

**Signature:**
```typescript
.select(columns?: string): PostgrestFilterBuilder
```

**Usage:**
```typescript
// insert 後に結果を取得
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'John', email: 'john@example.com' })
  .select()

// 特定カラムのみ
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Updated' })
  .eq('id', 1)
  .select('id, name')

// リレーション込み
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'John' })
  .select('id, name, profile:profiles(avatar_url)')
```

**Parameters:**
- `columns` (string) — 取得するカラム（デフォルト: `'*'`）

**Returns:** `PostgrestFilterBuilder`

---

### `order()`

結果をソートする。

**Signature:**
```typescript
.order(column: string, options?: {
  ascending?: boolean;
  nullsFirst?: boolean;
  foreignTable?: string;
  referencedTable?: string;
}): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 昇順（デフォルト）
const { data, error } = await supabase
  .from('users')
  .select()
  .order('created_at', { ascending: true })

// 降順
const { data, error } = await supabase
  .from('users')
  .select()
  .order('created_at', { ascending: false })

// 複数ソート
const { data, error } = await supabase
  .from('users')
  .select()
  .order('status', { ascending: true })
  .order('created_at', { ascending: false })

// NULL の順序
const { data, error } = await supabase
  .from('users')
  .select()
  .order('name', { nullsFirst: false })

// 外部テーブルのソート
const { data, error } = await supabase
  .from('users')
  .select('*, posts(*)')
  .order('created_at', { referencedTable: 'posts', ascending: false })
```

**Parameters:**
- `column` (string) — ソートするカラム名
- `options.ascending` (boolean) — 昇順（デフォルト: true）
- `options.nullsFirst` (boolean) — NULL を先頭にするか（デフォルト: ascending が true なら true）
- `options.referencedTable` (string) — 外部テーブル名（省略可）

**Returns:** `PostgrestFilterBuilder`

---

### `limit()`

取得件数を制限する。

**Signature:**
```typescript
.limit(count: number, options?: { foreignTable?: string; referencedTable?: string }): PostgrestFilterBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .limit(10)

// 外部テーブルの件数制限
const { data, error } = await supabase
  .from('users')
  .select('*, posts(*)')
  .limit(5, { referencedTable: 'posts' })
```

**Parameters:**
- `count` (number) — 取得する最大件数
- `options.referencedTable` (string) — 外部テーブル名（省略可）

**Returns:** `PostgrestFilterBuilder`

---

### `range()`

取得する行の範囲を指定する（ページネーション用）。

**Signature:**
```typescript
.range(from: number, to: number, options?: { foreignTable?: string; referencedTable?: string }): PostgrestFilterBuilder
```

**Usage:**
```typescript
// 0-9 番目の行（10件）
const { data, error } = await supabase
  .from('users')
  .select()
  .range(0, 9)

// 10-19 番目の行（次の10件）
const { data, error } = await supabase
  .from('users')
  .select()
  .range(10, 19)
```

**Parameters:**
- `from` (number) — 開始インデックス（0 始まり、含む）
- `to` (number) — 終了インデックス（含む）
- `options.referencedTable` (string) — 外部テーブル名（省略可）

**Returns:** `PostgrestFilterBuilder`

---

### `single()`

結果を 1 件のオブジェクトとして返す。0 件または 2 件以上の場合はエラーになる。

**Signature:**
```typescript
.single(): PostgrestBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .eq('id', 1)
  .single()

// data の型: { id: number, name: string, ... } （配列ではない）
```

**Parameters:** なし

**Returns:** `{ data: T | null, error }` — 配列ではなく単一オブジェクト

---

### `maybeSingle()`

結果を 0 件または 1 件のオブジェクトとして返す。0 件の場合は null を返し、2 件以上の場合はエラーになる。

**Signature:**
```typescript
.maybeSingle(): PostgrestBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .eq('email', 'user@example.com')
  .maybeSingle()

// data は null または単一オブジェクト
```

**Parameters:** なし

**Returns:** `{ data: T | null, error }` — 0 件の場合 data は null（エラーにならない）

---

### `csv()`

結果を CSV 形式の文字列で返す。

**Signature:**
```typescript
.csv(): PostgrestBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .csv()

// data は CSV 形式の文字列
```

**Parameters:** なし

**Returns:** `{ data: string, error }`

---

### `abortSignal()`

リクエストにキャンセル用の AbortSignal を設定する。

**Signature:**
```typescript
.abortSignal(signal: AbortSignal): PostgrestBuilder
```

**Usage:**
```typescript
const controller = new AbortController()

const { data, error } = await supabase
  .from('users')
  .select()
  .abortSignal(controller.signal)

// リクエストをキャンセル
controller.abort()
```

**Parameters:**
- `signal` (AbortSignal) — AbortController のシグナル

**Returns:** `PostgrestBuilder`

---

### `explain()`

クエリの実行プランを取得する（デバッグ用）。

**Signature:**
```typescript
.explain(options?: {
  analyze?: boolean;
  verbose?: boolean;
  settings?: boolean;
  buffers?: boolean;
  wal?: boolean;
  format?: 'json' | 'text';
}): PostgrestBuilder
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select()
  .eq('status', 'active')
  .explain({ analyze: true, verbose: true, format: 'json' })
```

**Parameters:**
- `options.analyze` (boolean) — 実際にクエリを実行して統計を取得するか（デフォルト: false）
- `options.verbose` (boolean) — 詳細情報を含めるか（デフォルト: false）
- `options.settings` (boolean) — 設定情報を含めるか（デフォルト: false）
- `options.buffers` (boolean) — バッファ使用情報を含めるか（デフォルト: false）
- `options.wal` (boolean) — WAL 情報を含めるか（デフォルト: false）
- `options.format` (string) — 出力フォーマット（`'json'` / `'text'`。デフォルト: `'text'`）

**Returns:** `{ data: string, error }`

---

### `returns<T>()`

戻り値の型を上書きする。

**Signature:**
```typescript
.returns<T>(): PostgrestBuilder<T>
```

**Usage:**
```typescript
interface CustomUser {
  id: number
  full_name: string
}

const { data, error } = await supabase
  .from('users')
  .select('id, first_name || last_name as full_name')
  .returns<CustomUser[]>()
```

**Parameters:** なし（型パラメータのみ）

**Returns:** `PostgrestBuilder<T>`

---

### `overrideTypes<T>()`

型の上書き。`returns<T>()` と類似するが、より厳密な型制御が可能。

**Signature:**
```typescript
.overrideTypes<NewResult, Options>(): PostgrestBuilder<NewResult>
```

**Usage:**
```typescript
const { data, error } = await supabase
  .from('users')
  .select('id, name')
  .overrideTypes<{ id: number; name: string }[], { merge: true }>()
```

**Parameters:** なし（型パラメータのみ）

**Returns:** `PostgrestBuilder<NewResult>`

---

## 注意点
- `single()` は結果が 0 件または 2 件以上の場合にエラーを返す。結果が不確定な場合は `maybeSingle()` を使用する
- `range()` はインデックスが含む-含む（inclusive-inclusive）
- `order()` は複数回チェーンして多段ソートが可能
- `limit()` と `range()` は外部テーブルにも適用可能（`referencedTable` オプション）
- `explain()` はデバッグ/パフォーマンス分析用。本番環境での常用は避ける
- `returns<T>()` は型安全性をバイパスするため、正しい型を指定する責任がユーザーにある

## 関連
- [Database CRUD](./database-crud.md)
- [Database Filters](./database-filters.md)
