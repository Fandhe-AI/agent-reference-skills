# Email Auth

Sign up, sign in, and sign out users with email and password.

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Sign up a new user
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: { display_name: 'John Doe' },
    emailRedirectTo: 'https://example.com/welcome',
  },
})
// data.session is null until email is confirmed

// Sign in with email + password
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword',
})
const { user, session } = data

// Get the currently signed-in user (verified server-side)
const { data: { user }, error } = await supabase.auth.getUser()

// Listen to auth state changes
const { data: { subscription } } = supabase.auth.onAuthStateChange(
  (event, session) => {
    if (event === 'SIGNED_IN') console.log('Signed in:', session?.user)
    if (event === 'SIGNED_OUT') console.log('Signed out')
  }
)

// Sign out (current session)
await supabase.auth.signOut()

// Clean up listener
subscription.unsubscribe()
```

## Notes

- `signUp()` returns `session: null` when email confirmation is enabled; wait for the user to click the confirmation link
- Use `getUser()` (server-verified) rather than `getSession()` (local cache) for authoritative user checks
- `onAuthStateChange` fires `INITIAL_SESSION` on page load; register it early in app initialization
- Minimum password length is 6 characters by default
