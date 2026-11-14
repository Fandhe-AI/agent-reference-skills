# Working with Agents

Conceptual guide to delegating goals to an agent (model + tools + guardrails and human oversight) while staying in control.

## Signature / Usage

```text
Use the attached brief as a model. I need a one-page comparison of three options, with a recommendation and links to the sources. Flag unanswered questions and save it as a draft for my review.
```

### Chat vs. delegating to an agent

| What changes | Chat with AI | Delegate to an agent |
|--------------|--------------|----------------------|
| How you start | Ask a question or work through an idea together. | Describe the outcome, relevant context, and boundaries. |
| What happens next | You usually guide the next exchange with another message. | The agent can choose and carry out several steps toward the goal. |
| What you receive | A response you can use, question, or refine. | Work to review, along with results, questions, or blockers. |
| Your role | Shape the conversation and check the response. | Set direction, review progress, and decide what to do with the result. |

### Products with agentic capabilities

| Product or feature | Work it can take on |
|--------------------|---------------------|
| ChatGPT Work | Multi-step tasks across files, sources, and tools, producing reviewable deliverables. |
| dots | Ongoing personal assistance across tools and projects (rolling out to eligible accounts). |
| Codex Cloud | Software work: inspect code, make changes, run commands or tests in a cloud environment. |
| OpenAI developer tools | Custom agents built with OpenAI APIs and the Agents SDK. |

### Parts of a good brief

| Part | What to make clear |
|------|--------------------|
| Task | What to accomplish, for whom, and what is in or out of scope. |
| Context | Sources, facts, priorities, constraints; what to do when information is missing. |
| Actions | What it may do independently, what needs approval, when to pause or stop. |
| Output | What to deliver, format and destination, and how quality and completeness are judged. |

### Review responses

- **Continue**: result meets the brief and next step is within agreed boundaries.
- **Redirect**: name the issue and give a focused correction.
- **Pause and decide**: resolve missing access, an open decision, or an action requiring approval.

## Notes

- Before delegating, ask: can I describe the outcome and "done"? Can the agent access the information and tools? Can I evaluate the result and recover?
- Instructions communicate intent; permissions control access. Use the product's permission controls as well as stating boundaries in the brief.
- Agents may take longer and use more of your usage allowance than a quick chat; check usage and pricing before substantial or recurring work.
- Changing an instruction does not undo an action already completed; inspect the saved result in any system the agent reports updating.
- Save useful briefs, corrections, and a review checklist; expand scope only as comparable tasks prove reliable.
- Source: https://learn.chatgpt.com/docs/working-with-agents (retrieved 2026-11-14).

## Related

- [Best practices](./best-practices.md)
- [Long-running work](../extend/long-running-work.md)
- [Automations](../extend/automations.md)
