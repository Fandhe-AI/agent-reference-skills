# Typography

Holds the Material 3 type scale (15 `TextStyle` roles, plus expressive "Emphasized" variants) used across components. Provided to `MaterialTheme` and read via `MaterialTheme.typography`.

## Signature / Usage

```kotlin
class Typography(
    val displayLarge: TextStyle = typographyTokens.DisplayLarge,
    val displayMedium: TextStyle = typographyTokens.DisplayMedium,
    val displaySmall: TextStyle = typographyTokens.DisplaySmall,
    val headlineLarge: TextStyle = typographyTokens.HeadlineLarge,
    val headlineMedium: TextStyle = typographyTokens.HeadlineMedium,
    val headlineSmall: TextStyle = typographyTokens.HeadlineSmall,
    val titleLarge: TextStyle = typographyTokens.TitleLarge,
    val titleMedium: TextStyle = typographyTokens.TitleMedium,
    val titleSmall: TextStyle = typographyTokens.TitleSmall,
    val bodyLarge: TextStyle = typographyTokens.BodyLarge,
    val bodyMedium: TextStyle = typographyTokens.BodyMedium,
    val bodySmall: TextStyle = typographyTokens.BodySmall,
    val labelLarge: TextStyle = typographyTokens.LabelLarge,
    val labelMedium: TextStyle = typographyTokens.LabelMedium,
    val labelSmall: TextStyle = typographyTokens.LabelSmall,
    // + displayLargeEmphasized...labelSmallEmphasized (emphasized counterparts, public val, no experimental gating)
)
```

```kotlin
val replyTypography = Typography(
    titleLarge = TextStyle(fontWeight = FontWeight.SemiBold, fontSize = 22.sp, lineHeight = 28.sp),
    bodyLarge = TextStyle(fontWeight = FontWeight.Normal, fontSize = 16.sp, lineHeight = 24.sp),
)

MaterialTheme(typography = replyTypography) { /* app content */ }

Text(text = "Hello M3 theming", style = MaterialTheme.typography.titleLarge)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `displayLarge/Medium/Small` | `TextStyle` | `typographyTokens.DisplayLarge/Medium/Small` | Largest text on screen, short and important. 57/45/36 sp. |
| `headlineLarge/Medium/Small` | `TextStyle` | `typographyTokens.HeadlineLarge/Medium/Small` | High-emphasis, short text. 32/28/24 sp. |
| `titleLarge/Medium/Small` | `TextStyle` | `typographyTokens.TitleLarge/Medium/Small` | Medium-emphasis text, shorter than headline. 22/16/14 sp. |
| `bodyLarge/Medium/Small` | `TextStyle` | `typographyTokens.BodyLarge/Medium/Small` | Longer-form readable text. 16/14/12 sp. |
| `labelLarge/Medium/Small` | `TextStyle` | `typographyTokens.LabelLarge/Medium/Small` | Small, high-utility text (buttons, captions). 14/12/11 sp. |
| `display/headline/title/body/label*Emphasized` (15 roles) | `TextStyle` | `typographyTokens.*Emphasized` | Emphasized counterpart of each base role above (e.g. `displayLargeEmphasized` pairs with `displayLarge`). Public `val` properties, no experimental annotation. |

## Notes

- Unlike Material 2, M3 `Typography` has no `defaultFontFamily` parameter — set `fontFamily` per `TextStyle` instead.
- Access via `MaterialTheme.typography.<role>`; apply with `Text(style = MaterialTheme.typography.bodyMedium)`.
- Package: `androidx.compose.material3`.

## Related

- [MaterialTheme](./material-theme.md)
- [Migrating from Material 2 to Material 3](./material2-material3-migration.md)
