# AlertDialog / ConfirmationDialog / OpenOnPhoneDialog

Full-screen dialog family. `AlertDialog` prompts for a decision (confirm/dismiss buttons or custom content). `ConfirmationDialog` / `OpenOnPhoneDialog` are transient, auto-dismissing dialogs showing an icon and short curved text.

## Signature / Usage

```kotlin
@Composable
public fun AlertDialog(
    visible: Boolean,
    onDismissRequest: () -> Unit,
    confirmButton: @Composable RowScope.() -> Unit,
    title: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    dismissButton: @Composable RowScope.() -> Unit = { AlertDialogDefaults.DismissButton(onDismissRequest) },
    icon: @Composable (() -> Unit)? = null,
    text: @Composable (() -> Unit)? = null,
    verticalArrangement: Arrangement.Vertical = AlertDialogDefaults.VerticalArrangement,
    contentPadding: PaddingValues =
        if (icon != null) AlertDialogDefaults.confirmDismissWithIconContentPadding()
        else AlertDialogDefaults.confirmDismissContentPadding(),
    properties: DialogProperties = DialogProperties(),
    content: (ScalingLazyListScope.() -> Unit)? = null,
)
```

```kotlin
AlertDialog(
    visible = showDialog,
    onDismissRequest = { showDialog = false },
    title = { Text("Delete item?") },
    confirmButton = { AlertDialogDefaults.ConfirmButton(onClick = { /* confirm */ }) },
)
```

```kotlin
public fun ConfirmationDialog(
    visible: Boolean,
    onDismissRequest: () -> Unit,
    curvedText: (CurvedScope.() -> Unit)?,
    modifier: Modifier = Modifier,
    colors: ConfirmationDialogColors = ConfirmationDialogDefaults.colors(),
    properties: DialogProperties = DialogProperties(),
    durationMillis: Long = ConfirmationDialogDefaults.DurationMillis,
    content: @Composable () -> Unit,
)
```

```kotlin
@Composable
public fun OpenOnPhoneDialog(
    visible: Boolean,
    onDismissRequest: () -> Unit,
    curvedText: (CurvedScope.() -> Unit)?,
    modifier: Modifier = Modifier,
    colors: OpenOnPhoneDialogColors = OpenOnPhoneDialogDefaults.colors(),
    properties: DialogProperties = DialogProperties(),
    durationMillis: Long = OpenOnPhoneDialogDefaults.DurationMillis,
    content: @Composable () -> Unit = { OpenOnPhoneDialogDefaults.Icon() },
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `visible` | `Boolean` | — | Controls show/hide with an animated transition. |
| `onDismissRequest` | `() -> Unit` | — | Called when the dialog is dismissed (back gesture, timeout, or dismiss button). |
| `confirmButton` / `dismissButton` (AlertDialog) | `@Composable RowScope.() -> Unit` | — / `AlertDialogDefaults.DismissButton(...)` | Bottom action buttons. |
| `title` (AlertDialog) | `@Composable () -> Unit` | — | Dialog title. |
| `icon` (AlertDialog) | `@Composable (() -> Unit)?` | `null` | Optional leading icon. |
| `content` (AlertDialog) | `(ScalingLazyListScope.() -> Unit)?` | `null` | Optional scrollable list content instead of/around `text`. |
| `curvedText` (ConfirmationDialog / OpenOnPhoneDialog) | `(CurvedScope.() -> Unit)?` | — | Short curved caption text. |
| `durationMillis` | `Long` | `ConfirmationDialogDefaults.DurationMillis` / `OpenOnPhoneDialogDefaults.DurationMillis` | Auto-dismiss delay. |
| `content` (ConfirmationDialog / OpenOnPhoneDialog) | `@Composable () -> Unit` | icon content | Central icon/animation. |

## Notes

- `AlertDialog` has multiple overloads: with `TransformationSpec`, without dedicated button slots, and with an `EdgeButton` instead of `confirmButton`/`dismissButton` — check the source for the exact overload needed.
- `ConfirmationDialog` also has `SuccessConfirmationDialog` / `FailureConfirmationDialog` convenience wrappers (and `*Content` variants) with preset icon/color styling in the same file.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [Picker / PickerGroup / DatePicker / TimePicker](./picker.md)
