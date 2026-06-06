# API キー

Supabase プロジェクトへのアクセスに使用する API キーの種類と使い分け。

## 概要

API キーはプロジェクトへのリクエストを識別するための第一層のアクセス制御。ユーザー認証（Auth）とは別の概念であり、「どのアプリコンポーネントがアクセスするか」を識別する。

## キーの種類

| キー | 新形式 | 旧形式（JWT） | 権限 | 使用場所 |
|------|--------|-------------|------|---------|
| Publishable（公開） | `sb_publishable_...` | `anon` | 低権限（RLS が適用される） | クライアントサイド、ソースコード、GitHub Actions |
| Secret（秘密） | `sb_secret_...` | `service_role` | 高権限（RLS バイパス） | バックエンドのみ（サーバー、Edge Functions） |

### Publishable キー

- Web ページ・モバイルアプリ・CLIなどに埋め込んで使用可能
- `anon` ロール（ログイン前）または `authenticated` ロール（Auth 後）で PostgreSQL にアクセス
- RLS ポリシーによって保護される
- ブラウザの JavaScript から安全に使用可能

### Secret キー

- バックエンドコンポーネント（サーバー、Admin API、Edge Functions）でのみ使用
- `service_role` PostgreSQL ロールで RLS をバイパスしてフルアクセス
- 新形式の secret キーはブラウザで使用すると HTTP 401 を返す（旧 JWT 形式は保護なし）
- 公開リポジトリやクライアントコードに絶対に含めないこと

## 廃止スケジュール

旧 JWT 形式（`anon` / `service_role`）は **2026 年末**に廃止予定。
新規プロジェクトでは新形式（`sb_publishable_...` / `sb_secret_...`）を使用する。

## コード例

```typescript
// Publishable キーを使った初期化（クライアントサイド）
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! // または SUPABASE_ANON_KEY
)

// Secret キーを使った Admin クライアント（サーバーサイドのみ）
const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!, // または SUPABASE_SERVICE_ROLE_KEY
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
```

## 注意点

- Secret キーは必ず環境変数に格納し、クライアントバンドルに含めない
- `NEXT_PUBLIC_` などのプレフィックスが付いた環境変数はクライアントに露出するため、secret キーには使用しない
- RLS を適切に設定すれば、publishable キーをソースコードに含めても安全
- キーは Settings > API（ダッシュボード）で確認・ローテーション可能

## 関連

- [./quickstarts.md](./quickstarts.md) — クイックスタート
- [../auth/overview.md](../auth/overview.md) — 認証概要
- [../database/secure-data.md](../database/secure-data.md) — RLS によるデータ保護
