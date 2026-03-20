# 多要素認証（MFA）

TOTP と Phone（SMS）を使った多要素認証の実装。

## 概要

Supabase Auth の MFA（Multi-Factor Authentication）は、パスワード認証に加えて追加の認証要素を要求することで、セキュリティを強化する機能である。

### サポートされる MFA タイプ

| タイプ | 説明 | 認証アプリ |
|--------|------|-----------|
| **TOTP** | 時間ベースのワンタイムパスワード | Google Authenticator, Authy 等 |
| **Phone** | SMS で送信される OTP コード | SMS 対応端末 |

### AAL（Authenticator Assurance Level）

| レベル | 説明 |
|--------|------|
| `aal1` | 1 要素認証（パスワードのみ） |
| `aal2` | 2 要素認証（パスワード + MFA） |

### MFA フロー

1. **Enroll（登録）**: ユーザーが MFA 要素を登録
2. **Challenge（チャレンジ）**: 認証サーバーがチャレンジを作成
3. **Verify（検証）**: ユーザーが OTP コードで応答
4. **Unenroll（解除）**: MFA 要素を削除

## コード例

```typescript
// === TOTP の登録 ===

// 1. TOTP 要素を登録（QR コード生成）
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
  friendlyName: 'My Authenticator App',
})

if (data) {
  // QR コードを表示（ユーザーが認証アプリでスキャン）
  const qrCode = data.totp.qr_code // SVG 形式の QR コード
  const secret = data.totp.secret   // 手動入力用のシークレット
  const factorId = data.id

  // QR コードを画面に表示
  document.getElementById('qr')!.innerHTML = qrCode
}

// 2. 登録を確認（認証アプリのコードで検証）
const { data: challengeData, error: challengeError } =
  await supabase.auth.mfa.challenge({
    factorId: factorId,
  })

const { data: verifyData, error: verifyError } =
  await supabase.auth.mfa.verify({
    factorId: factorId,
    challengeId: challengeData.id,
    code: '123456', // 認証アプリのコード
  })

// === challengeAndVerify（便利メソッド） ===

// challenge + verify を 1 ステップで実行
const { data, error } = await supabase.auth.mfa.challengeAndVerify({
  factorId: factorId,
  code: '123456',
})

// === Phone MFA の登録 ===

// 1. Phone 要素を登録
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'phone',
  phone: '+819012345678',
  friendlyName: 'My Phone',
})

// 2. SMS で送信されたコードで検証
const { data: verifyData, error: verifyError } =
  await supabase.auth.mfa.challengeAndVerify({
    factorId: data.id,
    code: '123456',
  })

// === MFA 要素の一覧取得 ===

const { data: factors, error } = await supabase.auth.mfa.listFactors()

// verified な要素のみ
const verifiedFactors = factors?.totp.filter((f) => f.status === 'verified')
const phoneFactors = factors?.phone.filter((f) => f.status === 'verified')

// === ログイン時の MFA フロー ===

// 1. 通常のパスワードログイン（aal1）
const { data: signInData, error: signInError } =
  await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'password123',
  })

// 2. AAL レベルを確認
const { data: { currentLevel, nextLevel } } =
  await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

if (currentLevel === 'aal1' && nextLevel === 'aal2') {
  // MFA が必要 → MFA 検証画面を表示
  showMFAVerificationForm()
}

// 3. MFA コードで aal2 に昇格
const { data: factors } = await supabase.auth.mfa.listFactors()
const totpFactor = factors?.totp[0]

if (totpFactor) {
  const { data, error } = await supabase.auth.mfa.challengeAndVerify({
    factorId: totpFactor.id,
    code: '123456', // ユーザー入力
  })
}

// === MFA 要素の解除 ===

const { error } = await supabase.auth.mfa.unenroll({
  factorId: 'factor-uuid',
})

// === RLS での AAL チェック ===

// SQL: aal2 のユーザーのみアクセスを許可
// CREATE POLICY "Require MFA" ON public.sensitive_data
//   FOR ALL
//   TO authenticated
//   USING (
//     (auth.jwt() ->> 'aal') = 'aal2'
//   );

// SQL: auth.jwt() の session_id を使って AAL を確認
// CREATE POLICY "Require MFA" ON public.sensitive_data
//   FOR ALL
//   TO authenticated
//   USING (
//     EXISTS (
//       SELECT 1 FROM auth.sessions
//       WHERE id = (auth.jwt() ->> 'session_id')::uuid
//       AND aal = 'aal2'
//     )
//   );
```

## 注意点

- MFA の enroll 後、verify を完了しないと要素は `unverified` 状態のままになる
- `challengeAndVerify()` は `challenge()` + `verify()` のショートカットで、通常はこちらを使用する
- AAL レベルは JWT のクレームに含まれるため、RLS ポリシーで参照可能
- MFA が有効なユーザーがログインすると、最初は `aal1` でセッションが作成される。MFA 検証後に `aal2` に昇格する
- TOTP のシークレットは enroll 時にのみ表示される。紛失した場合は unenroll して再登録が必要
- Phone MFA は SMS プロバイダの設定が必要
- `listFactors()` は現在のユーザーの MFA 要素のみ返す

## 関連

- [Auth 概要](./overview.md)
- [パスワード認証](./passwords.md)
- [JWT 構造](./jwts.md)
- [Auth Hooks](./auth-hooks.md)
