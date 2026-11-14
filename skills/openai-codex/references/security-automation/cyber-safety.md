# Models and Trusted Access

OpenAI Daybreak gives approved users access to models for authorized defensive cybersecurity work: Daybreak Blue (flagship models with reduced refusals for defensive workflows) and Daybreak Red (separately approved specialist cyber models).

## Signature / Usage

Request access through Trusted Access for Cyber:

- Individuals: https://chatgpt.com/cyber
- Organizations: the enterprise Trusted Access request form (https://openai.com/form/enterprise-trusted-access-for-cyber/), coordinating with an OpenAI representative.

Example task descriptions from the page:

```text
GPT-Daybreak-Blue: Review the approved lab repository for authentication weaknesses, rank findings by evidence and impact, and propose patches without accessing external systems.

GPT-Daybreak-Red: Within the approved lab and testing window, reproduce the documented authentication flaw, validate a minimal proof of concept, and stop before credential access, persistence, or production changes.
```

## Options / Props

| Model | Use for | Access |
| --- | --- | --- |
| GPT-Daybreak-Blue | Default for authorized defensive work: vulnerability discovery and triage, secure code review and threat modeling, detection engineering and incident response, malware analysis in a controlled environment, remediation and patch validation. | Via Trusted Access approval. |
| GPT-Daybreak-Red | Separately approved, explicitly authorized workflows: controlled vulnerability reproduction, PoC / exploit validation, penetration testing, red teaming, complex system analysis. Not the default for routine work. | Separate approval and provisioning; not automatic or on every surface. |

## Notes

- Use the model only with the approved identity, workspace or API organization and project, and product surface. Access depends on approval and provisioning for those; applying or verifying identity does not guarantee approval, and Daybreak Blue approval does not grant Daybreak Red.
- Enterprise access is for the organization's authorized internal work only; do not extend it to external users, customers, externally offered services, or downstream product features. If the approved identity, workspace, project, model, or surface is unclear, stop and confirm with your OpenAI representative.
- Trusted Access does not automatically grant Zero Data Retention; confirm separately approved retention controls for the exact API organization and endpoint.
- False positives: if a safeguard blocks, reroutes, or limits a request, inspect the client notice and request logs, and report suspected Codex false positives with `/feedback` when available. API restrictions and appeals follow the API cybersecurity checks guidance. Usage Policies and Terms of Use still apply.
- Trusted Access does not configure the environment, enforce limits on approved systems and actions, or review proposed actions; see the recommended configuration page.
- Local scans in Daybreak Defense Factory with Daybreak Blue require this trusted access (see the `security` category, daybreak-setup.md). This page covers model access, not Codex's built-in sandbox or approvals.
- Source: https://learn.chatgpt.com/docs/cyber-safety (retrieved 2026-11-14).

## Related

- [Recommended configuration](./cyber-safety-recommended-configuration.md)
- [Auto-review](./auto-review.md)
- [Permission profiles](./permission-profiles.md)
