# Mocking Dates

Control the system date in tests with fake timers. Vitest uses the `@sinonjs/fake-timers` package for manipulating timers as well as the system date.

## Signature / Usage

```js
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const businessHours = [9, 17]

function purchase() {
  const currentHour = new Date().getHours()
  const [open, close] = businessHours

  if (currentHour > open && currentHour < close) {
    return { message: 'Success' }
  }

  return { message: 'Error' }
}

describe('purchasing flow', () => {
  beforeEach(() => {
    // tell vitest we use mocked time
    vi.useFakeTimers()
  })

  afterEach(() => {
    // restoring date after each test run
    vi.useRealTimers()
  })

  it('allows purchases within business hours', () => {
    // set hour within business hours
    const date = new Date(2000, 1, 1, 13)
    vi.setSystemTime(date)

    // access Date.now() will result in the date set above
    expect(purchase()).toEqual({ message: 'Success' })
  })

  it('disallows purchases outside of business hours', () => {
    // set hour outside business hours
    const date = new Date(2000, 1, 1, 19)
    vi.setSystemTime(date)

    // access Date.now() will result in the date set above
    expect(purchase()).toEqual({ message: 'Error' })
  })
})
```

## Notes

- Source: https://vitest.dev/guide/mocking/dates (docs at tag `v5.0.5`).
- Vitest 5: fake timers and `vi.setSystemTime()` also mock `Temporal`; opt out with `vi.useFakeTimers({ toNotFake: ['Temporal'] })`.

## Related

- [Mocking Patterns](./mocking.md)
- [Async testing patterns](./async.md)
