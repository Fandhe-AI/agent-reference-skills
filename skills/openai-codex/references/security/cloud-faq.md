# Codex Security cloud FAQ

Common questions about Codex Security cloud: what it is, how it works, the analysis pipeline, validation, and threat models.

## Signature / Usage

Codex Security is an LLM-driven security analysis toolkit that inspects source code and returns structured, ranked vulnerability findings with proposed patches. It runs analysis in an ephemeral, isolated container, temporarily clones the target repository, and returns findings with description, file/location, criticality, root cause, and suggested remediation. It complements SAST rather than replacing it.

## Analysis pipeline

1. **Analysis** — builds a threat model for the repository
2. **Commit scanning** — reviews merged commits and repository history for likely issues
3. **Validation** — tries to reproduce likely vulnerabilities in a sandbox to reduce false positives
4. **Patching** — integrates with Codex to propose patches that reviewers inspect before opening a PR

## Notes

- Language-agnostic; performance depends on the model's reasoning ability for the language/framework used
- Does **not** auto-apply patches — the proposed patch is a recommended remediation users can push as a PR
- Does not require the project to build for scanning; may attempt a build inside the container during auto-validation
- A **threat model** is the scan-time security context for a repository (project overview + attack-surface details: entry points, trust boundaries, auth assumptions, risky components); editable at any time (see [Improving the threat model](./threat-model.md))
- Initial scans can take several hours to multiple days for larger repositories; later scans are usually faster (incremental)
- Does not replace manual security review, exploitability checks, or human threat assessment

## Related

- [Codex Security](./overview.md)
- [Codex Security cloud setup](./cloud-setup.md)
- [Improving the threat model](./threat-model.md)
