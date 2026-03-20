# Storage

ファイルストレージの操作メソッド群。バケットの管理とファイルのアップロード/ダウンロード/管理を行う。

## バケット管理メソッド

### `createBucket()`

新しいストレージバケットを作成する。

**Signature:**
```typescript
supabase.storage.createBucket(id: string, options?: {
  public?: boolean;
  fileSizeLimit?: number | string;
  allowedMimeTypes?: string[];
}): Promise<{ data: { name: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage.createBucket('avatars', {
  public: true,
  fileSizeLimit: '5MB',
  allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp'],
})
```

**Parameters:**
- `id` (string) — バケット名（一意）
- `options.public` (boolean) — 公開バケットにするか（デフォルト: false）
- `options.fileSizeLimit` (number | string) — ファイルサイズ上限（例: `1048576`, `'1MB'`）
- `options.allowedMimeTypes` (string[]) — 許可する MIME タイプ

**Returns:** `{ data: { name }, error }`

---

### `getBucket()`

バケット情報を取得する。

**Signature:**
```typescript
supabase.storage.getBucket(id: string): Promise<{ data: Bucket, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage.getBucket('avatars')
```

**Parameters:**
- `id` (string) — バケット名

**Returns:** `{ data: Bucket, error }`

---

### `listBuckets()`

全バケットを一覧表示する。

**Signature:**
```typescript
supabase.storage.listBuckets(): Promise<{ data: Bucket[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage.listBuckets()
```

**Parameters:** なし

**Returns:** `{ data: Bucket[], error }`

---

### `updateBucket()`

バケット設定を更新する。

**Signature:**
```typescript
supabase.storage.updateBucket(id: string, options: {
  public?: boolean;
  fileSizeLimit?: number | string;
  allowedMimeTypes?: string[];
}): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage.updateBucket('avatars', {
  public: false,
  fileSizeLimit: '10MB',
})
```

**Parameters:**
- `id` (string) — バケット名
- `options` — 更新する設定（createBucket と同じオプション）

**Returns:** `{ data: { message }, error }`

---

### `deleteBucket()`

バケットを削除する。バケットは空である必要がある。

**Signature:**
```typescript
supabase.storage.deleteBucket(id: string): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.storage.deleteBucket('avatars')
```

**Parameters:**
- `id` (string) — バケット名

**Returns:** `{ data: { message }, error }`

---

### `emptyBucket()`

バケット内の全ファイルを削除する。

**Signature:**
```typescript
supabase.storage.emptyBucket(id: string): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { error } = await supabase.storage.emptyBucket('avatars')
```

**Parameters:**
- `id` (string) — バケット名

**Returns:** `{ data: { message }, error }`

---

## ファイル操作メソッド

`supabase.storage.from(bucket)` でバケットを指定してからチェーンする。

### `upload()`

ファイルをアップロードする。

**Signature:**
```typescript
supabase.storage.from(bucket).upload(
  path: string,
  fileBody: File | Blob | ArrayBuffer | FormData | ReadableStream | string,
  options?: {
    cacheControl?: string;
    contentType?: string;
    upsert?: boolean;
    duplex?: string;
    metadata?: Record<string, string>;
  }
): Promise<{ data: { id, path, fullPath }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar.png', file, {
    cacheControl: '3600',
    upsert: false,
    contentType: 'image/png',
    metadata: { userId: '123' },
  })
```

**Parameters:**
- `path` (string) — ファイルパス（バケット内の相対パス）
- `fileBody` (File | Blob | ArrayBuffer | ...) — ファイルデータ
- `options.cacheControl` (string) — Cache-Control ヘッダ（デフォルト: `'3600'`）
- `options.contentType` (string) — Content-Type（省略可。自動検出）
- `options.upsert` (boolean) — 既存ファイルを上書きするか（デフォルト: false）
- `options.metadata` (Record<string, string>) — カスタムメタデータ（省略可）

**Returns:** `{ data: { id, path, fullPath }, error }`

---

### `download()`

ファイルをダウンロードする。

**Signature:**
```typescript
supabase.storage.from(bucket).download(
  path: string,
  options?: { transform?: TransformOptions }
): Promise<{ data: Blob, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .download('public/avatar.png')

// 画像変換付き
const { data, error } = await supabase.storage
  .from('avatars')
  .download('public/avatar.png', {
    transform: {
      width: 200,
      height: 200,
      resize: 'cover',
    },
  })
```

