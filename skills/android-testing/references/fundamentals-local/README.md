# fundamentals-local

| Name | Description | Path |
|------|-------------|------|
| Test Pyramid and Testing Strategy | Test scope (small/medium/large), 5-layer model, local vs. instrumented. | [test-pyramid.md](./test-pyramid.md) |
| Test Dependencies and Source Sets | `test/` vs `androidTest/`, `testImplementation` vs `androidTestImplementation`. | [test-dependencies.md](./test-dependencies.md) |
| JUnit4 Basics | `@Test` / `@Before` / `@After` / `@RunWith` / assertion methods. | [junit4-basics.md](./junit4-basics.md) |
| Test Doubles (Fake / Stub / Mock / Dummy / Spy) | When to use each kind of test double; fakes preferred. | [test-doubles.md](./test-doubles.md) |
| Mockito | Third-party Java/Kotlin mocking framework (`@Mock`, `when`/`thenReturn`, `verify`). | [mockito.md](./mockito.md) |
| MockK | Third-party Kotlin-first mocking library (`mockk`, `every`, `verify`, `spyk`). | [mockk.md](./mockk.md) |
| Truth | Third-party fluent assertion library (`assertThat`). | [truth.md](./truth.md) |
| Robolectric | Third-party framework to run Android tests on the JVM without an emulator. | [robolectric.md](./robolectric.md) |
| Testing Coroutines (kotlinx-coroutines-test) | `runTest`, `TestDispatcher`, `StandardTestDispatcher`, `UnconfinedTestDispatcher`, `Dispatchers.setMain`. | [coroutines-testing.md](./coroutines-testing.md) |
| Testing Kotlin Flow | Collecting/asserting flow emissions, `StateFlow`, Turbine. | [flow-testing.md](./flow-testing.md) |
| Testing ViewModel | Testing `ViewModel` state and behavior with fakes and test dispatchers. | [viewmodel-testing.md](./viewmodel-testing.md) |
| InstantTaskExecutorRule | JUnit rule for synchronous `LiveData` execution in local tests. | [instanttaskexecutorrule.md](./instanttaskexecutorrule.md) |
| Testable Design (DI and Constructor Injection) | Layering and constructor injection to enable fakes/mocks. | [testable-design.md](./testable-design.md) |
