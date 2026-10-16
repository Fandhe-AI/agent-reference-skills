# production

| Name | Description | Path |
|------|-------------|------|
| Safety in Building Agents | Risk types and mitigations for multi-agent workflows built with Agent Builder. | [agent-builder-safety.md](./agent-builder-safety.md) |
| Cost Optimization | Strategies for reducing OpenAI API spend beyond basic prompt/token hygiene. | [cost-optimization.md](./cost-optimization.md) |
| Cybersecurity Checks | Automated safeguards that apply to models classified as High Cybersecurity Capability under OpenAI's Preparedness Framework (GPT-5.3-Codex and newer, including GPT-5.4/GPT-5.5) when used via the API. | [cybersecurity-checks.md](./cybersecurity-checks.md) |
| API Deployment Checklist | Checklist of Responses API production levers, each tagged with its expected impact on quality, cost, latency, or reliability. | [deployment-checklist.md](./deployment-checklist.md) |
| Fast Mode | Opt-in service tier delivering up to 2.5x faster, more consistent latency for high-value, user-facing, latency-critical traffic, while keeping pay-as-you-go pricing. | [fast-mode.md](./fast-mode.md) |
| Production Notes on GPT Actions | Operational constraints and best practices for deploying GPT Actions (ChatGPT custom actions) to production. | [gpt-actions-production.md](./gpt-actions-production.md) |
| Latency Optimization | Seven principles for reducing latency across LLM-based applications, applicable from a single workflow to an end-to-end chatbot. | [latency-optimization.md](./latency-optimization.md) |
| Misalignment Monitoring | Checks whether an agent is properly interpreting the user's instructions in consequential contexts (transferring or accessing sensitive data, making destructive changes). Reviews model reasoning and actions asynchronously and can stop a conversation when it identifies a potential issue. | [misalignment-monitoring.md](./misalignment-monitoring.md) |
| Model Optimization | Workflow for iteratively improving OpenAI model output quality using evals, prompt engineering, and (legacy) fine-tuning. | [model-optimization.md](./model-optimization.md) |
| Moderation | Free OpenAI moderation models detect harmful content in text and images before it reaches users or gets generated. | [moderation.md](./moderation.md) |
| Production Best Practices | Guide for transitioning OpenAI API projects from prototype to production, covering org setup, billing, key security, scaling, latency, and cost. | [production-best-practices.md](./production-best-practices.md) |
| Managing Costs (Realtime API) | Monitoring and reducing token spend for Realtime API voice-agent sessions. | [realtime-costs.md](./realtime-costs.md) |
| Safety Best Practices | Practices for reducing unsafe content and abuse when deploying OpenAI API applications to production. | [safety-best-practices.md](./safety-best-practices.md) |
| Safety Checks | OpenAI's automated safety classifier process and enforcement flow for GPT-5-and-later models, and how to respond to it. The official page is now titled "Safety classifiers" (this file keeps its original name). | [safety-checks.md](./safety-checks.md) |
| Safety Enforcement Notifications | Connect OpenAI enforcement notices (warnings, deactivations) to your team's workflows using safety webhooks and the Safety Case Read API. For example, on a warning your application can retrieve the case, identify the affected user, and create an internal review ticket. | [safety-enforcement.md](./safety-enforcement.md) |
| Ultrafast Mode | Fastest service tier in the OpenAI API, broadly available for GPT-6 Astra and GPT-6.1 Sol. Use it when speed justifies the higher cost. | [ultrafast-mode.md](./ultrafast-mode.md) |
| Under-18 Guidance | Additional safeguards developers should implement when using the API to serve minors (under 18 years old). These are in addition to the usage policies and terms and conditions. | [under-18-guidance.md](./under-18-guidance.md) |
