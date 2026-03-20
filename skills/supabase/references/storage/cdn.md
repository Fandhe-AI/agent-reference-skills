# CDN（Content Delivery Network）

Supabase Storage は Smart CDN によりファイルをグローバルにキャッシュ・配信する。

## 概要

Supabase Storage には CDN が組み込まれており、ファイルを世界中のエッジロケーションからキャッシュ配信する。Smart CDN はオリジンサーバーへの問い合わせなしにキャッシュの有効性を判断でき、高速なレスポンスを実現する。

**CDN の主な機能:**
- **Smart CDN**: キャッシュの自動管理。アップロード・更新・削除時にキャッシュを自動無効化
- **Cache-Control ヘッダー**: アップロード時に `cacheControl` オプションで CDN キャッシュの有効期間を制御
- **グローバル配信**: 世界中のエッジロケーションから低遅延でファイルを配信
- **キャッシュパージ**: 手動でのキャッシュ無効化（ダッシュボードまたは API）

**レスポンスヘッダーによるキャッシュ状態の確認:**
- `cf-cache-status: HIT` — CDN キャッシュからの配信
- `cf-cache-status: MISS` — オリジンから取得（次回以降キャッシュされる）
- `cf-cache-status: REVALIDATED` — キャッシュが再検証された
- `cf-cache-status: EXPIRED` — キャッシュの有効期限が切れた

## コード例

```typescript
// ===== アップロード時に Cache-Control を設定 =====
const { data, error } = await supabase.storage
  .from('assets')
  .upload('images/hero.png', file, {
    cacheControl: '86400', // 24時間（秒単位の文字列）
  })

// 長期間キャッシュ（静的アセット向け）
const { data: data2, error: error2 } = await supabase.storage
  .from('assets')
  .upload('images/logo.svg', logoFile, {
    cacheControl: '31536000', // 1年
  })

// キャッシュ無効（常にオリジンから取得）
const { data: data3, error: error3 } = await supabase.storage
  .from('documents')
  .upload('reports/latest.pdf', reportFile, {
    cacheControl: '0', // キャッシュしない
  })

// ===== Public URL での配信（CDN 経由） =====
const { data: publicUrl } = supabase.storage
  .from('assets')
  .getPublicUrl('images/hero.png')

// CDN 経由の URL が返される
// https://<project_ref>.supabase.co/storage/v1/object/public/assets/images/hero.png

// ===== 画像変換 + CDN =====
// 変換後の画像もキャッシュされる
const { data: transformedUrl } = supabase.storage
  .from('assets')
  .getPublicUrl('images/hero.png', {
    transform: {
      width: 800,
      height: 600,
      format: 'webp',
    },
  })
```

## 注意点

- `cacheControl` のデフォルト値は `3600`（1 時間）
- `cacheControl` はアップロード時に設定する文字列（秒単位）。後から `update` で変更可能
- Smart CDN によりファイルを上書き（upsert）すると自動的にキャッシュが無効化される
- 画像変換の結果も CDN にキャッシュされるため、同じ変換パラメータのリクエストは高速に配信される
- キャッシュパージはダッシュボードの Storage セクションから手動で実行可能
- CDN メトリクス（キャッシュヒット率、帯域幅等）はダッシュボードの Reports セクションで確認できる
- 署名付き URL 経由のアクセスも CDN を経由する

## 関連

- [ファイル配信](./serving.md)
- [アップロード](./uploads.md)
- [Storage 概要](./overview.md)
