# Parallel + Intercepting Routes Modal

Open `/login` as a modal overlay via client-side navigation while keeping `/login` a full shareable page on direct visit, using a parallel `@auth` slot intercepted with `(.)`.

```
app/
  layout.tsx
  page.tsx
  login/
    page.tsx        # Full page shown on direct visit / refresh
  @auth/
    default.tsx      # Fallback (null) when the slot is inactive
    (.)login/
      page.tsx        # Intercepted modal version of /login
```

```tsx
// app/layout.tsx
export default function Layout({
  auth,
  children,
}: {
  auth: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      <div>{auth}</div>
      <div>{children}</div>
    </>
  )
}
```

```tsx
// app/@auth/default.tsx
export default function Default() {
  return null
}
```

```tsx
// app/@auth/(.)login/page.tsx
import { Modal } from '@/app/ui/modal'
import { Login } from '@/app/ui/login'

export default function Page() {
  return (
    <Modal>
      <Login />
    </Modal>
  )
}
```

```tsx
// app/ui/modal.tsx
'use client'

import { useRouter } from 'next/navigation'

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      <button onClick={() => router.back()}>Close modal</button>
      <div>{children}</div>
    </>
  )
}
```

## Notes

- `@auth` is a named slot (`@folder` convention) passed as a prop to the shared `layout.tsx`; slots do not affect the URL.
- `(.)login` intercepts the `login` segment at the **same** level as `@auth` (route-segment level, not file-system level); use `(..)`, `(..)(..)`, or `(...)` to intercept segments one/two levels above or from the app root.
- On hard navigation (refresh / direct link to `/login`), Next.js renders the real `app/login/page.tsx` instead of the intercepted modal.
- `default.tsx` returning `null` is required so the `@auth` slot renders nothing when no modal route is active; without it, unmatched slots 404 on refresh.
