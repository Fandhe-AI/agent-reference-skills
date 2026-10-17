---
source: https://kotlinlang.org/docs/kotlin-tour-null-safety.html
---

# Null Safety Patterns

Declare nullable types and handle them with safe calls, the Elvis operator, and safe casts.

```kotlin
fun main() {
    // nullable has nullable String type
    var nullable: String? = "You can keep a null here"

    // This is OK
    nullable = null

    val nullString: String? = null

    // Safe call: returns null if the receiver is null
    println(nullString?.uppercase())
    // null

    // Elvis operator: default value when the left side is null
    println(nullString?.length ?: 0)
    // 0
}
```

Safe cast combined with a safe call and the Elvis operator:

```kotlin
fun calculateTotalStringLength(items: List<Any>): Int {
    return items.sumOf { (it as? String)?.length ?: 0 }
}
```

Filtering `null` values from a collection:

```kotlin
fun main() {
    val emails: List<String?> = listOf("alice@example.com", null, "bob@example.com", null, "carol@example.com")

    val validEmails = emails.filterNotNull()

    println(validEmails)
    // [alice@example.com, bob@example.com, carol@example.com]
}
```

## Notes

- Types are non-nullable by default; add `?` after the type to allow `null`.
- `as` throws at runtime when the cast fails; `as?` returns `null` instead.
- Safe calls can be chained, for example `person.company?.address?.country`.
