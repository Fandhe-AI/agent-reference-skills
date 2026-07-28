# Test Doubles (Fake / Stub / Mock / Dummy / Spy)

Test doubles are objects that stand in for real app components during a test. Android's guidance is to prefer fakes, then mocks, and to avoid stubs/spies where possible.

## Signature / Usage

```kotlin
object FakeUserRepository : UserRepository {
    fun getUsers() = listOf(UserAlice, UserBob)
}

@Test
fun viewModelA_loadsUsers_showsFirstUser() {
    val viewModel = ViewModelA(FakeUserRepository)
    assertEquals(viewModel.firstUserName, UserAlice.name)
}
```

## Notes

- **Fake** (preferred): a "working" implementation suitable for tests but not production (e.g. in-memory DB); no mocking framework needed.
- **Mock**: behaves as programmed and has expectations about interactions; fails the test if interactions don't match. Usually built with a mocking framework.
- **Stub**: behaves as programmed but has no expectations about interactions; fakes are preferred for simplicity.
- **Dummy**: passed as a parameter but never actually used (e.g. an empty click callback).
- **Spy** (avoid where possible): a wrapper over a real object that also tracks information; adds complexity, prefer fakes or mocks.
- **Shadow**: a Robolectric-specific fake used to simulate Android framework behavior on the JVM.
- Fakes are the preferred double: no framework required, lightweight, and reusable across tests.
- Use dependency injection (e.g. Hilt) so components can be replaced with test doubles at test time.
- Library authors often ship officially supported fakes/test artifacts — check before hand-rolling one.
- Test doubles enable hermetic tests that avoid external dependencies like network or real databases.

## Related

- [testable-design](./testable-design.md)
- [mockito](./mockito.md)
- [mockk](./mockk.md)
- [robolectric](./robolectric.md)
