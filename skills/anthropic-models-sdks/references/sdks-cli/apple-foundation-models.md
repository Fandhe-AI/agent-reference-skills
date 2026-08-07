<!-- source: https://platform.claude.com/docs/en/cli-sdks-libraries/libraries/apple-foundation-models / last verified: 2026-08-07 -->

# Apple Foundation Models

Use Claude on Apple platforms through the Foundation Models framework with the Claude for Foundation Models Swift package.

## Signature / Usage

```swift
dependencies: [
  .package(url: "https://github.com/anthropics/ClaudeForFoundationModels.git", from: "0.1.0")
]
```

```swift
import FoundationModels
import ClaudeForFoundationModels

let model = ClaudeLanguageModel(
  name: .sonnet5,
  auth: .apiKey(ProcessInfo.processInfo.environment["ANTHROPIC_API_KEY"] ?? "")
)

let session = LanguageModelSession(model: model)
let response = try await session.respond(to: "Plan a 4-day trip to Buenos Aires.")
print(response.content)
```

Streaming:

```swift
let stream = session.streamResponse(to: "Summarize today's top science stories.")
for try await partial in stream {
  print(partial.content)
}
```

Structured output:

```swift
@Generable
struct Trip {
  @Guide(description: "Destination city") var destination: String
  @Guide(description: "Length in days") var days: Int
}

let response = try await session.respond(to: "Plan a trip to Tokyo.", generating: Trip.self)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `name` | `ClaudeModel` | Model constant (e.g. `.sonnet5`, `.opus5`) or a custom `ClaudeModel(id:capabilities:)` |
| `auth` | `AuthMode` | `.appAttest(clientID:)`, `.proxied(headers:)`, or `.apiKey(_:)` |
| `baseURL` | URL | Default `https://api.anthropic.com` |
| `timeout` | `TimeInterval` | Request timeout |
| `serverTools` | `[ClaudeServerTool]` | `.webSearch(maxUses:)`, `.webFetch(...)`, `.codeExecution` |
| `fixedEffort` | effort level | Pin a Claude effort level (`low`/`medium`/`high`/`xhigh`/`max`); takes precedence over the framework's reasoning hints |

## Notes

- Beta: targets the Foundation Models server-side language model API introduced in the OS 27 betas (iOS/macOS/visionOS/watchOS 27, Xcode 27 beta).
- Requests go directly from the app to the Claude API — Apple is not in the request path and does not see prompts/responses. Usage is billed at standard API pricing.
- Not a general-purpose Messages API client — its surface is the Foundation Models provider conformance plus `ClaudeLanguageModel`/`ClaudeModel`/`AuthMode`/`ClaudeServerTool`. For direct Messages API access, use one of the Client SDKs.
- App Attest ships with no bundled API key and no proxy to operate, but requires a physical device (not available in Simulator) and is unavailable through Amazon Bedrock, Google Cloud, or Microsoft Foundry; tokens are workspace-scoped, expire hourly, and carry no end-user identity.
- Features with no Foundation Models protocol representation are unavailable: configurable prompt caching (applied automatically, not tunable), stop sequences, batch processing, Files API, token counting, beta headers.
- Errors map onto `LanguageModelError` where possible (`.contextSizeExceeded`, `.rateLimited`, `.timeout`); unmapped provider errors surface as `ClaudeError`.

## Related

- [CLI, SDKs, and libraries](./overview.md)
- [Swift SDK client alternative: Client SDKs overview](./overview.md)
