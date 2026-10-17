---
source: https://apple.github.io/python-apple-fm-sdk/basic_usage.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/examples/simple_inference.py
---

# Python Basic Usage

Check availability of the on-device model and run a multi-turn session with the Foundation Models SDK for Python.

```python
import asyncio
import apple_fm_sdk as fm


async def main():
    """Run a simple inference session."""
    print("=== Simple Inference Example ===\n")

    # Check if the model is available
    model = fm.SystemLanguageModel()
    is_available, reason = model.is_available()

    if not is_available:
        print(f"Model not available: {reason}")
        return

    # Create a session with instructions
    session = fm.LanguageModelSession(
        instructions="You are a helpful assistant that provides concise answers."
    )

    # Send a prompt and get a response
    prompt = "What is the capital of France?"
    print(f"User: {prompt}")

    response = await session.respond(prompt)
    print(f"Assistant: {response}\n")

    # Continue the session
    follow_up = "What is its population?"
    print(f"User: {follow_up}")

    response = await session.respond(follow_up)
    print(f"Assistant: {response}\n")


if __name__ == "__main__":
    asyncio.run(main())
```

Customize the model and handle errors:

```python
import apple_fm_sdk as fm

model = fm.SystemLanguageModel(
    use_case=fm.SystemLanguageModelUseCase.CONTENT_TAGGING,
    guardrails=fm.SystemLanguageModelGuardrails.PERMISSIVE_CONTENT_TRANSFORMATIONS
)
```

```python
import apple_fm_sdk as fm


async def safe_generation():
    session = fm.LanguageModelSession()
    
    try:
        response = await session.respond("Your prompt here")
        print(response)
    except fm.ExceededContextWindowSizeError:
        print("Prompt is too long")
    except fm.GuardrailViolationError as e:
        print(f"Caught GuardrailViolationError: {e}")
    except fm.GenerationError as e:
        print(f"Generation error: {e}")
```

## Notes

- Package `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`); module imported as `apple_fm_sdk`.
- Swift equivalent: the Foundation Models framework, see `../references/sessions/languagemodelsession.md` and `../references/models/system-language-model.md`.
- `session.is_responding` reports whether a session is currently generating; sessions keep context across `respond` calls.
- On supported macOS versions an image can be passed as `session.respond(["What kind of bird is this:", fm.ImageAttachment(path=image_path)])` instead of a string.
