---
source: https://apple.github.io/python-apple-fm-sdk/api/transcript.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/transcript.py
---

# Transcript (Python)

Access to a session's history: all user prompts, model responses, and tool invocations, as a dictionary following the Foundation Models Swift transcript structure.

## Signature / Usage

```python
class Transcript:
    def __init__(self, _ptr)

    async def to_dict(self) -> dict

    @classmethod
    async def from_dict(cls, dict: dict) -> "Transcript"
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession()

await session.respond("Hello!")
await session.respond("What is Python?")

# Get the full session history
transcript = await session.transcript.to_dict()

# Access the entries
entries = transcript["transcript"]["entries"]
for entry in entries:
    role = entry["role"]
    print(f"Entry role: {role}")
```

```python
import apple_fm_sdk as fm
import json

with open("transcript.json", "r") as f:
    transcript_dict = json.load(f)

transcript = await fm.Transcript.from_dict(transcript_dict)
session = fm.LanguageModelSession.from_transcript(transcript)
```

## Options / Props

### Transcript dictionary format

| Key | Type | Description |
|-----|------|-------------|
| version | int | Version number (currently 1). |
| type | str | Type identifier "FoundationModels.Transcript". |
| transcript.entries | list | Session entries, each with `id` (UUID), `role`, and `contents`. |

### Entry roles

| Role | Fields |
|------|--------|
| instructions | `tools` (array of available tool definitions), `contents` (array with text instructions). |
| user | `contents` (text and more), `options` (optional request configuration), `responseFormat` (optional structured output schema). |
| response | `toolCalls` (if tools were called), `contents` (text or structured data), `assets` (model asset identifiers used). |
| tool | `toolName`, `toolCallID` (UUID linking to the tool call), `contents` (tool execution results). |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalent: Transcript (see transcripts/transcript.md).
- Transcript instances are created automatically by `LanguageModelSession`; do not create them directly. The transcript shares the session's internal pointer and is read-only; accessing it does not affect session state.
- Updated after each `respond()` call completes successfully, after each `stream_response()` completes, and after tool invocations are processed. Not updated during streaming, and not if a request fails or is cancelled.
- `to_dict()` is async and returns a snapshot; call it again after new interactions. It raises `GenerationError` if fetching fails. Large sessions may produce large dictionaries.
- `from_dict()` raises `GenerationError` if the dictionary format is invalid or cannot be parsed.
- Tools in a transcript: the transcript preserves the history of tool calls but not the capability to make new calls, because it does not contain the tool implementations. Implement each tool in Python and create the session with both the transcript and tools via `LanguageModelSession.from_transcript(transcript, tools=[...])`.
- The Sphinx page lists "See Also" links to the Session API and the Basic usage guide.

## Related

- [LanguageModelSession (Python)](./session.md)
- [Tool (Python)](./tools.md)
- [Errors (Python)](./errors.md)
- [Transcript (Swift)](../transcripts/transcript.md)
