# Scaffold

Implements the basic Material Design visual layout structure, coordinating top bar, bottom bar, FAB, and snackbar host around a content slot.

## Signature / Usage

```kotlin
@Composable
fun Scaffold(
    modifier: Modifier = Modifier,
    topBar: @Composable () -> Unit = {},
    bottomBar: @Composable () -> Unit = {},
    snackbarHost: @Composable () -> Unit = {},
    floatingActionButton: @Composable () -> Unit = {},
    floatingActionButtonPosition: FabPosition = FabPosition.End,
    containerColor: Color = MaterialTheme.colorScheme.background,
    contentColor: Color = contentColorFor(containerColor),
    contentWindowInsets: WindowInsets = ScaffoldDefaults.contentWindowInsets,
    content: @Composable (PaddingValues) -> Unit,
)
```

```kotlin
Scaffold(
    topBar = { TopAppBar(title = { Text("Top app bar") }) },
    floatingActionButton = {
        FloatingActionButton(onClick = { /* action */ }) {
            Icon(Icons.Default.Add, contentDescription = "Add")
        }
    }
) { innerPadding ->
    Column(modifier = Modifier.padding(innerPadding)) {
        Text("Content")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the root layout. |
| `topBar` | `@Composable () -> Unit` | `{}` | App bar shown at the top of the screen. |
| `bottomBar` | `@Composable () -> Unit` | `{}` | App bar shown at the bottom of the screen. |
| `snackbarHost` | `@Composable () -> Unit` | `{}` | Slot for displaying snackbar messages. |
| `floatingActionButton` | `@Composable () -> Unit` | `{}` | FAB hosted at `floatingActionButtonPosition`. |
| `floatingActionButtonPosition` | `FabPosition` | `FabPosition.End` | Position of the FAB. |
| `containerColor` | `Color` | `MaterialTheme.colorScheme.background` | Background color of the scaffold. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Default content color. |
| `contentWindowInsets` | `WindowInsets` | `ScaffoldDefaults.contentWindowInsets` | Window insets applied to the content area. |
| `content` | `@Composable (PaddingValues) -> Unit` | — | Main screen content; must apply the received `PaddingValues`. |

## Notes

- The `content` lambda receives `PaddingValues` that must be applied to the root of the content to avoid overlap with the top/bottom bars and FAB.
- Package: `androidx.compose.material3`.

## Related

- [Card](./card.md)
- [Surface](./surface.md)
