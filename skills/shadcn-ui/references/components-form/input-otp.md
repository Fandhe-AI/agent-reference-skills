---
source: https://ui.shadcn.com/docs/components/base/input-otp
---

# Input OTP

Accessible one-time password component with copy-paste functionality.

## Signature / Usage

```bash
npx shadcn@latest add input-otp
```

Manual installation dependency:

```bash
npm install input-otp
```

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
```

```tsx
<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>
```

Custom pattern:

```tsx
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

;<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  ...
</InputOTP>
```

## Notes

- Built on top of the `input-otp` library by @guilherme_rodz; the docs page has no props table and points to https://input-otp.rodz.dev for the API.
- Controlled use: pass `value` and `onChange`. Disable with `disabled`. Show errors with `aria-invalid` on the slots.
- `REGEXP_ONLY_DIGITS` suits PIN codes (for example `maxLength={4}`); `REGEXP_ONLY_DIGITS_AND_CHARS` accepts letters and numbers.
- Radix / React Aria variants exist at https://ui.shadcn.com/docs/components/radix/input-otp and https://ui.shadcn.com/docs/components/aria/input-otp.
- This is the shadcn/ui copy-in component (source lives in your `components/ui/`), distinct from `@ark-ui/react` (skill ark-ui), `@chakra-ui/react` (skill chakra-ui) and the Rust fandhe-frontend crates (skill fandhe-frontend).

## Related

- [Field](./field.md)
- [Input](./input.md)
