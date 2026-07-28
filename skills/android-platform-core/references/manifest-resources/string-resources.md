# String, string-array, and plurals resources

Text resources: single strings, string arrays, and quantity-sensitive plurals, with format-argument and escaping rules.

## Signature / Usage

```xml
<!-- res/values/strings.xml -->
<resources>
    <string name="hello">Hello!</string>

    <string-array name="planets_array">
        <item>Mercury</item>
        <item>Venus</item>
    </string-array>

    <plurals name="numberOfSongsAvailable">
        <item quantity="one">%d song found.</item>
        <item quantity="other">%d songs found.</item>
    </plurals>

    <string name="welcome_messages">Hello, %1$s! You have %2$d new messages.</string>
</resources>
```

```kotlin
Text(text = stringResource(R.string.hello))
val planets: Array<String> = stringArrayResource(R.array.planets_array)
Text(text = pluralStringResource(R.plurals.numberOfSongsAvailable, count, count))
Text(text = stringResource(R.string.welcome_messages, username, mailCount))
```

## Options / Props

| Element | Attribute | Description |
|---------|-----------|--------------|
| `<string name="...">` | — | Single text string. |
| `<string-array name="...">` | `<item>` children | Array of strings. |
| `<plurals name="...">` | `quantity="zero\|one\|two\|few\|many\|other"` on each `<item>` | Different strings by grammatical plurality; always provide `one` and `other` at minimum, include `%d` so translators can localize plural rules. |

## Notes

- Escape `@` as `\@`, `?` as `\?`, newline as `\n`, tab as `\t`, Unicode as `\uXXXX`, single quote as `\'` (or wrap the whole string in double quotes), double quote as `\"`.
- Plain whitespace collapses; wrap a string in double quotes to preserve it verbatim.
- Format arguments use numbered placeholders `%1$s`, `%2$d`, etc., required whenever a string takes more than one substitution.
- A limited set of HTML tags is supported inside string values for basic styling (`<b>`, `<i>`, `<u>`, `<font>`, `<ul>`/`<li>`, `<br>`, `<sup>`/`<sub>`, etc.).
- Use `xliff:g` tags (`xmlns:xliff="urn:oasis:names:tc:xliff:document:1.2"`) to mark placeholders/codes that translators should not alter.
- Access outside Compose via `context.getString(R.string.hello_world)` / `resources.getStringArray(...)` / `resources.getQuantityString(...)`.

## Related

- [resource directories](./resource-directories.md)
- [localization and RTL](./localization-rtl.md)
- [Compose resource access](./compose-resource-access.md)
