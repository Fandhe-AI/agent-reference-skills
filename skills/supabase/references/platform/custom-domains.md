# カスタムドメイン

## 概要

Supabase プロジェクトにカスタムドメインを設定することで、API エンドポイントを独自のドメインで公開できる。

## カスタムドメイン

Pro プラン以上で利用可能なアドオン。

### セットアップ手順

1. **ダッシュボードで設定開始**
   - **Project Settings → Custom Domains** に移動
   - **Add Custom Domain** をクリック
   - 使用するドメインを入力（例: `api.example.com`）

2. **DNS に CNAME レコードを追加**

   ```
   api.example.com  CNAME  <project-ref>.supabase.co
   ```

3. **所有権の検証**
   - Supabase が提示する TXT レコードを DNS に追加

   ```
   _supabase-challenge.api.example.com  TXT  <verification-token>
   ```

4. **検証完了を待つ**
   - DNS の伝播に最大 24〜48 時間かかる場合がある
   - ダッシュボードで状態を確認

### SSL 証明書の自動発行

- カスタムドメイン設定後、SSL 証明書が自動的に発行される
- Let's Encrypt を使用
- 証明書の更新も自動的に行われる
- 追加の設定は不要

### 利用方法

カスタムドメイン設定後、クライアントの URL を更新する。

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://api.example.com',  // カスタムドメインを使用
  '<anon-key>'
)
```

## Vanity Subdomain

カスタムドメインの代替として、デフォルトの project-ref（`abcdefghijklmnop.supabase.co`）をカスタム名（`my-app.supabase.co`）に変更できる。

### 設定方法

1. **Project Settings → General → Vanity Subdomain** に移動
2. 希望するサブドメイン名を入力
3. 利用可能であれば **Activate** をクリック

### 制約事項

- サブドメイン名は一意である必要がある
- 一度設定すると変更不可（削除して再設定は可能）
- `supabase.co` ドメイン配下のサブドメインのみ

### 利用方法

```typescript
const supabase = createClient(
  'https://my-app.supabase.co',  // Vanity Subdomain を使用
  '<anon-key>'
)
```

## 注意事項

- カスタムドメインと Vanity Subdomain は併用可能
- カスタムドメインの変更後、古い URL（project-ref ベース）も引き続き利用可能
- クライアント側の URL 切り替えは段階的に行うことを推奨
- CORS 設定でカスタムドメインを許可リストに追加する必要がある場合がある

## 関連

- [Management API ドメイン](../management-api/domains.md) — API でのドメイン管理
- [課金](./billing.md) — プラン要件
