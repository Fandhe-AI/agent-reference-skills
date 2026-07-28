# bool, color, dimen, id, integer, and array resources

Simple scalar and array value resources declared under `res/values/`.

## Signature / Usage

```xml
<!-- res/values/filename.xml -->
<resources>
    <bool name="screen_small">true</bool>
    <color name="opaque_red">#FF0000</color>
    <dimen name="font_size">16sp</dimen>
    <item type="id" name="dialog_exit" />
    <integer name="max_speed">120</integer>

    <integer-array name="bits">
        <item>4</item>
        <item>8</item>
    </integer-array>

    <array name="icons">
        <item>@drawable/icon1</item>
        <item>@drawable/icon2</item>
    </array>
</resources>
```

```kotlin
val screenIsSmall = resources.getBoolean(R.bool.screen_small)
val color = resources.getColor(R.color.opaque_red)
val fontSize = resources.getDimension(R.dimen.font_size)
val maxSpeed = resources.getInteger(R.integer.max_speed)
val bits = resources.getIntArray(R.array.bits)
val icons = resources.obtainTypedArray(R.array.icons)
```

## Options / Props

| Element | Value | Reference |
|---------|-------|-----------|
| `<bool name>` | `true` \| `false` | `R.bool.name` / `@bool/name` |
| `<color name>` | Hex `#RGB`, `#ARGB`, `#RRGGBB`, `#AARRGGBB` | `R.color.name` / `@color/name` |
| `<dimen name>` | Number + unit: `dp`, `sp`, `pt`, `px`, `mm`, `in` | `R.dimen.name` / `@dimen/name` |
| `<item type="id" name>` | — (no value) | `R.id.name` / `@id/name` or `@+id/name` to create |
| `<integer name>` | Integer literal | `R.integer.name` / `@integer/name` |
| `<integer-array name>` | `<item>` children, integers | `R.array.name` / `@array/name` (as `IntArray`) |
| `<array name>` | `<item>` children, any resource reference | `R.array.name` / `@array/name` (as `TypedArray`) |

## Notes

- All live under `res/values/` (any filename); conventional filenames are `bools.xml`, `colors.xml`, `dimens.xml`, `ids.xml`, `integers.xml`, `arrays.xml`.
- `dp`/`sp` are density-independent; prefer them over `px` for layout dimensions and text sizes respectively.
- In Compose, prefer `dimensionResource()` / `colorResource()` over direct `Resources` calls — see [Compose resource access](./compose-resource-access.md).

## Related

- [string resources](./string-resources.md)
- [style and theme resources](./style-theme-resources.md)
