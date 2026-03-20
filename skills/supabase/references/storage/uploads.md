# ファイルアップロード

Supabase Storage へのファイルアップロード方法。Standard / Resumable / S3 の 3 方式をサポート。

## 概要

Supabase Storage は 3 つのアップロード方式を提供する。ファイルサイズや用途に応じて使い分ける。

| 方式 | 最大サイズ | 特徴 | 用途 |
|------|-----------|------|------|
| Standard Upload | 6MB | シンプル、1回のリクエスト | 小さなファイル |
| Resumable Upload | 50GB（プラン上限まで） | TUS プロトコル、中断再開可能 | 大きなファイル、不安定な回線 |
| S3 Upload | 50GB（プラン上限まで） | AWS SDK 互換、マルチパート | 既存 S3 ツール連携 |

**プラン別ファイルサイズ上限:**
- Free: 50MB
- Pro: 5GB
- Team: 5GB
- Enterprise: カスタム

## コード例

```typescript
// ===== Standard Upload（6MB 以下向け） =====
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar1.png', file, {
    contentType: 'image/png',
    cacheControl: '3600',
    upsert: false,
  })

// ArrayBuffer からアップロード
const { data: data2, error: error2 } = await supabase.storage
  .from('avatars')
  .upload('public/avatar2.png', arrayBuffer, {
    contentType: 'image/png',
  })

// FormData からアップロード（ブラウザ）
const fileInput = document.getElementById('file-input') as HTMLInputElement
const selectedFile = fileInput.files?.[0]
if (selectedFile) {
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(`public/${selectedFile.name}`, selectedFile, {
      cacheControl: '3600',
      upsert: true, // 既存ファイルを上書き
    })
}

// ===== Resumable Upload（大きなファイル向け） =====
import * as tus from 'tus-js-client'

const projectRef = '<project_ref>'
const bucketName = 'videos'
const fileName = 'large-video.mp4'

const { data: { session } } = await supabase.auth.getSession()

const upload = new tus.Upload(file, {
  endpoint: `https://${projectRef}.supabase.co/storage/v1/upload/resumable`,
  retryDelays: [0, 3000, 5000, 10000, 20000],
  headers: {
    authorization: `Bearer ${session?.access_token}`,
    'x-upsert': 'true',
  },
  uploadDataDuringCreation: true,
  removeFingerprintOnSuccess: true,
  metadata: {
    bucketName: bucketName,
    objectName: fileName,
    contentType: 'video/mp4',
    cacheControl: '3600',
  },
  chunkSize: 6 * 1024 * 1024, // 6MB チャンク
  onError: (error) => {
    console.error('Upload failed:', error)
  },
  onProgress: (bytesUploaded, bytesTotal) => {
    const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
    console.log(`${percentage}%`)
  },
  onSuccess: () => {
    console.log('Upload complete')
  },
})

// 前回の中断があれば再開、なければ新規開始
const previousUploads = await upload.findPreviousUploads()
if (previousUploads.length > 0) {
  upload.resumeFromPreviousUpload(previousUploads[0])
}
upload.start()

// ===== S3 Upload（AWS SDK 互換） =====
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  forcePathStyle: true,
  region: 'ap-northeast-1',
  endpoint: `https://${projectRef}.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: '<service_role_key>',
    secretAccessKey: '<service_role_key>',
  },
})

const command = new PutObjectCommand({
  Bucket: 'avatars',
  Key: 'public/avatar3.png',
  Body: file,
  ContentType: 'image/png',
})

await s3Client.send(command)
```

## 注意点

- Standard Upload は 6MB を超えるとエラーになる。大きなファイルには Resumable Upload を使う
- `upsert: false`（デフォルト）の場合、同名ファイルが既に存在するとエラーになる
- `cacheControl` はデフォルトで `3600`（1 時間）。CDN キャッシュに影響する
- `contentType` を省略するとファイル拡張子から自動判定される
- Resumable Upload のチャンクサイズは最小 6MB
- ファイルパスに含められる文字には制限がある（スラッシュでフォルダ区切り）
- アップロードには対象バケットへの INSERT 権限（RLS ポリシー）が必要

## 関連

- [Storage 概要](./overview.md)
- [ファイル配信](./serving.md)
- [アクセス制御](./access-control.md)
- [S3 プロトコル](./s3-protocol.md)
