---
source: https://ai.google.dev/gemini-api/docs/llama-index
---

# LlamaIndex Multi-agent Workflow with Gemini

Use LlamaIndex's `GoogleGenAI` LLM with the built-in Google Search tool inside an `AgentWorkflow`.

```bash
pip install llama-index llama-index-utils-workflow llama-index-llms-google-genai llama-index-tools-google
```

```python
import os
from llama_index.llms.google_genai import GoogleGenAI

# Set your API key in the environment elsewhere, or with os.environ['GEMINI_API_KEY'] = '...'
assert 'GEMINI_API_KEY' in os.environ

llm = GoogleGenAI(model="gemini-3.8-flash")
```

```python
from google.genai import types

google_search_tool = types.Tool(
    google_search=types.GoogleSearch()
)

llm_with_search = GoogleGenAI(
    model="gemini-3.8-flash",
    generation_config=types.GenerateContentConfig(tools=[google_search_tool])
)

response = await llm_with_search.acomplete("What's the weather like today in Biarritz?")
print(response)
```

```python
from llama_index.core.agent.workflow import FunctionAgent, ReActAgent

research_agent = FunctionAgent(
    name="ResearchAgent",
    description="Useful for searching the web for information on a given topic and recording notes on the topic.",
    system_prompt=(
        "You are the ResearchAgent that can search the web for information on a given topic and record notes on the topic. "
        "Once notes are recorded and you are satisfied, you should hand off control to the WriteAgent to write a report on the topic."
    ),
    llm=llm,
    tools=[search_web, record_notes],
    can_handoff_to=["WriteAgent"],
)

from llama_index.core.agent.workflow import AgentWorkflow

agent_workflow = AgentWorkflow(
    agents=[research_agent, write_agent, review_agent],
    root_agent=research_agent.name,
    initial_state={
        "research_notes": {},
        "report_content": "Not written yet.",
        "review": "Review required.",
    },
)
```

## Notes

- The tool functions (`search_web`, `record_notes`, `write_report`, `review_report`) and the `write_agent` / `review_agent` definitions are in the full guide; the snippet shows the `research_agent` and workflow assembly.
- The `google_search` tool here is configured through `GenerateContentConfig` (generateContent-style), as in the official example.
- Third-party framework (LlamaIndex); the model ID `gemini-3.8-flash` is kept as written. LlamaIndex uses the `google-genai` package under the hood. The example assumes a running event loop.
