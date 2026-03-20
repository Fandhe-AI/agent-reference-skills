# Storage Vectors

ベクトルストレージのメソッド群。ベクトルデータのインデックス管理とクエリを行う。

## バケット管理メソッド

### `createBucket()`

ベクトルストレージ用のバケットを作成する。

**Signature:**
```typescript
supabase.storageVectors.createBucket(id: string, options?: BucketOptions): Promise<{ data: { name: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storageVectors.createBucket('embeddings')
```

**Parameters:**
- `id` (string) — バケット名（一意）
- `options` (BucketOptions) — バケット設定（省略可）

**Returns:** `{ data: { name }, error }`

---

### `deleteBucket()`

ベクトルバケットを削除する。

**Signature:**
```typescript
supabase.storageVectors.deleteBucket(id: string): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.storageVectors.deleteBucket('embeddings')
```

**Parameters:**
- `id` (string) — バケット名

**Returns:** `{ data: { message }, error }`

---

### `getBucket()`

ベクトルバケットの情報を取得する。

**Signature:**
```typescript
supabase.storageVectors.getBucket(id: string): Promise<{ data: Bucket, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storageVectors.getBucket('embeddings')
```

**Parameters:**
- `id` (string) — バケット名

**Returns:** `{ data: Bucket, error }`

---

### `listBuckets()`

ベクトルバケット一覧を取得する。

**Signature:**
```typescript
supabase.storageVectors.listBuckets(): Promise<{ data: Bucket[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storageVectors.listBuckets()
```

**Parameters:** なし

**Returns:** `{ data: Bucket[], error }`

---

### `from()`

特定のベクトルバケットを指定してインデックス操作を行う。

**Signature:**
```typescript
supabase.storageVectors.from(bucket: string): VectorBucket
```

**Usage:**
```typescript
const vectorBucket = supabase.storageVectors.from('embeddings')
```

**Parameters:**
- `bucket` (string) — バケット名

**Returns:** `VectorBucket` — ベクトルインデックス操作メソッドを持つオブジェクト

---

## VectorBucket メソッド

`supabase.storageVectors.from(bucket)` で取得したオブジェクトのメソッド。

### `createIndex()`

ベクトルインデックスを作成する。

**Signature:**
```typescript
vectorBucket.createIndex(name: string, options: {
  dimensions: number;
  distance_metric?: 'cosine' | 'euclidean' | 'dot_product';
  metadata_schema?: Record<string, string>;
}): Promise<{ data: VectorIndex, error: StorageError | null }>
```

**Usage:**
```typescript
const vectorBucket = supabase.storageVectors.from('embeddings')

const { data, error } = await vectorBucket.createIndex('documents', {
  dimensions: 1536,
  distance_metric: 'cosine',
  metadata_schema: {
    title: 'string',
    category: 'string',
    page_number: 'number',
  },
})
```

**Parameters:**
- `name` (string) — インデックス名
- `options.dimensions` (number) — ベクトルの次元数
- `options.distance_metric` (string) — 距離メトリクス（`'cosine'` / `'euclidean'` / `'dot_product'`。デフォルト: `'cosine'`）
- `options.metadata_schema` (Record<string, string>) — メタデータスキーマ（省略可）

**Returns:** `{ data: VectorIndex, error }`

---

### `deleteIndex()`

ベクトルインデックスを削除する。

**Signature:**
```typescript
vectorBucket.deleteIndex(name: string): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { error } = await vectorBucket.deleteIndex('documents')
```

**Parameters:**
- `name` (string) — インデックス名

**Returns:** `{ data: { message }, error }`

---

### `getIndex()`

ベクトルインデックスの情報を取得する。

**Signature:**
```typescript
vectorBucket.getIndex(name: string): Promise<{ data: VectorIndex, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await vectorBucket.getIndex('documents')
```

**Parameters:**
- `name` (string) — インデックス名

**Returns:** `{ data: VectorIndex, error }`

---

### `listIndexes()`

バケット内の全ベクトルインデックスを一覧表示する。

**Signature:**
```typescript
vectorBucket.listIndexes(): Promise<{ data: VectorIndex[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await vectorBucket.listIndexes()
```

**Parameters:** なし

**Returns:** `{ data: VectorIndex[], error }`

---

### `index()`

特定のインデックスを指定してベクトル操作を行う。

**Signature:**
```typescript
vectorBucket.index(name: string): VectorIndexOperations
```

