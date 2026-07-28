# IntrinsicSize

An enum used with `Modifier.width` / `Modifier.height` to size content to its intrinsic minimum or maximum, letting siblings in a `Row`/`Column` match each other's size without a fixed value.

## Signature / Usage

```kotlin
public enum class IntrinsicSize {
    Min,
    Max,
}

@Stable
public fun Modifier.width(intrinsicSize: IntrinsicSize): Modifier

@Stable
public fun Modifier.height(intrinsicSize: IntrinsicSize): Modifier
```

```kotlin
Row(Modifier.height(IntrinsicSize.Min)) {
    Text("Short", Modifier.fillMaxHeight())
    Divider(Modifier.fillMaxHeight().width(1.dp))
    Text("Longer text wraps", Modifier.fillMaxHeight())
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `IntrinsicSize.Min` | enum value | — | Uses the content's minimum intrinsic size. |
| `IntrinsicSize.Max` | enum value | — | Uses the content's maximum intrinsic size. |

## Notes

- `Modifier.width(intrinsicSize)` declares preferred width equal to the content's min/max intrinsic width; incoming constraints may still force a different size.
- `Modifier.height(intrinsicSize)` behaves the same for height.
- Common pattern: apply `Modifier.height(IntrinsicSize.Min)` on a `Row` so all children can safely use `fillMaxHeight()` without infinite-constraint crashes.
- Package: `androidx.compose.foundation.layout`.

## Related

- [modifier-layout](./modifier-layout.md)
- [Row](./row.md)
- [Column](./column.md)
