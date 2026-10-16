# Credentials (virtual WebAuthn / passkeys)

`Credentials` (since v1.61) is a virtual WebAuthn authenticator scoped to a `BrowserContext`, accessed as `context.credentials`. It registers passkeys and answers `navigator.credentials.create()` / `navigator.credentials.get()` ceremonies without a real authenticator.

## Signature / Usage

```ts
const context = await browser.newContext();

// A passkey your backend already provisioned for a test user.
await context.credentials.create('example.com', {
  id: knownCredentialId, // base64url
  userHandle: knownUserHandle, // base64url
  privateKey: knownPrivateKey, // base64url PKCS#8 (DER)
  publicKey: knownPublicKey, // base64url SPKI (DER)
});
await context.credentials.install();

const page = await context.newPage();
await page.goto('https://example.com/login');
// The page's navigator.credentials.get() is answered with the seeded passkey.
```

Capture a passkey the app registered, then reuse it:

```ts
// setup test
const context = await browser.newContext();
await context.credentials.install();
const page = await context.newPage();
await page.goto('https://example.com/register');
await page.getByRole('button', { name: 'Create a passkey' }).click();
// click() does not wait for the async WebAuthn registration; wait for the app's success signal
// (app-specific, or page.waitForResponse on the registration API)
await expect(page.getByText('Passkey created')).toBeVisible();
const [credential] = await context.credentials.get({ rpId: 'example.com' });
if (!credential) throw new Error('passkey not registered');
fs.writeFileSync('playwright/.auth/passkey.json', JSON.stringify(credential));

// later test
const saved = JSON.parse(fs.readFileSync('playwright/.auth/passkey.json', 'utf8'));
await context.credentials.create(saved.rpId, saved);
await context.credentials.install();
```

A third approach: save credentials in the storage state by setting `BrowserContext.storageState` option `credentials` (see the authentication guide).

## Methods

| Method | Description |
|--------|-------------|
| `install()` | Installs the virtual authenticator, overriding `navigator.credentials.create()` / `get()` in all current and future pages. Call before the page first touches `navigator.credentials`. Required: without it, seeded credentials are never seen by the page. (v1.61) |
| `create(rpId, options?)` | Seeds a virtual credential and returns a `VirtualCredential`. With only `rpId`, generates a fresh ECDSA P-256 keypair, id and user handle. (v1.61) |
| `delete(id)` | Removes a credential by base64url id; works for seeded and page-registered credentials. (v1.61) |
| `get(options?)` | Returns every credential held by the authenticator, optionally filtered by `rpId` or `id`. Includes private/public keys and current `signCount`. (v1.61) |

## Options / Props

### create options

| Name | Type | Description |
|------|------|-------------|
| `rpId` (param) | string | Relying party id (typically the site's effective domain) |
| `id` | string | Base64url credential id. Auto-generated if omitted |
| `userHandle` | string | Base64url user handle. Auto-generated if omitted |
| `privateKey` | string | Base64url PKCS#8 (DER) private key. Auto-generated if omitted |
| `publicKey` | string | Base64url SPKI (DER) public key. Auto-generated if omitted |
| `signCount` | int | Initial signature counter (v1.64). First assertion reports `signCount + 1`. Defaults to `0` |

To import a known credential, supply all four of `id`, `userHandle`, `privateKey` and `publicKey` together.

### get options

| Name | Type | Description |
|------|------|-------------|
| `rpId` | string | Only return credentials for this relying party id |
| `id` | string | Only return the credential with this base64url id |

### VirtualCredential

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Base64url credential id |
| `rpId` | string | Relying party id |
| `userHandle` | string | Base64url user handle |
| `privateKey` | string | Base64url PKCS#8 (DER) private key |
| `publicKey` | string | Base64url SPKI (DER) public key |
| `signCount` | int | Signature counter reported in the most recent assertion |

## Notes

- Defaults: presents as a platform authenticator (`authenticatorAttachment` is `'platform'`) and `PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()` resolves to `true`.
- Seeded credentials are discoverable (resident), so username-then-passkey and usernameless flows both resolve them.
- Fresh keys are ECDSA P-256 (COSE algorithm `-7`). An omitted `id` or `userHandle` is filled with 16 random bytes.
- The signature counter starts at `0` and is incremented by one on every successful `navigator.credentials.get()` assertion.
- Returned credentials include the private key; treat saved files such as `passkey.json` as secrets.
- `click()` does not wait for the asynchronous WebAuthn registration (`navigator.credentials.create()`) or the app's server-side registration request to finish. Before calling `credentials.get()` or `storageState()`, wait for the app's success UI or a successful registration API response; otherwise the credential may be `undefined` or missing from the saved state.
- The upstream example calls `credentials.get()` immediately after `click()`; the "Capture a passkey" example on this page adds a wait for the success UI (and a guard against `undefined`) to avoid that race.
- Source: https://playwright.dev/docs/api/class-credentials (microsoft/playwright v1.64.1 `docs/src/api/class-credentials.md`)

## Related

- [browser-context.md](./browser-context.md)
- [page.md](./page.md)
