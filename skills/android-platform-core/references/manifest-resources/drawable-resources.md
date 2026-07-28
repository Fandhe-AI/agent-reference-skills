# Drawable resources

XML-defined and bitmap drawable types under `res/drawable/`, including shapes and vectors.

## Signature / Usage

```xml
<!-- res/drawable/gradient_box.xml -->
<shape xmlns:android="http://schemas.android.com/apk/res/android"
    android:shape="rectangle">
    <gradient
        android:startColor="#FFFF0000"
        android:endColor="#80FF00FF"
        android:angle="45"/>
    <padding android:left="7dp" android:top="7dp" android:right="7dp" android:bottom="7dp" />
    <corners android:radius="8dp" />
</shape>
```

```xml
<TextView android:background="@drawable/gradient_box" ... />
```

```kotlin
val shape = ResourcesCompat.getDrawable(resources, R.drawable.gradient_box, theme)
```

## Options / Props

| Type | Purpose |
|------|---------|
| Bitmap | PNG, WEBP, JPG, or GIF raster image |
| Nine-Patch (`.9.png`) | Resizable PNG with stretchable regions |
| Layer List | Stacks multiple drawables |
| State List | Different drawables per widget state (pressed, focused, ...) |
| Level List | Different drawables selected by a numerical level |
| Transition | Cross-fades between two drawables |
| Inset | Insets another drawable by a fixed distance |
| Clip | Clips another drawable based on a level |
| Scale | Scales another drawable based on a level |
| Shape (`<shape>`) | Geometric rectangle/oval/line/ring with solid fill, gradient, stroke, corners, padding, size |
| Vector (`<vector>`) | Scalable vector graphic defined by path data |
| Animated vector | Animates properties of a vector drawable |

### `<shape>` key attributes

| Element | Attributes |
|---------|------------|
| `<shape>` | `android:shape="rectangle\|oval\|line\|ring"` |
| `<corners>` | `android:radius`, `topLeftRadius`, `topRightRadius`, `bottomLeftRadius`, `bottomRightRadius` |
| `<gradient>` | `android:angle`, `startColor`, `endColor`, `centerColor`, `type="linear\|radial\|sweep"`, `gradientRadius`, `useLevel` |
| `<solid>` | `android:color` |
| `<stroke>` | `android:width`, `color`, `dashWidth`, `dashGap` |
| `<padding>` / `<size>` | `left`/`top`/`right`/`bottom`, `width`/`height` |

## Notes

- Vector drawables (`<vector>`) are preferred over bitmaps for icons since they scale to any density without separate density-qualified assets.
- Reference from XML with `@drawable/name`, or from code with `ResourcesCompat.getDrawable(resources, R.drawable.name, theme)`; in Compose use `painterResource()`.
- For adaptive launcher icons (foreground/background/monochrome layers), see [adaptive icons](./adaptive-icons.md).

## Related

- [resource directories](./resource-directories.md)
- [adaptive icons](./adaptive-icons.md)
- [Compose resource access](./compose-resource-access.md)
