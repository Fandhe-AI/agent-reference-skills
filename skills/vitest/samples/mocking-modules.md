# Mocking Modules

Replace module exports with controlled fakes using `vi.mock`.

```ts
import { beforeEach, expect, test, vi } from 'vitest'
import { notifyUser } from './notifications'

// Auto-mock: all exports become vi.fn()
vi.mock('./notifications')

test('calls notifyUser with the correct message', () => {
  notifyUser('welcome')
  expect(notifyUser).toHaveBeenCalledWith('welcome')
})
```

```ts
// Factory mock: supply a custom implementation
import { expect, test, vi } from 'vitest'
import { fetchProfile } from './profile'

vi.mock('./api', () => ({
  fetchProfile: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
}))

test('renders the fetched profile', async () => {
  const profile = await fetchProfile(1)
  expect(profile.name).toBe('Alice')
})
```

```ts
// Partial mock: keep real exports, override selected ones
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return {
    ...actual,
    dangerousOp: vi.fn().mockReturnValue('safe'),
  }
})
```

```ts
// vi.hoisted: share a mock reference across the hoisted vi.mock factory
const mockSend = vi.hoisted(() => vi.fn())

vi.mock('./mailer', () => ({ send: mockSend }))

test('sends an email', () => {
  mockSend.mockResolvedValueOnce({ ok: true })
  sendWelcomeEmail('user@example.com')
  expect(mockSend).toHaveBeenCalledOnce()
})
```

## Notes

- `vi.mock` is automatically hoisted to the top of the file — factory functions cannot close over variables defined after the call
- Use `vi.hoisted()` to define variables that need to be available inside the factory
- Default exports must be keyed as `default` in the factory object
- `clearMocks` defaults to `true` in v5 (it had to be enabled explicitly in v4): `vi.clearAllMocks()` runs before every test and clears call history, so history recorded in setup files or `beforeAll` is gone by the time a test asserts on it. Set `clearMocks: false` to restore the v4 behavior
- `vi.mock`, `vi.unmock`, and `vi.hoisted` must be at the module top level — calling them nested (inside `describe`, `test`, or a function) throws in v5. `vi.doMock` / `vi.doUnmock` are not hoisted and may be called anywhere
