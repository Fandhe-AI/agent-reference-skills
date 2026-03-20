# Auth MFA

多要素認証 (MFA) のクライアントサイドメソッド群。TOTP ベースの認証をサポート。

## メソッド一覧

### `enroll()`

新しい MFA ファクターを登録する。TOTP (Authenticator App) をサポート。

**Signature:**
```typescript
supabase.auth.mfa.enroll(params: MFAEnrollParams): Promise<AuthMFAEnrollResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
  issuer: 'MyApp',
  friendlyName: 'Authenticator App',
})

if (data) {
  // data.totp.qr_code — QR コードの SVG データ URI
  // data.totp.secret — TOTP シークレット（手動入力用）
  // data.totp.uri — otpauth:// URI
  // data.id — ファクター ID（後で使用）
}
```

**Parameters:**
- `factorType` (string) — ファクタータイプ（`'totp'`）
- `issuer` (string) — TOTP 発行者名。認証アプリに表示される（省略可）
- `friendlyName` (string) — ファクターのフレンドリー名（省略可）

**Returns:** `{ data: { id, type, totp: { qr_code, secret, uri } }, error }`

---

### `challenge()`

MFA チャレンジを作成する。検証ステップの前に呼び出す。

**Signature:**
```typescript
supabase.auth.mfa.challenge(params: { factorId: string }): Promise<AuthMFAChallengeResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.challenge({
  factorId: 'factor-uuid',
})

// data.id — チャレンジ ID（verify で使用）
```

**Parameters:**
- `factorId` (string) — 検証に使用するファクターの UUID

**Returns:** `{ data: { id, expires_at }, error }`

---

### `verify()`

MFA チャレンジを検証する。TOTP コードを送信して認証を完了する。

**Signature:**
```typescript
supabase.auth.mfa.verify(params: { factorId: string; challengeId: string; code: string }): Promise<AuthMFAVerifyResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.verify({
  factorId: 'factor-uuid',
  challengeId: 'challenge-uuid',
  code: '123456',
})

// 検証成功後、セッションが aal2 にアップグレードされる
```

**Parameters:**
- `factorId` (string) — ファクターの UUID
- `challengeId` (string) — チャレンジの UUID（`challenge()` の戻り値）
- `code` (string) — 認証アプリから取得した 6 桁のコード

**Returns:** `{ data: { access_token, token_type, expires_in, refresh_token, user }, error }`

---

### `challengeAndVerify()`

チャレンジの作成と検証を 1 ステップで行う。

**Signature:**
```typescript
supabase.auth.mfa.challengeAndVerify(params: { factorId: string; code: string }): Promise<AuthMFAVerifyResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.challengeAndVerify({
  factorId: 'factor-uuid',
  code: '123456',
})
```

**Parameters:**
- `factorId` (string) — ファクターの UUID
- `code` (string) — 認証アプリから取得した 6 桁のコード

**Returns:** `{ data: { access_token, token_type, expires_in, refresh_token, user }, error }`

---

### `unenroll()`

登録済みの MFA ファクターを解除する。

**Signature:**
```typescript
supabase.auth.mfa.unenroll(params: { factorId: string }): Promise<AuthMFAUnenrollResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.unenroll({
  factorId: 'factor-uuid',
})
```

**Parameters:**
- `factorId` (string) — 解除するファクターの UUID

**Returns:** `{ data: { id }, error }`

---

### `listFactors()`

現在のユーザーに登録されている全 MFA ファクターを取得する。

**Signature:**
```typescript
supabase.auth.mfa.listFactors(): Promise<AuthMFAListFactorsResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.listFactors()

// data.all — 全ファクター
// data.totp — TOTP ファクターのみ
```

**Parameters:** なし

**Returns:** `{ data: { all: Factor[], totp: Factor[] }, error }`

---

### `getAuthenticatorAssuranceLevel()`

現在のセッションの認証保証レベル (AAL) を取得する。

**Signature:**
```typescript
supabase.auth.mfa.getAuthenticatorAssuranceLevel(): Promise<AuthMFAGetAuthenticatorAssuranceLevelResponse>
```

**Usage:**
```typescript
const { data, error } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()

// data.currentLevel — 現在の AAL（'aal1' または 'aal2'）
// data.nextLevel — 達成可能な次の AAL
// data.currentAuthenticationMethods — 使用中の認証メソッド

if (data.currentLevel === 'aal1' && data.nextLevel === 'aal2') {
  // MFA 検証が必要
}
```

**Parameters:** なし

**Returns:** `{ data: { currentLevel, nextLevel, currentAuthenticationMethods }, error }`

---

## MFA フロー例

```typescript
// 1. ファクター登録
const { data: enrollData } = await supabase.auth.mfa.enroll({
  factorType: 'totp',
  friendlyName: 'My Authenticator',
})
// QR コードを表示: enrollData.totp.qr_code

// 2. 初回検証（登録確認）
const { data: verifyData } = await supabase.auth.mfa.challengeAndVerify({
  factorId: enrollData.id,
  code: userInputCode, // ユーザーが入力した 6 桁コード
})

// 3. ログイン後の MFA 検証
const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
if (aalData.currentLevel !== aalData.nextLevel) {
  const { data: factors } = await supabase.auth.mfa.listFactors()
  const totpFactor = factors.totp[0]

  const { data } = await supabase.auth.mfa.challengeAndVerify({
    factorId: totpFactor.id,
    code: userInputCode,
  })
}
```

---

## 注意点
- MFA は Dashboard で有効化する必要がある
- `enroll()` 後、`verify()` で初回検証を行わないとファクターは `unverified` 状態のまま
- `aal1` はパスワード認証のみ、`aal2` は MFA 検証済みを意味する
- RLS ポリシーで `auth.jwt() ->> 'aal'` を使って AAL レベルに基づくアクセス制御が可能
- TOTP コードは 30 秒ごとに更新される

## 関連
- [Auth](./auth.md)
- [Auth Admin](./auth-admin.md)
