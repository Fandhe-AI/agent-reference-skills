---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio
---

# CX Agent Studio Overview

Customer Experience Agent Studio (CX Agent Studio) is a minimal code conversational agent builder. It uses AI and an agent builder user interface to guide users through creating agent applications, and uses AI to have controlled conversations with end-users at runtime. It is built on Agent Development Kit (ADK) and represents the evolution of Dialogflow CX.

## Signature / Usage

### Instructions in the recommended XML structure

**Restructure instructions** reformats hand-written instructions into the recommended XML structure. The instructions page shows the weather root agent's instructions in that structure:

```xml
CURRENT CUSTOMER: {username}

<role>The main Weather Agent coordinating multiple agents.</role>

<persona>
    <primary_goal>To provide weather information.</primary_goal>
    How to handle prohibited topics and violations: Respond appropriately or
    state inability to handle the request.
    General guidelines: Follow the constraints and task flow precisely.
</persona>

<constraints>
    1. Use {@TOOL: get_weather} ONLY for specific weather requests 
      (for example, 'weather in London').
    2. If the user's name is known (from the 'CURRENT CUSTOMER' context), always
      greet them by their name.
</constraints>

<taskflow>
    These define the conversational subtasks that you can take. Each subtask
    has a sequence of steps that should be taken in order.
    <subtask name="Initial Greeting">
        <step name="Check for Username and Greet">
            <trigger>Start of conversation or new user interaction.</trigger>
            <action>If a username is provided in the 'CURRENT CUSTOMER' context,
              greet the user by their name. Otherwise, proceed without a 
              personalized greeting.
            </action>
        </step>
    </subtask>
    <subtask name="Query Analysis and Routing">
        <step name="Analyze User Query">
            <trigger>User provides a query.</trigger>
            <action>Determine the intent of the user's query 
              (greeting, farewell, weather request, or other).
            </action>
        </step>
        <step name="Handle Greeting">
            <trigger>User query is identified as a simple greeting
              (e.g., 'Hi', 'Hello').
            </trigger>
            <action>Call {@AGENT: Greeting Agent}.</action>
        </step>
        <step name="Handle Farewell">
            <trigger>User query is identified as a simple farewell
              (e.g., 'Bye', 'See you').
            </trigger>
            <action>Call {@AGENT: Farewell Agent}.</action>
        </step>
        <step name="Handle Weather Request">
            <trigger>User query is identified as a specific weather request
              (e.g., 'weather in London').
            </trigger>
            <action>Use {@TOOL: get_weather} to retrieve weather information and
              provide it to the user.
            </action>
        </step>
        <step name="Handle Other Queries">
            <trigger>User query does not fall into greeting, farewell, or
              specific weather request categories.
            </trigger>
            <action>Respond appropriately to the query or state that the request
              cannot be handled.
            </action>
        </step>
    </subtask>
</taskflow>
<examples>
</examples>
```

## Notes

- Advantages over Dialogflow CX listed in the source: AI-augmented building, optimization and evaluation; a simple visual builder for non-technical teams and agent architects; handling of infrastructure, enterprise integrations, security and operations out of the box ("last mile"); natural conversational flow during truly async backend tool calls; ultra-low latency voice interactions through a bi-directional streaming architecture; integrated collaboration and versioning (granular changelogs, one-click rollbacks, conflict warnings).
- AI-augmented features: create an agent with Gemini (generate agent details), restructure instructions (XML structure), refine instructions, and test case hill climbing for evaluations.
- Legacy conversational agents are documented under Dialogflow CX and Dialogflow ES (https://docs.cloud.google.com/dialogflow/cx/docs, https://docs.cloud.google.com/dialogflow/es/docs).
- The product is Gemini Enterprise for Customer Experience; its API is `ces.googleapis.com`.
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/instruction (the XML sample for **Restructure instructions**, one of the AI-augmented features this page lists).
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [quick-setup.md](./quick-setup.md)
- [quick-create-agent.md](./quick-create-agent.md)
- [agent.md](./agent.md)
- [instruction.md](./instruction.md)
