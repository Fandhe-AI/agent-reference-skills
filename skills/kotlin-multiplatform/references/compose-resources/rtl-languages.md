---
source: https://kotlinlang.org/docs/multiplatform/compose-rtl.html
---

# Working with RTL languages

Compose Multiplatform supports Right-to-Left languages such as Arabic, Hebrew, and Persian: layouts, alignment, and text input adjust automatically according to the system locale.

## Signature / Usage

Force a layout direction for a scope (to keep logos or icons unmirrored, or to set it for an entire app) with `CompositionLocalProvider`, using `LayoutDirection.Rtl` or `LayoutDirection.Ltr`:

```kotlin
CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Ltr) {
    Column(modifier = Modifier.fillMaxWidth()) {
        // Components in this block will be laid out left-to-right
        Text("LTR Latin")
        TextField("Hello world\nHello world")
    }
}
```

### Layout mirroring

In an RTL locale most components are mirrored:

- Paddings, margins, alignments: in `Modifier.padding(start: Dp, top: Dp, end: Dp, bottom: Dp)`, `start` is the left side in LTR and the right side in RTL.
- Default `Start` alignment (text, navigation items, icons) becomes `End`.
- Horizontal lists reverse item alignment and scroll direction.
- Button positions (for example Cancel and Confirm) adjust to RTL expectations.

### Text input in RTL layouts

- Cursor: moves with the logical direction of characters (typing Arabic moves right-to-left; inserting LTR content follows left-to-right). Selection, deletion, and insertion respect natural flow.
- BiDi text: rendered with the Unicode Bidirectional Algorithm, with punctuation and numbers aligned correctly.
- Numbers and emojis: displayed consistently based on the direction of surrounding text; Eastern Arabic numerals align naturally in RTL text, Western Arabic numerals follow LTR behavior.

BiDi test sample (condensed from the official sample, which also defines a `TextField` wrapper over `BasicTextField`):

```kotlin
// Arabic text for "Hello World"
private val helloWorldArabic = "مرحبا بالعالم"

// Bidirectional text
private val bidiText = "Hello $helloWorldArabic world"

item {
    CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Text("Arabic and BiDi in RTL")
            TextField(helloWorldArabic)
            TextField(bidiText)
        }
    }
}
```

### Fonts for web targets

Web targets lack built-in fonts for some locales (such as Arabic and Chinese); add custom fallback fonts to resources and preload them with `FontFamily.Resolver.preload()`:

```kotlin
val fontFamilyResolver = LocalFontFamilyResolver.current
val fontsLoaded = remember { mutableStateOf(false) }

if (fontsLoaded.value) {
   app.Content()
}

LaunchedEffect(Unit) {
   val notoEmojisBytes = loadEmojisFontAsBytes()
   val fontFamily = FontFamily(listOf(Font("NotoColorEmoji", notoEmojisBytes)))
   fontFamilyResolver.preload(fontFamily)
   fontsLoaded.value = true
}
```

### Accessibility in RTL layouts

- Screen readers adapt automatically: RTL text is read right to left, mixed-direction text follows BiDi rules, punctuation and numbers are announced in correct sequence. In complex layouts, define traversal semantics for correct reading order.
- Focus navigation follows the mirrored structure (right to left, top to bottom); swipes and taps are adjusted. Traversal semantics and indexes are described in the Accessibility page (traversal order section).

## Notes

- Known issues listed by the docs: caret position while typing non-RTL characters in an RTL layout (CMP-3096), caret position for Arabic digits (CMP-2772), `TextDirection.Content` (CMP-2446).
- The page states that fallback fonts for web are "not enabled automatically" and need manual preloading; the web-resources page describes automatic font fallback (Experimental, since 1.12.0) that downloads Noto font subsets on demand.
- Common `LocalLayoutDirection` / `LayoutDirection` are androidx Compose APIs documented in android-compose-ui; this page covers their behavior in Compose Multiplatform.

## Related

- [Handling web resources](./web-resources.md)
- [Localizing strings](./localize-strings.md)
- [Localization tests](./localization-tests.md)
