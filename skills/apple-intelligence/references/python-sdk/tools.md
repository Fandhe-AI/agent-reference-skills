---
source: https://apple.github.io/python-apple-fm-sdk/api/tools.html, https://github.com/apple/python-apple-fm-sdk/blob/v0.2.1/src/apple_fm_sdk/tool.py
---

# Tool (Python)

Base class for tools that foundation models can invoke during generation; bridges Python async functions to the Foundation Models API.

## Signature / Usage

```python
class Tool(_ManagedObject, ABC):
    name: str
    description: str

    @property
    @abstractmethod
    def arguments_schema(self) -> GenerationSchema: ...

    @abstractmethod
    async def call(self, args: GeneratedContent) -> str: ...
```

```python
import apple_fm_sdk as fm

@fm.generable("Calculator parameters")
class CalculatorParams:
    operation: str = fm.guide("The operation to perform")
    a: float = fm.guide("First number")
    b: float = fm.guide("Second number")

class CalculatorTool(fm.Tool):
    name = "calculator"
    description = "Performs basic arithmetic operations"

    @property
    def arguments_schema(self) -> fm.GenerationSchema:
        return CalculatorParams.generation_schema()

    async def call(self, args: fm.GeneratedContent) -> str:
        op = args.value(str, for_property="operation")
        a = args.value(float, for_property="a")
        b = args.value(float, for_property="b")

        if op == "add":
            result = a + b
        elif op == "multiply":
            result = a * b
        else:
            raise ValueError(f"Unknown operation: {op}")

        return str(result)
```

```python
from apple_fm_sdk import LanguageModelSession

session = LanguageModelSession(
    instructions="You are a helpful assistant with access to tools.",
    tools=[CalculatorTool(), WeatherTool(), DatabaseTool()]
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | str | The tool's name; must be set by the subclass. |
| description | str | Human-readable description of what the tool does; must be set by the subclass. |
| arguments_schema | property, GenerationSchema | Schema describing the arguments the tool expects. The model uses it to generate arguments when invoking the tool. |
| call(args) | async method, returns str | Executes the tool with parsed arguments (`GeneratedContent`); the returned string is provided back to the model. |

## Notes

- Package: `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`). Swift equivalent: Tool (see tools/tool.md). Unlike Swift, `call` takes a `GeneratedContent` and returns a `str`.
- `call()` must be an async function (coroutine) even if it performs no async operations; the constructor raises `TypeError` otherwise. `name` and `description` must be strings and `arguments_schema` a `GenerationSchema`.
- Exceptions raised in `call()` are caught and reported to the model as an error message (`Tool error: ...`), so the model can adapt its response. Raise descriptive exceptions. Non-string results are converted with `str()`.
- Tool names should be descriptive and follow snake_case convention. Multiple tools can be registered with a single session.
- Tool mentions loaded from a Transcript are historical only; pass tool instances to `LanguageModelSession.from_transcript(..., tools=[...])` to allow new calls (see transcript.md).
- The Sphinx page documents only `arguments_schema` and `call` (`:members: arguments_schema, call`, with `name` and `description` excluded).
- Distinct from cloud API tool calling: see openai-agents, openai-api-core and anthropic-api-tools-mcp. This page covers the on-device Foundation Models Python `Tool`.

## Related

- [LanguageModelSession (Python)](./session.md)
- [generable / guide / GenerationSchema (Python)](./generable.md)
- [Errors (Python)](./errors.md)
- [Tool (Swift)](../tools/tool.md)
