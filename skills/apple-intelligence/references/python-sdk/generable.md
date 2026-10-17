---
source: https://apple.github.io/python-apple-fm-sdk/api/generable.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/generable_utils.py, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/generation_guide.py
---

# generable / guide / GenerationSchema (Python)

Guided generation API for structured outputs: the `@generable` decorator, the `guide()` field helper, `Generable`, `GeneratedContent`, and `GenerationSchema`.

## Signature / Usage

```python
def generable(
    arg: Optional[Union[type, str]] = None,
) -> Union[Type[Generable], Callable[[Type], Type[Generable]]]

def guide(
    description: Optional[str] = None,
    *,
    anyOf: Optional[List[str]] = None,
    constant: Optional[str] = None,
    count: Optional[int] = None,
    element: Optional["GenerationGuide"] = None,
    max_items: Optional[int] = None,
    maximum: Optional[Union[int, float]] = None,
    min_items: Optional[int] = None,
    minimum: Optional[Union[int, float]] = None,
    range: Optional[tuple] = None,
    regex: Optional[str] = None,
) -> Any
```

```python
import apple_fm_sdk as fm

@fm.generable("A cat's profile")
class Cat:
    name: str = fm.guide("Cat's name")
    age: int = fm.guide("Age in years", range=(0, 20))
    profile: str = fm.guide("What makes this cat unique")

session = fm.LanguageModelSession()
cat = await session.respond(
    "Generate a cat named Maomao",
    generating=Cat
)
print(f"{cat.name} is {cat.age} years old")
```

### Generable

```python
@runtime_checkable
class Generable(
    ConvertibleFromGeneratedContent, ConvertibleToGeneratedContent, Protocol
):
    _generable: bool = True
    _generable_description: Optional[str] = None

    @classmethod
    def generation_schema(cls) -> GenerationSchema

    PartiallyGenerated = None
```

### GeneratedContent

```python
class GeneratedContent(_ManagedObject):
    def __init__(
        self,
        content_dict: Optional[Dict] = None,
        id: Optional[GenerationID] = None,
        _ptr=None,
    )

    @classmethod
    def from_json(cls, json_str: str) -> "GeneratedContent"
    def to_json(self) -> str
    def value(
        self, type_class: Optional[Type] = None, for_property: Optional[str] = None
    ) -> Any

    @property
    def is_complete(self) -> bool
```

### GenerationSchema

```python
class GenerationSchema(_ManagedObject):
    def __init__(
        self,
        type_class: Type,
        description: Optional[str] = None,
        properties: Optional[List[Property]] = None,
        dynamic_nested_types: List["GenerationSchema"] = [],
        _ptr=None,
    )

    def to_dict(self) -> dict
```

## Options / Props

### guide() parameters

| Name | Type | Description |
|------|------|-------------|
| description | str, optional | Description of the field. |
| anyOf | List[str], optional | Constrains output to one of the given string values (must be a list of strings). |
| constant | str, optional | Constrains output to a single constant value. |
| count | int, optional | Exact number of items for collections (must be a positive integer). |
| element | GenerationGuide, optional | Guide applied to each array element. |
| max_items | int, optional | Maximum number of items for collections (non-negative integer). |
| maximum | int or float, optional | Maximum value for numeric types. |
| min_items | int, optional | Minimum number of items for collections (non-negative integer). |
| minimum | int or float, optional | Minimum value for numeric types. |
| range | tuple, optional | `(min, max)` for numeric ranges (tuple of length 2). |
| regex | str, optional | Regular expression pattern the output must match. |

### GuideType (Enum)

| Name | Value | Description |
|------|-------|-------------|
| anyOf | "enum" | Constrains output to a specific set of string values. |
| constant | "constant" | Constrains output to a single constant value. |
| count | "count" | Sets exact number of items in collections. |
| element | "element" | Enforces guides on array elements. |
| maxItems | "maxItems" | Sets maximum number of items (called maximumCount in Swift). |
| maximum | "maximum" | Sets a maximum numeric value constraint. |
| minItems | "minItems" | Sets minimum number of items (called minimumCount in Swift). |
| minimum | "minimum" | Sets a minimum numeric value constraint. |
| range | "range" | Sets both minimum and maximum numeric constraints. |
| regex | "regex" | Enforces a limited regex vocabulary; serializes to "pattern". |

`GenerationGuide` offers classmethods mirroring these: `anyOf(values)`, `constant(value)`, `count(count)`, `element(guide)`, `max_items(value)`, `maximum(value)`, `min_items(value)`, `minimum(value)`, `range(range_tuple)`, `regex(pattern)`.

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalents: Generable and GenerationSchema (see structured-output/generable.md and structured-output/generation-schema.md); `guide()` mirrors Swift's `@Guide` (structured-output/guide-macro.md).
- `@generable` works without parentheses (`@fm.generable`), with empty parentheses, or with a description string. It applies `@dataclass` automatically if the class is not already a dataclass, adds `generation_schema()`, `ConvertibleFromGeneratedContent` / `ConvertibleToGeneratedContent` support, and creates a `PartiallyGenerated` inner class for streaming (all fields optional, default `None`, plus an `id`).
- The class must have type-annotated fields; otherwise `GenerableDecoratorError` (a subclass of `InvalidGenerationSchemaError`) is raised. Mutable defaults need `field(default_factory=...)`; quote self-references in forward references.
- Subclassing the `Generable` protocol directly raises `TypeError`; use `@fm.generable()` instead.
- Do not instantiate `GenerationSchema` directly. Use `@generable`, which produces one, or load a JSON schema from a Swift app and pass it as `json_schema` to `respond()`.
- Invalid JSON schemas surface as `InvalidGenerationSchemaError` (see errors.md).
- `GeneratedContent.value(type_class, for_property=...)` extracts a property (or the whole content when `for_property` is None) and unpacks nested `Generable` types, lists, and optionals.
- Distinct from cloud API structured outputs and JSON-schema response formats: see openai-api-core and anthropic-api-tools-mcp. This page covers the on-device Foundation Models guided-generation API for Python.

## Related

- [LanguageModelSession (Python)](./session.md)
- [Tool (Python)](./tools.md)
- [Errors (Python)](./errors.md)
- [Generable (Swift)](../structured-output/generable.md)
- [GenerationSchema (Swift)](../structured-output/generation-schema.md)
