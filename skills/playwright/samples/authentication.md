# Authentication

Authenticate once and reuse the session state across all tests.

```typescript
// tests/auth.setup.ts
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');

  // Save storage state (cookies + localStorage) for reuse
  await page.context().storageState({ path: authFile });
});
```

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

```typescript
// tests/example.spec.ts — starts already authenticated
import { test, expect } from '@playwright/test';

test('shows dashboard', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

## Passkeys (WebAuthn)

Register a passkey with the virtual authenticator in a setup test and save it in the storage state.

```typescript
// tests/passkey.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('register passkey', async ({ context, page }) => {
  // Install the virtual authenticator before the page touches navigator.credentials
  await context.credentials.install();

  await page.goto('https://example.com/register');
  await page.getByRole('button', { name: 'Create a passkey' }).click();

  // click() does not wait for the async WebAuthn registration. Wait for the app's success signal
  // (app-specific example: adapt to your UI, or use page.waitForResponse on your registration API)
  await expect(page.getByText('Passkey created')).toBeVisible();

  // Include the virtual WebAuthn credentials (passkeys) in the storage state
  await context.storageState({ path: 'playwright/.auth/passkey-state.json', credentials: true });
});
```

```typescript
// Restore the saved state into an existing context (v1.59+), or pass it as the storageState option
import { test } from '@playwright/test';

test('sign in with passkey', async ({ context, page }) => {
  // Clears existing state, applies the new one, and installs the virtual authenticator
  await context.setStorageState('playwright/.auth/passkey-state.json');

  await page.goto('https://example.com/login');
  // navigator.credentials.get() is answered with the restored passkey
});
```

```typescript
// Seed a known credential manually (BrowserContext.credentials)
const context = await browser.newContext();
const [credential] = await context.credentials.get({ rpId: 'example.com' }); // read back registered passkeys
await context.credentials.create('example.com', {
  id: knownCredentialId, // base64url
  userHandle: knownUserHandle, // base64url
  privateKey: knownPrivateKey, // base64url PKCS#8 (DER)
  publicKey: knownPublicKey, // base64url SPKI (DER)
});
await context.credentials.install();
```

## Notes

- Store `playwright/.auth/` in `.gitignore` to avoid committing credentials
- The `setup` project runs once before `dependencies` projects execute
- For tests that modify server-side state, use per-worker storage state via `testInfo.parallelIndex`
- Use `test.use({ storageState: 'path' })` to specify a role-specific auth file per test
- `credentials.install()` is required: seeding with `credentials.create()` without installing never exposes the credentials to the page. Restoring a storage state that contains credentials installs the virtual authenticator automatically and blocks real authenticators in that context
- Wait for registration to finish before `storageState()` or `credentials.get()`: the click handler starts an async `navigator.credentials.create()` and server registration call, so without a wait the saved state may lack the passkey
- `credentials.get()` returns private keys, so treat saved passkey files as secrets. `Credentials.create` accepts `signCount` since v1.64
- `storageState({ opfs: true })` (v1.63) includes the origin private file system in the snapshot; OPFS is not supported in ephemeral WebKit contexts. `indexedDB: true` (v1.51) includes IndexedDB
- Since v1.64 the `screen` of a `...devices['Desktop Chrome']` spread is forwarded, so `window.screen` and media queries see the emulated size. Opt out with `screen: undefined` after the spread
