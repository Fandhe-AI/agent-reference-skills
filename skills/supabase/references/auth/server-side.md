# サーバーサイド認証（SSR）

@supabase/ssr パッケージを使ったサーバーサイドでの認証管理。

## 概要

サーバーサイドレンダリング（SSR）フレームワークでは、`@supabase/ssr` パッケージを使用して Cookie ベースのセッション管理を行う。これにより、サーバーコンポーネントやミドルウェアで安全にユーザー認証を確認できる。

### @supabase/ssr の主な機能

- Cookie ベースのセッション管理（localStorage の代わり）
- PKCE フロー（デフォルト）
- サーバーコンポーネントでのユーザー取得
- ミドルウェアでのセッション更新

### getUser() vs getSession() の重要な違い

- **`getUser()`**: Auth サーバーに問い合わせてトークンを検証する。サーバーサイドで推奨
- **`getSession()`**: Cookie / ローカルストレージからセッションを取得するのみ。トークンの改ざんを検知できない

### 対応フレームワーク

- Next.js（App Router / Pages Router）
- SvelteKit
- Remix
- Nuxt
- Astro
- Express

## コード例

```typescript
// === インストール ===
// npm install @supabase/supabase-js @supabase/ssr

// ============================================================
// Next.js App Router での実装
// ============================================================

// --- lib/supabase/server.ts ---
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Server Component からの呼び出し時は set できない
          }
        },
      },
    }
  )
}

// --- lib/supabase/client.ts ---
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// --- middleware.ts ---
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // セッションを更新（トークンリフレッシュ）
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 未認証ユーザーを保護されたルートからリダイレクト
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

// --- app/auth/callback/route.ts ---
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}

// --- Server Component でのユーザー取得 ---
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 重要: getUser() を使う（getSession() ではなく）
  const { data: { user }, error } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // ユーザー固有のデータを取得
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return <div>Welcome, {profile?.display_name}</div>
}

// --- Server Action でのログイン ---
'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

## 注意点

- サーバーサイドでは必ず `getUser()` を使用すること。`getSession()` は Cookie の値をそのまま返すため、改ざんされたトークンを検知できない
- ミドルウェアで `getUser()` を呼ぶことで、期限切れトークンのリフレッシュが行われる
- Cookie の設定で `setAll` が失敗する場合がある（Server Component など）。`try-catch` で囲むこと
- `exchangeCodeForSession()` はコールバックルートで必ず呼ぶ必要がある（PKCE フロー）
- ミドルウェアの `matcher` で静的ファイルを除外すること（パフォーマンス対策）
- `@supabase/ssr` は `@supabase/auth-helpers-nextjs` の後継パッケージ。auth-helpers は非推奨
- Service Role キーはサーバーサイドでのみ使用し、環境変数 `SUPABASE_SERVICE_ROLE_KEY`（`NEXT_PUBLIC_` プレフィックスなし）に設定すること

## 関連

- [Auth 概要](./overview.md)
- [セッション管理](./sessions.md)
- [JWT 構造](./jwts.md)
- [リダイレクト URL](./redirect-urls.md)
