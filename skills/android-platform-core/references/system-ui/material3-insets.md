# Material 3 insets

How Material 3 components consume and expose window insets, including `Scaffold`'s `contentWindowInsets` parameter.

## Signature / Usage

```kotlin
Scaffold { innerPadding ->
    LazyColumn(
        // Scaffold doesn't consume insets by default
        modifier = Modifier.consumeWindowInsets(innerPadding),
        contentPadding = innerPadding
    ) {
        // content here
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Scaffold`'s `contentWindowInsets` | `WindowInsets` | `ScaffoldDefaults.contentWindowInsets` | Insets supplied to the content lambda as `PaddingValues`; must be manually consumed and applied by the caller. |
| `TopAppBar` / `CenterAlignedTopAppBar` / `MediumTopAppBar` / `LargeTopAppBar` `windowInsets` | `WindowInsets` | top + horizontal insets | App bars apply top and horizontal insets automatically. |
| `BottomAppBar` `windowInsets` | `WindowInsets` | bottom + horizontal insets | Applies bottom and horizontal insets automatically. |
| `NavigationBar` `windowInsets` | `WindowInsets` | bottom + horizontal insets | Applies bottom and horizontal insets automatically. |
| `NavigationRail` `windowInsets` | `WindowInsets` | vertical + start insets | Applies vertical and start insets automatically. |
| `ModalBottomSheet` `windowInsets` | `WindowInsets` | bottom insets | Applies bottom insets automatically. |
| Drawer sheets (Modal/Dismissible/Permanent) `windowInsets` | `WindowInsets` | vertical + start insets | Applies vertical and start insets automatically. |

```kotlin
LargeTopAppBar(
    windowInsets = WindowInsets(0, 0, 0, 0),
    title = { Text("Hi") }
)
```

## Notes

- `Scaffold` does **not** automatically apply insets to its content; it only provides them via the content lambda's `PaddingValues`.
- Most Material 3 composables handle insets automatically based on their placement; override with an empty `WindowInsets(0, 0, 0, 0)` to disable.
- Material 2 components do not handle insets automatically and require manual application.
- Package: `androidx.compose.material3`.

## Related

- [WindowInsets](./window-insets.md)
- [Modifier.windowInsetsPadding and friends](./window-insets-modifiers.md)
