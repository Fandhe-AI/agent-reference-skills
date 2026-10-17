---
source: https://kotlinlang.org/docs/multiplatform/compose-localize-strings.html
---

# Localizing strings

Provide translated texts for UI elements in all supported languages using the common resource library and generated accessors.

## Signature / Usage

Store string resources in `composeResources` of the common source set: default texts in `values`, one directory per language.

```
commonMain/composeResources/
├── values/
│   └── strings.xml
├── values-es/
│   └── strings.xml
├── values-fr/
│   └── strings.xml
└── ... (other locale directories)
```

`commonMain/composeResources/values/strings.xml`:

```xml
<resources>
    <string name="app_name">My Application</string>
    <string name="greeting">Hello, world!</string>
    <string name="welcome_message">Welcome, %1$s!</string>
</resources>
```

`commonMain/composeResources/values-es/strings.xml`:

```xml
<resources>
    <string name="app_name">Mi Aplicación</string>
    <string name="greeting">¡Hola mundo!</string>
    <string name="welcome_message">¡Bienvenido, %1$s!</string>
</resources>
```

Build the project to generate static accessors, then use `stringResource()`, which picks the text for the user's current locale. Both the accessor and `stringResource()` accept placeholder parameters.

```kotlin
import project.shared.generated.resources.Res

@Composable
fun MyApp() {
    Text(stringResource(Res.string.app_name))
    Text(stringResource(Res.string.greeting))
    Text(stringResource(Res.string.welcome_message, "User"))
}
```

## Notes

- If a language has more than one script (for example Chinese or Serbian), add a script-less directory (`values-zh`) in addition to the script-specific ones (`values-b+zh+Hans`, `values-b+zh+Hant`); otherwise the resource cannot be resolved when the system reports the locale without a script.
- The source page writes `Res.strings.*`, which the resource generator does not produce; the generated accessor object is `Res.string` (as on the resources usage page), so the example uses `Res.string`.
- The source page uses `%s`; Compose Multiplatform resources substitute only numbered placeholders (`%1$s`, `%1$d`), per the resources usage page.

## Related

- [Setup and configuration for multiplatform resources](./resources-setup.md#language-and-regional-qualifiers)
- [Using multiplatform resources in your app](./resources-usage.md)
- [Manage regional formats](./regional-format.md)
- [Working with RTL languages](./rtl-languages.md)
- [Localization tests](./localization-tests.md)
