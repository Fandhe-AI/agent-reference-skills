# Two-Factor Authentication

Add TOTP-based 2FA using the `twoFactor` plugin.

```typescript
// Server: add the plugin
import { betterAuth } from "better-auth";
import { twoFactor } from "better-auth/plugins";

export const auth = betterAuth({
  appName: "My App",
  plugins: [
    twoFactor({
      issuer: "my-app-name",
      otpOptions: {
        async sendOTP({ user, otp }, ctx) {
          await sendEmail({ to: user.email, subject: "Your OTP", text: otp });
        },
      },
    }),
  ],
});
```

```bash
# Apply schema changes
npx auth migrate
```

```typescript
// Client: register the plugin
import { createAuthClient } from "better-auth/client";
import { twoFactorClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [
    twoFactorClient({ twoFactorPage: "/two-factor" }),
  ],
});
```

```typescript
// Enable 2FA: method "totp" (default) returns { method, totpURI, backupCodes }
const { data } = await authClient.twoFactor.enable({ password: "user-password" });
// data.totpURI → pass to a QR code library

// method "otp" returns { method } and enables 2FA immediately (requires otpOptions.sendOTP)
await authClient.twoFactor.enable({ password: "user-password", method: "otp" });

const { data: qrData } = await authClient.twoFactor.getTotpUri({ password: "user-password" });

// Verify TOTP code after sign-in
await authClient.twoFactor.verifyTotp({ code: "012345", trustDevice: true });

// Backup codes
const { data: codes } = await authClient.twoFactor.generateBackupCodes({ password: "user-password" });
await authClient.twoFactor.verifyBackupCode({ code: "123456", trustDevice: true });

// Disable 2FA
await authClient.twoFactor.disable({ password: "user-password" });
```

## Notes

- `twoFactor.enable` returns a discriminated response: `{ method: "totp", totpURI, backupCodes }` for `totp`, `{ method: "otp" }` for `otp`
- With `totp`, `twoFactorEnabled` stays `false` until the user verifies a TOTP code (unless the server plugin sets `skipVerificationOnEnable: true`); with `otp` it becomes `true` immediately
- `twoFactor` plugin adds 1 field to the user table and 1 additional table; run `migrate` after adding it
- `trustDevice: true` skips 2FA on subsequent logins from the same device; `twoFactorPage` is the route shown when 2FA is required during sign-in
