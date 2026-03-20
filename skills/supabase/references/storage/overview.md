# Storage 概要・バケット管理

Supabase Storage は S3 互換のオブジェクトストレージで、画像・動画・ドキュメントなどあらゆるファイルを管理できる。

## 概要

Supabase Storage はプロジェクトに統合されたオブジェクトストレージサービスである。ファイルはバケット単位で管理され、RLS（Row Level Security）によるアクセス制御が可能。バケットには Public と Private の 2 種類があり、用途に応じて使い分ける。

- **Public バケット**: 認証不要でファイルにアクセスできる。アバター画像やアセットなど公開ファイル向け。
- **Private バケット**: 認証が必要。RLS ポリシーによりアクセスを制御する。デフォルトはこちら。

ストレージの構造は以下の通り:
- **Bucket（バケット）**: ファイルを格納するトップレベルのコンテナ。フォルダのように整理用途で使う。
- **Object（オブジェクト）**: バケット内に格納される個々のファイル。パスで管理される。

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://<project_ref>.supabase.co', '<anon_key>')

// バケットの作成
const { data, error } = await supabase.storage.createBucket('avatars', {
  public: true,
  allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  fileSizeLimit: 1024 * 1024 * 2, // 2MB
})

// バケット一覧の取得
const { data: buckets, error: listError } = await supabase.storage.listBuckets()

// 特定バケットの取得
const { data: bucket, error: getError } = await supabase.storage.getBucket('avatars')

// バケットの更新
const { data: updated, error: updateError } = await supabase.storage.updateBucket('avatars', {
  public: false,
  allowedMimeTypes: ['image/png', 'image/jpeg'],
  fileSizeLimit: 1024 * 1024 * 5, // 5MB
})

// バケットを空にする（ファイルをすべて削除、バケット自体は残す）
const { data: emptied, error: emptyError } = await supabase.storage.emptyBucket('avatars')

// バケットの削除（事前に emptyBucket が必要）
const { data: deleted, error: deleteError } = await supabase.storage.deleteBucket('avatars')
```

## 注意点

- バケットを削除する前に `emptyBucket` でファイルをすべて削除する必要がある
- `allowedMimeTypes` を指定すると、指定した MIME タイプ以外のファイルはアップロードが拒否される
- `fileSizeLimit` はバイト単位で指定する
- Public バケットでもアップロード・更新・削除には認証が必要（RLS ポリシーで制御）
- バケット名はプロジェクト内で一意である必要がある
- バケット名に使える文字は英小文字、数字、ハイフン、ピリオドのみ

## 関連

- [アップロード](./uploads.md)
- [ファイル配信](./serving.md)
- [アクセス制御](./access-control.md)
- [CDN](./cdn.md)
