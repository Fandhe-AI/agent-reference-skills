---
source: https://docs.flutter.dev/ai/best-practices/prompting
---

# Prompting

How to build and optimize generative AI prompts in Flutter with the Firebase AI Logic SDK: prompt construction, layering a system instruction with per-request prompts, parameterizing prompts, and prompt versioning.

## Signature / Usage

Create the model with a system instruction ("this is what you do"):

```dart
// The model for solving clues.
_clueSolverModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-flash',
  systemInstruction: Content.text(clueSolverSystemInstruction),
  ...
);
```

Build the per-request prompt dynamically ("now do this"):

```dart
String getSolverPrompt(Clue clue, int length, String pattern) =>
'''
Your task is to solve the following crossword clue.

**Clue:** "${clue.text}"

**Constraints:**
- The answer is a **$length-letter** word.
- The current letter pattern is `$pattern`, where `_` represents an unknown letter.

Return your answer and confidence score in the required JSON format.
''';
```

Send it:

Adapted (not in the official docs): the official page calls `generateContent(prompt: ...)`, but `GenerativeModel.generateContent` takes an `Iterable<Content>` positionally (as the structure-output page does), so the prompt is wrapped in `Content.text`.

```dart
final result = await _clueSolverModel.generateContent([
  Content.text(getSolverPrompt(clue, length, pattern)),
]);
```

A `.prompt` file in the Google dotprompt format keeps prompts out of code (for example bundled as Flutter assets):

```markdown
---
model: googleai/gemini-2.5-flash
input:
  schema:
    text: string
output:
  format: json
  schema:
    title?: string, the title of the article if it has one
    summary: string, a 3-sentence summary of the text
    tags?(array, a list of string tag category for the text): string
---

Extract the requested information from the given text. If a piece of information is not present, omit that field from the output.

Text: {{text}}
```

## Options / Props

Parts of a useful prompt, as listed on the page:

| Part | Purpose |
| --- | --- |
| Persona | Narrows the model's focus (for example "You are a crossword puzzle solver") |
| Context | The current state of the puzzle |
| Query | Asking for a solution to a clue |
| Format | Output in JSON so the result can be parsed programmatically |

## Notes

- The original clue-solving prompt passed the whole two-dimensional grid; results from Gemini 2.5 Flash were inconsistent and Gemini 2.5 Pro was slower and more expensive (it solved the whole puzzle every call). Narrowing the input to the answer length and a pattern such as `_R_Y` gave Pro-level quality from Flash.
- Corrected from the official docs: the page's send example passes a named `prompt:` argument to `generateContent`, which takes `Iterable<Content>` positionally; the example above wraps the prompt in `Content.text`.
- The sample keeps prompt strings in code; for production apps keep prompts separate. Use the `dotprompt_dart` package to expand `.prompt` files in Dart and Flutter projects.
- The system instruction in the sample is only partly shown on the page (elided with `...`); the rules include preferring common words, matching tense and plurality, verifying with the `getWordMetadata` tool, returning a 0.0 to 1.0 confidence score, trusting the clue over the pattern, and returning the specified JSON format.
- Source: https://docs.flutter.dev/ai/best-practices/prompting (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Flutter AI best practices](./ai-best-practices.md)
- [Structure and output](./ai-best-practices-structure-output.md)
- [Tool calls (aka function calls)](./ai-best-practices-tool-calls.md)
