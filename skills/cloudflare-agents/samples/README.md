# samples

| Name | Description | Path |
| --- | --- | --- |
| Chat agent | Streaming Workers AI chat agent with a server-side tool, a client-side tool, and an approval-gated tool, plus the React client. | [chat-agent.md](./chat-agent.md) |
| Email agent with secure reply routing | Agent that sends email through the `send_email` binding, receives inbound mail, and routes signed replies back to the same instance. | [email-agent-secure-reply.md](./email-agent-secure-reply.md) |
| Slack agent | Multi-tenant Slack bot: one Durable Object per Slack workspace, replying to DMs and channel mentions with an LLM. | [slack-agent.md](./slack-agent.md) |
| Voice agent | Real-time voice agent: speech-to-text, streamed LLM turn, text-to-speech, and a React client (beta). | [voice-agent.md](./voice-agent.md) |
| Browser agent tools | Chat agent that gives the LLM `browser_search` and `browser_execute` tools, with LLM-written CDP code running in a Worker sandbox. | [browser-agent-tools.md](./browser-agent-tools.md) |
| Browser extraction with Puppeteer | Agent method that renders pages with Browser Run through Puppeteer and asks Workers AI to extract structured data. | [browser-puppeteer-extract.md](./browser-puppeteer-extract.md) |
| Testing an Agent with Vitest | Test an Agent's HTTP responses with Vitest and the Workers test plugin, and run it locally with `wrangler dev`. | [testing-agent-vitest.md](./testing-agent-vitest.md) |
| Add the Lifecycle to an existing Durable Object | Install the Agents SDK Lifecycle on an existing SQLite-backed Durable Object, add a Scheduler capability, and route agent traffic safely. | [durable-object-lifecycle.md](./durable-object-lifecycle.md) |
