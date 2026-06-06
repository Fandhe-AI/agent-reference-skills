# Describe and Hooks

Group related tests with `describe` and manage setup/teardown with lifecycle hooks.

```ts
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest'

describe('UserService', () => {
  let db: Database

  beforeAll(async () => {
    db = await Database.connect()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(() => {
    db.seed()
  })

  afterEach(() => {
    db.clean()
  })

  test('finds a user by id', async () => {
    const user = await db.findUser(1)
    expect(user).toMatchObject({ id: 1, name: 'Alice' })
  })

  test('throws when user not found', async () => {
    await expect(db.findUser(999)).rejects.toThrow('not found')
  })
})
```

## Notes

- `beforeAll` / `afterAll` run once per `describe` block; `beforeEach` / `afterEach` run around every test
- `describe` blocks can be nested; hooks apply to all tests in their scope
- Use `test.skip` to temporarily disable a test, `test.only` to run only that test during debugging
- `describe.concurrent` runs all tests within the block in parallel
