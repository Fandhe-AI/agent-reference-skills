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
// Enable 2FA and get TOTP URI
const { data } = await authClient.twoFactor.enable({ password: "user-password" });
const { data: qrData } = await authClient.twoFactor.getTotpUri({ password: "user-password" });
// qrData.totpURI → pass to a QR code library

// Verify TOTP code after sign-in
await authClient.twoFactor.verifyTotp({ code: "012345", trustDevice: true });

// Backup codes
const { data: codes } = await authClient.twoFactor.generateBackupCodes({ password: "user-password" });
await authClient.twoFactor.verifyBackupCode({ code: "123456", trustDevice: true });

// Disable 2FA
await authClient.twoFactor.disable({ password: "user-password" });
```

## Notes

- `twoFactor` plugin adds 1 field to the user table and 1 additional table; run `migrate` after adding it
- `trustDevice: true` skips 2FA on subsequent logins from the same device for the configured period
- `otpOptions.sendOTP` is required to support OTP-via-email as a second factor alternative to TOTP
- `twoFactorPage` in the client plugin is the route shown when 2FA is required during sign-in
