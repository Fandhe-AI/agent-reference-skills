# MockK

MockK is a Kotlin-first mocking library providing `mockk<T>()`, `every { }` stubbing, `verify { }` interaction checks, relaxed mocks, and spies.

## Signature / Usage

```kotlin
val car = mockk<Car>()
every { car.drive(Direction.NORTH) } returns Outcome.OK

car.drive(Direction.NORTH)

verify { car.drive(Direction.NORTH) }
confirmVerified(car)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mockk<T>(relaxed = false)` | function | `relaxed = false` | Creates a mock of `T`. With `relaxed = true`, unstubbed calls return default values instead of throwing. |
| `every { ... } returns value` | function | — | Stubs behavior for a mocked call. |
| `verify { ... }` | function | — | Verifies a mocked call happened. |
| `spyk(obj)` | function | — | Wraps a real object, calling real methods unless stubbed. |
| `slot<T>()` / `capture(slot)` | function | — | Captures an argument passed to a mocked call for later inspection. |
| `justRun { ... }` | function | — | Shorthand for stubbing a `Unit`-returning function to do nothing. |

## Notes

- Third-party library (MockK), not part of the Android SDK.
- Add via `testImplementation "io.mockk:mockk:$mockkVersion"`.

## Related

- [test-doubles](./test-doubles.md)
- [mockito](./mockito.md)
- [junit4-basics](./junit4-basics.md)
