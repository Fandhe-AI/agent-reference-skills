---
source: https://ai.google.dev/gemini-api/docs/temporal-example
---

# Temporal Durable Agent with Gemini

Run Gemini calls and tool calls as Temporal Activities so the agent loop survives crashes and retries.

```bash
# Terminal 1: dev server (keeps running)
temporal server start-dev
```

```bash
# Terminal 2: project setup
uv init durable-gemini-agent
cd durable-gemini-agent
uv add "temporalio[google-genai]" httpx python-dotenv

# Placeholder key; keep .env out of version control
echo "GOOGLE_API_KEY=your-api-key-here" > .env
```

```python
from datetime import timedelta

from google.genai import types
from temporalio import workflow
from temporalio.contrib.google_genai import TemporalAsyncClient, activity_as_tool
from temporalio.workflow import ActivityConfig

TOOL_CONFIG = ActivityConfig(start_to_close_timeout=timedelta(seconds=30))

@workflow.defn
class AgentWorkflow:
    """Agent workflow that uses Gemini for LLM calls and executes tools."""

    @workflow.run
    async def run(self, prompt: str) -> str:
        client = TemporalAsyncClient()

        response = await client.models.generate_content(
            model="gemini-3.8-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTIONS,
                tools=[
                    activity_as_tool(get_weather_alerts, activity_config=TOOL_CONFIG),
                    activity_as_tool(get_ip_address, activity_config=TOOL_CONFIG),
                    activity_as_tool(get_location_info, activity_config=TOOL_CONFIG),
                ],
            ),
        )

        return response.text or ""
```

```python
import asyncio
import os

from dotenv import load_dotenv
from google import genai
from temporalio.client import Client
from temporalio.contrib.google_genai import GoogleGenAIPlugin
from temporalio.envconfig import ClientConfig
from temporalio.worker import Worker

async def main():
    gemini = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])
    plugin = GoogleGenAIPlugin(gemini)

    config = ClientConfig.load_client_connect_config()
    config.setdefault("target_host", "localhost:7233")
    client = await Client.connect(**config, plugins=[plugin])

    worker = Worker(
        client,
        task_queue="gemini-agent",
        workflows=[
            AgentWorkflow,
        ],
        activities=[
            get_weather_alerts,
            get_ip_address,
            get_location_info,
        ],
    )
    await worker.run()

if __name__ == "__main__":
    load_dotenv()
    asyncio.run(main())
```

```bash
# Terminal 2 (in the project directory): worker (keeps running)
uv run durable_agent_worker.py
```

```bash
# Terminal 3: start a workflow
temporal workflow execute --type AgentWorkflow --task-queue gemini-agent \
    --input '"are there any weather alerts for where I am?"'
```

## Notes

- The tools (`get_weather_alerts`, `get_ip_address`, `get_location_info` as `@activity.defn`) and `SYSTEM_INSTRUCTIONS` are defined earlier in the full guide; this agent uses the generateContent client (`TemporalAsyncClient.models.generate_content`).
- The dev server and the worker are long-running; run them in separate terminals as the official guide instructs, and the `.env` step is included.
- `temporalio.contrib.google_genai` is experimental per the official guide. Only the worker needs the API key (`GOOGLE_API_KEY` in this guide).
- Temporal owns retries; do not enable the Gemini SDK's own retry loop.
- Temporal here is a workflow engine for the Gemini agent loop; unrelated to inngest.
