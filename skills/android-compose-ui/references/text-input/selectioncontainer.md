# SelectionContainer / DisableSelection

`SelectionContainer` enables text selection (and copy/paste) for its child composables, which are not selectable by default. `DisableSelection` opts a nested subtree back out of selection when wrapped inside a `SelectionContainer`.

## Signature / Usage

```kotlin
@Composable
public fun SelectionContainer(modifier: Modifier = Modifier, content: @Composable () -> Unit)

@Composable
public fun SelectionContainer(
    state: SelectionState,
    modifier: Modifier = Modifier,
    content: @Composable () -> Unit,
)

@Composable
public fun DisableSelection(content: @Composable () -> Unit)
```

```kotlin
SelectionContainer {
    Column {
        Text("This text is selectable")
        DisableSelection {
            Text("This text is not selectable")
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `SelectionState` | — | Overload that exposes/controls the current selection programmatically (e.g. `selectAll`, `clear`). |
| `modifier` | `Modifier` | `Modifier` | Applied to the container. |
| `content` | `@Composable () -> Unit` | — | Child composables that become selectable. |

## Notes

- Package: `androidx.compose.foundation.text.selection`.
- Copy uses the platform clipboard; text can also be copied programmatically via `ClipboardManager.setText(...)`.
- `TextField`/`BasicTextField` manage their own selection internally and do not need to be wrapped in `SelectionContainer`.

## Related

- Text — owned by the `android-compose-components` skill (`references/feedback/text.md`)
- [BasicText](./basictext.md)
