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
- Call `vi.clearAllMocks()` in `beforeEach`, or set `clearMocks: true` in config, to reset call history between tests
