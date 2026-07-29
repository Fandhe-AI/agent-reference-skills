# text-input

| Name | Description | Path |
|------|-------------|------|
| AnnotatedString / buildAnnotatedString | A string annotated with character-level (`SpanStyle`) and paragraph-level (`ParagraphStyle`) style ranges, plus optional link/TTS/string annotations. | [annotatedstring.md](./annotatedstring.md) |
| Autofill (ContentType) | The Compose Autofill API lets `BasicTextField`/`TextField` integrate with system autofill services (password managers, credential providers). | [autofill.md](./autofill.md) |
| BasicText | Foundation-level composable that displays text with semantics/accessibility information but without Material Design styling. | [basictext.md](./basictext.md) |
| Modifier.basicMarquee | Applies an animated marquee (auto-scrolling) effect to content that's too wide to fit in the available space. | [basicmarquee.md](./basicmarquee.md) |
| BasicTextField | Foundation-level composable for editable text with hardware/software keyboard support but no decorations (no hint, placeholder, border). | [basictextfield.md](./basictextfield.md) |
| LocalClipboard / Clipboard / ClipEntry | `LocalClipboard` is the modern CompositionLocal for reading and writing the platform clipboard from Compose. | [clipboard.md](./clipboard.md) |
| Emoji display (EmojiSupportMatch) | Compose (BOM March 2023 / Compose UI 1.4+) resolves modern, variable-width emoji automatically in text composables. | [emoji.md](./emoji.md) |
| FontFamily / Font | `FontFamily` is the primary typography interface for Compose; it groups one or more `Font`s that together represent a typeface. | [fontfamily.md](./fontfamily.md) |
| KeyboardOptions / KeyboardActions / ImeAction | `KeyboardOptions` configures the soft keyboard shown for a text field (layout, capitalization, IME action hint). | [keyboardoptions.md](./keyboardoptions.md) |
| ParagraphStyle | Paragraph-level styling configuration used within an `AnnotatedString` to style alignment, direction, line height, and indentation. | [paragraphstyle.md](./paragraphstyle.md) |
| SelectionContainer / DisableSelection | `SelectionContainer` enables text selection (and copy/paste) for its child composables, which are not selectable by default. | [selectioncontainer.md](./selectioncontainer.md) |
| SpanStyle | Character-level styling configuration used within an `AnnotatedString` to style text color, font, background, decoration, and shadow. | [spanstyle.md](./spanstyle.md) |
| TextAlign / TextOverflow / TextDecoration | Small value/inline classes controlling horizontal alignment, overflow handling, and line decoration for text. | [textalign.md](./textalign.md) |
| TextFieldState / rememberTextFieldState | `TextFieldState` is a hoistable class that holds and manages editable text content, selection, and IME composition for text fields. | [textfieldstate.md](./textfieldstate.md) |
| rememberTextMeasurer / TextMeasurer | `TextMeasurer` measures text outside of the normal layout pass, producing a `TextLayoutResult`. | [textmeasurer.md](./textmeasurer.md) |
| TextStyle | Styling configuration for an entire block of text, combining both character-level and paragraph-level properties into a single class. | [textstyle.md](./textstyle.md) |
| VisualTransformation / InputTransformation / OutputTransformation | Three complementary interfaces that change how text field content is filtered or displayed. | [visualtransformation.md](./visualtransformation.md) |
