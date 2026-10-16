# Choose between cloud-based and local AI models

Decision guidance for developers weighing local, on-device AI (Windows AI APIs, Windows ML, Foundry Local) against cloud-based AI (Microsoft Foundry, Azure AI Services, Azure OpenAI) across privacy, resources, cost, latency, scalability, and tooling.

## Signature / Usage

No API surface — this is a decision guide. Local samples: [`Add OpenAI chat completions to your WinUI 3 / Windows App SDK desktop app`](https://learn.microsoft.com/en-us/windows/apps/how-tos/chatgpt-openai-winui3), [`Add DALL-E to your WinUI 3 / Windows App SDK desktop app`](https://learn.microsoft.com/en-us/windows/apps/how-tos/dall-e-winui3).

## Options / Props

| Factor | Local, on-premises | Cloud |
|------|-------------|------|
| Data privacy | Data stays on-device; user/developer bears security responsibility. | Data must transit to the cloud; provider handles security updates but data-protection regs (GDPR, HIPAA) may apply. |
| Resource availability | Limited by device CPU/GPU/NPU/memory/storage; SLMs (e.g. Phi) fit local use. | Scalable, pay-as-you-go; supports LLMs (e.g. OpenAI models) needing more resources. |
| Cost | No cost beyond device hardware. | Pay-as-you-go; can accumulate with usage. |
| Latency | Lower latency, no network dependency; capped by device hardware. | Can leverage powerful hardware but introduces network latency. |
| Connectivity | No internet required. | Requires a stable internet connection. |
| Tooling | Windows App SDK + ONNX Runtime for embedding models directly in apps. | Azure DevOps / GitHub Copilot / Semantic Kernel integration for end-to-end orchestration. |

## Notes

- Small Language Models (e.g. Phi Silica) are suited to local execution; Large Language Models (e.g. OpenAI models) typically need cloud-scale resources.
- Microsoft Foundry on Windows (Windows AI APIs, Windows ML, Foundry Local) is the local-tooling ecosystem; Microsoft Foundry (cloud) / Azure AI Services / Azure OpenAI Service are the cloud counterparts — same "Foundry" branding, different products.
- Combining both (local-first with cloud fallback) is a common resilient pattern.
- Hybrid local/cloud path (5 steps): choose the local capability first (Windows AI API, or Windows ML / Foundry Local for a specific model); check readiness before use; ask for consent when a local model must be downloaded (some are several GB); define a cloud fallback behind the same app-level abstraction, only when the user and organization allow data to leave the device; keep behavior observable (log which path was used, readiness failures, download outcomes, fallback errors, without logging prompts, tokens, or sensitive content unless approved).
- Hybrid fallback decision flow (9 steps): (1) check whether a local AI feature fits the task; (2) if none fits, use cloud AI or another service; (3) otherwise check readiness on the current device; (4) if ready, run local inference; (5) if a model download is needed, ask for user consent first; (6) on consent, download/prepare and retry locally; (7) if the user declines or the feature is unsupported, check whether cloud fallback is allowed; (8) if allowed, use the cloud path; (9) if not allowed, explain the device, model, or policy requirement and disable or hide the feature.
- Route by task complexity: favor the local model (e.g. Phi Silica) for short single-turn classification or intent detection, rewriting/summarizing short well-structured text, extracting structured data from short clean input, low-risk conversational responses, and offline or on-device-data-required scenarios. Favor a cloud model for multi-step reasoning and tool chains, long-document or multi-turn scenarios beyond the local context window, broad or up-to-date knowledge, high-accuracy-bar scenarios, and complex code or image generation.
- Routing guidance: classify the task up front with signals you control (entry point, input length, lightweight local classification); a decision model such as Microsoft-Decision-1 can classify and route requests to a local model, cloud model, tool, or human review; route advanced tasks directly to the cloud instead of trying local first; let users escalate a local response to the cloud model; revisit routing rules as local models improve and keep the classification logic in one place.

## Related

- [Choose your Windows AI solution](./choose-your-windows-ai-solution.md)
- [Ready-to-use local LLMs on Windows](./local-llms.md)
- [FAQs about using AI in Windows apps](./faq-using-ai.md)
- [Get started with Windows AI APIs](./get-started.md)
