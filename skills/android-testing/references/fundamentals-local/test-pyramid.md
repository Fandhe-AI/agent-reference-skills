# Test Pyramid and Testing Strategy

Android testing is organized by scope/isolation: small (unit), medium (integration), and large (end-to-end) tests, plus a 5-layer model (Unit / Component / Feature / Application / Release Candidate) that maps to local vs. instrumented execution.

## Signature / Usage

```kotlin
// Unit test (local, JVM, no Android framework)
class EmailValidatorTest {
    @Test
    fun emailValidator_CorrectEmailSimple_ReturnsTrue() {
        assertTrue(EmailValidator.isValidEmail("name@email.com"))
    }
}
```

## Notes

- The 5-layer model: Unit (single method/class, no network, local, pre-merge) → Component (module level, no network, local/Robolectric/emulator, pre-merge) → Feature (feature-level integration, mocked network, local/Robolectric/emulator/devices, pre-merge) → Application (mocked/staging/prod network, emulator/devices, pre/post-merge) → Release Candidate (prod server, emulator/devices, minified release build).
- Small (unit) tests verify a single method/class in isolation and run on the local JVM; medium tests check integration between units; large (end-to-end) tests verify whole screens/flows and usually run on a device or emulator.
- Local tests (`src/test/`) run on the host machine/JVM, are fast, and use tools like JUnit, Mockito, and Robolectric.
- Instrumented tests (`src/androidTest/`) run on a device or emulator, are slower, and use tools like Espresso and Compose UI testing.
- Prefer the lowest pyramid layer that gives adequate feedback; most apps should have many small tests and few large/end-to-end tests.
- The earlier a bug is caught in the pyramid, the cheaper it is to fix (unit test: minutes; end-to-end test: days; production: weeks).
- Write down a testing strategy defining the layers, requirements, and responsibilities for each test category, and back it with CI enforcement.

## Related

- [test-dependencies](./test-dependencies.md)
- [test-doubles](./test-doubles.md)
- [testable-design](./testable-design.md)
- [Instrumented tests](../instrumented/README.md)
