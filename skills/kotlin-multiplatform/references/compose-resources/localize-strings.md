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
    <string name="welcome_message">Welcome, %s!</string>
</resources>
```

`commonMain/composeResources/values-es/strings.xml`:

```xml
<resources>
    <string name="app_name">Mi Aplicación</string>
    <string name="greeting">¡Hola mundo!</string>
    <string name="welcome_message">¡Bienvenido, %s!</string>
</resources>
```

Build the project to generate static accessors, then use `stringResource()`, which picks the text for the user's current locale. Both the accessor and `stringResource()` accept placeholder parameters.

```kotlin
import project.shared.generated.resources.Res

@Composable
fun MyApp() {
    Text(stringResource(Res.strings.app_name))
    Text(stringResource(Res.strings.greeting))
    Text(stringResource(Res.strings.welcome_message, "User"))
}
```

## Notes

- If a language has more than one script (for example Chinese or Serbian), add a script-less directory (`values-zh`) in addition to the script-specific ones (`values-b+zh+Hans`, `values-b+zh+Hant`); otherwise the resource cannot be resolved when the system reports the locale without a script.
- The source page writes the accessor as `Res.strings.app_name`; the resources usage page writes `Res.string.app_name` for the same kind of accessor. Both are quoted verbatim from their respective pages; this page is not reconciled with the usage page.

## Related

- [Setup and configuration for multiplatform resources](./resources-setup.md#language-and-regional-qualifiers)
- [Using multiplatform resources in your app](./resources-usage.md)
- [Manage regional formats](./regional-format.md)
- [Working with RTL languages](./rtl-languages.md)
- [Localization tests](./localization-tests.md)
