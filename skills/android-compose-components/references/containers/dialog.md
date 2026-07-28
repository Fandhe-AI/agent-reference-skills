# Dialog

A basic, unstyled composable container for fully custom dialog content, with no predefined slots or styling.

## Signature / Usage

```kotlin
@Composable
fun Dialog(
    onDismissRequest: () -> Unit,
    properties: DialogProperties = DialogProperties(),
    content: @Composable () -> Unit,
)
```

```kotlin
Dialog(onDismissRequest = { /* dismiss */ }) {
    Card(
        modifier = Modifier.fillMaxWidth().height(200.dp).padding(16.dp),
        shape = RoundedCornerShape(16.dp),
    ) {
        Text(
            text = "This is a minimal dialog",
            modifier = Modifier.fillMaxSize().wrapContentSize(Alignment.Center),
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDismissRequest` | `() -> Unit` | — | Called when the user closes the dialog. |
| `properties` | `DialogProperties` | `DialogProperties()` | Customizes size, dismiss-on-back/outside-click, and other window behavior. |
| `content` | `@Composable () -> Unit` | — | Dialog content; caller is responsible for size, shape, and container (e.g. wrap in `Card` or `Surface`). |

## Notes

- Distinct from the same-named page in the `android-navigation` skill's `nav-compose` category, which covers `NavGraphBuilder.dialog` navigation destination declarations, not this composable.
- Package: `androidx.compose.ui.window` — distinct from the Material-themed [AlertDialog](./alertdialog.md) in `androidx.compose.material3`.
- Use `Dialog` when `AlertDialog` / `BasicAlertDialog` slots are too restrictive for the desired layout.

## Related

- [AlertDialog](./alertdialog.md)
