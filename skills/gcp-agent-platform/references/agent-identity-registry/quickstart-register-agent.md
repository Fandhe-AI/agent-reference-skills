---
source: https://docs.cloud.google.com/agent-registry/quickstart-register-agent
---

# Quickstart: Register an agent in Agent Registry

Manually register a mock agent in Agent Registry with the Google Cloud console by pasting a sample Agent2Agent (A2A) Agent Card. Registering an agent and publishing its A2A skills lets other developers and orchestrator agents in your organization find and reuse it.

## Signature / Usage

### Sample Agent Card to paste

In the console choose **Agent Registry** > **Agents** tab > **Add agent**, set **Type** to **A2A** and **Region** to `global` (Global), select the **Paste JSON** tab, paste the card and click **Save**:

```json
{
  "supportedInterfaces": [
    {
      "url": "https://example.com/mock-travel-agent",
      "protocolBinding": "HTTP+JSON",
      "protocolVersion": "1.0.0"
    }
  ],
  "name": "mock-travel-agent",
  "description": "A mock agent that plans travel itineraries.",
  "version": "1.0.0",
  "capabilities": {
    "streaming": false,
    "pushNotifications": false
  },
  "defaultInputModes": ["text/plain"],
  "defaultOutputModes": ["text/plain"],
  "skills": [
    {
      "id": "BookFlight",
      "name": "BookFlight",
      "description": "Books a flight to a destination.",
      "tags": ["travel", "booking"]
    },
    {
      "id": "SearchHotels",
      "name": "SearchHotels",
      "description": "Searches for hotels in a destination city.",
      "tags": ["travel", "accommodation"]
    }
  ]
}
```

### Verify the registration

On the **Agents** tab, find the mock agent, click its name and check that the `BookFlight` and `SearchHotels` A2A skills appear on the **Overview** tab.

### Clean up

Delete the registered agent: on the **Agents** tab open the **More options** menu in the **Actions** column of the mock agent, select **Delete**, enter `DELETE` in the confirmation dialog and click **Delete**.

## Options / Props

### Required role

| Role | Scope | Purpose |
|---|---|---|
| Agent Registry API Editor (`roles/agentregistry.editor`) | The governance project where Agent Registry is enabled | Register agents in Agent Registry. |

## Notes

- Prerequisites: set up Agent Registry. For a single project, use the ID of the governance project; with a management boundary use the management project ID for boundary-wide discovery and registration, or a member project ID for single-project operations. If prompted in the console, click **Enable** to enable the Agent Registry API.
- The mock agent URL `https://example.com/mock-travel-agent` is a placeholder; use a disposable project and delete the mock agent when done.
- The source only shows the Console flow; for automatic registration of agents on managed runtimes see https://docs.cloud.google.com/agent-registry/automatic-registration and for management see https://docs.cloud.google.com/agent-registry/manage-agents.
- Source: https://docs.cloud.google.com/agent-registry/quickstart-register-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [setup.md](./setup.md)
- [concepts.md](./concepts.md)
- [search-agents-and-tools.md](./search-agents-and-tools.md)
