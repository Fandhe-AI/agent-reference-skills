---
source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/flow
---

# Flow-Based Agents (Dialogflow CX Flows)

A flow-based agent hands the conversation to an existing Dialogflow CX flow until it reaches END_SESSION, after which control returns to the CX Agent Studio agent that initiated it. User input is sent to flows with the `DetectIntent` API method; for voice, CX Agent Studio handles TTS and STT.

## Signature / Usage

### Set an agent variable from Python tool code

Input variable mapping sends agent variables to the flow as session parameters, and output variable mapping returns flow session parameters as agent variables. Agent variables use the ADK context state; a Python tool updates one through the global `context` variable.

The [Variables](./variable.md) page of the official docs says "A global variable called `context` is available to use in your Python tool code"; `value` stands for the new value you assign (the official example does not define it).

```python
context.state["variable_name"] = value
```

## Notes

- Import form fields: project, agent, display name, description for the parent CX Agent Studio agent (when to transfer control to the flow), flow starting resource, environment (defaults to draft), input variable mapping (sent to the flow as session parameters), output variable mapping (flow session parameters sent to your agent application as variables).
- Permissions: grant the Customer Engagement Suite Service Agent the Dialogflow API Client role so the agent application can call your Dialogflow CX flow.
- Create from the agent builder: click the plus button at the bottom of the initiating agent, then **Import flow-based agent**, fill in the fields above and click **Import**.
- CX Agent Studio agents are not a drop-in replacement for playbooks; Dialogflow CX playbooks and flows may be tightly coupled. Consider isolating agent types: new CX Agent Studio agents for new use cases, Dialogflow CX agents for old use cases, with a routing layer deciding which to invoke. CX Agent Studio steering agents cannot transfer between Dialogflow CX agents until END_SESSION is reached and control returns to the steering agent. Migration may be a substantial one-time effort.
- Use flows for highly deterministic logic that callbacks cannot handle (sequential data collection and validation, authentication based on session parameters). Do not use flows for canned responses (use an agent callback) or intent classification (use LLMs).
- Treat flows as black boxes: flows depend on implicit global session parameters, and parameters gathered in a flow propagate to the session scope by default, so changes upstream can break downstream flows. Pass required data as explicit input parameters and populate predefined output parameters before returning control. The source's diagrams show a recommended layout (the agent as routing layer), an acceptable one (a playbook inside, kept encapsulated) and an unacceptable one (convoluted back-and-forth between a flow and an agent).
- Snippet taken from https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/variable (the source page for flows has no code; the flow mapping itself is configured in the console).
- Source: https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/flow (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [agent.md](./agent.md)
- [variable.md](./variable.md)
- [handoff.md](./handoff.md)
