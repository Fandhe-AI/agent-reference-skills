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

## Related

- [Choose your Windows AI solution](./choose-your-windows-ai-solution.md)
- [Ready-to-use local LLMs on Windows](./local-llms.md)
- [FAQs about using AI in Windows apps](./faq-using-ai.md)
