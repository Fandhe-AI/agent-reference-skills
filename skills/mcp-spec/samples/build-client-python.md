---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client
---

# Build a Client (Python)

Stdio MCP client that lists a server's tools, passes them to Claude, and executes `call_tool` for tool-use blocks.

Setup:

```bash
uv init mcp-client
cd mcp-client
uv venv
source .venv/bin/activate
uv add mcp anthropic python-dotenv
rm main.py
touch client.py
```

`client.py`:

```python
import asyncio
import sys

from mcp import Client, StdioServerParameters
from mcp.client.stdio import stdio_client
from mcp_types import TextContent

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()  # load environment variables from .env

MODEL = "claude-opus-5"
MAX_ROUNDS = 10  # upper bound on tool-use rounds per query
anthropic = Anthropic()


def server_params(server_script_path: str) -> StdioServerParameters:
    """Describe the subprocess that runs an MCP server

    Args:
        server_script_path: Path to the server script (.py or .js)
    """
    if server_script_path.endswith(".py"):
        command = "python"
    elif server_script_path.endswith(".js"):
        command = "node"
    else:
        raise ValueError("Server script must be a .py or .js file")

    return StdioServerParameters(command=command, args=[server_script_path])


async def process_query(client: Client, query: str) -> str:
    """Process a query using Claude and available tools"""
    messages = [
        {
            "role": "user",
            "content": query
        }
    ]

    tool_list = await client.list_tools()
    available_tools = [{
        "name": tool.name,
        "description": tool.description,
        "input_schema": tool.input_schema
    } for tool in tool_list.tools]

    final_text = []

    # Repeat until Claude stops requesting tools (bounded to avoid runaway loops)
    for _ in range(MAX_ROUNDS):
        response = anthropic.messages.create(
            model=MODEL,
            max_tokens=1000,
            messages=messages,
            tools=available_tools
        )

        tool_results = []

        for content in response.content:
            if content.type == 'text':
                final_text.append(content.text)
            elif content.type == 'tool_use':
                tool_name = content.name
                tool_args = content.input

                # Execute tool call
                result = await client.call_tool(tool_name, tool_args)
                final_text.append(f"[Calling tool {tool_name} with args {tool_args}]")

                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": content.id,
                    "content": "\n".join(
                        block.text
                        for block in result.content
                        if isinstance(block, TextContent)
                    ),
                    "is_error": result.is_error
                })

        if not tool_results:
            break

        messages.append({"role": "assistant", "content": response.content})
        messages.append({"role": "user", "content": tool_results})

    return "\n".join(final_text)


async def chat_loop(client: Client) -> None:
    """Run an interactive chat loop"""
    print("\nMCP Client Started!")
    print("Type your queries or 'quit' to exit.")

    while True:
        try:
            query = (await asyncio.to_thread(input, "\nQuery: ")).strip()
        except EOFError:
            break

        if query.lower() == 'quit':
            break

        try:
            response = await process_query(client, query)
            print("\n" + response)
        except Exception as e:
            print(f"\nError: {e}")


async def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: python client.py <path_to_server_script>")
        sys.exit(1)

    async with Client(stdio_client(server_params(sys.argv[1]))) as client:
        tool_list = await client.list_tools()
        tool_names = [tool.name for tool in tool_list.tools]
        print("\nConnected to server with tools:", tool_names)

        await chat_loop(client)


if __name__ == "__main__":
    asyncio.run(main())
```

## Notes

- Assembled verbatim from the tutorial's code blocks; the Anthropic API key setup (`.env` with `ANTHROPIC_API_KEY`) is not repeated, see the source URL.
- Change from the official example: `process_query` loops over multiple rounds of `tool_use` (up to `MAX_ROUNDS`) until Claude returns no more tool calls, instead of a single follow-up request.
- Tutorial code is otherwise reproduced as published; SDK protocol-version support is not stated in the source.
- `async with Client(...)` is the whole connection lifecycle; a tool that fails answers with `is_error` set rather than raising.
- The tutorial uses the Anthropic SDK for the LLM call; Claude API usage itself belongs to the Anthropic API skills.
