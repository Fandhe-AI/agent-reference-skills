# JUnit4 Basics

Local unit test classes use JUnit4 annotations (`@Test`, `@Before`, `@After`, `@RunWith`) and `org.junit.Assert` methods to structure and assert test behavior.

## Signature / Usage

```kotlin
import org.junit.Assert.assertTrue
import org.junit.Test

class EmailValidatorTest {
    @Test
    fun emailValidator_CorrectEmailSimple_ReturnsTrue() {
        assertTrue(EmailValidator.isValidEmail("name@email.com"))
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@Test` | annotation | — | Marks a method as a test method. |
| `@Before` | annotation | — | Runs before each test method (setup). |
| `@After` | annotation | — | Runs after each test method (teardown). |
| `@RunWith` | annotation | — | Specifies a custom test runner (e.g. `MockitoJUnitRunner`, `AndroidJUnit4`). |
| `assertEquals(expected, actual)` | function | — | Asserts two values are equal. |
| `assertTrue` / `assertFalse` | function | — | Asserts a boolean condition. |
| `assertNull` / `assertNotNull` | function | — | Asserts nullability. |
| `assertThrows(Type::class.java) { ... }` | function | — | Asserts the block throws the given exception type. |

## Notes

- Third-party library (JUnit 4), not part of the Android SDK; imported via `org.junit.*`.
- Assertion helpers can also come from Hamcrest or Truth instead of `org.junit.Assert`.

## Related

- [test-dependencies](./test-dependencies.md)
- [truth](./truth.md)
- [mockito](./mockito.md)
