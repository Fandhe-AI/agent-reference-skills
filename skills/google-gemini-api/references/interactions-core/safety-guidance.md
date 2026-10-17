---
source: https://ai.google.dev/gemini-api/docs/safety-guidance
---

# Safety and factuality guidance

Guidance on safety risks when building applications with LLMs and recommended design, testing, and monitoring steps. The page contains no API code; it is a process guide.

## Signature / Usage

The recommended development loop, verbatim from the guide:

```text
The following steps are recommended when building applications with LLMs:

- Understanding the safety risks of your application
- Considering adjustments to mitigate safety risks
- Performing safety testing appropriate to your use case
- Soliciting feedback from users and monitoring usage

The adjustment and testing phases should be iterative until you reach
performance appropriate for your application.
```

## Options / Props

Mitigation options listed in the guide:

| Name | Type | Description |
|------|------|-------------|
| Tune the model output | design | Make output more predictable and consistent |
| Input method for safer outputs | design | E.g. restrict users to a drop-down list of prompts or offer pop-up suggestions |
| Block unsafe inputs and filter output | design | Blocklists or human reviewers; static lists can have unintended results |
| Trained classifiers | design | Label each prompt with potential harms or adversarial signals, then handle by type |
| Safeguards against deliberate misuse | design | Unique user IDs, query volume limits, protection against prompt injection |
| Lower-risk functionality | design | Narrower scope or greater human oversight |
| Adjust safety settings | API | See the safety settings page |
| Enable Grounding with Google Search | API | Reduce factual inaccuracies or hallucinations; cite verifiable sources |

## Notes

- Availability: applies to the Gemini API in general (not tied to one API surface).
- Two recommended kinds of testing: safety benchmarking (own metrics and evaluation datasets) and adversarial testing (malicious or inadvertently harmful inputs; multiple rounds may be needed since outputs vary for the same prompt).
- Plan upfront how to spot and handle problems after launch, for example a monitored feedback channel such as thumbs up/down.
- Grounding with Google Search can be disabled for creative, non information-seeking use cases.
- Use is subject to the Generative AI Prohibited Use Policy and the Gemini API terms of service.
- This is Gemini-specific guidance; for the equivalent in other providers see `openai-api-core` and `anthropic-api-core`.

## Related

- [Safety settings](./safety-settings.md)
- [Prompt design strategies](./prompting-strategies.md)
