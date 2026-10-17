---
source: https://kotlinlang.org/docs/multiplatform/compose-resource-environment.html
---

# Manage local resource environment

Dynamically update the resource environment used by the app: locale (language and region), theme, and resolution density.

## Signature / Usage

Locale: until a common public API exists, define a common entry point and provide per-platform `actual` declarations. Locales are BCP 47 tags (`es`, `es-ES`, `zh-Hans`); `null` means the system locale.

```kotlin
var customAppLocale by mutableStateOf<String?>(null)
expect object LocalAppLocale {
    val current: String @Composable get
    @Composable infix fun provides(value: String?): ProvidedValue<*>
}

@Composable
fun AppEnvironment(content: @Composable () -> Unit) {
    CompositionLocalProvider(
        LocalAppLocale provides customAppLocale,
    ) {
        key(customAppLocale) {
            content()
        }
    }
}
```

Platform APIs used by the `actual` implementations:

| Platform | API |
|----------|-----|
| Android | `context.resources.configuration.locale` |
| iOS | `NSLocale.preferredLanguages` |
| desktop | `Locale.getDefault()` |
| web | `window.navigator.languages` |

Android `actual`:

```kotlin
actual object LocalAppLocale {
    private var default: Locale? = null
    actual val current: String
        @Composable get() = Locale.getDefault().toString()

    @Composable
    actual infix fun provides(value: String?): ProvidedValue<*> {
        val configuration = LocalConfiguration.current

        if (default == null) {
            default = Locale.getDefault()
        }

        val new = when(value) {
            null -> default!!
            else -> Locale(value)
        }
        Locale.setDefault(new)
        configuration.setLocale(new)
        val resources = LocalContext.current.resources

        resources.updateConfiguration(configuration, resources.displayMetrics)
        return LocalConfiguration.provides(configuration)
    }
}
```

iOS `actual`:

```kotlin
actual object LocalAppLocale {
    private const val LANG_KEY = "AppleLanguages"
    private val default = NSLocale.preferredLanguages.first() as String
    private val LocalAppLocale = staticCompositionLocalOf { default }
    actual val current: String
        @Composable get() = LocalAppLocale.current

    @Composable
    actual infix fun provides(value: String?): ProvidedValue<*> {
        val new = value ?: default
        if (value == null) {
            NSUserDefaults.standardUserDefaults.removeObjectForKey(LANG_KEY)
        } else {
            NSUserDefaults.standardUserDefaults.setObject(arrayListOf(new), LANG_KEY)
        }
        return LocalAppLocale.provides(new)
    }
}
```

Desktop `actual`:

```kotlin
actual object LocalAppLocale {
    private var default: Locale? = null
    private val LocalAppLocale = staticCompositionLocalOf { Locale.getDefault().toString() }
    actual val current: String
        @Composable get() = LocalAppLocale.current

    @Composable
    actual infix fun provides(value: String?): ProvidedValue<*> {
        if (default == null) {
            default = Locale.getDefault()
        }
        val new = when(value) {
            null -> default!!
            else -> Locale(value)
        }
        Locale.setDefault(new)
        return LocalAppLocale.provides(new.toString())
    }
}
```

Web: bypass the read-only `window.navigator.languages` property.

```kotlin
actual object LocalAppLocale {
    private val LocalAppLocale = staticCompositionLocalOf { Locale.current }
    actual val current: String
        @Composable get() = LocalAppLocale.current.toString()

    @Composable
    actual infix fun provides(value: String?): ProvidedValue<*> {
        updateCustomLocale(value?.replace('_', '-'))
        return LocalAppLocale.provides(Locale.current)
    }
}

@OptIn(ExperimentalWasmJsInterop::class)
private fun updateCustomLocale(value: String?) {
    js(
        """
        if (window.__customLocale !== value) {
            window.__customLocale = value;
            window.dispatchEvent(new Event("languagechange"));
        }
        """
    )
}
```

In the browser's `index.html`, before loading the application scripts:

```html
<script>
    var currentLanguagesImplementation = Object.getOwnPropertyDescriptor(Navigator.prototype, "languages");
    var newLanguagesImplementation = Object.assign({}, currentLanguagesImplementation, {
        get: function () {
            if (window.__customLocale) {
                return [window.__customLocale];
            } else {
                return currentLanguagesImplementation.get.apply(this);
            }
        }
    });

    Object.defineProperty(Navigator.prototype, "languages", newLanguagesImplementation)
</script>
<script src="skiko.js"></script>
```

### Theme

The current theme is defined via `isSystemInDarkTheme()`. Android uses `Resources.getConfiguration().uiMode and Configuration.UI_MODE_NIGHT_MASK`; iOS, desktop, and web use `LocalSystemTheme.current`. Temporary workaround with `expect`/`actual`:

```kotlin
var customAppThemeIsDark by mutableStateOf<Boolean?>(null)
expect object LocalAppTheme {
    val current: Boolean @Composable get
    @Composable infix fun provides(value: Boolean?): ProvidedValue<*>
}

@Composable
fun AppEnvironment(content: @Composable () -> Unit) {
    CompositionLocalProvider(
        LocalAppTheme provides customAppThemeIsDark,
    ) {
        key(customAppThemeIsDark) {
            content()
        }
    }
}
```

Android `actual` (uses `LocalConfiguration`):

```kotlin
actual object LocalAppTheme {
    actual val current: Boolean
        @Composable get() = (LocalConfiguration.current.uiMode and UI_MODE_NIGHT_MASK) == UI_MODE_NIGHT_YES

    @Composable
    actual infix fun provides(value: Boolean?): ProvidedValue<*> {
        val new = if (value == null) {
            LocalConfiguration.current
        } else {
            Configuration(LocalConfiguration.current).apply {
                uiMode = when (value) {
                    true -> (uiMode and UI_MODE_NIGHT_MASK.inv()) or UI_MODE_NIGHT_YES
                    false -> (uiMode and UI_MODE_NIGHT_MASK.inv()) or UI_MODE_NIGHT_NO
                }
            }
        }
        return LocalConfiguration.provides(new)
    }
}
```

iOS, desktop, and web `actual` (change `LocalSystemTheme` directly):

```kotlin
@OptIn(InternalComposeUiApi::class)
actual object LocalAppTheme {
    actual val current: Boolean
        @Composable get() = LocalSystemTheme.current == SystemTheme.Dark

    @Composable
    actual infix fun provides(value: Boolean?): ProvidedValue<*> {
        val new = when(value) {
            true -> SystemTheme.Dark
            false -> SystemTheme.Light
            null -> LocalSystemTheme.current
        }

        return LocalSystemTheme.provides(new)
    }
}
```

### Density

The common `LocalDensity` API works on all platforms:

```kotlin
var customAppDensity by mutableStateOf<Density?>(null)
object LocalAppDensity {
    val current: Density
        @Composable get() = LocalDensity.current

    @Composable
    infix fun provides(value: Density?): ProvidedValue<*> {
        val new = value ?: LocalDensity.current
        return LocalDensity.provides(new)
    }
}
```

## Notes

- The locale and theme patterns are described by the docs as a temporary workaround until a common public API is implemented.
- The theme `actual` uses `InternalComposeUiApi` (`LocalSystemTheme`), hence the `@OptIn`.
- The `expect` / `actual` mechanism itself is the Kotlin language feature covered by the kotlin skill and in this skill's project-structure expect-actual page.

## Related

- [Setup and configuration for multiplatform resources](./resources-setup.md#qualifiers)
- [Localizing strings](./localize-strings.md)
- [Localization tests](./localization-tests.md)
