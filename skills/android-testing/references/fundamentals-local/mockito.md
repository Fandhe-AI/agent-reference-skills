# Mockito

Mockito is a mocking framework for Java/Kotlin used to create mock test doubles, stub their behavior with `when`/`thenReturn`, and verify interactions.

## Signature / Usage

```kotlin
import android.content.Context
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mock
import org.mockito.junit.MockitoJUnitRunner
import org.mockito.kotlin.doReturn
import org.mockito.kotlin.mock

@RunWith(MockitoJUnitRunner::class)
class MockedContextTest {
    @Mock
    private lateinit var mockContext: Context

    @Test
    fun readStringFromContext_LocalizedString() {
        val mockContext = mock<Context> {
            on { getString(R.string.name_label) } doReturn "HELLO WORLD"
        }
        val result = ClassUnderTest(mockContext).getName()
        assertEquals(result, "HELLO WORLD")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `@Mock` | annotation | — | Declares a mock field; requires `@RunWith(MockitoJUnitRunner::class)`. |
| `Mockito.when(mock.action()).thenReturn(value)` | function | — | Stubs a mock method's return value. |
| `Mockito.verify(mock).action()` | function | — | Verifies a method was called on the mock. |

## Notes

- Third-party library (Mockito, plus the `mockito-kotlin` extension), not part of the Android SDK.
- Use `testImplementation` for Mockito dependencies in local (`test/`) tests.
- Prefer fakes over mocks when practical; use Mockito to mock Android framework classes (e.g. `Context`) that local tests cannot instantiate directly.

## Related

- [test-doubles](./test-doubles.md)
- [mockk](./mockk.md)
- [junit4-basics](./junit4-basics.md)
