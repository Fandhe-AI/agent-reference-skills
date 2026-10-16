---
source: https://kotlinlang.org/docs/kotlin-doc.html
---

# Document Kotlin code: KDoc

KDoc is the language used to document Kotlin code (the equivalent of Javadoc). It combines Javadoc's block tag syntax (extended for Kotlin constructs) with Markdown for inline markup.

## Signature / Usage

KDoc comments start with `/**` and end with `*/`; each line may begin with an asterisk. The first paragraph (up to the first blank line) is the summary description; the following text is the detailed description. Every block tag begins on a new line with `@`.

```kotlin
/**
 * A group of *members*.
 *
 * This class has no useful logic; it's just a documentation example.
 *
 * @param T the type of a member in this group.
 * @property name the name of this group.
 * @constructor Creates an empty group.
 */
class Group<T>(val name: String) {
    /**
     * Adds a [member] to this group.
     * @return the new size of the group.
     */
    fun add(member: T): Int { ... }
}
```

### Links to elements

```
Use the method [foo] for this purpose.

Use [this method][foo] for this purpose.

Use [kotlin.reflect.KClass.properties] to enumerate the properties of the class.
```

External links use regular Markdown syntax.

## Options / Props

| Block tag | Description |
|-----------|-------------|
| `@param name` | Documents a value parameter of a function or a type parameter of a class, property, or function. `@param[name]` is equivalent |
| `@return` | Documents the return value of a function |
| `@constructor` | Documents the primary constructor of a class |
| `@receiver` | Documents the receiver of an extension function |
| `@property name` | Documents the property of a class with the specified name; useful for primary-constructor properties |
| `@throws class`, `@exception class` | Documents an exception which can be thrown by a method |
| `@sample identifier` | Embeds the body of the function with the specified qualified name into the documentation as a usage example |
| `@see identifier` | Adds a link to the specified class or method to the See also block |
| `@author` | Specifies the author of the element |
| `@since` | Specifies the version of the software in which the element was introduced |
| `@suppress` | Excludes the element from the generated documentation |

## Notes

- KDoc does not support the `@deprecated` tag; use the `@Deprecated` annotation instead.
- Qualified names in element links always use the dot character to separate components, even before a method name (unlike Javadoc). Names resolve with the same rules as inside the documented element, so imported names need not be fully qualified.
- KDoc has no syntax for resolving overloaded members in links; the documentation tool puts all overloads on the same page.
- Kotlin's documentation engine Dokka understands KDoc and generates documentation in various formats. This page covers KDoc syntax only; it is distinct from TypeScript doc tooling (tsdoc, typedoc), which are separate skills.

## Related

- [Coding conventions](./coding-conventions.md)
- [Basic syntax overview](./basic-syntax.md)
