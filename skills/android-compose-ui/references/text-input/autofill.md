# Autofill (ContentType)

The Compose Autofill API lets `BasicTextField`/`TextField` integrate with system autofill services (password managers, credential providers). Setting `ContentType` semantics on a field enables filling and triggers save-credential prompts with no extra wiring; `LocalAutofillManager` gives explicit control over committing or cancelling a save.

## Signature / Usage

```kotlin
val autofillManager = LocalAutofillManager.current

Column {
    TextField(
        state = rememberTextFieldState(),
        modifier = Modifier.semantics { contentType = ContentType.NewUsername },
    )
    TextField(
        state = rememberTextFieldState(),
        modifier = Modifier.semantics { contentType = ContentType.NewPassword },
    )
    Button(onClick = { autofillManager?.commit() }) { Text("Submit") }
}
```

Credential Manager integration (API 34+, minimal self-contained form; `request` is a `GetCredentialRequest` and `callback` an `OutcomeReceiver<GetCredentialResponse, GetCredentialException>` you create elsewhere):

```kotlin
@RequiresApi(34)
@Composable
fun CredentialField(
    request: GetCredentialRequest,
    callback: OutcomeReceiver<GetCredentialResponse, GetCredentialException>,
) {
    TextField(
        state = rememberTextFieldState(),
        modifier = Modifier.semantics {
            credentialRequest = CredentialRequestData(request, callback)
        },
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `contentType` | `ContentType` | — | Semantics property (`Modifier.semantics { contentType = ... }`) declaring what kind of data a field accepts, e.g. `Username`, `EmailAddress`, `NewUsername`, `NewPassword`, `Password`. |
| `ContentType.+` | operator | — | Combines multiple content types on one field, e.g. `ContentType.Username + ContentType.EmailAddress`. |
| `LocalAutofillManager` | `CompositionLocal<AutofillManager?>` | — | Provides the `AutofillManager` for the current composition. |
| `AutofillManager.commit()` | `() -> Unit` | — | Commits the autofill context, triggering the save-credential dialog. |
| `AutofillManager.cancel()` | `() -> Unit` | — | Cancels pending autofill saves without persisting data. |
| `LocalAutofillHighlightColor` | `CompositionLocal<Color>` | `Color(0x4dffeb3b)` | Deprecated (superseded by `LocalAutofillHighlightBrush`). Overrides the highlight color drawn behind a field when autofill populates it. |

## Notes

- Package: `androidx.compose.ui.autofill` (`ContentType`, `AutofillManager`); `LocalAutofillManager` lives in `androidx.compose.ui.platform` (CompositionLocals), and semantics property lives in `androidx.compose.ui.semantics`.
- `LocalAutofillHighlightColor` is defined in `androidx.compose.foundation.text` (foundation artifact, not `ui.autofill`) and is `@Deprecated` in favor of `LocalAutofillHighlightBrush`, which supersedes it with a `Brush`-based override.
- Requires device/emulator autofill to be enabled and a credential provider configured; behavior otherwise depends on the installed provider.
- Credentials are saved automatically when the user navigates away from the screen; explicit `commit()` is only needed for in-place submit flows that don't navigate.
- `ContentType.NewUsername` / `ContentType.NewPassword` also surface a "Suggest strong password" toolbar action handled entirely by the system.
- If a user repeatedly dismisses the save dialog, the credential provider may suppress future prompts for the app until the user clears the block in the provider's settings.
- Works on `BasicTextField`, all Material `TextField` variants, and any custom composable built on `BasicTextField`.
- Credential Manager integration (Compose UI 1.12.0-alpha03, API 34+): low-level semantics property `credentialRequest` (package `androidx.compose.ui.semantics`), `@RequiresApi(34)`. Signature from 1.12.1 sources: `var SemanticsPropertyReceiver.credentialRequest: CredentialRequestData`, with `class CredentialRequestData(val request: GetCredentialRequest, val callback: OutcomeReceiver<GetCredentialResponse, GetCredentialException>)`. When set, Compose populates the `ViewStructure` with the request to integrate with the Autofill framework's Credential Manager support.
- Setting `ContentDataType.None` in semantics prevents Compose from sending autofill events (Compose UI 1.12.0-alpha01 release notes), avoiding initialization costs associated with requesting autofill services.
- Debug logging (release notes, not present in the 1.12.1 sources searched): logging of autofill input events is disabled by default since 1.12.0-alpha01 and enabled by calling `ComposeView.setAutofillDebugEnabled`; 1.12.0-alpha02 removed the built-in autofill debug logging callbacks, and the same can be achieved by logging from `AutofillManager.AutofillCallback`.

## Related

- [KeyboardOptions / KeyboardActions / ImeAction](./keyboardoptions.md)
- [BasicTextField](./basictextfield.md)
