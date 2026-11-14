---
source: https://docs.flutter.dev/ai/best-practices/tool-calls
---

# Tool calls (aka function calls)

Implement tool calling, manage the agentic loop, and add human-in-the-loop interactions with the Firebase AI Logic SDK, where a tool is called a "function".

## Signature / Usage

The Dart function behind the `getWordMetadata` tool:

```dart
// Look up the metadata for a word in the dictionary API.
Future<Map<String, dynamic>> _getWordMetadataFromApi(String word) async {
  final url = Uri.parse(
    'https://api.dictionaryapi.dev/api/v2/entries/en/${Uri.encodeComponent(word)}',
  );

  final response = await http.get(url);
  return response.statusCode == 200
      ? {'result': jsonDecode(response.body)}
      : {'error': 'Could not find a definition for "$word".'};
}
```

Configure the model with the function declaration:

```dart
// The model for solving clues.
_clueSolverModel = FirebaseAI.googleAI().generativeModel(
  model: 'gemini-2.5-flash',
  systemInstruction: Content.text(clueSolverSystemInstruction),
  tools: [
    Tool.functionDeclarations([
      FunctionDeclaration(
        'getWordMetadata',
        'Gets grammatical metadata for a word, like its part of speech. '
        'Best used to verify a candidate answer against a clue that implies a '
        'grammatical constraint.',
        parameters: {
           'word': Schema(SchemaType.string, description: 'The word to look up.'),
         },
       ),
    ]),
  ],
);
```

The agentic loop as an extension method on `GenerativeModel`:

```dart
extension on GenerativeModel {
  Future<String> generateContentWithFunctions({
    required String prompt,
    required Future<Map<String, dynamic>> Function(FunctionCall) onFunctionCall,
  }) async {
    // Use a chat session to support multiple request/response pairs, which is
    // needed to support function calls.
    final chat = startChat();
    final buffer = StringBuffer();
    var response = await chat.sendMessage(Content.text(prompt));

    while (true) {
      // Append the response text to the buffer.
      buffer.write(response.text ?? '');

      // If no function calls were collected, we're done
      if (response.functionCalls.isEmpty) break;

      // Append a newline to separate responses.
      buffer.write('\n');

      // Execute all function calls
      final functionResponses = <FunctionResponse>[];
      for (final functionCall in response.functionCalls) {
        try {
          functionResponses.add(
            FunctionResponse(
              functionCall.name,
              await onFunctionCall(functionCall),
            ),
          );
        } catch (ex) {
          functionResponses.add(
            FunctionResponse(functionCall.name, {'error': ex.toString()}),
          );
        }
      }

      // Get the next response stream with function results
      response = await chat.sendMessage(
        Content.functionResponses(functionResponses),
      );
    }

    return buffer.toString();
  }
}
```

Handle specific tool calls:

```dart
await _clueSolverModel.generateContentWithFunctions(
  prompt: getSolverPrompt(clue, length, pattern),
  onFunctionCall: (functionCall) async => switch (functionCall.name) {
    'getWordMetadata' => await _getWordMetadataFromApi(
      functionCall.args['word'] as String,
    ),
    _ => throw Exception('Unknown function call: ${functionCall.name}'),
  },
);
```

## Options / Props

| Concept | Detail |
| --- | --- |
| Tool | A name, a description and a JSON schema for the input data when the LLM "calls" the tool |
| Tool call | A specially formatted LLM response message containing the tool name and JSON arguments; the app runs the tool and bundles the result into another LLM request |
| Agentic loop | Start a chat to hold history; gather tool results for tool calls; bundle them into a new request; loop until the model responds without tool calls; return the accumulated text |
| `returnResult` workaround | Simulates structured output when functions are used (see Notes) |
| Human in the loop | A tool such as `resolveConflict` that asks the user (for example with `showDialog`, a `Completer`, or an "interrupt" function) and returns the answer to the loop |

## Notes

- An LLM is functionally stateless: give it all the data it needs every request. Tool calling needs a message history, so use the SDK's chat object. Configure a smaller set of targeted tools that don't overlap in functionality, and also list the tools in the system instruction for reliability.
- As of the page's writing, combining structured output and functions with the Firebase AI Logic SDK throws `Function calling with a response mime type: 'application/json' is unsupported`. The sample removes the structured-output configuration and adds a `returnResult` function (parameters `answer` string and `confidence` number) that caches the result via the `onFunctionCall` switch (`'returnResult' => _cacheReturnResult(functionCall.args)`). The page calls this a hopefully temporary workaround; its full code (and the `resolveConflict` declaration and `_handleResolveConflict` handler) are on the source page.
- Human in the loop: the model isn't waiting, since it already returned its response; the user can take their time, and the loop resumes with the message history plus the user's data. A `Completer` can put the app into a "gathering data from the user" mode; alternatively check for a special "interrupt" function and resume the conversation later, whether it's been a minute or a month.
- Omitted: this page reproduces the `getWordMetadata` flow and the agentic loop; the `returnResult`, `resolveConflict` and system-instruction code blocks are not repeated.
- Source: https://docs.flutter.dev/ai/best-practices/tool-calls (flutter/website `acea420`, fetched 2026-11-14).

## Related

- [Flutter AI best practices](./ai-best-practices.md)
- [Prompting](./ai-best-practices-prompting.md)
- [Structure and output](./ai-best-practices-structure-output.md)
