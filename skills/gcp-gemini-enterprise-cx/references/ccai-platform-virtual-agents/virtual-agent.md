---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/virtual-agent
---

# Virtual Agents Overview

Contact Center AI Platform (CCAI Platform) virtual agents use generative AI and natural language processing to handle support cases. They are based on Dialogflow or Gemini Enterprise for Customer Experience. A virtual agent can be the first line of customer support, or handle support requests with limited to no human agent intervention.

## Signature / Usage

### Ways to use virtual agents

- Configure multiple virtual agents that focus on specific issues and assign them to specific queues.
- Assign a virtual agent to answer incoming calls or chats, or use existing routing options at the queue level.
- Let your human agents receive escalations from virtual agents.

### End-user experience

Sessions can be passed seamlessly from a virtual agent to a human agent. If a virtual agent reaches the limit of its knowledge or if it experiences a technical issue, it can automatically escalate the session and display a message to the end-user. The session is placed in a queue where it can be handled by a human agent.

- Chats: except for the virtual agent's configurable name and avatar, there is no noticeable difference between a virtual agent and a human agent in the end-user's user interface. A **Skip to Human Agent** button can be added to the chat interface. User segments in your CRM can make specific groups of end-users (for example, VIPs) bypass the virtual agent automatically.
- Calls: virtual agents use pre-programmed voice prompts and responses, and can use generative AI to support complex conversations. You can build flows to escalate end-users to human agents or to prevent escalations. You can use your own voice talent to supply audio recordings or use a generated voice from text that you supply.

### Agent experience

Human agents can see that a session was escalated from a virtual agent in the CRM and the agent adapter. For chats, human agents can see a conversation with a virtual agent in the chat adapter. Human and virtual agents can transfer calls or chats to queues and to each other. Queues attended by virtual agents are labeled to inform human agents.

### Example: escalation payload

```json
{
  "ujet": {
    "type": "action",
    "action": "escalation",
    "escalation_reason": "by_virtual_agent"
  }
}
```

## Notes

- Google recommends assigning a human agent to the same queue as a virtual agent. This provides an additional escalation path in case there's a failure escalating to a different queue.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-custom-payload
- This is Google's CCAI Platform virtual agent (Dialogflow / Gemini Enterprise for Customer Experience), not Claude Code, the Agent SDK or OpenAI Agents.
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/virtual-agent (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-a-dialogflow-agent.md](./create-a-dialogflow-agent.md)
- [assign-virtual-agents-to-queues.md](./assign-virtual-agents-to-queues.md)
- [virtual-agent-to-human-agent-transfers.md](./virtual-agent-to-human-agent-transfers.md)
- [va-custom-payload.md](./va-custom-payload.md)
