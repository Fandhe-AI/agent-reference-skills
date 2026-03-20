# エラーコード・ログ

Storage のエラーコード、原因、対処法、およびログの確認方法。

## 概要

Supabase Storage は HTTP ステータスコードベースのエラーレスポンスを返す。エラーの診断にはダッシュボードのログ機能や API レスポンスのエラーメッセージを活用する。

**主要なエラーコード一覧:**

| コード | エラー | 主な原因 |
|--------|--------|---------|
| 400 | Bad Request | リクエストパラメータの不正、無効なファイルパス |
| 403 | Forbidden | RLS ポリシーによるアクセス拒否、認証トークンの問題 |
| 404 | Not Found | バケットまたはオブジェクトが存在しない |
| 409 | Conflict | 同名ファイルが既に存在（upsert: false の場合） |
| 413 | Payload Too Large | ファイルサイズ制限の超過 |
| 422 | Unprocessable Entity | MIME タイプの不一致、バリデーションエラー |
| 500 | Internal Server Error | サーバー側の内部エラー |

## コード例

```typescript
// ===== エラーハンドリングの基本パターン =====
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar.png', file)

if (error) {
  console.error('Error code:', error.statusCode)
  console.error('Error message:', error.message)

  switch (error.statusCode) {
    case '400':
      console.error('リクエストが不正です。ファイルパスやパラメータを確認してください。')
      break
    case '403':
      console.error('アクセスが拒否されました。RLS ポリシーや認証状態を確認してください。')
      break
    case '404':
      console.error('バケットまたはファイルが見つかりません。')
      break
    case '409':
      console.error('ファイルが既に存在します。upsert: true を使用してください。')
      break
    case '413':
      console.error('ファイルサイズが制限を超えています。')
      break
    case '422':
      console.error('ファイルの MIME タイプが許可されていません。')
      break
    case '500':
      console.error('サーバーエラーが発生しました。しばらく待ってから再試行してください。')
      break
  }
} else {
  console.log('Upload successful:', data.path)
}

// ===== 409 Conflict の回避（upsert を使用） =====
const { data: upsertData, error: upsertError } = await supabase.storage
  .from('avatars')
  .upload('public/avatar.png', file, {
    upsert: true, // 既存ファイルを上書き
  })

// ===== 403 エラーのデバッグ =====
// 1. 認証状態の確認
const { data: { user }, error: authError } = await supabase.auth.getUser()
console.log('Current user:', user?.id)

// 2. セッションの確認
const { data: { session } } = await supabase.auth.getSession()
console.log('Session valid:', !!session)
console.log('Token expiry:', session?.expires_at)

// ===== 413 エラーの事前チェック =====
const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB (Free プラン)

function validateFileSize(file: File): boolean {
  if (file.size > MAX_FILE_SIZE) {
    console.error(`ファイルサイズ (${(file.size / 1024 / 1024).toFixed(2)}MB) が制限 (${MAX_FILE_SIZE / 1024 / 1024}MB) を超えています`)
    return false
  }
  return true
}

// ===== 422 エラーの事前チェック =====
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']

function validateMimeType(file: File): boolean {
  if (!ALLOWED_TYPES.includes(file.type)) {
    console.error(`ファイルタイプ "${file.type}" は許可されていません。許可: ${ALLOWED_TYPES.join(', ')}`)
    return false
  }
  return true
}

// ===== 包括的なアップロード関数 =====
async function uploadFile(
  bucket: string,
  path: string,
  file: File,
  options?: { upsert?: boolean }
) {
  // 事前バリデーション
  if (!validateFileSize(file)) {
    throw new Error('File size exceeds limit')
  }
  if (!validateMimeType(file)) {
    throw new Error('File type not allowed')
  }

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      upsert: options?.upsert ?? false,
      contentType: file.type,
    })

  if (error) {
    // エラーログをサーバーに送信
    console.error('Storage upload error:', {
      statusCode: error.statusCode,
      message: error.message,
      bucket,
      path,
      fileType: file.type,
      fileSize: file.size,
    })
    throw error
  }

  return data
}

// ===== ダッシュボードでのログ確認 =====
// 1. Supabase Dashboard > Logs > Storage を開く
// 2. フィルタで特定のパスやステータスコードを絞り込み
// 3. 時間範囲を指定して問題発生時のログを確認

// ===== API でログを取得（Management API） =====
/*
GET https://api.supabase.com/v1/projects/{project_ref}/analytics/endpoints/logs.all
?iso_timestamp_start=2024-01-01T00:00:00Z
&iso_timestamp_end=2024-01-02T00:00:00Z

Headers:
  Authorization: Bearer <management_api_key>
*/
```

## 注意点

- **400 Bad Request**: ファイルパスに無効な文字が含まれていないか確認する。スラッシュの重複（`//`）や先頭・末尾のスラッシュも原因になりうる
- **403 Forbidden**: 最も頻出するエラー。RLS ポリシーが正しく設定されているか、認証トークンが有効か、バケット名が正しいかを順に確認する
- **404 Not Found**: バケット名やファイルパスのタイポに注意。パスは大文字小文字を区別する
- **409 Conflict**: `upsert: true` を設定するか、アップロード前にファイルの存在を確認する
- **413 Payload Too Large**: プラン別のファイルサイズ上限だけでなく、バケットの `fileSizeLimit` 設定も確認する
- **422 Unprocessable Entity**: バケットの `allowedMimeTypes` 設定とアップロードファイルの MIME タイプが一致しているか確認する
- **500 Internal Server Error**: サーバー側の一時的な問題の場合が多い。リトライロジックの実装を推奨
- ダッシュボードの Logs セクションで Storage のリクエストログを確認できる。ステータスコードやパスでフィルタリング可能
- エラーレスポンスの `message` フィールドに詳細な原因が記載されている場合がある

## 関連

- [Storage 概要](./overview.md)
- [アクセス制御](./access-control.md)
- [アップロード](./uploads.md)
- [ファイル配信](./serving.md)
