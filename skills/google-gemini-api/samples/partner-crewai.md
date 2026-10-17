---
source: https://ai.google.dev/gemini-api/docs/crewai-example
---

# CrewAI with Gemini

Configure CrewAI's `LLM` for Gemini and run a sequential crew of agents.

```bash
pip install "crewai[tools]"
```

```python
import os
from crewai import LLM

gemini_api_key = os.getenv("GEMINI_API_KEY")

gemini_llm = LLM(
    model='gemini/gemini-3.8-flash',
    api_key=gemini_api_key,
    temperature=1.0  # Use the Gemini 3 recommended temperature
)
```

```python
from crewai import Agent

# Agent 1: Data analyst
data_analyst = Agent(
    role='Customer Support Data Analyst',
    goal='Analyze customer support data to identify trends, recurring issues, and key pain points.',
    backstory=(
        """You are an expert data analyst specializing in customer support operations.
        Your strength lies in identifying patterns and quantifying problems from raw support data."""
    ),
    verbose=True,
    allow_delegation=False,  # This agent focuses on its specific task
    llm=gemini_llm  # Use the configured Gemini LLM
)
```

```python
from crewai import Task

# Task 1: Analyze data
analysis_task = Task(
    description=(
        """Fetch and analyze the latest customer support interaction data (tickets, feedback, call logs)
        focusing on the last quarter. Identify the top 3-5 recurring issues, quantify their frequency
        and impact (e.g., resolution time, customer sentiment). Use the Customer Support Data Fetcher tool."""
    ),
    expected_output=(
        """A summary report detailing the key findings from the customer support data analysis, including:
- Top 3-5 recurring issues with frequency.
- Average resolution times for these issues.
- Key customer pain points mentioned in feedback.
- Any notable trends in sentiment or support agent observations."""
    ),
    agent=data_analyst  # Assign task to the data_analyst agent
)
```

```python
from crewai import Crew, Process

support_analysis_crew = Crew(
    agents=[data_analyst, process_optimizer, report_writer],
    tasks=[analysis_task, optimization_task, report_task],
    process=Process.sequential,  # Tasks will run sequentially in the order defined
    verbose=True
)

result = support_analysis_crew.kickoff(inputs={'data_query': 'last quarter support data'})
print(result)
```

## Notes

- Excerpted from the official three-agent example: the `Customer Support Data Fetcher` tool, the `process_optimizer` / `report_writer` agents and the remaining two tasks are defined in the full guide; `tools=[support_data_tool]` on the agent is omitted here.
- Third-party framework (CrewAI) using the Gemini API; model string `gemini/gemini-3.8-flash` is kept as written.
- Not related to openai-agents or anthropic-agent-sdk.
