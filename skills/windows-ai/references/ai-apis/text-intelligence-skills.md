# Text Intelligence Skills (TextSummarizer / TextRewriter / TextToTableConverter)

Predefined text-transformation classes that wrap a `LanguageModel` instance to deliver structured, concise, formatted responses without hand-writing prompts: summarizing, rewriting (with tone control), and converting text to a table.

## Signature / Usage

```csharp
using Microsoft.Windows.AI.Text;

using LanguageModel languageModel = await LanguageModel.CreateAsync();

var textSummarizer = new TextSummarizer(languageModel);
string text = "This is a large amount of text I want to have summarized.";
var result = await textSummarizer.SummarizeAsync(text);

Console.WriteLine(result.Text);
```

## Options / Props

| Member | Description |
|------|-------------|
| `TextSummarizer(LanguageModel)` | Constructor. |
| `TextSummarizer.SummarizeAsync(string)` | Summarizes the text input. |
| `TextSummarizer.SummarizeParagraphAsync(string)` | Summarizes a single paragraph of text input. |
| `TextSummarizer.SummarizeConversationAsync(IVectorView<ConversationItem>, ConversationSummaryOptions)` | Summarizes the text of a multi-turn conversation. |
| `TextSummarizer.IsPromptLargerThanContext(string, UInt64)` / `(ConversationItem[], ConversationSummaryOptions, UInt64)` | Returns whether the given text/conversation is too large for the model's context window. |
| `TextRewriter(LanguageModel)` | Constructor. |
| `TextRewriter.RewriteAsync(string)` | Rewrites the text in the default tone (`TextRewriteTone.Default`, equivalent to `General`). |
| `TextRewriter.RewriteAsync(string, TextRewriteTone)` | Rewrites the text in the specified tone. |
| `TextRewriter.RewriteCustomAsync(string, string)` | Rewrites the text using a second string parameter; official docs list the signature without further detail. |
| `TextToTableConverter(LanguageModel)` | Constructor. |
| `TextToTableConverter.ConvertAsync(string)` | Formats the text input into a structured table. |

`TextRewriteTone` enum:

| Value | Description |
|------|-------------|
| `Default` (0) | Equivalent to `General`. |
| `General` (1) | General purpose, prioritizing neutrality. |
| `Casual` (2) | Friendly, conversational, casual language. |
| `Concise` (3) | Prioritizes clarity and brevity. |
| `Formal` (4) | Professional, business-like; avoids bias, slang, or overly casual language. |

## Notes

- Namespace: `Microsoft.Windows.AI.Text`. All three classes require an existing `LanguageModel` instance passed to their constructor — ensure Phi Silica is ready (`LanguageModel.GetReadyState`/`EnsureReadyAsync`) before constructing them.
- This corrects spelling/grammar and enhances word choice while preserving the original intent and meaning of the text (`TextRewriter`).
- Text-to-table formats the response as a structured table "when appropriate" per the source docs — it is model-driven, not a guaranteed schema.

## Related

- [LanguageModel](./language-model.md)
- [LanguageModelOptions and ContentFilterOptions](./language-model-options.md)