**Usage:**
```typescript
const idx = vectorBucket.index('documents')
```

**Parameters:**
- `name` (string) — インデックス名

**Returns:** `VectorIndexOperations` — ベクトル操作メソッドを持つオブジェクト

---

## VectorIndex 操作メソッド

`vectorBucket.index(name)` で取得したオブジェクトのメソッド。

### `putVectors()`

ベクトルデータを追加または更新する。

**Signature:**
```typescript
idx.putVectors(vectors: {
  id: string;
  vector: number[];
  metadata?: Record<string, any>;
}[]): Promise<{ data: { count: number }, error: StorageError | null }>
```

**Usage:**
```typescript
const idx = supabase.storageVectors.from('embeddings').index('documents')

const { data, error } = await idx.putVectors([
  {
    id: 'doc-1',
    vector: [0.1, 0.2, 0.3, /* ... 1536 dimensions */],
    metadata: { title: 'Introduction', category: 'guide' },
  },
  {
    id: 'doc-2',
    vector: [0.4, 0.5, 0.6, /* ... */],
    metadata: { title: 'Advanced Topics', category: 'reference' },
  },
])
```

**Parameters:**
- `vectors` (array) — ベクトルデータの配列
  - `id` (string) — ベクトルの一意な ID
  - `vector` (number[]) — ベクトルデータ（次元数はインデックス作成時に指定した数と一致する必要あり）
  - `metadata` (Record<string, any>) — メタデータ（省略可）

**Returns:** `{ data: { count }, error }`

---

### `getVectors()`

ID でベクトルデータを取得する。

**Signature:**
```typescript
idx.getVectors(ids: string[]): Promise<{ data: VectorRecord[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await idx.getVectors(['doc-1', 'doc-2'])
```

**Parameters:**
- `ids` (string[]) — 取得するベクトルの ID 配列

**Returns:** `{ data: VectorRecord[], error }`

---

### `deleteVectors()`

ベクトルデータを削除する。

**Signature:**
```typescript
idx.deleteVectors(ids: string[]): Promise<{ data: { count: number }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await idx.deleteVectors(['doc-1', 'doc-2'])
```

**Parameters:**
- `ids` (string[]) — 削除するベクトルの ID 配列

**Returns:** `{ data: { count }, error }`

---

### `listVectors()`

インデックス内のベクトル一覧を取得する。

**Signature:**
```typescript
idx.listVectors(options?: {
  limit?: number;
  offset?: number;
}): Promise<{ data: VectorRecord[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await idx.listVectors({
  limit: 100,
  offset: 0,
})
```

**Parameters:**
- `options.limit` (number) — 取得件数上限（省略可）
- `options.offset` (number) — オフセット（省略可）

**Returns:** `{ data: VectorRecord[], error }`

---

### `queryVectors()`

類似ベクトルを検索する。

**Signature:**
```typescript
idx.queryVectors(params: {
  vector: number[];
  top_k?: number;
  filter?: Record<string, any>;
  include_metadata?: boolean;
  include_vectors?: boolean;
}): Promise<{ data: VectorQueryResult[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await idx.queryVectors({
  vector: [0.1, 0.2, 0.3, /* ... query embedding */],
  top_k: 10,
  filter: { category: 'guide' },
  include_metadata: true,
  include_vectors: false,
})

// data: [{ id, score, metadata, vector? }, ...]
```

**Parameters:**
- `vector` (number[]) — クエリベクトル
- `top_k` (number) — 返す結果の数（デフォルト: 10）
- `filter` (Record<string, any>) — メタデータフィルタ（省略可）
- `include_metadata` (boolean) — メタデータを含めるか（デフォルト: true）
- `include_vectors` (boolean) — ベクトルデータを含めるか（デフォルト: false）

**Returns:** `{ data: [{ id, score, metadata?, vector? }], error }`

---

## 注意点
- ベクトルの次元数は `createIndex()` 時に指定した `dimensions` と一致する必要がある
- `distance_metric` はインデックス作成後に変更できない
- `cosine` は正規化されたベクトルに最適、`euclidean` は距離ベースの検索、`dot_product` は速度重視
- `putVectors()` は同じ ID のベクトルが存在する場合、上書き（upsert）する
- メタデータフィルタは `queryVectors()` のパフォーマンスに影響する可能性がある
- 大量のベクトルをバッチ処理する場合は、適切なチャンクサイズに分割する

## 関連
- [Storage](./storage.md)
- [Storage Analytics](./storage-analytics.md)
