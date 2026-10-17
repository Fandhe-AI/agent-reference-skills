---
source: https://apple.github.io/python-apple-fm-sdk/evaluation.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/examples/transcript_processing.py
---

# Python Evaluation with Transcripts

Export a Swift session transcript as JSON, then load and analyze it in Python (or produce one directly in Python).

```swift
import FoundationModels

// After completing a session
let transcript = session.transcript

// Export to JSON
if let jsonData = try? JSONEncoder().encode(transcript),
   let jsonString = String(data: jsonData, encoding: .utf8) {
    // Save to file or send to evaluation system
    try? jsonString.write(to: transcriptURL, atomically: true, encoding: .utf8)
}
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession()
await session.respond(prompt="Hello, how are you?")

# Export transcript
transcript = session.transcript
transcript_dict = await transcript.to_dict()  # Convert to dictionary
```

```python
import json
from typing import Dict, List, Any


def load_transcript(file_path: str) -> Dict[str, Any]:
    """
    Load a transcript exported from a Swift app.

    Swift code to export transcript:
    ```swift
    import FoundationModels

    let transcript = session.transcript
    let jsonData = try JSONEncoder().encode(transcript)
    try jsonData.write(to: URL(fileURLWithPath: "transcript.json"))
    ```

    Args:
        file_path: Path to the transcript JSON file

    Returns:
        Transcript dictionary with structure:
        {
            "version": 1,
            "type": "FoundationModels.Transcript",
            "transcript": {
                "entries": [...]
            }
        }
    """
    with open(file_path, "r") as f:
        return json.load(f)


def extract_text_from_contents(contents: List[Dict[str, Any]]) -> str:
    """
    Extract text from a contents array.

    Args:
        contents: List of content objects

    Returns:
        Combined text from all text-type contents
    """
    text_parts = []
    for content in contents:
        if content.get("type") == "text":
            text_parts.append(content.get("text", ""))
        elif content.get("type") == "structure":
            # For structured content, convert to string representation
            structure = content.get("structure", {})
            text_parts.append(json.dumps(structure.get("content", {})))
    return " ".join(text_parts)
```

## Notes

- Swift equivalent: `Transcript` and its `Codable` JSON export, see `../references/transcripts/transcript.md`.
- The listings come from the evaluation guide and `examples/transcript_processing.py`; the example file also contains `analyze_transcript`, `compare_transcripts`, and `export_analysis_to_jsonl`, not reproduced here.
- Each inference call is processed one at a time at the macOS hardware level, so large batch evaluations take time.
- The guide's batch pattern passes `json_schema=` to `session.respond` for structured responses and compares against an `expected` value per test case.
- Package `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`).
