# Improving the threat model

Explains what a threat model is in Codex Security cloud and how editing it improves scan results and prioritization.

## Signature / Usage

A threat model is a short security summary of how a repository works, edited as a `project overview`, used as scan context for future scans, prioritization, and review. Codex Security creates the first draft from the code.

A useful threat model calls out:

- entry points and untrusted inputs
- trust boundaries and auth assumptions
- sensitive data paths or privileged actions
- the areas the team wants reviewed first

Example:

> Public API for account changes. Accepts JSON requests and file uploads. Uses an internal auth service for identity checks and writes billing changes through an internal service. Focus review on auth checks, upload parsing, and service-to-service trust boundaries.

Edit the threat model at `https://chatgpt.com/codex/security/scans` → open repository → **Edit**.

## Notes

- Edit when findings are missing areas you care about or showing up in unexpected places
- Threat model changes affect **future** scan context only

## Related

- [Codex Security cloud setup](./cloud-setup.md)
- [Codex Security](./overview.md)
- [Codex Security cloud FAQ](./cloud-faq.md)
