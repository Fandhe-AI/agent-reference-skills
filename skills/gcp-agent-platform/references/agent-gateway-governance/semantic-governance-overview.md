---
source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview
---

# Semantic governance policies overview

Semantic governance is a security check layer (an "intent gate") for agents: a policy engine evaluates each proposed tool call against the user's intent and natural language constraints (NLCs) you write, and allows only calls that violate neither. It is a Preview feature and uses an LLM, so verdicts may not be accurate.

## Signature / Usage

### Create a policy (gcloud)

Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/beta/ai/semantic-governance-policies/create (gcloud 593.0.0 help):

```bash
gcloud beta ai semantic-governance-policies create my-policy \
    --location=us-central1 --display-name="My Policy" \
    --natural-language-constraint="constraint" --agent="agent-name"
```

### Enforcement flow

1. Identification: requests from the agent to the model and to remote tools carry an Identity token in the Authorization header.
2. Interception: Agent Gateway intercepts the model's suggested tool call, uses the agent identity to retrieve the NLCs, and sends the tool suggestion, NLCs and chat history to the policy engine (the policy decision point).
3. Evaluation: the engine evaluates the call against user intent and constraints and renders a verdict.
4. Enforcement: the verdict is added to the model response, removing the proposed tool call, before it returns to the agent through Agent Gateway.

## Options / Props

### Request paths the authorization policy `when` condition must match

| API | Request path |
|---|---|
| Gemini Developer API and Gemini models on Gemini Enterprise Agent Platform | `:generateContent` |
| Anthropic Messages API | `/v1/messages` |
| Claude models on Gemini Enterprise Agent Platform | `:rawPredict` |
| OpenAI Chat Completions API, Mistral AI API, the OpenAI-compatible endpoint on Gemini Enterprise Agent Platform (including Llama models in Gemini Enterprise Agent Platform Model Garden), and self-hosted OpenAI-compatible servers such as vLLM | `/chat/completions` |

### Verdict inputs

| Input | Description |
|---|---|
| **Current User Prompt** | The original request from the user. |
| **Constraints** | Agent-wide or tool-specific rules defined in the policy. |
| **Tools Manifest** | The list of available tools combined with tool-specific constraints. |
| **Chat History** | Turn-by-turn context from current and past conversation turns. |
| **Suggested Tool Invocations** | The actions proposed by the LLM that require evaluation. |

### Layered controls

| Control | Mechanism |
|---|---|
| **Authentication** | Identity-aware gateways (Identity-Aware Proxy, Apigee, etc.) |
| **Role-based access control (RBAC) on ingress** | RBAC rules (for example, procurement department access) |
| **Attribute-based access control (ABAC) on ingress** | ABAC rules (for example, approval limits based on employee role) |
| **Rate limits** | API Gateway or Apigee |
| **Prompt scanning** | Model Armor (PII, hate speech, prompt injection) |
| **Response scanning** | Model Armor (PII/PHI masking) |
| **Identity-based access control on egress** | IAM allow policies for Agent Gateway (for example, which MCP servers an agent can access) |
| **Alignment with user intent** | **Semantic governance policy** |
| **Business constraints** | **Semantic governance policy** (for example, preventing an agent from unintentionally accessing a credit report even if authorized for the user) |

## Notes

- Components:
  - Semantic governance policy: Natural language rules (constraints) governing an agent or a tool called by an agent.
  - Policy engine: Managed infrastructure that you provision and enable within your VPC network; hosts the runtime that processes and enforces the policies.
- Verdicts:
  - `ALLOW`: The action proceeds.
  - `DENY`: The action is blocked; the engine returns a structured denial response with a human-readable rationale to the calling agent.
- Constraint scope and limits:
  - All tools for the agent: Applies to every tool available to the agent.
  - A single selected tool: Evaluated only when the agent proposes calling that tool; reference a parameter by name inside the constraint to constrain it.
  - Denial message: Fixed message on the policy, up to 1,000 characters (`agentResponseCustomization.denialMessage` in REST, `--agent-response-denial-message` in gcloud).
  - Setup time: Approximately 2 to 3 minutes for policy engine enablement (up to 20 minutes if refilling the warmup pool), plus networking setup.
- Preview: subject to the "Pre-GA Offerings Terms"; Pre-GA features are available "as is" and might have limited support. The feature is a Generative AI Service; "LLMs are probabilistic and can make mistakes. Verdicts may not be accurate."
- The policy engine does not support streamed model responses (`:streamGenerateContent`, `:streamRawPredict`, or requests that set `"stream": true`); a tool call in a streamed response might not be blocked. Configure agents to call their model without streaming.
- The user intent check is on by default; it can be turned off so verdicts depend only on the agent's constraints.
- Information exposure: policies are Service Data and a denial rationale can cite your constraint details and may reach end users, so do not put sensitive or proprietary information in constraints. Set a fixed denial message or redact the rationale in agent code.
- Semantic governance complements IAM, rate limits and network security; it does not replace them. In a hub-and-spoke architecture, one Agent Gateway and policy engine in a central management project can govern agents across member projects.
- `gcloud beta ai semantic-governance-policies` is a beta command; `--location` is required.
- The source also describes governing Agent Skills, best practices and the configuration page (separate pages).
- Source: https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview (retrieved 2026-11-21; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/beta/ai/semantic-governance-policies/create (gcloud 593.0.0 help)

## Related

- [agent-gateway-overview.md](./agent-gateway-overview.md)
- [govern.md](./govern.md)
- [iam-overview-uap.md](./iam-overview-uap.md)
