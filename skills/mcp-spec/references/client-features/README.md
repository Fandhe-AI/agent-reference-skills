# client-features

| Name | Description | Path |
|------|-------------|------|
| Form Mode Elicitation | Form mode lets servers collect structured data directly through the MCP client, with a restricted JSON Schema (`requestedSchema`) describing the expected response. | [elicitation-form-mode.md](./elicitation-form-mode.md) |
| URL Mode Elicitation | URL mode lets servers direct users to external URLs for out-of-band interactions that must not pass through the MCP client, such as auth flows, payment processing, and entering sensitive data. | [elicitation-url-mode.md](./elicitation-url-mode.md) |
| Elicitation | Servers request additional information from users through the client during interactions. The client keeps control over user interaction and data sharing. Two modes exist: form mode (structured data, optional JSON schema validation, exposed to the client) and URL mode (out-of-band navigation for sensitive interactions that must not pass through the MCP client). | [elicitation.md](./elicitation.md) |
| Roots (Deprecated) | Clients expose filesystem "roots" to servers, informing them which directories and files the client considers relevant. Roots are informational guidance, not an access-control mechanism; the protocol does not enforce that servers stay within roots. | [roots.md](./roots.md) |
| Sampling with Tools | Servers can request that the client's LLM use tools during sampling by providing a `tools` array and optional `toolChoice` in a `sampling/createMessage` request. Tool definitions are scoped to the sampling request and do not need to correspond to registered tools. | [sampling-with-tools.md](./sampling-with-tools.md) |
| Sampling (Deprecated) | Servers request LLM sampling ("completions" or "generations") from language models via clients. The client keeps control over model access, selection, and permissions, and no server API keys are necessary. Servers can request text, audio, or image-based interactions. | [sampling.md](./sampling.md) |
