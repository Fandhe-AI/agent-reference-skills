---
source: https://apple.github.io/python-apple-fm-sdk/streaming.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/examples/streaming_example.py
---

# Python Streaming

Stream text snapshots (the complete response text generated so far, not deltas) from a session with `stream_response` in the Foundation Models SDK for Python.

```python
import asyncio
import apple_fm_sdk as fm


async def main():
    """Run a streaming inference session."""
    print("=== Streaming Response Example ===\n")

    # Check if the model is available
    model = fm.SystemLanguageModel()
    is_available, reason = model.is_available()

    if not is_available:
        print(f"Model not available: {reason}")
        return

    # Create a session
    session = fm.LanguageModelSession(instructions="You are a helpful assistant.")

    # Stream a response
    prompt = "Tell me a short story about a cat."
    print(f"User: {prompt}\n")
    print("Assistant: ", end="", flush=True)

    # Iterate through response chunks as they arrive
    async for chunk in session.stream_response(prompt):
        print(chunk, end="", flush=True)

    print("\n")


if __name__ == "__main__":
    asyncio.run(main())
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession()

# First streaming response
async for chunk in session.stream_response(
    "What are some differences between Swift and Python?"
):
    print(chunk, end="", flush=True)
print("\n")

# Follow-up with context maintained
async for chunk in session.stream_response("Show me an example"):
    print(chunk, end="", flush=True)
```

## Notes

- `session.stream_response` returns an async iterator. Each yielded value is the complete response text generated so far, not the delta from the previous chunk (per the `stream_response` docstring in `session.py`); like `respond`, it keeps session context across calls.
- Because values are cumulative snapshots, a consumer that needs only the new text must compute the difference from the previous value itself.
- Swift equivalent: streaming responses on `LanguageModelSession`, see `../references/sessions/response-stream.md`.
- Package `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`).
