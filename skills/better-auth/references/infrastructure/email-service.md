# Email Service

Managed transactional email with pre-built templates, via `sendEmail` / `createEmailSender` from `@better-auth/infra`.

## Signature / Usage

```ts
import { sendEmail } from "@better-auth/infra";

await sendEmail({
  template: "verify-email",
  to: "user@example.com",
  variables: {
    verificationUrl: "https://yourapp.com/verify?token=abc123",
    userEmail: "user@example.com",
    userName: "John",
    appName: "Your App",
  },
});
```

Reusable sender:

```ts
import { createEmailSender } from "@better-auth/infra";

const emailSender = createEmailSender({
  apiKey: process.env.BETTER_AUTH_API_KEY,
  apiUrl: process.env.BETTER_AUTH_API_URL,
});

await emailSender.send({
  template: "reset-password",
  to: "user@example.com",
  variables: {
    resetLink: "https://yourapp.com/reset?token=xyz",
    userEmail: "user@example.com",
  },
});
```

```ts
interface EmailConfig {
  apiKey?: string;   // Your Better Auth Infrastructure API key
  apiUrl?: string;   // Custom API URL (optional)
}

interface SendEmailResult {
  success: boolean;
  messageId?: string;  // Email provider message ID
  error?: string;      // Error message if failed
}
```

## Options / Props

Templates and their variables (optional variables in parentheses):

| Template | Required variables | Optional variables |
| --- | --- | --- |
| verify-email | verificationUrl, userEmail | verificationCode, userName, appName, expirationMinutes |
| reset-password | resetLink, userEmail | userName, appName, expirationMinutes |
| change-email | confirmationLink, newEmail, currentEmail | userName, appName, expirationMinutes |
| sign-in-otp | otpCode, userEmail | appName, expirationMinutes |
| verify-email-otp | otpCode, userEmail | appName, expirationMinutes |
| reset-password-otp | otpCode, userEmail | appName, expirationMinutes |
| magic-link | magicLink, userEmail | appName, expirationMinutes |
| two-factor | otpCode, userEmail | userName, appName, expirationMinutes |
| invitation | inviteLink, inviterName, inviterEmail, organizationName, role | appName, expirationDays |
| application-invite | inviteLink, inviterName, inviterEmail, inviteeEmail | appName, expirationDays |
| delete-account | deletionLink, userEmail | userName, appName, expirationMinutes |
| stale-account-user | userEmail, daysSinceLastActive, loginTime | userName, appName, loginLocation, loginDevice, loginIp |
| stale-account-admin | userEmail, userId, adminEmail, daysSinceLastActive, loginTime | userName, appName, loginLocation, loginDevice, loginIp |

Plan requirements: Transactional Email is not available on Starter; available on Pro, Business, Enterprise.

## Notes

- Environment variables read automatically: `BETTER_AUTH_API_KEY`, and optionally `BETTER_AUTH_API_URL=https://api.betterauth.com`. This is the value shown in the Email/SMS service docs; the `dash()` / `sentinel()` plugin option `apiUrl` is a separate setting whose documented default is `https://dash.better-auth.com`.
- Overview lists multiple provider support (AWS SES, SendGrid, Resend), type-safe template variables, and deliverability optimization.
- Avoid awaiting the email sending in production to prevent timing attacks. On serverless platforms, use `waitUntil` or similar to ensure the email is sent without blocking the response. (Integration section note.)
- The official integration example awaits `sendEmail`; it is shown here with `void` (the pattern used in the email-password docs) per the official warning, so the response does not wait for delivery. On serverless platforms pass the promise to `waitUntil` or similar. (https://www.better-auth.com/docs/authentication/email-password)
- Source: https://www.better-auth.com/docs/infrastructure/services/email (better-auth v1.7.10 docs)
- Integration with Better Auth flows:

```ts
import { betterAuth } from "better-auth";
import { sendEmail } from "@better-auth/infra";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    async sendResetPassword({ user, url }) {
      void sendEmail({
        template: "reset-password",
        to: user.email,
        variables: {
          resetLink: url,
          userEmail: user.email,
          userName: user.name,
          appName: "Your App",
        },
      });
    },
  },
});
```

## Related

- [SMS Service](./sms-service.md)
- [Getting Started](./getting-started.md)
