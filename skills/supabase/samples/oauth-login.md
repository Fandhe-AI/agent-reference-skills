# OAuth Login

Sign in users via third-party OAuth providers such as Google and GitHub.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Redirect to provider login page
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: 'https://example.com/dashboard',
    scopes: 'email profile',
    queryParams: {
      access_type: 'offline',  // request refresh token
      prompt: 'consent',
    },
  },
})
// data.url contains the OAuth redirect URL

// GitHub login
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: { redirectTo: 'https://example.com/dashboard' },
})

// Magic link (passwordless email OTP)
const { data, error } = await supabase.auth.signInWithOtp({
  email: 'user@example.com',
  options: {
    emailRedirectTo: 'https://example.com/dashboard',
    shouldCreateUser: true,
  },
})

// Verify OTP token submitted by user
const { data, error } = await supabase.auth.verifyOtp({
  email: 'user@example.com',
  token: '123456',
  type: 'email',
})
```

## Notes

- OAuth providers must be enabled in the Supabase Dashboard under Authentication > Providers
- `redirectTo` must be listed in the allowed redirect URLs in the Dashboard
- Magic link OTP and email OTP share the same `signInWithOtp()` method; the user receives a link or 6-digit code depending on Dashboard settings
- After OAuth redirect, the session is automatically set by the client library from the URL hash/code
