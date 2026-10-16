# fundamentals-local

| Name | Description | Path |
|------|-------------|------|
| Testing Coroutines (kotlinx-coroutines-test) | `kotlinx-coroutines-test` provides `runTest` and `TestDispatcher` implementations to deterministically test suspending code by controlling virtual time | [coroutines-testing.md](./coroutines-testing.md) |
| Testing Kotlin Flow | Testing a `Flow` depends on whether it is input (replace the producer with a fake) or output (collect and assert emitted items) | [flow-testing.md](./flow-testing.md) |
| InstantTaskExecutorRule | JUnit `TestRule` that swaps the Architecture Components background executor for a synchronous one, so `LiveData` updates happen immediately in local unit tests | [instanttaskexecutorrule.md](./instanttaskexecutorrule.md) |
| JUnit4 Basics | Local unit test classes use JUnit4 annotations (`@Test`, `@Before`, `@After`, `@RunWith`) and `org.junit.Assert` methods | [junit4-basics.md](./junit4-basics.md) |
| Mockito | Mockito is a mocking framework for Java/Kotlin used to create mock test doubles, stub their behavior with `when`/`thenReturn`, and verify interactions | [mockito.md](./mockito.md) |
| MockK | MockK is a Kotlin-first mocking library providing `mockk<T>()`, `every { }` stubbing, `verify { }` checks, relaxed mocks, and spies | [mockk.md](./mockk.md) |
| Robolectric | Robolectric runs Android tests inside a simulated Android environment on the JVM, avoiding emulator overhead for host-side tests | [robolectric.md](./robolectric.md) |
| Test Dependencies and Source Sets | Local unit tests live in the `test/` source set and use `testImplementation`; instrumented tests live in `androidTest/` and use `androidTestImplementation` | [test-dependencies.md](./test-dependencies.md) |
| Test Doubles (Fake / Stub / Mock / Dummy / Spy) | Test doubles are objects that stand in for real app components during a test; Android's guidance is to prefer fakes, then mocks, and avoid stubs and spies where possible | [test-doubles.md](./test-doubles.md) |
| Test Pyramid and Testing Strategy | Android testing is organized by scope and isolation: small (unit), medium (integration), and large (end-to-end) tests | [test-pyramid.md](./test-pyramid.md) |
| Testable Design (DI and Constructor Injection) | Code becomes easy to unit test by layering (presentation / domain / data), keeping business logic out of framework-bound classes, and injecting dependencies through constructors | [testable-design.md](./testable-design.md) |
| Truth | Truth is Google's fluent assertion library, offering `assertThat()` subjects with more readable failure messages than plain JUnit asserts | [truth.md](./truth.md) |
| Testing ViewModel | `ViewModel`s are tested as plain local unit tests: construct them with fake dependencies, drive their public functions, and assert on exposed state | [viewmodel-testing.md](./viewmodel-testing.md) |
| What to test in Android | What to test depends on the type of app, the development team, the amount of legacy code, and the architecture used | [what-to-test.md](./what-to-test.md) |
