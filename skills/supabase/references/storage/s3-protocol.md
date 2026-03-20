# S3 互換プロトコル

Supabase Storage は S3 互換のエンドポイントを提供し、既存の AWS SDK やツールからアクセスできる。

## 概要

Supabase Storage は S3 互換の API を提供しており、AWS SDK や既存の S3 対応ツール（cyberduck、rclone、Transmit 等）からアクセス可能。これにより既存のワークフローやインフラをそのまま活用できる。

**エンドポイント:**
```
https://<project_ref>.supabase.co/storage/v1/s3
```

**認証方法:**
1. **service_role key**: サーバーサイドでの利用。RLS をバイパスする
2. **セッショントークン**: クライアントサイドでの利用。RLS ポリシーが適用される

**互換性のある主な操作:**
- `ListBuckets` — バケット一覧
- `HeadBucket` — バケットの存在確認
- `ListObjects` / `ListObjectsV2` — オブジェクト一覧
- `GetObject` — オブジェクト取得
- `HeadObject` — オブジェクトのメタデータ取得
- `PutObject` — オブジェクトのアップロード
- `DeleteObject` / `DeleteObjects` — オブジェクトの削除
- `CopyObject` — オブジェクトのコピー
- `CreateMultipartUpload` / `UploadPart` / `CompleteMultipartUpload` / `AbortMultipartUpload` — マルチパートアップロード

## コード例

```typescript
import { S3Client, ListBucketsCommand, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command, CopyObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const projectRef = '<project_ref>'

// ===== service_role key での接続（サーバーサイド向け） =====
const s3Client = new S3Client({
  forcePathStyle: true,
  region: 'ap-northeast-1', // プロジェクトのリージョン
  endpoint: `https://${projectRef}.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: '<service_role_key>',
    secretAccessKey: '<service_role_key>', // accessKeyId と同じ値
  },
})

// ===== セッショントークンでの接続（クライアントサイド向け） =====
const { data: { session } } = await supabase.auth.getSession()

const s3ClientWithSession = new S3Client({
  forcePathStyle: true,
  region: 'ap-northeast-1',
  endpoint: `https://${projectRef}.supabase.co/storage/v1/s3`,
  credentials: {
    accessKeyId: '<anon_key>',
    secretAccessKey: '<anon_key>', // accessKeyId と同じ値
    sessionToken: session?.access_token,
  },
})

// ===== バケット一覧 =====
const { Buckets } = await s3Client.send(new ListBucketsCommand({}))
console.log(Buckets)

// ===== ファイルアップロード =====
await s3Client.send(new PutObjectCommand({
  Bucket: 'avatars',
  Key: 'public/avatar1.png',
  Body: file,
  ContentType: 'image/png',
  CacheControl: 'max-age=3600',
}))

// ===== ファイルダウンロード =====
const { Body } = await s3Client.send(new GetObjectCommand({
  Bucket: 'avatars',
  Key: 'public/avatar1.png',
}))

// ===== ファイル一覧 =====
const { Contents } = await s3Client.send(new ListObjectsV2Command({
  Bucket: 'avatars',
  Prefix: 'public/',
}))

// ===== ファイルコピー =====
await s3Client.send(new CopyObjectCommand({
  Bucket: 'avatars',
  Key: 'backup/avatar1.png',
  CopySource: 'avatars/public/avatar1.png',
}))

// ===== ファイル削除 =====
await s3Client.send(new DeleteObjectCommand({
  Bucket: 'avatars',
  Key: 'public/avatar1.png',
}))

// ===== Presigned URL の生成 =====
const command = new GetObjectCommand({
  Bucket: 'avatars',
  Key: 'public/avatar1.png',
})
const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
console.log(presignedUrl)

// ===== マルチパートアップロード =====
import { CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'

// @aws-sdk/lib-storage を使った簡単なマルチパートアップロード
const parallelUpload = new Upload({
  client: s3Client,
  params: {
    Bucket: 'videos',
    Key: 'large-video.mp4',
    Body: largeFile,
    ContentType: 'video/mp4',
  },
  queueSize: 4, // 並列アップロード数
  partSize: 1024 * 1024 * 5, // 5MB パートサイズ
})

parallelUpload.on('httpUploadProgress', (progress) => {
  console.log(progress)
})

await parallelUpload.done()
```

## 注意点

- `forcePathStyle: true` は必須。仮想ホスト形式はサポートされていない
- `accessKeyId` と `secretAccessKey` には同じキーを設定する（Supabase 固有の仕様）
- service_role key は RLS をバイパスするため、クライアントサイドでは絶対に使用しない
- セッショントークンは有効期限があるため、トークン更新の仕組みが必要
- リージョンはプロジェクト作成時に選択したリージョンを指定する
- S3 API の全操作がサポートされているわけではない。バケットの作成・削除は supabase-js または ダッシュボードから行う
- マルチパートアップロードの最小パートサイズは 5MB

## 関連

- [Storage 概要](./overview.md)
- [アップロード](./uploads.md)
- [アクセス制御](./access-control.md)
