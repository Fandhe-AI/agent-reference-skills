---
source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/assign-virtual-agents-to-queues
---

# Create Virtual Agents and Assign Them to Queues

How to create virtual agents for the IVR, web, mobile, and SMS channels in the CCAI Platform portal (after you create and integrate Dialogflow or CX Agent Studio agents), and how to assign chat virtual agents (web, mobile chat, SMS) and voice virtual agents (IVR, mobile voice) to queues. A virtual agent can be assigned to one or more queues. Google recommends assigning at least one human agent to any queue that has a virtual agent, as a direct escalation path if the virtual agent fails or the service is interrupted.

## Signature / Usage

### Create a virtual agent

1. In the CCAI Platform portal, click **Settings > Virtual Agent**. If you don't see the **Settings** menu, click **Menu**.
2. Click **Add virtual agent > Customer Support**. The **Add a Customer Support Agent** dialog appears.
3. In the **Virtual Agent** field, enter a name. This is an internal name used for administration and reporting; Google recommends a unique internal name per virtual agent. It is visible to end-users only if you don't set up a virtual agent alias.
4. To set up a virtual agent alias, select the **Virtual Agent Alias** checkbox and enter a name in the **Virtual Agent Alias** field. With the checkbox selected, the alias is the name end-users see; otherwise they see the internal name.
5. To upload a custom avatar, click **Update**, select an image, click **Open**, crop it, and click **CROP**.
6. In the **Choose Virtual Agent platform** list, select a platform.
7. In the **Choose workflow** list, select a workflow. A workflow represents an authenticated Dialogflow agent.
8. For **Channel**, select **Chat** or **Voice**. The **Menu** checkboxes available for the selected channel are automatically selected.
9. For **Menu**, change your selections if needed.
10. For **Language**, select one or more languages.
11. Click **Save**.
12. To turn on the virtual agent, click **Back to Virtual Agents**, find the agent in the **Virtual Agents** pane, and click the toggle to the on position.

### Assign a chat virtual agent to a queue

1. In the CCAI Platform portal, click **Settings > Queue**. The **Queue Menu Settings** page appears.
2. In the **Web**, **Mobile**, or **SMS Messaging** pane (matching the channel the agent was created for), click **Edit / View**.
3. Click the queue.
4. For **Channel Settings**, in the **Virtual Agent Chat** row, click **Assign Virtual Agent**.
5. In the **Virtual Agent** list, select a chat virtual agent. Only virtual agents that you turn on appear in this list.
6. For **Hours of Operation**, select **24 Hours** (the virtual agent is available at any time; when there are no human agents available, escalations aren't possible) or **Queue hours** (available only during the queue's hours of operation).
7. Web and mobile chat only: select **Display Skip to human agent button** to let end-users connect directly with a human agent.
8. Web and mobile chat only: to route high-priority users directly to human agents, set up Priority user segments in your CRM, turn on **Exclude users from Virtual Agent workflow**, select a **CRM Custom User Segment Field**, and enter a **CRM Custom User Segment Value**.
9. To add data parameters, turn on **Pass Data Parameters**, click **Add Parameter**, fill in the fields (see the pass data parameters page), click **Save**, and use **Data Records** to choose whether parameters go in metadata files or CRM records.
10. Click **Save**.
11. Click **Back to Settings**, and select the **Virtual Agent Chat** checkbox. This lets incoming SMS sessions be routed to the virtual agent.

### Assign a voice virtual agent to a queue

1. In the CCAI Platform portal, click **Settings > Queue**.
2. In the **IVR (Interactive Voice Response)** or **Mobile** pane, click **Edit / View**.
3. Click the queue.
4. For **Channel Settings**, in the **Virtual Agent** row, click **Assign Virtual Agent**.
5. In the **Virtual Agent** list, select a voice virtual agent (only virtual agents that you turn on appear).
6. For **Hours of Operation**, select **24 Hours** or **Queue hours** (same meaning as above).
7. IVR only: to set a keypad hot key that lets end-users connect directly with a human agent, select **Allow end user to skip virtual agent** and select a key in the **Hot key option** list.
8. Mobile voice only: select **Display Skip to human agent button**.
9. To add data parameters, turn on **Pass Data Parameters** and add parameters as for chat.
10. Click **Save**.
11. Click **Back to Settings**, and select the **Virtual Agent** checkbox. This lets incoming SMS sessions to be routed to the virtual agent.

### Assign voice virtual agent transfers to top-level queues

Make sure the top-level queue ID is entered as the destination in Dialogflow CX (queue IDs are in **Settings > Queue**) and that any required leaf queues are active. In the IVR, the end-user hears all the sub queue and leaf queue options under the top-level. If a top-level queue has no active sub queues or leaf queues or is configured incorrectly, the IVR Fallback mechanism either redirects the caller to the previous queue (if human agents are available) or conveys an error message before disconnecting the call (if the escalating queue lacks human agents).

### Example: escalate to a targeted queue

A CCAI Platform custom payload (Dialogflow CX) that escalates the session to the targeted queue (`menu_id`), by virtual agent:

```json
{
  "ujet": {
    "type": "action",
    "action": "escalation",
    "escalation_reason": "by_virtual_agent",
    "menu_id": 100,
    "language": "ko"
  }
}
```

## Notes

- Hours of Operation setting details: https://docs.cloud.google.com/contact-center/ccai-platform/docs/hours-of-operation#hours-of-operation-settings.
- If you have multiple virtual agents, Google recommends giving them the same virtual agent alias, so that when a session is transferred between virtual agents they appear to the end-user to have the same name.
- Only virtual agents that you turn on appear in the queue assignment list.
- Snippet taken from https://docs.cloud.google.com/contact-center/ccai-platform/docs/va-custom-payload (Escalation to the targeted queue).
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/assign-virtual-agents-to-queues (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/contact-center/ccai-platform/docs/create-virtual-agents (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-a-dialogflow-agent.md](./create-a-dialogflow-agent.md)
- [va-pass-data-parameters.md](./va-pass-data-parameters.md)
- [virtual-agent-to-human-agent-transfers.md](./virtual-agent-to-human-agent-transfers.md)
