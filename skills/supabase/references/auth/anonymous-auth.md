# 匿名認証

匿名ユーザーの作成と、認証済みアカウントへの変換。

## 概要

匿名認証は、ユーザーがメールアドレスやパスワードを提供せずに一時的なアカウントを作成できる機能である。チェックアウト前のカート保存や、サインアップ前のアプリ体験など、一時的なアクセスを提供する場合に有用。

### 主な特徴

- `signInAnonymously()` で即座にセッションが作成される
- `auth.users` テーブルに `is_anonymous = true` のユーザーが作成される
- 匿名ユーザーは後から `linkIdentity()` や `updateUser()` で認証済みアカウントに変換可能
- RLS ポリシーで `is_anonymous` フラグを使って匿名ユーザーのアクセスを制御可能

### ダッシュボード設定

Auth > Providers > Anonymous Sign-Ins で「Enable Anonymous Sign-Ins」を有効にする必要がある。

## コード例

```typescript
// === 匿名サインイン ===

const { data, error } = await supabase.auth.signInAnonymously()

if (data.user) {
  console.log('Anonymous user:', data.user.id)
  console.log('Is anonymous:', data.user.is_anonymous) // true
}

// 匿名ユーザーでもデータの読み書きが可能（RLS による制御）
const { data: todos, error: todoError } = await supabase
  .from('todos')
  .insert({ title: 'My todo', user_id: data.user?.id })

// === 匿名ユーザーを認証済みアカウントに変換 ===

// 方法 1: メールとパスワードを設定
const { data, error } = await supabase.auth.updateUser({
  email: 'user@example.com',
  password: 'securePassword123!',
})
// メール確認リンクが送信される
// 確認後、is_anonymous が false になる

// 方法 2: OAuth プロバイダをリンク
const { data, error } = await supabase.auth.linkIdentity({
  provider: 'google',
})
// Google 認証後、is_anonymous が false になる

// 方法 3: 電話番号を設定
const { data, error } = await supabase.auth.updateUser({
  phone: '+819012345678',
})
// OTP で確認後、is_anonymous が false になる

// === 匿名ユーザーの状態確認 ===

const { data: { user } } = await supabase.auth.getUser()

if (user?.is_anonymous) {
  // サインアップを促すUIを表示
  showSignUpPrompt()
} else {
  // 認証済みユーザーの通常UI
  showDashboard()
}

// === RLS での匿名ユーザー制御 ===

// SQL: 匿名ユーザーは読み取りのみ許可
// CREATE POLICY "Anonymous users can read" ON public.posts
//   FOR SELECT
//   TO authenticated
//   USING (true);
//
// CREATE POLICY "Only non-anonymous users can insert" ON public.posts
//   FOR INSERT
//   TO authenticated
//   WITH CHECK (
//     (SELECT is_anonymous FROM auth.users WHERE id = auth.uid()) = false
//   );

// SQL: JWT の is_anonymous クレームを使用（より効率的）
// CREATE POLICY "Only non-anonymous can insert" ON public.posts
//   FOR INSERT
//   TO authenticated
//   WITH CHECK (
//     (auth.jwt() ->> 'is_anonymous')::boolean = false
//   );

// === onAuthStateChange での変換検知 ===

supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'USER_UPDATED' && session?.user && !session.user.is_anonymous) {
    // 匿名ユーザーが認証済みに変換された
    console.log('User converted from anonymous to authenticated')
  }
})
```

## 注意点

- 匿名認証はダッシュボードで明示的に有効化する必要がある
- 匿名ユーザーのデータは、アカウント変換後もそのまま引き継がれる（user_id が同じ）
- 匿名ユーザーの JWT にも `authenticated` ロールが付与されるため、RLS ポリシーで `is_anonymous` を使って明示的に制御すること
- 匿名ユーザーがブラウザのストレージをクリアすると、そのアカウントにアクセスできなくなる
- 大量の匿名ユーザーが作成される可能性があるため、定期的なクリーンアップを検討すること
- CAPTCHA を有効にすることで、匿名アカウントの不正な大量作成を防止できる

## 関連

- [Auth 概要](./overview.md)
- [ユーザー管理](./users.md)
- [ID 管理・アカウントリンク](./identities.md)
- [CAPTCHA](./captcha.md)
