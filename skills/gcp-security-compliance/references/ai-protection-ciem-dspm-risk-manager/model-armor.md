---
source: https://docs.cloud.google.com/security-command-center/docs/model-armor
---

# Protect AI applications with Model Armor

Model Armor inspects the prompts sent to LLMs and the responses they generate. This Security Command Center (SCC) page summarizes how Model Armor templates, floor settings and prompt / response sanitization relate to SCC; Model Armor findings are investigated in SCC (see the AI Protection pages).

## Signature / Usage

Admin roles for Model Armor, from the AI Protection configuration page. `RESOURCE_TYPE` is `organizations` or `projects`, `RESOURCE_ID` your organization or project ID, `USER_EMAIL` the user's email address.

```bash
gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/modelarmor.admin"

gcloud RESOURCE_TYPE add-iam-policy-binding RESOURCE_ID \
    --member="user:USER_EMAIL" \
    --role="roles/modelarmor.floorSettingsAdmin"
```

## Options / Props

| Concept | Description |
|---|---|
| Template | Reusable configuration: which filters to enable, the confidence levels for the filters, and the enforcement type for each filter. |
| Floor settings | Configured at organization, folder or project level by security administrators; mandate minimum filter requirements that all templates created within that scope must adhere to, preventing overly permissive configurations. |
| Sanitize a prompt | The application sends the user prompt to Model Armor first; the response indicates whether policy violations were found, with detailed results from each filter. The application decides what to do next. |
| Sanitize a response | Before showing an LLM response to the user, the application sends it to Model Armor, which screens it with the template's filter configuration; the application decides whether to show or block it. |

## Notes

- Google Cloud Model Armor screens prompts and responses as a service; it is not the guardrails of the OpenAI Agents SDK (`openai-agents`) or Claude guardrail guidance (`anthropic-prompt-eval`).
- Snippet taken from https://docs.cloud.google.com/security-command-center/docs/configure-ai-protection.
- Model Armor findings in SCC are described in the SCC vulnerability findings reference (Model Armor section); the source links to it and to the Model Armor templates, floor settings and sanitize guides rather than repeating them.
- Model Armor Floor Settings Admin (`roles/modelarmor.floorSettingsAdmin`) and Model Armor Admin (`roles/modelarmor.admin`) are broad roles, so grant them to as few users as possible.
- Source: https://docs.cloud.google.com/security-command-center/docs/model-armor (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [ai-protection-overview.md](./ai-protection-overview.md)
- [configure-ai-protection.md](./configure-ai-protection.md)
