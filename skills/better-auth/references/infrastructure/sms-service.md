# SMS Service

Managed SMS for OTP codes (phone verification, two-factor, sign-in OTP), via `sendSMS` / `createSMSSender` from `@better-auth/infra`.

## Signature / Usage

```ts
import { sendSMS } from "@better-auth/infra";

await sendSMS({
  to: "+1234567890",
  code: "123456",
  template: "phone-verification",
});
```

```ts
async function sendSMS(
  options: SendSMSOptions,
  config?: SMSConfig
): Promise<SendSMSResult>

const sender = createSMSSender(config?: SMSConfig);
await sender.send(options: SendSMSOptions);

interface SMSConfig {
  apiKey?: string;   // Your Better Auth Infrastructure API key
  apiUrl?: string;   // Custom API URL (optional)
}

interface SendSMSResult {
  success: boolean;
  messageId?: string;  // SMS provider message ID
  error?: string;      // Error message if failed
}
```

## Options / Props

`SendSMSOptions`:

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| to | string | Yes | Phone number in E.164 format |
| code | string | Yes | The OTP code to send |
| template | SMSTemplateId | No | Template to use (defaults to generic) |

Templates:

| Template | Example message |
| --- | --- |
| phone-verification | Your verification code is 123456. It expires in 10 minutes. |
| two-factor | Your two-factor authentication code is 123456. Do not share this code with anyone. |
| sign-in-otp | Your sign-in code is 123456. It expires in 10 minutes. |
| (none) | Your verification code is 123456. |

Plan requirements: Transactional SMS is not available on Starter; available on Pro, Business, Enterprise.

## Notes

- SMS delivery is intended to only be used for authentication flows.
- Phone numbers must be E.164 (`+[country code][number]`), e.g. `+14155551234`. No missing `+`, spaces, dashes, or parentheses.
- `BETTER_AUTH_API_KEY` and optional `BETTER_AUTH_API_URL=https://api.betterauth.com` are read from the environment.
- With `dash()` or `sentinel()` and Better Auth phone authentication, SMS is sent automatically for phone verification, phone-based 2FA, and phone OTP sign-in; no manual `sendSMS()` call is needed.
- Documented error strings: `"API key not configured"` (missing `BETTER_AUTH_API_KEY`), `"Invalid phone number"` (not E.164).

```ts
import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { dash, sendSMS } from "@better-auth/infra";

export const auth = betterAuth({
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }) => {
        await sendSMS({ to: phoneNumber, code, template: "phone-verification" });
      },
    }),
    dash({ apiKey: process.env.BETTER_AUTH_API_KEY }),
  ],
});
```
- Source: https://www.better-auth.com/docs/infrastructure/services/sms (better-auth v1.7.10 docs)

## Related

- [Email Service](./email-service.md)
- [Dashboard Plugin (dash)](./dashboard.md)
