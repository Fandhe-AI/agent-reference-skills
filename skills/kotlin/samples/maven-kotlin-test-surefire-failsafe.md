---
source: https://kotlinlang.org/docs/jvm-test-maven.html
---

# Kotlin Tests with Maven: Surefire and Failsafe

Add `kotlin-test-junit5`, write unit (`*Test`) and integration (`*IT`) tests, and run them with Surefire and Failsafe.

```xml
<!-- pom.xml -->
<dependencies>
    <dependency>
        <groupId>org.jetbrains.kotlin</groupId>
        <artifactId>kotlin-test-junit5</artifactId>
        <version>2.4.21</version>
        <scope>test</scope>
    </dependency>
</dependencies>
```

```kotlin
import kotlin.test.Test
import kotlin.test.assertEquals

class OrderServiceTest {
    @Test
    fun `calculate total should sum item prices`() {
        val service = OrderService()
        val result = service.calculateTotal(listOf(10.0, 25.0))
        assertEquals(35.0, result)
    }
}
```

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-failsafe-plugin</artifactId>
    <version>3.5.5</version>
    <executions>
        <execution>
            <goals>
                <goal>integration-test</goal>
                <goal>verify</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

```bash
mvn test      # unit tests only (Surefire, *Test)
mvn verify    # unit and integration tests (Surefire + Failsafe, *IT)
```

## Notes

- Despite its name, `kotlin-test-junit5` supports all latest JUnit versions, including JUnit 6; use `kotlin-test-junit` only for JUnit 4.
- Failsafe lets the build continue after an integration test failure so `post-integration-test` tasks run, then fails at `verify`.
- `OrderService` is a placeholder class from the official example, not defined here.
