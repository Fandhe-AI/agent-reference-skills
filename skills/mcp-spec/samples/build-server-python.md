---
source: https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server
---

# Build a Server (Python)

Minimal stdio MCP weather server using the Python SDK's `MCPServer` and `@mcp.tool()`.

Setup:

```bash
uv init weather
cd weather
uv venv
source .venv/bin/activate
uv add "mcp[cli]"
touch weather.py
```

`weather.py`:

```python
from typing import Any

import httpx2
from mcp.server import MCPServer

# Initialize MCPServer
mcp = MCPServer("weather")

# Constants
NWS_API_BASE = "https://api.weather.gov"
USER_AGENT = "weather-app/1.0"


async def make_nws_request(url: str) -> dict[str, Any] | None:
    """Make a request to the NWS API with proper error handling."""
    headers = {"User-Agent": USER_AGENT, "Accept": "application/geo+json"}
    async with httpx2.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=30.0)
            response.raise_for_status()
            return response.json()
        except Exception:
            return None


def format_alert(feature: dict) -> str:
    """Format an alert feature into a readable string."""
    props = feature["properties"]
    return f"""
Event: {props.get("event", "Unknown")}
Area: {props.get("areaDesc", "Unknown")}
Severity: {props.get("severity", "Unknown")}
Description: {props.get("description", "No description available")}
Instructions: {props.get("instruction", "No specific instructions provided")}
"""


@mcp.tool()
async def get_alerts(state: str) -> str:
    """Get weather alerts for a US state.

    Args:
        state: Two-letter US state code (e.g. CA, NY)
    """
    url = f"{NWS_API_BASE}/alerts/active/area/{state}"
    data = await make_nws_request(url)

    if not data or "features" not in data:
        return "Unable to fetch alerts or no alerts found."

    if not data["features"]:
        return "No active alerts for this state."

    alerts = [format_alert(feature) for feature in data["features"]]
    return "\n---\n".join(alerts)


if __name__ == "__main__":
    mcp.run(transport="stdio")
```

Run with `uv run weather.py`.

## Notes

- Abridged from the official tutorial: the `get_forecast` tool is omitted; see the source URL for the full file.
- Tutorial code is reproduced as published; SDK protocol-version support is not stated in the source.
- For stdio servers the tutorial warns against writing to stdout (it corrupts JSON-RPC messages); log to stderr instead.
- Host configuration (Claude Desktop, Claude Code) is outside this skill; see `claude-desktop-local-server.md` for the Claude Desktop config shown in the tutorial.