**Parameters:**
- `path` (string) — ファイルパス
- `options.transform` (TransformOptions) — 画像変換オプション（省略可）

**Returns:** `{ data: Blob, error }`

---

### `list()`

バケット内のファイル一覧を取得する。

**Signature:**
```typescript
supabase.storage.from(bucket).list(
  path?: string,
  options?: {
    limit?: number;
    offset?: number;
    sortBy?: { column: string; order: 'asc' | 'desc' };
    search?: string;
  }
): Promise<{ data: FileObject[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .list('public', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
    search: 'avatar',
  })
```

**Parameters:**
- `path` (string) — フォルダパス（省略可。省略時はルート）
- `options.limit` (number) — 取得件数上限（デフォルト: 100）
- `options.offset` (number) — オフセット（デフォルト: 0）
- `options.sortBy` (object) — ソート設定
- `options.search` (string) — ファイル名検索（省略可）

**Returns:** `{ data: FileObject[], error }`

---

### `update()`

既存ファイルを更新（上書き）する。

**Signature:**
```typescript
supabase.storage.from(bucket).update(
  path: string,
  fileBody: File | Blob | ArrayBuffer,
  options?: { cacheControl?: string; contentType?: string; upsert?: boolean; metadata?: Record<string, string> }
): Promise<{ data: { id, path, fullPath }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .update('public/avatar.png', newFile, {
    cacheControl: '3600',
  })
```

**Parameters:** `upload()` と同じ

**Returns:** `{ data: { id, path, fullPath }, error }`

---

### `move()`

ファイルを移動またはリネームする。

**Signature:**
```typescript
supabase.storage.from(bucket).move(fromPath: string, toPath: string): Promise<{ data: { message: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .move('public/old-avatar.png', 'public/new-avatar.png')
```

**Parameters:**
- `fromPath` (string) — 移動元パス
- `toPath` (string) — 移動先パス

**Returns:** `{ data: { message }, error }`

---

### `copy()`

ファイルをコピーする。

**Signature:**
```typescript
supabase.storage.from(bucket).copy(fromPath: string, toPath: string): Promise<{ data: { path: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .copy('public/avatar.png', 'backup/avatar.png')
```

**Parameters:**
- `fromPath` (string) — コピー元パス
- `toPath` (string) — コピー先パス

**Returns:** `{ data: { path }, error }`

---

### `remove()`

ファイルを削除する。

**Signature:**
```typescript
supabase.storage.from(bucket).remove(paths: string[]): Promise<{ data: FileObject[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .remove(['public/avatar1.png', 'public/avatar2.png'])
```

**Parameters:**
- `paths` (string[]) — 削除するファイルパスの配列

**Returns:** `{ data: FileObject[], error }`

---

### `createSignedUrl()`

一時的な署名付き URL を生成する（非公開バケット用）。

**Signature:**
```typescript
supabase.storage.from(bucket).createSignedUrl(
  path: string,
  expiresIn: number,
  options?: { download?: boolean | string; transform?: TransformOptions }
): Promise<{ data: { signedUrl: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('private-bucket')
  .createSignedUrl('documents/report.pdf', 3600) // 1時間有効

// ダウンロード用
const { data, error } = await supabase.storage
  .from('private-bucket')
  .createSignedUrl('documents/report.pdf', 3600, {
    download: 'report.pdf',
  })
```

**Parameters:**
- `path` (string) — ファイルパス
- `expiresIn` (number) — 有効期間（秒）
- `options.download` (boolean | string) — ダウンロード用。文字列の場合はファイル名
- `options.transform` (TransformOptions) — 画像変換オプション

**Returns:** `{ data: { signedUrl }, error }`

---

### `createSignedUrls()`

複数ファイルの署名付き URL を一括生成する。

**Signature:**
```typescript
supabase.storage.from(bucket).createSignedUrls(
  paths: string[],
  expiresIn: number,
  options?: { download?: boolean | string }
): Promise<{ data: { signedUrl: string; path: string; error: string | null }[], error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('private-bucket')
  .createSignedUrls(['file1.pdf', 'file2.pdf'], 3600)
```

**Parameters:**
- `paths` (string[]) — ファイルパスの配列
- `expiresIn` (number) — 有効期間（秒）

**Returns:** `{ data: [{ signedUrl, path, error }], error }`

---

### `createSignedUploadUrl()`

