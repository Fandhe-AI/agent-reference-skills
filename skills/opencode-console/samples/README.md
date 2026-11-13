# samples

| Name | Description | Path |
| --- | --- | --- |
| Claude Code via Console | Point Claude Code at the Console gateway with two environment variables, then persist the setup, switch to Go, and add the Console MCP server. | [claude-code-via-console.md](./claude-code-via-console.md) |
| Codex via Console | Add Console as a Codex model provider (pay-as-you-go or Go), keep both with a profile, and add the Console MCP server. | [codex-via-console.md](./codex-via-console.md) |
| Hermes via Console | Use the built-in OpenCode providers of Hermes Agent for pay-as-you-go (`opencode-zen`) or Go (`opencode-go`), and add the Console MCP server. | [hermes-via-console.md](./hermes-via-console.md) |
| Pi via Console | Use the built-in `opencode` and `opencode-go` providers of the Pi coding agent, set a default model, and add the Console MCP server. | [pi-via-console.md](./pi-via-console.md) |
| Raycast via Console | Use Console and Go models in Raycast AI through the OpenCode extension, and add the Console MCP server. | [raycast-via-console.md](./raycast-via-console.md) |
| Harness Base URLs and Sessions | Choose the Console base URL for your plan, append the API path your harness speaks, and send a stable session header. | [harness-base-urls-sessions.md](./harness-base-urls-sessions.md) |
| Inference API Requests | Call a model through Console inference with the endpoint that matches its API family, then read the cost from the response. | [inference-api-requests.md](./inference-api-requests.md) |
| Providers API Requests | Call a provider connected to your workspace through its Console API URL with a service account key. | [providers-api-requests.md](./providers-api-requests.md) |
| Service Account API Key | Create a restricted service account key for CI, then authenticate Console API requests with it. | [service-account-api-key.md](./service-account-api-key.md) |
| Go Subscription Setup | Connect OpenCode to an OpenCode Go subscription, select a Go model, and list available models. | [go-subscription-setup.md](./go-subscription-setup.md) |
| Verify the x-opencode-actor Token | Verify the signed `x-opencode-actor` JWT on a gateway you run, with the `jose` library. | [provider-actor-token-verification.md](./provider-actor-token-verification.md) |
| SSO Callback URLs and Domain Verification | Register the OIDC callback or SAML ACS values with your identity provider and publish the domain verification TXT record. | [sso-oidc-saml-domain-verification.md](./sso-oidc-saml-domain-verification.md) |
| SCIM Directory Sync | Point an Okta, Microsoft Entra ID, or other SCIM 2.0 identity provider at the Console SCIM base URL with a bearer token. | [scim-directory-sync.md](./scim-directory-sync.md) |
| Hosted Web Search | Enable hosted web search for a workspace and use it from OpenCode. | [hosted-web-search.md](./hosted-web-search.md) |
