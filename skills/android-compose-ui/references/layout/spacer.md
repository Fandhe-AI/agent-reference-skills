# Spacer

Component that represents an empty space layout, whose size is defined via size modifiers.

## Signature / Usage

```kotlin
@Composable
@NonRestartableComposable
public fun Spacer(modifier: Modifier)
```

```kotlin
Spacer(Modifier.size(16.dp))
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | — | Modifiers to apply; use `Modifier.width`, `Modifier.height`, or `Modifier.size` to give the Spacer a nonzero size. |

## Notes

- Without a size modifier a `Spacer` takes zero space.
- Package: `androidx.compose.foundation.layout`.

## Related

- [modifier-layout](./modifier-layout.md)
- [Column](./column.md)
- [Row](./row.md)
