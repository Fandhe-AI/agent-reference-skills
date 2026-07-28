# Resource directories and the R class

Directory types under `res/` and how generated resource IDs (`R` class) reference them.

## Signature / Usage

```
MyProject/
    res/
        drawable/       icon.png, vector/shape XML
        mipmap/         launcher icon densities
        layout/         View-system UI layouts (obsolete in Compose)
        values/         strings.xml, colors.xml, dimens.xml, styles.xml, ...
        raw/            arbitrary files (Resources.openRawResource())
        xml/            arbitrary XML config files (Resources.getXML())
        font/           TTF/OTF/TTC files or <font-family> XML
        anim/           property animations (View system; use Compose animation instead)
        menu/           menu definitions
        color/          color state lists
```

```kotlin
// Reference syntax: [package.]R.<resource_type>.<resource_name>
val iconId = R.drawable.icon
context.getString(R.string.hello_world)
```

## Options / Props

| Directory | Content |
|-----------|---------|
| `drawable/` | Bitmap files (PNG, JPG, GIF, WEBP) and XML drawables (shapes, state lists, vectors, animations) |
| `mipmap/` | Launcher icon variants across densities |
| `values/` | Simple values: strings, integers, colors, dimensions, styles, arrays, bools, ids — one XML file per category by convention (`strings.xml`, `colors.xml`, `dimens.xml`, `styles.xml`) |
| `raw/` | Arbitrary files accessed via `Resources.openRawResource()` |
| `xml/` | Arbitrary XML files readable via `Resources.getXML()` |
| `font/` | Font files or `<font-family>` XML |
| `layout/` | View-system UI layouts |
| `anim/` | View-system property/tween animations |
| `menu/` | Menu definitions |
| `color/` | Color state lists |

## Notes

- The `aapt` build tool generates the `R` class automatically from everything under `res/`; resource names must be unique within their type.
- `assets/` is a separate top-level directory for raw files that do **not** receive resource IDs; accessed via `AssetManager`, not `R`.
- Resources must live in a type subdirectory; placing files directly in `res/` is invalid, and alternative resource directories cannot be nested (`res/drawable/drawable-en/` is invalid).
- In Compose, prefer `stringResource()` / `painterResource()` etc. over manual `Resources` access — see [Compose resource access](./compose-resource-access.md).

## Related

- [resource qualifiers](./resource-qualifiers.md)
- [string resources](./string-resources.md)
- [value resources](./value-resources.md)
