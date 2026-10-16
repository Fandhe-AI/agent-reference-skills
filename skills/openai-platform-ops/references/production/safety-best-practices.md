# Safety Best Practices

Practices for reducing unsafe content and abuse when deploying OpenAI API applications to production.

## Practices

- **Use the free Moderation API** to reduce unsafe content in completions, or build a custom filter. Request moderation scores inline via the Responses/Chat Completions API.
- **Adversarial testing ("red-teaming")** — test across a wide range of inputs, including attempts to "break" the application (off-topic wandering, prompt injection such as "ignore the previous instructions").
- **Human in the loop (HITL)** — have a human review outputs before use in high-stakes domains and code generation; give humans access to source data needed to verify outputs.
- **Prompt engineering** — constrain topic/tone via instructions and few-shot examples to reduce undesired output even under adversarial user input.
- **"Know your customer" (KYC)** — require registration/login (optionally via existing accounts), and a credit card or ID for further risk reduction.
- **Constrain user input and limit output tokens** — cap input length to reduce prompt injection risk; cap output tokens to reduce misuse; prefer validated dropdowns/backend-sourced content over open-ended generation where possible.
- **Allow users to report issues** — provide a monitored channel (email, ticketing) for reporting improper behavior.
- **Understand and communicate limitations** — evaluate performance across realistic inputs and set customer expectations given risks of hallucination, bias, and offensive output.
- **Implement safety identifiers** — see below.
- **Revoke compromised API keys promptly** via [Security settings](https://platform.openai.com/settings/profile/security).

## Signature / Usage

```python
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
    model="gpt-6-astra",
    messages=[{"role": "user", "content": "This is a test"}],
    max_completion_tokens=5,
    safety_identifier="user_123456",
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `safety_identifier` | string | Stable, hashed identifier for an end user; sent in Chat Completions/Responses requests to help OpenAI detect and trace abuse |
| `OpenAI-Safety-Identifier` (header) | string | Realtime API equivalent of `safety_identifier`; must be set on the request that creates an ephemeral client secret, or on the direct connection request |

## Notes

- Hash usernames/emails before sending as `safety_identifier`; use a session ID for non-logged-in previews.
- `safety_identifier` is recommended, not required, for products with individual end users.
- Safety identifiers do not carry over between APIs/sessions — pass the same stable value separately in each Images API request and when you create or connect each Realtime session.
- Images API: include `safety_identifier` on each image generation (`POST /v1/images/generations`) and image edit (`POST /v1/images/edits`) request (JSON property, or form field for multipart edits); keep it to 128 characters or fewer. The Images API `user` parameter is deprecated; a nonempty `safety_identifier` takes precedence if both are sent.
- CSAM guidance: OpenAI worked with child safety experts, including NCMEC and Thorn, to offer developers practical guidance for protecting children (official page `/api/docs/guides/csam-guidance`).
- If the application serves minors, also follow [Under-18 guidance](./under-18-guidance.md).
- Report security/safety issues via the [Coordinated Vulnerability Disclosure Program](https://openai.com/security/disclosure/).

## Related

- [Moderation](./moderation.md)
- [Safety checks](./safety-checks.md)
- [Deployment checklist](./deployment-checklist.md)
- [Under-18 guidance](./under-18-guidance.md)
- [Safety enforcement notifications](./safety-enforcement.md)
