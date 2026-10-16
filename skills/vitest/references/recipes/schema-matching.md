# Schema-Driven Assertions

`expect.schemaMatching` (since 4.0.0) is an asymmetric matcher that accepts any Standard Schema v1 object (Zod, Valibot, ArkType) and passes if the value conforms.

## Signature / Usage

```ts
import { expect, test } from 'vitest'
import { z } from 'zod'

test('email validation', () => {
  const user = { email: 'john@example.com' }

  expect(user).toEqual({
    email: expect.schemaMatching(z.string().email()),
  })
})
```

Other Standard Schema libraries:

```ts
import { expect, test } from 'vitest'
import { z } from 'zod'
import * as v from 'valibot'
import { type } from 'arktype'

const user = { email: 'john@example.com' }

// Zod
expect(user).toEqual({
  email: expect.schemaMatching(z.string().email()),
})

// Valibot
expect(user).toEqual({
  email: expect.schemaMatching(v.pipe(v.string(), v.email())),
})

// ArkType
expect(user).toEqual({
  email: expect.schemaMatching(type('string.email')),
})
```

Verifying call arguments:

```ts
import { expect, test, vi } from 'vitest'
import { z } from 'zod'

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  createdAt: z.date(),
})

test('persists a valid user', () => {
  const repo = { save: vi.fn() }
  registerUser(repo, { email: 'a@b.com' })

  expect(repo.save).toHaveBeenCalledWith(expect.schemaMatching(UserSchema))
})
```

## Notes

- Composes inside any equality check like `expect.any` / `expect.stringMatching`: `toEqual` / `toStrictEqual`, `toMatchObject`, `toContainEqual`, `toThrow`, `toHaveBeenCalledWith`, `toHaveReturnedWith`, `toHaveBeenResolvedWith`.
- Useful for generated fields (UUIDs, timestamps) where the format can be validated without predicting the value.
- Source: https://vitest.dev/guide/recipes/schema-matching (Vitest v5.0.5)

## Related

- [expect](../api/expect.md)
