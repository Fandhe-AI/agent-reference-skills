# アクセス制御

Storage の RLS ポリシーによるアクセス制御。storage.objects テーブルへのポリシー設定でオブジェクト単位の細かな制御が可能。

## 概要

Supabase Storage のアクセス制御は PostgreSQL の RLS（Row Level Security）を利用する。ファイルのメタデータは `storage.objects` テーブルに格納されており、このテーブルに対して RLS ポリシーを設定することでアクセスを制御する。

**制御の仕組み:**
- **バケットレベル**: Public / Private の設定で大まかなアクセス制御
- **オブジェクトレベル**: RLS ポリシーで SELECT / INSERT / UPDATE / DELETE の各操作を細かく制御

**storage スキーマのヘルパー関数:**
| 関数 | 説明 | 例 |
|------|------|-----|
| `storage.foldername(name)` | パスからフォルダ部分を配列で取得 | `'{public,avatars}'` |
| `storage.filename(name)` | パスからファイル名を取得 | `'avatar1.png'` |
| `storage.extension(name)` | ファイルの拡張子を取得 | `'png'` |

**owner と owner_id:**
- ファイルをアップロードしたユーザーの ID が `owner`（uuid 型）と `owner_id`（text 型）に自動設定される
- ポリシーで `auth.uid()` と比較することでオーナーベースのアクセス制御が可能
- `owner_id` の使用が推奨される（`owner` は後方互換性のために残されている）

## コード例

```typescript
// ===== SQL でのポリシー設定例 =====

// --- 1. 誰でも Public バケットのファイルを閲覧可能 ---
/*
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'public-assets');
*/

// --- 2. 認証済みユーザーのみアップロード可能 ---
/*
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');
*/

// --- 3. ユーザーが自分のフォルダにのみアップロード可能 ---
/*
CREATE POLICY "Users can upload to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
  AND (storage.foldername(name))[1] = auth.uid()::text
);
*/

// --- 4. ユーザーが自分のファイルのみ閲覧可能 ---
/*
CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'private-docs'
  AND owner_id = auth.uid()::text
);
*/

// --- 5. ユーザーが自分のファイルのみ更新可能 ---
/*
CREATE POLICY "Users can update own files"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'avatars'
  AND owner_id = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars'
  AND owner_id = auth.uid()::text
);
*/

// --- 6. ユーザーが自分のファイルのみ削除可能 ---
/*
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'avatars'
  AND owner_id = auth.uid()::text
);
*/

// --- 7. 特定の拡張子のみアップロード許可 ---
/*
CREATE POLICY "Only images allowed"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'avatars'
  AND storage.extension(name) IN ('png', 'jpg', 'jpeg', 'gif', 'webp')
);
*/

// --- 8. 組織ベースのアクセス制御（JWT カスタムクレーム利用） ---
/*
CREATE POLICY "Org members can access"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'org-files'
  AND (storage.foldername(name))[1] = (
    (auth.jwt() -> 'app_metadata' ->> 'org_id')
  )
);
*/

// ===== supabase-js でのファイル操作（ポリシーが適用される） =====

// ユーザー固有フォルダにアップロード
const userId = (await supabase.auth.getUser()).data.user?.id
const { data, error } = await supabase.storage
  .from('avatars')
  .upload(`${userId}/profile.png`, file)

// ユーザー固有フォルダのファイル一覧取得
const { data: files, error: listError } = await supabase.storage
  .from('avatars')
  .list(userId)

// ファイルの削除（DELETE ポリシーが適用される）
const { data: removed, error: removeError } = await supabase.storage
  .from('avatars')
  .remove([`${userId}/profile.png`])
```

## 注意点

- Public バケットでも SELECT 以外の操作（INSERT / UPDATE / DELETE）には RLS ポリシーが必要
- RLS ポリシーは `storage.objects` テーブルに対して設定する
- INSERT ポリシーは `WITH CHECK` を使い、SELECT / DELETE ポリシーは `USING` を使う。UPDATE は両方使う
- `service_role` キーを使うと RLS をバイパスできるが、サーバーサイドでのみ使用すること
- `owner_id` は自動的に設定される。アップロード時に手動で上書きすることはできない
- ポリシーのデバッグには Supabase ダッシュボードの SQL Editor や Logs が有用
- バケットレベルの `allowedMimeTypes` と `fileSizeLimit` は RLS ポリシーとは別のバリデーション層

## 関連

- [Storage 概要](./overview.md)
- [アップロード](./uploads.md)
- [ファイル配信](./serving.md)
- [デバッグ](./debugging.md)