署名付きアップロード URL を生成する（RLS なしでのアップロード用）。

**Signature:**
```typescript
supabase.storage.from(bucket).createSignedUploadUrl(
  path: string,
  options?: { upsert?: boolean }
): Promise<{ data: { signedUrl: string; path: string; token: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .createSignedUploadUrl('public/avatar.png')
```

**Parameters:**
- `path` (string) — アップロード先パス
- `options.upsert` (boolean) — 既存ファイルの上書き（省略可）

**Returns:** `{ data: { signedUrl, path, token }, error }`

---

### `uploadToSignedUrl()`

署名付き URL を使ってファイルをアップロードする。

**Signature:**
```typescript
supabase.storage.from(bucket).uploadToSignedUrl(
  path: string,
  token: string,
  fileBody: File | Blob | ArrayBuffer,
  options?: { contentType?: string; upsert?: boolean; metadata?: Record<string, string> }
): Promise<{ data: { path: string; fullPath: string }, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .uploadToSignedUrl('public/avatar.png', token, file)
```

**Parameters:**
- `path` (string) — ファイルパス
- `token` (string) — `createSignedUploadUrl` で取得したトークン
- `fileBody` (File | Blob | ArrayBuffer) — ファイルデータ

**Returns:** `{ data: { path, fullPath }, error }`

---

### `getPublicUrl()`

公開バケット内ファイルの公開 URL を取得する。

**Signature:**
```typescript
supabase.storage.from(bucket).getPublicUrl(
  path: string,
  options?: { download?: boolean | string; transform?: TransformOptions }
): { data: { publicUrl: string } }
```

**Usage:**
```typescript
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar.png')

// 画像変換付き
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar.png', {
    transform: { width: 200, height: 200 },
  })
```

**Parameters:**
- `path` (string) — ファイルパス
- `options.download` (boolean | string) — ダウンロード URL にするか
- `options.transform` (TransformOptions) — 画像変換オプション

**Returns:** `{ data: { publicUrl } }` — エラーは返さない（同期メソッド）

---

### `exists()`

ファイルが存在するか確認する。

**Signature:**
```typescript
supabase.storage.from(bucket).exists(path: string): Promise<{ data: boolean, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .exists('public/avatar.png')
// data === true or false
```

**Parameters:**
- `path` (string) — ファイルパス

**Returns:** `{ data: boolean, error }`

---

### `info()`

ファイルのメタデータ情報を取得する。

**Signature:**
```typescript
supabase.storage.from(bucket).info(path: string): Promise<{ data: FileObjectV2, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .info('public/avatar.png')
// data: { id, name, size, content_type, created_at, ... }
```

**Parameters:**
- `path` (string) — ファイルパス

**Returns:** `{ data: FileObjectV2, error }`

---

### `toBase64()`

ファイルを Base64 文字列としてダウンロードする。

**Signature:**
```typescript
supabase.storage.from(bucket).toBase64(path: string): Promise<{ data: string, error: StorageError | null }>
```

**Usage:**
```typescript
const { data, error } = await supabase.storage
  .from('avatars')
  .toBase64('public/avatar.png')
// data: "iVBORw0KGgo..."
```

**Parameters:**
- `path` (string) — ファイルパス

**Returns:** `{ data: string, error }` — Base64 エンコードされた文字列

---

## 画像変換オプション (TransformOptions)

```typescript
interface TransformOptions {
  width?: number      // 幅（ピクセル）
  height?: number     // 高さ（ピクセル）
  resize?: 'cover' | 'contain' | 'fill'  // リサイズモード
  format?: 'origin' | 'avif'             // 出力フォーマット
  quality?: number    // 品質（1-100）
}
```

---

## 注意点
- `upload()` でファイルが既に存在する場合、`upsert: true` を指定しないとエラーになる
- 公開バケットのファイルは `getPublicUrl()` で URL を取得し、非公開バケットのファイルは `createSignedUrl()` で一時 URL を生成する
- `deleteBucket()` を実行する前に `emptyBucket()` でバケット内のファイルを全て削除する必要がある
- ファイルサイズ制限はバケット単位で設定可能
- RLS ポリシーでファイルアクセスを制御できる（`storage.objects` テーブル）

## 関連
- [Initialization](./initialization.md)
- [Storage Analytics](./storage-analytics.md)
- [Storage Vectors](./storage-vectors.md)
