---
source: https://docs.flutter.dev/ai/best-practices/structure-output
---

# Structure & output

Use structured input and output schemas to receive reliable, parsable JSON from an LLM through the Firebase AI Logic SDK.

## Signature / Usage

Pass text and images in one request:

```dart
final imageParts = <Part>[];
for (final image in images) {
  final imageBytes = await image.readAsBytes();
  final mimeType = lookupMimeType(image.path, headerBytes: imageBytes)!;
  imageParts.add(InlineDataPart(mimeType, imageBytes));
}

final content = [
  Content.multi([
    TextPart(_crosswordPrompt),
    ...imageParts,
  ]),
];

final response = await _crosswordModel.generateContent(content);
...
```

Initialize the model with the expected output format:

Adapted (not in the official docs): the page's full `_crosswordSchema` definition is omitted here for length; see the source page for it.

```dart
// The model for inferring crossword data from images.
_crosswordModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-pro',
  generationConfig: GenerationConfig(
    responseMimeType: 'application/json',
    responseSchema: _crosswordSchema,
  ),
);
```

Also specify the output schema in the system instruction for the most reliable results:

```dart
final _crosswordPrompt =
'''
Analyze the following crossword puzzle images and return a JSON object
representing the grid size, contents, and clues. The images may contain
different parts of the same puzzle (e.g., the grid the across clues, the down
clues). Combine them to form a complete puzzle.

The JSON schema is as follows: ${jsonEncode(_crosswordSchema.toJson())}
'''
```

Parse the response:

```dart
final response = await _crosswordModel.generateContent(content);

final json = jsonDecode(response.text!);
final width = json['width'] as int;
final height = json['height'] as int;
final gridData = json['grid'] as List;
final cluesData = json['clues'] as Map<String, dynamic>;
...
```

## Notes

- Input: an LLM takes anything you can render as text (free-form, Markdown, CSV, JSON, XML) and binary data such as images or PDFs; format structured data with its structure for better results.
- Output: structured output is harder for an LLM than structured input; be clear and thorough when asking for JSON. The data might or might not be correct, but it will be in a format the app can work with.
- Adapted from the official docs: the model snippet omits the page's full `_crosswordSchema` definition (an object schema with `width`, `height`, `grid` and `clues` properties) for length.
- Source: https://docs.flutter.dev/ai/best-practices/structure-output (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Flutter AI best practices](./ai-best-practices.md)
- [Prompting](./ai-best-practices-prompting.md)
- [Tool calls (aka function calls)](./ai-best-practices-tool-calls.md)
