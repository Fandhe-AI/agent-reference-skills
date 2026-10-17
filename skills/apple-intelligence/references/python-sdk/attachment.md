---
source: https://apple.github.io/python-apple-fm-sdk/api/attachment.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/prompt.py
---

# Attachment (Python)

Attachment classes for passing images to a model as part of a prompt, plus the `Prompt` type alias and prompt errors.

## Signature / Usage

```python
class Attachment(ABC):
    @abstractmethod
    def add_to_composed_prompt(self, composed_prompt): ...

class ImageAttachment(Attachment):
    def __init__(self, path: Path, label: Optional[str] = None)

PromptComponent = Union[str, Attachment]
Prompt = Union[PromptComponent, list[PromptComponent]]

class PromptError(Exception): ...
class ImagePromptError(PromptError): ...
```

```python
import apple_fm_sdk as fm
from pathlib import Path

session = fm.LanguageModelSession()
before = fm.ImageAttachment(Path("before.jpg"), label="before")
after = fm.ImageAttachment(Path("after.jpg"), label="after")
response = await session.respond([
    "Compare the before and after images",
    before,
    after
])
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| ImageAttachment(path) | Path | Path on disk to the image file. The file must exist when the attachment is created. |
| ImageAttachment(label) | Optional[str] | Lets the model reference the image by name; useful for multiple images, tools that reference specific images, and context about each image. |
| PromptComponent | Union[str, Attachment] | A single prompt building block: text or attachment. |
| Prompt | Union[PromptComponent, list[PromptComponent]] | A string, a single attachment, or a list of components. |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalent: Attachment (see attachments/attachment.md).
- `Attachment` is an abstract base class; use `ImageAttachment`. Supported image formats depend on the underlying model capabilities.
- `ImageAttachment` raises `ImagePromptError` if the file does not exist. Adding the attachment to a prompt raises `ImagePromptError` if the runtime OS does not support attachment prompts ("the current OS does not support attachment prompts"), or if the Xcode version used to build the package does not include macOS 27 SDKs.
- `PromptError` is raised when a prompt component is not a `str` or `Attachment`.

## Related

- [LanguageModelSession (Python)](./session.md)
- [Errors (Python)](./errors.md)
- [Attachment (Swift)](../attachments/attachment.md)
