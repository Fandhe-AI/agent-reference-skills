# Auth アーキテクチャ概要

Supabase Auth は GoTrue ベースの認証サーバーで、JWT によるセッション管理を提供する。

## 概要

Supabase Auth は、オープンソースの GoTrue サーバーをベースとした認証・認可システムである。すべてのユーザー情報は PostgreSQL の `auth.users` テーブルに格納され、RLS（Row Level Security）と連携してデータアクセスを制御する。

### 主要コンポーネント

- **GoTrue サーバー**: 認証 API を提供するサーバー。JWT の発行・検証を担当
- **auth.users テーブル**: ユーザー情報を格納する PostgreSQL テーブル
- **JWT**: アクセストークンとリフレッシュトークンによるセッション管理
- **RLS**: `auth.jwt()` 関数を通じて、行レベルのアクセス制御を実現

### 認証フロー

**クライアントサイドフロー**:
- ブラウザやモバイルアプリから直接 Supabase Auth API を呼び出す
- `supabase-js` クライアントライブラリを使用
- JWT はクライアント側で保持される

**サーバーサイドフロー（SSR）**:
- Next.js / SvelteKit 等のサーバーフレームワークから認証を行う
- `@supabase/ssr` パッケージを使用
- Cookie ベースのセッション管理
- `getUser()` でサーバー側でユーザーを検証（`getSession()` は信頼しない）

### ロール

| ロール | 説明 | 用途 |
|--------|------|------|
| `anon` | 未認証ユーザー | 公開データへのアクセス |
| `authenticated` | 認証済みユーザー | ユーザー固有のデータアクセス |
| `service_role` | サービスロール | RLS をバイパスする管理操作（サーバーサイドのみ） |

### 認証方式

- パスワード認証（メール / 電話番号）
- パスワードレス認証（OTP / Magic Link）
- ソーシャルログイン（OAuth 2.0 / OIDC）
- SSO / SAML
- 匿名認証
- 多要素認証（MFA）

## コード例

```typescript
import { createClient } from '@supabase/supabase-js'

// クライアント作成（anon key を使用）
const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// 認証状態の変更を監視
supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth event:', event)
  console.log('Session:', session)
})

// 現在のセッションを取得（クライアントサイドのみ）
const { data: { session } } = await supabase.auth.getSession()

// 現在のユーザーを取得（サーバーサイドで推奨）
const { data: { user } } = await supabase.auth.getUser()

// サービスロールクライアント（サーバーサイドのみ、RLS バイパス）
const supabaseAdmin = createClient(
  'https://your-project.supabase.co',
  'your-service-role-key',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

## 注意点

- `service_role` キーはサーバーサイドでのみ使用し、クライアントに露出させないこと
- `getSession()` はローカルストレージから取得するため、サーバーサイドでは `getUser()` を使用してトークンを検証すること
- `anon` キーはクライアントに公開されるが、RLS によりアクセスが制御される
- JWT の有効期限はデフォルトで 3600 秒（1 時間）

## 関連

- [ユーザー管理](./users.md)
- [セッション管理](./sessions.md)
- [JWT 構造](./jwts.md)
- [サーバーサイド認証](./server-side.md)
