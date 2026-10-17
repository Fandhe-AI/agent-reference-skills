---
source: https://apple.github.io/python-apple-fm-sdk/tools.html
---

# Python Tools

Subclass `fm.Tool` with generable arguments, register it with a session, and handle `ToolCallError`.

```python
import apple_fm_sdk as fm

class WeatherTool(fm.Tool):
    name = "WeatherTool"
    description = "Provides weather information for a given location and units."

    @fm.generable("Weather query parameters")
    class Arguments:
        location: str = fm.guide("City name")
        units: str = fm.guide("Temperature units", anyOf=["celsius", "fahrenheit"])
    
    @property
    def arguments_schema(self) -> fm.GenerationSchema:
        return self.Arguments.generation_schema()
    
    async def call(self, args: fm.GeneratedContent) -> str:
        # Extract arguments
        location = args.value(str, for_property="location")
        units = args.value(str, for_property="units")
        
        # Simulate API call
        temp = 72 if units == "fahrenheit" else 22
        return f"The weather in {location} is {temp}°{units[0].upper()}"
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession(
    instructions="You are a helpful assistant with access to tools.",
    tools=[WeatherTool()]  # See above for WeatherTool definition
)

# The model can now call the tool
response = await session.respond(
    "What's the weather like in Taipei?"
)
print(response)
```

```python
import apple_fm_sdk as fm

session = fm.LanguageModelSession(
    instructions="You are a helpful assistant with access to tools.",
    tools=[WeatherTool()] # See above for WeatherTool definition
)

try:
    response = await session.respond("Use the weather tool to get the current temperature in Taipei.")
except fm.ToolCallError as e:
    print(f"Tool error: {e.tool_name} - {e.underlying_error}")
except Exception as e:
    print(f"Error: {e}")
```

## Notes

- Swift equivalent: the `Tool` protocol, see `../references/tools/tool.md`.
- A tool needs `name`, `description`, an `arguments_schema` property, and an async `call(self, args)` method; arguments are read with `args.value(type, for_property=...)`.
- Package `apple-fm-sdk` 0.2.1 (GitHub tag `v0.2.1`).
