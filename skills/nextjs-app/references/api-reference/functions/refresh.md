# refresh

`refresh` refreshes the client router from within a Server Action.

## Signature / Usage

```ts
'use server'

import { refresh } from 'next/cache'

export async function createPost(formData: FormData) {
  const post = await db.post.create({
    data: { title: formData.get('title'), content: formData.get('content') },
  })
  refresh()
}
```

```tsx
refresh(): void
```

## Notes

- Can **only** be called from within Server Actions — throws an error if used in Route Handlers, Client Components, or any other context.
- Does not return a value.

## Related

- [revalidatePath](./revalidatePath.md)
- [revalidateTag](./revalidateTag.md)
