# Test Utils

Test Utils プラグインは、Better Auth の統合テストおよび E2E テスト用の包括的なテストツールキットを提供する。テストデータ作成用ファクトリー、DB ヘルパー、認証ヘルパー、OTP キャプチャ機能を含む。

**重要**: テスト環境専用。本番環境には絶対にデプロイしないこと。

## セットアップ

### サーバー側

```typescript
import { betterAuth } from "better-auth"
import { testUtils } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        testUtils()
    ]
})
```

### テストヘルパーへのアクセス

```typescript
const ctx = await auth.$context
const test = ctx.test
```

## API メソッド

### ファクトリー（DB に保存されない）

**ユーザー作成**

```typescript
const user = test.createUser()
// { id: "...", email: "user-xxx@example.com", name: "Test User", emailVerified: true, ... }

const user = test.createUser({
    email: "alice@example.com",
    name: "Alice",
    emailVerified: false
})
```

**組織作成（organization プラグイン必要）**

```typescript
const org = test.createOrganization({
    name: "Acme Corp",
    slug: "acme-corp"
})
```

### DB ヘルパー

**ユーザー保存**

```typescript
const user = test.createUser({ email: "test@example.com" })
const savedUser = await test.saveUser(user)
```

**ユーザー削除**

```typescript
await test.deleteUser(user.id)
```

**組織保存/削除**

```typescript
const org = test.createOrganization({ name: "Test Org" })
const savedOrg = await test.saveOrganization(org)
await test.deleteOrganization(org.id)
```

**メンバー追加**

```typescript
const member = await test.addMember({
    userId: user.id,
    organizationId: org.id,
    role: "admin"
})
```

### 認証ヘルパー

**ログイン**

```typescript
const { session, user, headers, cookies, token } = await test.login({
    userId: user.id
})
// session - セッションオブジェクト
// user - ユーザーオブジェクト
// headers - セッション Cookie 付きの Headers オブジェクト
// cookies - Cookie 配列（Playwright/Puppeteer 用）
// token - セッショントークン文字列
```

**認証ヘッダー取得**

```typescript
const headers = await test.getAuthHeaders({ userId: user.id })

const session = await auth.api.getSession({ headers })
const response = await fetch("/api/protected", { headers })
```

**Cookie 取得**

```typescript
const cookies = await test.getCookies({
    userId: user.id,
    domain: "localhost"  // 任意、デフォルトは baseURL ドメイン
})

// Playwright
await context.addCookies(cookies)

// Puppeteer
for (const cookie of cookies) {
    await page.setCookie(cookie)
}
```

Cookie オブジェクト構造: `name`, `value`, `domain`, `path`, `httpOnly`, `secure`, `sameSite`

### OTP キャプチャ

OTP キャプチャはパッシブ。生成された OTP のコピーを保存し、送信を妨げない。

**セットアップ（Email OTP 連携）**

```typescript
export const auth = betterAuth({
    plugins: [
        testUtils({ captureOTP: true }),
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                // メール送信ロジック
            }
        })
    ]
})
```

**OTP 取得**

```typescript
await auth.api.sendVerificationOTP({
    body: { email: "user@example.com", type: "sign-in" }
})

const otp = test.getOTP("user@example.com")
// "123456"
```

**OTP クリア**

```typescript
test.clearOTPs()
```

## 設定オプション

| オプション | 型 | デフォルト | 説明 |
|---|---|---|---|
| `captureOTP` | boolean | `false` | テスト用 OTP キャプチャを有効化 |

## テスト例

### Vitest 統合テスト

```typescript
import { describe, it, expect, beforeAll } from "vitest"
import { auth } from "./auth"

describe("protected route", () => {
    let test

    beforeAll(async () => {
        const ctx = await auth.$context
        test = ctx.test
    })

    it("should return user data for authenticated request", async () => {
        const user = test.createUser({ email: "test@example.com" })
        await test.saveUser(user)

        const headers = await test.getAuthHeaders({ userId: user.id })
        const session = await auth.api.getSession({ headers })
        expect(session?.user.id).toBe(user.id)

        await test.deleteUser(user.id)
    })
})
```

### Playwright E2E テスト

```typescript
import { test, expect } from "@playwright/test"
import { auth } from "./auth"

test("dashboard shows user name", async ({ context, page }) => {
    const ctx = await auth.$context
    const testUtils = ctx.test

    const user = testUtils.createUser({ email: "e2e@example.com", name: "E2E User" })
    await testUtils.saveUser(user)

    const cookies = await testUtils.getCookies({ userId: user.id, domain: "localhost" })
    await context.addCookies(cookies)

    await page.goto("/dashboard")
    await expect(page.getByText("E2E User")).toBeVisible()

    await testUtils.deleteUser(user.id)
})
```

## 注意点

- テスト環境専用。本番ビルドに含めないこと
- 各テストは作成したデータをクリーンアップしてテスト汚染を防ぐべき
- OTP キャプチャ機能は本番で有効にしないこと
- テストヘルパーで作成されたトークンはテスト環境でのみ有効
