# Storage Analytics

ストレージ分析用のメソッド群。バケットとファイルの使用状況を分析する。

## メソッド一覧

### `createBucket()`

分析用のストレージバケットを作成する。

**Signature:**
```typescript
supabase.storageAnalytics.createBucket(id: string, options?: {
  public?: boolean;
  fileSizeLimit?: number | string;
  allowedMimeTypes?: string[];
}): Promise<{ data: { name: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storageAnalytics.createBucket('analytics-data', {
  public: false,
})
```

**Parameters:**
- `id` (string) — バケット名（一意）
- `options.public` (boolean) — 公開バケットにするか（デフォルト: false）
- `options.fileSizeLimit` (number | string) — ファイルサイズ上限
- `options.allowedMimeTypes` (string[]) — 許可する MIME タイプ

**Returns:** `{ data: { name }, error }`

---

### `deleteBucket()`

分析用バケットを削除する。

**Signature:**
```typescript
supabase.storageAnalytics.deleteBucket(id: string): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.storageAnalytics.deleteBucket('analytics-data')
```

**Parameters:**
- `id` (string) — バケット名

**Returns:** `{ data: { message }, error }`

---

### `listBuckets()`

分析用バケット一覧を取得する。

**Signature:**
```typescript
supabase.storageAnalytics.listBuckets(): Promise<{ data: Bucket[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storageAnalytics.listBuckets()
```

**Parameters:** なし

**Returns:** `{ data: Bucket[], error }`

---

### `from()`

特定のバケットを指定してファイル操作を行う。

**Signature:**
```typescript
supabase.storageAnalytics.from(bucket: string): StorageFileApi
```

**Usage:**
```typescript
const bucket = supabase.storageAnalytics.from('analytics-data')

// ファイルのアップロード
const { data, error } = await bucket.upload('reports/2024-q1.json', fileData)

// ファイルのダウンロード
const { data, error } = await bucket.download('reports/2024-q1.json')

// ファイル一覧
const { data, error } = await bucket.list('reports')
```

**Parameters:**
- `bucket` (string) — バケット名

**Returns:** `StorageFileApi` — Storage の標準ファイル操作メソッドが利用可能

---

## 注意点
- Storage Analytics はストレージの分析機能へのアクセスを提供する
- `from()` で取得したオブジェクトは標準の Storage ファイル操作メソッド（upload, download, list 等）を持つ
- 利用可能な機能はプランにより異なる場合がある

## 関連
- [Storage](./storage.md)
- [Storage Vectors](./storage-vectors.md)
