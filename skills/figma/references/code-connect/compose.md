# Connecting Jetpack Compose Components

Connect Jetpack Compose components to Figma using Code Connect annotations and the Gradle plugin.

## Signature / Usage

```kotlin
@FigmaConnect(url = "https://www.figma.com/file/...")
class ButtonDoc {
    @FigmaProperty(FigmaType.Text, "Label")
    val label = "Click me"

    @FigmaProperty(FigmaType.Boolean, "Disabled")
    val disabled = false

    @FigmaProperty(FigmaType.Enum, "Type")
    val type: ButtonType = Figma.mapping(
        "Primary" to ButtonType.Primary,
        "Secondary" to ButtonType.Secondary
    )

    @Composable
    fun Component() {
        Button(label = label, disabled = disabled, type = type)
    }
}
```

## Options / Props

### Gradle setup (required)

Add to `build.gradle.kts`:

| Dependency | Version |
|-----------|---------|
| `com.figma.code.connect` plugin | v1.2.9 |
| `code-connect-lib` | v1.1.3 |
| Kotlin | v2.2.10 |

### Core annotations

| Annotation | Description |
|-----------|-------------|
| `@FigmaConnect(url = "...")` | Links a class to a Figma component node URL |
| `@FigmaProperty(FigmaType, "PropName")` | Maps a Figma design property to a Kotlin variable |
| `@FigmaVariant("PropName", "Value")` | Restricts a connection class to a specific variant |
| `@FigmaChildren("LayerName", ...)` | Renders code for nested instances by layer name |

### `FigmaType` values

| Value | Maps to |
|-------|---------|
| `FigmaType.Text` | String text property |
| `FigmaType.Boolean` | Boolean property |
| `FigmaType.Enum` | Variant/enum property |
| `FigmaType.Instance` | Nested component instance |

### `Figma.mapping()` helper

Creates property-to-code mappings for enums, booleans, and custom transformations:

```kotlin
// Enum mapping
val type: ButtonType = Figma.mapping(
    "Primary" to ButtonType.Primary,
    "Secondary" to ButtonType.Secondary
)

// Boolean-to-component mapping
@FigmaProperty(FigmaType.Boolean, "Has Icon")
val icon: @Composable () -> Unit = Figma.mapping(
    true to { Icon(Icons.Default.Star) },
    false to { }
)
```

### Variant-specific connections

```kotlin
@FigmaConnect(url = "https://...")
@FigmaVariant("Type", "Primary")
class PrimaryButtonDoc {
    @Composable
    fun Component() { PrimaryButton() }
}
```

## Notes

- `@FigmaChildren` accepts one or more layer names as arguments
- Ensure the Kotlin and plugin versions match the requirements listed above — mismatches cause build failures

## Related

- [Config File](./config-file.md)
- [CLI Reference](./cli-reference.md)
- [Comparing CLI and UI](./comparing-cc.md)
