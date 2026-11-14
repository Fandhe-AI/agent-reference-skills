# Watermarking in Windows AI text APIs

Starting in October 2026, output from some APIs in the `Microsoft.Windows.AI.Text` namespace includes an invisible watermark indicating the text is AI-generated. Apps that render, parse, or convert generated text must account for it.

## Signature / Usage

Adapted (not in the official docs): the block below restates the watermark code point sequence given in the official prose.

```text
U+200B U+034F U+2060 U+200B
```

## Options / Props

APIs that automatically include a watermark:

| API | Class |
|------|-------------|
| `GenerateResponseAsync` | `LanguageModel` |
| `GenerateResponseFromEmbeddingsAsync` | `LanguageModel` |
| `RewriteAsync` | `TextRewriter` |
| `RewriteCustomAsync` | `TextRewriter` |
| `SummarizeAsync` | `TextSummarizer` |
| `SummarizeConversationAsync` | `TextSummarizer` |
| `SummarizeParagraphAsync` | `TextSummarizer` |

Watermarking scheme (four Unicode code points, in this order):

| Position | Code point | Unicode name |
|------|------|-------------|
| 0 | U+200B | ZERO WIDTH SPACE |
| 1 | U+034F | COMBINING GRAPHEME JOINER |
| 2 | U+2060 | WORD JOINER |
| 3 | U+200B | ZERO WIDTH SPACE |

## Notes

- Adapted (not in the official docs): the Signature block restates the watermark code point sequence given in the official prose.
- The APIs use heuristics to decide whether and where to insert the watermark. A response can contain zero, one, or multiple copies of the sequence; heuristics avoid places where it would affect word breaking. Locations vary between responses and the heuristics change over time, so don't rely on a fixed location or assume every response contains the sequence.
- Text rendering: most rendering doesn't display these code points, but they can affect text selection and cursor movement.
- Structured and formatted output (Markdown, generated code or markup such as HTML or CSS, JSON that is then parsed): make sure parsing logic handles the sequence wherever it occurs, including multiple copies.
- Character encoding: most non-Unicode code pages can't represent the watermark; converting a response can produce errors, fallback characters, or other unexpected characters, depending on the conversion API.
- You are responsible for ensuring your app satisfies the requirements for marking AI-generated content that apply to it; consider them before removing the automatically inserted watermark.
- `GenerateStructuredJsonResponseAsync` is not listed among the watermarked APIs; the structured output page contrasts it with `GenerateResponseAsync` for JSON generation.
- Source: https://learn.microsoft.com/en-us/windows/ai/apis/text-watermarking (retrieved 2026-11-14)

## Related

- [LanguageModel](./language-model.md)
- [Generate structured JSON output with Phi Silica](./phi-silica-structured-output.md)
- [Text Intelligence Skills](./text-intelligence-skills.md)
