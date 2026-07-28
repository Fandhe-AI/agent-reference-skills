# Espresso-Web (onWebView / withElement)

Entry point for testing `WebView` UI content with Espresso. Reuses WebDriver "Atoms" to examine and control the DOM inside a `WebView`.

## Signature / Usage

```kotlin
fun onWebView(): WebInteraction<Void>
fun WebInteraction<R>.withElement(locator: Atom<ElementReference>): WebInteraction<ElementReference>
```

```kotlin
onWebView()
    .withElement(findElement(Locator.ID, "text_input"))
    .perform(clearElement())
    .perform(DriverAtoms.webKeys("Macchiato"))
    .withElement(findElement(Locator.ID, "submitBtn"))
    .perform(webClick())
    .withElement(findElement(Locator.ID, "response"))
    .check(webMatches(getText(), containsString("Macchiato")))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `onWebView()` | `() -> WebInteraction<Void>` | Main entry point for interacting with the current `WebView`. |
| `withElement(findElement(locator, value))` | method | References a DOM element (e.g. `Locator.ID`) within the `WebView`. |
| `withContextualElement(findElement(...))` | method | References a DOM element scoped relative to the previously selected element. |
| `perform(webClick())` / `perform(clearElement())` / `perform(DriverAtoms.webKeys(text))` | method | Executes a `WebViewAction` (click, clear, type text) on the referenced element. |
| `check(webMatches(getText(), matcher))` / `check(webMatches(getCurrentUrl(), matcher))` | method | Evaluates a `WebViewAssertion` against the element or the page URL. |
| `reset()` | method | Reverts the `WebView` to its initial state after a navigation change. |
| `forceJavascriptEnabled()` | method | Ensures JavaScript is enabled in the `WebView` under test (required for Espresso-Web). |

## Notes

- Elements are located via `Locator` (e.g. `Locator.ID`), with additional support for CSS selectors and XPath via WebDriver Atoms.
- Must call `onWebView().forceJavascriptEnabled()` before interacting, since Espresso-Web depends on JavaScript execution.
- Artifact: `androidx.test.espresso:espresso-web`.

## Related

- [Espresso.onView](./onview.md)
