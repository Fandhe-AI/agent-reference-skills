# Mocking Timers

Speed up tests of timeouts and intervals with fake timers that mock `setTimeout` and `setInterval`. Fake timers only move when advanced, or when one of the waiting APIs below runs.

## Signature / Usage

```js
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

function executeAfterTwoHours(func) {
  setTimeout(func, 1000 * 60 * 60 * 2) // 2 hours
}

function executeEveryMinute(func) {
  setInterval(func, 1000 * 60) // 1 minute
}

const mock = vi.fn(() => console.log('executed'))

describe('delayed execution', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.clearAllMocks()
  })
  it('should execute the function', () => {
    executeAfterTwoHours(mock)
    vi.runAllTimers()
    expect(mock).toHaveBeenCalledTimes(1)
  })
  it('should not execute the function', () => {
    executeAfterTwoHours(mock)
    // advancing by 2ms won't trigger the func
    vi.advanceTimersByTime(2)
    expect(mock).not.toHaveBeenCalled()
  })
  it('should execute every minute', () => {
    executeEveryMinute(mock)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(1)
    vi.advanceTimersToNextTimer()
    expect(mock).toHaveBeenCalledTimes(2)
  })
})
```

## Options / Props

### Automatic Advancing

When fake timers are enabled, these APIs advance them while they run:

| API | Advances timers |
|-----|-----------------|
| `vi.waitFor`, `vi.waitUntil` | by `interval` before every check |
| `expect.poll` | by `interval` after every failed attempt |
| Browser Mode `expect.element` | while it retries |
| Browser Mode locator and `userEvent` methods that take an element | while they run, even when the element already exists; the amount depends on real elapsed time and can vary between runs |

Methods that do not take an element, such as `userEvent.keyboard` and `userEvent.tab`, do not advance timers.

### Tick Modes

`vi.setTimerTickMode` makes fake timers advance on their own:

| Mode | Behavior |
|------|----------|
| `interval` | Advances fake time by a fixed step on a real-time interval, staying roughly in step with real time. Suits code where some state only lasts for a limited time. |
| `nextTimerAsync` | Runs the next pending timer after each macrotask, so chained timers fire almost back to back. Suits code that eventually settles; state that only lasts for a limited time can disappear before an assertion or action sees it. |

## Notes

- Automatic Advancing and Tick Modes sections are documented in v5.1.0 (the underlying `vi.setTimerTickMode` exists since v4.1.0).
- `fakeTimers.fakeNodeBuiltins` (v5.1.0, default `false`) also fakes `node:timers` and `node:timers/promises`.
- The API reference for `vi.waitFor` / `vi.waitUntil` words the same behavior as "in every check callback"; the Timers guide says "before every check".
- Source: https://vitest.dev/guide/mocking/timers (Vitest v5.1.0)

## Related

- [vi](../api/vi.md)
- [Mocking Dates](./mocking-dates.md)
- [Async testing patterns](./async.md)
