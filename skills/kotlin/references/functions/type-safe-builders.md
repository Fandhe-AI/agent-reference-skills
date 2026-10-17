---
source: https://kotlinlang.org/docs/type-safe-builders.html
---

# Type-safe builders

Well-named functions combined with function literals with receiver create statically typed builders, enabling Kotlin DSLs for hierarchical data (HTML/XML markup, web server routes).

## Signature / Usage

```kotlin
fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()
    html.init()
    return html
}

val result = html {
    head {
        title { +"HTML encoding with Kotlin" }
    }
    body {
        h1 { +"HTML encoding with Kotlin" }
        a(href = "http://kotlinlang.org") { +"Kotlin" }
    }
}
```

`init` has the function type with receiver `HTML.() -> Unit`; inside the lambda `this` is the `HTML` instance, so `head` / `body` (member functions) can be called without qualifier.

### Child builders

```kotlin
protected fun <T : Element> initTag(tag: T, init: T.() -> Unit): T {
    tag.init()
    children.add(tag)
    return tag
}

fun head(init: Head.() -> Unit) = initTag(Head(), init)

fun body(init: Body.() -> Unit) = initTag(Body(), init)
```

### Text via unaryPlus

```kotlin
operator fun String.unaryPlus() {
    children.add(TextElement(this))
}
```

`+"text"` calls the prefix `unaryPlus()` declared in `TagWithText` and adds a `TextElement` to `children`.

### Scope control: @DslMarker

Without scope control, `head { head {} }` compiles because the outer receiver is still implicit. Annotate the receiver types with one marker annotation:

```kotlin
@DslMarker
@Target(AnnotationTarget.CLASS)
annotation class HtmlTagMarker

@HtmlTagMarker
abstract class Tag(val name: String) { ... }
```

- Annotating the superclass is enough; inherited classes are treated as annotated.
- Outer receivers must then be named explicitly: `this@html.head { }`.
- To mark function types (lambdas with receivers), include `AnnotationTarget.TYPE`:

```kotlin
@DslMarker
@Target(AnnotationTarget.CLASS, AnnotationTarget.TYPE)
annotation class HtmlTagMarker

fun html(init: @HtmlTagMarker HTML.() -> Unit): HTML { ... }
```

### Context parameters and implicit receivers

When a member of an implicit receiver and a context-parameter declaration with the same name are in scope, the compiler warns that the receiver is shadowed. Use `this` to call the receiver or `contextOf<T>()` to call the context declaration:

```kotlin
context(tag: HtmlTag)
fun setAttribute(name: String, value: String) { tag.setAttribute(name, value) }

fun test(head: HtmlTag, extraInfo: HtmlTag) {
    with(head) {
        context(extraInfo) {
            // Calls the receiver's member explicitly
            this.setAttribute("user", "1234")

            // Calls the context declaration explicitly
            contextOf<HtmlTag>().setAttribute("user", "1234")
        }
    }
}
```

## Options / Props

| Annotation target | Effect of a DSL marker |
| --- | --- |
| `CLASS` | Classes or interfaces used as DSL receivers |
| `TYPE` | Receiver types in function type signatures |
| `TYPEALIAS` | Type aliases that expand to DSL receiver types |

## Notes

- DSL markers applied to other targets (functions, properties) have no effect on scope control.
- Only the nearest receiver's members and extensions are accessible within a marked lambda unless an outer receiver is specified explicitly.
- The official page ends with the full `com.example.html` package definition (`Element`, `TextElement`, `Tag`, `TagWithText`, `HTML`, `Head`, `Title`, `BodyTag`, `Body`, `B`, `P`, `H1`, `A`, `html`); see the source page.

## Related

- [Higher-order functions and lambdas](./lambdas.md)
- [Context parameters](./context-parameters.md)
- [Using builders with builder type inference](./using-builders-with-builder-inference.md)
