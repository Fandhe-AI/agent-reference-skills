# ファイルダウンロード・画像変換

ファイルのダウンロード、公開 URL 取得、署名付き URL 生成、および画像変換機能。

## 概要

Supabase Storage はファイルの配信方法を複数提供する。バケットの種類（Public / Private）に応じて適切な方法を選択する。また、画像ファイルに対してはリアルタイムの変換（リサイズ、フォーマット変換等）が可能。

**配信方法の使い分け:**
| 方法 | バケット種別 | 認証 | 用途 |
|------|------------|------|------|
| `getPublicUrl()` | Public | 不要 | 公開画像の URL 取得 |
| `createSignedUrl()` | Public / Private | 不要（URL に署名を含む） | 期限付き共有リンク |
| `download()` | Public / Private | 必要 | バイナリデータの直接取得 |

## コード例

```typescript
// ===== ダウンロード =====
// バイナリデータとしてダウンロード
const { data, error } = await supabase.storage
  .from('avatars')
  .download('public/avatar1.png')

// data は Blob オブジェクト
if (data) {
  const url = URL.createObjectURL(data)
  // img.src = url で表示可能
}

// ===== Public URL の取得 =====
// Public バケットのファイル URL を取得（リクエストは発生しない）
const { data: publicUrl } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png')

console.log(publicUrl.publicUrl)
// https://<project_ref>.supabase.co/storage/v1/object/public/avatars/public/avatar1.png

// ダウンロード用 URL（Content-Disposition: attachment ヘッダー付き）
const { data: downloadUrl } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png', {
    download: true, // または download: 'custom-filename.png'
  })

// ===== 署名付き URL =====
// 単一ファイルの署名付き URL（60秒間有効）
const { data: signedUrl, error: signedError } = await supabase.storage
  .from('private-docs')
  .createSignedUrl('reports/2024-q1.pdf', 60)

console.log(signedUrl?.signedUrl)

// 複数ファイルの署名付き URL を一括生成
const { data: signedUrls, error: signedUrlsError } = await supabase.storage
  .from('private-docs')
  .createSignedUrls(
    ['reports/2024-q1.pdf', 'reports/2024-q2.pdf', 'reports/2024-q3.pdf'],
    60
  )

// 署名付きアップロード URL の生成（クライアントが直接アップロード可能）
const { data: uploadUrl, error: uploadError } = await supabase.storage
  .from('avatars')
  .createSignedUploadUrl('public/new-avatar.png')

// 署名付き URL を使ってアップロード
const { data: uploaded, error: uploadErr } = await supabase.storage
  .from('avatars')
  .uploadToSignedUrl('public/new-avatar.png', uploadUrl!.token, file)

// ===== 画像変換（Image Transformations） =====
// Public URL で画像変換
const { data: transformedUrl } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar1.png', {
    transform: {
      width: 200,
      height: 200,
      resize: 'cover', // 'cover' | 'contain' | 'fill'
      quality: 80,
      format: 'webp', // 'origin' | 'avif' | 'webp'
    },
  })

// 署名付き URL で画像変換
const { data: transformedSigned, error: transformErr } = await supabase.storage
  .from('avatars')
  .createSignedUrl('public/avatar1.png', 60, {
    transform: {
      width: 100,
      height: 100,
      resize: 'contain',
    },
  })

// ダウンロードで画像変換
const { data: transformedDownload, error: dlErr } = await supabase.storage
  .from('avatars')
  .download('public/avatar1.png', {
    transform: {
      width: 400,
      height: 300,
      quality: 50,
    },
  })

// ===== ファイルの一覧・管理 =====
// フォルダ内のファイル一覧
const { data: files, error: listError } = await supabase.storage
  .from('avatars')
  .list('public', {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })

// ファイルの移動
const { data: moved, error: moveError } = await supabase.storage
  .from('avatars')
  .move('public/avatar1.png', 'archive/avatar1.png')

// ファイルのコピー
const { data: copied, error: copyError } = await supabase.storage
  .from('avatars')
  .copy('public/avatar1.png', 'backup/avatar1.png')

// ファイルの削除（複数同時削除可能）
const { data: removed, error: removeError } = await supabase.storage
  .from('avatars')
  .remove(['public/avatar1.png', 'public/avatar2.png'])
```

## 注意点

- `getPublicUrl()` は API リクエストを発行しない（URL を構築するだけ）。ファイルの存在確認は行われない
- 署名付き URL の有効期限（秒）は用途に応じて適切に設定する。長すぎるとセキュリティリスクになる
- 画像変換は Pro プラン以上で利用可能（Free プランでは使用不可）
- 画像変換の `resize` モード: `cover`（アスペクト比維持でクロップ）、`contain`（アスペクト比維持で収める）、`fill`（引き伸ばし）
- `format: 'origin'` は元の形式を維持する。`avif` は圧縮率が高いがブラウザ対応に注意
- `list()` はフォルダを含む結果を返す。`id` が `null` のものはフォルダ
- `download` オプションに文字列を指定するとダウンロード時のファイル名をカスタマイズできる

## 関連

- [Storage 概要](./overview.md)
- [アップロード](./uploads.md)
- [CDN](./cdn.md)
- [アクセス制御](./access-control.md)
