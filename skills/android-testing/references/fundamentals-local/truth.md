# Truth

Truth is Google's fluent assertion library, offering `assertThat()` subjects for common JDK/Android types with more readable failure messages than plain JUnit asserts.

## Signature / Usage

```java
import static com.google.common.truth.Truth.assertThat;

assertThat("awesome").startsWith("awe");
assertThat(googleColors)
    .containsExactly(BLUE, RED, YELLOW, BLUE, GREEN, RED)
    .inOrder();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `assertThat(value)` | function | — | Entry point returning a fluent `Subject` for `value`'s type (String, Iterable, Map, etc.). |
| `assertWithMessage(msg).that(value)` | function | — | Same as `assertThat` but attaches a custom failure message. |
| `IterableSubject#containsExactly(...).inOrder()` | function | — | Asserts an iterable contains exactly the given elements, in order. |
| `MapSubject#valuesForKey(key)` | function | — | Returns a subject over the values associated with a map key. |

## Notes

- Third-party library (Truth, maintained by the Guava team), not part of the Android SDK.
- Commonly used as a drop-in replacement for `org.junit.Assert` assertions in local and instrumented tests.

## Related

- [junit4-basics](./junit4-basics.md)
- [test-doubles](./test-doubles.md)
