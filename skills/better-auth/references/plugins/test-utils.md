# Test Utils

The Test Utils plugin provides a comprehensive testing toolkit for Better Auth integration and E2E tests. It includes factories for test data, DB helpers, auth helpers, and an OTP capture feature.

**Important**: for test environments only. Never deploy to production.

## Signature / Usage

### Setup (server side)

```typescript
import { betterAuth } from "better-auth"
import { testUtils } from "better-auth/plugins"

export const auth = betterAuth({
    plugins: [
        testUtils()
    ]
})
```

### Accessing test helpers

```typescript
const ctx = await auth.$context
const test = ctx.test
```

### Factory (not persisted to DB): create user

```typescript
const user = test.createUser()
// { id: "...", email: "user-xxx@example.com", name: "Test User", emailVerified: true, ... }

const user = test.createUser({
    email: "alice@example.com",
    name: "Alice",
    emailVerified: false
})
```

### Factory (not persisted to DB): create organization (requires the organization plugin)

```typescript
const org = test.createOrganization({
    name: "Acme Corp",
    slug: "acme-corp"
})
```

### DB helper: save user

```typescript
const user = test.createUser({ email: "test@example.com" })
const savedUser = await test.saveUser(user)
```

### DB helper: delete user

```typescript
await test.deleteUser(user.id)
```

### DB helper: save/delete organization

```typescript
const org = test.createOrganization({ name: "Test Org" })
const savedOrg = await test.saveOrganization(org)
await test.deleteOrganization(org.id)
```

### DB helper: add member

```typescript
const member = await test.addMember({
    userId: user.id,
    organizationId: org.id,
    role: "admin"
})
```

### Auth helper: log in

```typescript
const { session, user, headers, cookies, token } = await test.login({
    userId: user.id
})
// session - session object
// user - user object
// headers - a Headers object with the session cookie attached
// cookies - an array of cookies (for Playwright/Puppeteer)
// token - the session token string
```

### Auth helper: get auth headers

```typescript
const headers = await test.getAuthHeaders({ userId: user.id })

const session = await auth.api.getSession({ headers })
const response = await fetch("/api/protected", { headers })
```

### Auth helper: get cookies

```typescript
const cookies = await test.getCookies({
    userId: user.id,
    domain: "localhost"  // optional, defaults to the baseURL domain
})

// Playwright
await context.addCookies(cookies)

// Puppeteer
for (const cookie of cookies) {
    await page.setCookie(cookie)
}
```

Cookie object shape: `name`, `value`, `domain`, `path`, `httpOnly`, `secure`, `sameSite`

### OTP capture: setup (Email OTP integration)

OTP capture is passive. It stores a copy of the generated OTP without interfering with delivery.

```typescript
export const auth = betterAuth({
    plugins: [
        testUtils({ captureOTP: true }),
        emailOTP({
            async sendVerificationOTP({ email, otp }) {
                // Email-sending logic
            }
        })
    ]
})
```

### OTP capture: get OTP

```typescript
await auth.api.sendVerificationOTP({
    body: { email: "user@example.com", type: "sign-in" }
})

const otp = test.getOTP("user@example.com")
// "123456"
```

### OTP capture: clear OTPs

```typescript
test.clearOTPs()
```

### Test example (Vitest integration test)

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

### Test example (Playwright E2E test)

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

## Options / Props

| Option | Type | Default | Description |
|---|---|---|---|
| `captureOTP` | boolean | `false` | Enables OTP capture for testing |

## Notes

- For test environments only. Do not include in production builds
- Each test should clean up the data it created to avoid test pollution
- Do not enable the OTP capture feature in production
- Tokens created by test helpers are valid only in the test environment
